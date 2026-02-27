"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { BiolinkTheme, BiolinkEffects } from "@/types/biolink";
import { Sparkles } from "lucide-react";

const buttonStyles = [
  { id: "filled" as const, label: "Preenchido" },
  { id: "outline" as const, label: "Contorno" },
  { id: "ghost" as const, label: "Fantasma" },
  { id: "rounded" as const, label: "Arredondado" },
];

const bgTypes = [
  { id: "solid" as const, label: "Cor sólida" },
  { id: "gradient" as const, label: "Gradiente" },
];

const fontOptions = ["Inter", "Playfair Display", "Space Grotesk", "Montserrat", "Nunito", "Poppins", "Cormorant Garamond", "Open Sans", "Lora"];

const entranceOptions = [
  { id: "none" as const, label: "Nenhuma" },
  { id: "fade" as const, label: "Fade" },
  { id: "slide" as const, label: "Slide" },
  { id: "scale" as const, label: "Scale" },
];

const bgAnimOptions = [
  { id: "none" as const, label: "Nenhum" },
  { id: "aurora" as const, label: "Aurora" },
  { id: "particles" as const, label: "Partículas" },
  { id: "float" as const, label: "Flutuante" },
];

function EffectToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between py-1.5 cursor-pointer group">
      <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{label}</span>
      <div
        className="w-8 h-[18px] rounded-full transition-colors relative cursor-pointer"
        style={{ background: checked ? "#F97316" : "rgba(255,255,255,0.1)" }}
        onClick={() => onChange(!checked)}
      >
        <div
          className="absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow transition-transform"
          style={{ transform: checked ? "translateX(16px)" : "translateX(2px)" }}
        />
      </div>
    </label>
  );
}

export default function ThemeTab() {
  const { state, dispatch } = useBiolinkEditor();
  const theme = state.config.theme;
  const effects = theme.effects || {};

  function update(updates: Partial<BiolinkTheme>) {
    dispatch({ type: "UPDATE_THEME", payload: updates });
  }

  function updateEffects(updates: Partial<BiolinkEffects>) {
    update({ effects: { ...effects, ...updates } });
  }

  return (
    <div className="p-4 space-y-6">
      {/* Background */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Fundo</h3>
        <div className="flex gap-2 mb-3">
          {bgTypes.map((bt) => (
            <button
              key={bt.id}
              onClick={() => update({ backgroundType: bt.id })}
              className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                theme.backgroundType === bt.id
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {bt.label}
            </button>
          ))}
        </div>
        {theme.backgroundType === "solid" && (
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.background}
              onChange={(e) => update({ background: e.target.value, backgroundValue: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-white/10"
            />
            <input
              type="text"
              value={theme.background}
              onChange={(e) => update({ background: e.target.value, backgroundValue: e.target.value })}
              className="flex-1 px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
            />
          </div>
        )}
        {theme.backgroundType === "gradient" && (
          <div>
            <label className="text-xs text-white/40 mb-1 block">CSS Gradient</label>
            <input
              type="text"
              value={theme.backgroundValue}
              onChange={(e) => update({ backgroundValue: e.target.value })}
              placeholder="linear-gradient(135deg, #667eea, #764ba2)"
              className="w-full px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
            />
          </div>
        )}
      </div>

      {/* Text Color */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Cor do Texto</h3>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={theme.textColor}
            onChange={(e) => update({ textColor: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border border-white/10"
          />
          <input
            type="text"
            value={theme.textColor}
            onChange={(e) => update({ textColor: e.target.value })}
            className="flex-1 px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
      </div>

      {/* Button Style */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Estilo dos Botões</h3>
        <div className="grid grid-cols-2 gap-2">
          {buttonStyles.map((bs) => (
            <button
              key={bs.id}
              onClick={() => update({ buttonStyle: bs.id })}
              className={`py-2 text-xs rounded-lg border transition-colors ${
                theme.buttonStyle === bs.id
                  ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                  : "border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {bs.label}
            </button>
          ))}
        </div>
      </div>

      {/* Button Colors */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Cor dos Botões</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.buttonColor}
              onChange={(e) => update({ buttonColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-white/10"
            />
            <span className="text-xs text-white/40">Fundo</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.buttonTextColor}
              onChange={(e) => update({ buttonTextColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-white/10"
            />
            <span className="text-xs text-white/40">Texto</span>
          </div>
        </div>
      </div>

      {/* Font */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Fonte</h3>
        <select
          value={theme.font}
          onChange={(e) => update({ font: e.target.value })}
          className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
        >
          {fontOptions.map((f) => (
            <option key={f} value={f} className="bg-[#111] text-white">
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Premium Effects */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={12} className="text-[#F97316]" />
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Efeitos Premium</h3>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-1">
          {/* Entrance Animation */}
          <div className="mb-2">
            <span className="text-xs text-white/40 block mb-1.5">Animação de Entrada</span>
            <div className="grid grid-cols-4 gap-1.5">
              {entranceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateEffects({ entrance: opt.id })}
                  className={`py-1 text-[10px] rounded-md border transition-colors ${
                    (effects.entrance || "none") === opt.id
                      ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                      : "border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Background Animation */}
          <div className="mb-2">
            <span className="text-xs text-white/40 block mb-1.5">Fundo Animado</span>
            <div className="grid grid-cols-4 gap-1.5">
              {bgAnimOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateEffects({ animatedBg: opt.id })}
                  className={`py-1 text-[10px] rounded-md border transition-colors ${
                    (effects.animatedBg || "none") === opt.id
                      ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
                      : "border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Effects */}
          <EffectToggle
            label="Brilho nos botões"
            checked={!!effects.buttonGlow}
            onChange={(v) => updateEffects({ buttonGlow: v })}
          />
          <EffectToggle
            label="Shimmer nos botões"
            checked={!!effects.buttonShimmer}
            onChange={(v) => updateEffects({ buttonShimmer: v })}
          />
          <EffectToggle
            label="Nome em gradiente"
            checked={!!effects.gradientText}
            onChange={(v) => updateEffects({ gradientText: v })}
          />
          <EffectToggle
            label="Cards com glass"
            checked={!!effects.glassmorphism}
            onChange={(v) => updateEffects({ glassmorphism: v })}
          />

          {/* Gradient Colors (when gradientText is on) */}
          {effects.gradientText && (
            <div className="pt-2 mt-1 border-t border-white/5">
              <span className="text-xs text-white/40 block mb-1.5">Cores do Gradiente</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={effects.gradientColors?.[0] || theme.buttonColor}
                  onChange={(e) =>
                    updateEffects({ gradientColors: [e.target.value, effects.gradientColors?.[1] || theme.buttonColor] })
                  }
                  className="w-7 h-7 rounded cursor-pointer border border-white/10"
                />
                <span className="text-[10px] text-white/30">&rarr;</span>
                <input
                  type="color"
                  value={effects.gradientColors?.[1] || theme.buttonColor}
                  onChange={(e) =>
                    updateEffects({ gradientColors: [effects.gradientColors?.[0] || theme.buttonColor, e.target.value] })
                  }
                  className="w-7 h-7 rounded cursor-pointer border border-white/10"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
