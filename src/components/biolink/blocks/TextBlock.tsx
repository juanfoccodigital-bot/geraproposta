"use client";

import type { BiolinkTextData } from "@/types/biolink";

export default function TextBlock({ data }: { data: BiolinkTextData }) {
  return (
    <div className="py-2" style={{ textAlign: data.align || "center" }}>
      <p className="text-sm opacity-80 whitespace-pre-wrap">{data.content}</p>
    </div>
  );
}
