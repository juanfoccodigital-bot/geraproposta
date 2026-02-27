"use client";

import type { GaleriaData } from "@/types/proposal";
import { motion } from "framer-motion";

export default function GaleriaBlock({ config }: { config: GaleriaData }) {
  const colsClass =
    config.columns === 2 ? "grid-cols-2" :
    config.columns === 4 ? "grid-cols-2 lg:grid-cols-4" :
    "grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}
          >
            {config.title}
          </motion.h2>
        )}

        {config.images.length === 0 ? (
          <div className="text-center py-12" style={{ color: "var(--color-foreground)", opacity: 0.3 }}>
            <p className="text-sm">Nenhuma imagem adicionada</p>
          </div>
        ) : (
          <div className={`grid ${colsClass} gap-4`}>
            {config.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
