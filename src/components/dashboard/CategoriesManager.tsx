"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Plus, Trash2, Loader2, Tag, Pencil, Check } from "lucide-react";
import type { CategoryRecord } from "@/types/proposal";

/* ============================================
   CATEGORIES MANAGER
   Modal CRUD para gerenciar categorias
   ============================================ */

interface CategoriesManagerProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const PRESET_COLORS = [
  "#4A7BC7", "#E67E22", "#C4727F", "#8B5CF6",
  "#5BA68A", "#DC2626", "#0EA5E9", "#F59E0B",
  "#10B981", "#EC4899", "#6366F1", "#F97316",
];

export default function CategoriesManager({ open, onClose, onUpdate }: CategoriesManagerProps) {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#8B5CF6");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Erro ${res.status}`);
      }
      const data = await res.json();
      setCategories(data);
      setError("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao carregar categorias";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setError("");
      fetchCategories();
    }
  }, [open, fetchCategories]);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    setError("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          slug: generateSlug(newName),
          color: newColor,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao criar");
        return;
      }

      setNewName("");
      setNewColor("#8B5CF6");
      await fetchCategories();
      onUpdate();
    } catch {
      setError("Erro ao criar categoria");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setError("");

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          slug: generateSlug(editName),
          color: editColor,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao atualizar");
        return;
      }

      setEditingId(null);
      await fetchCategories();
      onUpdate();
    } catch {
      setError("Erro ao atualizar categoria");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Excluir categoria "${name}"? Propostas nesta categoria ficarão sem categoria.`)) return;
    setDeletingId(id);
    setError("");

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await fetchCategories();
      onUpdate();
    } catch {
      setError("Erro ao excluir categoria");
    } finally {
      setDeletingId(null);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111111] rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col border border-[#262626]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5" style={{ color: "#F97316" }} />
            <h3 className="text-lg font-semibold text-white">Categorias</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white/40" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <p className="text-xs text-red-400 bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>
          )}

          {/* Create new */}
          <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#262626]">
            <p className="text-xs font-medium text-white/50 mb-3">Nova Categoria</p>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  placeholder="Nome da categoria..."
                  className="w-full px-3 py-2 rounded-lg border border-[#262626] bg-[#111111] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F97316]/50"
                />
              </div>
              <div className="flex gap-1">
                {PRESET_COLORS.slice(0, 6).map((c) => (
                  <button
                    key={c}
                    onClick={() => setNewColor(c)}
                    className="w-6 h-6 rounded-full border-2 transition-all cursor-pointer flex-shrink-0"
                    style={{
                      backgroundColor: c,
                      borderColor: newColor === c ? "#FFFFFF" : "transparent",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={handleCreate}
                disabled={creating || !newName.trim()}
                className="px-3 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-colors cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
                style={{ backgroundColor: "#F97316" }}
              >
                {creating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                Criar
              </button>
            </div>
          </div>

          {/* Categories list */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-white/30" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-sm text-white/40 py-8">
              Nenhuma categoria criada ainda.
            </p>
          ) : (
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#262626] bg-[#0A0A0A] hover:border-[#404040] transition-colors"
                >
                  {editingId === cat.id ? (
                    <>
                      <div className="flex gap-1 flex-shrink-0">
                        {PRESET_COLORS.map((c) => (
                          <button
                            key={c}
                            onClick={() => setEditColor(c)}
                            className="w-5 h-5 rounded-full border-2 transition-all cursor-pointer"
                            style={{
                              backgroundColor: c,
                              borderColor: editColor === c ? "#FFFFFF" : "transparent",
                            }}
                          />
                        ))}
                      </div>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleUpdate(cat.id)}
                        className="flex-1 px-2 py-1 rounded-lg border border-[#262626] bg-[#111111] text-sm text-white focus:outline-none focus:border-[#F97316]/50"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        className="p-1.5 rounded-lg hover:bg-green-900/20 text-green-500 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 rounded-lg hover:bg-[#1A1A1A] text-white/40 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="flex-1 text-sm font-medium text-white truncate">
                        {cat.name}
                      </span>
                      <span className="text-xs text-white/30 font-mono">
                        {cat.slug}
                      </span>
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditName(cat.name);
                          setEditColor(cat.color);
                        }}
                        className="p-1.5 rounded-lg hover:bg-[#1A1A1A] text-white/40 hover:text-white cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        disabled={deletingId === cat.id}
                        className="p-1.5 rounded-lg hover:bg-red-900/20 text-white/40 hover:text-red-400 cursor-pointer disabled:opacity-40"
                      >
                        {deletingId === cat.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
