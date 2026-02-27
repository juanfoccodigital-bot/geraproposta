"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { templates, isTemplateFree } from "@/lib/templates";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { useAuth } from "@/contexts/AuthContext";
import { categoryLabels, ProposalCategory } from "@/types/proposal";
import { Search, LayoutTemplate, Lock, ArrowRight, Sparkles, Crown, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import TemplatePreviewThumbnail from "@/components/ui/TemplatePreviewThumbnail";
import Link from "next/link";

/* ============================================
   TEMPLATE MARKETPLACE
   Browse, search, filter and use templates.
   Verifica plano do usuario para acesso.
   ============================================ */

// Unique categories from all templates
const allTemplateCats = Array.from(
  new Set(templates.flatMap((t) => t.categories))
);

export default function TemplatesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [creating, setCreating] = useState<string | null>(null);

  const userPlan = user?.plan || "free";
  const canUseAllTemplates = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.allTemplates ?? false;

  const filtered = templates.filter((t) => {
    const matchesCat =
      activeCategory === "all" || t.categories.includes(activeCategory as ProposalCategory);
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleUseTemplate = async (templateId: string) => {
    const isFree = isTemplateFree(templateId);

    // Se template premium e usuário sem acesso, redireciona para pricing
    if (!isFree && !canUseAllTemplates) {
      router.push("/pricing");
      return;
    }

    // Se não está logado, redireciona para signup
    if (!user) {
      router.push("/signup");
      return;
    }

    setCreating(templateId);
    try {
      const template = templates.find((t) => t.id === templateId);
      if (!template) return;

      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: template.name,
          client_name: "Novo Cliente",
          template_id: template.id,
          category: template.categories[0] || null,
          config: template.config,
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
      alert("Erro ao criar proposta a partir do template");
    } finally {
      setCreating(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      {/* Header */}
      <header className="border-b" style={{ background: "#111111", borderColor: "#262626" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#A3A3A3" }}
            >
              Voltar ao Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <LayoutTemplate size={24} style={{ color: "#F97316" }} />
            <h1 className="text-2xl font-bold text-white">Templates</h1>
          </div>
          <p className="text-sm" style={{ color: "#A3A3A3" }}>
            Escolha um modelo profissional e comece a personalizar sua proposta.
          </p>

          {/* Search */}
          <div className="mt-5 relative max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar template..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
              style={{
                background: "#0A0A0A",
                borderColor: "#262626",
              }}
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === "all"
                ? "text-white"
                : "text-white/60 border hover:border-[#404040]"
            }`}
            style={{
              backgroundColor: activeCategory === "all" ? "#F97316" : "#111111",
              borderColor: activeCategory === "all" ? "#F97316" : "#262626",
            }}
          >
            Todos
          </button>
          {allTemplateCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "text-white"
                  : "text-white/60 border hover:border-[#404040]"
              }`}
              style={{
                backgroundColor: activeCategory === cat ? "#F97316" : "#111111",
                borderColor: activeCategory === cat ? "#F97316" : "#262626",
              }}
            >
              {categoryLabels[cat as ProposalCategory] || cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <LayoutTemplate size={32} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="text-white/60 text-sm">Nenhum template encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template, i) => {
              const isPremium = !isTemplateFree(template.id);
              const hasAccess = !isPremium || canUseAllTemplates;
              const primaryColor = template.config.theme?.colors?.gold || "#F97316";

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border overflow-hidden group"
                  style={{ background: "#111111", borderColor: "#262626" }}
                >
                  {/* Real proposal preview */}
                  <div
                    onClick={() => router.push(`/preview/${template.id}`)}
                    className="block relative overflow-hidden cursor-pointer"
                  >
                    <TemplatePreviewThumbnail config={template.config} height={200} />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: primaryColor }}>
                        <Eye size={14} />
                        Preview
                      </span>
                    </div>
                    {/* Badges */}
                    {isPremium ? (
                      <div
                        className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold text-white z-10"
                        style={{ background: hasAccess ? "rgba(34,197,94,0.7)" : "rgba(0,0,0,0.6)" }}
                      >
                        {hasAccess ? (
                          <>
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                            PREMIUM
                          </>
                        ) : (
                          <>
                            <Lock size={10} />
                            PREMIUM
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold text-white z-10" style={{ background: "rgba(34,197,94,0.8)" }}>
                        GRATIS
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {template.name}
                    </h3>
                    <p className="text-xs mb-4" style={{ color: "#A3A3A3" }}>
                      {template.description}
                    </p>

                    {/* Category tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {template.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ background: "#262626", color: "#A3A3A3" }}
                        >
                          {categoryLabels[cat] || cat}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/preview/${template.id}`}
                        className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:opacity-80 flex items-center justify-center gap-1.5 border"
                        style={{ color: "#A3A3A3", borderColor: "#262626" }}
                      >
                        <Eye size={12} />
                        Preview
                      </Link>
                      {hasAccess ? (
                        <button
                          onClick={() => handleUseTemplate(template.id)}
                          disabled={creating === template.id}
                          className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                          style={{ backgroundColor: primaryColor, color: "#FFFFFF" }}
                        >
                          {creating === template.id ? (
                            "Criando..."
                          ) : (
                            <>
                              {isPremium ? "Usar Template" : "Usar Gratis"}
                              <ArrowRight size={12} />
                            </>
                          )}
                        </button>
                      ) : (
                        <Link
                          href="/pricing"
                          className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
                          style={{ backgroundColor: "#F97316", color: "#FFFFFF" }}
                        >
                          <Lock size={12} />
                          Fazer Upgrade
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
