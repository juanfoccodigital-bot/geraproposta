"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteMapData } from "@/types/site";
import SelectField from "@/components/site/editor/controls/SelectField";

const INPUT_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";

const HEIGHT_OPTIONS = [
  { value: "sm", label: "Pequeno" },
  { value: "md", label: "Medio" },
  { value: "lg", label: "Grande" },
];

export default function MapEditor({ block }: { block: SiteBlock }) {
  const { dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteMapData;

  function update(field: keyof SiteMapData, value: unknown) {
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
          placeholder="Nossa localizacao"
        />
      </div>

      {/* Address */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Endereco</label>
        <input
          type="text"
          value={data.address || ""}
          onChange={(e) => update("address", e.target.value)}
          className={INPUT_CLASS}
          placeholder="Rua exemplo, 123 - Cidade"
        />
      </div>

      {/* Embed URL */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">URL do Mapa</label>
        <input
          type="text"
          value={data.embedUrl || ""}
          onChange={(e) => update("embedUrl", e.target.value)}
          className={INPUT_CLASS}
          placeholder="Cole a URL do Google Maps embed"
        />
      </div>

      {/* Height */}
      <SelectField
        label="Altura"
        value={data.height || "md"}
        options={HEIGHT_OPTIONS}
        onChange={(v) => update("height", v)}
      />
    </div>
  );
}
