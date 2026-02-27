import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, getClientIP, PUBLIC_LIMIT } from "@/lib/rate-limit";

// ============================================
// POST /api/proposals/[id]/view
// Incrementa visualizações — PÚBLICO (sem auth)
// Usa createClient direto (não cookie-based)
// ============================================
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const ip = getClientIP(request);
    const rl = checkRateLimit(`view:${ip}`, PUBLIC_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Muitas requisições" }, { status: 429 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: current, error: fetchError } = await supabase
      .from("proposals")
      .select("views")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      return NextResponse.json(
        { error: "Proposta não encontrada" },
        { status: 404 }
      );
    }

    const newViews = (current.views || 0) + 1;

    const { data, error: updateError } = await supabase
      .from("proposals")
      .update({ views: newViews })
      .eq("id", id)
      .select("views")
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: "Erro ao atualizar visualizações" },
        { status: 500 }
      );
    }

    return NextResponse.json({ views: data.views });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
