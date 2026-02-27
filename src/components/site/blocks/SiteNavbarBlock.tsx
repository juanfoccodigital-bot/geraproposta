"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteNavbarData } from "@/types/site";

interface SiteNavbarBlockProps {
  data: SiteNavbarData;
  themeColors: { gold: string; background: string; foreground: string };
}

export default function SiteNavbarBlock({ data, themeColors }: SiteNavbarBlockProps) {
  const [open, setOpen] = useState(false);

  // Hide header if toggled off
  if (data.showHeader === false) return null;

  const bgStyle: React.CSSProperties = {};
  if (data.style === "solid") {
    bgStyle.background = themeColors.background;
    bgStyle.borderBottom = `1px solid ${themeColors.foreground}15`;
  } else if (data.style === "glass") {
    bgStyle.background = `${themeColors.background}CC`;
    bgStyle.backdropFilter = "blur(12px)";
  }

  const logoDisplay = data.logoDisplay || "image";
  const align = data.align || "spread";

  // Render logo based on display mode
  const renderLogo = () => {
    const showImage = (logoDisplay === "image" || logoDisplay === "both") && data.logo;
    const showText = logoDisplay === "text" || logoDisplay === "both";

    return (
      <div className="flex items-center gap-2">
        {showImage && <img src={data.logo} alt="Logo" className="h-8 w-auto" />}
        {showText && (
          <span className="font-bold text-lg" style={{ color: themeColors.foreground }}>
            {data.logoText}
          </span>
        )}
      </div>
    );
  };

  // Desktop layout classes based on alignment
  const getLayoutClasses = () => {
    if (align === "center") return "flex flex-col items-center gap-2 py-3";
    return "flex items-center justify-between h-16";
  };

  return (
    <nav className="sticky top-0 z-50 w-full" style={bgStyle}>
      <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 ${getLayoutClasses()}`}>
        {/* Logo */}
        {renderLogo()}

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {data.links?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: themeColors.foreground }}
            >
              {link.label}
            </a>
          ))}
          {data.ctaText && (
            <a
              href={data.ctaUrl || "#"}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: themeColors.gold, color: "#FFFFFF" }}
            >
              {data.ctaText}
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 absolute right-4 top-4" style={{ color: themeColors.foreground }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-3" style={{ borderColor: `${themeColors.foreground}15`, background: themeColors.background }}>
          {data.links?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium"
              style={{ color: themeColors.foreground }}
            >
              {link.label}
            </a>
          ))}
          {data.ctaText && (
            <a
              href={data.ctaUrl || "#"}
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: themeColors.gold, color: "#FFFFFF" }}
            >
              {data.ctaText}
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
