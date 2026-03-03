"use client";

import type { BeforeAfterData } from "@/types/proposal";
import { motion } from "framer-motion";
import { X, Check, GripVertical } from "lucide-react";
import { useState, useCallback } from "react";

function SliderView({ config }: { config: BeforeAfterData }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  return (
    <div
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
      }}
      onMouseMove={(e) => {
        if (!isDragging) return;
        handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
      }}
      onTouchMove={(e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
      }}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After (full image behind) */}
      <div className="absolute inset-0">
        {config.afterImage ? (
          <img src={config.afterImage} alt={config.afterLabel} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "var(--color-cream)" }}>
            <span className="text-sm opacity-30">{config.afterLabel}</span>
          </div>
        )}
        <span
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase"
          style={{ backgroundColor: "var(--color-gold)", color: "#fff" }}
        >
          {config.afterLabel}
        </span>
      </div>

      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {config.beforeImage ? (
          <img
            src={config.beforeImage}
            alt={config.beforeLabel}
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(30%) brightness(0.9)" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-200">
            <span className="text-sm opacity-30">{config.beforeLabel}</span>
          </div>
        )}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase bg-zinc-700 text-white">
          {config.beforeLabel}
        </span>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 z-10"
        style={{ left: `${position}%`, backgroundColor: "#fff", transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5 text-zinc-500" />
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterBlock({ config }: { config: BeforeAfterData }) {
  const isSlider = config.layout === "slider";

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
          <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
            {config.subtitle}
          </p>
        )}

        {isSlider ? (
          <SliderView config={config} />
        ) : (
          /* Side by side */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                {config.beforeImage ? (
                  <img
                    src={config.beforeImage}
                    alt={config.beforeLabel}
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(30%) brightness(0.9)" }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                    <span className="text-sm opacity-30">Imagem &quot;Antes&quot;</span>
                  </div>
                )}
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-zinc-200 text-zinc-700 mb-3">
                {config.beforeLabel}
              </span>
              <ul className="space-y-2">
                {config.beforeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
                    <X className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                {config.afterImage ? (
                  <img
                    src={config.afterImage}
                    alt={config.afterLabel}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "var(--color-cream)" }}>
                    <span className="text-sm opacity-30">Imagem &quot;Depois&quot;</span>
                  </div>
                )}
              </div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-3"
                style={{ backgroundColor: "var(--color-gold)", color: "#fff" }}
              >
                {config.afterLabel}
              </span>
              <ul className="space-y-2">
                {config.afterItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
