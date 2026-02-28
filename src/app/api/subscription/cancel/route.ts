import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

/* ============================================
   POST /api/subscription/cancel
   Cancela a assinatura do usuario autenticado.
   Marca subscription_status como "cancelled"
   mas mantem acesso ate subscription_expires_at.
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const admin = getAdminClient();

    // Verificar se usuario tem assinatura ativa
    const { data: profile } = await admin
      .from("profiles")
      .select("subscription_status, plan")
      .eq("id", user.id)
      .single();

    if (!profile || profile.subscription_status !== "active") {
      return NextResponse.json(
        { error: "Nenhuma assinatura ativa para cancelar" },
        { status: 400 },
      );
    }

    const { error } = await admin
      .from("profiles")
      .update({
        subscription_status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      console.error("Cancel subscription error:", error.message);
      return NextResponse.json({ error: "Erro ao cancelar" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
