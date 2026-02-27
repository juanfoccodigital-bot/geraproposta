"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SITE_TEMPLATES, getSiteTemplate } from "@/lib/site-templates";
import { siteCategoryLabels } from "@/types/site";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { useAuth } from "@/contexts/AuthContext";
import { loadGoogleFont } from "@/lib/fonts";
import SiteRenderer from "@/components/site/SiteRenderer";
import SitePreviewThumbnail from "@/components/ui/SitePreviewThumbnail";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, Crown, Download, Eye } from "lucide-react";
import InstagramFollow from "@/components/ui/InstagramFollow";

export default function SitePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [showPreview, setShowPreview] = useState(false);
  const [creating, setCreating] = useState(false);
  const templateId = params.id as string;

  const template = getSiteTemplate(templateId);

  useEffect(() => {
    if (template) {
      const fonts = template.config.theme?.fonts;
      if (fonts?.heading) loadGoogleFont(fonts.heading);
      if (fonts?.body && fonts.body !== fonts.heading) loadGoogleFont(fonts.body);
    }
  }, [template]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
        <div className="text-center">
          <p className="text-white text-lg mb-4">Template não encontrado.</p>
          <Link href="/" className="text-sm font-medium" style={{ color: "#6366F1" }}>
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }

  const isLoggedIn = !!user;
  const userPlan = user?.plan || "free";
  const maxSites = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.maxSites ?? 0;
  const canCreate = maxSites > 0;
  const colors = template.config.theme?.colors;
  const categoryLabel = siteCategoryLabels[template.category] || template.category;

  async function handleUseTemplate() {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    if (!canCreate) {
      router.push("/pricing");
      return;
    }
    if (creating || !template) return;
    setCreating(true);
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: template.id }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Erro ao criar site");
        return;
      }
      const site = await res.json();
      router.push(`/sites/editor/${site.id}`);
    } catch {
      alert("Erro ao criar site");
    } finally {
      setCreating(false);
    }
  }

  // Full preview mode
  if (showPreview) {
    return (
      <div className="min-h-screen">
        {/* Floating bar */}
        <div className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(10,10,10,0.95)", borderColor: "#262626", backdropFilter: "blur(12px)" }}>
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors hover:text-white"
                style={{ color: "#A3A3A3" }}
              >
                <ArrowLeft size={16} />
                Voltar
              </button>
              <span className="text-sm font-semibold text-white">{template.name}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#6366F120", color: "#6366F1" }}>
                <Crown size={10} />
                PREMIUM
              </span>
            </div>
            <div className="flex items-center gap-2">
              {canCreate || !isLoggedIn ? (
                <button
                  onClick={handleUseTemplate}
                  disabled={creating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 cursor-pointer disabled:opacity-60"
                  style={{ background: "#22C55E" }}
                >
                  <Download size={12} />
                  {creating ? "Criando..." : isLoggedIn ? "Usar Template" : "Cadastre-se para Usar"}
                </button>
              ) : (
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "#6366F1" }}
                >
                  <Crown size={12} />
                  Ver Planos
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Site render */}
        <div className="pt-14">
          <SiteRenderer config={template.config} />
        </div>
      </div>
    );
  }

  // Info page
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <div className="flex items-center gap-3">
            {!authLoading && isLoggedIn ? (
              <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-white" style={{ color: "#A3A3A3" }}>
                Dashboard
              </Link>
            ) : !authLoading ? (
              <>
                <Link href="/signup" className="text-sm font-medium transition-colors hover:text-white" style={{ color: "#A3A3A3" }}>
                  Cadastre-se
                </Link>
                <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:bg-[#1A1A1A]" style={{ color: "#FFFFFF", borderColor: "#333" }}>
                  Entrar
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Preview area */}
          <div className="lg:col-span-3">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors hover:text-white"
              style={{ color: "#A3A3A3" }}
            >
              <ArrowLeft size={14} />
              Voltar aos templates
            </Link>

            {/* Preview card */}
            <div
              className="rounded-2xl border overflow-hidden cursor-pointer group relative"
              style={{ borderColor: "#262626" }}
              onClick={() => setShowPreview(true)}
            >
              <SitePreviewThumbnail config={template.config} height={400} />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#6366F1" }}>
                  <Eye size={16} />
                  Ver Preview Completo
                </span>
              </div>
            </div>

            {/* Dominant colors */}
            {colors && (
              <div className="mt-6">
                <p className="text-xs font-medium mb-3" style={{ color: "#737373" }}>
                  Cores dominantes:
                </p>
                <div className="flex gap-3">
                  {Object.entries(colors).slice(0, 5).map(([name, color]) => (
                    <div key={name} className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: color as string, borderColor: "#262626" }} />
                      <span className="text-[10px]" style={{ color: "#737373" }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-white mb-2">{template.name}</h1>
            <p className="text-sm mb-4" style={{ color: "#A3A3A3" }}>{template.description}</p>
            <span className="inline-block text-[10px] px-2 py-0.5 rounded-full font-medium mb-6" style={{ background: "#6366F115", color: "#818CF8" }}>
              {categoryLabel}
            </span>

            {/* Features list */}
            <div className="space-y-3 mb-6">
              {[
                "Landing page profissional completa",
                "Editor visual drag & drop",
                "Personalize cores, fontes e conteúdo",
                "Otimizado para mobile e desktop",
                "Publique com domínio próprio ou link",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#22C55E" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm text-white">{item}</span>
                </div>
              ))}
            </div>

            {/* Access box */}
            {canCreate || !isLoggedIn ? (
              <div className="rounded-xl border p-5 mb-4" style={{ background: "#22C55E10", borderColor: "#22C55E30" }}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" style={{ color: "#22C55E" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-bold" style={{ color: "#22C55E" }}>
                    {isLoggedIn ? "Incluído no seu Plano" : "Disponível com Assinatura"}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: "#A3A3A3" }}>
                  {isLoggedIn
                    ? "Você tem acesso. Clique abaixo para criar seu site."
                    : "Crie sua conta e assine para começar a usar este template."}
                </p>
                <button
                  onClick={handleUseTemplate}
                  disabled={creating}
                  className="block w-full py-3 rounded-xl text-sm font-semibold text-center text-white transition-all hover:opacity-90 cursor-pointer disabled:opacity-60"
                  style={{ background: "#22C55E" }}
                >
                  {creating ? "Criando site..." : isLoggedIn ? "Usar Template" : "Criar Conta"}
                </button>
              </div>
            ) : (
              <div className="rounded-xl border p-5 mb-4" style={{ background: "#6366F110", borderColor: "#6366F130" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={16} style={{ color: "#6366F1" }} />
                  <span className="text-sm font-bold" style={{ color: "#6366F1" }}>Template Premium</span>
                </div>
                <p className="text-xs mb-4" style={{ color: "#A3A3A3" }}>
                  Sites estão disponíveis para membros Lite, Pro e Plus.
                  Faça upgrade para desbloquear.
                </p>
                <Link
                  href="/pricing"
                  className="block w-full py-3 rounded-xl text-sm font-semibold text-center text-white transition-all hover:opacity-90"
                  style={{ background: "#6366F1" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Crown size={14} />
                    Fazer Upgrade
                  </span>
                </Link>
              </div>
            )}

            {/* Instagram */}
            <InstagramFollow />
          </div>
        </div>
      </main>
    </div>
  );
}
