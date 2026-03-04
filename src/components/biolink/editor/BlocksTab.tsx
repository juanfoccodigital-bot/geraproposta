"use client";

import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import { biolinkBlockLabels, BIOLINK_FREE_BLOCKS } from "@/types/biolink";
import type {
  BiolinkBlock,
  BiolinkBlockType,
  SocialData,
  BiolinkTextData,
  BiolinkDividerData,
  BiolinkMarqueeData,
  BiolinkVideoData,
  FeaturedData,
  ImageLinkData,
  CtaData,
  BannerData,
  CountdownData,
  CarouselData,
} from "@/types/biolink";
import { Eye, EyeOff, Trash2, GripVertical, Plus, Lock, ChevronDown } from "lucide-react";
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

import SocialEditor from "./blocks/SocialEditor";
import TextEditor from "./blocks/TextEditor";
import DividerEditor from "./blocks/DividerEditor";
import MarqueeEditor from "./blocks/MarqueeEditor";
import VideoEditor from "./blocks/VideoEditor";
import FeaturedEditor from "./blocks/FeaturedEditor";
import ImageLinkEditor from "./blocks/ImageLinkEditor";
import CtaEditor from "./blocks/CtaEditor";
import BannerEditor from "./blocks/BannerEditor";
import CountdownEditor from "./blocks/CountdownEditor";
import CarouselEditor from "./blocks/CarouselEditor";

const addableBlocks: { type: BiolinkBlockType; label: string; premium: boolean }[] = [
  { type: "social", label: "Redes Sociais", premium: true },
  { type: "divider", label: "Separador", premium: true },
  { type: "text", label: "Texto", premium: true },
  { type: "featured", label: "Destaque", premium: true },
  { type: "video", label: "Vídeo", premium: true },
  { type: "marquee", label: "Faixa Animada", premium: true },
  { type: "image-link", label: "Botões com Imagem", premium: true },
  { type: "cta", label: "Chamada para Ação", premium: true },
  { type: "banner", label: "Banner", premium: true },
  { type: "countdown", label: "Contagem Regressiva", premium: true },
  { type: "carousel", label: "Carrossel", premium: true },
];

function BlockEditor({ block }: { block: BiolinkBlock }) {
  switch (block.type) {
    case "social":
      return <SocialEditor blockId={block.id} data={block.data as SocialData} />;
    case "text":
      return <TextEditor blockId={block.id} data={block.data as BiolinkTextData} />;
    case "divider":
      return <DividerEditor blockId={block.id} data={block.data as BiolinkDividerData} />;
    case "marquee":
      return <MarqueeEditor blockId={block.id} data={block.data as BiolinkMarqueeData} />;
    case "video":
      return <VideoEditor blockId={block.id} data={block.data as BiolinkVideoData} />;
    case "featured":
      return <FeaturedEditor blockId={block.id} data={block.data as FeaturedData} />;
    case "image-link":
      return <ImageLinkEditor blockId={block.id} data={block.data as ImageLinkData} />;
    case "cta":
      return <CtaEditor blockId={block.id} data={block.data as CtaData} />;
    case "banner":
      return <BannerEditor blockId={block.id} data={block.data as BannerData} />;
    case "countdown":
      return <CountdownEditor blockId={block.id} data={block.data as CountdownData} />;
    case "carousel":
      return <CarouselEditor blockId={block.id} data={block.data as CarouselData} />;
    default:
      return null;
  }
}

function SortableBiolinkBlock({ block }: { block: BiolinkBlock }) {
  const { state, dispatch } = useBiolinkEditor();
  const isActive = state.activeBlockId === block.id;
  const hasEditor = !["avatar", "links"].includes(block.type);

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

  function toggleEditor() {
    if (!hasEditor) return;
    dispatch({ type: "SET_ACTIVE_BLOCK", payload: isActive ? null : block.id });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border overflow-hidden transition-colors ${
        isActive ? "border-[#F97316]/40 bg-[#F97316]/5" : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          {...attributes}
          {...listeners}
          className="p-0.5 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/40"
        >
          <GripVertical size={14} />
        </button>
        <button
          onClick={toggleEditor}
          className={`flex-1 text-left text-sm text-white ${hasEditor ? "cursor-pointer hover:text-[#F97316] transition-colors" : ""}`}
        >
          {biolinkBlockLabels[block.type] || block.type}
        </button>
        {hasEditor && (
          <button
            onClick={toggleEditor}
            className="p-1 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${isActive ? "rotate-180" : ""}`}
            />
          </button>
        )}
        <button
          onClick={() => dispatch({ type: "TOGGLE_BLOCK", blockId: block.id })}
          className="p-1 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
        >
          {block.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
        {block.type !== "avatar" && block.type !== "links" && (
          <button
            onClick={() => dispatch({ type: "REMOVE_BLOCK", blockId: block.id })}
            className="p-1 text-white/30 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Inline editor accordion */}
      {isActive && hasEditor && (
        <div className="px-3 pb-3 border-t border-white/5">
          <BlockEditor block={block} />
        </div>
      )}
    </div>
  );
}

interface BlocksTabProps {
  isPremium: boolean;
}

export default function BlocksTab({ isPremium }: BlocksTabProps) {
  const { state, dispatch } = useBiolinkEditor();
  const blocks = state.config.blocks;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function addBlock(type: BiolinkBlockType) {
    if (!isPremium && !BIOLINK_FREE_BLOCKS.includes(type)) return;
    dispatch({ type: "ADD_BLOCK", payload: { type } });
  }

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
    <div className="p-4 space-y-6">
      {/* Current blocks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Blocos Ativos</h3>
          <p className="text-[10px] text-white/30">Clique para editar</p>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {blocks.map((block) => (
                <SortableBiolinkBlock key={block.id} block={block} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Add blocks */}
      <div>
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Adicionar Bloco</h3>
        <div className="space-y-2">
          {addableBlocks.map((item) => {
            const locked = item.premium && !isPremium;
            return (
              <button
                key={item.type}
                onClick={() => !locked && addBlock(item.type)}
                disabled={locked}
                className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  locked
                    ? "border-white/5 bg-white/[0.02] text-white/20 cursor-not-allowed"
                    : "border-white/10 bg-white/5 text-white hover:border-[#F97316]/30 hover:bg-[#F97316]/5 cursor-pointer"
                }`}
              >
                <Plus size={14} className={locked ? "text-white/10" : "text-[#F97316]"} />
                <span className="flex-1 text-sm">{item.label}</span>
                {locked && <Lock size={12} className="text-white/20" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
