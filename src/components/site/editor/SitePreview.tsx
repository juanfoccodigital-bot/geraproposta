"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import SiteRenderer from "../SiteRenderer";
import PreviewFrame from "@/components/ui/PreviewFrame";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useDebounce } from "@/lib/useDebounce";

const viewports = [
  { id: "desktop" as const, icon: Monitor, width: 1280, label: "Desktop" },
  { id: "tablet" as const, icon: Tablet, width: 768, label: "Tablet" },
  { id: "mobile" as const, icon: Smartphone, width: 375, label: "Mobile" },
];

export default function SitePreview() {
  const { state, dispatch } = useSiteEditor();
  const debouncedConfig = useDebounce(state.config, 300);
  const vp = state.previewViewport;
  const isDesktop = vp === "desktop";
  const currentViewport = viewports.find((v) => v.id === vp)!;

  return (
    <div className="h-full flex flex-col bg-[#0F0F0F]">
      {/* Viewport switcher */}
      <div className="flex items-center justify-center gap-2 py-2 border-b border-[#1A1A1A] flex-shrink-0">
        {viewports.map((v) => {
          const Icon = v.icon;
          return (
            <button
              key={v.id}
              onClick={() => dispatch({ type: "SET_VIEWPORT", payload: v.id })}
              className={`p-2 rounded-lg transition-colors ${
                vp === v.id ? "bg-white/10 text-white" : "text-white/30 hover:text-white/50"
              }`}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto flex justify-center p-4">
        {isDesktop ? (
          <div
            className="border border-[#1A1A1A] rounded-lg overflow-y-auto bg-white transition-all w-full"
            style={{ maxWidth: 1280, minHeight: "100%" }}
          >
            <SiteRenderer config={debouncedConfig} />
          </div>
        ) : (
          <PreviewFrame
            width={currentViewport.width}
            className="border border-[#1A1A1A] rounded-lg bg-white"
          >
            <SiteRenderer config={debouncedConfig} />
          </PreviewFrame>
        )}
      </div>
    </div>
  );
}
