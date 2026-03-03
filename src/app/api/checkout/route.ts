import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { getStripe, STRIPE_PRICE_IDS } from "@/lib/stripe";

/* ============================================
   POST /api/checkout
   Cria uma Subscription no Stripe com
   payment_behavior: default_incomplete.
   Retorna clientSecret para confirmar pagamento
   via Stripe Elements no frontend (transparente).
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const plan = body.plan as string;

    if (!plan || !STRIPE_PRICE_IDS[plan]) {
      return NextResponse.json({ error: "Plano invalido" }, { status: 400 });
    }

    const admin = getAdminClient();

    // Buscar perfil do usuario
    const { data: profile } = await admin
      .from("profiles")
      .select("email, full_name, stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Perfil nao encontrado" }, { status: 404 });
    }

    const stripe = getStripe();
    const customerEmail = profile.email || user.email || "";

    // Buscar ou criar customer no Stripe
    let customerId = profile.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: profile.full_name || undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await admin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Cancelar subscriptions incompletas anteriores deste customer
    const existingSubs = await stripe.subscriptions.list({
      customer: customerId,
      status: "incomplete",
    });
    for (const sub of existingSubs.data) {
      try {
        await stripe.subscriptions.cancel(sub.id);
        console.log("Cancelled incomplete subscription:", sub.id);
      } catch {
        // ignorar
      }
    }

    // Criar Subscription com pagamento incompleto
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: STRIPE_PRICE_IDS[plan] }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      metadata: {
        supabase_user_id: user.id,
        plan,
      },
    });

    console.log("Subscription created:", subscription.id, "status:", subscription.status);

    // Na API 2025+ (basil/clover), o campo payment_intent foi removido do Invoice.
    // Precisamos buscar o PaymentIntent pelo customer.
    // Como acabamos de limpar subs incompletas e criar uma nova,
    // o PI mais recente com status requires_payment_method e o correto.
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 5,
    });

    // Encontrar o PI pendente (requires_payment_method ou requires_confirmation)
    const pendingPI = paymentIntents.data.find(
      (pi) =>
        pi.status === "requires_payment_method" ||
        pi.status === "requires_confirmation",
    );

    if (!pendingPI || !pendingPI.client_secret) {
      // Fallback: tentar via invoice.payments (nova API)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const latestInvoiceId = (subscription as any).latest_invoice;
      const invId = typeof latestInvoiceId === "object" ? latestInvoiceId?.id : latestInvoiceId;

      console.error("No pending PI found via list. Subscription:", subscription.id,
        "Invoice:", invId,
        "PI statuses:", paymentIntents.data.map(p => `${p.id}:${p.status}`).join(", "));

      return NextResponse.json(
        { error: "Erro ao criar assinatura: pagamento pendente nao encontrado" },
        { status: 500 },
      );
    }

    const clientSecret = pendingPI.client_secret;
    console.log("clientSecret obtained via PI list:", pendingPI.id, "for subscription:", subscription.id);

    // Salvar subscription ID no perfil
    await admin
      .from("profiles")
      .update({
        subscription_id: subscription.id,
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    return NextResponse.json({
      clientSecret,
      subscriptionId: subscription.id,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
