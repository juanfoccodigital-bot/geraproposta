"use client";

import { ProposalRecord, ProposalStatus, statusLabels, statusColors, CategoryRecord } from "@/types/proposal";
import { PlanTier } from "@/types/user";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { Plus, Search, Eye, Edit3, Copy, Trash2, ExternalLink, LayoutGrid, Clock, MessageCircle, Zap, ArrowUpRight, Sparkles, Tag } from "lucide-react";
import CategoriesManager from "@/components/dashboard/CategoriesManager";
import ConversionCards from "@/components/dashboard/ConversionCards";
import UrgencyBanner from "@/components/dashboard/UrgencyBanner";
import Navbar from "@/components/landing/Navbar";
import { useAuth } from "@/contexts/AuthContext";

/* ============================================
   DASHBOARD DE PROPOSTAS
   Lista todas as propostas com filtros,
   busca, estatisticas e acoes CRUD
   ============================================ */

// ============================================
// SKELETON LOADER
// ============================================
function CardSkeleton() {
  return (
    <div className="bg-[#111111] rounded-xl border border-[#262626] p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-[#F97316]/5 rounded-lg w-3/4" />
          <div className="h-3 bg-[#F97316]/5 rounded-lg w-1/2" />
        </div>
        <div className="h-5 w-16 bg-[#F97316]/5 rounded-full" />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-3 bg-[#F97316]/5 rounded-lg w-16" />
        <div className="h-3 bg-[#F97316]/5 rounded-lg w-20" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-[#F97316]/5 rounded-lg flex-1" />
        <div className="h-8 bg-[#F97316]/5 rounded-lg flex-1" />
        <div className="h-8 bg-[#F97316]/5 rounded-lg flex-1" />
        <div className="h-8 bg-[#F97316]/5 rounded-lg flex-1" />
      </div>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="bg-[#111111] rounded-xl border border-[#262626] p-4 animate-pulse">
      <div className="h-3 bg-[#F97316]/5 rounded-lg w-20 mb-2" />
      <div className="h-6 bg-[#F97316]/5 rounded-lg w-12" />
    </div>
  );
}

// ============================================
// TOAST COMPONENT
// ============================================
function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#F97316] text-white text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <ExternalLink size={14} />
      {message}
    </div>
  );
}

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user: userProfile, loading: authLoading, refreshProfile } = useAuth();

  // Detectar retorno do pagamento e atualizar perfil
  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      // Dar tempo pro webhook processar, depois atualizar perfil
      const timer = setTimeout(() => {
        refreshProfile();
      }, 2000);
      // Segundo refresh apos 5s caso o webhook demore
      const timer2 = setTimeout(() => {
        refreshProfile();
      }, 5000);
      return () => { clearTimeout(timer); clearTimeout(timer2); };
    }
  }, [searchParams, refreshProfile]);

  // -- State --
  const [proposals, setProposals] = useState<ProposalRecord[]>([]);
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeStatus, setActiveStatus] = useState<ProposalStatus | "all">("all");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [showCategoriesManager, setShowCategoriesManager] = useState(false);

  // -- Usage stats derived from auth profile --
  const usageStats = useMemo(() => {
    if (!userProfile) return null;
    const plan = userProfile.plan as PlanTier;
    const limits = PLAN_LIMITS[plan];
    const today = new Date().toISOString().split("T")[0];
    const monthStart = today.slice(0, 7) + "-01";
    let dailyCount = userProfile.proposals_today as number;
    let monthlyCount = userProfile.proposals_month as number;
    let editsCount = (userProfile.edits_today as number) || 0;
    if (userProfile.last_daily_reset < today) {
      dailyCount = 0;
      editsCount = 0;
    }
    if (userProfile.last_monthly_reset < monthStart) monthlyCount = 0;
    return {
      dailyUsed: dailyCount,
      dailyLimit: limits.dailyCreate,
      monthlyUsed: monthlyCount,
      monthlyLimit: limits.monthlyCreate,
      editsUsed: editsCount,
      editsLimit: limits.dailyEdits,
    };
  }, [userProfile]);

  // -- Fetch proposals --
  const fetchProposals = useCallback(async () => {
    try {
      const res = await fetch("/api/proposals");
      if (!res.ok) throw new Error("Falha ao carregar propostas");
      const data: ProposalRecord[] = await res.json();
      setProposals(data);
    } catch {
      // Erro tratado silenciosamente
    } finally {
      setLoading(false);
    }
  }, []);

  // -- Fetch categories --
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Falha ao carregar categorias");
      const data: CategoryRecord[] = await res.json();
      setCategories(data);
    } catch {
      // Erro tratado silenciosamente
    }
  }, []);

  // Redirect to login if auth finishes and no user
  useEffect(() => {
    if (!authLoading && !userProfile) {
      router.push("/login");
    }
  }, [authLoading, userProfile, router]);

  useEffect(() => {
    if (authLoading) return;
    if (!userProfile) return;
    fetchProposals();
    fetchCategories();
  }, [authLoading, userProfile, fetchProposals, fetchCategories]);

  // -- Helpers --
  const getCategoryForProposal = (p: ProposalRecord): CategoryRecord | undefined => {
    if (p.category_id) return categories.find((c) => c.id === p.category_id);
    if (p.category) return categories.find((c) => c.slug === p.category);
    return undefined;
  };

  // -- Toast helper --
  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }, []);

  // -- Actions --
  const handleDuplicate = async (id: string) => {
    setDuplicatingId(id);
    try {
      const res = await fetch(`/api/proposals/${id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error("Falha ao duplicar");
      showToast("Proposta duplicada com sucesso");
      await Promise.all([fetchProposals(), refreshProfile()]);
    } catch {
      showToast("Erro ao duplicar proposta");
    } finally {
      setDuplicatingId(null);
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast("Link copiado para a area de transferencia");
    }).catch(() => {
      showToast("Erro ao copiar link");
    });
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Tem certeza que deseja excluir a proposta "${title}"? Esta acao nao pode ser desfeita.`);
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir");
      showToast("Proposta excluida com sucesso");
      await fetchProposals();
    } catch {
      showToast("Erro ao excluir proposta");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (proposalId: string, newStatus: string) => {
    await fetch(`/api/proposals/${proposalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    await fetchProposals();
    showToast(`Status alterado para ${statusLabels[newStatus as ProposalStatus]}`);
  };

  const handleCategoryChange = async (proposalId: string, categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    await fetch(`/api/proposals/${proposalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category_id: categoryId || null,
        category: cat?.slug || null,
      }),
    });
    await fetchProposals();
    showToast(categoryId ? `Categoria: ${cat?.name}` : "Categoria removida");
  };

  // -- Filtered proposals --
  const filteredProposals = proposals.filter((p) => {
    const cat = getCategoryForProposal(p);
    const matchesCategory =
      activeCategory === "all" ||
      cat?.id === activeCategory ||
      cat?.slug === activeCategory ||
      p.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.client_name.toLowerCase().includes(query);
    const matchesStatus = activeStatus === "all" || p.status === activeStatus;
    return matchesCategory && matchesSearch && matchesStatus;
  });

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Toast message={toastMessage} visible={toastVisible} />
      <CategoriesManager
        open={showCategoriesManager}
        onClose={() => setShowCategoriesManager(false)}
        onUpdate={fetchCategories}
      />

      {/* ── Shared Navbar ── */}
      <Navbar
        onCategoriesClick={() => setShowCategoriesManager(true)}
      />

      {/* ── Page Header ── */}
      <div className="border-b" style={{ background: "#0A0A0A", borderColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Propostas</h1>
              <p className="text-sm mt-1" style={{ color: "#737373" }}>
                {userProfile?.full_name ? `Ola, ${userProfile.full_name.split(" ")[0]}! ` : ""}Gerencie suas propostas comerciais.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/templates")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#F97316" }}
              >
                <Plus size={16} />
                Nova Proposta
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-5 relative max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por titulo ou cliente..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
              style={{ background: "#111111", borderColor: "#262626" }}
            />
          </div>
        </div>
      </div>

      {/* ── Usage Bar + Urgency Banner ── */}
      {usageStats && userProfile && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          {/* Urgency Banner */}
          <UrgencyBanner
            plan={userProfile.plan as PlanTier}
            dailyUsed={usageStats.dailyUsed}
            dailyLimit={usageStats.dailyLimit}
            monthlyUsed={usageStats.monthlyUsed}
            monthlyLimit={usageStats.monthlyLimit}
          />

          {/* Usage Bars */}
          {(() => {
            const isDaily = usageStats.dailyLimit !== Infinity;
            const used = isDaily ? usageStats.dailyUsed : usageStats.monthlyUsed;
            const limit = isDaily ? usageStats.dailyLimit : usageStats.monthlyLimit;
            const pct = limit !== Infinity ? (used / limit) * 100 : 5;
            const remaining = limit !== Infinity ? limit - used : Infinity;
            const barColor = pct >= 100 ? "#EF4444" : pct >= 80 ? "#EAB308" : pct >= 50 ? "#F97316" : "#22C55E";

            const editsUsed = usageStats.editsUsed;
            const editsLimit = usageStats.editsLimit;
            const editsPct = editsLimit !== Infinity ? (editsUsed / editsLimit) * 100 : 5;
            const editsRemaining = editsLimit !== Infinity ? editsLimit - editsUsed : Infinity;
            const editsBarColor = editsPct >= 100 ? "#EF4444" : editsPct >= 80 ? "#EAB308" : editsPct >= 50 ? "#F97316" : "#22C55E";

            return (
              <div className="space-y-3">
                <div className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: "#111111", borderColor: "#262626" }}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium" style={{ color: "#A3A3A3" }}>
                        {limit === Infinity
                          ? `${used} propostas ${isDaily ? "hoje" : "este mes"}`
                          : `${used} / ${limit} propostas ${isDaily ? "hoje" : "este mes"}`}
                      </span>
                      <span className="text-xs font-medium" style={{ color: "#525252" }}>
                        {limit === Infinity
                          ? "Ilimitado"
                          : remaining <= 0
                            ? "Limite atingido"
                            : `${remaining} restantes`}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#262626" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, pct)}%`, backgroundColor: barColor }}
                      />
                    </div>
                  </div>
                  {userProfile.plan === "free" ? (
                    <button
                      onClick={() => router.push("/pricing")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 flex-shrink-0 cursor-pointer"
                      style={{ backgroundColor: "#F97316" }}
                    >
                      <Zap size={14} />
                      Fazer Upgrade
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/dashboard/assinatura")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white/70 border transition-all hover:bg-white/5 flex-shrink-0 cursor-pointer"
                      style={{ borderColor: "#333" }}
                    >
                      Gerenciar Assinatura
                    </button>
                  )}
                </div>

                {/* Edits usage bar */}
                <div className="rounded-xl border p-4" style={{ background: "#111111", borderColor: "#262626" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium" style={{ color: "#A3A3A3" }}>
                      {editsLimit === Infinity
                        ? `${editsUsed} alteracoes hoje`
                        : `${editsUsed} / ${editsLimit} alteracoes hoje`}
                    </span>
                    <span className="text-xs font-medium" style={{ color: "#525252" }}>
                      {editsLimit === Infinity
                        ? "Ilimitado"
                        : editsRemaining <= 0
                          ? "Limite atingido"
                          : `${editsRemaining} restantes`}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "#262626" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, editsPct)}%`, backgroundColor: editsBarColor }}
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Conversion Cards */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        ) : (
          <ConversionCards proposals={proposals} />
        )}

        {/* Category Filter Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === "all"
                ? "text-white"
                : "text-white/60 border hover:border-[#404040]"
            }`}
            style={{
              backgroundColor: activeCategory === "all" ? "#F97316" : "#111111",
              borderColor: activeCategory === "all" ? "#F97316" : "#262626",
            }}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "text-white"
                  : "text-white/60 border hover:border-[#404040]"
              }`}
              style={{
                backgroundColor: activeCategory === cat.id ? cat.color : "#111111",
                borderColor: activeCategory === cat.id ? cat.color : "#262626",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveStatus("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeStatus === "all"
                ? "text-white"
                : "text-white/60 border hover:border-[#404040]"
            }`}
            style={{
              backgroundColor: activeStatus === "all" ? "#F97316" : "#111111",
              borderColor: activeStatus === "all" ? "#F97316" : "#262626",
            }}
          >
            Todos Status
          </button>
          {(["pendente", "aceita", "recusada"] as ProposalStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => setActiveStatus(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeStatus === st
                  ? "text-white"
                  : "text-white/60 border hover:border-[#404040]"
              }`}
              style={{
                backgroundColor: activeStatus === st ? statusColors[st] : "#111111",
                borderColor: activeStatus === st ? statusColors[st] : "#262626",
              }}
            >
              {statusLabels[st]}
            </button>
          ))}
        </div>

        {/* Loading Skeleton Grid */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProposals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(249,115,22,0.05)" }}>
              <LayoutGrid size={24} className="text-white/20" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {proposals.length === 0
                ? "Nenhuma proposta criada"
                : "Nenhuma proposta encontrada"}
            </h3>
            <p className="text-sm mb-6 max-w-sm" style={{ color: "#737373" }}>
              {proposals.length === 0
                ? "Comece criando sua primeira proposta comercial personalizada."
                : "Tente ajustar os filtros ou o termo de busca."}
            </p>
            {proposals.length === 0 && (
              <button
                onClick={() => router.push("/templates")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#F97316" }}
              >
                <Plus size={16} />
                Criar Proposta
              </button>
            )}
          </div>
        )}

        {/* Proposals Grid */}
        {!loading && filteredProposals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProposals.map((proposal) => {
              const cat = getCategoryForProposal(proposal);
              return (
                <div
                  key={proposal.id}
                  className="rounded-xl border p-5 hover:border-[#404040] transition-all duration-200 group"
                  style={{ background: "#111111", borderColor: "#262626" }}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {proposal.title}
                      </h3>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "#737373" }}>
                        {proposal.client_name}
                      </p>
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: statusColors[proposal.status || "pendente"] }}
                    >
                      {statusLabels[proposal.status || "pendente"]}
                    </span>
                  </div>

                  {/* Card Meta */}
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#737373" }}>
                      <Eye size={12} />
                      {proposal.views || 0}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#737373" }}>
                      <Clock size={12} />
                      {new Date(proposal.created_at).toLocaleDateString("pt-BR")}
                    </span>
                    {/* Category selector */}
                    <div className="relative inline-flex items-center">
                      <Tag size={10} className="absolute left-2 pointer-events-none" style={{ color: cat ? cat.color : "#525252" }} />
                      <select
                        value={cat?.id || ""}
                        onChange={(e) => handleCategoryChange(proposal.id, e.target.value)}
                        className="pl-6 pr-2 py-0.5 rounded-full text-[11px] font-medium border cursor-pointer appearance-none bg-transparent"
                        style={{
                          color: cat ? cat.color : "#525252",
                          borderColor: cat ? `${cat.color}40` : "#262626",
                          backgroundColor: cat ? `${cat.color}15` : "transparent",
                        }}
                      >
                        <option value="">Sem categoria</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="space-y-2">
                    {/* Row 1: Main actions */}
                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        onClick={() => router.push(`/editor/${proposal.id}`)}
                        className="inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer hover:text-white"
                        style={{ color: "#A3A3A3", background: "#0A0A0A", borderColor: "#262626" }}
                        title="Editar"
                      >
                        <Edit3 size={12} className="flex-shrink-0" />
                        <span className="hidden 2xl:inline truncate">Editar</span>
                      </button>

                      <button
                        onClick={() => handleDuplicate(proposal.id)}
                        disabled={duplicatingId === proposal.id}
                        className="inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ color: "#A3A3A3", background: "#0A0A0A", borderColor: "#262626" }}
                        title="Duplicar"
                      >
                        <Copy size={12} className="flex-shrink-0" />
                        <span className="hidden 2xl:inline truncate">
                          {duplicatingId === proposal.id ? "..." : "Duplicar"}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          const url = `${window.location.origin}/p/${proposal.slug}`;
                          const msg = encodeURIComponent(`Olá! Confira a proposta: ${url}`);
                          window.open(`https://wa.me/?text=${msg}`, "_blank");
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer"
                        style={{ color: "#22C55E", background: "#0A0A0A", borderColor: "#262626" }}
                        title="Enviar WhatsApp"
                      >
                        <MessageCircle size={12} className="flex-shrink-0" />
                        <span className="hidden 2xl:inline truncate">WhatsApp</span>
                      </button>

                      <button
                        onClick={() => handleCopyLink(proposal.slug)}
                        className="inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer hover:text-white"
                        style={{ color: "#A3A3A3", background: "#0A0A0A", borderColor: "#262626" }}
                        title="Copiar Link"
                      >
                        <ExternalLink size={12} className="flex-shrink-0" />
                        <span className="hidden 2xl:inline truncate">Link</span>
                      </button>
                    </div>

                    {/* Row 2: Status + Delete */}
                    <div className="flex gap-1.5">
                      <select
                        value={proposal.status || "pendente"}
                        onChange={(e) => handleStatusChange(proposal.id, e.target.value)}
                        className="flex-1 px-2 py-2 rounded-lg text-xs font-medium border cursor-pointer appearance-none text-center"
                        style={{ color: "#A3A3A3", background: "#0A0A0A", borderColor: "#262626" }}
                        title="Alterar Status"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="aceita">Aceita</option>
                        <option value="recusada">Recusada</option>
                      </select>

                      <button
                        onClick={() => handleDelete(proposal.id, proposal.title)}
                        disabled={deletingId === proposal.id}
                        className="inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ color: "#EF4444", background: "#0A0A0A", borderColor: "#262626" }}
                        title="Excluir"
                      >
                        <Trash2 size={12} className="flex-shrink-0" />
                        <span className="hidden 2xl:inline truncate">
                          {deletingId === proposal.id ? "..." : "Excluir"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
