import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OFFER_ID_TO_PLAN } from "@/lib/hubla";

/* ============================================
   POST /api/webhooks/hubla
   Recebe webhooks do Hubla (pagamento aprovado).
   Atualiza o plano do usuario no banco.
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
  );
}

export async function POST(request: NextRequest) {
  try {
    // Verificar token de autenticacao do Hubla
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const expectedToken = process.env.HUBLA_API_TOKEN?.trim();

    // Tambem aceitar via query param ou header x-hubla-token
    const headerToken = request.headers.get("x-hubla-token") || "";
    const { searchParams } = new URL(request.url);
    const queryToken = searchParams.get("token") || "";

    const receivedToken = token || headerToken || queryToken;

    if (!expectedToken || (receivedToken && receivedToken !== expectedToken)) {
      console.error("[hubla-webhook] Invalid token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("[hubla-webhook] Event received:", JSON.stringify(body).slice(0, 500));

    // Extrair dados do evento — Hubla pode enviar em diferentes formatos
    // Campos comuns: event, data.purchase, data.subscriber, data.buyer
    const event = body.event || body.type || "";

    // Ignorar eventos que nao sao pagamento aprovado
    const approvedEvents = [
      "purchase_approved", "purchase.approved",
      "sale_completed", "sale.completed",
      "subscription_created", "subscription.created",
      "payment_approved", "payment.approved",
      "invoice.paid", "billing.paid",
    ];

    if (event && !approvedEvents.includes(event.toLowerCase())) {
      console.log("[hubla-webhook] Ignoring event:", event);
      return NextResponse.json({ received: true });
    }

    // Extrair email do comprador
    const purchase = body.data?.purchase || body.data || body.purchase || body;
    const buyer = purchase.buyer || purchase.subscriber || purchase.customer || purchase.user || {};
    const email = (
      buyer.email ||
      purchase.email ||
      body.data?.email ||
      body.email ||
      ""
    ).toLowerCase().trim();

    // Extrair offer/product ID para mapear ao plano
    const offerId = (
      purchase.offer?.id ||
      purchase.offerId ||
      purchase.offer_id ||
      purchase.product?.id ||
      purchase.productId ||
      purchase.product_id ||
      ""
    );

    console.log("[hubla-webhook] Parsed:", { email, offerId, event });

    if (!email) {
      console.error("[hubla-webhook] No email found in payload");
      return NextResponse.json({ error: "No email in payload" }, { status: 400 });
    }

    // Determinar plano pela offer ID
    let plan = offerId ? OFFER_ID_TO_PLAN[offerId] : null;

    // Fallback: tentar pelo preco
    if (!plan) {
      const amount = purchase.amount || purchase.price || purchase.value || 0;
      const amountCents = amount > 100 ? amount : amount * 100; // normalizar
      if (amountCents === 2900) plan = "lite";
      else if (amountCents === 4900) plan = "pro";
      else if (amountCents === 9900) plan = "plus";
    }

    if (!plan) {
      console.error("[hubla-webhook] Could not determine plan:", { offerId, purchase });
      return NextResponse.json({ error: "Unknown offer/plan" }, { status: 400 });
    }

    // Buscar usuario pelo email no Supabase Auth
    const admin = getAdminClient();
    const { data: { users }, error: authError } = await admin.auth.admin.listUsers();

    if (authError) {
      console.error("[hubla-webhook] Auth error:", authError.message);
      return NextResponse.json({ error: "Auth error" }, { status: 500 });
    }

    const user = users.find((u) => u.email?.toLowerCase() === email);

    if (!user) {
      console.error("[hubla-webhook] No user found for email:", email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calcular expiracao (30 dias)
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Atualizar perfil
    const { error: updateError } = await admin
      .from("profiles")
      .update({
        plan,
        subscription_status: "active",
        subscription_expires_at: expiresAt.toISOString(),
        last_payment_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("[hubla-webhook] Update error:", updateError.message);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    console.log("[hubla-webhook] Success:", { email, plan, userId: user.id });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[hubla-webhook] Exception:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
