"use client";

import { useState, useRef } from "react";
import { Upload, X, Link, ImageOff } from "lucide-react";

/* ============================================
   IMAGE UPLOAD
   Componente para upload de imagens ou colagem
   de URL. Suporta variant light (propostas)
   e dark (sites/biolinks).
   ============================================ */

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  proposalId?: string;
  variant?: "light" | "dark";
}

export default function ImageUpload({
  value,
  onChange,
  proposalId,
  variant = "dark",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgBroken, setImgBroken] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDark = variant === "dark";

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (proposalId) {
        formData.append("proposalId", proposalId);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload falhou");
      }

      const data = await res.json();
      setImgBroken(false);
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClear = () => {
    onChange("");
    setImgBroken(false);
    setError(null);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgBroken(false);
    setError(null);
    onChange(e.target.value);
  };

  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "#e5e5e5";

  return (
    <div className="space-y-2">
      {/* Preview da imagem */}
      {value && (
        <div className="relative group">
          {imgBroken ? (
            <div
              className="w-full h-[60px] rounded-lg flex items-center justify-center border"
              style={{ borderColor, background: isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5" }}
            >
              <ImageOff size={20} style={{ opacity: 0.3, color: isDark ? "#fff" : "#1A1A1A" }} />
            </div>
          ) : (
            <img
              src={value}
              alt="Preview"
              className="w-full h-[60px] rounded-lg object-cover border"
              style={{ borderColor }}
              onError={() => setImgBroken(true)}
            />
          )}
          <button
            onClick={handleClear}
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            title="Remover imagem"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Erro */}
      {error && (
        <p className="text-[10px] text-red-400">{error}</p>
      )}

      {/* Campo de URL */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Link
            className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3"
            style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(26,26,26,0.3)" }}
          />
          <input
            type="text"
            value={value}
            onChange={handleUrlChange}
            placeholder="Cole a URL ou faça upload..."
            className="w-full pl-7 pr-2 py-1.5 rounded-lg border text-xs focus:outline-none"
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
              borderColor,
              color: isDark ? "rgba(255,255,255,0.7)" : "rgba(26,26,26,0.6)",
            }}
          />
        </div>

        {/* Botão de upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
            borderColor,
          }}
          title="Upload de imagem (max 5MB)"
        >
          {uploading ? (
            <div
              className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: isDark ? "#F97316" : "#C9A96E", borderTopColor: "transparent" }}
            />
          ) : (
            <Upload className="w-3.5 h-3.5" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(26,26,26,0.5)" }} />
          )}
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
  );
}
