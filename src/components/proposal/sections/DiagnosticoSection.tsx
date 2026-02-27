"use client";

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";
import { resolveIcon } from "@/lib/icons";
import { DiagnosticoConfig, Severity } from "@/types/proposal";

/* ============================================
   2️⃣ DIAGNÓSTICO (refatorado com props)
   ============================================ */

const severityStyles: Record<Severity, string> = {
  alto: "bg-red-50 border-red-100 text-red-400",
  medio: "bg-amber-50 border-amber-100 text-amber-400",
  positivo: "bg-emerald-50 border-emerald-100 text-emerald-400",
};

const severityLabels: Record<Severity, string> = {
  alto: "Prioridade Alta",
  medio: "Prioridade Média",
  positivo: "Oportunidade",
};

interface Props {
  config: DiagnosticoConfig;
}

export default function DiagnosticoSection({ config }: Props) {
  return (
    <section id="diagnostico" className="py-24 sm:py-32 bg-white">
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

        {/* Prints do Instagram */}
        {config.showImages && config.images.length > 0 && (
          <ScrollReveal className="mb-16" delay={0.1}>
            <div className="relative bg-beige/50 rounded-2xl p-8 sm:p-12 border border-gold/10">
              <div className="text-center">
                <p className="text-sm font-medium text-gold tracking-wide uppercase mb-4">
                  {config.imagesLabel}
                </p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {config.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-56 sm:w-64 bg-white rounded-xl border border-gold/10 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-gold/5 hover:border-gold/20 transition-all duration-500"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={256}
                        height={480}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.cards.map((item, index) => {
            const Icon = resolveIcon(item.icon);
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="group h-full p-6 sm:p-8 rounded-2xl bg-white border border-foreground/5 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-beige flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide border mb-4 ${severityStyles[item.severity]}`}
                  >
                    {severityLabels[item.severity]}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
