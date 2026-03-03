"use client";

import { useState, useRef } from "react";
import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { AvatarData, LinksData, LinkItem } from "@/types/biolink";
import { Plus, Trash2, GripVertical, Upload, Crop } from "lucide-react";
import ImageUpload from "@/components/editor/controls/ImageUpload";
import AvatarCropModal from "./AvatarCropModal";

export default function ProfileTab() {
  const { state, dispatch } = useBiolinkEditor();
  const blocks = state.config.blocks;
  const avatarBlock = blocks.find((b) => b.type === "avatar");
  const linksBlock = blocks.find((b) => b.type === "links");
  const avatarData = (avatarBlock?.data || {}) as AvatarData;
  const linksData = (linksBlock?.data || { items: [] }) as LinksData;

  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleCropConfirm(blob: Blob) {
    setCropSrc(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", blob, "avatar.jpg");
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      updateAvatar({ image: data.url });
    } catch {
      // silently fail
    } finally {
      setUploading(false);
    }
  }

  function handleCropExisting() {
    if (avatarData.image) {
      setCropSrc(avatarData.image);
    }
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
            <label className="text-xs text-white/40 mb-1.5 block">Foto de Perfil</label>
            {/* Avatar preview + crop button */}
            {avatarData.image && (
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={avatarData.image}
                  alt="Avatar"
                  className="w-14 h-14 rounded-full object-cover border border-white/10"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCropExisting}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Crop size={12} />
                    Recortar
                  </button>
                  <button
                    onClick={() => updateAvatar({ image: "" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-white/10 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                    Remover
                  </button>
                </div>
              </div>
            )}
            {/* Upload button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-white/10 text-xs text-white/40 hover:text-white/60 hover:border-white/20 transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-3.5 h-3.5 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload size={14} />
              )}
              {uploading ? "Enviando..." : "Enviar foto"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Links</h3>
          <button onClick={addLink} className="flex items-center gap-1 text-xs text-[#F97316] hover:text-[#FB923C] transition-colors cursor-pointer">
            <Plus size={14} /> Adicionar
          </button>
        </div>
        <div className="space-y-2">
          {linksData.items.map((item) => (
            <div key={item.id} className="rounded-lg border border-white/10 bg-white/5 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-white/20 flex-shrink-0 cursor-grab active:cursor-grabbing" />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateLink(item.id, { title: e.target.value })}
                  className="flex-1 px-2 py-1 rounded text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
                  placeholder="Título"
                />
                <button onClick={() => removeLink(item.id)} className="p-1 text-white/20 hover:text-red-400 transition-colors cursor-pointer">
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

      {/* Crop Modal */}
      {cropSrc && (
        <AvatarCropModal
          imageSrc={cropSrc}
          onClose={() => setCropSrc(null)}
          onConfirm={handleCropConfirm}
        />
      )}
    </div>
  );
}
