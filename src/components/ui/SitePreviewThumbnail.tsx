"use client";

import { useRef, useState, useEffect } from "react";
import type { SiteConfig } from "@/types/site";
import SiteRenderer from "@/components/site/SiteRenderer";

interface SitePreviewThumbnailProps {
  config: SiteConfig;
  height?: number;
}

const RENDER_WIDTH = 1200;

export default function SitePreviewThumbnail({
  config,
  height = 192,
}: SitePreviewThumbnailProps) {
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
      { rootMargin: "100px" }
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
          <SiteRenderer config={config} />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: config.theme?.colors?.background || "#FFFFFF",
          }}
        />
      )}
    </div>
  );
}
