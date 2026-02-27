"use client";

import type { SiteAboutData } from "@/types/site";

interface SiteAboutBlockProps {
  data: SiteAboutData;
  themeColors: { gold: string; foreground: string };
}

export default function SiteAboutBlock({ data, themeColors }: SiteAboutBlockProps) {
  const imgLeft = data.imagePosition === "left";

  return (
    <div className={`flex flex-col ${imgLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}>
      {/* Image */}
      {data.image && (
        <div className="w-full md:w-1/2">
          <img src={data.image} alt={data.title} className="w-full rounded-2xl object-cover aspect-[4/3]" />
        </div>
      )}

      {/* Text */}
      <div className={`w-full ${data.image ? "md:w-1/2" : ""}`}>
        <h2 className="text-3xl font-bold mb-4" style={{ color: themeColors.foreground }}>{data.title}</h2>
        <p className="text-base leading-relaxed opacity-70 mb-6" style={{ color: themeColors.foreground }}>
          {data.body}
        </p>
        {data.ctaText && (
          <a
            href={data.ctaUrl || "#"}
            className="inline-block px-5 py-2.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-90"
            style={{ background: themeColors.gold, color: "#FFFFFF" }}
          >
            {data.ctaText}
          </a>
        )}
      </div>
    </div>
  );
}
