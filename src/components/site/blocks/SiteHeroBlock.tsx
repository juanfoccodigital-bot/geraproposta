"use client";

import type { SiteHeroData } from "@/types/site";

const heightMap = { full: "min-h-screen", large: "min-h-[70vh]", medium: "min-h-[50vh]" };
const alignFlex = { left: "items-start text-left", center: "items-center text-center", right: "items-end text-right" };

interface SiteHeroBlockProps {
  data: SiteHeroData;
  themeColors: { gold: string; background: string; foreground: string };
}

export default function SiteHeroBlock({ data, themeColors }: SiteHeroBlockProps) {
  const bgStyle: React.CSSProperties = {};
  if (data.backgroundImage) {
    bgStyle.backgroundImage = `url(${data.backgroundImage})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center";
  }

  return (
    <div className={`relative flex ${heightMap[data.height || "large"]}`} style={bgStyle}>
      {/* Overlay */}
      {data.backgroundImage && (
        <div className="absolute inset-0 bg-black" style={{ opacity: (data.backgroundOverlay || 50) / 100 }} />
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-col justify-center ${alignFlex[data.align || "center"]} w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-20`}>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
          style={{ color: data.backgroundImage ? "#FFFFFF" : themeColors.foreground }}
        >
          {data.title}
        </h1>
        {data.subtitle && (
          <p
            className="text-lg sm:text-xl max-w-2xl mb-8 opacity-80"
            style={{ color: data.backgroundImage ? "#FFFFFF" : themeColors.foreground }}
          >
            {data.subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {data.ctaPrimary?.text && (
            <a
              href={data.ctaPrimary.url || "#"}
              className="px-6 py-3 rounded-lg font-semibold text-base transition-opacity hover:opacity-90"
              style={{ background: themeColors.gold, color: "#FFFFFF" }}
            >
              {data.ctaPrimary.text}
            </a>
          )}
          {data.ctaSecondary?.text && (
            <a
              href={data.ctaSecondary.url || "#"}
              className="px-6 py-3 rounded-lg font-semibold text-base border-2 transition-opacity hover:opacity-80"
              style={{
                borderColor: data.backgroundImage ? "#FFFFFF" : themeColors.foreground,
                color: data.backgroundImage ? "#FFFFFF" : themeColors.foreground,
              }}
            >
              {data.ctaSecondary.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
