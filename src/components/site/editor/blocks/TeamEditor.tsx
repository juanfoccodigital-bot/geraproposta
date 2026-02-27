"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import type { SiteBlock, SiteTeamData, TeamMember } from "@/types/site";
import ArrayEditor from "@/components/site/editor/controls/ArrayEditor";
import SelectField from "@/components/site/editor/controls/SelectField";
import ImageUpload from "@/components/editor/controls/ImageUpload";

const INPUT_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50";
const TEXTAREA_CLASS =
  "w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50 resize-none";

const COLUMN_OPTIONS = [
  { value: "2", label: "2 Colunas" },
  { value: "3", label: "3 Colunas" },
  { value: "4", label: "4 Colunas" },
];

export default function TeamEditor({ block }: { block: SiteBlock }) {
  const { dispatch } = useSiteEditor();
  const data = block.data as unknown as SiteTeamData;

  function update(field: keyof SiteTeamData, value: unknown) {
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
          placeholder="Nossa equipe"
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
          placeholder="Conhaca nosso time..."
        />
      </div>

      {/* Columns */}
      <SelectField
        label="Colunas"
        value={String(data.columns || 3)}
        options={COLUMN_OPTIONS}
        onChange={(v) => update("columns", Number(v))}
      />

      {/* Members */}
      <ArrayEditor<TeamMember>
        label="Membros"
        items={data.members || []}
        onUpdate={(members) => update("members", members)}
        createEmpty={() => ({ name: "", role: "", image: "" })}
        maxItems={12}
        renderItem={(member, _index, updateMember) => (
          <>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Nome</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateMember({ ...member, name: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Nome do membro"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Cargo</label>
              <input
                type="text"
                value={member.role}
                onChange={(e) => updateMember({ ...member, role: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Ex: Designer, Desenvolvedor..."
              />
            </div>
            <div>
              <label className="text-[10px] text-white/30 uppercase mb-0.5 block">Foto</label>
              <ImageUpload
                value={member.image}
                onChange={(url) => updateMember({ ...member, image: url })}
                variant="dark"
              />
            </div>
          </>
        )}
      />
    </div>
  );
}
