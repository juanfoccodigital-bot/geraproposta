"use client";

import { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";
import type { SiteConfig, SiteBlock, SiteBlockType, BlockLayout } from "@/types/site";
import type { ThemeColors, ThemeFonts } from "@/types/proposal";
import { getSiteBlockDefault, defaultLayout } from "@/lib/site-defaults";

/* ============================================
   SITE EDITOR CONTEXT
   Estado global do editor de sites.
   useReducer + undo/redo.
   ============================================ */

interface SiteEditorState {
  config: SiteConfig;
  activeTab: "content" | "design" | "sections" | "nav";
  activeBlockId: string | null;
  previewViewport: "mobile" | "tablet" | "desktop";
  siteId: string | null;
  slug: string | null;
  title: string;
  history: SiteConfig[];
  historyIndex: number;
  isDirty: boolean;
}

const emptyConfig: SiteConfig = {
  version: 2,
  templateId: "",
  meta: { title: "", description: "" },
  theme: { colors: { gold: "#C9A96E", goldLight: "#D4BA88", goldDark: "#B8944F", background: "#FFFFFF", foreground: "#1A1A1A", beige: "#F5F0EB", nude: "#E8DDD3", cream: "#FAF7F4" }, fonts: { heading: "Inter", body: "Inter" } },
  nav: { style: "topbar", sticky: true, logo: "", links: [] },
  globalStyles: { maxWidth: "1200", sectionSpacing: "md" },
  blocks: [],
};

const initialState: SiteEditorState = {
  config: emptyConfig,
  activeTab: "content",
  activeBlockId: null,
  previewViewport: "desktop",
  siteId: null,
  slug: null,
  title: "Meu Site",
  history: [emptyConfig],
  historyIndex: 0,
  isDirty: false,
};

type SiteAction =
  | { type: "SET_CONFIG"; payload: SiteConfig }
  | { type: "SET_META"; payload: { siteId: string; slug: string; title: string } }
  | { type: "UPDATE_COLORS"; payload: Partial<ThemeColors> }
  | { type: "UPDATE_FONTS"; payload: Partial<ThemeFonts> }
  | { type: "UPDATE_BLOCK_DATA"; blockId: string; payload: Record<string, unknown> }
  | { type: "UPDATE_BLOCK_LAYOUT"; blockId: string; payload: Partial<BlockLayout> }
  | { type: "TOGGLE_BLOCK"; blockId: string }
  | { type: "REORDER_BLOCKS"; payload: SiteBlock[] }
  | { type: "ADD_BLOCK"; payload: { type: SiteBlockType; afterBlockId?: string } }
  | { type: "REMOVE_BLOCK"; blockId: string }
  | { type: "SET_ACTIVE_TAB"; payload: SiteEditorState["activeTab"] }
  | { type: "SET_ACTIVE_BLOCK"; payload: string | null }
  | { type: "SET_VIEWPORT"; payload: SiteEditorState["previewViewport"] }
  | { type: "UPDATE_NAV"; payload: Partial<SiteConfig["nav"]> }
  | { type: "UPDATE_SITE_META"; payload: Partial<SiteConfig["meta"]> }
  | { type: "SET_TITLE"; payload: string }
  | { type: "MARK_CLEAN" }
  | { type: "UNDO" }
  | { type: "REDO" };

function pushHistory(state: SiteEditorState, newConfig: SiteConfig): Partial<SiteEditorState> {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(newConfig);
  if (newHistory.length > 50) newHistory.shift();
  return { history: newHistory, historyIndex: newHistory.length - 1 };
}

function siteReducer(state: SiteEditorState, action: SiteAction): SiteEditorState {
  switch (action.type) {
    case "SET_CONFIG":
      return { ...state, config: action.payload, history: [action.payload], historyIndex: 0, isDirty: false };
    case "SET_META":
      return { ...state, siteId: action.payload.siteId, slug: action.payload.slug, title: action.payload.title };
    case "UPDATE_COLORS": {
      const newConfig = { ...state.config, theme: { ...state.config.theme, colors: { ...state.config.theme.colors, ...action.payload } } };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "UPDATE_FONTS": {
      const newConfig = { ...state.config, theme: { ...state.config.theme, fonts: { ...state.config.theme.fonts, ...action.payload } } };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "UPDATE_BLOCK_DATA": {
      const blocks = state.config.blocks.map((b) =>
        b.id === action.blockId ? { ...b, data: { ...b.data, ...action.payload } } : b,
      );
      const newConfig = { ...state.config, blocks };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "UPDATE_BLOCK_LAYOUT": {
      const blocks = state.config.blocks.map((b) =>
        b.id === action.blockId ? { ...b, layout: { ...b.layout, ...action.payload } } : b,
      );
      const newConfig = { ...state.config, blocks };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "TOGGLE_BLOCK": {
      const blocks = state.config.blocks.map((b) =>
        b.id === action.blockId ? { ...b, visible: !b.visible } : b,
      );
      const newConfig = { ...state.config, blocks };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "REORDER_BLOCKS": {
      const newConfig = { ...state.config, blocks: action.payload };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "ADD_BLOCK": {
      const newBlock: SiteBlock = {
        id: `blk-${Date.now().toString(36)}`,
        type: action.payload.type,
        visible: true,
        data: getSiteBlockDefault(action.payload.type),
        layout: { ...defaultLayout },
      };
      const blocks = [...state.config.blocks];
      if (action.payload.afterBlockId) {
        const idx = blocks.findIndex((b) => b.id === action.payload.afterBlockId);
        blocks.splice(idx + 1, 0, newBlock);
      } else {
        // Insert before footer if exists
        const footerIdx = blocks.findIndex((b) => b.type === "site-footer");
        if (footerIdx >= 0) blocks.splice(footerIdx, 0, newBlock);
        else blocks.push(newBlock);
      }
      const newConfig = { ...state.config, blocks };
      return { ...state, config: newConfig, isDirty: true, activeBlockId: newBlock.id, ...pushHistory(state, newConfig) };
    }
    case "REMOVE_BLOCK": {
      const blocks = state.config.blocks.filter((b) => b.id !== action.blockId);
      const newConfig = { ...state.config, blocks };
      return {
        ...state,
        config: newConfig,
        isDirty: true,
        activeBlockId: state.activeBlockId === action.blockId ? null : state.activeBlockId,
        ...pushHistory(state, newConfig),
      };
    }
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_ACTIVE_BLOCK":
      return { ...state, activeBlockId: action.payload };
    case "SET_VIEWPORT":
      return { ...state, previewViewport: action.payload };
    case "UPDATE_NAV": {
      const newConfig = { ...state.config, nav: { ...state.config.nav, ...action.payload } };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "UPDATE_SITE_META": {
      const newConfig = { ...state.config, meta: { ...state.config.meta, ...action.payload } };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "SET_TITLE":
      return { ...state, title: action.payload, isDirty: true };
    case "MARK_CLEAN":
      return { ...state, isDirty: false };
    case "UNDO": {
      if (state.historyIndex <= 0) return state;
      const i = state.historyIndex - 1;
      return { ...state, config: state.history[i], historyIndex: i, isDirty: true };
    }
    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) return state;
      const i = state.historyIndex + 1;
      return { ...state, config: state.history[i], historyIndex: i, isDirty: true };
    }
    default:
      return state;
  }
}

const SiteEditorContext = createContext<{ state: SiteEditorState; dispatch: Dispatch<SiteAction> }>({ state: initialState, dispatch: () => {} });

export function SiteEditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(siteReducer, initialState);
  return (
    <SiteEditorContext.Provider value={{ state, dispatch }}>
      {children}
    </SiteEditorContext.Provider>
  );
}

export function useSiteEditor() {
  return useContext(SiteEditorContext);
}
