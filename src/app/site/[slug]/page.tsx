import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import SiteViewer from "./SiteViewer";

function getAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

/* ============================================
   SITE PUBLIC PAGE — /site/[slug]
   Server component que busca o site pelo slug
   e renderiza via client viewer.
   ============================================ */

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getAdminSupabase();
  const { data } = await supabase
    .from("sites")
    .select("title, config")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!data) return { title: "Site não encontrado" };

  const title = data.config?.meta?.title || data.title || "Meu Site";
  const description = data.config?.meta?.description || `${title} - Criado com GeraSites`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function SitePage({ params }: Props) {
  const { slug } = await params;
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌐</span>
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">Site não encontrado</h1>
          <p className="text-sm text-white/50">O site pode estar incorreto ou desativado.</p>
        </div>
      </div>
    );
  }

  return <SiteViewer site={data} />;
}
