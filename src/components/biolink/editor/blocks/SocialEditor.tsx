"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { SocialData, SocialItem } from "@/types/biolink";
import { Plus, Trash2 } from "lucide-react";

const platforms = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "twitter", label: "Twitter / X" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "github", label: "GitHub" },
];

const sizeOptions = [
  { id: "sm" as const, label: "P" },
  { id: "md" as const, label: "M" },
  { id: "lg" as const, label: "G" },
];

export default function SocialEditor({ blockId, data }: { blockId: string; data: SocialData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<SocialData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  function updateItem(index: number, changes: Partial<SocialItem>) {
    const items = data.items.map((item, i) => (i === index ? { ...item, ...changes } : item));
    update({ items });
  }

  function addItem() {
    update({ items: [...data.items, { platform: "instagram", url: "https://" }] });
  }

  function removeItem(index: number) {
    update({ items: data.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-3 pt-2">
      {data.items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <select
            value={item.platform}
            onChange={(e) => updateItem(i, { platform: e.target.value })}
            className="w-28 px-2 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
          >
            {platforms.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#111] text-white">{p.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={item.url}
            onChange={(e) => updateItem(i, { url: e.target.value })}
            placeholder="https://..."
            className="flex-1 px-2 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60 focus:outline-none focus:border-[#F97316]/50"
          />
          <button onClick={() => removeItem(i)} className="p-1 text-white/20 hover:text-red-400 transition-colors cursor-pointer">
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-1 text-xs text-[#F97316] hover:text-[#FB923C] transition-colors cursor-pointer">
        <Plus size={14} /> Adicionar rede
      </button>

      {/* Tamanho dos ícones */}
      <div>
        <span className="text-[10px] text-white/40 block mb-1.5">Tamanho</span>
        <div className="flex gap-1.5">
          {sizeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => update({ size: opt.id })}
              className={`px-3 py-1 text-[10px] rounded-md border transition-colors cursor-pointer ${
                (data.size || "md") === opt.id
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
