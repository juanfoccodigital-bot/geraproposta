"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BIOLINK_TEMPLATES } from "@/lib/biolink-templates";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { Link2, Crown, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import BiolinkPreviewThumbnail from "@/components/ui/BiolinkPreviewThumbnail";

export default function BiolinkTemplatesPreview() {
  const { user } = useAuth();
  const router = useRouter();
  const [creating, setCreating] = useState<string | null>(null);

  const isLoggedIn = !!user;
  const userPlan = user?.plan || "free";
  const canUseAll = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.biolinkAllTemplates ?? false;

  async function handleUse(templateId: string) {
    const tmpl = BIOLINK_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;

    if (tmpl.isPremium && !canUseAll) {
      router.push("/pricing");
      return;
    }
    if (!user) {
      router.push("/signup");
      return;
    }

    setCreating(templateId);
    try {
      const res = await fetch("/api/biolinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: templateId }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Erro ao criar biolink");
        return;
      }
      const data = await res.json();
      router.push(`/biolink/editor/${data.id}`);
    } catch {
      alert("Erro ao criar biolink");
    } finally {
      setCreating(null);
    }
  }

  return (
    <section className="py-12 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F97316" }}>
              <Link2 size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Templates de Link na Bio
              </h2>
              <p className="text-sm" style={{ color: "#737373" }}>
                Escolha um visual para seu link na bio.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border" style={{ color: "#22C55E", borderColor: "#22C55E30", background: "#22C55E10" }}>
                {BIOLINK_TEMPLATES.filter((t) => !t.isPremium).length} Gratis
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border" style={{ color: "#F97316", borderColor: "#F9731630", background: "#F9731610" }}>
                <Crown size={9} />
                {BIOLINK_TEMPLATES.filter((t) => t.isPremium).length} Premium
              </span>
            </div>
            <Link
              href="/biolink"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
              style={{ color: "#F97316" }}
            >
              Ver Todos
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BIOLINK_TEMPLATES.map((tmpl) => {
            const theme = tmpl.config.theme;
            const isPremium = tmpl.isPremium;

            return (
              <div
                key={tmpl.id}
                className="group rounded-2xl border overflow-hidden transition-all hover:border-[#404040]"
                style={{ background: "#111111", borderColor: "#262626", contentVisibility: "auto", containIntrinsicSize: "auto 380px" } as React.CSSProperties}
              >
                {/* Preview area */}
                <div className="relative">
                  <BiolinkPreviewThumbnail config={tmpl.config} height={208} />

                  {/* Badge */}
                  {isPremium ? (
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold z-10"
                      style={{ background: "rgba(0,0,0,0.6)", color: "#F97316" }}
                    >
                      <Crown size={10} />
                      PREMIUM
                    </div>
                  ) : (
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold z-10"
                      style={{ background: "rgba(0,0,0,0.6)", color: "#22C55E" }}
                    >
                      GRATIS
                    </div>
                  )}

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 z-10" style={{ background: theme.buttonColor }} />
                </div>

                {/* Info + actions */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-0.5">{tmpl.name}</h3>
                  <p className="text-xs mb-3 line-clamp-1" style={{ color: "#A3A3A3" }}>
                    {tmpl.description}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      href={`/preview/biolink/${tmpl.id}`}
                      className="flex-1 py-2 rounded-lg text-xs font-medium text-center transition-all border hover:bg-[#1A1A1A]"
                      style={{ color: "#A3A3A3", borderColor: "#262626" }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Eye size={12} />
                        Preview
                      </span>
                    </Link>
                    {isPremium && !canUseAll ? (
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
                        onClick={() => handleUse(tmpl.id)}
                        disabled={creating === tmpl.id}
                        className="flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all hover:opacity-90 cursor-pointer disabled:opacity-50"
                        style={{ background: "#F97316", color: "#FFFFFF" }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {creating === tmpl.id ? "Criando..." : (
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
      </div>
    </section>
  );
}
