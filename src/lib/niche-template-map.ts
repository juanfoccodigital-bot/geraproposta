/**
 * Maps business_type IDs from onboarding to recommended template IDs.
 * Each type maps to 3-4 templates ordered by relevance.
 */
export const nicheTemplateMap: Record<string, string[]> = {
  "social-media": ["corporativo-azul", "cinza-minimalista", "azul-ceu-light", "pink-neon-dark"],
  "trafego-pago": ["azul-marinho-classico", "laranja-energia", "sunset-gradient", "electric-blue"],
  "design": ["rosa-moderno", "coral-vibrante", "purple-dream", "salmon-criativo"],
  "webdesign": ["preto-branco-clean", "indigo-profundo", "gradient-aurora", "midnight-blue-dark"],
  "desenvolvimento": ["neon-cyber", "neon-pulse", "arctic-silver", "midnight-blue-dark"],
  "marketing": ["corporativo-azul", "amarelo-solar", "sunset-gradient", "amber-infoprodutor"],
  "consultoria": ["cinza-azulado-corporate", "slate-executivo", "azul-marinho-classico", "luxe-noir"],
  "fotografia": ["rose-gold-elegance", "copper-warm", "bege-neutro", "coral-vibrante"],
  "saude": ["premium-dourado", "verde-saude", "turquesa-zen", "forest-deep"],
  "educacao": ["verde-limao-fresh", "amarelo-solar", "bege-neutro", "terracota-quente"],
  "automacao": ["neon-cyber", "neon-pulse", "roxo-tech", "arctic-silver"],
  "outro": ["cinza-minimalista", "preto-branco-clean", "corporativo-azul", "slate-executivo"],
};

/**
 * Given a list of selected business types, returns unique recommended template IDs.
 */
export function getRecommendedTemplates(selectedTypes: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const type of selectedTypes) {
    const ids = nicheTemplateMap[type] || [];
    for (const id of ids) {
      if (!seen.has(id)) {
        seen.add(id);
        result.push(id);
      }
    }
  }

  return result.slice(0, 8);
}
