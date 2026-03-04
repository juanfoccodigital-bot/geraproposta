"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { CountdownData } from "@/types/biolink";

export default function CountdownEditor({ blockId, data }: { blockId: string; data: CountdownData }) {
  const { dispatch } = useBiolinkEditor();

  function update(changes: Partial<CountdownData>) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload: changes });
  }

  // Convert ISO to datetime-local format
  const dateValue = data.targetDate
    ? new Date(data.targetDate).toISOString().slice(0, 16)
    : "";

  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Rótulo</label>
        <input
          type="text"
          value={data.label || ""}
          onChange={(e) => update({ label: e.target.value })}
          placeholder="Oferta termina em"
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Data e Hora Alvo</label>
        <input
          type="datetime-local"
          value={dateValue}
          onChange={(e) => update({ targetDate: new Date(e.target.value).toISOString() })}
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50 [color-scheme:dark]"
        />
      </div>
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Mensagem ao Encerrar</label>
        <input
          type="text"
          value={data.endMessage || ""}
          onChange={(e) => update({ endMessage: e.target.value })}
          placeholder="Oferta encerrada!"
          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
      <div>
        <span className="text-[10px] text-white/40 block mb-1.5">Estilo</span>
        <div className="flex gap-1.5">
          {(["cards", "inline", "minimal"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => update({ style: opt })}
              className={`flex-1 py-1.5 text-[10px] rounded-md border transition-colors cursor-pointer ${
                (data.style || "cards") === opt
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {opt === "cards" ? "Cards" : opt === "inline" ? "Inline" : "Minimal"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
