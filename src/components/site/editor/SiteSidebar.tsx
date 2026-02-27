"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import SiteContentTab from "./SiteContentTab";
import SiteDesignTab from "./SiteDesignTab";
import SiteSectionsTab from "./SiteSectionsTab";
import { FileText, Palette, Layers } from "lucide-react";

const tabs = [
  { id: "content" as const, label: "Conteúdo", icon: FileText },
  { id: "design" as const, label: "Design", icon: Palette },
  { id: "sections" as const, label: "Seções", icon: Layers },
];

export default function SiteSidebar() {
  const { state, dispatch } = useSiteEditor();

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] border-r border-[#1A1A1A]">
      <div className="flex border-b border-[#1A1A1A] flex-shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = state.activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-tour={`sidebar-tab-${tab.id}`}
              onClick={() => dispatch({ type: "SET_ACTIVE_TAB", payload: tab.id })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all border-b-2 cursor-pointer ${
                active
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-transparent text-white/30 hover:text-white/50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto">
        {state.activeTab === "content" && <SiteContentTab />}
        {state.activeTab === "design" && <SiteDesignTab />}
        {state.activeTab === "sections" && <SiteSectionsTab />}
      </div>
    </div>
  );
}
