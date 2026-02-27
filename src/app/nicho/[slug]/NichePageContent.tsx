"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Quote, Sparkles } from "lucide-react";
import type { NichePage } from "@/lib/niche-pages";
import { templates } from "@/lib/templates";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function NichePageContent({ niche }: { niche: NichePage }) {
  const nicheTemplates = templates.filter((t) => niche.templateIds.includes(t.id));

  return (
    <main style={{ background: "#0A0A0A" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[128px] opacity-15" style={{ background: "#F97316" }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
            style={{ background: "rgba(249,115,22,0.12)", color: "#F97316" }}
          >
            {niche.title}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
          >
            {niche.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg mb-8"
            style={{ color: "#A3A3A3" }}
          >
            {niche.subheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href={`/?category=${niche.category}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#F97316" }}
            >
              <Sparkles size={16} />
              Ver Templates
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border transition-all hover:bg-white/5"
              style={{ borderColor: "#262626" }}
            >
              Comecar Gratis
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Por que usar o gerapropostas?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {niche.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl border"
                style={{ background: "#111111", borderColor: "#262626" }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(249,115,22,0.15)" }}>
                  <Check size={12} style={{ color: "#F97316" }} />
                </div>
                <p className="text-sm" style={{ color: "#D4D4D4" }}>{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {niche.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-5 text-center"
                style={{ background: "#111111", borderColor: "#262626" }}
              >
                <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "#F97316" }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "#A3A3A3" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      {nicheTemplates.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-3">
              Templates para {niche.title.replace("Propostas para ", "")}
            </h2>
            <p className="text-sm text-center mb-10" style={{ color: "#A3A3A3" }}>
              Escolha um template e personalize em minutos.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nicheTemplates.slice(0, 8).map((tpl) => (
                <Link
                  key={tpl.id}
                  href={`/preview/${tpl.id}`}
                  className="group rounded-xl border p-4 transition-all hover:border-[#404040]"
                  style={{ background: "#111111", borderColor: "#262626" }}
                >
                  <div
                    className="h-24 rounded-lg mb-3"
                    style={{ background: tpl.config.theme?.colors?.gold || "#F97316" }}
                  />
                  <p className="text-sm font-medium text-white truncate">{tpl.name}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "#737373" }}>{tpl.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/?category=${niche.category}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5"
                style={{ color: "#F97316", borderColor: "rgba(249,115,22,0.3)" }}
              >
                Ver Todos os Templates
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border p-8 text-center"
            style={{ background: "#111111", borderColor: "#262626" }}
          >
            <Quote size={24} className="mx-auto mb-4" style={{ color: "#F97316", opacity: 0.5 }} />
            <p className="text-base leading-relaxed mb-6" style={{ color: "#D4D4D4" }}>
              &ldquo;{niche.testimonial.quote}&rdquo;
            </p>
            <p className="text-sm font-semibold text-white">{niche.testimonial.author}</p>
            <p className="text-xs" style={{ color: "#737373" }}>{niche.testimonial.role}</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div
          className="max-w-3xl mx-auto rounded-2xl p-10 text-center"
          style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.04) 100%)", border: "1px solid rgba(249,115,22,0.2)" }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Pronto para fechar mais contratos?
          </h2>
          <p className="text-sm mb-6" style={{ color: "#A3A3A3" }}>
            Crie sua primeira proposta gratis em menos de 5 minutos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#F97316" }}
            >
              Comecar Gratis
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5"
              style={{ color: "#A3A3A3", borderColor: "#262626" }}
            >
              Ver Planos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
