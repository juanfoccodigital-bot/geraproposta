"use client";

import { useRef, useEffect, useState, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

/* ============================================
   PREVIEW FRAME
   Renderiza conteudo dentro de um iframe para
   que media queries (sm:, md:, lg:) respondam
   ao tamanho do iframe, nao do viewport real.
   ============================================ */

const CSS_PROPS_TO_SYNC = [
  "--gold", "--gold-light", "--gold-dark", "--background", "--foreground",
  "--beige", "--nude", "--cream",
  "--color-foreground", "--color-gold", "--color-gold-light", "--color-gold-dark",
  "--color-background", "--color-beige", "--color-nude", "--color-cream",
  "--font-heading", "--font-body", "--font-sans", "--font-serif",
];

interface PreviewFrameProps {
  width: number;
  children: ReactNode;
  className?: string;
}

export default function PreviewFrame({ width, children, className }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);

  const syncCssVars = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;

    const parentStyles = getComputedStyle(document.documentElement);
    CSS_PROPS_TO_SYNC.forEach((prop) => {
      const val = parentStyles.getPropertyValue(prop);
      if (val) doc.documentElement.style.setProperty(prop, val);
    });
  }, []);

  const syncStyles = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;

    // Remove previously synced elements
    doc.querySelectorAll("[data-synced]").forEach((el) => el.remove());

    // Copy all stylesheets and style tags from parent
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.setAttribute("data-synced", "true");
      doc.head.appendChild(clone);
    });

    // Copy CSS custom properties (theme colors, fonts) from parent :root
    syncCssVars();
  }, [syncCssVars]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let headObserver: MutationObserver | undefined;
    let rootObserver: MutationObserver | undefined;

    const initIframe = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      doc.body.style.margin = "0";
      doc.body.style.overflowX = "hidden";

      syncStyles();

      // Watch parent <head> for new/updated styles (HMR in dev)
      headObserver = new MutationObserver(syncStyles);
      headObserver.observe(document.head, { childList: true, subtree: true });

      // Watch parent <html> style attribute for CSS variable changes
      // (ThemeInjector updates variables via element.style.setProperty)
      rootObserver = new MutationObserver(syncCssVars);
      rootObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["style"],
      });

      setIframeBody(doc.body);
    };

    iframe.addEventListener("load", initIframe);
    iframe.srcdoc = '<!DOCTYPE html><html><head></head><body></body></html>';

    return () => {
      iframe.removeEventListener("load", initIframe);
      headObserver?.disconnect();
      rootObserver?.disconnect();
    };
  }, [syncStyles, syncCssVars]);

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Preview"
        className={className}
        style={{
          width,
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
      {iframeBody && createPortal(children, iframeBody)}
    </>
  );
}
