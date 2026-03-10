"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Flame, Zap, Crown, ArrowRight, Check } from "lucide-react";

/* ============================================
   PROMO POPUP — Aparece apos 5 segundos na
   primeira visita. Oferece Lite/Pro com desconto.
   Salva no localStorage para nao repetir.
   ============================================ */

const STORAGE_KEY = "promo-popup-shown";
const DELAY_MS = 5000;

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const shown = localStorage.getItem(STORAGE_KEY);
    if (shown) return;

    const timer = setTimeout(() => {
      setVisible(true);
      localStorage.setItem(STORAGE_KEY, "1");
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const close = () => setVisible(false);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={close}
      />

      {/* Popup */}
      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="relative w-full max-w-md rounded-2xl border overflow-hidden pointer-events-auto animate-scaleIn"
          style={{ background: "#111111", borderColor: "#262626" }}
        >
          {/* Red header */}
          <div
            className="relative px-6 py-5 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #DC2626, #B91C1C)" }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{ background: "radial-gradient(circle at 30% 50%, #FFF, transparent 60%)" }}
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: "#FFFFFF20", color: "#FFF" }}>
                <Flame className="w-3 h-3" />
                Mes do Consumidor
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1">
                Ate 70% OFF no 1o mes
              </h2>
              <p className="text-sm text-white/80">
                Oferta exclusiva para novos assinantes
              </p>
            </div>
          </div>

          {/* Plans */}
          <div className="px-6 py-5 space-y-3">
            {/* Lite */}
            <button
              onClick={() => { close(); router.push("/promo"); }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-[#3B82F6] group cursor-pointer text-left"
              style={{ background: "#0A0A0A", borderColor: "#1F1F1F" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#3B82F615", color: "#3B82F6" }}>
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Lite</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{ background: "#EF4444", color: "#FFF" }}>66% OFF</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs line-through" style={{ color: "#525252" }}>R$29</span>
                  <span className="text-lg font-extrabold text-white">R$9,90</span>
                  <span className="text-[10px]" style={{ color: "#737373" }}>/1o mes</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 text-white/20 group-hover:text-[#3B82F6] transition-colors" />
            </button>

            {/* Pro — highlighted */}
            <button
              onClick={() => { close(); router.push("/promo"); }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:brightness-110 group cursor-pointer text-left relative overflow-hidden"
              style={{ background: "#0A0A0A", borderColor: "#A855F7" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #A855F7, #F97316)" }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#A855F715", color: "#A855F7" }}>
                <Crown className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Pro</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{ background: "#EF4444", color: "#FFF" }}>70% OFF</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{ background: "#A855F720", color: "#A855F7" }}>POPULAR</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs line-through" style={{ color: "#525252" }}>R$49</span>
                  <span className="text-lg font-extrabold text-white">R$14,90</span>
                  <span className="text-[10px]" style={{ color: "#737373" }}>/1o mes</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 text-white/20 group-hover:text-[#A855F7] transition-colors" />
            </button>

            {/* Benefits */}
            <div className="pt-2 space-y-1.5">
              {[
                "Todos os +40 templates premium",
                "GeraLinks + GeraSites inclusos",
                "Cancele quando quiser, sem multa",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#22C55E" }} />
                  <span className="text-xs" style={{ color: "#A3A3A3" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5">
            <button
              onClick={close}
              className="w-full text-center text-xs py-2 cursor-pointer transition-colors hover:text-white"
              style={{ color: "#525252" }}
            >
              Nao, obrigado. Continuar no plano Free.
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-3 right-3 p-1.5 rounded-full transition-colors hover:bg-white/10 cursor-pointer"
            style={{ color: "#FFFFFF80" }}
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
