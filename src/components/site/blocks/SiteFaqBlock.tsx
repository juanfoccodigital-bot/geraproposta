"use client";

import { useState } from "react";
import type { SiteFaqData } from "@/types/site";
import { Plus, Minus } from "lucide-react";

interface Props {
  data: SiteFaqData;
  themeColors: Record<string, string>;
}

export default function SiteFaqBlock({ data, themeColors }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {data.title && (
        <h2
          className="text-3xl font-bold text-center mb-2"
          style={{ color: themeColors.foreground }}
        >
          {data.title}
        </h2>
      )}
      {data.subtitle && (
        <p className="text-center mb-10 opacity-60" style={{ color: themeColors.foreground }}>
          {data.subtitle}
        </p>
      )}

      <div className="space-y-3">
        {(data.items || []).map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-xl border overflow-hidden transition-colors"
              style={{ borderColor: `${themeColors.foreground}15`, background: isOpen ? `${themeColors.gold}08` : "transparent" }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              >
                <span className="font-semibold pr-4" style={{ color: themeColors.foreground }}>
                  {item.question}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: `${themeColors.gold}15` }}
                >
                  {isOpen ? (
                    <Minus size={14} style={{ color: themeColors.gold }} />
                  ) : (
                    <Plus size={14} style={{ color: themeColors.gold }} />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4">
                  <p className="text-sm leading-relaxed opacity-70" style={{ color: themeColors.foreground }}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
