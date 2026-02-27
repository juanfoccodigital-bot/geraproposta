"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import {
  ProposalConfig,
  Block,
  BlockType,
  ThemeConfig,
  ThemeColors,
  ThemeFonts,
} from "@/types/proposal";
import { defaultProposalConfig } from "@/lib/defaults";
import { migrateConfig } from "@/lib/migrate-config";

/* ============================================
   EDITOR CONTEXT V2
   Estado global do editor com reducer
   Agora opera com blocks[] ao invés de sections[]
   Inclui undo/redo
   ============================================ */

// ── Estado ──
interface EditorState {
  config: ProposalConfig;
  activeTab: "content" | "theme" | "sections";
  activeBlockId: string | null;
  previewViewport: "mobile" | "tablet" | "desktop";
  proposalId: string | null;
  slug: string | null;
  history: ProposalConfig[];
  historyIndex: number;
  isDirty: boolean;
}

const migratedDefault = migrateConfig(defaultProposalConfig);

const initialState: EditorState = {
  config: migratedDefault,
  activeTab: "content",
  activeBlockId: null,
  previewViewport: "desktop",
  proposalId: null,
  slug: null,
  history: [migratedDefault],
  historyIndex: 0,
  isDirty: false,
};

// ── Ações ──
type EditorAction =
  | { type: "SET_CONFIG"; payload: ProposalConfig }
  | { type: "UPDATE_COLORS"; payload: Partial<ThemeColors> }
  | { type: "UPDATE_FONTS"; payload: Partial<ThemeFonts> }
  | { type: "UPDATE_THEME"; payload: Partial<ThemeConfig> }
  | { type: "UPDATE_BLOCK_DATA"; blockId: string; payload: Record<string, unknown> }
  | { type: "TOGGLE_BLOCK"; blockId: string }
  | { type: "REORDER_BLOCKS"; payload: Block[] }
  | { type: "ADD_BLOCK"; payload: { block: Block; afterBlockId?: string } }
  | { type: "REMOVE_BLOCK"; blockId: string }
  | { type: "SET_ACTIVE_TAB"; payload: EditorState["activeTab"] }
  | { type: "SET_ACTIVE_BLOCK"; payload: string | null }
  | { type: "SET_VIEWPORT"; payload: EditorState["previewViewport"] }
  | { type: "UPDATE_META"; payload: Partial<ProposalConfig["meta"]> }
  | { type: "SET_PROPOSAL_META"; payload: { proposalId: string; slug: string } }
  | { type: "MARK_CLEAN" }
  | { type: "UNDO" }
  | { type: "REDO" };

// ── Helpers ──
function pushHistory(state: EditorState, newConfig: ProposalConfig): Partial<EditorState> {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(newConfig);
  // Limit history to 50 entries
  if (newHistory.length > 50) newHistory.shift();
  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
  };
}

function getBlocks(config: ProposalConfig): Block[] {
  return config.blocks || [];
}

function withBlocks(config: ProposalConfig, blocks: Block[]): ProposalConfig {
  return { ...config, blocks, version: 2 };
}

// ── Reducer ──
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "SET_CONFIG": {
      const migrated = migrateConfig(action.payload);
      return {
        ...state,
        config: migrated,
        history: [migrated],
        historyIndex: 0,
        isDirty: false,
      };
    }

    case "UPDATE_COLORS": {
      const newConfig = {
        ...state.config,
        theme: {
          ...state.config.theme,
          colors: { ...state.config.theme.colors, ...action.payload },
        },
      };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }

    case "UPDATE_FONTS": {
      const newConfig = {
        ...state.config,
        theme: {
          ...state.config.theme,
          fonts: { ...state.config.theme.fonts, ...action.payload },
        },
      };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }

    case "UPDATE_THEME": {
      const newConfig = {
        ...state.config,
        theme: { ...state.config.theme, ...action.payload },
      };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }

    case "UPDATE_BLOCK_DATA": {
      const blocks = getBlocks(state.config).map((b) =>
        b.id === action.blockId
          ? { ...b, data: { ...b.data, ...action.payload } }
          : b
      );
      const newConfig = withBlocks(state.config, blocks);
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }

    case "TOGGLE_BLOCK": {
      const blocks = getBlocks(state.config).map((b) =>
        b.id === action.blockId ? { ...b, visible: !b.visible } : b
      );
      const newConfig = withBlocks(state.config, blocks);
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }

    case "REORDER_BLOCKS": {
      const newConfig = withBlocks(state.config, action.payload);
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }

    case "ADD_BLOCK": {
      const blocks = [...getBlocks(state.config)];
      if (action.payload.afterBlockId) {
        const idx = blocks.findIndex((b) => b.id === action.payload.afterBlockId);
        blocks.splice(idx + 1, 0, action.payload.block);
      } else {
        blocks.push(action.payload.block);
      }
      const newConfig = withBlocks(state.config, blocks);
      return {
        ...state,
        config: newConfig,
        isDirty: true,
        activeBlockId: action.payload.block.id,
        ...pushHistory(state, newConfig),
      };
    }

    case "REMOVE_BLOCK": {
      const blocks = getBlocks(state.config).filter((b) => b.id !== action.blockId);
      const newConfig = withBlocks(state.config, blocks);
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

    case "UPDATE_META": {
      const newConfig = {
        ...state.config,
        meta: { ...state.config.meta, ...action.payload },
      };
      return { ...state, config: newConfig, isDirty: true, ...pushHistory(state, newConfig) };
    }

    case "SET_PROPOSAL_META":
      return {
        ...state,
        proposalId: action.payload.proposalId,
        slug: action.payload.slug,
      };

    case "MARK_CLEAN":
      return { ...state, isDirty: false };

    case "UNDO": {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      return {
        ...state,
        config: state.history[newIndex],
        historyIndex: newIndex,
        isDirty: true,
      };
    }

    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      return {
        ...state,
        config: state.history[newIndex],
        historyIndex: newIndex,
        isDirty: true,
      };
    }

    default:
      return state;
  }
}

// ── Context ──
const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
} | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor deve ser usado dentro de EditorProvider");
  }
  return context;
}
