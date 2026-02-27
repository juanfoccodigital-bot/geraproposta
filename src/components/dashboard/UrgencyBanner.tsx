"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Zap, X } from "lucide-react";
import { PlanTier } from "@/types/user";

interface UrgencyBannerProps {
  plan: PlanTier;
  dailyUsed: number;
  dailyLimit: number;
  monthlyUsed: number;
  monthlyLimit: number;
}

export default function UrgencyBanner({ plan, dailyUsed, dailyLimit, monthlyUsed, monthlyLimit }: UrgencyBannerProps) {
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;
  if (plan === "plus") return null;

  // Determine usage percentage
  const isDaily = dailyLimit !== Infinity;
  const used = isDaily ? dailyUsed : monthlyUsed;
  const limit = isDaily ? dailyLimit : monthlyLimit;
  if (limit === Infinity) return null;

  const percentage = (used / limit) * 100;
  const isLimitReached = percentage >= 100;
  const isHigh = percentage >= 80;
  const isMedium = percentage >= 50;

  if (!isMedium) return null;

  const message = isLimitReached
    ? `Limite ${isDaily ? "diario" : "mensal"} atingido. Faca upgrade para continuar criando.`
    : isHigh
      ? `Voce ja usou ${used} de ${limit} propostas ${isDaily ? "hoje" : "este mes"}. Quase no limite!`
      : `Voce ja usou ${used} de ${limit} propostas ${isDaily ? "hoje" : "este mes"}. Faca upgrade para criar mais.`;

  const Icon = isLimitReached ? AlertTriangle : Zap;
  const bgGradient = isLimitReached
    ? "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(249,115,22,0.08) 100%)"
    : "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(168,85,247,0.08) 100%)";
  const borderColor = isLimitReached ? "rgba(239,68,68,0.3)" : "rgba(249,115,22,0.2)";
  const iconColor = isLimitReached ? "#EF4444" : "#F97316";

  return (
    <div
      className="rounded-xl border p-4 flex items-center gap-3 mb-4"
      style={{ background: bgGradient, borderColor }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: isLimitReached ? "rgba(239,68,68,0.15)" : "rgba(249,115,22,0.15)" }}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <p className="text-sm flex-1" style={{ color: "#D4D4D4" }}>
        {message}
      </p>
      <button
        onClick={() => router.push("/pricing")}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border hover:opacity-80 transition-all cursor-pointer flex-shrink-0"
        style={{ color: "#F97316", borderColor: "rgba(249,115,22,0.3)" }}
      >
        Ver Planos
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded-lg hover:bg-white/5 transition-all cursor-pointer flex-shrink-0"
        style={{ color: "#525252" }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
