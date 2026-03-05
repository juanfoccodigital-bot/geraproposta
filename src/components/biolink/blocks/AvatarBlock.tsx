"use client";

import type { AvatarData, BiolinkTheme } from "@/types/biolink";

const sizeMap = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };

export default function AvatarBlock({ data, theme }: { data: AvatarData; theme?: BiolinkTheme }) {
  const effects = theme?.effects;
  const hasGradient = effects?.gradientText && effects.gradientColors;

  const nameStyle: React.CSSProperties = hasGradient
    ? {
        background: `linear-gradient(135deg, ${effects!.gradientColors![0]}, ${effects!.gradientColors![1]})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }
    : {};

  return (
    <div className="flex flex-col items-center text-center gap-3 py-4">
      {data.image ? (
        hasGradient ? (
          /* Gradient ring around avatar image */
          <div
            className="w-[100px] h-[100px] rounded-full relative"
            style={{ background: `linear-gradient(135deg, ${effects!.gradientColors![0]}, ${effects!.gradientColors![1]})` }}
          >
            <img
              src={data.image}
              alt={data.name}
              className="absolute inset-[3px] rounded-full object-cover"
            />
          </div>
        ) : (
          <img
            src={data.image}
            alt={data.name}
            className="w-24 h-24 rounded-full object-cover border-2"
            style={{ borderColor: "color-mix(in srgb, currentColor 30%, transparent)" }}
          />
        )
      ) : (
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
          style={
            hasGradient
              ? { background: `linear-gradient(135deg, ${effects!.gradientColors![0]}, ${effects!.gradientColors![1]})` }
              : { background: "currentColor", opacity: 0.15 }
          }
        >
          <span style={hasGradient ? { color: "#FFFFFF" } : { opacity: 1, color: "inherit" }}>
            {data.name?.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>
      )}
      <h1 className={`font-bold ${sizeMap[data.nameSize || "md"]}`} style={nameStyle}>
        {data.name}
      </h1>
      {data.bio && <p className="text-sm opacity-70 max-w-[280px]">{data.bio}</p>}
    </div>
  );
}
