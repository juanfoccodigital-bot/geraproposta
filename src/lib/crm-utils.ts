/* ============================================
   CRM UTILITIES
   Formatação de moeda e helpers.
   ============================================ */

export function formatBrl(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function parseBrlInput(raw: string): number {
  // "1.500,00" → 1500  |  "R$ 2.000" → 2000
  return parseFloat(raw.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;
}
