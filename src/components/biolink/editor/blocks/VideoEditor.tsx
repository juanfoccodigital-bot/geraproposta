"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { BiolinkVideoData } from "@/types/biolink";

const ratioOptions = [
  { id: "16:9" as const, label: "16:9" },
  { id: "1:1" as const, label: "1:1" },
  { id: "9:16" as const, label: "9:16" },
];

export default function VideoEditor({ blockId, data }: { blockId: string; data: BiolinkVideoData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<BiolinkVideoData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">URL do vídeo (YouTube / Vimeo)</label>
        <input
          type="text"
          value={data.url || ""}
          onChange={(e) => update({ url: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
      <div>
        <span className="text-[10px] text-white/40 block mb-1.5">Proporção</span>
        <div className="flex gap-1.5">
          {ratioOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => update({ aspectRatio: opt.id })}
              className={`flex-1 py-1.5 text-[10px] rounded-md border transition-colors cursor-pointer ${
                (data.aspectRatio || "16:9") === opt.id
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
