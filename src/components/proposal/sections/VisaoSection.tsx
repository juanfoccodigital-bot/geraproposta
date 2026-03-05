"use client";

import ScrollReveal from "../ScrollReveal";
import { resolveIcon } from "@/lib/icons";
import { VisaoConfig } from "@/types/proposal";

/* ============================================
   6️⃣ VISÃO DE CRESCIMENTO + FOOTER
   (refatorado com props)
   ============================================ */

interface Props {
  config: VisaoConfig;
  meta?: { companyLogo?: string };
}

export default function VisaoSection({ config, meta }: Props) {
  return (
    <>
      <section className="py-24 sm:py-32 bg-cream pattern-bg">
        <div className="max-w-4xl mx-auto px-6">
          {/* Cabeçalho */}
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-medium text-gold tracking-[0.2em] uppercase">
              {config.sectionLabel}
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              {config.title}
            </h2>
            <div className="divider mb-6" />
            <p className="text-foreground/50 max-w-xl mx-auto text-base leading-relaxed">
              {config.subtitle}
            </p>
          </ScrollReveal>

          {/* Próximos passos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-16">
            {config.items.map((item, index) => {
              const Icon = resolveIcon(item.icon);
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-background border border-foreground/5 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-sm font-medium text-foreground/70 text-center leading-snug">
                      {item.label}
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Frase final */}
          <ScrollReveal delay={0.3}>
            <div className="relative text-center py-12 px-8">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-gold/10 font-[family-name:var(--font-heading)] text-[120px] leading-none select-none">
                &ldquo;
              </div>
              <blockquote className="relative z-10">
                <p className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-snug max-w-2xl mx-auto">
                  {config.quote}{" "}
                  <span className="gold-text">{config.quoteHighlight}</span>
                </p>
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-foreground border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {meta?.companyLogo && (
              <img src={meta.companyLogo} alt="Logo" className="h-8 object-contain opacity-40" />
            )}
            <p className="text-white/25 text-sm">
              Proposta exclusiva para{" "}
              <span className="text-gold/60 font-medium">
                {config.footerClientName}
              </span>
            </p>
            <p className="text-white/15 text-xs">
              {new Date().getFullYear()} — {config.footerNote}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
