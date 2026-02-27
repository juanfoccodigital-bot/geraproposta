"use client";

import { useEffect } from "react";
import SiteRenderer from "@/components/site/SiteRenderer";
import type { SiteRecord } from "@/types/site";

export default function SiteViewer({ site }: { site: SiteRecord }) {
  // Track view
  useEffect(() => {
    fetch(`/api/sites/${site.id}/view`, { method: "POST" }).catch(() => {});
  }, [site.id]);

  // Load fonts
  useEffect(() => {
    const fonts = new Set<string>();
    if (site.config?.theme?.fonts?.heading) fonts.add(site.config.theme.fonts.heading);
    if (site.config?.theme?.fonts?.body) fonts.add(site.config.theme.fonts.body);
    fonts.delete("Inter");

    if (fonts.size > 0) {
      const families = Array.from(fonts).map((f) => `family=${f.replace(/ /g, "+").replace(/&/g, "%26")}:wght@400;500;600;700`).join("&");
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
      return () => { document.head.removeChild(link); };
    }
  }, [site.config?.theme?.fonts]);

  return <SiteRenderer config={site.config} />;
}
