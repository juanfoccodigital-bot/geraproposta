"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Plus, Trash2, Loader2, Pencil, Check, User } from "lucide-react";
import type { Contact } from "@/types/crm";

interface ContactsModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ContactsModal({ open, onClose, onUpdate }: ContactsModalProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "", company: "" });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/crm/contacts");
      if (!res.ok) throw new Error("Erro ao carregar contatos");
      setContacts(await res.json());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchContacts();
    }
  }, [open, fetchContacts]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/crm/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim() || null,
          phone: newPhone.trim() || null,
          company: newCompany.trim() || null,
        }),
      });
      if (!res.ok) throw new Error("Erro ao criar contato");
      setNewName(""); setNewEmail(""); setNewPhone(""); setNewCompany("");
      await fetchContacts();
      onUpdate();
    } catch { setError("Erro ao criar contato"); }
    finally { setCreating(false); }
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/crm/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      setEditingId(null);
      await fetchContacts();
      onUpdate();
    } catch { setError("Erro ao atualizar contato"); }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/crm/contacts/${id}`, { method: "DELETE" });
      await fetchContacts();
      onUpdate();
    } catch { setError("Erro ao excluir contato"); }
    finally { setDeletingId(null); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div
        className="w-full max-w-lg max-h-[85vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: "#111111", border: "1px solid #262626" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#262626" }}>
          <div className="flex items-center gap-2">
            <User size={16} className="text-orange-500" />
            <h2 className="text-sm font-semibold text-white">Contatos</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg transition-colors hover:bg-white/10">
            <X size={16} style={{ color: "#737373" }} />
          </button>
        </div>

        {/* Create form */}
        <div className="p-4 border-b" style={{ borderColor: "#262626" }}>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome *"
              className="px-3 py-2 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none"
              style={{ background: "#1A1A1A", border: "1px solid #262626" }}
            />
            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              className="px-3 py-2 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none"
              style={{ background: "#1A1A1A", border: "1px solid #262626" }}
            />
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Telefone"
              className="px-3 py-2 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none"
              style={{ background: "#1A1A1A", border: "1px solid #262626" }}
            />
            <input
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="Empresa"
              className="px-3 py-2 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none"
              style={{ background: "#1A1A1A", border: "1px solid #262626" }}
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={creating || !newName.trim()}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-white transition-colors disabled:opacity-50"
            style={{ background: "#F97316" }}
          >
            {creating ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            Adicionar Contato
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {error && <p className="text-xs text-red-400 mb-2">{error}</p>}
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-orange-500" /></div>
          ) : contacts.length === 0 ? (
            <p className="text-xs text-center py-8" style={{ color: "#737373" }}>Nenhum contato cadastrado</p>
          ) : (
            contacts.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "#1A1A1A", border: "1px solid #262626" }}
              >
                {editingId === c.id ? (
                  <div className="flex-1 space-y-1.5">
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-2 py-1 rounded text-xs text-white outline-none"
                      style={{ background: "#111111", border: "1px solid #333" }}
                    />
                    <div className="grid grid-cols-3 gap-1">
                      <input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} placeholder="Email" className="px-2 py-1 rounded text-xs text-white outline-none" style={{ background: "#111111", border: "1px solid #333" }} />
                      <input value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} placeholder="Fone" className="px-2 py-1 rounded text-xs text-white outline-none" style={{ background: "#111111", border: "1px solid #333" }} />
                      <input value={editData.company} onChange={(e) => setEditData({ ...editData, company: e.target.value })} placeholder="Empresa" className="px-2 py-1 rounded text-xs text-white outline-none" style={{ background: "#111111", border: "1px solid #333" }} />
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(c.id)} className="px-2 py-1 rounded text-xs text-white" style={{ background: "#5BA68A" }}><Check size={12} /></button>
                      <button onClick={() => setEditingId(null)} className="px-2 py-1 rounded text-xs" style={{ color: "#737373" }}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{c.name}</p>
                      <p className="text-[10px] truncate" style={{ color: "#737373" }}>
                        {[c.company, c.email, c.phone].filter(Boolean).join(" · ") || "Sem detalhes"}
                      </p>
                    </div>
                    <button
                      onClick={() => { setEditingId(c.id); setEditData({ name: c.name, email: c.email || "", phone: c.phone || "", company: c.company || "" }); }}
                      className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                    >
                      <Pencil size={12} style={{ color: "#737373" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={deletingId === c.id}
                      className="p-1.5 rounded-lg transition-colors hover:bg-red-500/20"
                    >
                      {deletingId === c.id ? <Loader2 size={12} className="animate-spin text-red-400" /> : <Trash2 size={12} className="text-red-400" />}
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
