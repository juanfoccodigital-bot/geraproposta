"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditor } from "@/contexts/EditorContext";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorPreview from "@/components/editor/EditorPreview";
import { Eye, PencilLine } from "lucide-react";
import GuidedTour from "@/components/ui/GuidedTour";
import { PROPOSAL_TOUR_STEPS } from "@/lib/tour-steps";
import type { ProposalRecord } from "@/types/proposal";

/* ============================================
   EDITOR [ID] PAGE
   Carrega proposta pelo ID e inicializa o editor
   ============================================ */

export default function EditorByIdPage() {
  const params = useParams();
  const id = params.id as string;
  const { state, dispatch } = useEditor();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  useEffect(() => {
    if (!id) return;

    async function loadProposal() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/proposals/${id}`);

        if (res.status === 404) {
          setError("Proposta não encontrada.");
          setLoading(false);
          return;
        }

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Erro ao carregar proposta");
        }

        const record: ProposalRecord = await res.json();

        // SET_CONFIG applies migrateConfig internally
        dispatch({ type: "SET_CONFIG", payload: record.config });
        dispatch({
          type: "SET_PROPOSAL_META",
          payload: { proposalId: record.id, slug: record.slug },
        });

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar proposta"
        );
        setLoading(false);
      }
    }

    loadProposal();
  }, [id, dispatch]);

  // Warn before closing tab with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (state.isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [state.isDirty]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-400">Carregando proposta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="text-2xl text-red-400">!</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Erro ao carregar
            </h2>
            <p className="text-sm text-zinc-400">{error}</p>
          </div>
          <a
            href="/dashboard"
            className="mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors"
          >
            Voltar ao Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen flex flex-col overflow-hidden bg-[#0A0A0A]"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <EditorHeader />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: visible on desktop always, on mobile only when mobileView=editor */}
        <div className={`w-full md:w-[380px] flex-shrink-0 overflow-hidden ${mobileView === "editor" ? "block" : "hidden"} md:block`}>
          <EditorSidebar />
        </div>
        {/* Preview: visible on desktop always, on mobile only when mobileView=preview */}
        <div className={`flex-1 overflow-hidden ${mobileView === "preview" ? "block" : "hidden"} md:block`}>
          <EditorPreview />
        </div>
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileView(mobileView === "editor" ? "preview" : "editor")}
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl text-sm font-medium text-white transition-colors"
        style={{ background: "#F97316" }}
      >
        {mobileView === "editor" ? (
          <><Eye size={16} /> Preview</>
        ) : (
          <><PencilLine size={16} /> Editar</>
        )}
      </button>

      <GuidedTour steps={PROPOSAL_TOUR_STEPS} tourId="proposal-editor" />
    </div>
  );
}
