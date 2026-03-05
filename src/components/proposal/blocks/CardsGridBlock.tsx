"use client";

import type { CardsGridData } from "@/types/proposal";
import { motion } from "framer-motion";
import { resolveIcon } from "@/lib/icons";

export default function CardsGridBlock({ config }: { config: CardsGridData }) {
  const colsClass =
    config.columns === 2 ? "md:grid-cols-2" :
    config.columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" :
    "md:grid-cols-3";

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {config.sectionLabel && (
          <div className="text-center mb-4">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{ backgroundColor: "var(--color-gold)", color: "#fff", opacity: 0.9 }}
            >
              {config.sectionLabel}
            </span>
          </div>
        )}
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
          <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
            {config.subtitle}
          </p>
        )}

        <div className={`grid grid-cols-1 ${colsClass} gap-6`}>
          {config.cards.map((card, i) => {
            const Icon = resolveIcon(card.icon);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "var(--color-cream)",
                  borderColor: "var(--color-gold)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  opacity: 0.9,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-gold) 15%, transparent)" }}
                >
                  <Icon className="w-6 h-6" style={{ color: "var(--color-gold)" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-foreground)" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
