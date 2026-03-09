/* ============================================
   HUBLA CONFIG
   Mapeamento de planos para ofertas do Hubla.
   ============================================ */

export const HUBLA_OFFERS: Record<string, { id: string; url: string }> = {
  lite: { id: "fu1XWi7ROEOw1nCuImOu", url: "https://pay.hub.la/fu1XWi7ROEOw1nCuImOu" },
  pro:  { id: "u9wv3XWsm08Qup4KdelJ", url: "https://pay.hub.la/u9wv3XWsm08Qup4KdelJ" },
  plus: { id: "ax2L5gFAOAQzAfzXfRfT", url: "https://pay.hub.la/ax2L5gFAOAQzAfzXfRfT" },
};

/** Mapeamento reverso: offer ID -> plano */
export const OFFER_ID_TO_PLAN: Record<string, string> = Object.fromEntries(
  Object.entries(HUBLA_OFFERS).map(([plan, offer]) => [offer.id, plan]),
);

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
