"use client";

import type { TextoData } from "@/types/proposal";
import { motion } from "framer-motion";

export default function TextoBlock({ config }: { config: TextoData }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto" style={{ textAlign: config.alignment }}>
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}
          >
            {config.title}
          </motion.h2>
        )}
        {config.body && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg leading-relaxed whitespace-pre-line"
            style={{ color: "var(--color-foreground)", opacity: 0.7 }}
          >
            {config.body}
          </motion.div>
        )}
      </div>
    </section>
  );
}
