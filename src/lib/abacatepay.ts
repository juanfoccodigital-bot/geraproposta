import AbacatePay from "abacatepay-nodejs-sdk";

/* ============================================
   ABACATEPAY CLIENT
   Wrapper para instanciar o client do SDK.
   A API key determina dev/prod automaticamente.
   ============================================ */

let _client: ReturnType<typeof AbacatePay> | null = null;

export function getAbacateClient() {
  if (!_client) {
    _client = AbacatePay(process.env.ABACATEPAY_API_KEY!);
  }
  return _client;
}

/* Precos dos planos em centavos */
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
