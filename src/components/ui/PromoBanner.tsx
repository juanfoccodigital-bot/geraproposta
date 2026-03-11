"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Flame, ArrowRight } from "lucide-react";

/* ============================================
   PROMO BANNER — Faixa vermelha no topo
   "Mes do Consumidor" com link para /promo.
   Aparece em todas as paginas. Pode ser fechada.
   Salva no localStorage para nao incomodar.
   ============================================ */

const STORAGE_KEY = "promo-banner-dismissed";

export default function PromoBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Esconde em paginas publicas (proposta compartilhada, biolink, site)
  const isPublicPage = pathname.startsWith("/p/") || pathname.startsWith("/link/") || pathname.startsWith("/site/");

  useEffect(() => {
    if (isPublicPage) return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, [isPublicPage]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[60] w-full py-2.5 px-4 text-center"
      style={{
        background: "linear-gradient(90deg, #DC2626, #B91C1C, #DC2626)",
      }}
    >
      <Link
        href="/promo"
        className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <Flame className="w-4 h-4 flex-shrink-0 animate-pulse" />
        <span className="hidden sm:inline">
          MES DO CONSUMIDOR — Primeiro mes com ate 70% OFF! Lite por R$9,90 | Pro por R$14,90
        </span>
        <span className="sm:hidden">
          MES DO CONSUMIDOR — Ate 70% OFF!
        </span>
        <ArrowRight className="w-4 h-4 flex-shrink-0" />
      </Link>

      <button
        onClick={(e) => { e.preventDefault(); dismiss(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Fechar banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
