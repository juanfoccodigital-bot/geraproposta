"use client";

import { ExternalLink } from "lucide-react";
import type { FeaturedData } from "@/types/biolink";
import type { BiolinkTheme } from "@/types/biolink";

export default function FeaturedBlock({ data, theme }: { data: FeaturedData; theme: BiolinkTheme }) {
  const effects = theme.effects;
  const isGlass = effects?.glassmorphism;

  const cardStyle: React.CSSProperties = isGlass
    ? {
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid rgba(255, 255, 255, 0.12)`,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }
    : {
        border: `1px solid ${theme.buttonColor}30`,
      };

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
      style={cardStyle}
    >
      {data.image && (
        <div className="w-full aspect-video">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm">{data.title}</h3>
            {data.description && <p className="text-xs opacity-60 mt-1">{data.description}</p>}
          </div>
          <ExternalLink size={14} className="opacity-40 flex-shrink-0 mt-0.5" />
        </div>
      </div>
    </a>
  );
}
