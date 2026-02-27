"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteLogosData } from "@/types/site";
import ArrayEditor from "@/components/site/editor/controls/ArrayEditor";
import ImageUpload from "@/components/editor/controls/ImageUpload";

const INPUT_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";

export default function LogosEditor({ block }: { block: SiteBlock }) {
  const { dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteLogosData;

  function update(field: keyof SiteLogosData, value: unknown) {
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
          placeholder="Nossos parceiros"
        />
      </div>

      {/* Logo Items */}
      <ArrayEditor<{ image: string; alt: string; url?: string }>
        label="Logos"
        items={data.items || []}
        onUpdate={(items) => update("items", items)}
        createEmpty={() => ({ image: "", alt: "", url: "" })}
        maxItems={20}
        renderItem={(item, _index, updateItem) => (
          <>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Imagem</label>
              <ImageUpload
                value={item.image}
                onChange={(url) => updateItem({ ...item, image: url })}
                variant="dark"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Texto alternativo</label>
              <input
                type="text"
                value={item.alt}
                onChange={(e) => updateItem({ ...item, alt: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Nome do parceiro"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Link (opcional)</label>
              <input
                type="text"
                value={item.url || ""}
                onChange={(e) => updateItem({ ...item, url: e.target.value })}
                className={INPUT_CLASS}
                placeholder="https://"
              />
            </div>
          </>
        )}
      />
    </div>
  );
}
