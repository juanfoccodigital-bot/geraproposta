"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { AvatarData, LinksData, LinkItem } from "@/types/biolink";
import { Plus, Trash2, GripVertical } from "lucide-react";
import ImageUpload from "@/components/editor/controls/ImageUpload";

export default function ProfileTab() {
  const { state, dispatch } = useBiolinkEditor();
  const blocks = state.config.blocks;
  const avatarBlock = blocks.find((b) => b.type === "avatar");
  const linksBlock = blocks.find((b) => b.type === "links");
  const avatarData = (avatarBlock?.data || {}) as AvatarData;
  const linksData = (linksBlock?.data || { items: [] }) as LinksData;

  function updateAvatar(updates: Partial<AvatarData>) {
    if (avatarBlock) {
      dispatch({ type: "UPDATE_BLOCK_DATA", blockId: avatarBlock.id, payload: updates });
    }
  }

  function updateLinks(items: LinkItem[]) {
    if (linksBlock) {
      dispatch({ type: "UPDATE_BLOCK_DATA", blockId: linksBlock.id, payload: { items } });
    }
  }

  function addLink() {
    const newItem: LinkItem = {
      id: `lnk-${Date.now().toString(36)}`,
      title: "Novo Link",
      url: "https://",
      icon: "Globe",
      enabled: true,
    };
    updateLinks([...linksData.items, newItem]);
  }

  function updateLink(id: string, updates: Partial<LinkItem>) {
    updateLinks(linksData.items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }

  function removeLink(id: string) {
    updateLinks(linksData.items.filter((item) => item.id !== id));
  }

  return (
    <div className="p-4 space-y-6">
      {/* Avatar Section */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Perfil</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/40 mb-1 block">Nome</label>
            <input
              type="text"
              value={avatarData.name || ""}
              onChange={(e) => updateAvatar({ name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1 block">Bio</label>
            <textarea
              value={avatarData.bio || ""}
              onChange={(e) => updateAvatar({ bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50 resize-none"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1 block">Foto de Perfil</label>
            <ImageUpload
              value={avatarData.image || ""}
              onChange={(url) => updateAvatar({ image: url })}
              variant="dark"
            />
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Links</h3>
          <button onClick={addLink} className="flex items-center gap-1 text-xs text-[#F97316] hover:text-[#FB923C] transition-colors">
            <Plus size={14} /> Adicionar
          </button>
        </div>
        <div className="space-y-2">
          {linksData.items.map((item) => (
            <div key={item.id} className="rounded-lg border border-white/10 bg-white/5 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-white/20 flex-shrink-0" />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateLink(item.id, { title: e.target.value })}
                  className="flex-1 px-2 py-1 rounded text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
                  placeholder="Título"
                />
                <button onClick={() => removeLink(item.id)} className="p-1 text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                type="text"
                value={item.url}
                onChange={(e) => updateLink(item.id, { url: e.target.value })}
                className="w-full px-2 py-1 rounded text-sm bg-white/5 border border-white/10 text-white/60 focus:outline-none focus:border-[#F97316]/50"
                placeholder="https://..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
