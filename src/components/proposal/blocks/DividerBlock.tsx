"use client";

import type { DividerData } from "@/types/proposal";

export default function DividerBlock({ config }: { config: DividerData }) {
  const spacingMap = { sm: "py-4", md: "py-8", lg: "py-16" };
  const spacing = spacingMap[config.spacing] || spacingMap.md;

  return (
    <div className={`${spacing} px-6`}>
      <div className="max-w-4xl mx-auto">
        {config.style === "line" && (
          <hr
            className="border-t"
            style={{ borderColor: "var(--color-gold)", opacity: 0.2 }}
          />
        )}
        {config.style === "dots" && (
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--color-gold)", opacity: 0.3 }}
              />
            ))}
          </div>
        )}
        {config.style === "space" && <div />}
      </div>
    </div>
  );
}
