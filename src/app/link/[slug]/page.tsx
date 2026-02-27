import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import BiolinkViewer from "./BiolinkViewer";

function getAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

/* ============================================
   BIOLINK PUBLIC PAGE — /link/[slug]
   Server component que busca o biolink pelo
   slug e renderiza via client viewer.
   ============================================ */

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getAdminSupabase();
  const { data } = await supabase
    .from("biolinks")
    .select("title, config")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!data) {
    return { title: "Link não encontrado" };
  }

  const avatarBlock = data.config?.blocks?.find((b: { type: string }) => b.type === "avatar");
  const name = avatarBlock?.data?.name || data.title || "Meu Link";
  const bio = avatarBlock?.data?.bio || "";

  return {
    title: name,
    description: bio || `${name} - Link na Bio`,
    openGraph: {
      title: name,
      description: bio || `${name} - Link na Bio`,
      type: "website",
    },
  };
}

export default async function BiolinkPage({ params }: Props) {
  const { slug } = await params;
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("biolinks")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔗</span>
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">
            Link não encontrado
          </h1>
          <p className="text-sm text-white/50">
            O link pode estar incorreto ou desativado.
          </p>
        </div>
      </div>
    );
  }

  return <BiolinkViewer biolink={data} />;
}
