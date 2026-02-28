"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Plus, ExternalLink, Eye, MoreVertical, Trash2, Power, Copy, Check } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import BiolinkPreviewThumbnail from "@/components/ui/BiolinkPreviewThumbnail";
import type { BiolinkRecord } from "@/types/biolink";
import { BIOLINK_TEMPLATES } from "@/lib/biolink-templates";

export default function BiolinkPage() {
  const router = useRouter();
  const [biolinks, setBiolinks] = useState<BiolinkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    loadBiolinks();
    fetch("/api/usage").then((r) => r.json()).then((d) => setIsPremium(d.plan !== "free")).catch(() => {});
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  async function loadBiolinks() {
    try {
      const res = await fetch("/api/biolinks");
      if (res.ok) setBiolinks(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function createBiolink(templateId: string) {
    setCreating(true);
    try {
      const res = await fetch("/api/biolinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: templateId }),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.error || "Erro ao criar");
        return;
      }
      const data = await res.json();
      router.push(`/biolink/editor/${data.id}`);
    } catch {
      showToast("Erro ao criar biolink");
    } finally {
      setCreating(false);
      setShowTemplates(false);
    }
  }

  async function toggleActive(id: string, current: boolean) {
    const res = await fetch(`/api/biolinks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !current }),
    });
    if (res.ok) {
      setBiolinks((prev) => prev.map((b) => (b.id === id ? { ...b, is_active: !current } : b)));
      showToast(!current ? "Link ativado" : "Link desativado");
    }
    setMenuOpen(null);
  }

  async function deleteBiolink(id: string) {
    if (!confirm("Tem certeza que deseja excluir este biolink?")) return;
    const res = await fetch(`/api/biolinks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBiolinks((prev) => prev.filter((b) => b.id !== id));
      showToast("Biolink excluído");
    }
    setMenuOpen(null);
  }

  function copyLink(slug: string) {
    navigator.clipboard.writeText(`${window.location.origin}/link/${slug}`);
    showToast("Link copiado!");
    setMenuOpen(null);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Banner */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{
            background: "linear-gradient(135deg, #F97316 0%, #EA580C 50%, #C2410C 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Link2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                GeraLink
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-medium">LINK NA BIO</span>
              </h1>
              <p className="text-white/70 text-sm mt-0.5">Crie páginas de links profissionais para suas redes sociais.</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Meus Links</h2>
          <button
            onClick={() => setShowTemplates(true)}
            disabled={creating}
            className="flex items-center gap-2 px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} />
            Novo Link
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : biolinks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Link2 size={28} className="text-white/20" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Nenhum link criado</h3>
            <p className="text-sm text-white/40 mb-4">Crie seu primeiro link na bio agora mesmo.</p>
            <button onClick={() => setShowTemplates(true)} className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-sm rounded-xl transition-colors">
              Criar Primeiro Link
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {biolinks.map((bl) => (
              <div key={bl.id} className="rounded-xl border border-[#1A1A1A] bg-[#111] overflow-hidden hover:border-[#262626] transition-colors">
                {/* Preview bar */}
                <div
                  className="h-20 flex items-center justify-center"
                  style={{ background: bl.config?.theme?.backgroundType === "gradient" ? bl.config.theme.backgroundValue : bl.config?.theme?.background || "#FFFFFF" }}
                >
                  <span className="text-2xl font-bold" style={{ color: bl.config?.theme?.textColor || "#000" }}>
                    {bl.title?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{bl.title}</h3>
                      <p className="text-xs text-white/40">/link/{bl.slug}</p>
                    </div>
                    <div className="relative">
                      <button onClick={() => setMenuOpen(menuOpen === bl.id ? null : bl.id)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                        <MoreVertical size={14} className="text-white/40" />
                      </button>
                      {menuOpen === bl.id && (
                        <div className="absolute right-0 top-8 w-40 bg-[#1A1A1A] border border-[#262626] rounded-xl shadow-xl z-10 py-1">
                          <button onClick={() => copyLink(bl.slug)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white">
                            <Copy size={12} /> Copiar Link
                          </button>
                          <button onClick={() => toggleActive(bl.id, bl.is_active)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white">
                            <Power size={12} /> {bl.is_active ? "Desativar" : "Ativar"}
                          </button>
                          <button onClick={() => deleteBiolink(bl.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10">
                            <Trash2 size={12} /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-xs text-white/30">
                      <Eye size={12} /> {bl.views || 0} views
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${bl.is_active ? "bg-green-500/10 text-green-400" : "bg-white/5 text-white/30"}`}>
                      {bl.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/biolink/editor/${bl.id}`)}
                      className="flex-1 py-2 text-xs font-medium text-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      Editar
                    </button>
                    <a
                      href={`/link/${bl.slug}`}
                      target="_blank"
                      className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink size={14} className="text-white/50" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template picker modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowTemplates(false)}>
          <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#1A1A1A]">
              <h2 className="text-lg font-semibold text-white">Escolha um Template</h2>
              <p className="text-sm text-white/40 mt-1">Selecione o visual para seu link na bio.</p>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {BIOLINK_TEMPLATES.map((tmpl) => {
                const locked = tmpl.isPremium && !isPremium;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => !locked && createBiolink(tmpl.id)}
                    disabled={locked || creating}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      locked
                        ? "border-white/5 opacity-40 cursor-not-allowed"
                        : "border-[#1A1A1A] hover:border-[#F97316]/40 hover:bg-[#F97316]/5"
                    }`}
                  >
                    <div className="rounded-lg overflow-hidden mb-2">
                      <BiolinkPreviewThumbnail config={tmpl.config} height={140} />
                    </div>
                    <p className="text-xs font-medium text-white">{tmpl.name}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{tmpl.description}</p>
                    {tmpl.isPremium && (
                      <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded-full bg-[#F97316]/10 text-[#F97316]">
                        PREMIUM
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-[#111] border border-[#262626] shadow-xl animate-[slideUp_0.3s_ease] z-50">
          <Check size={14} className="text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
