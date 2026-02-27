"use client";

import type { BlockLayout } from "@/types/site";

const paddingMap = { none: "py-0", sm: "py-6", md: "py-12", lg: "py-20", xl: "py-28" };
const alignMap = { left: "text-left", center: "text-center", right: "text-right" };

interface SectionWrapperProps {
  layout: BlockLayout;
  id?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({ layout, id, children }: SectionWrapperProps) {
  const bgStyle: React.CSSProperties = {};

  if (layout.background.type === "color") {
    bgStyle.background = layout.background.value;
  } else if (layout.background.type === "gradient") {
    bgStyle.background = layout.background.value;
  } else if (layout.background.type === "image") {
    bgStyle.backgroundImage = `url(${layout.background.value})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center";
  }

  return (
    <section id={id} className={`relative ${paddingMap[layout.padding]} ${alignMap[layout.align]}`} style={bgStyle}>
      {layout.background.type === "image" && layout.background.overlay > 0 && (
        <div className="absolute inset-0 bg-black" style={{ opacity: layout.background.overlay / 100 }} />
      )}
      <div className={`relative ${layout.fullWidth ? "w-full" : "max-w-[1200px] mx-auto px-4 sm:px-6"}`}>
        {children}
      </div>
    </section>
  );
}
