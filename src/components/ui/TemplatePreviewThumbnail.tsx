"use client";

import { useRef, useState, useEffect } from "react";
import { ProposalConfig } from "@/types/proposal";
import ProposalRenderer from "@/components/proposal/ProposalRenderer";

/* ============================================
   TEMPLATE PREVIEW THUMBNAIL
   Renders a real scaled-down ProposalRenderer
   inside a clipped container. Lazy-loads via
   IntersectionObserver for performance.
   ============================================ */

interface TemplatePreviewThumbnailProps {
  config: ProposalConfig;
  height?: number;
}

const RENDER_WIDTH = 1200;

export default function TemplatePreviewThumbnail({
  config,
  height = 192,
}: TemplatePreviewThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0.25);

  /* ── Lazy render: only mount ProposalRenderer when near viewport ── */
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

  /* ── Scale factor based on container width ── */
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
          ref={themeRef}
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: RENDER_WIDTH,
            transform: `scale(${scale})`,
            pointerEvents: "none",
          }}
        >
          <ProposalRenderer config={config} targetRef={themeRef} />
        </div>
      ) : (
        /* Placeholder with template bg color while loading */
        <div
          className="absolute inset-0"
          style={{ background: config.theme.colors.background }}
        />
      )}
    </div>
  );
}
