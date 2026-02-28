"use client";

import { templates, isTemplateFree, FREE_TEMPLATE_IDS } from "@/lib/templates";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { useAuth } from "@/contexts/AuthContext";
import { categoryLabels, ProposalCategory } from "@/types/proposal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Eye, Crown, ArrowRight, Search } from "lucide-react";
import { useState, useMemo } from "react";
import TemplatePreviewThumbnail from "@/components/ui/TemplatePreviewThumbnail";

const allCats = Array.from(new Set(templates.flatMap((t) => t.categories)));

type ColorStyle = "all" | "light" | "dark";

function getColorStyle(bg: string): "light" | "dark" {
  const hex = bg.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "light" : "dark";
}

interface TemplatesPreviewProps {
  searchQuery?: string;
  activeCategory?: string;
  onCategoryChange?: (cat: string) => void;
  maxItems?: number;
}

export default function TemplatesPreview({
  searchQuery = "",
  activeCategory: externalCategory,
  onCategoryChange,
  maxItems,
}: TemplatesPreviewProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [internalCategory, setInternalCategory] = useState<string>("all");
  const [creating, setCreating] = useState<string | null>(null);
  const [colorStyle, setColorStyle] = useState<ColorStyle>("all");
  const [accessFilter, setAccessFilter] = useState<"all" | "free" | "premium">("all");

  // Use external state if provided, otherwise internal
  const activeCategory = externalCategory ?? internalCategory;
  const setActiveCategory = onCategoryChange ?? setInternalCategory;

  const isLoggedIn = !!user;
  const userPlan = user?.plan || "free";
  const canUseAllTemplates = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.allTemplates ?? false;

  const handleUseTemplate = async (templateId: string) => {
    const isFree = isTemplateFree(templateId);
    if (!isFree && !canUseAllTemplates) {
      router.push("/pricing");
      return;
    }
    if (!user) {
      router.push("/signup");
      return;
    }
    setCreating(templateId);
    try {
      const tpl = templates.find((t) => t.id === templateId);
      if (!tpl) return;
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: tpl.name,
          client_name: "Novo Cliente",
          template_id: tpl.id,
          category: tpl.categories[0] || null,
          config: tpl.config,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Erro ao criar proposta");
        return;
      }
      const proposal = await res.json();
      router.push(`/editor/${proposal.id}`);
    } catch {
      alert("Erro ao criar proposta");
    } finally {
      setCreating(null);
    }
  };

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchesCat =
        activeCategory === "all" || t.categories.includes(activeCategory as ProposalCategory);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.categories.some((c) => categoryLabels[c]?.toLowerCase().includes(q));
      const matchesColor =
        colorStyle === "all" || getColorStyle(t.config.theme.colors.background) === colorStyle;
      const isFree = isTemplateFree(t.id);
      const matchesAccess =
        accessFilter === "all" ||
        (accessFilter === "free" && isFree) ||
        (accessFilter === "premium" && !isFree);
      return matchesCat && matchesSearch && matchesColor && matchesAccess;
    });
  }, [searchQuery, activeCategory, colorStyle, accessFilter]);

  const hasActiveFilters = activeCategory !== "all" || colorStyle !== "all" || accessFilter !== "all" || searchQuery.trim() !== "";

  const [showAll, setShowAll] = useState(false);
  const displayLimit = showAll || !maxItems ? filtered.length : maxItems;
  const visibleTemplates = filtered.slice(0, displayLimit);
  const hasMore = maxItems && !showAll && filtered.length > maxItems;

  return (
    <section id="templates" className="py-12 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
              Templates de Propostas
            </h2>
            <p className="text-sm" style={{ color: "#737373" }}>
              Escolha um modelo, visualize e personalize.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold border" style={{ color: "#22C55E", borderColor: "#22C55E30", background: "#22C55E10" }}>
              {FREE_TEMPLATE_IDS.length} Gratis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold border" style={{ color: "#F97316", borderColor: "#F9731630", background: "#F9731610" }}>
              <Crown size={10} />
              {templates.length - FREE_TEMPLATE_IDS.length} Premium
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory("all")}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
              style={{
                background: activeCategory === "all" ? "#F97316" : "#111111",
                color: activeCategory === "all" ? "#FFF" : "#A3A3A3",
                border: `1px solid ${activeCategory === "all" ? "#F97316" : "#262626"}`,
              }}
            >
              Todos
            </button>
            {allCats.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? "all" : cat)}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                style={{
                  background: activeCategory === cat ? "#F97316" : "#111111",
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
                background: colorStyle === "light" ? "#FFFFFF" : "#111111",
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
                background: colorStyle === "dark" ? "#333" : "#111111",
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
                background: accessFilter === "free" ? "#22C55E20" : "#111111",
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
                background: accessFilter === "premium" ? "#F9731620" : "#111111",
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

        {/* Templates grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search size={32} className="mx-auto mb-3 text-zinc-700" />
            <p className="text-white/40 text-sm mb-2">Nenhum template encontrado.</p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setColorStyle("all");
                  setAccessFilter("all");
                }}
                className="text-xs text-orange-400 hover:text-orange-300 cursor-pointer"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTemplates.map((template, i) => {
              const isPremium = !isTemplateFree(template.id);
              const goldColor = template.config.theme.colors.gold;

              return (
                <div
                  key={template.id}
                  className="group rounded-2xl border overflow-hidden transition-all hover:border-[#404040]"
                  style={{ background: "#111111", borderColor: "#262626", contentVisibility: "auto", containIntrinsicSize: "auto 400px" } as React.CSSProperties}
                >
                  {/* Real proposal preview */}
                  <div className="relative overflow-hidden">
                    <TemplatePreviewThumbnail config={template.config} height={180} />

                    {/* Premium badge */}
                    {isPremium && (
                      <div
                        className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold z-10"
                        style={{ background: "rgba(0,0,0,0.6)", color: "#F97316" }}
                      >
                        <Crown size={10} />
                        PREMIUM
                      </div>
                    )}

                    {/* Free badge */}
                    {!isPremium && (
                      <div
                        className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold z-10"
                        style={{ background: "rgba(0,0,0,0.6)", color: "#22C55E" }}
                      >
                        GRATIS
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <Link
                        href={`/preview/${template.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                        style={{ background: "#F97316" }}
                      >
                        <Eye size={14} />
                        Visualizar
                      </Link>
                    </div>

                    {/* Bottom color swatch */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 z-10" style={{ background: goldColor }} />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-white">{template.name}</h3>
                      <div
                        className="w-5 h-5 rounded-md flex-shrink-0"
                        style={{ backgroundColor: goldColor }}
                      />
                    </div>
                    <p className="text-xs mb-3 line-clamp-2" style={{ color: "#A3A3A3" }}>
                      {template.description}
                    </p>

                    {/* Category tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {template.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ background: "#1A1A1A", color: "#737373" }}
                        >
                          {categoryLabels[cat] || cat}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/preview/${template.id}`}
                        className="flex-1 py-2 rounded-lg text-xs font-medium text-center transition-all border hover:bg-[#1A1A1A]"
                        style={{ color: "#A3A3A3", borderColor: "#262626" }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Eye size={12} />
                          Preview
                        </span>
                      </Link>
                      {isPremium && !canUseAllTemplates ? (
                        <Link
                          href="/pricing"
                          className="flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all hover:opacity-90"
                          style={{ background: "#F97316", color: "#FFFFFF" }}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <Crown size={12} />
                            Ver Planos
                          </span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleUseTemplate(template.id)}
                          disabled={creating === template.id}
                          className="flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all hover:opacity-90 cursor-pointer disabled:opacity-50"
                          style={{ background: "#F97316", color: "#FFFFFF" }}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            {creating === template.id ? "Criando..." : (
                              <>
                                {isLoggedIn ? "Usar Agora" : isPremium ? "Usar Template" : "Usar Gratis"}
                                <ArrowRight size={12} />
                              </>
                            )}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ver Mais button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 cursor-pointer"
                style={{ background: "#F97316", color: "#FFFFFF" }}
              >
                Ver Mais Templates
                <ArrowRight size={14} />
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </section>
  );
}
