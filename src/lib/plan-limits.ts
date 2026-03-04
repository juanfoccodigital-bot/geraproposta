/* ============================================
   PLAN LIMITS
   Definição de limites e features por plano.
   Todos os limites são verificados no frontend
   e no backend (API routes).
   ============================================ */

export const PLAN_LIMITS = {
  free: {
    // Criação — Propostas
    dailyCreate: 3,
    monthlyCreate: 15,
    maxActive: 5,
    // Edição
    dailyEdits: 3,
    // Compartilhamento
    monthlyShares: 3,
    // Features — Propostas
    dashboard: true,
    customLogo: false,
    customSlug: false,
    allTemplates: false,
    premiumBlocks: false,
    crm: false,
    ai: false,
    // GeraLink
    maxBiolinks: 1,
    biolinkCustomSlug: false,
    biolinkAllTemplates: false,
    biolinkCustomDomain: false,
    // GeraSites
    maxSites: 0,
    siteAllTemplates: false,
    // Meta
    label: "Free",
    price: 0,
  },
  lite: {
    // Criação — Propostas
    dailyCreate: 10,
    monthlyCreate: 30,
    maxActive: 50,
    // Edição
    dailyEdits: 20,
    // Compartilhamento
    monthlyShares: 30,
    // Features — Propostas
    dashboard: true,
    customLogo: true,
    customSlug: true,
    allTemplates: true,
    premiumBlocks: true,
    crm: false,
    ai: false,
    // GeraLink
    maxBiolinks: 3,
    biolinkCustomSlug: true,
    biolinkAllTemplates: true,
    biolinkCustomDomain: false,
    // GeraSites
    maxSites: 2,
    siteAllTemplates: true,
    // Meta
    label: "Lite",
    price: 29,
  },
  pro: {
    // Criação — Propostas
    dailyCreate: Infinity,
    monthlyCreate: 100,
    maxActive: 200,
    // Edição
    dailyEdits: Infinity,
    // Compartilhamento
    monthlyShares: 100,
    // Features — Propostas
    dashboard: true,
    customLogo: true,
    customSlug: true,
    allTemplates: true,
    premiumBlocks: true,
    crm: true,
    ai: true,
    // GeraLink
    maxBiolinks: 10,
    biolinkCustomSlug: true,
    biolinkAllTemplates: true,
    biolinkCustomDomain: true,
    // GeraSites
    maxSites: 10,
    siteAllTemplates: true,
    // Meta
    label: "Pro",
    price: 49,
  },
  plus: {
    // Criação — Propostas
    dailyCreate: Infinity,
    monthlyCreate: Infinity,
    maxActive: Infinity,
    // Edição
    dailyEdits: Infinity,
    // Compartilhamento
    monthlyShares: Infinity,
    // Features — Propostas
    dashboard: true,
    customLogo: true,
    customSlug: true,
    allTemplates: true,
    premiumBlocks: true,
    crm: true,
    ai: true,
    // GeraLink
    maxBiolinks: Infinity,
    biolinkCustomSlug: true,
    biolinkAllTemplates: true,
    biolinkCustomDomain: true,
    // GeraSites
    maxSites: Infinity,
    siteAllTemplates: true,
    // Meta
    label: "Plus",
    price: 99,
  },
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;
