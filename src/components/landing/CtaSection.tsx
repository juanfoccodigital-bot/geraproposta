"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-16 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #EA580C 0%, #F97316 50%, #FB923C 100%)" }}>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-white mb-3"
        >
          Comece a fechar mais contratos hoje
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-white/80 mb-6"
        >
          Propostas profissionais que convertem. Assine e tenha acesso ilimitado a templates, IA e muito mais.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "#FFFFFF", color: "#EA580C" }}
          >
            <Crown size={16} />
            Ver Planos
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 transition-all hover:bg-white/10"
          >
            Comecar Gratis
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
