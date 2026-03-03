"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { FeaturedData } from "@/types/biolink";
import ImageUpload from "@/components/editor/controls/ImageUpload";

export default function FeaturedEditor({ blockId, data }: { blockId: string; data: FeaturedData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<FeaturedData>) {
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
        <label className="text-[10px] text-white/40 mb-1 block">Descrição</label>
        <textarea
          value={data.description || ""}
          onChange={(e) => update({ description: e.target.value })}
          rows={2}
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50 resize-none"
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
    </div>
  );
}
