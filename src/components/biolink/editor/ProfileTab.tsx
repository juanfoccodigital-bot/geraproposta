"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import type { AvatarData, LinksData, LinkItem } from "@/types/biolink";
import { Plus, Trash2, GripVertical, Upload, Crop, Link, Check, X, Loader2, Copy, Globe, Lock } from "lucide-react";
import AvatarCropModal from "./AvatarCropModal";

const APP_DOMAIN = "geraproposta.com";

function SlugEditor() {
  const { state, dispatch } = useBiolinkEditor();
  const [value, setValue] = useState(state.slug || "");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Sync external slug changes
  useEffect(() => {
    if (state.slug && state.slug !== value) setValue(state.slug);
  }, [state.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkSlug = useCallback(async (slug: string) => {
    if (slug.length < 3) { setStatus("invalid"); return; }
    if (slug === state.slug) { setStatus("idle"); return; }
    setStatus("checking");
    try {
      const res = await fetch(`/api/biolinks/check-slug?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) { setStatus("idle"); return; }
      const data = await res.json();
      setStatus(data.available ? "available" : "taken");
    } catch {
      setStatus("idle");
    }
  }, [state.slug]);

  function handleChange(raw: string) {
    const clean = raw.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
    setValue(clean);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (clean.length < 3) { setStatus("invalid"); return; }
    if (clean === state.slug) { setStatus("idle"); return; }
    setStatus("checking");
    debounceRef.current = setTimeout(() => checkSlug(clean), 500);
  }

  function applySlug() {
    if (status === "available" || value === state.slug) {
      dispatch({ type: "SET_SLUG", payload: value });
    }
  }

  function handleBlur() {
    if (status === "available") applySlug();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); applySlug(); }
  }

  const slug = value || state.slug || "...";
  const subdomainUrl = `${slug}.${APP_DOMAIN}`;

  function copyUrl() {
    navigator.clipboard.writeText(`https://${subdomainUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-2">
      <label className="text-xs text-white/40 mb-1 flex items-center gap-1.5">
        <Link size={12} />
        Seu Link
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="meu-link"
          className="w-full px-3 pr-8 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
          {status === "checking" && <Loader2 size={14} className="text-white/30 animate-spin" />}
          {status === "available" && <Check size={14} className="text-green-400" />}
          {status === "taken" && <X size={14} className="text-red-400" />}
          {status === "invalid" && value.length > 0 && <X size={14} className="text-yellow-400" />}
        </span>
      </div>
      {/* Status message */}
      {status === "taken" && <p className="text-[10px] text-red-400">Esse slug já está em uso</p>}
      {status === "invalid" && value.length > 0 && <p className="text-[10px] text-yellow-400">Mínimo 3 caracteres (letras, números e hifens)</p>}
      {status === "available" && <p className="text-[10px] text-green-400">Disponível! Salve para aplicar</p>}
      {/* Subdomain URL — primary */}
      <button
        onClick={copyUrl}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F97316]/5 border border-[#F97316]/20 text-[11px] text-[#F97316]/70 hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors cursor-pointer group"
      >
        <span className="truncate flex-1 text-left font-medium">{subdomainUrl}</span>
        {copied ? <Check size={12} className="text-green-400 flex-shrink-0" /> : <Copy size={12} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />}
      </button>
    </div>
  );
}

function CustomDomainEditor({ isPremium }: { isPremium: boolean }) {
  const { state, dispatch } = useBiolinkEditor();
  const [value, setValue] = useState(state.customDomain || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(state.customDomain || "");
  }, [state.customDomain]);

  function handleChange(raw: string) {
    const clean = raw.toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim();
    setValue(clean);
  }

  function apply() {
    dispatch({ type: "SET_CUSTOM_DOMAIN", payload: value || null });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleBlur() {
    if (value !== (state.customDomain || "")) apply();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); apply(); }
  }

  if (!isPremium) {
    return (
      <div className="space-y-2">
        <label className="text-xs text-white/40 mb-1 flex items-center gap-1.5">
          <Globe size={12} />
          Domínio Próprio
        </label>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-white/20">
          <Lock size={12} />
          <span>Disponível no plano Pro e Plus</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-xs text-white/40 mb-1 flex items-center gap-1.5">
        <Globe size={12} />
        Domínio Próprio
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="meudominio.com.br"
          className="w-full px-3 pr-8 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
        {saved && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <Check size={14} className="text-green-400" />
          </span>
        )}
      </div>
      {value && (
        <div className="space-y-1.5">
          <p className="text-[10px] text-white/30">Configure no seu provedor de domínio:</p>
          <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2.5 space-y-1">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-white/30 w-12">Tipo:</span>
              <span className="text-white/60 font-mono">CNAME</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-white/30 w-12">Nome:</span>
              <span className="text-white/60 font-mono">@</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-white/30 w-12">Valor:</span>
              <span className="text-white/60 font-mono">cname.vercel-dns.com</span>
            </div>
          </div>
          <p className="text-[10px] text-white/20">Após configurar o DNS, adicione o domínio no painel do Vercel</p>
        </div>
      )}
    </div>
  );
}

interface ProfileTabProps {
  isPremium?: boolean;
}

export default function ProfileTab({ isPremium = false }: ProfileTabProps) {
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
      {/* Slug Section */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Link Público</h3>
        <SlugEditor />
      </div>

      {/* Custom Domain Section */}
      <div>
        <CustomDomainEditor isPremium={isPremium} />
      </div>

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
