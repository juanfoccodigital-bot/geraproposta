import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { createProposalSchema, parseBody } from "@/lib/validations";
import type { ProposalRecord } from "@/types/proposal";

// ============================================
// GET /api/proposals
// Lista propostas do usuário autenticado
// ============================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`proposals:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let query = supabase
      .from("proposals")
      .select("id, title, client_name, status, views, created_at, updated_at, slug, category, category_id, template_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    if (search) {
      const sanitizedSearch = search.slice(0, 100).replace(/[%_\\]/g, "\\$&");
      query = query.or(
        `title.ilike.%${sanitizedSearch}%,client_name.ilike.%${sanitizedSearch}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Erro ao buscar propostas" },
        { status: 500 }
      );
    }

    return NextResponse.json(data as ProposalRecord[]);
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// ============================================
// POST /api/proposals
// Cria uma nova proposta para o usuário autenticado
// ============================================
export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`proposals:write:${user.id}`, WRITE_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });
    }

    const body = await request.json();
    const parsed = parseBody(createProposalSchema, body);
    if (!parsed.success) return parsed.response;

    // Verificar limites de uso APÓS validação (para não incrementar em requests inválidos)
    const usage = await checkAndIncrementUsage(user.id, { checkActiveLimit: true });
    if (!usage.allowed) {
      return NextResponse.json({ error: usage.error }, { status: 403 });
    }

    const { title, client_name, template_id, category, category_id, config } = parsed.data;

    const slug = Math.random().toString(36).substring(2, 10);

    const newProposal: Record<string, unknown> = {
      title,
      client_name,
      template_id,
      category: category || null,
      config,
      slug,
      views: 0,
      status: "pendente",
      user_id: user.id,
    };

    if (category_id) {
      newProposal.category_id = category_id;
    }

    const { data, error } = await supabase
      .from("proposals")
      .insert(newProposal)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao criar proposta" },
        { status: 500 }
      );
    }

    return NextResponse.json(data as ProposalRecord, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
