"use client";

import { useEditor } from "@/contexts/EditorContext";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { BlockType, blockLabels } from "@/types/proposal";
import { getBlockDefault } from "@/lib/block-defaults";
import { useRouter } from "next/navigation";
import {
  X,
  Sparkles,
  Search,
  Compass,
  Award,
  CreditCard,
  Eye,
  Type,
  ImageIcon,
  LayoutGrid,
  MousePointerClick,
  Minus,
  Images,
  MessageSquareQuote,
  MoveHorizontal,
  Wallpaper,
  Columns2,
  Play,
  Hash,
  Clock,
  Table,
  ArrowLeftRight,
  Lock,
  Crown,
} from "lucide-react";

/* ============================================
   BLOCK PALETTE
   Modal para adicionar novos blocos.
   Blocos premium requerem plano pago.
   ============================================ */

interface BlockPaletteProps {
  open: boolean;
  onClose: () => void;
}

const blockIcons: Record<BlockType, React.ElementType> = {
  hero: Sparkles,
  diagnostico: Search,
  estrategia: Compass,
  diferenciais: Award,
  investimento: CreditCard,
  visao: Eye,
  texto: Type,
  imagem: ImageIcon,
  "cards-grid": LayoutGrid,
  cta: MousePointerClick,
  divider: Minus,
  galeria: Images,
  depoimentos: MessageSquareQuote,
  marquee: MoveHorizontal,
  "background-image": Wallpaper,
  "split-content": Columns2,
  video: Play,
  counter: Hash,
  timeline: Clock,
  "pricing-table": Table,
  "before-after": ArrowLeftRight,
};

const sectionBlocks: BlockType[] = [
  "hero", "diagnostico", "estrategia", "diferenciais", "investimento", "visao",
];

const genericBlocks: BlockType[] = [
  "texto", "imagem", "cards-grid", "cta", "divider", "galeria", "depoimentos",
];

const premiumBlockTypes: BlockType[] = [
  "marquee", "background-image", "split-content", "video", "counter", "timeline", "pricing-table", "before-after",
];

let paletteCounter = 0;

export default function BlockPalette({ open, onClose }: BlockPaletteProps) {
  const { dispatch } = useEditor();
  const { user } = useAuth();
  const router = useRouter();

  const userPlan = user?.plan || "free";
  const canUsePremiumBlocks = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.premiumBlocks ?? false;

  if (!open) return null;

  function addBlock(type: BlockType) {
    paletteCounter++;
    const id = `blk-${Date.now()}-${paletteCounter}-${Math.random().toString(36).slice(2, 6)}`;
    dispatch({
      type: "ADD_BLOCK",
      payload: {
        block: {
          id,
          type,
          visible: true,
          data: getBlockDefault(type),
        },
      },
    });
    onClose();
  }

  function renderGroup(label: string, types: BlockType[], locked = false) {
    return (
      <div>
        <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
          {label}
          {locked && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold normal-case tracking-normal" style={{ background: "#F9731615", color: "#F97316" }}>
              <Crown className="w-2.5 h-2.5" />
              PRO
            </span>
          )}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {types.map((type) => {
            const Icon = blockIcons[type];

            if (locked) {
              return (
                <button
                  key={type}
                  onClick={() => {
                    onClose();
                    router.push("/pricing");
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-[#F97316]/30 hover:bg-[#F97316]/5 transition-all text-left cursor-pointer relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F97316]/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#F97316]/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-white/50 block truncate">
                      {blockLabels[type]}
                    </span>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-[#F97316]/60 flex-shrink-0" />
                </button>
              );
            }

            return (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-[#F97316]/50 hover:bg-white/5 transition-all text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white/50" />
                </div>
                <span className="text-sm font-medium text-white">
                  {blockLabels[type]}
                </span>
              </button>
            );
          })}
        </div>

        {locked && (
          <button
            onClick={() => {
              onClose();
              router.push("/pricing");
            }}
            className="mt-3 w-full py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 cursor-pointer flex items-center justify-center gap-1.5"
            style={{ background: "#F97316" }}
          >
            <Crown className="w-3 h-3" />
            Fazer Upgrade para Desbloquear
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            Adicionar Bloco
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white/40" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {renderGroup("Secoes Prontas", sectionBlocks)}
          {renderGroup("Blocos Premium", premiumBlockTypes, !canUsePremiumBlocks)}
          {renderGroup("Blocos Genericos", genericBlocks)}
        </div>
      </div>
    </div>
  );
}
