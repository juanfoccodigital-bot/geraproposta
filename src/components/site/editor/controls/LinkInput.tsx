"use client";

import { useState } from "react";
import { ExternalLink, Hash } from "lucide-react";

interface LinkInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Available section anchors for internal links (e.g., ["#sobre", "#servicos"]) */
  sectionAnchors?: { value: string; label: string }[];
}

export default function LinkInput({ label, value, onChange, sectionAnchors }: LinkInputProps) {
  const isInternal = value.startsWith("#");
  const [mode, setMode] = useState<"external" | "internal">(isInternal ? "internal" : "external");

  return (
    <div>
      <label className="text-[10px] text-white/30 uppercase mb-1 block">{label}</label>

      {/* Mode toggle (only if anchors available) */}
      {sectionAnchors && sectionAnchors.length > 0 && (
        <div className="flex gap-1 mb-1.5">
          <button
            type="button"
            onClick={() => setMode("external")}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer"
            style={{
              background: mode === "external" ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)",
              color: mode === "external" ? "#F97316" : "rgba(255,255,255,0.4)",
            }}
          >
            <ExternalLink size={9} /> Externo
          </button>
          <button
            type="button"
            onClick={() => setMode("internal")}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer"
            style={{
              background: mode === "internal" ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)",
              color: mode === "internal" ? "#F97316" : "rgba(255,255,255,0.4)",
            }}
          >
            <Hash size={9} /> Secao
          </button>
        </div>
      )}

      {mode === "internal" && sectionAnchors && sectionAnchors.length > 0 ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50 appearance-none cursor-pointer"
        >
          <option value="">Selecione uma secao</option>
          {sectionAnchors.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://exemplo.com"
          className="w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      )}
    </div>
  );
}
