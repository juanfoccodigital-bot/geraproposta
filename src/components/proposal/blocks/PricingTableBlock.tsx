"use client";

import type { PricingTableData } from "@/types/proposal";
import { motion } from "framer-motion";
import { CheckCircle, Zap } from "lucide-react";

export default function PricingTableBlock({ config }: { config: PricingTableData }) {
  const planCount = config.plans.length;
  const colsClass = planCount <= 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3 max-w-6xl";

  return (
    <section className="py-20 px-6">
      <div className={`${colsClass} mx-auto`}>
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

        <div className={`grid grid-cols-1 ${colsClass.split(" ")[0]} gap-6 items-stretch`}>
          {config.plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl p-8 flex flex-col relative overflow-hidden ${
                plan.highlighted ? "scale-[1.02] md:scale-105 z-10" : ""
              }`}
              style={{
                backgroundColor: plan.highlighted ? "var(--color-foreground)" : "var(--color-cream)",
                border: plan.highlighted
                  ? "2px solid var(--color-gold)"
                  : "1px solid color-mix(in srgb, var(--color-gold) 15%, transparent)",
                color: plan.highlighted ? "#fff" : "var(--color-foreground)",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className="absolute top-0 right-0 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-bl-xl"
                  style={{ backgroundColor: "var(--color-gold)", color: "#fff" }}
                >
                  {plan.badge}
                </span>
              )}

              {/* Plan name */}
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {plan.name}
              </h3>
              <p className="text-sm mb-6" style={{ opacity: 0.6 }}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium" style={{ opacity: 0.5 }}>
                    {plan.currency}
                  </span>
                  <span
                    className="text-5xl font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: plan.highlighted ? "var(--color-gold)" : "var(--color-gold)",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ opacity: 0.5 }}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px mb-6" style={{ backgroundColor: plan.highlighted ? "rgba(255,255,255,0.1)" : "color-mix(in srgb, var(--color-gold) 15%, transparent)" }} />

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <CheckCircle
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "var(--color-gold)" }}
                    />
                    <span style={{ opacity: 0.8 }}>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.ctaLabel && (
                <a
                  href={plan.ctaUrl || "#"}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{
                    backgroundColor: plan.highlighted ? "var(--color-gold)" : "transparent",
                    color: plan.highlighted ? "#fff" : "var(--color-gold)",
                    border: plan.highlighted ? "none" : "2px solid var(--color-gold)",
                  }}
                >
                  <Zap className="w-4 h-4" />
                  {plan.ctaLabel}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
