import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, getAdminSupabase } from "@/lib/supabase-server";
import { checkRateLimit, READ_LIMIT } from "@/lib/rate-limit";

// ============================================
// GET /api/biolinks/check-slug?slug=xxx
// ============================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl = checkRateLimit(`slug:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições" }, { status: 429 });

    const slug = request.nextUrl.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Slug é obrigatório" }, { status: 400 });

    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (cleanSlug.length < 3) {
      return NextResponse.json({ available: false, reason: "Slug deve ter pelo menos 3 caracteres" });
    }

    const admin = getAdminSupabase();
    const { data } = await admin
      .from("biolinks")
      .select("id")
      .eq("slug", cleanSlug)
      .maybeSingle();

    return NextResponse.json({ available: !data, slug: cleanSlug });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
