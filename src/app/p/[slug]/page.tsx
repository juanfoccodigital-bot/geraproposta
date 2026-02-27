import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import ProposalViewer from "./ProposalViewer";

function getAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/* ============================================
   VIEWER V2 — /p/[slug]
   Server component que busca a proposta pelo
   slug no Supabase e renderiza via client wrapper.
   Gera metadados dinâmicos para OG tags.
   ============================================ */

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getAdminSupabase();
  const { data } = await supabase
    .from("proposals")
    .select("title, client_name, config")
    .eq("slug", slug)
    .single();

  if (!data) {
    return { title: "Proposta não encontrada" };
  }

  const title = data.config?.meta?.title || data.title || "Proposta Comercial";
  const description =
    data.config?.meta?.description || `Proposta para ${data.client_name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function ProposalPage({ params }: Props) {
  const { slug } = await params;
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("proposals")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF8]">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">!</span>
          </div>
          <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2">
            Proposta não encontrada
          </h1>
          <p className="text-sm text-[#1A1A1A]/50">
            O link pode estar incorreto ou expirado.
          </p>
        </div>
      </div>
    );
  }

  return <ProposalViewer proposal={data} />;
}
