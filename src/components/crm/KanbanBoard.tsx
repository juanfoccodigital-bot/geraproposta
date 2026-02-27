"use client";

import { useState, useMemo, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PIPELINE_STAGES } from "@/types/crm";
import type { Deal, DealStage } from "@/types/crm";
import KanbanColumn from "./KanbanColumn";
import { DealCardOverlay } from "./DealCard";

interface KanbanBoardProps {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
  onDealClick: (deal: Deal) => void;
  onAddDeal: (stage: DealStage) => void;
  onReorder: (updates: { dealId: string; stage: string; position: number }[]) => void;
  onStageChange: (deal: Deal, newStage: DealStage) => void;
}

export default function KanbanBoard({ deals, setDeals, onDealClick, onAddDeal, onReorder, onStageChange }: KanbanBoardProps) {
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const dealsByStage = useMemo(() => {
    const grouped: Record<DealStage, Deal[]> = {
      lead: [], contato: [], proposta_enviada: [],
      negociacao: [], fechado_ganho: [], fechado_perdido: [],
    };
    deals.forEach((d) => {
      if (grouped[d.stage]) grouped[d.stage].push(d);
    });
    Object.values(grouped).forEach((arr) => arr.sort((a, b) => a.position - b.position));
    return grouped;
  }, [deals]);

  const findDealStage = useCallback((dealId: string): DealStage | null => {
    for (const stage of PIPELINE_STAGES) {
      if (dealsByStage[stage].some((d) => d.id === dealId)) return stage;
    }
    return null;
  }, [dealsByStage]);

  const handleDragStart = (event: DragStartEvent) => {
    const deal = deals.find((d) => d.id === event.active.id);
    if (deal) setActiveDeal(deal);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeStage = findDealStage(activeId);
    // Over could be a column (stage name) or a deal
    const overStage = PIPELINE_STAGES.includes(overId as DealStage)
      ? (overId as DealStage)
      : findDealStage(overId);

    if (!activeStage || !overStage || activeStage === overStage) return;

    // Move deal to new column optimistically
    setDeals((prev) => {
      const deal = prev.find((d) => d.id === activeId);
      if (!deal) return prev;
      return prev.map((d) =>
        d.id === activeId ? { ...d, stage: overStage } : d
      );
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDeal(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeDealData = deals.find((d) => d.id === activeId);
    if (!activeDealData) return;

    const currentStage = activeDealData.stage;

    // Determine target stage and position
    let targetStage = currentStage;
    let targetIndex = -1;

    if (PIPELINE_STAGES.includes(overId as DealStage)) {
      // Dropped on empty column
      targetStage = overId as DealStage;
      targetIndex = dealsByStage[targetStage].filter((d) => d.id !== activeId).length;
    } else {
      // Dropped on/near another deal
      const overDealStage = findDealStage(overId);
      if (overDealStage) {
        targetStage = overDealStage;
        const stageDeals = dealsByStage[targetStage].filter((d) => d.id !== activeId);
        targetIndex = stageDeals.findIndex((d) => d.id === overId);
        if (targetIndex === -1) targetIndex = stageDeals.length;
      }
    }

    // Check if moving to a closed stage
    const originalDeal = deals.find((d) => d.id === activeId);
    if (originalDeal && targetStage !== originalDeal.stage && targetStage === "fechado_ganho") {
      // Trigger close deal modal
      const updatedDeal = { ...originalDeal, stage: targetStage };
      onStageChange(updatedDeal, targetStage);
    }

    // Update positions
    const updatedDeals = deals.map((d) => {
      if (d.id === activeId) return { ...d, stage: targetStage };
      return d;
    });

    // Recalculate positions for the target stage
    const stageDeals = updatedDeals
      .filter((d) => d.stage === targetStage)
      .sort((a, b) => {
        if (a.id === activeId) return -1; // Active deal gets inserted at target
        if (b.id === activeId) return 1;
        return a.position - b.position;
      });

    // Rebuild with correct insertion
    const withoutActive = stageDeals.filter((d) => d.id !== activeId);
    const activeItem = stageDeals.find((d) => d.id === activeId);
    if (activeItem) {
      const insertAt = Math.min(Math.max(targetIndex, 0), withoutActive.length);
      withoutActive.splice(insertAt, 0, activeItem);
    }

    const reorderUpdates = withoutActive.map((d, i) => ({
      dealId: d.id,
      stage: targetStage,
      position: i,
    }));

    // Also update positions of the source stage if different
    if (originalDeal && originalDeal.stage !== targetStage) {
      const sourceDeals = updatedDeals
        .filter((d) => d.stage === originalDeal.stage && d.id !== activeId)
        .sort((a, b) => a.position - b.position);

      sourceDeals.forEach((d, i) => {
        reorderUpdates.push({ dealId: d.id, stage: originalDeal.stage, position: i });
      });
    }

    // Apply optimistic update with correct positions
    setDeals((prev) =>
      prev.map((d) => {
        const update = reorderUpdates.find((u) => u.dealId === d.id);
        if (update) return { ...d, stage: update.stage as DealStage, position: update.position };
        return d;
      })
    );

    onReorder(reorderUpdates);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4 kanban-scroll">
        {PIPELINE_STAGES.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            deals={dealsByStage[stage]}
            onDealClick={onDealClick}
            onAddDeal={onAddDeal}
          />
        ))}
      </div>

      <DragOverlay>
        {activeDeal && (
          <DealCardOverlay deal={activeDeal} onClick={() => {}} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
