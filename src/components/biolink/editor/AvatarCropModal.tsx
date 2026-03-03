"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { X, ZoomIn } from "lucide-react";

interface AvatarCropModalProps {
  imageSrc: string;
  onClose: () => void;
  onConfirm: (blob: Blob) => void;
}

async function getCroppedImg(imageSrc: string, crop: Area): Promise<Blob> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
    image.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  const size = 400;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, size, size);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas blob failed"))),
      "image/jpeg",
      0.9,
    );
  });
}

export default function AvatarCropModal({ imageSrc, onClose, onConfirm }: AvatarCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  async function handleConfirm() {
    if (!croppedArea) return;
    setProcessing(true);
    try {
      const blob = await getCroppedImg(imageSrc, croppedArea);
      onConfirm(blob);
    } catch {
      setProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-md border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white">Ajustar foto</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <X size={18} className="text-white/40" />
          </button>
        </div>

        {/* Cropper */}
        <div className="relative w-full aspect-square bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom slider */}
        <div className="px-4 py-3 flex items-center gap-3">
          <ZoomIn size={16} className="text-white/40" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 accent-[#F97316]"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-4 pb-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm rounded-lg border border-white/10 text-white/60 hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="flex-1 py-2.5 text-sm rounded-lg bg-[#F97316] text-white font-medium hover:bg-[#F97316]/90 transition-colors cursor-pointer disabled:opacity-50"
          >
            {processing ? "Processando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
