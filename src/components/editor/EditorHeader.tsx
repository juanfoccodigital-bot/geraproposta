"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useEditor } from "@/contexts/EditorContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAutosave } from "@/lib/useAutosave";
import { HeroConfig } from "@/types/proposal";
import {
  Save,
  Share2,
  LogOut,
  Check,
  Copy,
  ExternalLink,
  X,
  Loader2,
  ArrowLeft,
  MessageCircle,
  Undo2,
  Redo2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import Image from "next/image";

/* ============================================
   EDITOR HEADER
   Barra superior: voltar, save, share, logout
   ============================================ */

export default function EditorHeader() {
  const { state, dispatch } = useEditor();
  const { logout } = useAuth();
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [slugDraft, setSlugDraft] = useState("");
  const [slugSaving, setSlugSaving] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [editLimitReached, setEditLimitReached] = useState(false);
  const [editLimitError, setEditLimitError] = useState("");

  const doSave = useCallback(async () => {
    if (!state.proposalId || editLimitReached) return;
    const blocks = state.config.blocks || [];
    const heroBlock = blocks.find((b) => b.type === "hero");
    const clientName = heroBlock ? (heroBlock.data as HeroConfig)?.clientName || "" : "";
    const res = await fetch(`/api/proposals/${state.proposalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: state.config.meta.title,
        client_name: clientName,
        config: state.config,
      }),
    });
    if (!res.ok) {
      if (res.status === 403) {
        const data = await res.json().catch(() => ({ error: "" }));
        setEditLimitReached(true);
        setEditLimitError(data.error || "Limite de alteracoes atingido.");
        return; // Don't throw — just block further saves
      }
      throw new Error("Save failed");
    }
    dispatch({ type: "MARK_CLEAN" });
  }, [state.proposalId, state.config, dispatch, editLimitReached]);

  const { saving: autoSaving, lastSaved } = useAutosave({
    data: state.config,
    onSave: doSave,
    delay: 3000,
    enabled: !!state.proposalId && !editLimitReached,
  });

  const handleSave = async () => {
    if (!state.proposalId) return;
    setSaving(true);
    setSaveStatus("idle");
    try {
      await doSave();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    if (!state.slug) return;
    const url = `${window.location.origin}/p/${state.slug}`;
    setShareUrl(url);
    setSlugDraft(state.slug);
    setShowShareModal(true);
    setCopied(false);
    setSlugError("");
  };

  const handleSlugSave = async () => {
    if (!state.proposalId || !slugDraft || slugDraft.length < 3) {
      setSlugError("Slug deve ter pelo menos 3 caracteres");
      return;
    }
    setSlugSaving(true);
    setSlugError("");
    try {
      const checkRes = await fetch(`/api/proposals/check-slug?slug=${slugDraft}&exclude=${state.proposalId}`);
      const { available } = await checkRes.json();
      if (!available) {
        setSlugError("Este slug já está em uso");
        setSlugSaving(false);
        return;
      }
      const res = await fetch(`/api/proposals/${state.proposalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slugDraft }),
      });
      if (res.ok) {
        dispatch({ type: "SET_PROPOSAL_META", payload: { proposalId: state.proposalId, slug: slugDraft } });
        setShareUrl(`${window.location.origin}/p/${slugDraft}`);
      }
    } catch {
      setSlugError("Erro ao salvar slug");
    } finally {
      setSlugSaving(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  const handleUndo = useCallback(() => dispatch({ type: "UNDO" }), [dispatch]);
  const handleRedo = useCallback(() => dispatch({ type: "REDO" }), [dispatch]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleUndo, handleRedo]);

  return (
    <>
      <header className="h-14 border-b border-white/10 bg-[#0A0A0A] flex items-center justify-between px-4 flex-shrink-0">
        {/* Esquerda: voltar + título */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            title="Voltar ao Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="hidden md:flex h-8 px-2.5 items-center justify-center">
            <Image
              src="/logo.png"
              alt="gerapropostas"
              width={110}
              height={16}
              style={{ height: 16, width: "auto" }}
            />
          </div>
          {editingTitle ? (
            <input
              type="text"
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => {
                dispatch({ type: "UPDATE_META", payload: { title: titleDraft } });
                setEditingTitle(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch({ type: "UPDATE_META", payload: { title: titleDraft } });
                  setEditingTitle(false);
                }
              }}
              autoFocus
              className="text-sm font-medium text-white bg-transparent border-b border-[#F97316] focus:outline-none max-w-[200px]"
            />
          ) : (
            <button
              onClick={() => { setTitleDraft(state.config.meta.title || ""); setEditingTitle(true); }}
              className="text-sm font-medium text-white truncate max-w-[200px] hover:text-[#F97316] transition-colors cursor-pointer"
              title="Clique para editar"
            >
              {state.config.meta.title || "Proposta"}
            </button>
          )}
        </div>

        {/* Direita: ações */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="hidden md:flex items-center gap-0.5 mr-1">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              title="Desfazer (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              title="Refazer (Ctrl+Shift+Z)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Status de salvamento */}
          {autoSaving ? (
            <span className="text-xs text-white/40 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Salvando...
            </span>
          ) : lastSaved ? (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Salvo
            </span>
          ) : saveStatus === "saved" ? (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Salvo
            </span>
          ) : saveStatus === "error" ? (
            <span className="text-xs text-red-400">Erro ao salvar</span>
          ) : null}

          {/* Botão Salvar */}
          {state.proposalId && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium transition-all hover:bg-white/5 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              Salvar
            </button>
          )}

          {/* Botão Compartilhar */}
          {state.slug && (
            <button
              data-tour="share-button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-[#F97316] text-white text-sm font-medium transition-all hover:bg-[#F97316]/90 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Compartilhar</span>
            </button>
          )}

          <button
            onClick={logout}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Edit limit banner */}
      {editLimitReached && (
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-sm text-red-300">
              {editLimitError || "Limite de alteracoes diarias atingido. Suas alteracoes nao serao salvas."}
            </span>
          </div>
          <button
            onClick={() => router.push("/pricing")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex-shrink-0 transition-all hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "#F97316" }}
          >
            <Zap className="w-3 h-3" />
            Upgrade
          </button>
        </div>
      )}

      {/* Modal de compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Link de Compartilhamento
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <p className="text-sm text-white/50 mb-4">
              Qualquer pessoa com este link pode visualizar a proposta.
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70 font-mono truncate"
              />
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F97316] text-white text-sm font-medium transition-all hover:bg-[#F97316]/90 flex-shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center">
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#F97316] hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Abrir em nova aba
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Olá! Confira a proposta: ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-400 hover:underline ml-4"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Enviar por WhatsApp
              </a>
            </div>

            {/* Editar slug */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <label className="text-xs text-white/50 mb-1.5 block font-medium">URL personalizada</label>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-0 rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                  <span className="text-xs text-white/30 pl-3 flex-shrink-0">/p/</span>
                  <input
                    type="text"
                    value={slugDraft}
                    onChange={(e) => setSlugDraft(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 px-1 py-2 text-xs text-white/70 bg-transparent border-none focus:outline-none"
                    placeholder="meu-slug"
                  />
                </div>
                <button
                  onClick={handleSlugSave}
                  disabled={slugSaving || slugDraft === state.slug}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-white disabled:opacity-40 cursor-pointer"
                >
                  {slugSaving ? "..." : "Salvar"}
                </button>
              </div>
              {slugError && <p className="text-xs text-red-400 mt-1">{slugError}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
