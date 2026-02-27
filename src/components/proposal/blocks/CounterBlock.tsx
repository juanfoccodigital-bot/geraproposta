"use client";

import type { CounterData } from "@/types/proposal";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCountUp } from "@/lib/hooks/useCountUp";

function CounterItem({ item, duration, inView }: {
  item: { value: number; prefix: string; suffix: string; label: string };
  duration: number;
  inView: boolean;
}) {
  const count = useCountUp(item.value, duration, inView);

  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-gold)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {item.prefix}{count.toLocaleString("pt-BR")}{item.suffix}
      </span>
      <span className="text-sm" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
        {item.label}
      </span>
    </div>
  );
}

export default function CounterBlock({ config }: { config: CounterData }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const colsClass =
    config.columns === 2 ? "md:grid-cols-2" :
    config.columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" :
    "md:grid-cols-3";

  const isCard = config.style === "card";
  const isBordered = config.style === "bordered";

  return (
    <section className="py-20 px-6" ref={ref}>
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

        <div className={`grid grid-cols-1 ${colsClass} gap-8`}>
          {config.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`p-8 ${isCard ? "rounded-2xl" : ""}`}
              style={{
                ...(isCard ? {
                  backgroundColor: "var(--color-cream)",
                  border: "1px solid color-mix(in srgb, var(--color-gold) 20%, transparent)",
                } : {}),
                ...(isBordered && i > 0 ? {
                  borderLeft: "2px solid var(--color-gold)",
                  borderLeftStyle: "solid" as const,
                } : {}),
              }}
            >
              <CounterItem item={item} duration={config.duration} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
