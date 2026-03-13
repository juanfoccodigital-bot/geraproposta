"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/components/admin/AdminAuthGate";
import { Trophy, FileText, Link2, Globe, Zap, Clock, Loader2 } from "lucide-react";

interface RankedUser {
  id: string;
  full_name: string | null;
  email: string;
  plan: string;
  proposals: number;
  biolinks: number;
  sites: number;
  total: number;
  updated_at: string;
}

interface Rankings {
  byProposals: RankedUser[];
  byBiolinks: RankedUser[];
  bySites: RankedUser[];
  byTotal: RankedUser[];
  recentlyActive: RankedUser[];
}

const PLAN_COLORS: Record<string, string> = {
  free: "#525252",
  lite: "#F97316",
  pro: "#3B82F6",
  plus: "#A855F7",
};

const MEDAL_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

const CARD_STYLE = {
  background: "#111111",
  borderColor: "#262626",
};

function RankingTable({
  title,
  icon: Icon,
  iconColor,
  users,
  valueKey,
  valueLabel,
  formatValue,
}: {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  users: RankedUser[];
  valueKey: keyof RankedUser;
  valueLabel: string;
  formatValue?: (user: RankedUser) => string;
}) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={CARD_STYLE}>
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#1A1A1A" }}>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: iconColor + "15" }}
        >
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
        <h2 className="text-sm font-bold text-white">{title}</h2>
      </div>
      <div className="divide-y" style={{ borderColor: "#1A1A1A" }}>
        {users.length === 0 ? (
          <p className="text-center py-8 text-xs" style={{ color: "#525252" }}>
            Nenhum usuario ainda
          </p>
        ) : (
          users.map((user, i) => (
            <div
              key={user.id}
              className="flex items-center gap-3 px-5 py-3"
              style={{ borderColor: "#1A1A1A" }}
            >
              {/* Position */}
              <div className="w-6 text-center flex-shrink-0">
                {i < 3 ? (
                  <Trophy
                    className="w-4 h-4 mx-auto"
                    style={{ color: MEDAL_COLORS[i] }}
                  />
                ) : (
                  <span className="text-xs font-bold" style={{ color: "#525252" }}>
                    {i + 1}
                  </span>
                )}
              </div>

              {/* User info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">
                  {user.full_name || user.email}
                </p>
                {user.full_name && (
                  <p className="text-[10px] truncate" style={{ color: "#525252" }}>
                    {user.email}
                  </p>
                )}
              </div>

              {/* Plan badge */}
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase flex-shrink-0"
                style={{
                  color: PLAN_COLORS[user.plan] || "#737373",
                  background: (PLAN_COLORS[user.plan] || "#737373") + "15",
                }}
              >
                {user.plan}
              </span>

              {/* Value */}
              <div className="text-right flex-shrink-0 w-16">
                <p className="text-sm font-bold text-white">
                  {formatValue ? formatValue(user) : String(user[valueKey])}
                </p>
                <p className="text-[9px]" style={{ color: "#525252" }}>
                  {valueLabel}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora";
  if (mins < 60) return `${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function AdminRankingPage() {
  const [data, setData] = useState<Rankings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/ranking")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Ranking</h1>
        <p className="text-sm mt-1" style={{ color: "#737373" }}>
          Top usuarios por atividade
        </p>
      </div>

      {/* Top overall */}
      <RankingTable
        title="Mais Ativos (total)"
        icon={Zap}
        iconColor="#F97316"
        users={data.byTotal}
        valueKey="total"
        valueLabel="itens criados"
      />

      {/* Grid 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RankingTable
          title="Mais Propostas"
          icon={FileText}
          iconColor="#F97316"
          users={data.byProposals}
          valueKey="proposals"
          valueLabel="propostas"
        />
        <RankingTable
          title="Mais Biolinks"
          icon={Link2}
          iconColor="#3B82F6"
          users={data.byBiolinks}
          valueKey="biolinks"
          valueLabel="biolinks"
        />
        <RankingTable
          title="Mais Sites"
          icon={Globe}
          iconColor="#22C55E"
          users={data.bySites}
          valueKey="sites"
          valueLabel="sites"
        />
        <RankingTable
          title="Acessos Recentes"
          icon={Clock}
          iconColor="#A855F7"
          users={data.recentlyActive}
          valueKey="updated_at"
          valueLabel="atras"
          formatValue={(u) => timeAgo(u.updated_at)}
        />
      </div>
    </div>
  );
}
