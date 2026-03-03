"use client";

import { useState } from "react";
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
    <section className="py-12 md:py-16" style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            3 Produtos <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">1 Plataforma</span>
          </h2>
          <p className="text-sm text-white/40 max-w-xl mx-auto">
            Tudo que voce precisa para apresentar, conectar e converter seus clientes.
          </p>
        </div>

        {/* Product tabs */}
        <div className="grid grid-cols-3 gap-2 md:flex md:items-center md:justify-center md:gap-3 mb-8 md:mb-10">
          {products.map((p) => {
            const Icon = p.icon;
            const isActive = active === p.id;
            const isSoon = "comingSoon" in p && p.comingSoon;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-5 py-2.5 rounded-xl text-[11px] md:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-white/40 hover:text-white/60 bg-white/5"
                }`}
                style={isActive ? { background: isSoon ? "#525252" : p.color } : {}}
              >
                <Icon size={14} className="flex-shrink-0 md:w-4 md:h-4" />
                <span className="truncate">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Mockup */}
          <div className="flex justify-center">
            <div
              className="w-[240px] md:w-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{ background: current.mockup.bg }}
            >
              <div className="p-3 md:p-4 space-y-2">
                {current.mockup.blocks.map((block, i) => (
                  <div
                    key={`${active}-${i}`}
                    className="rounded-lg flex items-center justify-center"
                    style={{ height: block.h, background: block.bg }}
                  >
                    <span className="text-[10px] font-medium text-white/50">{block.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">{current.label}</h3>
            <p className="text-sm text-white/50 mb-5 md:mb-6 leading-relaxed">{current.description}</p>
            <ul className="space-y-2.5 mb-6 md:mb-8">
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
        </div>
      </div>
    </section>
  );
}
