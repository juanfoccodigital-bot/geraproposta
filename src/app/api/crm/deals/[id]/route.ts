import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkRateLimit, WRITE_LIMIT } from "@/lib/rate-limit";
import { updateDealSchema, parseBody } from "@/lib/validations";

// ============================================
// PUT /api/crm/deals/[id]
// ============================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const parsed = parseBody(updateDealSchema, body);
    if (!parsed.success) return parsed.response;

    const updateData: Record<string, unknown> = {};
    if (parsed.data.title !== undefined) updateData.title = parsed.data.title;
    if (parsed.data.contact_id !== undefined) updateData.contact_id = parsed.data.contact_id || null;
    if (parsed.data.proposal_id !== undefined) updateData.proposal_id = parsed.data.proposal_id || null;
    if (parsed.data.value !== undefined) updateData.value = parsed.data.value;
    if (parsed.data.closed_value !== undefined) updateData.closed_value = parsed.data.closed_value;
    if (parsed.data.stage !== undefined) updateData.stage = parsed.data.stage;
    if (parsed.data.position !== undefined) updateData.position = parsed.data.position;
    if (parsed.data.notes !== undefined) updateData.notes = parsed.data.notes;
    updateData.updated_at = new Date().toISOString();

    // Auto-set closed_at when moving to closed stages
    if (parsed.data.stage === "fechado_ganho" || parsed.data.stage === "fechado_perdido") {
      updateData.closed_at = new Date().toISOString();

      // Sync linked proposal status
      const { data: deal } = await supabase
        .from("deals")
        .select("proposal_id")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      const proposalId = parsed.data.proposal_id ?? deal?.proposal_id;
      if (proposalId) {
        const newStatus = parsed.data.stage === "fechado_ganho" ? "aceita" : "recusada";
        await supabase
          .from("proposals")
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq("id", proposalId)
          .eq("user_id", user.id);
      }
    }

    const { data, error } = await supabase
      .from("deals")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select(`
        *,
        contact:contacts(id, name, email, phone, company),
        proposal:proposals(id, title, client_name, status, slug)
      `)
      .single();

    if (error) return NextResponse.json({ error: "Erro ao atualizar deal" }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Deal não encontrado" }, { status: 404 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// DELETE /api/crm/deals/[id]
// ============================================
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl2 = checkRateLimit(`crm:write:${user.id}`, WRITE_LIMIT);
    if (!rl2.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    if (!profile || !PLAN_LIMITS[profile.plan as PlanName].crm) {
      return NextResponse.json({ error: "CRM disponível apenas nos planos Pro e Plus" }, { status: 403 });
    }

    const { error } = await supabase
      .from("deals")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return NextResponse.json({ error: "Erro ao excluir deal" }, { status: 500 });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
