"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/components/admin/AdminAuthGate";
import { DollarSign, TrendingUp, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Stats {
  mrr: number;
  activePlanCounts: Record<string, number>;
  planCounts: Record<string, number>;
  activeSubscribers: number;
}

const PLAN_COLORS: Record<string, string> = {
  lite: "#F97316",
  pro: "#3B82F6",
  plus: "#A855F7",
};

const PLAN_PRICES: Record<string, number> = {
  lite: 2990,
  pro: 4990,
  plus: 9990,
};

const CARD_STYLE = {
  background: "#111111",
  borderColor: "#262626",
};

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function AdminRevenuePage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin text-white/20" />
      </div>
    );
  }

  const chartData = ["lite", "pro", "plus"].map((plan) => ({
    plan: plan.charAt(0).toUpperCase() + plan.slice(1),
    key: plan,
    assinantes: stats.activePlanCounts[plan] || 0,
    receita: ((stats.activePlanCounts[plan] || 0) * (PLAN_PRICES[plan] || 0)) / 100,
  }));

  const arpu =
    stats.activeSubscribers > 0
      ? stats.mrr / stats.activeSubscribers
      : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Faturamento</h1>
        <p className="text-sm mt-1" style={{ color: "#737373" }}>
          Receita recorrente mensal
        </p>
      </div>

      {/* MRR + ARPU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-6" style={CARD_STYLE}>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#3B82F615" }}
            >
              <DollarSign className="w-5 h-5" style={{ color: "#3B82F6" }} />
            </div>
            <p className="text-xs font-medium" style={{ color: "#737373" }}>
              MRR (Receita Mensal Recorrente)
            </p>
          </div>
          <p className="text-3xl font-bold text-white">{formatBRL(stats.mrr)}</p>
        </div>

        <div className="rounded-2xl border p-6" style={CARD_STYLE}>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#22C55E15" }}
            >
              <TrendingUp className="w-5 h-5" style={{ color: "#22C55E" }} />
            </div>
            <p className="text-xs font-medium" style={{ color: "#737373" }}>
              ARPU (Receita Media por Usuario)
            </p>
          </div>
          <p className="text-3xl font-bold text-white">{formatBRL(arpu)}</p>
          <p className="text-xs mt-1" style={{ color: "#525252" }}>
            {stats.activeSubscribers} assinantes ativos
          </p>
        </div>
      </div>

      {/* Revenue by plan - bar chart */}
      <div className="rounded-2xl border p-5" style={CARD_STYLE}>
        <h2 className="text-sm font-bold text-white mb-4">Receita por Plano</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
              <XAxis dataKey="plan" stroke="#525252" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#525252"
                fontSize={10}
                tickLine={false}
                tickFormatter={(v) => `R$${v}`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1A1A1A",
                  border: "1px solid #262626",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(value) => [
                  `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                  "Receita",
                ]}
              />
              <Bar dataKey="receita" radius={[8, 8, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={PLAN_COLORS[entry.key] || "#737373"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="rounded-2xl border p-5" style={CARD_STYLE}>
        <h2 className="text-sm font-bold text-white mb-4">Detalhamento</h2>
        <table className="w-full text-sm">
          <thead>
            <tr>
              {["Plano", "Preco/mes", "Total cadastrados", "Ativos", "Receita mensal"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-2 text-xs font-bold uppercase"
                    style={{ color: "#525252" }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {["lite", "pro", "plus"].map((plan) => {
              const active = stats.activePlanCounts[plan] || 0;
              const total = stats.planCounts[plan] || 0;
              const price = PLAN_PRICES[plan] || 0;
              return (
                <tr key={plan} className="border-t" style={{ borderColor: "#1A1A1A" }}>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={{
                        color: PLAN_COLORS[plan],
                        background: PLAN_COLORS[plan] + "15",
                      }}
                    >
                      {plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white">{formatBRL(price)}</td>
                  <td className="px-4 py-3 text-white">{total}</td>
                  <td className="px-4 py-3 text-white">{active}</td>
                  <td className="px-4 py-3 font-bold text-white">
                    {formatBRL(active * price)}
                  </td>
                </tr>
              );
            })}
            <tr className="border-t" style={{ borderColor: "#262626" }}>
              <td colSpan={4} className="px-4 py-3 text-right text-xs font-bold uppercase" style={{ color: "#737373" }}>
                Total MRR
              </td>
              <td className="px-4 py-3 font-bold text-white text-lg">
                {formatBRL(stats.mrr)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
