"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import ProfileTab from "./ProfileTab";
import ThemeTab from "./ThemeTab";
import BlocksTab from "./BlocksTab";
import { User, Palette, Layers } from "lucide-react";

const tabs = [
  { id: "profile" as const, label: "Perfil", icon: User },
  { id: "blocks" as const, label: "Blocos", icon: Layers },
  { id: "theme" as const, label: "Tema", icon: Palette },
];

interface BiolinkSidebarProps {
  isPremium: boolean;
}

export default function BiolinkSidebar({ isPremium }: BiolinkSidebarProps) {
  const { state, dispatch } = useBiolinkEditor();

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] border-r border-[#1A1A1A]">
      {/* Tabs */}
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

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {state.activeTab === "profile" && <ProfileTab isPremium={isPremium} />}
        {state.activeTab === "blocks" && <BlocksTab isPremium={isPremium} />}
        {state.activeTab === "theme" && <ThemeTab isPremium={isPremium} />}
      </div>
    </div>
  );
}
