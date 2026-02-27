"use client";

import type { VideoData } from "@/types/proposal";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { getEmbedUrl } from "@/lib/video-utils";

const maxWidthMap: Record<string, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  full: "max-w-6xl",
};

const aspectMap: Record<string, string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

export default function VideoBlock({ config }: { config: VideoData }) {
  const embedUrl = getEmbedUrl(config.url, config.autoplay);
  const maxW = maxWidthMap[config.maxWidth] || maxWidthMap.md;
  const aspect = aspectMap[config.aspectRatio] || aspectMap["16:9"];

  return (
    <section className="py-20 px-6">
      <div className={`${maxW} mx-auto`}>
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-3"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}
          >
            {config.title}
          </motion.h2>
        )}
        {config.subtitle && (
          <p className="text-center mb-10 max-w-2xl mx-auto" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
            {config.subtitle}
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`${aspect} w-full overflow-hidden ${config.rounded ? "rounded-2xl" : ""}`}
          style={{
            ...(config.shadow ? { boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" } : {}),
            border: "1px solid color-mix(in srgb, var(--color-gold) 20%, transparent)",
          }}
        >
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={config.title || "Vídeo"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-4"
              style={{ backgroundColor: "var(--color-cream)", color: "var(--color-foreground)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-gold)", color: "#fff" }}
              >
                <Play className="w-7 h-7 ml-1" />
              </div>
              <p className="text-sm opacity-40">Cole o link do YouTube ou Vimeo</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
