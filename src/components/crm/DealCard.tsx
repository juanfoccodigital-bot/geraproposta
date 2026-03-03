"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, FileText, User } from "lucide-react";
import { formatBrl } from "@/lib/crm-utils";
import type { Deal } from "@/types/crm";

interface DealCardProps {
  deal: Deal;
  onClick: (deal: Deal) => void;
  overlay?: boolean;
}

export default function DealCard({ deal, onClick, overlay }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id, data: { deal } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const content = (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={overlay ? {} : style}
      className={`rounded-xl p-3 cursor-pointer transition-colors group ${overlay ? "shadow-2xl" : ""}`}
      onClick={() => !isDragging && onClick(deal)}
      {...(overlay ? {} : attributes)}
    >
      <div className="flex items-start gap-2">
        <button
          className="mt-0.5 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
          {...(overlay ? {} : listeners)}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={12} style={{ color: "#737373" }} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{deal.title}</p>
          {deal.contact && (
            <div className="flex items-center gap-1 mt-1">
              <User size={10} style={{ color: "#737373" }} />
              <span className="text-[10px] truncate" style={{ color: "#737373" }}>{deal.contact.name}</span>
            </div>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-semibold" style={{ color: "#F97316" }}>
              {deal.value > 0 ? formatBrl(deal.value) : "—"}
            </span>
            {deal.proposal && (
              <div className="flex items-center gap-1">
                <FileText size={10} style={{ color: "#737373" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return content;
}

// Static card for DragOverlay (not sortable)
export function DealCardOverlay({ deal, onClick }: { deal: Deal; onClick: (d: Deal) => void }) {
  return (
    <div
      className="rounded-xl p-3 shadow-2xl"
      style={{ background: "#1A1A1A", border: "1px solid #404040", width: 260 }}
    >
      <div className="flex items-start gap-2">
        <div className="mt-0.5 p-0.5 cursor-grab active:cursor-grabbing"><GripVertical size={12} style={{ color: "#737373" }} /></div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{deal.title}</p>
          {deal.contact && (
            <div className="flex items-center gap-1 mt-1">
              <User size={10} style={{ color: "#737373" }} />
              <span className="text-[10px] truncate" style={{ color: "#737373" }}>{deal.contact.name}</span>
            </div>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-semibold" style={{ color: "#F97316" }}>
              {deal.value > 0 ? formatBrl(deal.value) : "—"}
            </span>
            {deal.proposal && <FileText size={10} style={{ color: "#737373" }} />}
          </div>
        </div>
      </div>
    </div>
  );
}
