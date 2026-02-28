"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe, Plus, ExternalLink, Eye, MoreVertical, Trash2, Power, Check } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import type { SiteRecord } from "@/types/site";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { siteCategoryLabels } from "@/types/site";
import type { SiteCategory } from "@/types/site";

export default function SitesPage() {
  const router = useRouter();
  const [sites, setSites] = useState<SiteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [filterCat, setFilterCat] = useState<SiteCategory | "all">("all");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    loadSites();
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  async function loadSites() {
    try {
      const res = await fetch("/api/sites");
      if (res.ok) setSites(await res.json());
      else if (res.status === 403) {
        setSites([]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function createSite(templateId: string) {
    setCreating(true);
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: templateId }),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.error || "Erro ao criar site");
        return;
      }
      const data = await res.json();
      router.push(`/sites/editor/${data.id}`);
    } catch {
      showToast("Erro ao criar site");
    } finally {
      setCreating(false);
      setShowTemplates(false);
    }
  }

  async function toggleActive(id: string, current: boolean) {
    const res = await fetch(`/api/sites/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !current }),
    });
    if (res.ok) {
      setSites((prev) => prev.map((s) => (s.id === id ? { ...s, is_active: !current } : s)));
      showToast(!current ? "Site ativado" : "Site desativado");
    }
    setMenuOpen(null);
  }

  async function deleteSite(id: string) {
    if (!confirm("Tem certeza que deseja excluir este site?")) return;
    const res = await fetch(`/api/sites/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSites((prev) => prev.filter((s) => s.id !== id));
      showToast("Site excluído");
    }
    setMenuOpen(null);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  const filteredTemplates = filterCat === "all" ? SITE_TEMPLATES : SITE_TEMPLATES.filter((t) => t.category === filterCat);
  const categories = Object.entries(siteCategoryLabels) as [SiteCategory, string][];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Banner — Em breve */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                GeraSites
                <span className="text-[10px] px-2.5 py-1 rounded-full font-bold" style={{ background: "#F97316", color: "#FFF" }}>
                  Em breve
                </span>
              </h1>
              <p className="text-white/70 text-sm mt-0.5">Estamos finalizando o criador de sites. Em breve voce podera criar landing pages profissionais em minutos!</p>
            </div>
          </div>
        </div>

        {/* Coming soon state */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Globe size={36} className="text-white/20" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Em breve</h3>
          <p className="text-sm text-white/40 max-w-sm">
            O GeraSites esta em fase final de desenvolvimento. Voce sera notificado quando estiver disponivel!
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Globe size={28} className="text-white/20" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Nenhum site criado</h3>
            <p className="text-sm text-white/40 mb-4">Crie seu primeiro site agora mesmo.</p>
            <button onClick={() => setShowTemplates(true)} className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm rounded-xl transition-colors">
              Criar Primeiro Site
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map((site) => (
              <div key={site.id} className="rounded-xl border border-[#1A1A1A] bg-[#111] overflow-hidden hover:border-[#262626] transition-colors">
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ background: site.config?.theme?.colors?.gold || "#6366F1" }}
                >
                  <span className="text-3xl font-bold text-white/80">
                    {site.title?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{site.title}</h3>
                      <p className="text-xs text-white/40">/site/{site.slug}</p>
                    </div>
                    <div className="relative">
                      <button onClick={() => setMenuOpen(menuOpen === site.id ? null : site.id)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                        <MoreVertical size={14} className="text-white/40" />
                      </button>
                      {menuOpen === site.id && (
                        <div className="absolute right-0 top-8 w-40 bg-[#1A1A1A] border border-[#262626] rounded-xl shadow-xl z-10 py-1">
                          <button onClick={() => toggleActive(site.id, site.is_active)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white">
                            <Power size={12} /> {site.is_active ? "Desativar" : "Ativar"}
                          </button>
                          <button onClick={() => deleteSite(site.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10">
                            <Trash2 size={12} /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-xs text-white/30">
                      <Eye size={12} /> {site.views || 0}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${site.is_active ? "bg-green-500/10 text-green-400" : "bg-white/5 text-white/30"}`}>
                      {site.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => router.push(`/sites/editor/${site.id}`)} className="flex-1 py-2 text-xs font-medium text-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
                      Editar
                    </button>
                    <a href={`/site/${site.slug}`} target="_blank" className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
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
          <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#1A1A1A]">
              <h2 className="text-lg font-semibold text-white">Escolha um Template</h2>
              <p className="text-sm text-white/40 mt-1">Selecione o modelo para sua landing page.</p>
              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setFilterCat("all")}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filterCat === "all" ? "border-[#6366F1] text-[#6366F1] bg-[#6366F1]/10" : "border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  Todos
                </button>
                {categories.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilterCat(key)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      filterCat === key ? "border-[#6366F1] text-[#6366F1] bg-[#6366F1]/10" : "border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredTemplates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => createSite(tmpl.id)}
                  disabled={creating}
                  className="rounded-xl border border-[#1A1A1A] p-3 text-left transition-all hover:border-[#6366F1]/40 hover:bg-[#6366F1]/5"
                >
                  <div
                    className="w-full h-20 rounded-lg mb-2"
                    style={{ background: tmpl.config.theme.colors?.gold || "#6366F1" }}
                  />
                  <p className="text-xs font-medium text-white">{tmpl.name}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{tmpl.description}</p>
                  <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/30">
                    {siteCategoryLabels[tmpl.category]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-[#111] border border-[#262626] shadow-xl animate-[slideUp_0.3s_ease] z-50">
          <Check size={14} className="text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
