"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { LinksData, LinkItem } from "@/types/biolink";
import IconPicker from "@/components/editor/controls/IconPicker";
import { Plus, Trash2 } from "lucide-react";

export default function LinksEditor({ blockId, data }: { blockId: string; data: LinksData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<LinksData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  function updateItem(index: number, changes: Partial<LinkItem>) {
    const items = data.items.map((item, i) => (i === index ? { ...item, ...changes } : item));
    update({ items });
  }

  function addItem() {
    const newItem: LinkItem = {
      id: `lk-${Date.now().toString(36)}`,
      title: "Novo Link",
      url: "https://",
      icon: "Globe",
      enabled: true,
    };
    update({ items: [...(data.items || []), newItem] });
  }

  function removeItem(index: number) {
    update({ items: data.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-4 pt-2">
      {data.items?.map((item, i) => (
        <div key={item.id} className="space-y-2 p-2 rounded-lg border border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/30 font-medium">Link {i + 1}</span>
            <button
              onClick={() => removeItem(i)}
              className="p-1 text-white/20 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 size={12} />
            </button>
          </div>

          {/* Icon picker */}
          <div>
            <span className="text-[10px] text-white/40 block mb-1">Icone</span>
            <IconPicker value={item.icon || "Globe"} onChange={(v) => updateItem(i, { icon: v })} />
          </div>

          <input
            type="text"
            value={item.title || ""}
            onChange={(e) => updateItem(i, { title: e.target.value })}
            placeholder="Titulo"
            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
          />
          <input
            type="text"
            value={item.url || ""}
            onChange={(e) => updateItem(i, { url: e.target.value })}
            placeholder="https://..."
            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60 placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/10 text-white/40 hover:border-[#F97316]/30 hover:text-[#F97316] transition-colors text-xs cursor-pointer"
      >
        <Plus size={14} /> Adicionar link
      </button>
    </div>
  );
}
