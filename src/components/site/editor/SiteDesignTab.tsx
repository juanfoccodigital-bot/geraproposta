"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import { colorPresets } from "@/lib/fonts";
import { Sparkles } from "lucide-react";

const fontOptions = ["Inter", "Playfair Display", "Space Grotesk", "Montserrat", "Nunito", "Poppins", "Cormorant Garamond", "Open Sans", "Lora"];

const colorFields = [
  { key: "gold", label: "Cor Principal" },
  { key: "background", label: "Fundo" },
  { key: "foreground", label: "Texto" },
  { key: "beige", label: "Fundo Seções" },
] as const;

export default function SiteDesignTab() {
  const { state, dispatch } = useSiteEditor();
  const colors = state.config.theme.colors;
  const fonts = state.config.theme.fonts;

  return (
    <div className="p-4 space-y-6">
      {/* Presets */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-white/40" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Presets</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => dispatch({ type: "UPDATE_COLORS", payload: preset.colors })}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 hover:border-white/20 transition-all text-left cursor-pointer bg-white/5"
            >
              <div className="flex gap-0.5">
                <div className="w-3 h-3 rounded-full" style={{ background: preset.colors.gold }} />
                <div className="w-3 h-3 rounded-full" style={{ background: preset.colors.foreground }} />
                <div className="w-3 h-3 rounded-full" style={{ background: preset.colors.background }} />
              </div>
              <span className="text-[11px] text-white/60 font-medium truncate">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Cores</h3>
        <div className="space-y-3">
          {colorFields.map((cf) => (
            <div key={cf.key} className="flex items-center gap-3">
              <input
                type="color"
                value={(colors as unknown as Record<string, string>)[cf.key] || "#000000"}
                onChange={(e) => dispatch({ type: "UPDATE_COLORS", payload: { [cf.key]: e.target.value } })}
                className="w-8 h-8 rounded cursor-pointer border border-white/10"
              />
              <div className="flex-1">
                <span className="text-xs text-white/60">{cf.label}</span>
                <input
                  type="text"
                  value={(colors as unknown as Record<string, string>)[cf.key] || ""}
                  onChange={(e) => dispatch({ type: "UPDATE_COLORS", payload: { [cf.key]: e.target.value } })}
                  className="w-full px-2 py-1 rounded text-xs bg-white/5 border border-white/10 text-white/40 focus:outline-none focus:border-[#F97316]/50 mt-0.5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Fontes</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/40 mb-1 block">Títulos</label>
            <select
              value={fonts.heading}
              onChange={(e) => dispatch({ type: "UPDATE_FONTS", payload: { heading: e.target.value } })}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
            >
              {fontOptions.map((f) => <option key={f} value={f} className="bg-[#111]">{f}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1 block">Corpo</label>
            <select
              value={fonts.body}
              onChange={(e) => dispatch({ type: "UPDATE_FONTS", payload: { body: e.target.value } })}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
            >
              {fontOptions.map((f) => <option key={f} value={f} className="bg-[#111]">{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">SEO</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/40 mb-1 block">Título da Página</label>
            <input
              type="text"
              value={state.config.meta.title}
              onChange={(e) => dispatch({ type: "UPDATE_SITE_META", payload: { title: e.target.value } })}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1 block">Descrição</label>
            <textarea
              value={state.config.meta.description}
              onChange={(e) => dispatch({ type: "UPDATE_SITE_META", payload: { description: e.target.value } })}
              rows={2}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
