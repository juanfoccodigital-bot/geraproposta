"use client";

import { useEditor } from "@/contexts/EditorContext";
import ProposalRenderer from "@/components/proposal/ProposalRenderer";
import PreviewFrame from "@/components/ui/PreviewFrame";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useDebounce } from "@/lib/useDebounce";

/* ============================================
   EDITOR PREVIEW
   Painel direito com preview ao vivo da proposta
   e controles de viewport (mobile/tablet/desktop)
   Usa iframe para mobile/tablet para que
   media queries respondam ao viewport correto
   ============================================ */

const viewports = [
  { id: "mobile" as const, icon: Smartphone, width: 375, label: "Mobile" },
  { id: "tablet" as const, icon: Tablet, width: 768, label: "Tablet" },
  { id: "desktop" as const, icon: Monitor, width: 0, label: "Desktop" },
];

export default function EditorPreview() {
  const { state, dispatch } = useEditor();
  const debouncedConfig = useDebounce(state.config, 300);

  const currentViewport = viewports.find(
    (v) => v.id === state.previewViewport
  )!;

  const isDesktop = currentViewport.id === "desktop";

  return (
    <div className="flex flex-col h-full bg-[#0F0F0F]">
      {/* Controles de viewport */}
      <div className="flex items-center justify-center gap-1 py-2 px-4 bg-[#111] border-b border-white/10 flex-shrink-0">
        {viewports.map((vp) => {
          const Icon = vp.icon;
          const active = state.previewViewport === vp.id;
          return (
            <button
              key={vp.id}
              onClick={() =>
                dispatch({ type: "SET_VIEWPORT", payload: vp.id })
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                active
                  ? "bg-[#F97316] text-white"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
              title={vp.label}
            >
              <Icon className="w-3.5 h-3.5" />
              {vp.label}
            </button>
          );
        })}
      </div>

      {/* Preview container */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        {isDesktop ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden overflow-y-auto h-full w-full">
            <ProposalRenderer config={debouncedConfig} />
          </div>
        ) : (
          <div className="flex justify-center w-full h-full">
            <PreviewFrame
              width={currentViewport.width}
              className="bg-white shadow-lg rounded-lg"
            >
              <ProposalRenderer config={debouncedConfig} />
            </PreviewFrame>
          </div>
        )}
      </div>
    </div>
  );
}
