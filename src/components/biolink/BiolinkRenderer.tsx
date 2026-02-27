"use client";

import type { BiolinkConfig, BiolinkBlock, BiolinkTheme, BiolinkEffects } from "@/types/biolink";
import { motion } from "framer-motion";
import AvatarBlock from "./blocks/AvatarBlock";
import LinksBlock from "./blocks/LinksBlock";
import SocialBlock from "./blocks/SocialBlock";
import DividerBlock from "./blocks/DividerBlock";
import TextBlock from "./blocks/TextBlock";
import FeaturedBlock from "./blocks/FeaturedBlock";
import VideoBlock from "./blocks/VideoBlock";
import MarqueeBlock from "./blocks/MarqueeBlock";

function renderBlock(block: BiolinkBlock, theme: BiolinkTheme) {
  if (!block.visible) return null;

  switch (block.type) {
    case "avatar":
      return <AvatarBlock data={block.data as import("@/types/biolink").AvatarData} theme={theme} />;
    case "links":
      return <LinksBlock data={block.data as import("@/types/biolink").LinksData} theme={theme} />;
    case "social":
      return <SocialBlock data={block.data as import("@/types/biolink").SocialData} />;
    case "divider":
      return <DividerBlock data={block.data as import("@/types/biolink").BiolinkDividerData} />;
    case "text":
      return <TextBlock data={block.data as import("@/types/biolink").BiolinkTextData} />;
    case "featured":
      return <FeaturedBlock data={block.data as import("@/types/biolink").FeaturedData} theme={theme} />;
    case "video":
      return <VideoBlock data={block.data as import("@/types/biolink").BiolinkVideoData} />;
    case "marquee":
      return <MarqueeBlock data={block.data as import("@/types/biolink").BiolinkMarqueeData} />;
    default:
      return null;
  }
}

function getBackgroundStyle(theme: BiolinkTheme): React.CSSProperties {
  if (theme.backgroundType === "gradient" && theme.backgroundValue) {
    return { background: theme.backgroundValue };
  }
  if (theme.backgroundType === "image" && theme.backgroundValue) {
    return {
      backgroundImage: `url(${theme.backgroundValue})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { background: theme.background || "#FFFFFF" };
}

/* Entrance animation variants for Framer Motion */
const entranceVariants = {
  fade: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } },
  slide: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
} as const;

/* Animated background overlay — aurora, particles, float */
function AnimatedBackground({ effects, buttonColor }: { effects: BiolinkEffects; buttonColor: string }) {
  const type = effects.animatedBg;
  if (!type || type === "none") return null;

  const color = buttonColor || "#F97316";

  if (type === "aurora") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-20"
          style={{ background: color, top: "10%", left: "10%", animation: "biolink-aurora 12s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-15"
          style={{ background: color, bottom: "20%", right: "5%", animation: "biolink-aurora 15s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute w-[200px] h-[200px] rounded-full blur-[80px] opacity-10"
          style={{ background: color, top: "50%", left: "50%", animation: "biolink-aurora 18s ease-in-out infinite 3s" }}
        />
      </div>
    );
  }

  if (type === "float") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-2 h-2 rounded-full opacity-30"
          style={{ background: color, top: "20%", left: "15%", animation: "biolink-float-1 6s ease-in-out infinite" }}
        />
        <div
          className="absolute w-3 h-3 rounded-full opacity-20"
          style={{ background: color, top: "50%", right: "20%", animation: "biolink-float-2 8s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full opacity-25"
          style={{ background: color, bottom: "30%", left: "60%", animation: "biolink-float-3 7s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute w-2.5 h-2.5 rounded-full opacity-15"
          style={{ background: color, top: "70%", left: "25%", animation: "biolink-float-2 9s ease-in-out infinite 3s" }}
        />
        <div
          className="absolute w-1 h-1 rounded-full opacity-35"
          style={{ background: color, top: "35%", right: "35%", animation: "biolink-float-1 5s ease-in-out infinite 1.5s" }}
        />
      </div>
    );
  }

  if (type === "particles") {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      left: `${Math.round(8 + (i * 7.5))}%`,
      size: 2 + (i % 3),
      delay: i * 1.2,
      duration: 8 + (i % 4) * 2,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: color,
              opacity: 0,
              animation: `biolink-particle-drift ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

interface BiolinkRendererProps {
  config: BiolinkConfig;
  className?: string;
  /** Skip entrance animations (for static previews / thumbnails) */
  preview?: boolean;
}

export default function BiolinkRenderer({ config, className, preview }: BiolinkRendererProps) {
  const { theme, blocks } = config;
  const effects = theme.effects;
  const hasAnimatedBg = effects?.animatedBg && effects.animatedBg !== "none";
  const entrance = (!preview && effects?.entrance && effects.entrance !== "none") ? effects.entrance : null;
  const variants = entrance ? entranceVariants[entrance as keyof typeof entranceVariants] : null;

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${className || ""}`}
      style={{
        ...getBackgroundStyle(theme),
        color: theme.textColor,
        fontFamily: theme.font ? `"${theme.font}", sans-serif` : undefined,
        position: hasAnimatedBg ? "relative" : undefined,
      }}
    >
      {hasAnimatedBg && effects && (
        <AnimatedBackground effects={effects} buttonColor={theme.buttonColor} />
      )}
      <div className="w-full max-w-[480px] px-5 py-8 flex flex-col gap-4 relative z-10">
        {blocks.map((block, index) =>
          variants ? (
            <motion.div
              key={block.id}
              initial={variants.initial}
              animate={variants.animate}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            >
              {renderBlock(block, theme)}
            </motion.div>
          ) : (
            <div key={block.id}>
              {renderBlock(block, theme)}
            </div>
          )
        )}
      </div>
    </div>
  );
}
