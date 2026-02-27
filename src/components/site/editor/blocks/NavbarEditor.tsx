"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteNavbarData, NavLink } from "@/types/site";
import SelectField from "@/components/site/editor/controls/SelectField";
import LinkInput from "@/components/site/editor/controls/LinkInput";
import ArrayEditor from "@/components/site/editor/controls/ArrayEditor";
import ToggleField from "@/components/site/editor/controls/ToggleField";
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

interface NavbarEditorProps {
  block: SiteBlock;
}

export default function NavbarEditor({ block }: NavbarEditorProps) {
  const { state, dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteNavbarData;
  const sectionAnchors = getSectionAnchors(state.config.blocks);

  function update(field: string, value: unknown) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId: block.id, payload: { [field]: value } });
  }

  return (
    <div className="space-y-4">
      {/* Mostrar cabecalho */}
      <ToggleField
        label="Mostrar cabecalho"
        value={data.showHeader ?? true}
        onChange={(v) => update("showHeader", v)}
      />

      {/* Logo Display */}
      <SelectField
        label="Logo"
        value={data.logoDisplay || "image"}
        options={[
          { value: "image", label: "Imagem" },
          { value: "text", label: "Texto" },
          { value: "both", label: "Ambos" },
        ]}
        onChange={(v) => update("logoDisplay", v)}
      />

      {/* Logo Image (conditional) */}
      {(data.logoDisplay === "image" || data.logoDisplay === "both") && (
        <div>
          <label className="text-[10px] text-white/30 uppercase mb-1 block">Imagem do Logo</label>
          <ImageUpload
            value={data.logo || ""}
            onChange={(url) => update("logo", url)}
            variant="dark"
          />
        </div>
      )}

      {/* Logo Text (conditional) */}
      {(data.logoDisplay === "text" || data.logoDisplay === "both") && (
        <div>
          <label className="text-[10px] text-white/30 uppercase mb-1 block">Texto do Logo</label>
          <input
            type="text"
            value={data.logoText || ""}
            onChange={(e) => update("logoText", e.target.value)}
            placeholder="Nome da empresa"
            className={inputClass}
          />
        </div>
      )}

      {/* Style */}
      <SelectField
        label="Estilo"
        value={data.style || "solid"}
        options={[
          { value: "solid", label: "Solido" },
          { value: "glass", label: "Vidro" },
          { value: "transparent", label: "Transparente" },
        ]}
        onChange={(v) => update("style", v)}
      />

      {/* Align */}
      <SelectField
        label="Alinhamento"
        value={data.align || "left"}
        options={[
          { value: "left", label: "Esquerda" },
          { value: "center", label: "Centralizado" },
          { value: "spread", label: "Distribuido" },
        ]}
        onChange={(v) => update("align", v)}
      />

      {/* CTA */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Texto do CTA</label>
        <input
          type="text"
          value={data.ctaText || ""}
          onChange={(e) => update("ctaText", e.target.value)}
          placeholder="Ex: Fale Conosco"
          className={inputClass}
        />
      </div>

      <LinkInput
        label="Link do CTA"
        value={data.ctaUrl || ""}
        onChange={(v) => update("ctaUrl", v)}
        sectionAnchors={sectionAnchors}
      />

      {/* Links */}
      <ArrayEditor<NavLink>
        label="Links de Navegacao"
        items={data.links || []}
        onUpdate={(items) => update("links", items)}
        createEmpty={() => ({ label: "", href: "" })}
        maxItems={8}
        renderItem={(item, _index, updateItem) => (
          <div className="space-y-1.5">
            <input
              type="text"
              value={item.label}
              onChange={(e) => updateItem({ ...item, label: e.target.value })}
              placeholder="Label"
              className={inputClass}
            />
            <input
              type="text"
              value={item.href}
              onChange={(e) => updateItem({ ...item, href: e.target.value })}
              placeholder="Link (ex: #sobre)"
              className={inputClass}
            />
          </div>
        )}
      />
    </div>
  );
}
