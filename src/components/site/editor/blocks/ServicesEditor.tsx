"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteServicesData, ServiceItem } from "@/types/site";
import SelectField from "@/components/site/editor/controls/SelectField";
import ArrayEditor from "@/components/site/editor/controls/ArrayEditor";
import ImageUpload from "@/components/editor/controls/ImageUpload";

const inputClass =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";

const textareaClass =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50 resize-none";

interface ServicesEditorProps {
  block: SiteBlock;
}

export default function ServicesEditor({ block }: ServicesEditorProps) {
  const { dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteServicesData;

  function update(field: string, value: unknown) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId: block.id, payload: { [field]: value } });
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Titulo</label>
        <input
          type="text"
          value={data.title || ""}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Nossos Servicos"
          className={inputClass}
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Subtitulo</label>
        <textarea
          value={data.subtitle || ""}
          onChange={(e) => update("subtitle", e.target.value)}
          placeholder="Breve descricao dos servicos"
          rows={3}
          className={textareaClass}
        />
      </div>

      {/* Columns */}
      <SelectField
        label="Colunas"
        value={String(data.columns || 3)}
        options={[
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
        ]}
        onChange={(v) => update("columns", Number(v))}
      />

      {/* Style */}
      <SelectField
        label="Estilo"
        value={data.style || "card"}
        options={[
          { value: "card", label: "Card" },
          { value: "icon", label: "Icon" },
          { value: "image", label: "Image" },
        ]}
        onChange={(v) => update("style", v)}
      />

      {/* Items */}
      <ArrayEditor<ServiceItem>
        label="Servicos"
        items={data.items || []}
        onUpdate={(items) => update("items", items)}
        createEmpty={() => ({ icon: "", title: "", description: "", image: "" })}
        maxItems={12}
        renderItem={(item, _index, updateItem) => (
          <div className="space-y-1.5">
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateItem({ ...item, title: e.target.value })}
              placeholder="Titulo do servico"
              className={inputClass}
            />
            <textarea
              value={item.description}
              onChange={(e) => updateItem({ ...item, description: e.target.value })}
              placeholder="Descricao"
              rows={2}
              className={textareaClass}
            />
            <input
              type="text"
              value={item.icon}
              onChange={(e) => updateItem({ ...item, icon: e.target.value })}
              placeholder="Icone (nome lucide, ex: briefcase)"
              className={inputClass}
            />
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-1 block">Imagem</label>
              <ImageUpload
                value={item.image || ""}
                onChange={(url) => updateItem({ ...item, image: url })}
                variant="dark"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
