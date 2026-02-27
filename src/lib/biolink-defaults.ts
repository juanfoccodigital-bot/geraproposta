/* ============================================
   BIOLINK BLOCK DEFAULTS
   Dados padrão para cada tipo de bloco.
   ============================================ */

import type { BiolinkBlockType, BiolinkBlockData } from "@/types/biolink";

const defaults: Record<BiolinkBlockType, BiolinkBlockData> = {
  avatar: {
    image: "",
    name: "Seu Nome",
    bio: "Sua bio aqui. Descreva o que você faz.",
    nameSize: "md",
  },
  links: {
    items: [
      { id: "lnk-1", title: "Meu Site", url: "https://", icon: "Globe", enabled: true },
      { id: "lnk-2", title: "Meu Portfolio", url: "https://", icon: "Briefcase", enabled: true },
      { id: "lnk-3", title: "Entre em Contato", url: "https://", icon: "Mail", enabled: true },
    ],
  },
  social: {
    items: [
      { platform: "instagram", url: "https://instagram.com/" },
      { platform: "tiktok", url: "https://tiktok.com/@" },
      { platform: "youtube", url: "https://youtube.com/@" },
    ],
    size: "md",
  },
  divider: { style: "line" },
  text: { content: "Texto personalizado aqui.", align: "center" },
  featured: {
    image: "",
    title: "Destaque",
    description: "Descrição do conteúdo em destaque.",
    url: "https://",
  },
  video: { url: "", aspectRatio: "16:9" },
  marquee: {
    items: ["Novidade", "Confira", "Link na Bio"],
    speed: "normal",
  },
};

export function getBiolinkBlockDefault(type: BiolinkBlockType): BiolinkBlockData {
  return JSON.parse(JSON.stringify(defaults[type]));
}
