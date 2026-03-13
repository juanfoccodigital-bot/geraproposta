"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/components/admin/AdminAuthGate";
import {
  Users,
  CreditCard,
  DollarSign,
  FileText,
  Link2,
  Globe,
  Loader2,
  Gift,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stats {
  totalUsers: number;
  activeSubscribers: number;
  giftedUsers: number;
  mrr: number;
  ticketMedio: number;
  planCounts: Record<string, number>;
  activePlanCounts: Record<string, number>;
  totalProposals: number;
  totalBiolinks: number;
  totalSites: number;
  signups: { date: string; count: number }[];
  cumulative: { date: string; total: number }[];
}

const CARD_STYLE = {
  background: "#111111",
  borderColor: "#262626",
};

function MetricCard({
  label,
  value,
  subtitle,
  icon: Icon,
  color = "#F97316",
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5 flex items-start gap-4"
      style={CARD_STYLE}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: color + "15" }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-xs font-medium" style={{ color: "#737373" }}>
          {label}
        </p>
        <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
        {subtitle && (
          <p className="text-[10px] mt-0.5" style={{ color: "#525252" }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function formatDate(iso: unknown) {
  const str = String(iso);
  const [, m, d] = str.split("-");
  return `${d}/${m}`;
}

export default function AdminDashboard() {
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

  const mrrFormatted = (stats.mrr / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const ticketFormatted = (stats.ticketMedio / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "#737373" }}>
          Visao geral do sistema
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard label="Total de Usuarios" value={stats.totalUsers} icon={Users} />
        <MetricCard
          label="Assinantes Pagantes"
          value={stats.activeSubscribers}
          icon={CreditCard}
          color="#22C55E"
        />
        <MetricCard
          label="Cortesia"
          value={stats.giftedUsers}
          subtitle="acesso manual (nao pagaram)"
          icon={Gift}
          color="#EAB308"
        />
        <MetricCard label="MRR" value={mrrFormatted} icon={DollarSign} color="#3B82F6" />
        <MetricCard
          label="Ticket Medio"
          value={ticketFormatted}
          icon={BarChart3}
          color="#A855F7"
        />
        <MetricCard label="Propostas" value={stats.totalProposals} icon={FileText} />
        <MetricCard label="Biolinks" value={stats.totalBiolinks} icon={Link2} />
        <MetricCard label="Sites" value={stats.totalSites} icon={Globe} />
      </div>

      {/* Plan breakdown */}
      <div className="rounded-2xl border p-5" style={CARD_STYLE}>
        <h2 className="text-sm font-bold text-white mb-4">Distribuicao de Planos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(stats.planCounts).map(([plan, count]) => (
            <div key={plan} className="text-center">
              <p className="text-xs uppercase font-bold" style={{ color: "#737373" }}>
                {plan}
              </p>
              <p className="text-xl font-bold text-white">{count}</p>
              {plan !== "free" && (
                <p className="text-[10px]" style={{ color: "#525252" }}>
                  {stats.activePlanCounts[plan] || 0} pagantes
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Signups */}
        <div className="rounded-2xl border p-5" style={CARD_STYLE}>
          <h2 className="text-sm font-bold text-white mb-4">
            Cadastros (ultimos 30 dias)
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.signups}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#525252"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis stroke="#525252" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#1A1A1A",
                    border: "1px solid #262626",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelFormatter={formatDate}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#F97316"
                  fill="url(#colorSignups)"
                  name="Cadastros"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cumulative */}
        <div className="rounded-2xl border p-5" style={CARD_STYLE}>
          <h2 className="text-sm font-bold text-white mb-4">
            Usuarios Acumulados
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.cumulative}>
                <defs>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#525252"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis stroke="#525252" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#1A1A1A",
                    border: "1px solid #262626",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelFormatter={formatDate}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3B82F6"
                  fill="url(#colorCumulative)"
                  name="Total"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
