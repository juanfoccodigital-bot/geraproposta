"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { BannerData } from "@/types/biolink";
import ImageUpload from "@/components/editor/controls/ImageUpload";

export default function BannerEditor({ blockId, data }: { blockId: string; data: BannerData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<BannerData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Título</label>
        <input
          type="text"
          value={data.title || ""}
          onChange={(e) => update({ title: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Subtítulo</label>
        <input
          type="text"
          value={data.subtitle || ""}
          onChange={(e) => update({ subtitle: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Link</label>
        <input
          type="text"
          value={data.url || ""}
          onChange={(e) => update({ url: e.target.value })}
          placeholder="https://..."
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60 placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Imagem</label>
        <ImageUpload value={data.image || ""} onChange={(url) => update({ image: url })} variant="dark" />
      </div>
      <div>
        <span className="text-[10px] text-white/40 block mb-1.5">Altura</span>
        <div className="flex gap-1.5">
          {(["sm", "md", "lg"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => update({ height: opt })}
              className={`flex-1 py-1.5 text-[10px] rounded-md border transition-colors cursor-pointer ${
                (data.height || "md") === opt
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {opt === "sm" ? "Pequeno" : opt === "md" ? "Médio" : "Grande"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Overlay ({data.overlay || 40}%)</label>
        <input
          type="range"
          min={0}
          max={90}
          value={data.overlay || 40}
          onChange={(e) => update({ overlay: parseInt(e.target.value) })}
          className="w-full accent-[#F97316]"
        />
      </div>
    </div>
  );
}
