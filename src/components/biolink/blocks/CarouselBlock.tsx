"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselData, BiolinkTheme } from "@/types/biolink";

const aspectMap = { "16:9": "56.25%", "1:1": "100%", "4:3": "75%" };

export default function CarouselBlock({ data, theme }: { data: CarouselData; theme: BiolinkTheme }) {
  const items = data.items?.filter((i) => i.image) || [];
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (!data.autoPlay || data.autoPlay <= 0 || total <= 1) return;
    const id = setInterval(next, data.autoPlay * 1000);
    return () => clearInterval(id);
  }, [data.autoPlay, total, next]);

  if (total === 0) {
    return (
      <div className="rounded-xl overflow-hidden bg-black/10 flex items-center justify-center py-8">
        <p className="text-xs opacity-40">Adicione imagens ao carrossel</p>
      </div>
    );
  }

  const aspect = aspectMap[data.aspectRatio || "16:9"];

  return (
    <div className="relative rounded-xl overflow-hidden group" style={{ paddingBottom: aspect }}>
      {/* Slides */}
      {items.map((item, i) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.05)",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
          {item.title && (
            <span className="absolute bottom-3 left-4 right-4 text-white font-semibold text-sm drop-shadow-lg truncate">
              {item.title}
            </span>
          )}
        </a>
      ))}

      {/* Navigation arrows */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              className="w-1.5 h-1.5 rounded-full transition-all cursor-pointer"
              style={{
                background: i === current ? theme.buttonColor : "rgba(255,255,255,0.4)",
                transform: i === current ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
