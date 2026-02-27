import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { checkRateLimit, WRITE_LIMIT } from "@/lib/rate-limit";
import type { ProposalRecord } from "@/types/proposal";

// ============================================
// POST /api/proposals/[id]/duplicate
// Duplica uma proposta do usuário autenticado
// ============================================
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`proposals:write:${user.id}`, WRITE_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });
    }

    // Verificar limites de uso (inclui check de propostas ativas)
    const usage = await checkAndIncrementUsage(user.id, { checkActiveLimit: true });
    if (!usage.allowed) {
      return NextResponse.json({ error: usage.error }, { status: 403 });
    }

    // Buscar proposta original (scoped ao user)
    const { data: original, error: fetchError } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !original) {
      return NextResponse.json(
        { error: "Proposta original não encontrada" },
        { status: 404 }
      );
    }

    const originalRecord = original as ProposalRecord;
    const slug = Math.random().toString(36).substring(2, 10);

    const duplicated = {
      title: `Cópia de ${originalRecord.title}`,
      client_name: originalRecord.client_name,
      template_id: originalRecord.template_id,
      category: originalRecord.category,
      category_id: originalRecord.category_id,
      config: originalRecord.config,
      slug,
      views: 0,
      status: "pendente" as const,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("proposals")
      .insert(duplicated)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao duplicar proposta" },
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
