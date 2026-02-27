"use client";

import type { ImagemData } from "@/types/proposal";
import { motion } from "framer-motion";

export default function ImagemBlock({ config }: { config: ImagemData }) {
  if (!config.src) {
    return (
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-48 rounded-2xl bg-black/5 flex items-center justify-center">
            <span style={{ color: "var(--color-foreground)", opacity: 0.3 }} className="text-sm">
              Nenhuma imagem definida
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={config.fullWidth ? "py-8" : "py-8 px-6"}>
      <div className={config.fullWidth ? "" : "max-w-4xl mx-auto"}>
        <motion.figure
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <img
            src={config.src}
            alt={config.alt}
            className={`w-full object-cover ${config.fullWidth ? "" : "rounded-2xl"}`}
            style={{ maxHeight: "600px" }}
          />
          {config.caption && (
            <figcaption
              className="text-center text-sm mt-3 px-6"
              style={{ color: "var(--color-foreground)", opacity: 0.5 }}
            >
              {config.caption}
            </figcaption>
          )}
        </motion.figure>
      </div>
    </section>
  );
}
