"use client";

import Link from "next/link";
import { Check, X, Sparkles, Zap, Crown, Rocket, ArrowRight, Loader2 } from "lucide-react";
import { PlanTier } from "@/types/user";

/* ============================================
   PRICING SECTION
   Cards de planos com features reais baseadas
   em plan-limits.ts — sem API/White-label.
   ============================================ */

interface Feature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  name: string;
  icon: React.ReactNode;
  price: string;
  period: string;
  description: string;
  color: string;
  colorLight: string;
  textOnColor: string;
  popular: boolean;
  badge?: string;
  features: Feature[];
  cta: string;
  ctaLink: string;
}

const plans: Plan[] = [
  {
    name: "Free",
    icon: <Sparkles className="w-5 h-5" />,
    price: "R$0",
    period: "para sempre",
    description: "Para conhecer a plataforma",
    color: "#F97316",
    colorLight: "#F9731615",
    textOnColor: "#FFFFFF",
    popular: false,
    features: [
      { text: "3 propostas por dia", included: true },
      { text: "15 propostas por mes", included: true },
      { text: "3 alteracoes por dia", included: true, highlight: true },
      { text: "5 propostas ativas", included: true },
      { text: "Templates basicos", included: true },
      { text: "1 GeraLink (biolink)", included: true },
      { text: "Logo personalizada", included: false },
      { text: "Geracao com IA (em breve)", included: false },
    ],
    cta: "Comecar Gratis",
    ctaLink: "/signup",
  },
  {
    name: "Lite",
    icon: <Zap className="w-5 h-5" />,
    price: "R$29",
    period: "/mes",
    description: "Para freelancers em crescimento",
    color: "#3B82F6",
    colorLight: "#3B82F615",
    textOnColor: "#FFFFFF",
    popular: false,
    features: [
      { text: "10 propostas por dia", included: true },
      { text: "30 propostas por mes", included: true },
      { text: "20 alteracoes por dia", included: true, highlight: true },
      { text: "50 propostas ativas", included: true },
      { text: "Todos os templates", included: true },
      { text: "Blocos premium", included: true },
      { text: "Logo e slug personalizados", included: true },
      { text: "3 GeraLinks", included: true },
      { text: "GeraSites (em breve)", included: true },
      { text: "CRM integrado", included: false },
      { text: "Geracao com IA (em breve)", included: false },
    ],
    cta: "Assinar Lite",
    ctaLink: "/signup",
  },
  {
    name: "Pro",
    icon: <Crown className="w-5 h-5" />,
    price: "R$49",
    period: "/mes",
    description: "Para quem quer fechar mais contratos",
    color: "#A855F7",
    colorLight: "#A855F715",
    textOnColor: "#FFFFFF",
    popular: true,
    badge: "Mais Popular",
    features: [
      { text: "Propostas ilimitadas por dia", included: true },
      { text: "100 propostas por mes", included: true },
      { text: "Alteracoes ilimitadas", included: true, highlight: true },
      { text: "200 propostas ativas", included: true },
      { text: "Todos os templates + blocos premium", included: true },
      { text: "Geracao com IA (em breve)", included: true },
      { text: "CRM integrado", included: true },
      { text: "Logo e slug personalizados", included: true },
      { text: "10 GeraLinks", included: true },
      { text: "GeraSites (em breve)", included: true },
    ],
    cta: "Assinar Pro",
    ctaLink: "/signup",
  },
  {
    name: "Plus",
    icon: <Rocket className="w-5 h-5" />,
    price: "R$99",
    period: "/mes",
    description: "Para agencias e equipes",
    color: "#F59E0B",
    colorLight: "#F59E0B15",
    textOnColor: "#111111",
    popular: false,
    badge: "Sem Limites",
    features: [
      { text: "Propostas ilimitadas", included: true },
      { text: "Alteracoes ilimitadas", included: true, highlight: true },
      { text: "Propostas ativas ilimitadas", included: true },
      { text: "Todos os templates + blocos premium", included: true },
      { text: "Geracao com IA (em breve)", included: true },
      { text: "CRM integrado", included: true },
      { text: "Logo e slug personalizados", included: true },
      { text: "GeraLinks ilimitados", included: true },
      { text: "GeraSites ilimitados (em breve)", included: true },
    ],
    cta: "Assinar Plus",
    ctaLink: "/signup",
  },
];

/* Comparison table data */
const comparisonRows = [
  { label: "Propostas por dia", free: "3", lite: "10", pro: "Ilimitado", plus: "Ilimitado", category: "Propostas" },
  { label: "Propostas por mes", free: "15", lite: "30", pro: "100", plus: "Ilimitado", category: "Propostas" },
  { label: "Propostas ativas", free: "5", lite: "50", pro: "200", plus: "Ilimitado", category: "Propostas" },
  { label: "Alteracoes por dia", free: "3", lite: "20", pro: "Ilimitado", plus: "Ilimitado", category: "Edicao", highlight: true },
  { label: "Compartilhamentos/mes", free: "3", lite: "30", pro: "100", plus: "Ilimitado", category: "Edicao" },
  { label: "Todos os templates", free: false, lite: true, pro: true, plus: true, category: "Features" },
  { label: "Blocos premium", free: false, lite: true, pro: true, plus: true, category: "Features" },
  { label: "Logo personalizada", free: false, lite: true, pro: true, plus: true, category: "Features" },
  { label: "Slug personalizado", free: false, lite: true, pro: true, plus: true, category: "Features" },
  { label: "Geracao com IA (em breve)", free: false, lite: false, pro: true, plus: true, category: "Features" },
  { label: "CRM integrado", free: false, lite: false, pro: true, plus: true, category: "Features" },
  { label: "GeraLinks (biolinks)", free: "1", lite: "3", pro: "10", plus: "Ilimitado", category: "Extras" },
  { label: "GeraSites (em breve)", free: "—", lite: "2", pro: "10", plus: "Ilimitado", category: "Extras" },
];

function ComparisonCell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-4 h-4 mx-auto" style={{ color: "#22C55E" }} />
    ) : (
      <X className="w-4 h-4 mx-auto" style={{ color: "#525252" }} />
    );
  }
  return (
    <span className="text-sm text-white">{value}</span>
  );
}

interface PricingSectionProps {
  showHeader?: boolean;
  showComparisonTable?: boolean;
  showCompareCta?: boolean;
  userPlan?: PlanTier | null;
  onCheckout?: (plan: string) => void;
  checkingOutPlan?: string | null;
}

export default function PricingSection({
  showHeader = false,
  showComparisonTable = false,
  showCompareCta = false,
  userPlan,
  onCheckout,
  checkingOutPlan,
}: PricingSectionProps) {
  return (
    <section id="precos" className="py-6 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {showHeader && (
          <div className="text-center mb-8">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5"
              style={{ background: "#F9731615", color: "#F97316", border: "1px solid #F9731630" }}
            >
              Precos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Planos para cada momento do seu negocio
            </h2>
            <p style={{ color: "#A3A3A3" }}>
              Comece gratis. Faca upgrade quando precisar.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border flex flex-col ${plan.popular ? "border-2 lg:-mt-4 lg:mb-4" : ""}`}
              style={{
                background: plan.popular
                  ? `linear-gradient(180deg, ${plan.colorLight} 0%, #111111 40%)`
                  : "#111111",
                borderColor: plan.popular ? plan.color : "#1F1F1F",
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide"
                  style={{ background: plan.color, color: plan.textOnColor }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="p-6 pb-0">
                {/* Plan name + icon */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: plan.colorLight, color: plan.color }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                </div>

                <p className="text-xs mb-4" style={{ color: "#737373" }}>{plan.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-sm" style={{ color: "#737373" }}>{plan.period}</span>
                </div>

                {/* CTA */}
                {(() => {
                  const planKey = plan.name.toLowerCase();
                  const isPaid = planKey !== "free";
                  const isCurrentPlan = userPlan === planKey;
                  const isCheckingOut = checkingOutPlan === planKey;

                  if (isCurrentPlan) {
                    return (
                      <span
                        className="block w-full py-3 rounded-xl text-sm font-semibold text-center opacity-50 cursor-default"
                        style={{
                          background: "transparent",
                          color: "#FFFFFF",
                          border: "1px solid #333",
                        }}
                      >
                        Plano Atual
                      </span>
                    );
                  }

                  if (isPaid && onCheckout) {
                    return (
                      <button
                        onClick={() => onCheckout(planKey)}
                        disabled={!!checkingOutPlan}
                        className="block w-full py-3 rounded-xl text-sm font-semibold text-center transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: plan.popular ? plan.color : "transparent",
                          color: plan.popular ? plan.textOnColor : "#FFFFFF",
                          border: plan.popular ? "none" : "1px solid #333",
                        }}
                      >
                        {isCheckingOut ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processando...
                          </span>
                        ) : (
                          plan.cta
                        )}
                      </button>
                    );
                  }

                  return (
                    <Link
                      href={plan.ctaLink}
                      className="block w-full py-3 rounded-xl text-sm font-semibold text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: plan.popular ? plan.color : "transparent",
                        color: plan.popular ? plan.textOnColor : "#FFFFFF",
                        border: plan.popular ? "none" : "1px solid #333",
                      }}
                    >
                      {plan.cta}
                    </Link>
                  );
                })()}
              </div>

              {/* Divider */}
              <div className="mx-6 my-5 h-px" style={{ background: "#1F1F1F" }} />

              {/* Features */}
              <div className="px-6 pb-6 flex-1">
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-2.5 text-sm">
                      {feature.included ? (
                        <Check
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: feature.highlight ? plan.color : "#22C55E" }}
                        />
                      ) : (
                        <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#525252" }} />
                      )}
                      <span
                        className={feature.highlight ? "font-semibold" : ""}
                        style={{
                          color: feature.included
                            ? feature.highlight
                              ? plan.color
                              : "#D4D4D4"
                            : "#525252",
                        }}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Compare CTA */}
        {showCompareCta && (
          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "#1A1A1A", color: "#F97316", border: "1px solid #262626" }}
            >
              Compare todos os planos em detalhe
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Comparison Table */}
        {showComparisonTable && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-white text-center mb-8">
              Compare os planos em detalhe
            </h3>

            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#1F1F1F", background: "#111111" }}>
              {/* Table header */}
              <div className="grid grid-cols-5 gap-0 py-4 px-4 border-b" style={{ borderColor: "#1F1F1F" }}>
                <div className="text-sm font-medium" style={{ color: "#737373" }}>Recurso</div>
                {["Free", "Lite", "Pro", "Plus"].map((name) => (
                  <div key={name} className="text-sm font-bold text-white text-center">{name}</div>
                ))}
              </div>

              {/* Table body */}
              {comparisonRows.map((row, idx) => {
                const prevRow = comparisonRows[idx - 1];
                const showCategory = !prevRow || prevRow.category !== row.category;

                return (
                  <div key={row.label}>
                    {showCategory && (
                      <div className="px-4 py-2.5 border-b" style={{ borderColor: "#1F1F1F", background: "#0D0D0D" }}>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#F97316" }}>
                          {row.category}
                        </span>
                      </div>
                    )}
                    <div
                      className={`grid grid-cols-5 gap-0 py-3 px-4 border-b items-center ${row.highlight ? "bg-[#F9731608]" : ""}`}
                      style={{ borderColor: "#1A1A1A" }}
                    >
                      <div
                        className={`text-sm ${row.highlight ? "font-semibold" : ""}`}
                        style={{ color: row.highlight ? "#F97316" : "#A3A3A3" }}
                      >
                        {row.label}
                      </div>
                      <div className="text-center"><ComparisonCell value={row.free} /></div>
                      <div className="text-center"><ComparisonCell value={row.lite} /></div>
                      <div className="text-center"><ComparisonCell value={row.pro} /></div>
                      <div className="text-center"><ComparisonCell value={row.plus} /></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
