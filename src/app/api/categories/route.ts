import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { createCategorySchema, parseBody } from "@/lib/validations";

// ============================================
// GET /api/categories
// Lista categorias do usuário autenticado
// ============================================
export async function GET() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`categories:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", user.id)
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Erro ao buscar categorias" },
        { status: 500 }
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
// POST /api/categories
// Cria categoria para o usuário autenticado
// ============================================
export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl2 = checkRateLimit(`categories:write:${user.id}`, WRITE_LIMIT);
    if (!rl2.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const body = await request.json();
    const parsed = parseBody(createCategorySchema, body);
    if (!parsed.success) return parsed.response;
    const { name, slug, color } = parsed.data;

    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug)
      .eq("user_id", user.id);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "Este slug de categoria já existe" },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug, color: color || "#8B5CF6", user_id: user.id })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao criar categoria" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
