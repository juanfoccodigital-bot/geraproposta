"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteFaqData } from "@/types/site";
import ArrayEditor from "@/components/site/editor/controls/ArrayEditor";

const INPUT_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";
const TEXTAREA_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50 resize-none";

export default function FaqEditor({ block }: { block: SiteBlock }) {
  const { dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteFaqData;

  function update(field: keyof SiteFaqData, value: unknown) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId: block.id, payload: { [field]: value } });
  }

  return (
    <div className="space-y-3">
      {/* Title */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Titulo</label>
        <input
          type="text"
          value={data.title || ""}
          onChange={(e) => update("title", e.target.value)}
          className={INPUT_CLASS}
          placeholder="Perguntas frequentes"
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
          placeholder="Tire suas duvidas..."
        />
      </div>

      {/* FAQ Items */}
      <ArrayEditor<{ question: string; answer: string }>
        label="Perguntas"
        items={data.items || []}
        onUpdate={(items) => update("items", items)}
        createEmpty={() => ({ question: "", answer: "" })}
        maxItems={20}
        renderItem={(item, _index, updateItem) => (
          <>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Pergunta</label>
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateItem({ ...item, question: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Ex: Qual o horario de funcionamento?"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Resposta</label>
              <textarea
                value={item.answer}
                onChange={(e) => updateItem({ ...item, answer: e.target.value })}
                rows={2}
                className={TEXTAREA_CLASS}
                placeholder="Resposta..."
              />
            </div>
          </>
        )}
      />
    </div>
  );
}
