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
      console.error("Webhook: invalid secret", { received: secret, expected: expectedSecret ? "set" : "not set" });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Webhook event received:", body.event || "unknown");

    // Verificar tipo de evento — so processar pagamentos confirmados
    const eventType = body.event || body.type || "";
    if (eventType && eventType !== "billing.paid" && eventType !== "BILLING_PAID") {
      console.log("Webhook: ignoring event type:", eventType);
      return NextResponse.json({ received: true });
    }

    // AbacatePay pode enviar em diferentes formatos
    // Tentar extrair billing de body.data.billing, body.data, ou body
    const billing = body.data?.billing || body.data || body.billing || body;

    console.log("Webhook billing extracted:", JSON.stringify(billing));

    // Extrair o billing ID
    const billingId = billing.id as string;
    if (!billingId) {
      console.error("Webhook: no billing ID found in payload");
      return NextResponse.json({ error: "Invalid payload - no billing ID" }, { status: 400 });
    }

    // Determinar o plano pelo valor pago
    // O amount pode estar em billing.amount, billing.value, ou nos products
    let amount = billing.amount as number;
    if (!amount && billing.value) {
      amount = billing.value as number;
    }
    if (!amount && billing.products?.length > 0) {
      amount = billing.products[0].price as number;
    }

    console.log("Webhook amount:", amount);

    const plan = amount ? PRICE_TO_PLAN[amount] : null;

    if (!plan) {
      // Se nao conseguiu determinar pelo amount, tentar pelo externalId dos products
      const externalId = billing.products?.[0]?.externalId as string;
      console.log("Webhook externalId:", externalId);

      if (externalId) {
        // externalId format: gp-{plan}-{userId}
        const match = externalId.match(/^gp-(lite|pro|plus)-/);
        if (match) {
          const planFromId = match[1];
          console.log("Webhook plan from externalId:", planFromId);
          return await updateProfile(billingId, planFromId);
        }
      }

      console.error("Webhook: unknown billing amount:", amount, "and no valid externalId");
      return NextResponse.json({ error: "Unknown plan amount" }, { status: 400 });
    }

    return await updateProfile(billingId, plan);
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function updateProfile(billingId: string, plan: string) {
  const admin = getAdminClient();

  // Buscar usuario pelo subscription_id (billing ID salvo no checkout)
  const { data: profile, error: findError } = await admin
    .from("profiles")
    .select("id")
    .eq("subscription_id", billingId)
    .single();

  console.log("Webhook profile lookup:", { billingId, profile, findError: findError?.message });

  if (!profile) {
    console.error("Webhook: no profile found for billing:", billingId);
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Calcular expiracao (30 dias a partir de agora)
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  // Atualizar perfil com novo plano
  const { error: updateError } = await admin
    .from("profiles")
    .update({
      plan,
      subscription_status: "active",
      subscription_expires_at: expiresAt.toISOString(),
      last_payment_at: now.toISOString(),
      updated_at: now.toISOString(),
    })
    .eq("id", profile.id);

  if (updateError) {
    console.error("Webhook: update error:", updateError.message);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  console.log("Webhook: plan updated to", plan, "for profile", profile.id);
  return NextResponse.json({ success: true });
}
