"use client";

import type { SiteBannerData } from "@/types/site";

interface Props {
  data: SiteBannerData;
  themeColors: Record<string, string>;
}

export default function SiteBannerBlock({ data, themeColors }: Props) {
  const alignClass =
    data.align === "left" ? "items-start text-left" :
    data.align === "right" ? "items-end text-right" :
    "items-center text-center";

  return (
    <div
      className="relative w-full min-h-[300px] flex"
      style={{
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: data.backgroundImage ? undefined : themeColors.gold,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: data.backgroundImage
            ? `rgba(0,0,0,${(data.overlay || 60) / 100})`
            : `${themeColors.gold}`,
        }}
      />

      {/* Content */}
      <div className={`relative z-10 flex flex-col justify-center ${alignClass} w-full max-w-5xl mx-auto px-8 py-20`}>
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {data.title}
          </h2>
        )}
        {data.subtitle && (
          <p className="text-lg text-white/80 mb-6 max-w-2xl">
            {data.subtitle}
          </p>
        )}
        {data.ctaText && (
          <a
            href={data.ctaUrl || "#"}
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-transform hover:scale-105"
            style={{
              background: "#FFFFFF",
              color: themeColors.gold,
            }}
          >
            {data.ctaText}
          </a>
        )}
      </div>
    </div>
  );
}
