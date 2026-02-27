"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import { siteBlockLabels } from "@/types/site";
import type { SiteBlock } from "@/types/site";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ImageUpload from "@/components/editor/controls/ImageUpload";

// Block-specific editors
import NavbarEditor from "./blocks/NavbarEditor";
import HeroEditor from "./blocks/HeroEditor";
import AboutEditor from "./blocks/AboutEditor";
import ServicesEditor from "./blocks/ServicesEditor";
import ContactEditor from "./blocks/ContactEditor";
import FaqEditor from "./blocks/FaqEditor";
import TeamEditor from "./blocks/TeamEditor";
import PricingEditor from "./blocks/PricingEditor";
import BannerEditor from "./blocks/BannerEditor";
import MapEditor from "./blocks/MapEditor";
import LogosEditor from "./blocks/LogosEditor";
import FooterEditor from "./blocks/FooterEditor";

/* ============================================
   Map block types to their specialized editors
   ============================================ */
const BLOCK_EDITORS: Record<string, React.ComponentType<{ block: SiteBlock }>> = {
  "site-navbar": NavbarEditor,
  "site-hero": HeroEditor,
  "site-about": AboutEditor,
  "site-services": ServicesEditor,
  "site-contact": ContactEditor,
  "site-faq": FaqEditor,
  "site-team": TeamEditor,
  "pricing-table": PricingEditor,
  "site-banner": BannerEditor,
  "site-map": MapEditor,
  "site-logos": LogosEditor,
  "site-footer": FooterEditor,
};

/* ============================================
   Generic fallback editor for blocks without
   a specialized editor (texto, imagem, etc.)
   ============================================ */
const IMAGE_FIELD_PATTERNS = ["image", "logo", "backgroundimage", "src", "avatar", "favicon", "photo"];

function isImageField(key: string): boolean {
  const lower = key.toLowerCase();
  return IMAGE_FIELD_PATTERNS.some((p) => lower.includes(p));
}

function GenericBlockEditor({ block }: { block: SiteBlock }) {
  const { dispatch } = useSiteEditor();
  const data = block.data as Record<string, unknown>;

  function update(key: string, value: unknown) {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId: block.id, payload: { [key]: value } });
  }

  const fields = Object.entries(data).filter(([, v]) => typeof v === "string" || typeof v === "number");

  if (fields.length === 0) return null;

  return (
    <div className="px-3 pb-3 space-y-2 border-t border-white/5">
      {fields.map(([key, value]) => (
        <div key={key}>
          <label className="text-[10px] text-white/30 uppercase mb-0.5 block">{key}</label>
          {typeof value === "string" && isImageField(key) ? (
            <ImageUpload
              value={value}
              onChange={(url) => update(key, url)}
              variant="dark"
            />
          ) : typeof value === "string" && (value as string).length > 80 ? (
            <textarea
              value={value as string}
              onChange={(e) => update(key, e.target.value)}
              rows={3}
              className="w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50 resize-none"
            />
          ) : (
            <input
              type={typeof value === "number" ? "number" : "text"}
              value={String(value)}
              onChange={(e) => update(key, typeof value === "number" ? Number(e.target.value) : e.target.value)}
              className="w-full px-2 py-1.5 rounded text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================
   Collapsible section wrapper
   ============================================ */
function SectionEditor({ block }: { block: SiteBlock }) {
  const [open, setOpen] = useState(false);

  const SpecificEditor = BLOCK_EDITORS[block.type];

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-sm font-medium text-white">{siteBlockLabels[block.type] || block.type}</span>
        {open ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
      </button>
      {open && (
        SpecificEditor ? (
          <div className="px-3 pb-3 space-y-2.5 border-t border-white/5">
            <SpecificEditor block={block} />
          </div>
        ) : (
          <GenericBlockEditor block={block} />
        )
      )}
    </div>
  );
}

/* ============================================
   SITE CONTENT TAB
   ============================================ */
export default function SiteContentTab() {
  const { state } = useSiteEditor();

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Conteudo por Secao</h3>
      {state.config.blocks.map((block) => (
        <SectionEditor key={block.id} block={block} />
      ))}
    </div>
  );
}
