"use client";

import { ExternalLink } from "lucide-react";
import type { ImageLinkData, ImageLinkItem, BiolinkTheme } from "@/types/biolink";

function ImageLinkCard({ item, layout, theme }: { item: ImageLinkItem; layout: "overlay" | "side"; theme: BiolinkTheme }) {
  if (!item.enabled) return null;

  const effects = theme.effects;
  const hasGlow = effects?.buttonGlow;
  const hasShimmer = effects?.buttonShimmer;

  if (layout === "side") {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-4 rounded-xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] w-full"
        style={{
          background: `${theme.buttonColor}15`,
          border: `1px solid ${theme.buttonColor}30`,
          ...(hasGlow ? { animation: "biolink-glow-pulse 3s ease-in-out infinite", "--bl-glow-color": theme.buttonColor } as React.CSSProperties : {}),
        }}
      >
        {hasShimmer && (
          <span
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              animation: "biolink-shimmer 2.5s ease-in-out infinite",
            }}
          />
        )}
        <div className="w-20 h-20 flex-shrink-0">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-l-xl" />
          ) : (
            <div className="w-full h-full rounded-l-xl" style={{ background: `${theme.buttonColor}25` }} />
          )}
        </div>
        <div className="flex-1 py-3 pr-3">
          <h4 className="font-semibold text-sm">{item.title}</h4>
          {item.subtitle && <p className="text-xs opacity-60 mt-0.5">{item.subtitle}</p>}
        </div>
        <ExternalLink size={14} className="opacity-30 mr-3 flex-shrink-0" />
      </a>
    );
  }

  // overlay layout
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] w-full"
      style={{
        ...(hasGlow ? { animation: "biolink-glow-pulse 3s ease-in-out infinite", "--bl-glow-color": theme.buttonColor } as React.CSSProperties : {}),
      }}
    >
      {hasShimmer && (
        <span
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            animation: "biolink-shimmer 2.5s ease-in-out infinite",
          }}
        />
      )}
      <div className="aspect-[2.5/1] relative">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${theme.buttonColor}40, ${theme.buttonColor}15)` }} />
        )}
        {/* Fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Text on top */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h4 className="font-bold text-sm text-white drop-shadow-lg">{item.title}</h4>
          {item.subtitle && <p className="text-xs text-white/70 mt-0.5 drop-shadow">{item.subtitle}</p>}
        </div>
      </div>
    </a>
  );
}

export default function ImageLinkBlock({ data, theme }: { data: ImageLinkData; theme: BiolinkTheme }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {data.items?.map((item) => (
        <ImageLinkCard key={item.id} item={item} layout={data.layout || "overlay"} theme={theme} />
      ))}
    </div>
  );
}
