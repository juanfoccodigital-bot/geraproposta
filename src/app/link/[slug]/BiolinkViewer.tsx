"use client";

import { useEffect } from "react";
import BiolinkRenderer from "@/components/biolink/BiolinkRenderer";
import type { BiolinkRecord } from "@/types/biolink";

interface BiolinkViewerProps {
  biolink: BiolinkRecord;
}

export default function BiolinkViewer({ biolink }: BiolinkViewerProps) {
  // Track view on mount
  useEffect(() => {
    fetch(`/api/biolinks/${biolink.id}/view`, { method: "POST" }).catch(() => {});
  }, [biolink.id]);

  // Load Google Font if needed
  useEffect(() => {
    const font = biolink.config?.theme?.font;
    if (font && font !== "Inter") {
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}:wght@400;500;600;700&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
      return () => { document.head.removeChild(link); };
    }
  }, [biolink.config?.theme?.font]);

  return <BiolinkRenderer config={biolink.config} />;
}
