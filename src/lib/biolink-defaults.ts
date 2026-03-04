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
  "image-link": {
    items: [
      { id: "il-1", title: "Produto 1", subtitle: "Confira agora", url: "https://", image: "", enabled: true },
      { id: "il-2", title: "Produto 2", subtitle: "Saiba mais", url: "https://", image: "", enabled: true },
    ],
    layout: "overlay",
  },
  cta: {
    headline: "Pronto para começar?",
    description: "Clique no botão abaixo e transforme seu negócio hoje.",
    buttonText: "Quero Começar Agora",
    buttonUrl: "https://",
    image: "",
    style: "gradient",
  },
  banner: {
    image: "",
    title: "Título do Banner",
    subtitle: "Subtítulo com mais informações",
    url: "https://",
    overlay: 40,
    height: "md",
  },
  countdown: {
    targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    label: "Oferta termina em",
    endMessage: "Oferta encerrada!",
    style: "cards",
  },
  carousel: {
    items: [
      { id: "cr-1", image: "", title: "Slide 1", url: "https://" },
      { id: "cr-2", image: "", title: "Slide 2", url: "https://" },
      { id: "cr-3", image: "", title: "Slide 3", url: "https://" },
    ],
    autoPlay: 4,
    aspectRatio: "16:9",
  },
};

export function getBiolinkBlockDefault(type: BiolinkBlockType): BiolinkBlockData {
  return JSON.parse(JSON.stringify(defaults[type]));
}
