"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { BiolinkMarqueeData } from "@/types/biolink";
import { Plus, Trash2 } from "lucide-react";

const speedOptions = [
  { id: "slow" as const, label: "Lento" },
  { id: "normal" as const, label: "Normal" },
  { id: "fast" as const, label: "Rápido" },
];

export default function MarqueeEditor({ blockId, data }: { blockId: string; data: BiolinkMarqueeData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<BiolinkMarqueeData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  function updateItem(index: number, value: string) {
    const items = data.items.map((item, i) => (i === index ? value : item));
    update({ items });
  }

  function addItem() {
    update({ items: [...data.items, "Novo texto"] });
  }

  function removeItem(index: number) {
    update({ items: data.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-3 pt-2">
      <div className="space-y-2">
        {data.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              className="flex-1 px-2 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
            />
            {data.items.length > 1 && (
              <button onClick={() => removeItem(i)} className="p-1 text-white/20 hover:text-red-400 transition-colors cursor-pointer">
                <Trash2 size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button onClick={addItem} className="flex items-center gap-1 text-xs text-[#F97316] hover:text-[#FB923C] transition-colors cursor-pointer">
        <Plus size={14} /> Adicionar texto
      </button>

      {/* Velocidade */}
      <div>
        <span className="text-[10px] text-white/40 block mb-1.5">Velocidade</span>
        <div className="flex gap-1.5">
          {speedOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => update({ speed: opt.id })}
              className={`flex-1 py-1.5 text-[10px] rounded-md border transition-colors cursor-pointer ${
                (data.speed || "normal") === opt.id
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
