import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, getAdminSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { getBiolinkTemplate } from "@/lib/biolink-templates";
import { FREE_BIOLINK_TEMPLATE_IDS } from "@/lib/biolink-templates";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { createBiolinkSchema, parseBody } from "@/lib/validations";

// ============================================
// GET /api/biolinks — List user biolinks
// ============================================
export async function GET() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl = checkRateLimit(`biolinks:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const admin = getAdminSupabase();
    const { data, error } = await admin
      .from("biolinks")
      .select("id, title, slug, template_id, config, views, is_active, created_at, updated_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: "Erro ao buscar biolinks" }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// POST /api/biolinks — Create new biolink
// ============================================
export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl = checkRateLimit(`biolinks:write:${user.id}`, WRITE_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const admin = getAdminSupabase();
    const { data: profile } = await admin.from("profiles").select("plan, full_name").eq("id", user.id).single();
    const plan = (profile?.plan || "free") as PlanName;
    const userName = profile?.full_name || "";
    const limits = PLAN_LIMITS[plan];

    // Check biolink limit
    const { count } = await admin
      .from("biolinks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if ((count || 0) >= limits.maxBiolinks) {
      return NextResponse.json(
        { error: `Limite de ${limits.maxBiolinks} biolink(s) atingido. Faça upgrade do plano.` },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = parseBody(createBiolinkSchema, body);
    if (!parsed.success) return parsed.response;
    const { title, template_id, slug } = parsed.data;

    // Validate template access
    const templateId = template_id || "default";
    if (!limits.biolinkAllTemplates && !FREE_BIOLINK_TEMPLATE_IDS.includes(templateId)) {
      return NextResponse.json({ error: "Template premium. Faça upgrade do plano." }, { status: 403 });
    }

    const template = getBiolinkTemplate(templateId);
    if (!template) {
      return NextResponse.json({ error: "Template não encontrado" }, { status: 400 });
    }

    // Generate or validate slug
    let finalSlug = slug?.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!finalSlug || !limits.biolinkCustomSlug) {
      finalSlug = `link-${Date.now().toString(36)}`;
    }

    // Check slug uniqueness
    const { data: existing } = await admin
      .from("biolinks")
      .select("id")
      .eq("slug", finalSlug)
      .maybeSingle();

    if (existing) {
      finalSlug = `${finalSlug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    // Substituir "Seu Nome" pelo nome real do usuário
    const config = JSON.parse(JSON.stringify(template.config));
    if (userName) {
      const avatarBlock = config.blocks?.find((b: { type: string }) => b.type === "avatar");
      if (avatarBlock?.data?.name === "Seu Nome") {
        avatarBlock.data.name = userName;
      }
    }

    const { data, error } = await admin
      .from("biolinks")
      .insert({
        user_id: user.id,
        title: title || userName || "Meu Link",
        slug: finalSlug,
        template_id: templateId,
        config,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Erro ao criar biolink" }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
