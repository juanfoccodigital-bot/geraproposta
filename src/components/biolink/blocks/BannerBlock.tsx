"use client";

import type { BannerData, BiolinkTheme } from "@/types/biolink";

const heightMap = { sm: "120px", md: "180px", lg: "260px" };

export default function BannerBlock({ data, theme }: { data: BannerData; theme: BiolinkTheme }) {
  const hasImage = !!data.image;
  const hasText = data.title || data.subtitle;

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]"
      style={{ height: heightMap[data.height || "md"] }}
    >
      {/* Background */}
      {hasImage ? (
        <img src={data.image} alt={data.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${theme.buttonColor}60, ${theme.buttonColor}20)` }}
        />
      )}

      {/* Overlay */}
      {hasImage && (
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${(data.overlay || 40) / 100})` }}
        />
      )}

      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      />

      {/* Text */}
      {hasText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          {data.title && (
            <h3 className="font-bold text-xl text-white drop-shadow-lg leading-tight">{data.title}</h3>
          )}
          {data.subtitle && (
            <p className="text-sm text-white/80 mt-1.5 drop-shadow max-w-[280px]">{data.subtitle}</p>
          )}
        </div>
      )}
    </a>
  );
}
