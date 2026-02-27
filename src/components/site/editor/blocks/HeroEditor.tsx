"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteHeroData } from "@/types/site";
import SelectField from "@/components/site/editor/controls/SelectField";
import LinkInput from "@/components/site/editor/controls/LinkInput";
import SliderField from "@/components/site/editor/controls/SliderField";
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

interface HeroEditorProps {
  block: SiteBlock;
}

export default function HeroEditor({ block }: HeroEditorProps) {
  const { state, dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteHeroData;
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
          placeholder="Titulo principal"
          className={inputClass}
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Subtitulo</label>
        <textarea
          value={data.subtitle || ""}
          onChange={(e) => update("subtitle", e.target.value)}
          placeholder="Descricao curta"
          rows={3}
          className={textareaClass}
        />
      </div>

      {/* Height */}
      <SelectField
        label="Altura"
        value={data.height || "full"}
        options={[
          { value: "full", label: "Full" },
          { value: "large", label: "Large" },
          { value: "medium", label: "Medium" },
        ]}
        onChange={(v) => update("height", v)}
      />

      {/* Align */}
      <SelectField
        label="Alinhamento"
        value={data.align || "center"}
        options={[
          { value: "left", label: "Esquerda" },
          { value: "center", label: "Centro" },
          { value: "right", label: "Direita" },
        ]}
        onChange={(v) => update("align", v)}
      />

      {/* Background Image */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Imagem de Fundo</label>
        <ImageUpload
          value={data.backgroundImage || ""}
          onChange={(url) => update("backgroundImage", url)}
          variant="dark"
        />
      </div>

      {/* Background Overlay */}
      <SliderField
        label="Overlay do Fundo"
        value={data.backgroundOverlay ?? 50}
        min={0}
        max={100}
        step={5}
        suffix="%"
        onChange={(v) => update("backgroundOverlay", v)}
      />

      {/* CTA Primario */}
      <div className="border border-white/5 rounded-lg p-3 space-y-2">
        <label className="text-[10px] text-white/30 uppercase block">CTA Primario</label>
        <div>
          <label className="text-[10px] text-white/30 uppercase mb-1 block">Texto</label>
          <input
            type="text"
            value={data.ctaPrimary?.text || ""}
            onChange={(e) =>
              update("ctaPrimary", { ...data.ctaPrimary, text: e.target.value })
            }
            placeholder="Ex: Saiba Mais"
            className={inputClass}
          />
        </div>
        <LinkInput
          label="Link"
          value={data.ctaPrimary?.url || ""}
          onChange={(v) =>
            update("ctaPrimary", { ...data.ctaPrimary, url: v })
          }
          sectionAnchors={sectionAnchors}
        />
      </div>

      {/* CTA Secundario */}
      <div className="border border-white/5 rounded-lg p-3 space-y-2">
        <label className="text-[10px] text-white/30 uppercase block">CTA Secundario</label>
        <div>
          <label className="text-[10px] text-white/30 uppercase mb-1 block">Texto</label>
          <input
            type="text"
            value={data.ctaSecondary?.text || ""}
            onChange={(e) =>
              update("ctaSecondary", { ...data.ctaSecondary, text: e.target.value })
            }
            placeholder="Ex: Contato"
            className={inputClass}
          />
        </div>
        <LinkInput
          label="Link"
          value={data.ctaSecondary?.url || ""}
          onChange={(v) =>
            update("ctaSecondary", { ...data.ctaSecondary, url: v })
          }
          sectionAnchors={sectionAnchors}
        />
      </div>
    </div>
  );
}
