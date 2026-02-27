"use client";

import {
  Globe, Briefcase, Mail, ShoppingBag, Music, Camera, BookOpen, Heart, Star,
  ExternalLink, Calendar, GraduationCap, Headphones, Play, MessageCircle,
  Tv, Download, FileText, Image, Palette, Target, Ticket, BarChart, Mic,
  Users, Building, Linkedin,
} from "lucide-react";
import type { LinksData, LinkItem } from "@/types/biolink";
import type { BiolinkTheme } from "@/types/biolink";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Globe, Briefcase, Mail, ShoppingBag, Music, Camera, BookOpen, Heart, Star,
  ExternalLink, Calendar, GraduationCap, Headphones, Play, MessageCircle,
  Tv, Download, FileText, Image, Palette, Target, Ticket, BarChart, Mic,
  Users, Building, Linkedin,
};

function LinkButton({ item, theme }: { item: LinkItem; theme: BiolinkTheme }) {
  if (!item.enabled) return null;

  const Icon = iconMap[item.icon] || Globe;
  const effects = theme.effects;
  const hasGlow = effects?.buttonGlow;
  const hasShimmer = effects?.buttonShimmer;

  const styles: React.CSSProperties = {};
  if (theme.buttonStyle === "filled") {
    styles.background = theme.buttonColor;
    styles.color = theme.buttonTextColor;
  } else if (theme.buttonStyle === "outline") {
    styles.border = `2px solid ${theme.buttonColor}`;
    styles.color = theme.buttonColor;
    styles.background = "transparent";
  } else if (theme.buttonStyle === "ghost") {
    styles.background = `${theme.buttonColor}15`;
    styles.color = theme.buttonColor;
  } else if (theme.buttonStyle === "rounded") {
    styles.background = theme.buttonColor;
    styles.color = theme.buttonTextColor;
    styles.borderRadius = "9999px";
  }

  /* Glow effect — soft colored shadow */
  if (hasGlow) {
    (styles as Record<string, string>)["--bl-glow-color"] = theme.buttonColor;
    styles.animation = "biolink-glow-pulse 3s ease-in-out infinite";
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] w-full overflow-hidden"
      style={styles}
    >
      {/* Shimmer sweep overlay */}
      {hasShimmer && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            animation: "biolink-shimmer 2.5s ease-in-out infinite",
          }}
        />
      )}
      <Icon size={18} />
      <span className="flex-1 text-center">{item.title}</span>
    </a>
  );
}

export default function LinksBlock({ data, theme }: { data: LinksData; theme: BiolinkTheme }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {data.items?.map((item) => (
        <LinkButton key={item.id} item={item} theme={theme} />
      ))}
    </div>
  );
}
