import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { createContactSchema, parseBody } from "@/lib/validations";

// ============================================
// GET /api/crm/contacts
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
      .from("contacts")
      .select("*")
      .eq("user_id", user.id)
      .order("name", { ascending: true });

    if (error) return NextResponse.json({ error: "Erro ao buscar contatos" }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// POST /api/crm/contacts
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
    const parsed = parseBody(createContactSchema, body);
    if (!parsed.success) return parsed.response;
    const { name, email, phone, company, notes } = parsed.data;

    const { data, error } = await supabase
      .from("contacts")
      .insert({
        user_id: user.id,
        name,
        email: email || null,
        phone: phone || null,
        company: company || null,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Erro ao criar contato" }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
