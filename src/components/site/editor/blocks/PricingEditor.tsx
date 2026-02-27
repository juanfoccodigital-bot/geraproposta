"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock } from "@/types/site";
import type { PricingTableData, PricingPlan } from "@/types/proposal";
import ArrayEditor from "@/components/site/editor/controls/ArrayEditor";
import ToggleField from "@/components/site/editor/controls/ToggleField";
import LinkInput from "@/components/site/editor/controls/LinkInput";
import { Plus, Trash2 } from "lucide-react";

const INPUT_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";
const TEXTAREA_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50 resize-none";

function FeaturesEditor({
  features,
  onChange,
}: {
  features: string[];
  onChange: (features: string[]) => void;
}) {
  const updateFeature = (index: number, value: string) => {
    const next = [...features];
    next[index] = value;
    onChange(next);
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    onChange([...features, ""]);
  };

  return (
    <div>
      <label className="text-[10px] text-white/30 uppercase mb-1 block">Features</label>
      <div className="space-y-1">
        {features.map((feat, i) => (
          <div key={i} className="flex items-center gap-1">
            <input
              type="text"
              value={feat}
              onChange={(e) => updateFeature(i, e.target.value)}
              className={INPUT_CLASS}
              placeholder="Ex: Acesso ilimitado"
            />
            <button
              type="button"
              onClick={() => removeFeature(i)}
              className="flex-shrink-0 p-1 rounded hover:bg-red-500/20 transition-colors cursor-pointer"
              title="Remover"
            >
              <Trash2 size={11} className="text-red-400/60" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addFeature}
        className="mt-1.5 w-full flex items-center justify-center gap-1 py-1 rounded border border-dashed border-white/10 text-[10px] text-white/40 hover:text-white/60 hover:border-white/20 transition-colors cursor-pointer"
      >
        <Plus size={10} /> Adicionar feature
      </button>
    </div>
  );
}

export default function PricingEditor({ block }: { block: SiteBlock }) {
  const { dispatch } = useSiteEditor();
  const data = block.data as unknown as PricingTableData;

  function update(field: keyof PricingTableData, value: unknown) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId: block.id, payload: { [field]: value } });
  }

  function updatePlan(index: number, updated: PricingPlan) {
    const next = [...(data.plans || [])];
    next[index] = updated;
    update("plans", next);
  }

  return (
    <div className="space-y-3">
      {/* Section Label */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Label da secao</label>
        <input
          type="text"
          value={data.sectionLabel || ""}
          onChange={(e) => update("sectionLabel", e.target.value)}
          className={INPUT_CLASS}
          placeholder="Planos"
        />
      </div>

      {/* Title */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Titulo</label>
        <input
          type="text"
          value={data.title || ""}
          onChange={(e) => update("title", e.target.value)}
          className={INPUT_CLASS}
          placeholder="Nossos planos"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Subtitulo</label>
        <textarea
          value={data.subtitle || ""}
          onChange={(e) => update("subtitle", e.target.value)}
          rows={3}
          className={TEXTAREA_CLASS}
          placeholder="Escolha o plano ideal..."
        />
      </div>

      {/* Plans */}
      <ArrayEditor<PricingPlan>
        label="Planos"
        items={data.plans || []}
        onUpdate={(plans) => update("plans", plans)}
        createEmpty={() => ({
          name: "",
          badge: "",
          highlighted: false,
          price: "",
          currency: "R$",
          period: "/mes",
          description: "",
          features: [],
          ctaLabel: "Contratar",
          ctaUrl: "",
        })}
        maxItems={6}
        renderItem={(plan, index, updateItem) => (
          <>
            {/* Name */}
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Nome</label>
              <input
                type="text"
                value={plan.name}
                onChange={(e) => updateItem({ ...plan, name: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Ex: Basico, Pro..."
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Preco</label>
              <input
                type="text"
                value={plan.price}
                onChange={(e) => updateItem({ ...plan, price: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Ex: R$ 99"
              />
            </div>

            {/* Period */}
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Periodo</label>
              <input
                type="text"
                value={plan.period}
                onChange={(e) => updateItem({ ...plan, period: e.target.value })}
                className={INPUT_CLASS}
                placeholder="/mes"
              />
            </div>

            {/* Highlighted */}
            <ToggleField
              label="Destaque"
              value={plan.highlighted}
              onChange={(v) => updateItem({ ...plan, highlighted: v })}
            />

            {/* Button Label */}
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Texto do botao</label>
              <input
                type="text"
                value={plan.ctaLabel}
                onChange={(e) => updateItem({ ...plan, ctaLabel: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Contratar"
              />
            </div>

            {/* Button URL */}
            <LinkInput
              label="Link do botao"
              value={plan.ctaUrl}
              onChange={(v) => updateItem({ ...plan, ctaUrl: v })}
            />

            {/* Features */}
            <FeaturesEditor
              features={plan.features || []}
              onChange={(features) => {
                const next = [...(data.plans || [])];
                next[index] = { ...plan, features };
                update("plans", next);
              }}
            />
          </>
        )}
      />
    </div>
  );
}
