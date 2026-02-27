"use client";

import { useEffect } from "react";

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-white mb-2">Erro no editor</h2>
        <p className="text-sm text-white/50 mb-6">
          Nao foi possivel carregar o editor. Suas alteracoes salvas automaticamente estao seguras.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-[#F97316] text-white text-sm font-medium hover:bg-[#F97316]/90 transition-colors cursor-pointer"
          >
            Tentar novamente
          </button>
          <a
            href="/dashboard"
            className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Voltar ao dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
