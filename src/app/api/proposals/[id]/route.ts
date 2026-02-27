import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { checkAndIncrementEdits } from "@/lib/usage";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { updateProposalSchema, parseBody } from "@/lib/validations";
import type { ProposalRecord } from "@/types/proposal";

// ============================================
// GET /api/proposals/[id]
// Retorna uma proposta do usuário autenticado
// ============================================
export async function GET(
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

    const rl = checkRateLimit(`proposals:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });
    }

    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Proposta não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(data as ProposalRecord);
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// ============================================
// PUT /api/proposals/[id]
// Atualiza uma proposta do usuário autenticado
// ============================================
export async function PUT(
  request: NextRequest,
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

    const body = await request.json();
    const parsed = parseBody(updateProposalSchema, body);
    if (!parsed.success) return parsed.response;

    const allowedFields: (keyof ProposalRecord)[] = [
      "title",
      "client_name",
      "category",
      "category_id",
      "config",
      "status",
      "slug",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo válido para atualizar" },
        { status: 400 }
      );
    }

    // Check daily edits limit when content changes (config, title, client_name)
    const isContentEdit = updateData.config !== undefined ||
      updateData.title !== undefined ||
      updateData.client_name !== undefined;

    if (isContentEdit) {
      const edits = await checkAndIncrementEdits(user.id);
      if (!edits.allowed) {
        return NextResponse.json({ error: edits.error }, { status: 403 });
      }
    }

    if (body.slug !== undefined) {
      const slugRegex = /^[a-z0-9-]{3,60}$/;
      if (!slugRegex.test(body.slug)) {
        return NextResponse.json(
          { error: "Slug inválido. Use apenas letras minúsculas, números e hífens (3-60 caracteres)" },
          { status: 400 }
        );
      }

      const { data: existing } = await supabase
        .from("proposals")
        .select("id")
        .eq("slug", body.slug)
        .neq("id", id);

      if (existing && existing.length > 0) {
        return NextResponse.json(
          { error: "Este slug já está em uso" },
          { status: 409 }
        );
      }
    }

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("proposals")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao atualizar proposta" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Proposta não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(data as ProposalRecord);
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE /api/proposals/[id]
// Exclui uma proposta do usuário autenticado
// ============================================
export async function DELETE(
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

    const { error } = await supabase
      .from("proposals")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: "Erro ao excluir proposta" },
        { status: 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
