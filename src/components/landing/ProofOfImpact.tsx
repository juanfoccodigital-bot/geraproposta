"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+100", label: "Templates" },
  { value: "+12", label: "Nichos" },
  { value: "3x", label: "Mais conversao" },
  { value: "<5min", label: "Para enviar" },
];

const testimonials = [
  {
    quote: "Antes eu levava horas montando propostas no Canva. Agora em 5 minutos tenho algo muito mais profissional e ja envio pelo WhatsApp.",
    author: "Marina Silva",
    role: "Social Media Manager",
  },
  {
    quote: "Meus clientes comecaram a fechar mais rapido depois que passei a usar as propostas do gerapropostas. A apresentacao faz toda diferenca.",
    author: "Rafael Costa",
    role: "Gestor de Trafego",
  },
  {
    quote: "Como agencia, precisavamos de algo escalavel. Com o plano Pro, cada membro da equipe cria propostas incriveis em minutos.",
    author: "Camila Oliveira",
    role: "CEO - Agencia Digital",
  },
];

export default function ProofOfImpact() {
  return (
    <section className="py-14 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-5xl mx-auto">
        {/* Stats — inline row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl font-bold" style={{ color: "#F97316" }}>
                {stat.value}
              </span>
              <span className="text-xs" style={{ color: "#737373" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials — compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border px-4 py-3.5"
              style={{ background: "#111111", borderColor: "#1A1A1A" }}
            >
              <p className="text-xs leading-relaxed mb-2.5" style={{ color: "#A3A3A3" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "#F9731615", color: "#F97316" }}>
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-white">{t.author}</p>
                  <p className="text-[10px]" style={{ color: "#525252" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
