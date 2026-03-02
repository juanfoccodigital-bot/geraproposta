import Stripe from "stripe";

/* ============================================
   STRIPE CLIENT
   Instancia unica do client Stripe.
   ============================================ */

let _stripe: Stripe | null = null;

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

/* Mapeamento de plano para Price ID do Stripe */
export const STRIPE_PRICE_IDS: Record<string, string> = {
  lite: "price_1T6bGALlGk8CuzUZn6ZcmJU7",
  pro: "price_1T6bDZLlGk8CuzUZvJKjhDRe",
  plus: "price_1T6bGsLlGk8CuzUZ0FBLRBDF",
};

/* Precos dos planos em centavos (para display) */
export const PLAN_PRICES: Record<string, number> = {
  lite: 2900,  // R$29
  pro: 4900,   // R$49
  plus: 9900,  // R$99
};

export const PLAN_LABELS: Record<string, string> = {
  lite: "Plano Lite",
  pro: "Plano Pro",
  plus: "Plano Plus",
};

/* Mapeamento reverso: Price ID -> plano */
export const PRICE_ID_TO_PLAN: Record<string, string> = Object.fromEntries(
  Object.entries(STRIPE_PRICE_IDS).map(([plan, priceId]) => [priceId, plan]),
);
