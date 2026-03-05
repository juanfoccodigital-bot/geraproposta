"use client";

import ScrollReveal from "../ScrollReveal";
import { resolveIcon } from "@/lib/icons";
import { DiferenciaisConfig } from "@/types/proposal";

/* ============================================
   4️⃣ DIFERENCIAIS (refatorado com props)
   ============================================ */

interface Props {
  config: DiferenciaisConfig;
}

export default function DiferenciaisSection({ config }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-background">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.cards.map((item, index) => {
            const Icon = resolveIcon(item.icon);
            return (
              <ScrollReveal key={index} delay={index * 0.08}>
                <div className="group relative h-full p-7 sm:p-8 rounded-2xl bg-cream/50 border border-foreground/5 hover:bg-background hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-background border border-gold/10 flex items-center justify-center mb-5 group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/45 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gold/0 group-hover:bg-gold/20 transition-all duration-500 rounded-full" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
