"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { CtaData } from "@/types/biolink";
import ImageUpload from "@/components/editor/controls/ImageUpload";

export default function CtaEditor({ blockId, data }: { blockId: string; data: CtaData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<CtaData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Headline</label>
        <input
          type="text"
          value={data.headline || ""}
          onChange={(e) => update({ headline: e.target.value })}
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
        <label className="text-[10px] text-white/40 mb-1 block">Texto do Botão</label>
        <input
          type="text"
          value={data.buttonText || ""}
          onChange={(e) => update({ buttonText: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Link do Botão</label>
        <input
          type="text"
          value={data.buttonUrl || ""}
          onChange={(e) => update({ buttonUrl: e.target.value })}
          placeholder="https://..."
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60 placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
      <div>
        <span className="text-[10px] text-white/40 block mb-1.5">Estilo</span>
        <div className="flex gap-1.5">
          {(["gradient", "image", "glass"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => update({ style: opt })}
              className={`flex-1 py-1.5 text-[10px] rounded-md border transition-colors cursor-pointer ${
                (data.style || "gradient") === opt
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {opt === "gradient" ? "Gradiente" : opt === "image" ? "Imagem" : "Vidro"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Imagem de Fundo</label>
        <ImageUpload value={data.image || ""} onChange={(url) => update({ image: url })} variant="dark" />
      </div>
    </div>
  );
}
