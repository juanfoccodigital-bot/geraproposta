"use client";

import { Globe, Clock } from "lucide-react";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import SitePreviewThumbnail from "@/components/ui/SitePreviewThumbnail";

/* ============================================
   SITE TEMPLATES PREVIEW — "Em breve"
   Mostra apenas 3 templates com fade escuro
   e texto "Em breve" por cima.
   ============================================ */

const PREVIEW_COUNT = 3;

export default function SiteTemplatesPreview() {
  const previews = SITE_TEMPLATES.slice(0, PREVIEW_COUNT);

  return (
    <section className="py-12 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#6366F1" }}>
            <Globe size={18} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Templates de Sites
              </h2>
              <span className="text-[10px] px-2.5 py-1 rounded-full font-bold" style={{ background: "#F97316", color: "#FFF" }}>
                Em breve
              </span>
            </div>
            <p className="text-sm" style={{ color: "#737373" }}>
              Landing pages profissionais por categoria.
            </p>
          </div>
        </div>

        {/* Grid com fade */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-none select-none">
            {previews.map((tmpl) => (
              <div
                key={tmpl.id}
                className="rounded-2xl border overflow-hidden"
                style={{ background: "#111111", borderColor: "#262626", opacity: 0.4 }}
              >
                <SitePreviewThumbnail config={tmpl.config} height={192} />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-1">{tmpl.name}</h3>
                  <p className="text-xs line-clamp-1" style={{ color: "#737373" }}>{tmpl.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fade overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(to top, #0A0A0A 0%, #0A0A0Acc 40%, #0A0A0A88 70%, transparent 100%)",
            }}
          >
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ background: "#111111", border: "1px solid #262626" }}>
              <Clock size={20} style={{ color: "#6366F1" }} />
              <div>
                <p className="text-base font-bold text-white">Em breve</p>
                <p className="text-xs" style={{ color: "#737373" }}>Sites profissionais com dominio proprio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
