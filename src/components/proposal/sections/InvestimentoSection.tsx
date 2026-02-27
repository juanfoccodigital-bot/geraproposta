"use client";

import ScrollReveal from "../ScrollReveal";
import { CheckCircle2, Shield, Zap, Star } from "lucide-react";
import { InvestimentoConfig } from "@/types/proposal";

/* ============================================
   5️⃣ INVESTIMENTO (refatorado com props)
   ============================================ */

interface Props {
  config: InvestimentoConfig;
}

export default function InvestimentoSection({ config }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Cabeçalho */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-medium text-gold tracking-[0.2em] uppercase">
            {config.sectionLabel}
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            {config.title}
          </h2>
          <div className="divider mb-6" />
          <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
            {config.subtitle}
          </p>
        </ScrollReveal>

        {/* Card de preço */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 rounded-3xl border border-gold/20" />
              <div className="relative bg-white/5 backdrop-blur-sm p-10 sm:p-14">
                {/* Badge */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="text-xs font-semibold text-gold tracking-wide uppercase">
                      {config.badge}
                    </span>
                  </div>
                </div>

                {/* Preço */}
                <div className="text-center mb-8">
                  <p className="text-white/30 text-lg line-through mb-2">
                    {config.priceOriginal}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-sm text-white/50 font-medium">
                      {config.priceCurrency}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-6xl sm:text-7xl font-bold text-white">
                      {config.priceCurrent}
                    </span>
                    <span className="text-white/50 text-base">
                      {config.pricePeriod}
                    </span>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-center text-white/40 text-sm leading-relaxed max-w-md mx-auto mb-10">
                  {config.description}
                </p>

                <div className="w-full h-[1px] bg-white/10 mb-8" />

                {/* Itens inclusos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {config.includedItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                  <a
                    href={config.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-10 py-4 rounded-full gold-gradient text-foreground font-semibold text-base tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Zap className="w-4 h-4" />
                    {config.ctaLabel}
                  </a>
                </div>

                {/* Garantia */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Shield className="w-3.5 h-3.5 text-white/20" />
                  <span className="text-xs text-white/20">{config.guarantee}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
