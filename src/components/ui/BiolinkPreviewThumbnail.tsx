"use client";

import { useRef, useState, useEffect } from "react";
import type { BiolinkConfig } from "@/types/biolink";
import BiolinkRenderer from "@/components/biolink/BiolinkRenderer";

interface BiolinkPreviewThumbnailProps {
  config: BiolinkConfig;
  height?: number;
}

const RENDER_WIDTH = 480;
const MOBILE_BREAKPOINT = 768;

export default function BiolinkPreviewThumbnail({
  config,
  height = 192,
}: BiolinkPreviewThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0.25);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(w / RENDER_WIDTH);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const bgColor =
    config.theme.backgroundType === "gradient"
      ? undefined
      : config.theme.background || "#FFFFFF";

  const bgGradient =
    config.theme.backgroundType === "gradient"
      ? config.theme.backgroundValue
      : undefined;

  // Mobile: static background only (no heavy BiolinkRenderer)
  if (isMobile) {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{ height, background: bgGradient || bgColor || "#FFFFFF" }}
      >
        {/* Static preview: show avatar name + button color hint */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
          <div
            className="w-12 h-12 rounded-full"
            style={{ background: config.theme.buttonColor, opacity: 0.3 }}
          />
          <div
            className="w-24 h-2 rounded-full"
            style={{ background: config.theme.textColor, opacity: 0.15 }}
          />
          <div
            className="w-20 h-6 rounded-lg"
            style={{ background: config.theme.buttonColor, opacity: 0.25 }}
          />
          <div
            className="w-20 h-6 rounded-lg"
            style={{ background: config.theme.buttonColor, opacity: 0.15 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height, contain: "layout style paint" }}
    >
      {isVisible ? (
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: RENDER_WIDTH,
            transform: `scale(${scale})`,
            pointerEvents: "none",
          }}
        >
          <BiolinkRenderer config={config} preview />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: bgGradient || bgColor || "#FFFFFF",
          }}
        />
      )}
    </div>
  );
}
