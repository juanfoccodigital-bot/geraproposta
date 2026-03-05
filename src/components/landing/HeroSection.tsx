"use client";

import { FileText, Link2, Globe, LayoutTemplate, Paintbrush, Sparkles, Share2, MessageCircle, Palette } from "lucide-react";

const marqueeFeatures = [
  { icon: LayoutTemplate, title: "Templates Prontos" },
  { icon: Paintbrush, title: "Editor Visual" },
  { icon: Palette, title: "Personalizacao Total" },
  { icon: Sparkles, title: "IA Integrada" },
  { icon: Share2, title: "Link Compartilhavel" },
  { icon: MessageCircle, title: "WhatsApp Direto" },
  { icon: Link2, title: "Link na Bio" },
  { icon: Globe, title: "Criador de Sites" },
];
const doubledFeatures = [...marqueeFeatures, ...marqueeFeatures];

interface HeroSectionProps {
  onOpenAiWizard?: () => void;
}

export default function HeroSection({ onOpenAiWizard }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[128px] opacity-15" style={{ background: "#F97316" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[96px] opacity-10" style={{ background: "#FB923C" }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 pt-6 pb-10 md:py-16">
        {/* Product badges */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ background: "#111111", borderColor: "#262626", color: "#A3A3A3" }}>
            <FileText size={12} style={{ color: "#F97316" }} />
            Propostas
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ background: "#111111", borderColor: "#262626", color: "#A3A3A3" }}>
            <Link2 size={12} style={{ color: "#F97316" }} />
            Link na Bio
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ background: "#111111", borderColor: "#262626", color: "#A3A3A3" }}>
            <Globe size={12} style={{ color: "#F97316" }} />
            Criador de Sites
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
          Feche mais contratos com{" "}
          <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
            propostas que impressionam.
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-8"
          style={{ color: "#A3A3A3" }}
        >
          Propostas profissionais, links na bio e landing pages prontos
          em minutos. Envie, impressione e converta mais clientes.
        </p>

        {/* CTA Buttons */}
        {onOpenAiWizard && (
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <button
              onClick={onOpenAiWizard}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer"
              style={{ background: "#F97316", color: "#fff" }}
            >
              <Sparkles size={16} />
              Gerar Proposta com IA
            </button>
            <a
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all border cursor-pointer hover:bg-white/5"
              style={{ borderColor: "#333", color: "#A3A3A3" }}
            >
              Ver Templates
            </a>
          </div>
        )}

      </div>

      {/* Orange animated marquee bar */}
      <style jsx global>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="relative overflow-hidden py-3"
        style={{ background: "linear-gradient(90deg, #EA580C 0%, #F97316 50%, #EA580C 100%)" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-scroll 18s linear infinite" }}
        >
          {doubledFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2 mx-6 md:mx-8 text-xs md:text-sm font-semibold text-white/90 flex-shrink-0"
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {feature.title}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
