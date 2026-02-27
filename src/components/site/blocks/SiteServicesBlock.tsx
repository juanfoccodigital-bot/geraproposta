"use client";

import { Palette, Code, TrendingUp, Heart, Star, Zap, Shield, Users } from "lucide-react";
import type { SiteServicesData, ServiceItem } from "@/types/site";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Palette, Code, TrendingUp, Heart, Star, Zap, Shield, Users,
};

const colsMap = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

interface SiteServicesBlockProps {
  data: SiteServicesData;
  themeColors: { gold: string; foreground: string; beige: string };
}

function ServiceCard({ item, style, themeColors }: { item: ServiceItem; style: string; themeColors: SiteServicesBlockProps["themeColors"] }) {
  const Icon = iconMap[item.icon] || Star;

  if (style === "image" && item.image) {
    return (
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${themeColors.foreground}10` }}>
        <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-base mb-1" style={{ color: themeColors.foreground }}>{item.title}</h3>
          <p className="text-sm opacity-60" style={{ color: themeColors.foreground }}>{item.description}</p>
        </div>
      </div>
    );
  }

  if (style === "icon") {
    return (
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3" style={{ background: `${themeColors.gold}15` }}>
          <span style={{ color: themeColors.gold }}><Icon size={24} /></span>
        </div>
        <h3 className="font-semibold text-base mb-1" style={{ color: themeColors.foreground }}>{item.title}</h3>
        <p className="text-sm opacity-60" style={{ color: themeColors.foreground }}>{item.description}</p>
      </div>
    );
  }

  // card style (default)
  return (
    <div className="rounded-xl p-5" style={{ background: `${themeColors.foreground}05`, border: `1px solid ${themeColors.foreground}10` }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${themeColors.gold}15` }}>
        <span style={{ color: themeColors.gold }}><Icon size={20} /></span>
      </div>
      <h3 className="font-semibold text-base mb-1" style={{ color: themeColors.foreground }}>{item.title}</h3>
      <p className="text-sm opacity-60 leading-relaxed" style={{ color: themeColors.foreground }}>{item.description}</p>
    </div>
  );
}

export default function SiteServicesBlock({ data, themeColors }: SiteServicesBlockProps) {
  return (
    <div>
      {data.title && <h2 className="text-3xl font-bold mb-2" style={{ color: themeColors.foreground }}>{data.title}</h2>}
      {data.subtitle && <p className="text-base opacity-60 mb-8" style={{ color: themeColors.foreground }}>{data.subtitle}</p>}
      <div className={`grid grid-cols-1 ${colsMap[data.columns || 3]} gap-6`}>
        {data.items?.map((item, i) => (
          <ServiceCard key={i} item={item} style={data.style || "card"} themeColors={themeColors} />
        ))}
      </div>
    </div>
  );
}
