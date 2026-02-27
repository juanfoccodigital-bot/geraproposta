import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { checkRateLimit, READ_LIMIT } from "@/lib/rate-limit";

// ============================================
// GET /api/proposals/check-slug
// Verifica disponibilidade de slug (scoped ao user)
// ============================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const exclude = searchParams.get("exclude");

    if (!slug) {
      return NextResponse.json({ error: "slug é obrigatório" }, { status: 400 });
    }

    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`slug:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições" }, { status: 429 });

    let query = supabase.from("proposals").select("id").eq("slug", slug);
    if (exclude) {
      query = query.neq("id", exclude);
    }

    const { data } = await query;
    return NextResponse.json({ available: !data || data.length === 0 });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
