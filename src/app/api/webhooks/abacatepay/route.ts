import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* ============================================
   POST /api/webhooks/abacatepay
   Recebe webhooks do AbacatePay (billing.paid).
   Atualiza o plano do usuario no banco.
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

/* Mapeamento de preco (centavos) para plano */
const PRICE_TO_PLAN: Record<number, string> = {
  2900: "lite",
  4900: "pro",
  9900: "plus",
};

export async function POST(request: NextRequest) {
  try {
    // Verificar webhook secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("webhookSecret");
    const expectedSecret = process.env.ABACATEPAY_WEBHOOK_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // AbacatePay envia o evento como objeto com dados da cobranca
    // O evento billing.paid contem os dados do billing
    const billing = body.data || body;

    if (!billing || !billing.id) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Determinar o plano pelo valor pago
    const amount = billing.amount as number;
    const plan = PRICE_TO_PLAN[amount];

    if (!plan) {
      console.error("Unknown billing amount:", amount);
      return NextResponse.json({ error: "Unknown plan amount" }, { status: 400 });
    }

    const billingId = billing.id as string;

    const admin = getAdminClient();

    // Buscar usuario pelo subscription_id (billing ID salvo no checkout)
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("subscription_id", billingId)
      .single();

    if (!profile) {
      console.error("No profile found for billing:", billingId);
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Calcular expiracao (30 dias a partir de agora)
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Atualizar perfil com novo plano
    await admin
      .from("profiles")
      .update({
        plan,
        subscription_status: "active",
        subscription_expires_at: expiresAt.toISOString(),
        last_payment_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("id", profile.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
