"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log para servico de monitoramento (Sentry, etc.)
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">!</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Algo deu errado</h2>
        <p className="text-sm text-white/50 mb-6">
          Ocorreu um erro inesperado. Tente novamente ou volte para a pagina inicial.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-[#F97316] text-white text-sm font-medium hover:bg-[#F97316]/90 transition-colors cursor-pointer"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Pagina inicial
          </a>
        </div>
      </div>
    </div>
  );
}
