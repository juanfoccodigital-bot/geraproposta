"use client";

import { Plus, Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface ArrayEditorProps<T> {
  label: string;
  items: T[];
  onUpdate: (items: T[]) => void;
  createEmpty: () => T;
  renderItem: (item: T, index: number, update: (item: T) => void) => ReactNode;
  maxItems?: number;
}

export default function ArrayEditor<T>({
  label,
  items,
  onUpdate,
  createEmpty,
  renderItem,
  maxItems = 20,
}: ArrayEditorProps<T>) {
  const updateItem = (index: number, updated: T) => {
    const next = [...items];
    next[index] = updated;
    onUpdate(next);
  };

  const removeItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    if (items.length < maxItems) {
      onUpdate([...items, createEmpty()]);
    }
  };

  return (
    <div>
      <label className="text-[10px] text-white/30 uppercase mb-2 block">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="relative border border-white/5 rounded-lg p-2.5 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="absolute top-1.5 right-1.5 p-1 rounded hover:bg-red-500/20 transition-colors cursor-pointer"
              title="Remover"
            >
              <Trash2 size={11} className="text-red-400/60" />
            </button>
            <div className="pr-6 space-y-1.5">
              {renderItem(item, i, (updated) => updateItem(i, updated))}
            </div>
          </div>
        ))}
      </div>
      {items.length < maxItems && (
        <button
          type="button"
          onClick={addItem}
          className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-dashed border-white/10 text-[10px] text-white/40 hover:text-white/60 hover:border-white/20 transition-colors cursor-pointer"
        >
          <Plus size={11} /> Adicionar
        </button>
      )}
    </div>
  );
}
