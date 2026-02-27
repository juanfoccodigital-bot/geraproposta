"use client";

import { motion } from "framer-motion";
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
    <section className="py-16 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 rounded-xl border px-4 py-3.5"
                style={{ background: "#111111", borderColor: "#1A1A1A" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(249,115,22,0.10)" }}
                >
                  <Icon size={16} style={{ color: "#F97316" }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold" style={{ color: "rgba(249,115,22,0.35)" }}>
                      {step.number}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#737373" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
