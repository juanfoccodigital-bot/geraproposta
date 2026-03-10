"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { HUBLA_OFFERS } from "@/lib/hubla";
import { templates } from "@/lib/templates";
import { BIOLINK_TEMPLATES } from "@/lib/biolink-templates";
import TemplatePreviewThumbnail from "@/components/ui/TemplatePreviewThumbnail";
import BiolinkPreviewThumbnail from "@/components/ui/BiolinkPreviewThumbnail";
import {
  Zap,
  Crown,
  Check,
  ArrowRight,
  Loader2,
  Clock,
  Star,
  Users,
  FileText,
  Palette,
  BarChart3,
  Sparkles,
  Link2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Copy,
  CheckCheck,
} from "lucide-react";

/* ============================================
   PROMO PAGE — Lancamento para primeiros assinantes
   Lite R$9,90 (1o mes) | Pro R$14,90 (1o mes)
   ============================================ */

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const promoEnd = new Date("2026-03-31T23:59:59-03:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, promoEnd - now);
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

const promoPlans = [
  {
    name: "Lite",
    icon: <Zap className="w-6 h-6" />,
    priceOriginal: "R$29",
    pricePromo: "R$9,90",
    period: "no 1o mes",
    periodAfter: "depois R$29/mes",
    description: "Perfeito para freelancers que querem impressionar clientes",
    color: "#3B82F6",
    colorLight: "#3B82F615",
    planKey: "lite",
    discount: "66% OFF",
    coupon: "CUPOM9",
    features: [
      "10 propostas por dia",
      "30 propostas por mes",
      "20 alteracoes por dia",
      "Todos os templates premium",
      "Blocos premium",
      "Logo e slug personalizados",
      "3 GeraLinks (biolinks)",
      "2 GeraSites",
    ],
  },
  {
    name: "Pro",
    icon: <Crown className="w-6 h-6" />,
    priceOriginal: "R$49",
    pricePromo: "R$14,90",
    period: "no 1o mes",
    periodAfter: "depois R$49/mes",
    description: "Para quem quer fechar mais contratos com propostas matadoras",
    color: "#A855F7",
    colorLight: "#A855F715",
    planKey: "pro",
    discount: "70% OFF",
    coupon: "CUPOM14",
    popular: true,
    features: [
      "Propostas ilimitadas por dia",
      "100 propostas por mes",
      "Alteracoes ilimitadas",
      "Todos os templates + blocos premium",
      "Geracao com IA",
      "CRM integrado",
      "Logo e slug personalizados",
      "10 GeraLinks + 10 GeraSites",
    ],
  },
];

const socialProof = [
  { icon: <Users className="w-5 h-5" />, value: "500+", label: "Usuarios ativos" },
  { icon: <FileText className="w-5 h-5" />, value: "3.200+", label: "Propostas criadas" },
  { icon: <Star className="w-5 h-5" />, value: "4.9/5", label: "Avaliacao media" },
];

const benefits = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Templates profissionais",
    description: "Mais de 40 templates prontos para voce personalizar e enviar em minutos.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "IA que cria por voce",
    description: "Descreva seu servico e deixe a IA gerar uma proposta completa. So no Pro.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "CRM integrado",
    description: "Acompanhe seus leads, propostas enviadas e contratos fechados. So no Pro.",
  },
];

/* ── Horizontal scroll carousel ── */
function TemplateCarousel({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const [scrollRef, setScrollRef] = useState<HTMLDivElement | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef) return;
    const amount = scrollRef.offsetWidth * 0.7;
    scrollRef.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        style={{ background: "#000000CC", border: "1px solid #333" }}
        aria-label={`Scroll ${label} left`}
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        style={{ background: "#000000CC", border: "1px solid #333" }}
        aria-label={`Scroll ${label} right`}
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />

      {/* Scrollable area */}
      <div
        ref={setScrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function PromoPage() {
  const { user: userProfile } = useAuth();
  const router = useRouter();
  const [checkingOut, setCheckingOut] = useState<string | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const countdown = useCountdown();

  const handleCopyCoupon = (coupon: string) => {
    navigator.clipboard.writeText(coupon);
    setCopiedCoupon(coupon);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  // Template samples
  const proposalTemplates = templates.slice(0, 12);
  const biolinkTemplates = BIOLINK_TEMPLATES.slice(0, 6);


  const handleCheckout = (planKey: string) => {
    if (!userProfile) {
      router.push("/signup?redirect=/promo");
      return;
    }

    const offer = HUBLA_OFFERS[planKey];
    if (!offer) return;

    setCheckingOut(planKey);
    const email = userProfile.email || "";
    const checkoutUrl = `${offer.url}?email=${encodeURIComponent(email)}`;
    window.open(checkoutUrl, "_blank");
    setTimeout(() => setCheckingOut(null), 2000);
  };

  return (
    <main className="relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Background effects */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full blur-[200px] opacity-[0.08] pointer-events-none"
        style={{ background: "linear-gradient(135deg, #F97316, #A855F7)" }}
      />
      <div
        className="absolute top-[600px] right-0 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.05] pointer-events-none"
        style={{ background: "#3B82F6" }}
      />

      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-8 pb-6 px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-pulse"
          style={{ background: "#EF444420", border: "1px solid #EF444440" }}>
          <Clock className="w-4 h-4" style={{ color: "#EF4444" }} />
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "#EF4444" }}>
            Oferta por tempo limitado
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-[1.1]">
          Seu primeiro mes<br />
          <span style={{ color: "#F97316" }}>com ate 70% OFF</span>
        </h1>

        <p className="max-w-lg mx-auto text-base md:text-lg mb-8" style={{ color: "#A3A3A3" }}>
          Teste o GeraProposta premium por um preco especial.
          Crie propostas que fecham contratos — e so continue se gostar.
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[
            { value: countdown.d, label: "dias" },
            { value: countdown.h, label: "horas" },
            { value: countdown.m, label: "min" },
            { value: countdown.s, label: "seg" },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-1"
                style={{ background: "#161616", border: "1px solid #262626" }}
              >
                {String(unit.value).padStart(2, "0")}
              </div>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#737373" }}>
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROMO CARDS ── */}
      <section className="px-6 pb-12 relative z-10">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {promoPlans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl border-2 flex flex-col overflow-hidden transition-transform hover:scale-[1.02]"
              style={{
                background: `linear-gradient(180deg, ${plan.colorLight} 0%, #111111 30%)`,
                borderColor: plan.popular ? plan.color : "#262626",
              }}
            >
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-extrabold"
                style={{ background: "#EF4444", color: "#FFF" }}
              >
                {plan.discount}
              </div>

              {plan.popular && (
                <div
                  className="absolute -top-0.5 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${plan.color}, #F97316)` }}
                />
              )}

              <div className="p-7">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: plan.colorLight, color: plan.color }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>

                <p className="text-xs mb-5" style={{ color: "#737373" }}>{plan.description}</p>

                <div className="mb-1">
                  <span className="text-sm line-through mr-2" style={{ color: "#525252" }}>
                    {plan.priceOriginal}
                  </span>
                  <span className="text-4xl font-extrabold text-white">{plan.pricePromo}</span>
                  <span className="text-sm ml-1" style={{ color: "#737373" }}>{plan.period}</span>
                </div>
                <p className="text-xs mb-4" style={{ color: "#525252" }}>{plan.periodAfter}</p>

                {/* Coupon */}
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="flex-1 flex items-center justify-between px-3 py-2.5 rounded-lg border border-dashed"
                    style={{ background: "#0A0A0A", borderColor: plan.color + "50" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider" style={{ color: "#737373" }}>Cupom:</span>
                      <span className="text-sm font-bold tracking-widest text-white">{plan.coupon}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopyCoupon(plan.coupon); }}
                      className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold transition-all hover:brightness-125 cursor-pointer"
                      style={{
                        background: copiedCoupon === plan.coupon ? "#22C55E20" : plan.color + "20",
                        color: copiedCoupon === plan.coupon ? "#22C55E" : plan.color,
                      }}
                    >
                      {copiedCoupon === plan.coupon ? (
                        <><CheckCheck className="w-3 h-3" /> Copiado!</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copiar</>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout(plan.planKey)}
                  disabled={!!checkingOut}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-center transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${plan.color}, ${plan.popular ? "#F97316" : plan.color}DD)`,
                    color: "#FFF",
                  }}
                >
                  {checkingOut === plan.planKey ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Comecar por {plan.pricePromo}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>

                <p className="text-[10px] text-center mt-2" style={{ color: "#525252" }}>
                  Cancele quando quiser. Sem multa.
                </p>
              </div>

              <div className="mx-7 h-px" style={{ background: "#1F1F1F" }} />

              <div className="p-7 pt-5 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: "#737373" }}>
                  Incluso no {plan.name}
                </p>
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm" style={{ color: "#D4D4D4" }}>
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-6 text-center">
          <p className="text-xs" style={{ color: "#525252" }}>
            Pagamento seguro via Hubla. Voce pode cancelar a qualquer momento sem compromisso.
          </p>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-10 px-6 border-y" style={{ borderColor: "#1A1A1A" }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6">
          {socialProof.map((item) => (
            <div key={item.label} className="text-center">
              <div className="flex items-center justify-center mb-2" style={{ color: "#F97316" }}>
                {item.icon}
              </div>
              <p className="text-2xl font-extrabold text-white">{item.value}</p>
              <p className="text-xs" style={{ color: "#737373" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEMPLATES DE PROPOSTAS ── */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F9731620", color: "#F97316" }}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                +{templates.length} Templates de Propostas
              </h2>
              <p className="text-sm" style={{ color: "#737373" }}>
                Propostas profissionais para todos os nichos. Personalize em minutos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6 mt-4">
            <span
              className="text-[10px] px-3 py-1 rounded-full font-bold"
              style={{ background: "#22C55E20", color: "#22C55E", border: "1px solid #22C55E30" }}
            >
              PREMIUM
            </span>
            <span className="text-xs" style={{ color: "#737373" }}>
              Acesso a todos os templates nos planos Lite, Pro e Plus
            </span>
          </div>

          <TemplateCarousel label="propostas">
            {proposalTemplates.map((tmpl) => (
              <Link
                key={tmpl.id}
                href={`/preview/${tmpl.id}`}
                className="flex-shrink-0 w-[280px] rounded-2xl border overflow-hidden transition-all hover:border-[#333] hover:shadow-lg hover:shadow-black/20"
                style={{ background: "#111111", borderColor: "#1F1F1F" }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <TemplatePreviewThumbnail config={tmpl.config} height={200} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#F9731630", color: "#F97316" }}>
                      PREMIUM
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "#00000080", color: "#FFF" }}>
                      <Eye className="w-3 h-3" /> Preview
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-1 truncate">{tmpl.name}</h3>
                  <p className="text-xs line-clamp-2" style={{ color: "#737373" }}>{tmpl.description}</p>
                </div>
              </Link>
            ))}
          </TemplateCarousel>
        </div>
      </section>

      {/* ── TEMPLATES DE BIOLINK ── */}
      <section className="py-14 px-6 border-t" style={{ borderColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#8B5CF620", color: "#8B5CF6" }}>
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                GeraLinks — Biolinks Profissionais
              </h2>
              <p className="text-sm" style={{ color: "#737373" }}>
                Reuna todos os seus links em uma pagina bonita e personalizada.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6 mt-4">
            <span
              className="text-[10px] px-3 py-1 rounded-full font-bold"
              style={{ background: "#8B5CF620", color: "#8B5CF6", border: "1px solid #8B5CF630" }}
            >
              ATE 10 LINKS
            </span>
            <span className="text-xs" style={{ color: "#737373" }}>
              No plano Pro. Lite inclui 3, Plus ilimitado.
            </span>
          </div>

          <TemplateCarousel label="biolinks">
            {biolinkTemplates.map((tmpl) => (
              <Link
                key={tmpl.id}
                href={`/preview/biolink/${tmpl.id}`}
                className="flex-shrink-0 w-[220px] rounded-2xl border overflow-hidden transition-all hover:border-[#333] hover:shadow-lg hover:shadow-black/20"
                style={{ background: "#111111", borderColor: "#1F1F1F" }}
              >
                <div className="relative h-[280px] overflow-hidden">
                  <BiolinkPreviewThumbnail config={tmpl.config} height={280} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{
                        background: tmpl.isPremium ? "#8B5CF630" : "#22C55E30",
                        color: tmpl.isPremium ? "#8B5CF6" : "#22C55E",
                      }}
                    >
                      {tmpl.isPremium ? "PREMIUM" : "FREE"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-1 truncate">{tmpl.name}</h3>
                  <p className="text-xs line-clamp-1" style={{ color: "#737373" }}>{tmpl.description}</p>
                </div>
              </Link>
            ))}
          </TemplateCarousel>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-14 px-6 border-t" style={{ borderColor: "#1A1A1A" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Por que profissionais escolhem o GeraProposta?
            </h2>
            <p className="text-sm" style={{ color: "#737373" }}>
              Tudo que voce precisa para criar propostas que fecham contratos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl p-6 border transition-colors hover:border-[#262626]"
                style={{ background: "#111111", borderColor: "#1A1A1A" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#F9731615", color: "#F97316" }}
                >
                  {b.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#A3A3A3" }}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-14 px-6">
        <div
          className="max-w-3xl mx-auto rounded-2xl p-10 text-center relative overflow-hidden"
          style={{ background: "#111111", border: "1px solid #262626" }}
        >
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ background: "radial-gradient(circle at center, #F97316, transparent 70%)" }}
          />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Nao perca essa oportunidade
            </h2>
            <p className="text-sm mb-2" style={{ color: "#A3A3A3" }}>
              Preco exclusivo para primeiros assinantes. Comece agora e veja a diferenca
              que propostas profissionais fazem no seu faturamento.
            </p>

            {/* Mini countdown in CTA */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
              <span className="text-xs font-semibold" style={{ color: "#EF4444" }}>
                Restam {countdown.d}d {countdown.h}h {countdown.m}m
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleCheckout("lite")}
                className="px-8 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                style={{ background: "transparent", color: "#3B82F6", border: "1px solid #3B82F640" }}
              >
                Lite por R$9,90
              </button>
              <button
                onClick={() => handleCheckout("pro")}
                className="px-8 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                style={{ background: "linear-gradient(135deg, #A855F7, #F97316)", color: "#FFF" }}
              >
                Pro por R$14,90
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
            </div>
            <p className="text-[10px] mt-4" style={{ color: "#525252" }}>
              Apos o 1o mes, o valor volta ao preco normal. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ RAPIDO ── */}
      <section className="py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-white text-center mb-6">Duvidas sobre a promo?</h3>
          <div className="space-y-4">
            {[
              { q: "O desconto e so no primeiro mes?", a: "Sim! Voce paga o valor promocional no primeiro mes. A partir do segundo mes, o valor volta ao normal (Lite R$29 / Pro R$49). Voce pode cancelar antes se nao gostar." },
              { q: "Posso cancelar antes do segundo mes?", a: "Claro! Cancele quando quiser sem multa. Voce continua com acesso ate o final do periodo pago." },
              { q: "Preciso colocar cartao de credito?", a: "O pagamento e feito pela Hubla. Voce pode pagar com cartao ou PIX." },
              { q: "E se eu ja sou assinante?", a: "Essa promo e para novos assinantes. Se voce ja tem um plano ativo, continue aproveitando seus beneficios!" },
              { q: "Tenho acesso a todos os templates?", a: "Sim! Nos planos Lite e Pro voce tem acesso a todos os +40 templates de propostas, todos os templates de biolinks e sites." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl p-4" style={{ background: "#111111", border: "1px solid #1A1A1A" }}>
                <p className="text-sm font-semibold text-white mb-1">{faq.q}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#A3A3A3" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
