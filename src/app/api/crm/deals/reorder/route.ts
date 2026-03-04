import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkRateLimit, WRITE_LIMIT } from "@/lib/rate-limit";
import { reorderDealsSchema, parseBody } from "@/lib/validations";

// ============================================
// PUT /api/crm/deals/reorder
// Batch update positions after drag
// ============================================
export async function PUT(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl = checkRateLimit(`crm:write:${user.id}`, WRITE_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    if (!profile || !PLAN_LIMITS[profile.plan as PlanName].crm) {
      return NextResponse.json({ error: "CRM disponível apenas nos planos Pro e Plus" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = parseBody(reorderDealsSchema, body);
    if (!parsed.success) return parsed.response;
    const { updates } = parsed.data;

    // Batch update each deal
    const results = await Promise.all(
      updates.map((u) =>
        supabase
          .from("deals")
          .update({
            stage: u.stage,
            position: u.position,
            updated_at: new Date().toISOString(),
            ...(u.stage === "fechado_ganho" || u.stage === "fechado_perdido"
              ? { closed_at: new Date().toISOString() }
              : {}),
          })
          .eq("id", u.dealId)
          .eq("user_id", user.id)
      )
    );

    const failed = results.filter((r) => r.error);
    if (failed.length > 0) {
      console.error("Deal reorder errors:", failed.map((r) => r.error));
      return NextResponse.json({ error: "Erro ao reordenar alguns deals" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
