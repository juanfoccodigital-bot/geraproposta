"use client";

import { useEffect } from "react";

export default function ProposalViewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">Erro ao carregar proposta</h2>
        <p className="text-sm text-[#1A1A1A]/50 mb-6">
          Nao foi possivel exibir esta proposta. Tente recarregar a pagina.
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-lg bg-[#F97316] text-white text-sm font-medium hover:bg-[#F97316]/90 transition-colors cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
