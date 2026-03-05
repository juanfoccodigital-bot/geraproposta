"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroConfig } from "@/types/proposal";

/* ============================================
   1️⃣ HERO SECTION (refatorado com props)
   ============================================ */

interface Props {
  config: HeroConfig;
  meta?: { clientLogo?: string; companyLogo?: string };
}

export default function HeroSection({ config, meta }: Props) {
  const scrollToTarget = () => {
    document
      .getElementById(config.ctaPrimary.scrollTo)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pattern-bg">
      {/* Decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-nude/40 rounded-full blur-3xl" />
      </div>

      {/* Linha dourada no topo */}
      <div className="absolute top-0 left-0 w-full h-[2px] gold-gradient" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/20 bg-cream/60 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-sm font-medium text-foreground/70 tracking-wide uppercase">
            {config.badge}
          </span>
        </motion.div>

        {/* Logos */}
        {(meta?.clientLogo || meta?.companyLogo) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mb-6"
          >
            {meta?.clientLogo && (
              <img src={meta.clientLogo} alt="Logo do cliente" className="h-12 sm:h-16 object-contain" />
            )}
            {meta?.companyLogo && (
              <img src={meta.companyLogo} alt="Logo da empresa" className="h-10 sm:h-14 object-contain" />
            )}
          </motion.div>
        )}

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
        >
          {config.titleLine1}{" "}
          <span className="gold-text">{config.titleHighlight}</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto mb-4 font-light leading-relaxed"
        >
          {config.subtitle}
        </motion.p>

        {/* Nome da cliente */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base text-gold font-medium tracking-wide mb-10"
        >
          {config.clientName}
        </motion.p>

        {/* Botões CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToTarget}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-white font-medium text-base tracking-wide transition-all duration-300 hover:bg-foreground/90 hover:shadow-lg hover:shadow-gold/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {config.ctaPrimary.label}
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          {config.ctaSecondary.url && (
            <a
              href={config.ctaSecondary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-gold/30 text-gold font-medium text-sm tracking-wide transition-all duration-300 hover:bg-gold/5 hover:border-gold/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {config.ctaSecondary.label}
            </a>
          )}
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-0"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
