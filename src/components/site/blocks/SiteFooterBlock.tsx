"use client";

import { Instagram, Linkedin, Youtube, Twitter, Facebook, Github, Globe } from "lucide-react";
import type { SiteFooterData } from "@/types/site";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  facebook: Facebook,
  github: Github,
};

interface SiteFooterBlockProps {
  data: SiteFooterData;
  themeColors: { foreground: string; background: string };
}

export default function SiteFooterBlock({ data, themeColors }: SiteFooterBlockProps) {
  // Footer text is inverted — use background color for text on foreground bg
  const textColor = themeColors.background;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {data.columns?.map((col, i) => (
          <div key={i}>
            <h4 className="font-semibold text-sm mb-3" style={{ color: textColor }}>{col.title}</h4>
            <ul className="space-y-2">
              {col.links?.map((link, j) => (
                <li key={j}>
                  <a href={link.url} className="text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: textColor }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social */}
        {data.socialLinks?.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: textColor }}>Social</h4>
            <div className="flex gap-3">
              {data.socialLinks.map((s, i) => {
                const Icon = socialIcons[s.platform] || Globe;
                return (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: textColor }}>
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {data.copyright && (
        <div className="border-t pt-6" style={{ borderColor: `${textColor}15` }}>
          <p className="text-xs opacity-40" style={{ color: textColor }}>{data.copyright}</p>
        </div>
      )}
    </div>
  );
}
