"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { BiolinkDividerData } from "@/types/biolink";

const styleOptions = [
  { id: "line" as const, label: "Linha" },
  { id: "dots" as const, label: "Pontos" },
  { id: "space" as const, label: "Espaço" },
];

export default function DividerEditor({ blockId, data }: { blockId: string; data: BiolinkDividerData }) {
  const { dispatch } = useBiolinkEditor();

  return (
    <div className="pt-2">
      <span className="text-[10px] text-white/40 block mb-1.5">Estilo</span>
      <div className="flex gap-1.5">
        {styleOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: { style: opt.id } })}
            className={`flex-1 py-1.5 text-[10px] rounded-md border transition-colors cursor-pointer ${
              (data.style || "line") === opt.id
                ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                : "border-white/10 text-white/40 hover:border-white/20"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
