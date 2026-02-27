"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteFooterData, FooterColumn } from "@/types/site";
import ArrayEditor from "@/components/site/editor/controls/ArrayEditor";
import SelectField from "@/components/site/editor/controls/SelectField";
import { Plus, Trash2 } from "lucide-react";

const INPUT_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";

const SOCIAL_PLATFORM_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter/X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "whatsapp", label: "WhatsApp" },
];

function ColumnLinksEditor({
  links,
  onChange,
}: {
  links: { label: string; url: string }[];
  onChange: (links: { label: string; url: string }[]) => void;
}) {
  const updateLink = (index: number, field: "label" | "url", value: string) => {
    const next = [...links];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  const addLink = () => {
    onChange([...links, { label: "", url: "" }]);
  };

  return (
    <div>
      <label className="text-[10px] text-white/30 uppercase mb-1 block">Links</label>
      <div className="space-y-1.5">
        {links.map((link, i) => (
          <div key={i} className="flex items-start gap-1">
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
                className={INPUT_CLASS}
                placeholder="Texto do link"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateLink(i, "url", e.target.value)}
                className={INPUT_CLASS}
                placeholder="https://"
              />
            </div>
            <button
              type="button"
              onClick={() => removeLink(i)}
              className="flex-shrink-0 p-1 mt-1 rounded hover:bg-red-500/20 transition-colors cursor-pointer"
              title="Remover"
            >
              <Trash2 size={11} className="text-red-400/60" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addLink}
        className="mt-1.5 w-full flex items-center justify-center gap-1 py-1 rounded border border-dashed border-white/10 text-[10px] text-white/40 hover:text-white/60 hover:border-white/20 transition-colors cursor-pointer"
      >
        <Plus size={10} /> Adicionar link
      </button>
    </div>
  );
}

export default function FooterEditor({ block }: { block: SiteBlock }) {
  const { dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteFooterData;

  function update(field: keyof SiteFooterData, value: unknown) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId: block.id, payload: { [field]: value } });
  }

  return (
    <div className="space-y-3">
      {/* Copyright */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Copyright</label>
        <input
          type="text"
          value={data.copyright || ""}
          onChange={(e) => update("copyright", e.target.value)}
          className={INPUT_CLASS}
          placeholder="© 2026 Sua Empresa. Todos os direitos reservados."
        />
      </div>

      {/* Columns */}
      <ArrayEditor<FooterColumn>
        label="Colunas"
        items={data.columns || []}
        onUpdate={(columns) => update("columns", columns)}
        createEmpty={() => ({ title: "", links: [] })}
        maxItems={4}
        renderItem={(column, _index, updateColumn) => (
          <>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Titulo da coluna</label>
              <input
                type="text"
                value={column.title}
                onChange={(e) => updateColumn({ ...column, title: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Ex: Empresa, Servicos..."
              />
            </div>
            <ColumnLinksEditor
              links={column.links || []}
              onChange={(links) => updateColumn({ ...column, links })}
            />
          </>
        )}
      />

      {/* Social Links */}
      <ArrayEditor<{ platform: string; url: string }>
        label="Redes sociais"
        items={data.socialLinks || []}
        onUpdate={(socialLinks) => update("socialLinks", socialLinks)}
        createEmpty={() => ({ platform: "instagram", url: "" })}
        maxItems={7}
        renderItem={(social, _index, updateSocial) => (
          <>
            <SelectField
              label="Plataforma"
              value={social.platform}
              options={SOCIAL_PLATFORM_OPTIONS}
              onChange={(v) => updateSocial({ ...social, platform: v })}
            />
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">URL</label>
              <input
                type="text"
                value={social.url}
                onChange={(e) => updateSocial({ ...social, url: e.target.value })}
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
