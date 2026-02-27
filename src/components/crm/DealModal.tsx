"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Trash2 } from "lucide-react";
import type { Deal, Contact, DealStage } from "@/types/crm";
import { PIPELINE_STAGES, stageLabels } from "@/types/crm";
import ContactSelect from "./ContactSelect";

interface Proposal {
  id: string;
  title: string;
  client_name: string;
}

interface DealModalProps {
  open: boolean;
  deal: Deal | null; // null = create mode
  contacts: Contact[];
  proposals: Proposal[];
  onClose: () => void;
  onSave: (data: DealFormData) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export interface DealFormData {
  title: string;
  contact_id: string | null;
  proposal_id: string | null;
  value: number;
  stage: DealStage;
  notes: string;
  closed_value?: number | null;
}

export default function DealModal({ open, deal, contacts, proposals, onClose, onSave, onDelete }: DealModalProps) {
  const [title, setTitle] = useState("");
  const [contactId, setContactId] = useState<string | null>(null);
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [stage, setStage] = useState<DealStage>("lead");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (open && deal) {
      setTitle(deal.title);
      setContactId(deal.contact_id);
      setProposalId(deal.proposal_id);
      setValue(deal.value > 0 ? String(deal.value) : "");
      setStage(deal.stage);
      setNotes(deal.notes || "");
    } else if (open) {
      setTitle(""); setContactId(null); setProposalId(null);
      setValue(""); setStage("lead"); setNotes("");
    }
  }, [open, deal]);

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        contact_id: contactId,
        proposal_id: proposalId,
        value: parseFloat(value) || 0,
        stage,
        notes: notes.trim(),
      });
      onClose();
    } catch { /* handled by parent */ }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deal || !onDelete) return;
    setDeleting(true);
    try {
      await onDelete(deal.id);
      onClose();
    } catch { /* handled by parent */ }
    finally { setDeleting(false); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-md rounded-2xl" style={{ background: "#111111", border: "1px solid #262626" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#262626" }}>
          <h2 className="text-sm font-semibold text-white">{deal ? "Editar Negócio" : "Novo Negócio"}</h2>
          <button onClick={onClose} className="p-1 rounded-lg transition-colors hover:bg-white/10">
            <X size={16} style={{ color: "#737373" }} />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <div>
            <label className="text-[11px] font-medium mb-1 block" style={{ color: "#737373" }}>Título *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Proposta Site João"
              className="w-full px-3 py-2 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none"
              style={{ background: "#1A1A1A", border: "1px solid #262626" }}
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-[11px] font-medium mb-1 block" style={{ color: "#737373" }}>Contato</label>
            <ContactSelect value={contactId} onChange={setContactId} contacts={contacts} />
          </div>

          {/* Proposal */}
          <div>
            <label className="text-[11px] font-medium mb-1 block" style={{ color: "#737373" }}>Proposta vinculada</label>
            <select
              value={proposalId || ""}
              onChange={(e) => setProposalId(e.target.value || null)}
              className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none appearance-none"
              style={{ background: "#1A1A1A", border: "1px solid #262626" }}
            >
              <option value="">Nenhuma</option>
              {proposals.map((p) => (
                <option key={p.id} value={p.id}>{p.title} — {p.client_name}</option>
              ))}
            </select>
          </div>

          {/* Value + Stage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium mb-1 block" style={{ color: "#737373" }}>Valor (R$)</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none"
                style={{ background: "#1A1A1A", border: "1px solid #262626" }}
              />
            </div>
            <div>
              <label className="text-[11px] font-medium mb-1 block" style={{ color: "#737373" }}>Etapa</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as DealStage)}
                className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none appearance-none"
                style={{ background: "#1A1A1A", border: "1px solid #262626" }}
              >
                {PIPELINE_STAGES.map((s) => (
                  <option key={s} value={s}>{stageLabels[s]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] font-medium mb-1 block" style={{ color: "#737373" }}>Observações</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Anotações sobre este negócio..."
              className="w-full px-3 py-2 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none resize-none"
              style={{ background: "#1A1A1A", border: "1px solid #262626" }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: "#262626" }}>
          {deal && onDelete ? (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-red-400 transition-colors hover:bg-red-500/10"
            >
              {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
              Excluir
            </button>
          ) : <div />}
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs transition-colors hover:bg-white/5" style={{ color: "#737373" }}>
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-colors disabled:opacity-50"
              style={{ background: "#F97316" }}
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : deal ? "Salvar" : "Criar Negócio"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
