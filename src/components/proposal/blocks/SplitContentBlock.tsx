"use client";

import type { SplitContentData } from "@/types/proposal";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SplitContentBlock({ config }: { config: SplitContentData }) {
  const isImageLeft = config.layout === "image-left";

  const alignClass =
    config.verticalAlign === "top" ? "items-start" :
    config.verticalAlign === "bottom" ? "items-end" :
    "items-center";

  const imageContent = (
    <motion.div
      initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`w-full aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden ${config.imageRounded ? "rounded-2xl" : ""}`}
    >
      {config.image ? (
        <img
          src={config.image}
          alt={config.imageAlt}
          className="w-full h-full"
          style={{ objectFit: config.imageFit || "cover" }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-cream)", color: "var(--color-foreground)", opacity: 0.3 }}
        >
          <p className="text-sm">Adicione uma imagem</p>
        </div>
      )}
    </motion.div>
  );

  const textContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="flex flex-col justify-center py-4"
    >
      {config.sectionLabel && (
        <span
          className="inline-block self-start px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
          style={{ backgroundColor: "var(--color-gold)", color: "#fff", opacity: 0.9 }}
        >
          {config.sectionLabel}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}
      >
        {config.title}
      </h2>
      {config.body && (
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
          {config.body}
        </p>
      )}
      {config.items.length > 0 && (
        <ul className="space-y-3 mb-6">
          {config.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} />
              <span style={{ color: "var(--color-foreground)", opacity: 0.8 }}>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {config.buttonLabel && (
        <a
          href={config.buttonUrl || "#"}
          className="inline-flex self-start px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--color-gold)" }}
        >
          {config.buttonLabel}
        </a>
      )}
    </motion.div>
  );

  return (
    <section className="py-20 px-6">
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 ${alignClass}`}>
        {isImageLeft ? (
          <>{imageContent}{textContent}</>
        ) : (
          <>{textContent}{imageContent}</>
        )}
      </div>
    </section>
  );
}
