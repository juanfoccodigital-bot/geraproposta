"use client";

import { MessageCircle, Mail } from "lucide-react";
import type { SiteContactData } from "@/types/site";

interface SiteContactBlockProps {
  data: SiteContactData;
  themeColors: { gold: string; foreground: string };
}

export default function SiteContactBlock({ data, themeColors }: SiteContactBlockProps) {
  const whatsappUrl = data.whatsappNumber
    ? `https://wa.me/${data.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(data.whatsappMessage || "")}`
    : "#";

  return (
    <div className="max-w-xl mx-auto">
      {data.title && <h2 className="text-3xl font-bold mb-2" style={{ color: themeColors.foreground }}>{data.title}</h2>}
      {data.subtitle && <p className="text-base opacity-60 mb-8" style={{ color: themeColors.foreground }}>{data.subtitle}</p>}

      <div className="flex flex-col gap-4">
        {(data.mode === "whatsapp" || data.mode === "both") && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-base text-white transition-opacity hover:opacity-90"
            style={{ background: "#25D366" }}
          >
            <MessageCircle size={20} />
            Fale pelo WhatsApp
          </a>
        )}

        {(data.mode === "form" || data.mode === "both") && data.email && (
          <a
            href={`mailto:${data.email}`}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-base transition-opacity hover:opacity-90"
            style={{ background: themeColors.gold, color: "#FFFFFF" }}
          >
            <Mail size={20} />
            Enviar Email
          </a>
        )}
      </div>
    </div>
  );
}
