"use client";

import type { BiolinkMarqueeData } from "@/types/biolink";

const speedMap = { slow: "40s", normal: "25s", fast: "12s" };

export default function MarqueeBlock({ data }: { data: BiolinkMarqueeData }) {
  const items = data.items?.length ? data.items : ["Texto animado"];
  const speed = speedMap[data.speed || "normal"];
  const text = items.join("  \u2022  ");

  return (
    <div className="overflow-hidden py-2 opacity-70">
      <div
        className="whitespace-nowrap text-sm font-medium"
        style={{
          animation: `biolink-marquee ${speed} linear infinite`,
        }}
      >
        {text}  &bull;  {text}  &bull;  {text}
      </div>
      <style>{`
        @keyframes biolink-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
