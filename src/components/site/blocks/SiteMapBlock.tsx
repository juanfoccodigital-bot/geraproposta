"use client";

import type { SiteMapData } from "@/types/site";
import { MapPin } from "lucide-react";

const heightMap = { sm: "250px", md: "400px", lg: "550px" };

interface Props {
  data: SiteMapData;
  themeColors: Record<string, string>;
}

export default function SiteMapBlock({ data, themeColors }: Props) {
  const h = heightMap[data.height] || heightMap.md;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {data.title && (
        <h2 className="text-3xl font-bold text-center mb-2" style={{ color: themeColors.foreground }}>
          {data.title}
        </h2>
      )}
      {data.address && (
        <p className="text-center mb-8 flex items-center justify-center gap-2 opacity-60" style={{ color: themeColors.foreground }}>
          <MapPin size={16} />
          {data.address}
        </p>
      )}

      <div className="rounded-xl overflow-hidden border" style={{ borderColor: `${themeColors.foreground}15`, height: h }}>
        {data.embedUrl ? (
          <iframe
            src={data.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={data.title || "Mapa"}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ background: `${themeColors.foreground}08` }}
          >
            <MapPin size={48} style={{ color: `${themeColors.foreground}30` }} />
            <p className="mt-3 text-sm opacity-40" style={{ color: themeColors.foreground }}>
              Cole a URL do Google Maps Embed para exibir o mapa
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
