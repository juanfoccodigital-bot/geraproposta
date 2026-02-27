"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { BiolinkEditorProvider, useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import BiolinkSidebar from "@/components/biolink/editor/BiolinkSidebar";
import BiolinkPreview from "@/components/biolink/editor/BiolinkPreview";
import { ArrowLeft, Save, ExternalLink, Undo2, Redo2, Check, Loader2, Eye, PencilLine } from "lucide-react";
import { useAutosave } from "@/lib/useAutosave";
import GuidedTour from "@/components/ui/GuidedTour";
import { BIOLINK_TOUR_STEPS } from "@/lib/tour-steps";
import type { BiolinkRecord } from "@/types/biolink";

function EditorContent() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { state, dispatch } = useBiolinkEditor();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/biolinks/${id}`);
        if (!res.ok) throw new Error("Biolink não encontrado");
        const record: BiolinkRecord = await res.json();
        dispatch({ type: "SET_CONFIG", payload: record.config });
        dispatch({ type: "SET_META", payload: { biolinkId: record.id, slug: record.slug, title: record.title } });

        // Check plan
        const profileRes = await fetch("/api/usage");
        if (profileRes.ok) {
          const usage = await profileRes.json();
          setIsPremium(usage.plan !== "free");
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar");
        setLoading(false);
      }
    }
    load();
  }, [id, dispatch]);

  const doSave = useCallback(async () => {
    if (!state.biolinkId) return;
    const res = await fetch(`/api/biolinks/${state.biolinkId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: state.title,
        slug: state.slug,
        config: state.config,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro ao salvar");
    }
    dispatch({ type: "MARK_CLEAN" });
  }, [state.biolinkId, state.title, state.slug, state.config, dispatch]);

  const { saving: autoSaving, lastSaved } = useAutosave({
    data: state.config,
    onSave: doSave,
    delay: 3000,
    enabled: !!state.biolinkId,
  });

  const save = useCallback(async () => {
    if (!state.biolinkId || saving) return;
    setSaving(true);
    try {
      await doSave();
      setToast("Salvo com sucesso!");
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Erro ao salvar");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setSaving(false);
    }
  }, [state.biolinkId, saving, doSave]);

  // Keyboard shortcut Ctrl+S
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) dispatch({ type: "REDO" });
        else dispatch({ type: "UNDO" });
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [save, dispatch]);

  // Warn before closing with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (state.isDirty) { e.preventDefault(); }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [state.isDirty]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-white/40">Carregando biolink...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="text-2xl text-red-400">!</span>
          </div>
          <h2 className="text-lg font-semibold text-white">{error}</h2>
          <a href="/biolink" className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-sm rounded-lg transition-colors">
            Voltar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1A1A1A] flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/biolink")} className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </button>
          <input
            value={state.title}
            onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
            className="text-sm font-medium text-white bg-transparent border-none focus:outline-none max-w-[120px] md:max-w-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-0.5">
            <button onClick={() => dispatch({ type: "UNDO" })} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors" title="Desfazer">
              <Undo2 size={16} />
            </button>
            <button onClick={() => dispatch({ type: "REDO" })} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors" title="Refazer">
              <Redo2 size={16} />
            </button>
          </div>
          {autoSaving ? (
            <span className="text-xs text-white/40 flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" /> <span className="hidden md:inline">Salvando...</span>
            </span>
          ) : lastSaved ? (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <Check size={12} /> <span className="hidden md:inline">Salvo</span>
            </span>
          ) : null}
          {state.slug && (
            <a
              data-tour="share-link"
              href={`/link/${state.slug}`}
              target="_blank"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ExternalLink size={14} /> Ver
            </a>
          )}
          <button
            onClick={save}
            disabled={saving || !state.isDirty}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              state.isDirty
                ? "bg-[#F97316] text-white hover:bg-[#EA580C]"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            <Save size={14} />
            <span className="hidden md:inline">{saving ? "Salvando..." : "Salvar"}</span>
          </button>
        </div>
      </div>

      {/* Editor body */}
      <div className="flex-1 flex overflow-hidden">
        <div className={`w-full md:w-[360px] flex-shrink-0 overflow-hidden ${mobileView === "editor" ? "block" : "hidden"} md:block`}>
          <BiolinkSidebar isPremium={isPremium} />
        </div>
        <div className={`flex-1 overflow-hidden ${mobileView === "preview" ? "block" : "hidden"} md:block`}>
          <BiolinkPreview />
        </div>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileView(mobileView === "editor" ? "preview" : "editor")}
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl text-sm font-medium text-white bg-[#F97316] transition-colors"
      >
        {mobileView === "editor" ? (
          <><Eye size={16} /> Preview</>
        ) : (
          <><PencilLine size={16} /> Editar</>
        )}
      </button>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-6 md:left-auto md:right-6 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-[#111] border border-[#262626] shadow-xl animate-[slideUp_0.3s_ease]">
          {toast}
        </div>
      )}

      <GuidedTour steps={BIOLINK_TOUR_STEPS} tourId="biolink-editor" />
    </div>
  );
}

export default function BiolinkEditorPage() {
  return (
    <BiolinkEditorProvider>
      <EditorContent />
    </BiolinkEditorProvider>
  );
}
