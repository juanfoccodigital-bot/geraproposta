"use client";

import { useRef, useState, useEffect } from "react";
import { useBiolinkEditor } from "@/contexts/BiolinkEditorContext";
import BiolinkRenderer from "../BiolinkRenderer";
import PreviewFrame from "@/components/ui/PreviewFrame";
import { useDebounce } from "@/lib/useDebounce";

const PHONE_W = 375;
const PHONE_H = 740;

export default function BiolinkPreview() {
  const { state } = useBiolinkEditor();
  const debouncedConfig = useDebounce(state.config, 300);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const availW = el.clientWidth - 48; // padding
      const availH = el.clientHeight - 48;
      const s = Math.min(availW / PHONE_W, availH / PHONE_H, 1);
      setScale(Math.max(s, 0.4));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center bg-[#0F0F0F]">
      <div
        className="relative"
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Phone shell */}
        <div
          className="w-full h-full rounded-[40px] border-[4px] overflow-hidden"
          style={{
            borderColor: "#333",
            boxShadow: "0 0 0 2px #1A1A1A, 0 25px 50px rgba(0,0,0,0.5)",
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-[#333] rounded-b-xl z-10" />

          {/* Content */}
          <PreviewFrame width={PHONE_W} className="w-full h-full">
            <BiolinkRenderer config={debouncedConfig} />
          </PreviewFrame>
        </div>
      </div>
    </div>
  );
}
