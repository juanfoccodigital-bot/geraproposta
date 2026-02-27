"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import DealCard from "./DealCard";
import { stageLabels, stageColors } from "@/types/crm";
import { formatBrl } from "@/lib/crm-utils";
import type { Deal, DealStage } from "@/types/crm";

interface KanbanColumnProps {
  stage: DealStage;
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
  onAddDeal: (stage: DealStage) => void;
}

export default function KanbanColumn({ stage, deals, onDealClick, onAddDeal }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const color = stageColors[stage];
  const total = deals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

  return (
    <div
      className="flex flex-col rounded-xl min-w-[270px] w-[270px] flex-shrink-0"
      style={{
        background: isOver ? "#1A1A1A" : "#0F0F0F",
        border: `1px solid ${isOver ? color + "40" : "#1A1A1A"}`,
        transition: "border-color 200ms, background 200ms",
      }}
    >
      {/* Column header */}
      <div className="px-3 py-3 border-b" style={{ borderColor: "#1A1A1A" }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-xs font-semibold text-white">{stageLabels[stage]}</span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ background: color + "20", color }}
            >
              {deals.length}
            </span>
          </div>
          <button
            onClick={() => onAddDeal(stage)}
            className="p-1 rounded-lg transition-colors hover:bg-white/10"
          >
            <Plus size={14} style={{ color: "#737373" }} />
          </button>
        </div>
        {total > 0 && (
          <p className="text-[10px] font-medium" style={{ color: "#737373" }}>
            {formatBrl(total)}
          </p>
        )}
      </div>

      {/* Cards area */}
      <div
        ref={setNodeRef}
        className="flex-1 p-2 space-y-2 overflow-y-auto min-h-[120px]"
        style={{ maxHeight: "calc(100vh - 340px)" }}
      >
        <SortableContext items={deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <div
              key={deal.id}
              style={{ background: "#111111", border: "1px solid #262626", borderRadius: 12 }}
              className="hover:border-[#404040] transition-colors"
            >
              <DealCard deal={deal} onClick={onDealClick} />
            </div>
          ))}
        </SortableContext>
        {deals.length === 0 && (
          <div className="flex items-center justify-center h-20">
            <p className="text-[10px]" style={{ color: "#404040" }}>Arraste um negócio aqui</p>
          </div>
        )}
      </div>
    </div>
  );
}
