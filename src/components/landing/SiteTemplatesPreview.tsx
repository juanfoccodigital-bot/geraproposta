"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { siteCategoryLabels, SiteCategory } from "@/types/site";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { Globe, ArrowRight, Crown, Eye, Clock } from "lucide-react";
import Link from "next/link";
import SitePreviewThumbnail from "@/components/ui/SitePreviewThumbnail";

const categories = Object.entries(siteCategoryLabels) as [SiteCategory, string][];

export default function SiteTemplatesPreview() {
  const { user } = useAuth();
  const router = useRouter();
  const [filterCat, setFilterCat] = useState<SiteCategory | "all">("all");
  const [creating, setCreating] = useState<string | null>(null);

  const isLoggedIn = !!user;
  const userPlan = user?.plan || "free";
  const maxSites = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.maxSites ?? 0;
  const canCreate = maxSites > 0;

  const filtered = filterCat === "all"
    ? SITE_TEMPLATES
    : SITE_TEMPLATES.filter((t) => t.category === filterCat);

  async function handleUse(templateId: string) {
    if (!canCreate && isLoggedIn) {
      router.push("/pricing");
      return;
    }
    if (!user) {
      router.push("/signup");
      return;
    }

    setCreating(templateId);
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: templateId }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Erro ao criar site");
        return;
      }
      const data = await res.json();
      router.push(`/sites/editor/${data.id}`);
    } catch {
      alert("Erro ao criar site");
    } finally {
      setCreating(null);
    }
  }

  return (
    <section className="py-12 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#6366F1" }}>
              <Globe size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Templates de Sites
                </h2>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-bold" style={{ background: "#F97316", color: "#FFF" }}>
                  Em breve
                </span>
              </div>
              <p className="text-sm" style={{ color: "#737373" }}>
                Landing pages profissionais por categoria.
              </p>
            </div>
          </div>
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ color: "#525252" }}
          >
            <Clock size={14} />
            Em breve
          </span>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          <button
            onClick={() => setFilterCat("all")}
            className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
            style={{
              background: filterCat === "all" ? "#6366F1" : "#111111",
              color: filterCat === "all" ? "#FFF" : "#A3A3A3",
              border: `1px solid ${filterCat === "all" ? "#6366F1" : "#262626"}`,
            }}
          >
            Todos
          </button>
          {categories.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilterCat(filterCat === key ? "all" : key)}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
              style={{
                background: filterCat === key ? "#6366F1" : "#111111",
                color: filterCat === key ? "#FFF" : "#A3A3A3",
                border: `1px solid ${filterCat === key ? "#6366F1" : "#262626"}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tmpl) => {
            const colors = tmpl.config.theme.colors;

            return (
              <div
                key={tmpl.id}
                className="group rounded-2xl border overflow-hidden transition-all"
                style={{ background: "#111111", borderColor: "#262626", opacity: 0.5, contentVisibility: "auto", containIntrinsicSize: "auto 380px" } as React.CSSProperties}
              >
                {/* Real site preview */}
                <div className="relative">
                  <SitePreviewThumbnail config={tmpl.config} height={192} />

                  {/* Badge */}
                  <div
                    className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold z-10"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#6366F1" }}
                  >
                    <Crown size={10} />
                    PREMIUM
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <Link href={`/preview/site/${tmpl.id}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#6366F1" }}>
                      <Eye size={14} />
                      Visualizar
                    </Link>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 z-20" style={{ background: colors?.gold || "#6366F1" }} />
                </div>

                {/* Info + actions */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white">{tmpl.name}</h3>
                    <div className="w-4 h-4 rounded flex-shrink-0" style={{ backgroundColor: colors?.gold || "#6366F1" }} />
                  </div>
                  <p className="text-xs mb-2 line-clamp-1" style={{ color: "#A3A3A3" }}>
                    {tmpl.description}
                  </p>
                  <span className="inline-block text-[9px] px-1.5 py-0.5 rounded-full font-medium mb-3" style={{ background: "#6366F115", color: "#818CF8" }}>
                    {siteCategoryLabels[tmpl.category]}
                  </span>

                  <div className="flex gap-2">
                    <Link
                      href={`/preview/site/${tmpl.id}`}
                      className="flex-1 py-2 rounded-lg text-xs font-medium text-center transition-all border hover:bg-[#1A1A1A]"
                      style={{ color: "#A3A3A3", borderColor: "#262626" }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Eye size={12} />
                        Preview
                      </span>
                    </Link>
                    <span
                      className="flex-1 py-2 rounded-lg text-xs font-semibold text-center inline-flex items-center justify-center gap-1.5"
                      style={{ background: "#262626", color: "#525252" }}
                    >
                      <Clock size={12} />
                      Em breve
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
