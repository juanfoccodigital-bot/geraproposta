"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { CarouselData } from "@/types/biolink";
import ImageUpload from "@/components/editor/controls/ImageUpload";
import { Plus, Trash2 } from "lucide-react";

export default function CarouselEditor({ blockId, data }: { blockId: string; data: CarouselData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<CarouselData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  function updateItem(index: number, changes: Partial<CarouselData["items"][number]>) {
    const items = data.items.map((item, i) => (i === index ? { ...item, ...changes } : item));
    update({ items });
  }

  function addItem() {
    const newItem = {
      id: `cr-${Date.now().toString(36)}`,
      image: "",
      title: "",
      url: "https://",
    };
    update({ items: [...(data.items || []), newItem] });
  }

  function removeItem(index: number) {
    update({ items: data.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-4 pt-2">
      {/* Aspect Ratio */}
      <div>
        <span className="text-[10px] text-white/40 block mb-1.5">Proporção</span>
        <div className="flex gap-1.5">
          {(["16:9", "4:3", "1:1"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => update({ aspectRatio: opt })}
              className={`flex-1 py-1.5 text-[10px] rounded-md border transition-colors cursor-pointer ${
                (data.aspectRatio || "16:9") === opt
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-play */}
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Auto-play ({data.autoPlay || 0}s)</label>
        <input
          type="range"
          min={0}
          max={10}
          value={data.autoPlay || 0}
          onChange={(e) => update({ autoPlay: parseInt(e.target.value) })}
          className="w-full accent-[#F97316]"
        />
        <p className="text-[10px] text-white/20 mt-0.5">{data.autoPlay ? `Troca a cada ${data.autoPlay}s` : "Desativado"}</p>
      </div>

      {/* Slides */}
      {data.items?.map((item, i) => (
        <div key={item.id} className="space-y-2 p-2 rounded-lg border border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/30 font-medium">Slide {i + 1}</span>
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
            placeholder="Título do slide"
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
        <Plus size={14} /> Adicionar slide
      </button>
    </div>
  );
}
