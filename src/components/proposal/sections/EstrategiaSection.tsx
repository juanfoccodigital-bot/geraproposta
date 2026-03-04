"use client";

import ScrollReveal from "../ScrollReveal";
import { resolveIcon } from "@/lib/icons";
import { CheckCircle2 } from "lucide-react";
import { EstrategiaConfig } from "@/types/proposal";

/* ============================================
   3️⃣ ESTRATÉGIA (refatorado com props)
   ============================================ */

interface Props {
  config: EstrategiaConfig;
}

export default function EstrategiaSection({ config }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-beige/30 pattern-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabeçalho */}
        <ScrollReveal className="text-center mb-16">
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

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {config.cards.map((card, index) => {
            const Icon = resolveIcon(card.icon);
            return (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="group h-full p-8 sm:p-10 rounded-2xl bg-cream border border-foreground/5 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center shadow-lg shadow-gold/20 group-hover:shadow-gold/30 transition-shadow duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/20 tracking-widest uppercase">
                      Pilar {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed mb-6">
                    {card.description}
                  </p>
                  <ul className="space-y-3">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/60 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
