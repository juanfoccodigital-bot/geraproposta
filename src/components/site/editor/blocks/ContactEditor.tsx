"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteContactData } from "@/types/site";
import SelectField from "@/components/site/editor/controls/SelectField";

const inputClass =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";

const textareaClass =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50 resize-none";

interface ContactEditorProps {
  block: SiteBlock;
}

export default function ContactEditor({ block }: ContactEditorProps) {
  const { dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteContactData;

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
          placeholder="Entre em Contato"
          className={inputClass}
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="text-[10px] text-white/30 uppercase mb-1 block">Subtitulo</label>
        <textarea
          value={data.subtitle || ""}
          onChange={(e) => update("subtitle", e.target.value)}
          placeholder="Mensagem de apoio ao contato"
          rows={3}
          className={textareaClass}
        />
      </div>

      {/* Mode */}
      <SelectField
        label="Modo de Contato"
        value={data.mode || "form"}
        options={[
          { value: "form", label: "Formulario" },
          { value: "whatsapp", label: "WhatsApp" },
          { value: "both", label: "Ambos" },
        ]}
        onChange={(v) => update("mode", v)}
      />

      {/* WhatsApp fields (show when mode is whatsapp or both) */}
      {(data.mode === "whatsapp" || data.mode === "both") && (
        <>
          <div>
            <label className="text-[10px] text-white/30 uppercase mb-1 block">Numero WhatsApp</label>
            <input
              type="text"
              value={data.whatsappNumber || ""}
              onChange={(e) => update("whatsappNumber", e.target.value)}
              placeholder="5511999999999"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[10px] text-white/30 uppercase mb-1 block">Mensagem WhatsApp</label>
            <textarea
              value={data.whatsappMessage || ""}
              onChange={(e) => update("whatsappMessage", e.target.value)}
              placeholder="Ola! Gostaria de mais informacoes..."
              rows={3}
              className={textareaClass}
            />
          </div>
        </>
      )}

      {/* Email field (show when mode is form or both) */}
      {(data.mode === "form" || data.mode === "both") && (
        <div>
          <label className="text-[10px] text-white/30 uppercase mb-1 block">E-mail</label>
          <input
            type="text"
            value={data.email || ""}
            onChange={(e) => update("email", e.target.value)}
            placeholder="contato@exemplo.com"
            className={inputClass}
          />
        </div>
      )}
    </div>
  );
}
