"use client";

import type { TimelineData } from "@/types/proposal";
import { motion } from "framer-motion";
import { resolveIcon } from "@/lib/icons";

export default function TimelineBlock({ config }: { config: TimelineData }) {
  const isAlternating = config.layout === "alternating";

  const connectorClass =
    config.connectorStyle === "dashed" ? "border-dashed" :
    config.connectorStyle === "dots" ? "border-dotted" :
    "border-solid";

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
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
          <p className="text-center mb-16 max-w-2xl mx-auto" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
            {config.subtitle}
          </p>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div
            className={`absolute ${isAlternating ? "left-1/2 -translate-x-px" : "left-6"} top-0 bottom-0 w-0.5 ${connectorClass}`}
            style={{ borderColor: "var(--color-gold)", borderWidth: "0 0 0 2px", opacity: 0.3 }}
          />

          <div className="space-y-12">
            {config.items.map((item, i) => {
              const Icon = resolveIcon(item.icon);
              const isRight = isAlternating && i % 2 === 1;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`relative flex items-start gap-6 ${
                    isAlternating
                      ? `md:flex-row ${isRight ? "md:flex-row-reverse" : ""} md:gap-12`
                      : "pl-16"
                  }`}
                >
                  {/* Dot on the line */}
                  <div
                    className={`absolute ${
                      isAlternating ? "left-1/2 -translate-x-1/2" : "left-4 -translate-x-1/2"
                    } w-5 h-5 rounded-full border-4 z-10`}
                    style={{
                      borderColor: "var(--color-gold)",
                      backgroundColor: "var(--color-background)",
                    }}
                  />

                  {/* Content card */}
                  <div
                    className={`flex-1 rounded-2xl p-6 ${
                      isAlternating ? `md:w-[calc(50%-2rem)] ${isRight ? "md:text-right" : ""}` : ""
                    }`}
                    style={{
                      backgroundColor: "var(--color-cream)",
                      border: "1px solid color-mix(in srgb, var(--color-gold) 15%, transparent)",
                    }}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${isRight ? "md:flex-row-reverse" : ""}`}>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "color-mix(in srgb, var(--color-gold) 15%, transparent)" }}
                      >
                        <Icon className="w-5 h-5" style={{ color: "var(--color-gold)" }} />
                      </div>
                      <span
                        className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--color-gold) 10%, transparent)",
                          color: "var(--color-gold)",
                        }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Spacer for alternating layout */}
                  {isAlternating && <div className="hidden md:block flex-1" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
