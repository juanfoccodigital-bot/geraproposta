"use client";

import { useState } from "react";
import { X, Loader2, Trophy } from "lucide-react";
import { formatBrl } from "@/lib/crm-utils";
import type { Deal } from "@/types/crm";

interface CloseDealModalProps {
  open: boolean;
  deal: Deal | null;
  onClose: () => void;
  onConfirm: (dealId: string, closedValue: number) => Promise<void>;
}

export default function CloseDealModal({ open, deal, onClose, onConfirm }: CloseDealModalProps) {
  const [closedValue, setClosedValue] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open || !deal) return null;

  const defaultValue = deal.value || 0;

  const handleConfirm = async () => {
    setSaving(true);
    try {
      const val = parseFloat(closedValue) || defaultValue;
      await onConfirm(deal.id, val);
      setClosedValue("");
      onClose();
    } catch { /* handled by parent */ }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-sm rounded-2xl" style={{ background: "#111111", border: "1px solid #262626" }}>
        <div className="p-5 text-center">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: "#5BA68A20" }}>
            <Trophy size={22} style={{ color: "#5BA68A" }} />
          </div>
          <h2 className="text-sm font-semibold text-white mb-1">Fechar Negócio</h2>
          <p className="text-xs mb-4" style={{ color: "#737373" }}>
            &ldquo;{deal.title}&rdquo; — Valor proposto: {formatBrl(defaultValue)}
          </p>

          <div className="mb-4">
            <label className="text-[11px] font-medium mb-1 block text-left" style={{ color: "#737373" }}>
              Valor Fechado (R$)
            </label>
            <input
              type="number"
              value={closedValue}
              onChange={(e) => setClosedValue(e.target.value)}
              placeholder={String(defaultValue)}
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder:text-neutral-500 outline-none text-center font-semibold"
              style={{ background: "#1A1A1A", border: "1px solid #262626" }}
              autoFocus
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg text-xs transition-colors hover:bg-white/5"
              style={{ color: "#737373" }}
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-xs font-medium text-white transition-colors disabled:opacity-50"
              style={{ background: "#5BA68A" }}
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : "Confirmar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
