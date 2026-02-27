"use client";

import { useSiteEditor } from "@/contexts/SiteEditorContext";
import { siteBlockLabels } from "@/types/site";
import type { SiteBlock, SiteBlockType } from "@/types/site";
import { Eye, EyeOff, Trash2, GripVertical, Plus } from "lucide-react";
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

const addableBlocks: { type: SiteBlockType; label: string; group: string }[] = [
  // Site-specific
  { type: "site-about", label: "Sobre", group: "Seções" },
  { type: "site-services", label: "Serviços", group: "Seções" },
  { type: "site-contact", label: "Contato", group: "Seções" },
  { type: "site-faq", label: "FAQ / Perguntas", group: "Seções" },
  { type: "site-team", label: "Equipe", group: "Seções" },
  { type: "site-map", label: "Mapa / Local", group: "Seções" },
  { type: "site-banner", label: "Banner", group: "Seções" },
  { type: "site-logos", label: "Logos / Parceiros", group: "Seções" },
  // Conteúdo
  { type: "texto", label: "Texto", group: "Conteúdo" },
  { type: "imagem", label: "Imagem", group: "Conteúdo" },
  { type: "cta", label: "Botão CTA", group: "Conteúdo" },
  { type: "divider", label: "Separador", group: "Conteúdo" },
  { type: "split-content", label: "Imagem + Texto", group: "Conteúdo" },
  { type: "cards-grid", label: "Grid de Cards", group: "Conteúdo" },
  // Mídia
  { type: "galeria", label: "Galeria", group: "Mídia" },
  { type: "video", label: "Vídeo", group: "Mídia" },
  { type: "marquee", label: "Faixa Animada", group: "Mídia" },
  { type: "background-image", label: "Background + Texto", group: "Mídia" },
  // Social Proof
  { type: "depoimentos", label: "Depoimentos", group: "Social Proof" },
  { type: "counter", label: "Contadores", group: "Social Proof" },
  // Avançado
  { type: "timeline", label: "Linha do Tempo", group: "Avançado" },
  { type: "pricing-table", label: "Tabela de Preços", group: "Avançado" },
  { type: "before-after", label: "Antes e Depois", group: "Avançado" },
];

const blockGroups = [...new Set(addableBlocks.map((b) => b.group))];

function SortableSiteBlock({ block }: { block: SiteBlock }) {
  const { dispatch } = useSiteEditor();
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

  const isStructural = ["site-navbar", "site-hero", "site-footer"].includes(block.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
    >
      <button
        {...attributes}
        {...listeners}
        className="p-0.5 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/40"
      >
        <GripVertical size={14} />
      </button>
      <span className="flex-1 text-sm text-white">{siteBlockLabels[block.type] || block.type}</span>
      <button
        onClick={() => dispatch({ type: "TOGGLE_BLOCK", blockId: block.id })}
        className="p-1 text-white/30 hover:text-white/60 transition-colors"
      >
        {block.visible ? <Eye size={14} /> : <EyeOff size={14} />}
      </button>
      {!isStructural && (
        <button
          onClick={() => dispatch({ type: "REMOVE_BLOCK", blockId: block.id })}
          className="p-1 text-white/30 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}

export default function SiteSectionsTab() {
  const { state, dispatch } = useSiteEditor();
  const blocks = state.config.blocks;

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
    <div className="p-4 space-y-6">
      {/* Current sections */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Seções</h3>
          <p className="text-[10px] text-white/30">Arraste para reordenar</p>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {blocks.map((block) => (
                <SortableSiteBlock key={block.id} block={block} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Add section - grouped */}
      {blockGroups.map((group) => (
        <div key={group}>
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">{group}</h3>
          <div className="grid grid-cols-2 gap-2">
            {addableBlocks
              .filter((b) => b.group === group)
              .map((item) => (
                <button
                  key={item.type}
                  onClick={() => dispatch({ type: "ADD_BLOCK", payload: { type: item.type } })}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-left text-sm text-white hover:border-[#6366F1]/30 hover:bg-[#6366F1]/5 transition-colors"
                >
                  <Plus size={14} className="text-[#6366F1]" />
                  {item.label}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
