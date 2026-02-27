"use client";

import { TrendingUp, DollarSign, BarChart3, Target } from "lucide-react";
import { formatBrl } from "@/lib/crm-utils";
import type { RevenueStats } from "@/types/crm";

interface RevenueCardsProps {
  stats: RevenueStats | null;
  loading: boolean;
}

function StatSkeleton() {
  return (
    <div className="rounded-xl p-4 animate-pulse" style={{ background: "#111111", border: "1px solid #262626" }}>
      <div className="h-3 w-20 rounded" style={{ background: "#262626" }} />
      <div className="h-7 w-24 rounded mt-2" style={{ background: "#262626" }} />
    </div>
  );
}

export default function RevenueCards({ stats, loading }: RevenueCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <StatSkeleton key={i} />)}
      </div>
    );
  }

  const cards = [
    {
      label: "Pipeline Total",
      value: formatBrl(stats?.totalPipeline || 0),
      icon: TrendingUp,
      color: "#F97316",
    },
    {
      label: "Receita do Mês",
      value: formatBrl(stats?.wonThisMonth || 0),
      icon: DollarSign,
      color: "#5BA68A",
    },
    {
      label: "Negócios Ativos",
      value: String(stats?.dealsActive || 0),
      icon: BarChart3,
      color: "#0EA5E9",
    },
    {
      label: "Taxa de Conversão",
      value: `${stats?.conversionRate || 0}%`,
      icon: Target,
      color: "#A855F7",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl p-4"
          style={{ background: "#111111", border: "1px solid #262626" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg" style={{ background: card.color + "20" }}>
              <card.icon size={14} style={{ color: card.color }} />
            </div>
            <span className="text-[11px] font-medium" style={{ color: "#737373" }}>
              {card.label}
            </span>
          </div>
          <p className="text-xl font-bold text-white mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
