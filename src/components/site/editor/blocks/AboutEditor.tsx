"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteAboutData } from "@/types/site";
import SelectField from "@/components/site/editor/controls/SelectField";
import LinkInput from "@/components/site/editor/controls/LinkInput";
import ImageUpload from "@/components/editor/controls/ImageUpload";

function getSectionAnchors(blocks: SiteBlock[]): { value: string; label: string }[] {
  const map: Record<string, string> = {
    "site-hero": "Hero",
    "site-about": "Sobre",
    "site-services": "Serviços",
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

const inputClass =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";

const textareaClass =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50 resize-none";

interface AboutEditorProps {
  block: SiteBlock;
}

export default function AboutEditor({ block }: AboutEditorProps) {
  const { state, dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteAboutData;
  const sectionAnchors = getSectionAnchors(state.config.blocks);

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
          placeholder="Sobre nos"
          className={inputClass}
        />
      </div>

      {/* Body */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Texto</label>
        <textarea
          value={data.body || ""}
          onChange={(e) => update("body", e.target.value)}
          placeholder="Descreva sua empresa ou servico..."
          rows={3}
          className={textareaClass}
        />
      </div>

      {/* Image */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Imagem</label>
        <ImageUpload
          value={data.image || ""}
          onChange={(url) => update("image", url)}
          variant="dark"
        />
      </div>

      {/* Image Position */}
      <SelectField
        label="Posicao da Imagem"
        value={data.imagePosition || "right"}
        options={[
          { value: "left", label: "Esquerda" },
          { value: "right", label: "Direita" },
        ]}
        onChange={(v) => update("imagePosition", v)}
      />

      {/* CTA Text */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Texto do CTA</label>
        <input
          type="text"
          value={data.ctaText || ""}
          onChange={(e) => update("ctaText", e.target.value)}
          placeholder="Ex: Saiba Mais"
          className={inputClass}
        />
      </div>

      {/* CTA URL */}
      <LinkInput
        label="Link do CTA"
        value={data.ctaUrl || ""}
        onChange={(v) => update("ctaUrl", v)}
        sectionAnchors={sectionAnchors}
      />
    </div>
  );
}
