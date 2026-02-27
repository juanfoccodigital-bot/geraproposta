"use client";

import { useEditor } from "@/contexts/EditorContext";
import ContentTab from "./tabs/ContentTab";
import ThemeTab from "./tabs/ThemeTab";
import SectionsTab from "./tabs/SectionsTab";
import { FileText, Palette, Layers } from "lucide-react";

/* ============================================
   EDITOR SIDEBAR
   Painel esquerdo com abas:
   - Conteúdo
   - Tema
   - Blocos
   ============================================ */

const tabs = [
  { id: "content" as const, label: "Conteúdo", icon: FileText },
  { id: "theme" as const, label: "Tema", icon: Palette },
  { id: "sections" as const, label: "Blocos", icon: Layers },
];

export default function EditorSidebar() {
  const { state, dispatch } = useEditor();

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] border-r border-white/10">
      {/* Abas */}
      <div className="flex border-b border-white/10 flex-shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = state.activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-tour={`sidebar-tab-${tab.id}`}
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_TAB", payload: tab.id })
              }
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all border-b-2 cursor-pointer ${
                active
                  ? "border-[#F97316] text-white"
                  : "border-transparent text-white/40 hover:text-white/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Conteúdo da aba ativa */}
      <div className="flex-1 overflow-y-auto">
        {state.activeTab === "content" && <ContentTab />}
        {state.activeTab === "theme" && <ThemeTab />}
        {state.activeTab === "sections" && <SectionsTab />}
      </div>
    </div>
  );
}
