"use client";

import { useEditor } from "@/contexts/EditorContext";
import { ThemeColors } from "@/types/proposal";
import { fontOptions, colorPresets } from "@/lib/fonts";
import { loadGoogleFont } from "@/lib/fonts";
import { Palette, Type, Sparkles } from "lucide-react";

/* ============================================
   ABA: TEMA
   Color pickers, presets e seletor de fontes
   ============================================ */

const colorFields: { key: keyof ThemeColors; label: string }[] = [
  { key: "gold", label: "Cor Principal" },
  { key: "goldLight", label: "Principal Clara" },
  { key: "goldDark", label: "Principal Escura" },
  { key: "background", label: "Fundo" },
  { key: "foreground", label: "Texto" },
  { key: "beige", label: "Bege" },
  { key: "nude", label: "Nude" },
  { key: "cream", label: "Creme" },
];

export default function ThemeTab() {
  const { state, dispatch } = useEditor();
  const { theme } = state.config;

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    dispatch({ type: "UPDATE_COLORS", payload: { [key]: value } });
  };

  const handleFontChange = (field: "heading" | "body", value: string) => {
    loadGoogleFont(value);
    dispatch({ type: "UPDATE_FONTS", payload: { [field]: value } });
  };

  const applyPreset = (preset: (typeof colorPresets)[0]) => {
    dispatch({ type: "UPDATE_COLORS", payload: preset.colors });
  };

  return (
    <div className="p-4 space-y-6">
      {/* ── Presets de Cor ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-white/40" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            Presets
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 hover:border-white/20 transition-all text-left cursor-pointer bg-white/5"
            >
              <div className="flex gap-0.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: preset.colors.gold }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: preset.colors.foreground }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: preset.colors.background }}
                />
              </div>
              <span className="text-[11px] text-white/60 font-medium truncate">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Cores ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-3.5 h-3.5 text-white/40" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            Cores
          </span>
        </div>
        <div className="space-y-2">
          {colorFields.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between p-2.5 rounded-lg border border-white/10"
            >
              <span className="text-xs text-white/60">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/30 font-mono uppercase">
                  {theme.colors[key]}
                </span>
                <div className="relative">
                  <div
                    className="w-7 h-7 rounded-lg border border-white/10 cursor-pointer"
                    style={{ background: theme.colors[key] }}
                  />
                  <input
                    type="color"
                    value={theme.colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tipografia ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-3.5 h-3.5 text-white/40" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            Tipografia
          </span>
        </div>
        <div className="space-y-3">
          {/* Fonte dos títulos */}
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">
              Títulos
            </label>
            <select
              value={theme.fonts.heading}
              onChange={(e) => handleFontChange("heading", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-white/10 text-sm text-white bg-white/5 focus:outline-none focus:border-[#F97316]/50"
              style={{ fontFamily: `"${theme.fonts.heading}", serif` }}
            >
              {fontOptions
                .filter((f) => f.category === "serif")
                .map((f) => (
                  <option key={f.value} value={f.value} className="bg-[#111]">
                    {f.label}
                  </option>
                ))}
              {fontOptions
                .filter((f) => f.category === "sans-serif")
                .map((f) => (
                  <option key={f.value} value={f.value} className="bg-[#111]">
                    {f.label}
                  </option>
                ))}
            </select>
          </div>

          {/* Fonte do corpo */}
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">
              Corpo de texto
            </label>
            <select
              value={theme.fonts.body}
              onChange={(e) => handleFontChange("body", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-white/10 text-sm text-white bg-white/5 focus:outline-none focus:border-[#F97316]/50"
              style={{ fontFamily: `"${theme.fonts.body}", sans-serif` }}
            >
              {fontOptions
                .filter((f) => f.category === "sans-serif")
                .map((f) => (
                  <option key={f.value} value={f.value} className="bg-[#111]">
                    {f.label}
                  </option>
                ))}
              {fontOptions
                .filter((f) => f.category === "serif")
                .map((f) => (
                  <option key={f.value} value={f.value} className="bg-[#111]">
                    {f.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
