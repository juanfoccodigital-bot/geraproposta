import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { createDealSchema, parseBody } from "@/lib/validations";

// ============================================
// GET /api/crm/deals
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

    const { data, error } = await supabase
      .from("deals")
      .select(`
        *,
        contact:contacts(id, name, email, phone, company),
        proposal:proposals(id, title, client_name, status, slug)
      `)
      .eq("user_id", user.id)
      .order("position", { ascending: true });

    if (error) return NextResponse.json({ error: "Erro ao buscar deals" }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// POST /api/crm/deals
// ============================================
export async function POST(request: NextRequest) {
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
    const parsed = parseBody(createDealSchema, body);
    if (!parsed.success) return parsed.response;
    const { title, contact_id, proposal_id, value, stage, notes } = parsed.data;

    // Get max position in target stage for ordering
    const targetStage = stage || "lead";
    const { data: lastDeal } = await supabase
      .from("deals")
      .select("position")
      .eq("user_id", user.id)
      .eq("stage", targetStage)
      .order("position", { ascending: false })
      .limit(1)
      .single();

    const position = lastDeal ? lastDeal.position + 1 : 0;

    const { data, error } = await supabase
      .from("deals")
      .insert({
        user_id: user.id,
        title,
        contact_id: contact_id || null,
        proposal_id: proposal_id || null,
        value: value || 0,
        stage: targetStage,
        position,
        notes: notes || null,
      })
      .select(`
        *,
        contact:contacts(id, name, email, phone, company),
        proposal:proposals(id, title, client_name, status, slug)
      `)
      .single();

    if (error) return NextResponse.json({ error: "Erro ao criar deal" }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
