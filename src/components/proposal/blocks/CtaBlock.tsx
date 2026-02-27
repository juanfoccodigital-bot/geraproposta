"use client";

import type { CtaData } from "@/types/proposal";
import { motion } from "framer-motion";

export default function CtaBlock({ config }: { config: CtaData }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-12"
          style={{ backgroundColor: "var(--color-cream)" }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}
          >
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="mb-8 text-lg" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
              {config.subtitle}
            </p>
          )}
          <a
            href={config.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-gold)" }}
          >
            {config.buttonLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
