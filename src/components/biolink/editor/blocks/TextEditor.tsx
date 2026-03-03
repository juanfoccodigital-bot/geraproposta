"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { BiolinkTextData } from "@/types/biolink";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const alignOptions = [
  { id: "left" as const, icon: AlignLeft },
  { id: "center" as const, icon: AlignCenter },
  { id: "right" as const, icon: AlignRight },
];

export default function TextEditor({ blockId, data }: { blockId: string; data: BiolinkTextData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<BiolinkTextData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  return (
    <div className="space-y-3 pt-2">
      <textarea
        value={data.content || ""}
        onChange={(e) => update({ content: e.target.value })}
        rows={3}
        placeholder="Seu texto aqui..."
        className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50 resize-none"
      />
      <div className="flex gap-1.5">
        {alignOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => update({ align: opt.id })}
              className={`p-2 rounded-md border transition-colors cursor-pointer ${
                (data.align || "center") === opt.id
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              <Icon size={14} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
