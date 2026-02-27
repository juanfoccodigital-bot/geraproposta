"use client";

import type { MarqueeData } from "@/types/proposal";

const separatorMap: Record<string, string> = {
  star: "★",
  dot: "●",
  diamond: "◆",
  slash: "/",
  none: "",
};

const speedMap: Record<string, number> = {
  slow: 30,
  normal: 20,
  fast: 10,
};

const sizeMap: Record<string, string> = {
  sm: "text-sm py-3",
  md: "text-xl md:text-2xl py-4",
  lg: "text-3xl md:text-5xl py-6",
};

export default function MarqueeBlock({ config }: { config: MarqueeData }) {
  const sep = separatorMap[config.separator] || "";
  const items = config.items.filter(Boolean);
  if (items.length === 0) return null;

  // Build the repeated strip
  const strip = Array.from({ length: config.repeat || 3 }, () => items).flat();

  const solidBg = { backgroundColor: "var(--color-gold)", color: "#fff" };
  const outlineBg = {
    backgroundColor: "transparent",
    color: "var(--color-gold)",
    borderTop: "2px solid var(--color-gold)",
    borderBottom: "2px solid var(--color-gold)",
  };
  const gradientBg = {
    background: "linear-gradient(135deg, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))",
    color: "#fff",
  };

  const variantStyle =
    config.variant === "outline" ? outlineBg :
    config.variant === "gradient" ? gradientBg :
    solidBg;

  const duration = speedMap[config.speed] || 20;
  const direction = config.direction === "right" ? "reverse" : "normal";

  return (
    <section className="overflow-hidden" style={variantStyle}>
      <div
        className={`flex whitespace-nowrap ${sizeMap[config.size] || sizeMap.md}`}
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: direction,
          ...(config.pauseOnHover ? {} : {}),
        }}
        onMouseEnter={(e) => {
          if (config.pauseOnHover) e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          if (config.pauseOnHover) e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {/* Duplicate for seamless loop */}
        {[0, 1].map((pass) => (
          <div key={pass} className="flex items-center shrink-0">
            {strip.map((item, i) => (
              <span key={`${pass}-${i}`} className="flex items-center">
                <span className="px-4 md:px-6">{item}</span>
                {sep && (i < strip.length - 1 || pass === 0) && (
                  <span className="opacity-50 px-2">{sep}</span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
