"use client";

import { useEffect, useState, useCallback } from "react";
import { adminFetch } from "@/components/admin/AdminAuthGate";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface User {
  id: string;
  full_name: string | null;
  email: string;
  plan: string;
  subscription_status: string | null;
  created_at: string;
  proposals_count: number;
  biolinks_count: number;
  sites_count: number;
}

const PLAN_COLORS: Record<string, string> = {
  free: "#525252",
  lite: "#F97316",
  pro: "#3B82F6",
  plus: "#A855F7",
};

const INPUT_STYLE = {
  background: "#0A0A0A",
  border: "1px solid #262626",
  color: "#fff",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState("all");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const limit = 30;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (plan !== "all") params.set("plan", plan);
    if (search) params.set("q", search);
    if (from) params.set("from", from);
    if (to) params.set("to", to);

    const res = await adminFetch(`/api/admin/users?${params}`);
    const data = await res.json();
    setUsers(data.users || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, plan, search, from, to]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setPage(1);
  }, [plan, search, from, to]);

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Usuarios</h1>
        <p className="text-sm mt-1" style={{ color: "#737373" }}>
          {total} usuarios encontrados
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#525252" }}
          />
          <input
            type="text"
            placeholder="Buscar nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#F97316]"
            style={INPUT_STYLE}
          />
        </div>

        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="px-4 py-2 rounded-xl text-sm outline-none cursor-pointer"
          style={INPUT_STYLE}
        >
          <option value="all">Todos os planos</option>
          <option value="free">Free</option>
          <option value="lite">Lite</option>
          <option value="pro">Pro</option>
          <option value="plus">Plus</option>
        </select>

        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-4 py-2 rounded-xl text-sm outline-none"
          style={INPUT_STYLE}
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="px-4 py-2 rounded-xl text-sm outline-none"
          style={INPUT_STYLE}
        />
      </div>

      {/* Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "#111111", borderColor: "#262626" }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-white/20" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0A0A0A" }}>
                  {["Nome", "Email", "Plano", "Status", "Propostas", "Biolinks", "Sites", "Desde"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-bold uppercase"
                        style={{ color: "#525252" }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t"
                    style={{ borderColor: "#1A1A1A" }}
                  >
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                      {u.full_name || "—"}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#A3A3A3" }}>
                      {u.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                        style={{
                          color: PLAN_COLORS[u.plan] || "#737373",
                          background: (PLAN_COLORS[u.plan] || "#737373") + "15",
                        }}
                      >
                        {u.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {u.subscription_status === "active" ? (
                        <span className="text-green-400 text-xs">Ativo</span>
                      ) : (
                        <span style={{ color: "#525252" }} className="text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-white">{u.proposals_count}</td>
                    <td className="px-4 py-3 text-center text-white">{u.biolinks_count}</td>
                    <td className="px-4 py-3 text-center text-white">{u.sites_count}</td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#737373" }}>
                      {new Date(u.created_at).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-12" style={{ color: "#525252" }}>
                      Nenhum usuario encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: "#525252" }}>
            Pagina {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded-lg border disabled:opacity-30 cursor-pointer"
              style={{ borderColor: "#262626", color: "#A3A3A3" }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2 rounded-lg border disabled:opacity-30 cursor-pointer"
              style={{ borderColor: "#262626", color: "#A3A3A3" }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
