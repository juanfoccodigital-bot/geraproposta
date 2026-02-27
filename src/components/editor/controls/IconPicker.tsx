"use client";

import { useState, useRef, useEffect } from "react";
import { resolveIcon, popularIcons } from "@/lib/icons";

/* ============================================
   ICON PICKER
   Dropdown com grid de ícones lucide-react
   para selecionar ícone de um card
   ============================================ */

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const CurrentIcon = resolveIcon(value);

  const filtered = search
    ? popularIcons.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    : popularIcons;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors cursor-pointer bg-white/5"
        title={`Ícone: ${value}`}
      >
        <CurrentIcon className="w-4 h-4 text-white/60" />
      </button>

      {open && (
        <div className="absolute top-10 left-0 z-50 w-64 bg-[#111] rounded-xl border border-white/10 shadow-xl p-3">
          {/* Busca */}
          <input
            type="text"
            placeholder="Buscar ícone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white mb-2 focus:outline-none focus:border-[#F97316]/50"
            autoFocus
          />

          {/* Grid de ícones */}
          <div className="grid grid-cols-7 gap-1 max-h-48 overflow-y-auto">
            {filtered.map((name) => {
              const Icon = resolveIcon(name);
              const isSelected = name === value;
              return (
                <button
                  key={name}
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#F97316] text-white"
                      : "hover:bg-white/5 text-white/50"
                  }`}
                  title={name}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-xs text-white/30 py-4">
              Nenhum ícone encontrado
            </p>
          )}
        </div>
      )}
    </div>
  );
}
