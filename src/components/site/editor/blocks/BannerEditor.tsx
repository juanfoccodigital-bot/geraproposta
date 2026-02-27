"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteBannerData } from "@/types/site";
import ImageUpload from "@/components/editor/controls/ImageUpload";
import SliderField from "@/components/site/editor/controls/SliderField";
import SelectField from "@/components/site/editor/controls/SelectField";
import LinkInput from "@/components/site/editor/controls/LinkInput";

const INPUT_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";
const TEXTAREA_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50 resize-none";

const ALIGN_OPTIONS = [
  { value: "left", label: "Esquerda" },
  { value: "center", label: "Centro" },
  { value: "right", label: "Direita" },
];

function getSectionAnchors(blocks: SiteBlock[]): { value: string; label: string }[] {
  const map: Record<string, string> = {
    "site-hero": "Hero",
    "site-about": "Sobre",
    "site-services": "Servicos",
    "site-contact": "Contato",
    "site-faq": "FAQ",
    "site-team": "Equipe",
    "site-banner": "Banner",
  };
  return blocks
    .filter((b) => b.visible && map[b.type])
    .map((b) => {
      const idMap: Record<string, string> = {
        "site-hero": "#hero",
        "site-about": "#sobre",
        "site-services": "#servicos",
        "site-contact": "#contato",
        "site-faq": "#faq",
        "site-team": "#equipe",
        "site-banner": "#banner",
      };
      return { value: idMap[b.type] || `#${b.id}`, label: map[b.type] };
    });
}

export default function BannerEditor({ block }: { block: SiteBlock }) {
  const { state, dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteBannerData;
  const sectionAnchors = getSectionAnchors(state.config.blocks);

  function update(field: keyof SiteBannerData, value: unknown) {
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
          placeholder="Titulo do banner"
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
          placeholder="Descricao do banner..."
        />
      </div>

      {/* Background Image */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Imagem de fundo</label>
        <ImageUpload
          value={data.backgroundImage || ""}
          onChange={(url) => update("backgroundImage", url)}
          variant="dark"
        />
      </div>

      {/* Overlay */}
      <SliderField
        label="Overlay"
        value={data.overlay ?? 50}
        min={0}
        max={100}
        step={5}
        suffix="%"
        onChange={(v) => update("overlay", v)}
      />

      {/* Align */}
      <SelectField
        label="Alinhamento"
        value={data.align || "center"}
        options={ALIGN_OPTIONS}
        onChange={(v) => update("align", v)}
      />

      {/* CTA Text */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Texto do botao</label>
        <input
          type="text"
          value={data.ctaText || ""}
          onChange={(e) => update("ctaText", e.target.value)}
          className={INPUT_CLASS}
          placeholder="Saiba mais"
        />
      </div>

      {/* CTA URL */}
      <LinkInput
        label="Link do botao"
        value={data.ctaUrl || ""}
        onChange={(v) => update("ctaUrl", v)}
        sectionAnchors={sectionAnchors}
      />
    </div>
  );
}
