import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkRateLimit, READ_LIMIT } from "@/lib/rate-limit";

// ============================================
// GET /api/crm/stats
// Revenue and pipeline stats
// ============================================
export async function GET() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl = checkRateLimit(`crm:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    if (!profile || !PLAN_LIMITS[profile.plan as PlanName].crm) {
      return NextResponse.json({ error: "CRM disponível apenas nos planos Pro e Plus" }, { status: 403 });
    }

    // All deals
    const { data: deals } = await supabase
      .from("deals")
      .select("value, closed_value, stage, closed_at")
      .eq("user_id", user.id);

    if (!deals) {
      return NextResponse.json({
        totalPipeline: 0,
        wonThisMonth: 0,
        wonTotal: 0,
        dealsActive: 0,
        conversionRate: 0,
      });
    }

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    let totalPipeline = 0;
    let wonThisMonth = 0;
    let wonTotal = 0;
    let dealsActive = 0;
    let wonCount = 0;
    let lostCount = 0;

    for (const d of deals) {
      if (d.stage === "fechado_ganho") {
        wonCount++;
        const cv = Number(d.closed_value) || Number(d.value) || 0;
        wonTotal += cv;
        if (d.closed_at && d.closed_at >= monthStart) {
          wonThisMonth += cv;
        }
      } else if (d.stage === "fechado_perdido") {
        lostCount++;
      } else {
        dealsActive++;
        totalPipeline += Number(d.value) || 0;
      }
    }

    const total = wonCount + lostCount;
    const conversionRate = total > 0 ? Math.round((wonCount / total) * 100) : 0;

    return NextResponse.json({
      totalPipeline,
      wonThisMonth,
      wonTotal,
      dealsActive,
      conversionRate,
    });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
