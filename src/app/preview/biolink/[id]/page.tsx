"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BIOLINK_TEMPLATES } from "@/lib/biolink-templates";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { useAuth } from "@/contexts/AuthContext";
import { loadGoogleFont } from "@/lib/fonts";
import BiolinkRenderer from "@/components/biolink/BiolinkRenderer";
import BiolinkPreviewThumbnail from "@/components/ui/BiolinkPreviewThumbnail";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, Crown, Download, Eye } from "lucide-react";
import InstagramFollow from "@/components/ui/InstagramFollow";

export default function BiolinkPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [showPreview, setShowPreview] = useState(false);
  const [creating, setCreating] = useState(false);
  const templateId = params.id as string;

  const template = BIOLINK_TEMPLATES.find((t) => t.id === templateId);

  useEffect(() => {
    if (template?.config?.theme?.font) {
      loadGoogleFont(template.config.theme.font);
    }
  }, [template]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
        <div className="text-center">
          <p className="text-white text-lg mb-4">Template não encontrado.</p>
          <Link href="/" className="text-sm font-medium" style={{ color: "#F97316" }}>
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }

  const isPremium = template.isPremium;
  const userPlan = user?.plan || "free";
  const hasAccess = !isPremium || PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.biolinkAllTemplates;
  const isLoggedIn = !!user;

  async function handleUseTemplate() {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    if (creating || !template) return;
    setCreating(true);
    try {
      const res = await fetch("/api/biolinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: template.id }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Erro ao criar biolink");
        return;
      }
      const biolink = await res.json();
      router.push(`/biolink/editor/${biolink.id}`);
    } catch {
      alert("Erro ao criar biolink");
    } finally {
      setCreating(false);
    }
  }

  // Full preview mode — mobile frame
  if (showPreview) {
    return (
      <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
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
              {isPremium ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#F9731620", color: "#F97316" }}>
                  <Crown size={10} />
                  PREMIUM
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#22C55E20", color: "#22C55E" }}>
                  GRATIS
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasAccess ? (
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
                  style={{ background: "#F97316" }}
                >
                  <Crown size={12} />
                  Assinar Premium
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Biolink render — mobile frame centered */}
        <div className="pt-14 flex justify-center">
          <div className="w-full max-w-[480px] min-h-[calc(100vh-56px)]">
            <BiolinkRenderer config={template.config} />
          </div>
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
          <div className="lg:col-span-3 flex flex-col items-center">
            {/* Back link */}
            <div className="w-full">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors hover:text-white"
                style={{ color: "#A3A3A3" }}
              >
                <ArrowLeft size={14} />
                Voltar aos templates
              </Link>
            </div>

            {/* Preview card — mobile width */}
            <div
              className="rounded-2xl border overflow-hidden cursor-pointer group relative w-full max-w-[400px]"
              style={{ borderColor: "#262626" }}
              onClick={() => setShowPreview(true)}
            >
              <BiolinkPreviewThumbnail config={template.config} height={500} />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#F97316" }}>
                  <Eye size={16} />
                  Ver Preview Completo
                </span>
              </div>
            </div>

            {/* Theme colors */}
            <div className="mt-6 w-full max-w-[400px]">
              <p className="text-xs font-medium mb-3" style={{ color: "#737373" }}>
                Cores do tema:
              </p>
              <div className="flex gap-3">
                {[
                  { name: "fundo", color: template.config.theme.background },
                  { name: "texto", color: template.config.theme.textColor },
                  { name: "botão", color: template.config.theme.buttonColor },
                  { name: "botão txt", color: template.config.theme.buttonTextColor },
                ].map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: c.color, borderColor: "#262626" }} />
                    <span className="text-[10px]" style={{ color: "#737373" }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-white mb-2">{template.name}</h1>
            <p className="text-sm mb-6" style={{ color: "#A3A3A3" }}>{template.description}</p>

            {/* Features list */}
            <div className="space-y-3 mb-6">
              {[
                "Layout otimizado para mobile",
                "Personalize cores, textos e links",
                "Adicione redes sociais e vídeos",
                "Link único e fácil de compartilhar",
                "Analytics integrado",
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
            {hasAccess ? (
              <div className="rounded-xl border p-5 mb-4" style={{ background: "#22C55E10", borderColor: "#22C55E30" }}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" style={{ color: "#22C55E" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-bold" style={{ color: "#22C55E" }}>
                    {isPremium ? "Incluído no seu Plano" : "Template Gratuito"}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: "#A3A3A3" }}>
                  {isLoggedIn
                    ? "Você tem acesso a este template. Clique abaixo para usar."
                    : "Este template está disponível para todos. Crie sua conta grátis para usar."}
                </p>
                <button
                  onClick={handleUseTemplate}
                  disabled={creating}
                  className="block w-full py-3 rounded-xl text-sm font-semibold text-center text-white transition-all hover:opacity-90 cursor-pointer disabled:opacity-60"
                  style={{ background: "#22C55E" }}
                >
                  {creating ? "Criando biolink..." : isLoggedIn ? "Usar Template" : "Criar Conta Grátis"}
                </button>
              </div>
            ) : (
              <div className="rounded-xl border p-5 mb-4" style={{ background: "#F9731610", borderColor: "#F9731630" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={16} style={{ color: "#F97316" }} />
                  <span className="text-sm font-bold" style={{ color: "#F97316" }}>Template Premium</span>
                </div>
                <p className="text-xs mb-4" style={{ color: "#A3A3A3" }}>
                  Este template está disponível para membros Lite, Pro e Plus.
                  {isLoggedIn ? " Faça upgrade para desbloquear." : " Assine para usar."}
                </p>
                <Link
                  href="/pricing"
                  className="block w-full py-3 rounded-xl text-sm font-semibold text-center text-white transition-all hover:opacity-90"
                  style={{ background: "#F97316" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Crown size={14} />
                    {isLoggedIn ? "Fazer Upgrade" : "Torne-se Premium"}
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
