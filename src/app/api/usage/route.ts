import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { getUsageStats } from "@/lib/usage";
import { checkRateLimit, READ_LIMIT } from "@/lib/rate-limit";

// ============================================
// GET /api/usage
// Retorna estatísticas de uso do usuário
// ============================================
export async function GET() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`usage:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições" }, { status: 429 });

    const stats = await getUsageStats(user.id);
    if (!stats) {
      return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
