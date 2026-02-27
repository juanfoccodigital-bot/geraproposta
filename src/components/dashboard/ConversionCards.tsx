"use client";

import { ProposalRecord, InvestimentoConfig } from "@/types/proposal";
import { Send, Eye, TrendingUp, DollarSign } from "lucide-react";

interface ConversionCardsProps {
  proposals: ProposalRecord[];
}

export default function ConversionCards({ proposals }: ConversionCardsProps) {
  const total = proposals.length;
  const totalViews = proposals.reduce((sum, p) => sum + (p.views || 0), 0);
  const accepted = proposals.filter((p) => p.status === "aceita").length;

  const viewRate = total > 0 ? Math.round((totalViews / total) * 100) / 100 : 0;
  const conversionRate = total > 0 ? Math.round((accepted / total) * 100) : 0;

  // Sum investment values from accepted proposals
  const revenue = proposals
    .filter((p) => p.status === "aceita")
    .reduce((sum, p) => {
      const config = p.config;
      if (config?.version === 2 && config?.blocks) {
        const inv = config.blocks.find((b) => b.type === "investimento");
        if (inv?.data) {
          const d = inv.data as InvestimentoConfig;
          const val = parseFloat(d.priceCurrent?.replace(/[^\d.,]/g, "").replace(",", ".") || "0");
          if (val > 0) return sum + val;
        }
      }
      if (config?.sections) {
        const inv = config.sections.find((s) => s.type === "investimento");
        if (inv?.data) {
          const d = inv.data as InvestimentoConfig;
          const val = parseFloat(d.priceCurrent?.replace(/[^\d.,]/g, "").replace(",", ".") || "0");
          if (val > 0) return sum + val;
        }
      }
      return sum;
    }, 0);

  const cards = [
    {
      label: "Propostas Enviadas",
      value: total.toString(),
      icon: Send,
      color: "#F97316",
      bgColor: "rgba(249,115,22,0.12)",
    },
    {
      label: "Views por Proposta",
      value: viewRate.toFixed(1),
      icon: Eye,
      color: "#4A7BC7",
      bgColor: "rgba(74,123,199,0.12)",
    },
    {
      label: "Taxa de Conversao",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: "#5BA68A",
      bgColor: "rgba(91,166,138,0.12)",
    },
    {
      label: "Receita Potencial",
      value: revenue > 0 ? `R$${revenue.toLocaleString("pt-BR")}` : "—",
      icon: DollarSign,
      color: "#C9A96E",
      bgColor: "rgba(201,169,110,0.12)",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-xl border p-4 flex items-center gap-3"
            style={{ background: "#111111", borderColor: "#262626" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: card.bgColor }}
            >
              <Icon size={16} style={{ color: card.color }} />
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: "#A3A3A3" }}>
                {card.label}
              </p>
              <p className="text-xl font-semibold text-white">{card.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
