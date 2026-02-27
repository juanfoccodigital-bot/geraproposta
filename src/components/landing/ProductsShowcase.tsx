"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Link2, Globe, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "propostas",
    label: "Propostas",
    icon: FileText,
    color: "#F97316",
    description: "Crie propostas comerciais profissionais com templates prontos. Personalize cores, blocos e envie para seus clientes com um link.",
    features: ["500+ templates por nicho", "Editor visual completo", "Link de compartilhamento", "CRM integrado"],
    ctaText: "Ver Templates",
    ctaHref: "/templates",
    mockup: {
      bg: "linear-gradient(135deg, #1A1A1A 0%, #111 100%)",
      blocks: [
        { h: "60px", bg: "#F97316", label: "Hero" },
        { h: "40px", bg: "#1A1A1A", label: "Sobre" },
        { h: "50px", bg: "#262626", label: "Servicos" },
        { h: "35px", bg: "#F97316", label: "CTA" },
      ],
    },
  },
  {
    id: "links",
    label: "Link na Bio",
    icon: Link2,
    color: "#F97316",
    description: "Crie paginas de links elegantes para suas redes sociais. Templates premium com animacoes e blocos sociais.",
    features: ["6 templates exclusivos", "Blocos de links e social", "Preview mobile em tempo real", "Contador de views"],
    ctaText: "Criar Meu Link",
    ctaHref: "/biolink",
    mockup: {
      bg: "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)",
      blocks: [
        { h: "50px", bg: "#667eea", label: "Avatar" },
        { h: "30px", bg: "#667eea50", label: "Link 1" },
        { h: "30px", bg: "#667eea50", label: "Link 2" },
        { h: "30px", bg: "#667eea50", label: "Link 3" },
        { h: "25px", bg: "#667eea30", label: "Social" },
      ],
    },
  },
  {
    id: "sites",
    label: "Criador de Sites",
    icon: Globe,
    color: "#6366F1",
    description: "Landing pages profissionais em minutos. 10 templates por categoria, editor visual com preview responsivo.",
    features: ["10 templates por categoria", "Navbar, hero, servicos, contato", "Preview desktop/tablet/mobile", "Publicacao instantanea"],
    ctaText: "Em Breve",
    ctaHref: "",
    comingSoon: true,
    mockup: {
      bg: "linear-gradient(135deg, #FDFBF8 0%, #F5F0EB 100%)",
      blocks: [
        { h: "25px", bg: "#C9A96E", label: "Navbar" },
        { h: "60px", bg: "#C9A96E30", label: "Hero" },
        { h: "40px", bg: "#F5F0EB", label: "Sobre" },
        { h: "45px", bg: "#E8DDD3", label: "Servicos" },
        { h: "30px", bg: "#1A1A1A", label: "Footer" },
      ],
    },
  },
];

export default function ProductsShowcase() {
  const [active, setActive] = useState("propostas");
  const current = products.find((p) => p.id === active)!;

  return (
    <section className="py-16" style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            3 Produtos. <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">1 Plataforma.</span>
          </h2>
          <p className="text-sm text-white/40 max-w-xl mx-auto">
            Tudo que voce precisa para apresentar, conectar e converter seus clientes.
          </p>
        </div>

        {/* Product tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {products.map((p) => {
            const Icon = p.icon;
            const isActive = active === p.id;
            const isSoon = "comingSoon" in p && p.comingSoon;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-white/40 hover:text-white/60 bg-white/5 hover:bg-white/8"
                }`}
                style={isActive ? { background: isSoon ? "#525252" : p.color } : {}}
              >
                <Icon size={16} />
                {p.label}
                {isSoon && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: "#F97316", color: "#FFF" }}>
                    Em breve
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Product content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Mockup */}
            <div className="flex justify-center">
              <div
                className="w-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                style={{ background: current.mockup.bg }}
              >
                <div className="p-4 space-y-2">
                  {current.mockup.blocks.map((block, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-lg flex items-center justify-center"
                      style={{ height: block.h, background: block.bg }}
                    >
                      <span className="text-[10px] font-medium text-white/50">{block.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{current.label}</h3>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">{current.description}</p>
              <ul className="space-y-2.5 mb-8">
                {current.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: current.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              {"comingSoon" in current && current.comingSoon ? (
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/50"
                  style={{ background: "#262626" }}
                >
                  <Clock size={16} />
                  Em Breve
                </span>
              ) : (
                <Link
                  href={current.ctaHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: current.color }}
                >
                  {current.ctaText}
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
