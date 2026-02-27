"use client";

import type { SiteLogosData } from "@/types/site";

interface Props {
  data: SiteLogosData;
  themeColors: Record<string, string>;
}

export default function SiteLogosBlock({ data, themeColors }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {data.title && (
        <p className="text-center text-sm font-medium uppercase tracking-wider mb-8 opacity-40" style={{ color: themeColors.foreground }}>
          {data.title}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {(data.items || []).map((item, i) => {
          const content = item.image ? (
            <img
              src={item.image}
              alt={item.alt}
              className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
            />
          ) : (
            <div
              className="h-10 md:h-12 w-24 md:w-32 rounded-lg flex items-center justify-center text-xs font-semibold opacity-30"
              style={{ background: `${themeColors.foreground}10`, color: themeColors.foreground }}
            >
              {item.alt || `Logo ${i + 1}`}
            </div>
          );

          return item.url ? (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          ) : (
            <div key={i}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
