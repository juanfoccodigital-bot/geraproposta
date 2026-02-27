import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkRateLimit, WRITE_LIMIT } from "@/lib/rate-limit";
import { updateContactSchema, parseBody } from "@/lib/validations";

// ============================================
// PUT /api/crm/contacts/[id]
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
    const parsed = parseBody(updateContactSchema, body);
    if (!parsed.success) return parsed.response;

    const updateData: Record<string, unknown> = {};
    if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
    if (parsed.data.email !== undefined) updateData.email = parsed.data.email;
    if (parsed.data.phone !== undefined) updateData.phone = parsed.data.phone;
    if (parsed.data.company !== undefined) updateData.company = parsed.data.company;
    if (parsed.data.notes !== undefined) updateData.notes = parsed.data.notes;
    updateData.updated_at = new Date().toISOString();

    if (Object.keys(updateData).length <= 1) {
      return NextResponse.json({ error: "Nenhum campo para atualizar" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("contacts")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Erro ao atualizar contato" }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Contato não encontrado" }, { status: 404 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// DELETE /api/crm/contacts/[id]
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
      .from("contacts")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return NextResponse.json({ error: "Erro ao excluir contato" }, { status: 500 });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
