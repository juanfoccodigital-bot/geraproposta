"use client";

import { useState } from "react";
import { useEditor } from "@/contexts/EditorContext";
import { blockLabels, BlockType, Block } from "@/types/proposal";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
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
  Trash2,
  Plus,
  MoveHorizontal,
  Wallpaper,
  Columns2,
  Play,
  Hash,
  Clock,
  Table,
  ArrowLeftRight,
} from "lucide-react";
import BlockPalette from "../BlockPalette";

/* ============================================
   ABA: BLOCOS (antigo SectionsTab)
   Drag & drop + toggle + delete
   ============================================ */

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

function SortableBlock({ block }: { block: Block }) {
  const { dispatch } = useEditor();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = blockIcons[block.type] || Sparkles;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors bg-white/5"
    >
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="p-1 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/40"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            block.visible
              ? "bg-[#F97316] text-white"
              : "bg-white/5 text-white/30"
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>

        <span
          className={`text-sm font-medium transition-colors ${
            block.visible ? "text-white" : "text-white/30"
          }`}
        >
          {blockLabels[block.type]}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Toggle */}
        <button
          onClick={() => dispatch({ type: "TOGGLE_BLOCK", blockId: block.id })}
          className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${
            block.visible ? "bg-[#F97316]" : "bg-white/20"
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
              block.visible ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>

        {/* Delete */}
        <button
          onClick={() => {
            if (window.confirm(`Remover bloco "${blockLabels[block.type]}"?`)) {
              dispatch({ type: "REMOVE_BLOCK", blockId: block.id });
            }
          }}
          className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function SectionsTab() {
  const { state, dispatch } = useEditor();
  const [showPalette, setShowPalette] = useState(false);

  const blocks = state.config.blocks || [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...blocks];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);

    dispatch({ type: "REORDER_BLOCKS", payload: reordered });
  }

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs text-white/40">
          Arraste para reordenar blocos
        </p>
        <button
          onClick={() => setShowPalette(true)}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#F97316] hover:underline cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          Adicionar
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <SortableBlock key={block.id} block={block} />
          ))}
        </SortableContext>
      </DndContext>

      {blocks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-white/30 mb-3">
            Nenhum bloco ainda
          </p>
          <button
            onClick={() => setShowPalette(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F97316] text-white text-sm font-medium hover:bg-[#F97316]/90 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Bloco
          </button>
        </div>
      )}

      <BlockPalette open={showPalette} onClose={() => setShowPalette(false)} />
    </div>
  );
}
