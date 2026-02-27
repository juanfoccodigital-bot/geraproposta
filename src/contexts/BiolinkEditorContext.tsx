"use client";

import { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";
import type { BiolinkConfig, BiolinkBlock, BiolinkBlockType, BiolinkTheme } from "@/types/biolink";
import { getBiolinkBlockDefault } from "@/lib/biolink-defaults";

/* ============================================
   BIOLINK EDITOR CONTEXT
   Estado global do editor de biolinks.
   useReducer + undo/redo.
   ============================================ */

// ── Estado ──
interface BiolinkEditorState {
  config: BiolinkConfig;
  activeTab: "profile" | "links" | "blocks" | "theme";
  activeBlockId: string | null;
  biolinkId: string | null;
  slug: string | null;
  title: string;
  history: BiolinkConfig[];
  historyIndex: number;
  isDirty: boolean;
}

const defaultConfig: BiolinkConfig = {
  theme: {
    background: "#FFFFFF",
    backgroundType: "solid",
    backgroundValue: "#FFFFFF",
    textColor: "#1A1A1A",
    buttonStyle: "filled",
    buttonColor: "#1A1A1A",
    buttonTextColor: "#FFFFFF",
    font: "Inter",
  },
  blocks: [],
};

const initialState: BiolinkEditorState = {
  config: defaultConfig,
  activeTab: "profile",
  activeBlockId: null,
  biolinkId: null,
  slug: null,
  title: "Meu Link",
  history: [defaultConfig],
  historyIndex: 0,
  isDirty: false,
};

// ── Ações ──
type BiolinkAction =
  | { type: "SET_CONFIG"; payload: BiolinkConfig }
  | { type: "SET_META"; payload: { biolinkId: string; slug: string; title: string } }
  | { type: "UPDATE_THEME"; payload: Partial<BiolinkTheme> }
  | { type: "UPDATE_BLOCK_DATA"; blockId: string; payload: Record<string, unknown> }
  | { type: "TOGGLE_BLOCK"; blockId: string }
  | { type: "REORDER_BLOCKS"; payload: BiolinkBlock[] }
  | { type: "ADD_BLOCK"; payload: { type: BiolinkBlockType; afterBlockId?: string } }
  | { type: "REMOVE_BLOCK"; blockId: string }
  | { type: "SET_ACTIVE_TAB"; payload: BiolinkEditorState["activeTab"] }
  | { type: "SET_ACTIVE_BLOCK"; payload: string | null }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_SLUG"; payload: string }
  | { type: "MARK_CLEAN" }
  | { type: "UNDO" }
  | { type: "REDO" };

// ── Helpers ──
function pushHistory(state: BiolinkEditorState, newConfig: BiolinkConfig): Partial<BiolinkEditorState> {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(newConfig);
  if (newHistory.length > 50) newHistory.shift();
  return { history: newHistory, historyIndex: newHistory.length - 1 };
}

// ── Reducer ──
function biolinkReducer(state: BiolinkEditorState, action: BiolinkAction): BiolinkEditorState {
  switch (action.type) {
    case "SET_CONFIG": {
      return {
        ...state,
        config: action.payload,
        history: [action.payload],
        historyIndex: 0,
        isDirty: false,
      };
    }
    case "SET_META": {
      return {
        ...state,
        biolinkId: action.payload.biolinkId,
        slug: action.payload.slug,
        title: action.payload.title,
      };
    }
    case "UPDATE_THEME": {
      const mergedTheme = { ...state.config.theme, ...action.payload };
      // Deep-merge effects when both exist
      if (action.payload.effects && state.config.theme.effects) {
        mergedTheme.effects = { ...state.config.theme.effects, ...action.payload.effects };
      }
      const newConfig = { ...state.config, theme: mergedTheme };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }
    case "UPDATE_BLOCK_DATA": {
      const blocks = state.config.blocks.map((b) =>
        b.id === action.blockId ? { ...b, data: { ...b.data, ...action.payload } } : b,
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
      const newBlock: BiolinkBlock = {
        id: `blk-${Date.now().toString(36)}`,
        type: action.payload.type,
        visible: true,
        data: getBiolinkBlockDefault(action.payload.type),
      };
      const blocks = [...state.config.blocks];
      if (action.payload.afterBlockId) {
        const idx = blocks.findIndex((b) => b.id === action.payload.afterBlockId);
        blocks.splice(idx + 1, 0, newBlock);
      } else {
        blocks.push(newBlock);
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
    case "SET_TITLE":
      return { ...state, title: action.payload, isDirty: true };
    case "SET_SLUG":
      return { ...state, slug: action.payload, isDirty: true };
    case "MARK_CLEAN":
      return { ...state, isDirty: false };
    case "UNDO": {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      return { ...state, config: state.history[newIndex], historyIndex: newIndex, isDirty: true };
    }
    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      return { ...state, config: state.history[newIndex], historyIndex: newIndex, isDirty: true };
    }
    default:
      return state;
  }
}

// ── Context ──
const BiolinkEditorContext = createContext<{
  state: BiolinkEditorState;
  dispatch: Dispatch<BiolinkAction>;
}>({ state: initialState, dispatch: () => {} });

export function BiolinkEditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(biolinkReducer, initialState);
  return (
    <BiolinkEditorContext.Provider value={{ state, dispatch }}>
      {children}
    </BiolinkEditorContext.Provider>
  );
}

export function useBiolinkEditor() {
  return useContext(BiolinkEditorContext);
}
