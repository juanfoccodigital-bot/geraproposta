"use client";

import { useRef, useState, useEffect, memo } from "react";
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

/* Memoized inner renderer to prevent re-renders on scroll */
const MemoRenderer = memo(function MemoRenderer({
  config,
  targetRef,
}: {
  config: ProposalConfig;
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  return <ProposalRenderer config={config} targetRef={targetRef} />;
});

export default function TemplatePreviewThumbnail({
  config,
  height = 192,
}: TemplatePreviewThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
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
      if (w > 0) {
        const newScale = w / RENDER_WIDTH;
        setScale((prev) => Math.abs(prev - newScale) > 0.001 ? newScale : prev);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const bg = config.theme.colors.background;
  const accent = config.theme.colors.gold || config.theme.colors.foreground;

  if (isMobile) {
    return (
      <div className="relative w-full overflow-hidden" style={{ height, background: bg }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-28 h-2 rounded-full" style={{ background: accent, opacity: 0.2 }} />
          <div className="w-20 h-1.5 rounded-full" style={{ background: accent, opacity: 0.1 }} />
          <div className="flex gap-2 mt-1">
            <div className="w-14 h-14 rounded-lg" style={{ background: accent, opacity: 0.08 }} />
            <div className="w-14 h-14 rounded-lg" style={{ background: accent, opacity: 0.08 }} />
          </div>
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
          ref={themeRef}
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: RENDER_WIDTH,
            transform: `scale(${scale})`,
            pointerEvents: "none",
          }}
        >
          <MemoRenderer config={config} targetRef={themeRef} />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: bg }}
        />
      )}
    </div>
  );
}
