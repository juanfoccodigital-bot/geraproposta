"use client";

import { templates, isTemplateFree } from "@/lib/templates";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { useAuth } from "@/contexts/AuthContext";
import { categoryLabels, ProposalCategory, CategoryRecord } from "@/types/proposal";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Sparkles, ArrowLeft, Plus, Lock, Crown, Search, Eye } from "lucide-react";
import Logo from "@/components/ui/Logo";
import TemplatePreviewThumbnail from "@/components/ui/TemplatePreviewThumbnail";
import dynamic from "next/dynamic";
const AiWizardModal = dynamic(() => import("@/components/proposal/AiWizardModal"), { ssr: false });
import Link from "next/link";

/* ============================================
   NEW PROPOSAL PAGE
   Seletor de templates para criar proposta
   com filtros de categoria, cor e busca.
   ============================================ */

// Categorias únicas dos templates
const allTemplateCats = Array.from(
  new Set(templates.flatMap((t) => t.categories))
);

// Estilos de cor extraídos dos templates (background claro vs escuro)
type ColorStyle = "all" | "light" | "dark";

function getColorStyle(bg: string): "light" | "dark" {
  const hex = bg.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "light" : "dark";
}

export default function NewProposalPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [creating, setCreating] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [colorStyle, setColorStyle] = useState<ColorStyle>("all");
  const [accessFilter, setAccessFilter] = useState<"all" | "free" | "premium">("all");
  const [showAiWizard, setShowAiWizard] = useState(false);

  const userPlan = user?.plan || "free";
  const canUseAllTemplates = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.allTemplates ?? false;

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.ok ? r.json() : [])
      .then(setCategories)
      .catch(() => {});
  }, []);

  const getCategoryLabel = (slug: string): string => {
    const cat = categories.find((c) => c.slug === slug);
    return cat?.name || categoryLabels[slug as ProposalCategory] || slug;
  };

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      // Category
      const matchesCat =
        activeCategory === "all" || t.categories.includes(activeCategory as ProposalCategory);
      // Search
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.categories.some((c) => (categoryLabels[c] || c).toLowerCase().includes(q));
      // Color style
      const matchesColor =
        colorStyle === "all" || getColorStyle(t.config.theme.colors.background) === colorStyle;
      // Access
      const isFree = isTemplateFree(t.id);
      const matchesAccess =
        accessFilter === "all" ||
        (accessFilter === "free" && isFree) ||
        (accessFilter === "premium" && !isFree);

      return matchesCat && matchesSearch && matchesColor && matchesAccess;
    });
  }, [search, activeCategory, colorStyle, accessFilter]);

  async function handleCreateBlank() {
    if (creating) return;
    setCreating("blank");

    try {
      const blankConfig = {
        version: 2 as const,
        templateId: "blank",
        meta: { title: "Nova Proposta", description: "" },
        theme: {
          colors: {
            gold: "#C9A96E", goldLight: "#D4B97A", goldDark: "#B8944F",
            background: "#0A0A0A", foreground: "#FFFFFF",
            beige: "#F5F0E8", nude: "#E8DDD0", cream: "#1A1A1A",
          },
          fonts: { heading: "Playfair Display", body: "Poppins" },
        },
        sections: [],
        blocks: [],
      };

      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Nova Proposta",
          client_name: "Novo Cliente",
          template_id: "blank",
          category: null,
          config: blankConfig,
        }),
      });

      if (!res.ok) throw new Error("Erro ao criar proposta");
      const record = await res.json();
      router.push(`/editor/${record.id}`);
    } catch {
      setCreating(null);
    }
  }

  async function handleSelectTemplate(templateId: string) {
    const template = templates.find((t) => t.id === templateId);
    if (!template || creating) return;

    if (!isTemplateFree(templateId) && !canUseAllTemplates) {
      router.push("/pricing");
      return;
    }

    setCreating(templateId);

    try {
      const catSlug = template.categories[0] || null;
      const cat = catSlug ? categories.find((c) => c.slug === catSlug) : null;

      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: template.config.meta.title,
          client_name: template.config.sections
            .find((s) => s.type === "hero")
            ?.data &&
            "clientName" in template.config.sections.find((s) => s.type === "hero")!.data
            ? (template.config.sections.find((s) => s.type === "hero")!.data as { clientName: string }).clientName
            : "Novo Cliente",
          template_id: template.id,
          category: catSlug,
          category_id: cat?.id || null,
          config: template.config,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao criar proposta");
      }

      const record = await res.json();
      router.push(`/editor/${record.id}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro desconhecido";
      alert(`Erro: ${msg}`);
      setCreating(null);
    }
  }

  const hasActiveFilters = search || activeCategory !== "all" || colorStyle !== "all" || accessFilter !== "all";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Escolha um Modelo
                </h1>
                <p className="text-sm text-zinc-400 mt-0.5">
                  {filtered.length} template{filtered.length !== 1 ? "s" : ""} disponive{filtered.length !== 1 ? "is" : "l"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAiWizard(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-90 cursor-pointer border"
                style={{ borderColor: "#F97316", color: "#F97316", background: "rgba(249,115,22,0.08)" }}
              >
                <Sparkles size={14} />
                Gerar com IA
              </button>
              <Link href="/" className="flex-shrink-0">
                <Logo size="sm" />
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-4">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, categoria..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white placeholder:text-zinc-500 bg-zinc-900 border-zinc-800 focus:border-zinc-600 focus:outline-none transition-all"
            />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category chips */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory("all")}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                style={{
                  background: activeCategory === "all" ? "#F97316" : "#1A1A1A",
                  color: activeCategory === "all" ? "#FFF" : "#A3A3A3",
                  border: `1px solid ${activeCategory === "all" ? "#F97316" : "#262626"}`,
                }}
              >
                Todos
              </button>
              {allTemplateCats.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? "all" : cat)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                  style={{
                    background: activeCategory === cat ? "#F97316" : "#1A1A1A",
                    color: activeCategory === cat ? "#FFF" : "#A3A3A3",
                    border: `1px solid ${activeCategory === cat ? "#F97316" : "#262626"}`,
                  }}
                >
                  {categoryLabels[cat as ProposalCategory] || cat}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-zinc-800" />

            {/* Color style */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setColorStyle(colorStyle === "light" ? "all" : "light")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                style={{
                  background: colorStyle === "light" ? "#FFFFFF" : "#1A1A1A",
                  color: colorStyle === "light" ? "#1A1A1A" : "#A3A3A3",
                  border: `1px solid ${colorStyle === "light" ? "#FFFFFF" : "#262626"}`,
                }}
              >
                <span className="w-3 h-3 rounded-full bg-white border border-zinc-300" />
                Claro
              </button>
              <button
                onClick={() => setColorStyle(colorStyle === "dark" ? "all" : "dark")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                style={{
                  background: colorStyle === "dark" ? "#333" : "#1A1A1A",
                  color: colorStyle === "dark" ? "#FFF" : "#A3A3A3",
                  border: `1px solid ${colorStyle === "dark" ? "#555" : "#262626"}`,
                }}
              >
                <span className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-600" />
                Escuro
              </button>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-zinc-800" />

            {/* Access filter */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setAccessFilter(accessFilter === "free" ? "all" : "free")}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                style={{
                  background: accessFilter === "free" ? "#22C55E20" : "#1A1A1A",
                  color: accessFilter === "free" ? "#22C55E" : "#A3A3A3",
                  border: `1px solid ${accessFilter === "free" ? "#22C55E50" : "#262626"}`,
                }}
              >
                Gratis
              </button>
              <button
                onClick={() => setAccessFilter(accessFilter === "premium" ? "all" : "premium")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                style={{
                  background: accessFilter === "premium" ? "#F9731620" : "#1A1A1A",
                  color: accessFilter === "premium" ? "#F97316" : "#A3A3A3",
                  border: `1px solid ${accessFilter === "premium" ? "#F9731650" : "#262626"}`,
                }}
              >
                <Crown className="w-3 h-3" />
                Premium
              </button>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                  setColorStyle("all");
                  setAccessFilter("all");
                }}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {filtered.length === 0 && hasActiveFilters ? (
          <div className="text-center py-20">
            <Search size={32} className="mx-auto mb-3 text-zinc-700" />
            <p className="text-zinc-400 text-sm mb-2">Nenhum template encontrado.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setColorStyle("all");
                setAccessFilter("all");
              }}
              className="text-xs text-orange-400 hover:text-orange-300 cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create from scratch */}
            <button
              onClick={handleCreateBlank}
              disabled={creating !== null}
              className={`group relative text-left rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 overflow-hidden transition-all hover:border-amber-400/50 hover:bg-zinc-900 ${
                creating !== null && creating !== "blank"
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <div className="h-24 w-full flex items-center justify-center relative">
                {creating === "blank" ? (
                  <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-amber-400/50 transition-colors">
                    <Plus className="w-7 h-7 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white text-lg mb-1.5 group-hover:text-amber-400 transition-colors">
                  Criar do Zero
                </h3>
                <p className="text-sm text-zinc-400 mb-3">
                  Comece com uma proposta em branco e adicione blocos manualmente.
                </p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Em branco
                </span>
              </div>
            </button>

            {filtered.map((template) => {
              const isCreating = creating === template.id;
              const isPremium = !isTemplateFree(template.id);
              const hasAccess = !isPremium || canUseAllTemplates;
              const goldColor = template.config.theme.colors.gold;
              const bgColor = template.config.theme.colors.background;

              return (
                <div
                  key={template.id}
                  className={`group relative text-left rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden transition-all hover:border-zinc-600 hover:shadow-lg hover:shadow-black/20 ${
                    creating !== null && !isCreating
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  {/* Real proposal preview */}
                  <div
                    className="w-full relative cursor-pointer"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <TemplatePreviewThumbnail config={template.config} height={160} />
                    {isCreating && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    {/* Badge */}
                    {isPremium ? (
                      <div
                        className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold text-white z-10"
                        style={{ background: hasAccess ? "rgba(34,197,94,0.8)" : "rgba(0,0,0,0.6)" }}
                      >
                        {hasAccess ? (
                          <Crown className="w-2.5 h-2.5" />
                        ) : (
                          <Lock className="w-2.5 h-2.5" />
                        )}
                        PREMIUM
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold text-white z-10" style={{ background: "rgba(34,197,94,0.8)" }}>
                        GRATIS
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: "#F97316" }}>
                        <Eye size={14} />
                        Usar Template
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm">
                        {template.name}
                      </h3>
                      {/* Color swatches */}
                      <div className="flex gap-1 flex-shrink-0">
                        <div className="w-4 h-4 rounded-full border border-zinc-700" style={{ background: goldColor }} title="Destaque" />
                        <div className="w-4 h-4 rounded-full border border-zinc-700" style={{ background: bgColor }} title="Fundo" />
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Category Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {template.categories.map((catSlug) => (
                        <span
                          key={catSlug}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700"
                        >
                          {getCategoryLabel(catSlug)}
                        </span>
                      ))}
                      {isPremium && !hasAccess && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          Requer Upgrade
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <AiWizardModal open={showAiWizard} onClose={() => setShowAiWizard(false)} />
    </div>
  );
}
