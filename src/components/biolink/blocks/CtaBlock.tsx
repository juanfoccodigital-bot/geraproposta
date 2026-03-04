"use client";

import { ArrowRight } from "lucide-react";
import type { CtaData, BiolinkTheme } from "@/types/biolink";

export default function CtaBlock({ data, theme }: { data: CtaData; theme: BiolinkTheme }) {
  const effects = theme.effects;
  const hasShimmer = effects?.buttonShimmer;
  const isGlass = data.style === "glass";
  const isImage = data.style === "image" && data.image;

  const containerStyle: React.CSSProperties = isGlass
    ? {
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      }
    : isImage
    ? {
        backgroundImage: `url(${data.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: `linear-gradient(135deg, ${theme.buttonColor}30, ${theme.buttonColor}10)`,
        border: `1px solid ${theme.buttonColor}25`,
      };

  return (
    <div className="relative rounded-2xl overflow-hidden" style={containerStyle}>
      {/* Image overlay */}
      {isImage && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />}

      <div className="relative z-10 p-6 flex flex-col items-center text-center gap-4">
        {data.headline && (
          <h3
            className="font-bold text-lg leading-tight"
            style={isImage ? { color: "#FFFFFF" } : undefined}
          >
            {data.headline}
          </h3>
        )}
        {data.description && (
          <p
            className="text-sm opacity-70 max-w-[320px]"
            style={isImage ? { color: "#FFFFFF" } : undefined}
          >
            {data.description}
          </p>
        )}
        {data.buttonText && (
          <a
            href={data.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105 active:scale-95 overflow-hidden"
            style={{
              background: theme.buttonColor,
              color: theme.buttonTextColor,
              boxShadow: `0 4px 20px ${theme.buttonColor}40`,
            }}
          >
            {hasShimmer && (
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  animation: "biolink-shimmer 2.5s ease-in-out infinite",
                }}
              />
            )}
            <span className="relative z-10">{data.buttonText}</span>
            <ArrowRight size={16} className="relative z-10" />
          </a>
        )}
      </div>
    </div>
  );
}
