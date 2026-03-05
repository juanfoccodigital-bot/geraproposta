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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

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

  const bg = config.theme?.colors?.background || "#FFFFFF";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors = config.theme?.colors as any;
  const accent = colors?.accent || colors?.foreground || "#333333";

  if (isMobile) {
    return (
      <div className="relative w-full overflow-hidden" style={{ height, background: bg }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-28 h-2 rounded-full" style={{ background: accent, opacity: 0.2 }} />
          <div className="w-20 h-1.5 rounded-full" style={{ background: accent, opacity: 0.1 }} />
          <div className="w-16 h-6 rounded-md" style={{ background: accent, opacity: 0.15 }} />
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
          <SiteRenderer config={config} />
        </div>
      ) : (
        <div className="absolute inset-0" style={{ background: bg }} />
      )}
    </div>
  );
}
