"use client";

import type { DepoimentosData } from "@/types/proposal";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function DepoimentosBlock({ config }: { config: DepoimentosData }) {
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
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}
          >
            {config.title}
          </motion.h2>
        )}

        <div className={`grid grid-cols-1 ${config.items.length === 1 ? "max-w-xl mx-auto" : "md:grid-cols-2"} gap-6`}>
          {config.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--color-cream)" }}
            >
              <Quote className="w-8 h-8 mb-4" style={{ color: "var(--color-gold)", opacity: 0.4 }} />
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: "var(--color-gold)" }}
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
                    {item.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-foreground)", opacity: 0.5 }}>
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
