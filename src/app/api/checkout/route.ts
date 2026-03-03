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
    // para evitar acumular lixo no Stripe
    const existingSubs = await stripe.subscriptions.list({
      customer: customerId,
      status: "incomplete",
    });
    for (const sub of existingSubs.data) {
      try {
        await stripe.subscriptions.cancel(sub.id);
        console.log("Cancelled incomplete subscription:", sub.id);
      } catch {
        // ignorar se falhar
      }
    }

    // Criar Subscription com pagamento incompleto (SEM expand)
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

    // Buscar invoice explicitamente (nao depender de expand)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const latestInvoiceId = (subscription as any).latest_invoice;
    const invoiceId = typeof latestInvoiceId === "object" && latestInvoiceId !== null
      ? latestInvoiceId.id
      : latestInvoiceId;

    if (!invoiceId) {
      console.error("No latest_invoice on subscription:", subscription.id);
      return NextResponse.json(
        { error: "Erro ao criar assinatura: invoice nao encontrada" },
        { status: 500 },
      );
    }

    console.log("Invoice ID:", invoiceId);

    // Buscar a invoice completa
    const invoice = await stripe.invoices.retrieve(invoiceId as string);

    // Extrair payment_intent ID da invoice
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const piField = (invoice as any).payment_intent;
    const paymentIntentId = typeof piField === "object" && piField !== null
      ? piField.id
      : piField;

    if (!paymentIntentId) {
      console.error("No payment_intent on invoice:", invoiceId);
      return NextResponse.json(
        { error: "Erro ao criar assinatura: payment intent nao encontrado" },
        { status: 500 },
      );
    }

    console.log("PaymentIntent ID:", paymentIntentId);

    // Buscar o PaymentIntent para obter o client_secret
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);
    const clientSecret = paymentIntent.client_secret;

    if (!clientSecret) {
      console.error("No client_secret on PaymentIntent:", paymentIntentId);
      return NextResponse.json(
        { error: "Erro ao criar assinatura: clientSecret nao disponivel" },
        { status: 500 },
      );
    }

    console.log("clientSecret obtained successfully for subscription:", subscription.id);

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
