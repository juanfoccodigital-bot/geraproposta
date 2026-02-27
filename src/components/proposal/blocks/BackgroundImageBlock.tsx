"use client";

import type { BackgroundImageData } from "@/types/proposal";
import { motion } from "framer-motion";

const heightMap: Record<string, string> = {
  sm: "min-h-[40vh]",
  md: "min-h-[60vh]",
  lg: "min-h-[80vh]",
  xl: "min-h-screen",
};

const overlayColorMap: Record<string, string> = {
  dark: "rgba(0,0,0,",
  light: "rgba(255,255,255,",
  gold: "rgba(201,169,110,",
};

const textColorMap: Record<string, string> = {
  white: "#ffffff",
  dark: "var(--color-foreground)",
  gold: "var(--color-gold)",
};

const alignmentClass: Record<string, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

export default function BackgroundImageBlock({ config }: { config: BackgroundImageData }) {
  const h = heightMap[config.minHeight] || heightMap.md;
  const overlayBase = overlayColorMap[config.overlayColor] || overlayColorMap.dark;
  const overlayRgba = `${overlayBase}${(config.overlayOpacity / 100).toFixed(2)})`;
  const color = textColorMap[config.textColor] || textColorMap.white;
  const align = alignmentClass[config.alignment] || alignmentClass.center;

  return (
    <section
      className={`relative ${h} flex items-center justify-center px-6 overflow-hidden`}
      style={{
        backgroundImage: config.src ? `url(${config.src})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...(config.parallax ? { backgroundAttachment: "fixed" } : {}),
        ...(!config.src ? { backgroundColor: "var(--color-foreground)" } : {}),
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: overlayRgba }} />

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto flex flex-col ${align} py-20`}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "var(--font-heading)", color }}
        >
          {config.title}
        </motion.h2>
        {config.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
            style={{ color, opacity: 0.85 }}
          >
            {config.subtitle}
          </motion.p>
        )}
        {config.buttonLabel && (
          <motion.a
            href={config.buttonUrl || "#"}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex px-8 py-4 rounded-xl font-semibold text-base text-white transition-all hover:scale-105"
            style={{ backgroundColor: "var(--color-gold)" }}
          >
            {config.buttonLabel}
          </motion.a>
        )}
      </div>

      {/* Placeholder when no image */}
      {!config.src && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <p className="text-white/30 text-sm">Adicione uma imagem de fundo</p>
        </div>
      )}
    </section>
  );
}
