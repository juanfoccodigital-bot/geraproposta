"use client";

import type { BiolinkDividerData } from "@/types/biolink";

export default function DividerBlock({ data }: { data: BiolinkDividerData }) {
  if (data.style === "space") {
    return <div className="h-6" />;
  }

  if (data.style === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 py-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full opacity-30" style={{ background: "currentColor" }} />
        ))}
      </div>
    );
  }

  return (
    <div className="py-3">
      <hr className="border-current opacity-15" />
    </div>
  );
}
