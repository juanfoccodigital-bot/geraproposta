"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import type { Contact } from "@/types/crm";

interface ContactSelectProps {
  value: string | null;
  onChange: (contactId: string | null) => void;
  contacts: Contact[];
}

export default function ContactSelect({ value, onChange, contacts }: ContactSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const selected = contacts.find((c) => c.id === value);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = useCallback((id: string) => {
    onChange(id);
    setOpen(false);
    setQuery("");
  }, [onChange]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {selected ? (
        <div
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
          style={{ background: "#1A1A1A", border: "1px solid #262626" }}
        >
          <span className="text-white">{selected.name}{selected.company ? ` · ${selected.company}` : ""}</span>
          <button onClick={() => onChange(null)} className="p-0.5 rounded hover:bg-white/10">
            <X size={12} style={{ color: "#737373" }} />
          </button>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs cursor-pointer"
          style={{ background: "#1A1A1A", border: "1px solid #262626" }}
          onClick={() => setOpen(true)}
        >
          <Search size={12} style={{ color: "#737373" }} />
          {open ? (
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar contato..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-neutral-500"
            />
          ) : (
            <span style={{ color: "#737373" }}>Selecionar contato</span>
          )}
        </div>
      )}

      {open && (
        <div
          className="absolute z-20 top-full left-0 right-0 mt-1 rounded-lg overflow-hidden max-h-40 overflow-y-auto"
          style={{ background: "#1A1A1A", border: "1px solid #262626" }}
        >
          {filtered.length === 0 ? (
            <p className="px-3 py-2 text-xs" style={{ color: "#737373" }}>Nenhum contato encontrado</p>
          ) : (
            filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className="w-full text-left px-3 py-2 text-xs text-white hover:bg-white/5 transition-colors"
              >
                {c.name}{c.company ? <span style={{ color: "#737373" }}> · {c.company}</span> : ""}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
