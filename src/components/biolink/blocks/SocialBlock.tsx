"use client";

import { Instagram, Youtube, Linkedin, Twitter, Facebook, Github, Globe } from "lucide-react";
import type { SocialData } from "@/types/biolink";

const platformIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  github: Github,
  tiktok: Globe,
};

const sizeMap = { sm: 20, md: 24, lg: 30 };

export default function SocialBlock({ data }: { data: SocialData }) {
  const iconSize = sizeMap[data.size || "md"];

  return (
    <div className="flex items-center justify-center gap-4 py-2">
      {data.items?.map((item, i) => {
        const Icon = platformIcons[item.platform] || Globe;
        return (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
}
