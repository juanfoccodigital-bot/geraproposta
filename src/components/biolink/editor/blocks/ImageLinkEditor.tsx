"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { ImageLinkData, ImageLinkItem } from "@/types/biolink";
import ImageUpload from "@/components/editor/controls/ImageUpload";
import { Plus, Trash2 } from "lucide-react";

export default function ImageLinkEditor({ blockId, data }: { blockId: string; data: ImageLinkData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<ImageLinkData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  function updateItem(index: number, changes: Partial<ImageLinkItem>) {
    const items = data.items.map((item, i) => (i === index ? { ...item, ...changes } : item));
    update({ items });
  }

  function addItem() {
    const newItem: ImageLinkItem = {
      id: `il-${Date.now().toString(36)}`,
      title: "Novo Item",
      subtitle: "",
      url: "https://",
      image: "",
      enabled: true,
    };
    update({ items: [...(data.items || []), newItem] });
  }

  function removeItem(index: number) {
    update({ items: data.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-4 pt-2">
      {/* Layout */}
      <div>
        <span className="text-[10px] text-white/40 block mb-1.5">Layout</span>
        <div className="flex gap-1.5">
          {(["overlay", "side"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => update({ layout: opt })}
              className={`flex-1 py-1.5 text-[10px] rounded-md border transition-colors cursor-pointer ${
                (data.layout || "overlay") === opt
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {opt === "overlay" ? "Overlay" : "Lado a lado"}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      {data.items?.map((item, i) => (
        <div key={item.id} className="space-y-2 p-2 rounded-lg border border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/30 font-medium">Item {i + 1}</span>
            <button
              onClick={() => removeItem(i)}
              className="p-1 text-white/20 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 size={12} />
            </button>
          </div>
          <input
            type="text"
            value={item.title || ""}
            onChange={(e) => updateItem(i, { title: e.target.value })}
            placeholder="Título"
            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
          />
          <input
            type="text"
            value={item.subtitle || ""}
            onChange={(e) => updateItem(i, { subtitle: e.target.value })}
            placeholder="Subtítulo"
            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
          />
          <input
            type="text"
            value={item.url || ""}
            onChange={(e) => updateItem(i, { url: e.target.value })}
            placeholder="https://..."
            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60 placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
          />
          <ImageUpload value={item.image || ""} onChange={(url) => updateItem(i, { image: url })} variant="dark" />
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/10 text-white/40 hover:border-[#F97316]/30 hover:text-[#F97316] transition-colors text-xs cursor-pointer"
      >
        <Plus size={14} /> Adicionar item
      </button>
    </div>
  );
}
