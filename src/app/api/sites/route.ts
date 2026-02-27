import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { getSiteTemplate, SITE_TEMPLATES } from "@/lib/site-templates";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { createSiteSchema, parseBody } from "@/lib/validations";

// ============================================
// GET /api/sites — List user sites
// ============================================
export async function GET() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl = checkRateLimit(`sites:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    const plan = (profile?.plan || "free") as PlanName;
    if (PLAN_LIMITS[plan].maxSites === 0) {
      return NextResponse.json({ error: "GeraSites não disponível no plano Free. Faça upgrade." }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("sites")
      .select("id, title, slug, template_id, views, created_at, updated_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: "Erro ao buscar sites" }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// POST /api/sites — Create new site
// ============================================
export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl2 = checkRateLimit(`sites:write:${user.id}`, WRITE_LIMIT);
    if (!rl2.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    const plan = (profile?.plan || "free") as PlanName;
    const limits = PLAN_LIMITS[plan];

    if (limits.maxSites === 0) {
      return NextResponse.json({ error: "GeraSites não disponível no plano Free." }, { status: 403 });
    }

    // Check site limit
    const { count } = await supabase
      .from("sites")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if ((count || 0) >= limits.maxSites) {
      return NextResponse.json(
        { error: `Limite de ${limits.maxSites} site(s) atingido. Faça upgrade do plano.` },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = parseBody(createSiteSchema, body);
    if (!parsed.success) return parsed.response;
    const { title, template_id } = parsed.data;

    const templateId = template_id || SITE_TEMPLATES[0].id;
    const template = getSiteTemplate(templateId);
    if (!template) {
      return NextResponse.json({ error: "Template não encontrado" }, { status: 400 });
    }

    const slug = `site-${Date.now().toString(36)}`;

    const { data, error } = await supabase
      .from("sites")
      .insert({
        user_id: user.id,
        title: title || template.name,
        slug,
        template_id: templateId,
        config: template.config,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Erro ao criar site" }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
