import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getStripe, PRICE_ID_TO_PLAN } from "@/lib/stripe";
import Stripe from "stripe";

/* ============================================
   POST /api/webhooks/stripe
   Recebe webhooks do Stripe para pagamentos
   com cartao de credito (subscriptions).
   PIX continua via AbacatePay webhook.
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    const stripe = getStripe();
    let event: Stripe.Event;

    // Verificar assinatura do webhook (se secret configurado)
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error("Stripe webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    } else {
      event = JSON.parse(body) as Stripe.Event;
      console.warn("Stripe webhook: no STRIPE_WEBHOOK_SECRET configured");
    }

    console.log("Stripe webhook event:", event.type);

    switch (event.type) {
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      default:
        console.log("Stripe webhook: unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/* Invoice paga (primeira cobranca + renovacoes) */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inv = invoice as any;
  const subscriptionId = inv.subscription as string;
  if (!subscriptionId) return;

  const customerId = inv.customer as string;
  const admin = getAdminClient();

  // Buscar usuario pelo stripe_customer_id ou subscription_id
  const { data: profile } = await admin
    .from("profiles")
    .select("id, plan")
    .or(`stripe_customer_id.eq.${customerId},subscription_id.eq.${subscriptionId}`)
    .single();

  if (!profile) {
    console.error("Stripe webhook invoice.paid: no profile for customer", customerId);
    return;
  }

  // Determinar plano pelo price ID
  const lineItem = inv.lines?.data?.[0];
  const priceId = lineItem?.price?.id as string | undefined;
  const plan = priceId ? PRICE_ID_TO_PLAN[priceId] : null;

  const now = new Date();

  await admin
    .from("profiles")
    .update({
      plan: plan || profile.plan,
      subscription_status: "active",
      subscription_id: subscriptionId,
      stripe_customer_id: customerId,
      last_payment_at: now.toISOString(),
      updated_at: now.toISOString(),
    })
    .eq("id", profile.id);

  console.log("Stripe webhook: invoice.paid — user", profile.id, "plan", plan);
}

/* Subscription cancelada definitivamente */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const userId = subscription.metadata?.supabase_user_id;

  const admin = getAdminClient();

  let profileId = userId;
  if (!profileId) {
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();
    profileId = profile?.id;
  }

  if (!profileId) {
    console.error("Stripe webhook subscription.deleted: no profile found");
    return;
  }

  await admin
    .from("profiles")
    .update({
      plan: "free",
      subscription_status: "cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("id", profileId);

  console.log("Stripe webhook: subscription deleted — user", profileId);
}

/* Subscription atualizada (cancelamento agendado, etc) */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const userId = subscription.metadata?.supabase_user_id;

  const admin = getAdminClient();

  let profileId = userId;
  if (!profileId) {
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();
    profileId = profile?.id;
  }

  if (!profileId) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sub = subscription as any;
  if (sub.cancel_at_period_end) {
    const expiresAt = new Date(sub.current_period_end * 1000);
    await admin
      .from("profiles")
      .update({
        subscription_status: "cancelled",
        subscription_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", profileId);

    console.log("Stripe webhook: subscription cancel scheduled at", expiresAt.toISOString());
  }
}
