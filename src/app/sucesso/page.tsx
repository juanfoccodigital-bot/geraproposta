"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, Sparkles, Loader2 } from "lucide-react";
import Logo from "@/components/ui/Logo";

/* ============================================
   PAGINA DE SUCESSO — Pos-compra Hubla
   URL: /sucesso?plano=lite|pro|plus

   1. Dispara Meta Pixel Purchase event
   2. Mostra mensagem de boas-vindas
   3. Redireciona ao dashboard em 5s
   ============================================ */

const PLAN_CONFIG: Record<string, { name: string; value: number; color: string; emoji: string }> = {
  lite: { name: "Lite", value: 29, color: "#3B82F6", emoji: "⚡" },
  pro: { name: "Pro", value: 49, color: "#A855F7", emoji: "👑" },
  plus: { name: "Plus", value: 99, color: "#FFD700", emoji: "💎" },
};

function SucessoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const plano = searchParams.get("plano") || "pro";
  const config = PLAN_CONFIG[plano] || PLAN_CONFIG.pro;

  // Dispara Meta Pixel Purchase
  useEffect(() => {
    // @ts-expect-error fbq is loaded globally via Meta Pixel script
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      // @ts-expect-error fbq global
      window.fbq("track", "Purchase", {
        value: config.value,
        currency: "BRL",
        content_name: `Plano ${config.name}`,
        content_type: "subscription",
      });
    }
  }, [config.value, config.name]);

  // Countdown + redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.12] pointer-events-none"
        style={{ background: config.color }}
      />

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        {/* Success icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce"
          style={{ background: `${config.color}20` }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: config.color }} />
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Compra aprovada! {config.emoji}
        </h1>

        <p className="text-base mb-2" style={{ color: "#A3A3A3" }}>
          Bem-vindo ao plano{" "}
          <span className="font-bold" style={{ color: config.color }}>
            {config.name}
          </span>
          !
        </p>

        <p className="text-sm mb-8" style={{ color: "#737373" }}>
          Seu acesso premium ja esta ativo. Prepare-se para criar propostas que fecham contratos.
        </p>

        {/* Plan badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
          style={{ background: `${config.color}15`, border: `1px solid ${config.color}30` }}
        >
          <Sparkles className="w-4 h-4" style={{ color: config.color }} />
          <span className="text-sm font-semibold" style={{ color: config.color }}>
            Plano {config.name} ativado
          </span>
        </div>

        {/* Redirect notice */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#737373" }} />
          <p className="text-sm" style={{ color: "#737373" }}>
            Redirecionando em {countdown}s...
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm font-semibold transition-colors hover:text-white cursor-pointer"
          style={{ color: config.color }}
        >
          Ir para o painel agora →
        </button>
      </div>
    </main>
  );
}

export default function SucessoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
          <Loader2 className="w-8 h-8 animate-spin text-white/20" />
        </main>
      }
    >
      <SucessoContent />
    </Suspense>
  );
}
