import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { checkRateLimit, WRITE_LIMIT } from "@/lib/rate-limit";
import { updateCategorySchema, parseBody } from "@/lib/validations";

// ============================================
// PUT /api/categories/[id]
// Atualiza categoria do usuário autenticado
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

    const rl = checkRateLimit(`categories:write:${user.id}`, WRITE_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const body = await request.json();
    const parsed = parseBody(updateCategorySchema, body);
    if (!parsed.success) return parsed.response;

    const updateData: Record<string, unknown> = {};
    if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
    if (parsed.data.slug !== undefined) updateData.slug = parsed.data.slug;
    if (parsed.data.color !== undefined) updateData.color = parsed.data.color;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo para atualizar" },
        { status: 400 }
      );
    }

    if (parsed.data.slug !== undefined) {
      const { data: existing } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", parsed.data.slug)
        .eq("user_id", user.id)
        .neq("id", id);

      if (existing && existing.length > 0) {
        return NextResponse.json(
          { error: "Este slug de categoria já existe" },
          { status: 409 }
        );
      }
    }

    const { data, error } = await supabase
      .from("categories")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao atualizar categoria" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE /api/categories/[id]
// Exclui categoria do usuário autenticado
// ============================================
export async function DELETE(
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

    const rl2 = checkRateLimit(`categories:write:${user.id}`, WRITE_LIMIT);
    if (!rl2.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    await supabase
      .from("proposals")
      .update({ category_id: null })
      .eq("category_id", id)
      .eq("user_id", user.id);

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: "Erro ao excluir categoria" },
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
