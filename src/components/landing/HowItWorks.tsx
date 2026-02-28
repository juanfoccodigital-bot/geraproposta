"use client";

import { LayoutTemplate, Paintbrush, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: LayoutTemplate,
    title: "Escolha um template",
    description: "Mais de 100 templates profissionais prontos para o seu nicho.",
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Personalize em minutos",
    description: "Editor visual intuitivo. Ajuste cores, textos e imagens sem codigo.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Envie e feche o contrato",
    description: "Compartilhe via link ou WhatsApp e acompanhe as visualizacoes.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-10 md:py-16 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-3"
            style={{ background: "rgba(249,115,22,0.12)", color: "#F97316" }}
          >
            Como Funciona
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            3 passos para fechar contratos
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-3 md:gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-2 md:gap-3 rounded-xl border px-3 py-3 md:px-4 md:py-3.5"
                style={{ background: "#111111", borderColor: "#1A1A1A" }}
              >
                <div
                  className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(249,115,22,0.10)" }}
                >
                  <Icon size={14} className="md:w-4 md:h-4" style={{ color: "#F97316" }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-center md:justify-start gap-1.5 md:gap-2 mb-0.5">
                    <span className="text-[9px] md:text-[10px] font-bold" style={{ color: "rgba(249,115,22,0.35)" }}>
                      {step.number}
                    </span>
                    <h3 className="text-[11px] md:text-sm font-semibold text-white leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[10px] md:text-xs leading-relaxed hidden md:block" style={{ color: "#737373" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
