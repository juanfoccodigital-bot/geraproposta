"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import {
  Crown,
  Zap,
  Rocket,
  Sparkles,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Loader2,
  XCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

/* ============================================
   PAGINA DE ASSINATURA
   Mostra status do plano, expiracao,
   opcoes de renovar/mudar/cancelar.
   ============================================ */

const planIcons: Record<string, React.ReactNode> = {
  free: <Sparkles className="w-5 h-5" />,
  lite: <Zap className="w-5 h-5" />,
  pro: <Crown className="w-5 h-5" />,
  plus: <Rocket className="w-5 h-5" />,
};

const planColors: Record<string, string> = {
  free: "#F97316",
  lite: "#3B82F6",
  pro: "#A855F7",
  plus: "#F59E0B",
};

export default function AssinaturaPage() {
  const { user: userProfile, loading, refreshProfile } = useAuth();
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [renewLoading, setRenewLoading] = useState(false);

  if (loading) {
    return (
      <main style={{ background: "#0A0A0A" }} className="min-h-screen">
        <Navbar />
        <div className="h-16" />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-white/40" />
        </div>
      </main>
    );
  }

  useEffect(() => {
    if (!loading && !userProfile) {
      router.push("/login");
    }
  }, [loading, userProfile, router]);

  if (!userProfile) {
    return null;
  }

  const plan = userProfile.plan;
  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS];
  const color = planColors[plan] || "#F97316";
  const icon = planIcons[plan] || <Sparkles className="w-5 h-5" />;

  const subStatus = userProfile.subscription_status || "none";
  const expiresAt = userProfile.subscription_expires_at
    ? new Date(userProfile.subscription_expires_at)
    : null;
  const now = new Date();
  const daysLeft = expiresAt
    ? Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const isExpiringSoon = daysLeft > 0 && daysLeft <= 7;
  const isExpired = subStatus === "expired" || (expiresAt && expiresAt < now);

  const handleRenew = async () => {
    setRenewLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erro ao processar renovacao. Tente novamente.");
      }
    } catch {
      alert("Erro ao processar renovacao. Tente novamente.");
    } finally {
      setRenewLoading(false);
    }
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await fetch("/api/subscription/cancel", { method: "POST" });
      if (res.ok) {
        await refreshProfile();
        setShowCancelConfirm(false);
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao cancelar. Tente novamente.");
      }
    } catch {
      alert("Erro ao cancelar. Tente novamente.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <Navbar />
      <div className="h-16" />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-white mb-8">Minha Assinatura</h1>

        {/* Expiring soon banner */}
        {isExpiringSoon && !isExpired && subStatus === "active" && (
          <div className="mb-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-yellow-300 font-medium">
                Sua assinatura expira em {daysLeft} {daysLeft === 1 ? "dia" : "dias"}
              </p>
              <p className="text-xs text-yellow-300/60 mt-0.5">
                Renove para continuar usando todos os recursos do plano {limits?.label}.
              </p>
            </div>
            <button
              onClick={handleRenew}
              disabled={renewLoading}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 cursor-pointer disabled:opacity-50 flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {renewLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Renovar"}
            </button>
          </div>
        )}

        {/* Expired banner */}
        {isExpired && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-300 font-medium">Sua assinatura expirou</p>
              <p className="text-xs text-red-300/60 mt-0.5">
                Seu plano foi revertido para Free. Renove para restaurar os recursos.
              </p>
            </div>
            <button
              onClick={() => router.push("/pricing")}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 cursor-pointer flex-shrink-0"
              style={{ backgroundColor: "#F97316" }}
            >
              Ver Planos
            </button>
          </div>
        )}

        {/* Plan card */}
        <div
          className="rounded-2xl border p-6"
          style={{ background: "#111111", borderColor: "#262626" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15`, color }}
              >
                {icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{limits?.label || plan}</h2>
                <p className="text-xs text-white/40">
                  {plan === "free" ? "Gratuito" : `R$${limits?.price}/mes`}
                </p>
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-1.5">
              {subStatus === "active" && !isExpired ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-medium text-green-400">Ativo</span>
                </>
              ) : subStatus === "cancelled" ? (
                <>
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-400">Cancelado</span>
                </>
              ) : plan === "free" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white/40" />
                  <span className="text-xs font-medium text-white/40">Free</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-medium text-red-400">Expirado</span>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          {plan !== "free" && (
            <div className="space-y-3 mb-6 pb-6 border-b" style={{ borderColor: "#262626" }}>
              {expiresAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {subStatus === "cancelled" ? "Acesso ate" : "Proxima renovacao"}
                  </span>
                  <span className="text-sm text-white font-medium">
                    {expiresAt.toLocaleDateString("pt-BR")}
                  </span>
                </div>
              )}
              {userProfile.last_payment_at && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">Ultimo pagamento</span>
                  <span className="text-sm text-white font-medium">
                    {new Date(userProfile.last_payment_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {plan === "free" ? (
              <button
                onClick={() => router.push("/pricing")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#F97316" }}
              >
                <Zap className="w-4 h-4" />
                Fazer Upgrade
              </button>
            ) : (
              <>
                {(subStatus === "active" || subStatus === "cancelled") && !isExpired && (
                  <button
                    onClick={handleRenew}
                    disabled={renewLoading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: color }}
                  >
                    {renewLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    Renovar Plano
                  </button>
                )}

                <button
                  onClick={() => router.push("/pricing")}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white border transition-all hover:bg-white/5 cursor-pointer"
                  style={{ borderColor: "#333" }}
                >
                  Mudar Plano
                </button>

                {subStatus === "active" && !isExpired && (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 border border-red-500/20 transition-all hover:bg-red-500/5 hover:text-red-400 cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Info text */}
        <p className="text-xs text-white/30 mt-6 text-center">
          Pagamentos processados via PIX pelo AbacatePay. Duvidas? Acesse nosso{" "}
          <a href="/suporte" className="text-[#F97316] hover:underline">suporte</a>.
        </p>
      </div>

      {/* Cancel confirmation modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Cancelar assinatura?</h3>
                <p className="text-xs text-white/40">Esta acao nao pode ser desfeita</p>
              </div>
            </div>

            <p className="text-sm text-white/60 mb-6">
              Voce continuara tendo acesso ao plano {limits?.label} ate{" "}
              {expiresAt?.toLocaleDateString("pt-BR")}. Apos essa data, seu plano sera
              revertido para Free.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white border transition-all hover:bg-white/5 cursor-pointer"
                style={{ borderColor: "#333" }}
              >
                Manter Plano
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500/80 transition-all hover:bg-red-500 cursor-pointer disabled:opacity-50"
              >
                {cancelling ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  "Confirmar Cancelamento"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
