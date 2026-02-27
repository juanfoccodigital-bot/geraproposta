"use client";

import { useRef, useState, useEffect } from "react";
import type { BiolinkConfig } from "@/types/biolink";
import BiolinkRenderer from "@/components/biolink/BiolinkRenderer";

interface BiolinkPreviewThumbnailProps {
  config: BiolinkConfig;
  height?: number;
}

const RENDER_WIDTH = 480;

export default function BiolinkPreviewThumbnail({
  config,
  height = 192,
}: BiolinkPreviewThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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
  }, []);

  const bgColor =
    config.theme.backgroundType === "gradient"
      ? undefined
      : config.theme.background || "#FFFFFF";

  const bgGradient =
    config.theme.backgroundType === "gradient"
      ? config.theme.backgroundValue
      : undefined;

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
