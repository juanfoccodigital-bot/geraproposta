"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";

export default function InstagramFollow() {
  return (
    <a
      href="https://instagram.com/geraproposta"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-2xl border p-4 transition-all hover:border-[#404040]"
      style={{ background: "#111111", borderColor: "#262626" }}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: "#262626" }}>
        <Image
          src="/post.png"
          alt="@geraproposta"
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">geraproposta</p>
        <p className="text-xs" style={{ color: "#737373" }}>Nos siga no Instagram</p>
      </div>
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold flex-shrink-0"
        style={{ background: "#262626", color: "#FFFFFF" }}
      >
        <Instagram className="w-3.5 h-3.5" />
        Seguir
      </div>
    </a>
  );
}
