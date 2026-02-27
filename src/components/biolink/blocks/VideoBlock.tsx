"use client";

import type { BiolinkVideoData } from "@/types/biolink";
import { getEmbedUrl } from "@/lib/video-utils";

const aspectMap = { "16:9": "56.25%", "1:1": "100%", "9:16": "177.78%" };

export default function VideoBlock({ data }: { data: BiolinkVideoData }) {
  const embedUrl = getEmbedUrl(data.url, false);
  if (!embedUrl) {
    return (
      <div className="rounded-xl overflow-hidden bg-black/10 flex items-center justify-center py-8">
        <p className="text-xs opacity-40">Adicione um link do YouTube ou Vimeo</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ position: "relative", paddingBottom: aspectMap[data.aspectRatio || "16:9"] }}>
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
