/* ============================================
   BIOLINK TEMPLATES
   10 templates para GeraLink.
   Cada premium tem combinação UNICA de blocos.
   ============================================ */

import type { BiolinkTemplate, BiolinkConfig, BiolinkBlock } from "@/types/biolink";

// ============================================
// FREE TEMPLATE — Minimalista (Avatar + Links)
// ============================================
const defaultTemplate: BiolinkTemplate = {
  id: "default",
  name: "Minimalista",
  description: "Template clean e simples, perfeito para começar.",
  isPremium: false,
  config: {
    theme: {
      background: "#FFFFFF",
      backgroundType: "solid",
      backgroundValue: "#FFFFFF",
      textColor: "#1A1A1A",
      buttonStyle: "filled",
      buttonColor: "#1A1A1A",
      buttonTextColor: "#FFFFFF",
      font: "Inter",
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Criador de conteúdo | Empreendedor", nameSize: "md" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Meu Site", url: "https://", icon: "Globe", enabled: true },
        { id: "lnk-2", title: "Portfolio", url: "https://", icon: "Briefcase", enabled: true },
        { id: "lnk-3", title: "Contato", url: "https://", icon: "Mail", enabled: true },
      ] } },
    ],
  },
};

// ============================================
// PREMIUM 1 — Dark Elegante (Influencer Sofisticado)
// Blocos: Avatar → Marquee → Links(5) → Divider → Featured → Social
// ============================================
const darkElegante: BiolinkTemplate = {
  id: "dark-elegante",
  name: "Dark Elegante",
  description: "Influencer sofisticado com toques dourados e conteúdo premium.",
  isPremium: true,
  config: {
    theme: {
      background: "#09090B",
      backgroundType: "solid",
      backgroundValue: "#09090B",
      textColor: "#FFFFFF",
      buttonStyle: "outline",
      buttonColor: "#C9A96E",
      buttonTextColor: "#C9A96E",
      font: "Playfair Display",
      effects: {
        entrance: "fade",
        buttonGlow: true,
        gradientText: true,
        gradientColors: ["#C9A96E", "#E8D5A8"],
        glassmorphism: true,
        animatedBg: "aurora",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Influencer | Criador de Conteúdo Premium", nameSize: "lg" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Conteúdo Exclusivo", "Parcerias", "Collabs", "Lifestyle", "Tendências"], speed: "normal" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Canal no YouTube", url: "https://", icon: "Youtube", enabled: true },
        { id: "lnk-2", title: "Meu Curso", url: "https://", icon: "GraduationCap", enabled: true },
        { id: "lnk-3", title: "Podcast", url: "https://", icon: "Headphones", enabled: true },
        { id: "lnk-4", title: "Loja Oficial", url: "https://", icon: "ShoppingBag", enabled: true },
        { id: "lnk-5", title: "Agenda / Booking", url: "https://", icon: "Calendar", enabled: true },
      ] } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "dots" } },
      { id: "blk-featured", type: "featured", visible: true, data: { image: "", title: "Novo Projeto Exclusivo", description: "Confira meu último lançamento — conteúdo premium que transforma.", url: "https://" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "tiktok", url: "https://tiktok.com/@" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "twitter", url: "https://x.com/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// PREMIUM 2 — Neon Gradient (Streamer / Criador)
// Blocos: Avatar → Text → Links(4) → Video → Divider → Social
// ============================================
const neonGradient: BiolinkTemplate = {
  id: "neon-gradient",
  name: "Neon Gradient",
  description: "Vibrante para streamers e criadores de conteúdo digital.",
  isPremium: true,
  config: {
    theme: {
      background: "#0F0F23",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "#FFFFFF",
      buttonStyle: "filled",
      buttonColor: "#667eea",
      buttonTextColor: "#FFFFFF",
      font: "Space Grotesk",
      effects: {
        entrance: "scale",
        buttonShimmer: true,
        gradientText: true,
        gradientColors: ["#667eea", "#764ba2"],
        animatedBg: "particles",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Streamer | Gamer | Criador de Conteúdo", nameSize: "lg" } },
      { id: "blk-text", type: "text", visible: true, data: { content: "🔴 AO VIVO toda quarta às 20h — não perca!", align: "center" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Twitch — Assista ao Vivo", url: "https://", icon: "Tv", enabled: true },
        { id: "lnk-2", title: "Discord — Comunidade", url: "https://", icon: "MessageCircle", enabled: true },
        { id: "lnk-3", title: "Loja de Merch", url: "https://", icon: "ShoppingBag", enabled: true },
        { id: "lnk-4", title: "Últimos Vídeos", url: "https://", icon: "Play", enabled: true },
      ] } },
      { id: "blk-video", type: "video", visible: true, data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", aspectRatio: "16:9" } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "line" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "tiktok", url: "https://tiktok.com/@" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "twitter", url: "https://x.com/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// PREMIUM 3 — Pastel Suave (Coach / Terapeuta)
// Blocos: Avatar → Text → Links(4) → Divider → Featured → Social
// ============================================
const pastelSoft: BiolinkTemplate = {
  id: "pastel-soft",
  name: "Pastel Suave",
  description: "Delicado e acolhedor para coaches, terapeutas e mentores.",
  isPremium: true,
  config: {
    theme: {
      background: "#FFF5F5",
      backgroundType: "solid",
      backgroundValue: "#FFF5F5",
      textColor: "#4A4A4A",
      buttonStyle: "rounded",
      buttonColor: "#F8A4B8",
      buttonTextColor: "#FFFFFF",
      font: "Nunito",
      effects: {
        entrance: "fade",
        gradientText: true,
        gradientColors: ["#F8A4B8", "#C084FC"],
        glassmorphism: false,
        animatedBg: "aurora",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Coach de Vida | Terapeuta Holística", nameSize: "md" } },
      { id: "blk-text", type: "text", visible: true, data: { content: "✨ Transformando vidas através do autoconhecimento e equilíbrio emocional", align: "center" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Agende sua Sessão", url: "https://", icon: "Calendar", enabled: true },
        { id: "lnk-2", title: "E-book Gratuito", url: "https://", icon: "BookOpen", enabled: true },
        { id: "lnk-3", title: "Depoimentos de Clientes", url: "https://", icon: "Heart", enabled: true },
        { id: "lnk-4", title: "Blog & Artigos", url: "https://", icon: "FileText", enabled: true },
      ] } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "space" } },
      { id: "blk-featured", type: "featured", visible: true, data: { image: "", title: "E-book: Jornada Interior", description: "Descubra 7 práticas diárias para transformar sua rotina. Baixe grátis!", url: "https://" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "linkedin", url: "https://linkedin.com/in/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// PREMIUM 4 — Profissional (Consultor B2B / LinkedIn)
// Blocos: Avatar → Text → Links(5) → Divider → Featured → Marquee → Social
// ============================================
const professional: BiolinkTemplate = {
  id: "professional",
  name: "Profissional",
  description: "Corporativo e confiável para consultores e executivos.",
  isPremium: true,
  config: {
    theme: {
      background: "#F8FAFC",
      backgroundType: "solid",
      backgroundValue: "#F8FAFC",
      textColor: "#0F172A",
      buttonStyle: "filled",
      buttonColor: "#1E40AF",
      buttonTextColor: "#FFFFFF",
      font: "Inter",
      effects: {
        entrance: "slide",
        buttonShimmer: true,
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Consultor de Negócios | Especialista em Escala", nameSize: "lg" } },
      { id: "blk-text", type: "text", visible: true, data: { content: "Ajudo empresas a escalar de 6 para 7 dígitos com processos validados", align: "center" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Agendar Reunião", url: "https://", icon: "Calendar", enabled: true },
        { id: "lnk-2", title: "Case Studies", url: "https://", icon: "BarChart", enabled: true },
        { id: "lnk-3", title: "Newsletter Semanal", url: "https://", icon: "Mail", enabled: true },
        { id: "lnk-4", title: "LinkedIn", url: "https://", icon: "Linkedin", enabled: true },
        { id: "lnk-5", title: "Palestras e Eventos", url: "https://", icon: "Mic", enabled: true },
      ] } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "line" } },
      { id: "blk-featured", type: "featured", visible: true, data: { image: "", title: "Case: 3x mais receita em 6 meses", description: "Veja como ajudei uma empresa SaaS a triplicar o faturamento.", url: "https://" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Estratégia", "Crescimento", "Resultados", "ROI", "Escala"], speed: "slow" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "linkedin", url: "https://linkedin.com/in/" },
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "twitter", url: "https://x.com/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// PREMIUM 5 — Criativo Bold (Designer / Artista)
// Blocos: Avatar → Marquee → Links(4) → Video → Divider → Social
// ============================================
const creativeBold: BiolinkTemplate = {
  id: "creative-bold",
  name: "Criativo Bold",
  description: "Ousado e impactante para designers, artistas e criativos.",
  isPremium: true,
  config: {
    theme: {
      background: "#1A1A2E",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(180deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
      textColor: "#EAEAEA",
      buttonStyle: "filled",
      buttonColor: "#E94560",
      buttonTextColor: "#FFFFFF",
      font: "Montserrat",
      effects: {
        entrance: "scale",
        buttonGlow: true,
        gradientText: true,
        gradientColors: ["#E94560", "#FF6B6B"],
        animatedBg: "aurora",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Designer & Diretor Criativo", nameSize: "lg" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Design", "Branding", "UI/UX", "Motion", "3D", "Identidade Visual"], speed: "normal" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Portfólio Completo", url: "https://", icon: "Palette", enabled: true },
        { id: "lnk-2", title: "Behance", url: "https://", icon: "ExternalLink", enabled: true },
        { id: "lnk-3", title: "Solicitar Orçamento", url: "https://", icon: "FileText", enabled: true },
        { id: "lnk-4", title: "Freebies & Downloads", url: "https://", icon: "Download", enabled: true },
      ] } },
      { id: "blk-video", type: "video", visible: true, data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", aspectRatio: "16:9" } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "dots" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "dribbble", url: "https://dribbble.com/" },
        { platform: "behance", url: "https://behance.net/" },
        { platform: "linkedin", url: "https://linkedin.com/in/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// PREMIUM 6 — Sunset Quente (Fotógrafo / Videomaker)
// Blocos: Avatar → Featured → Links(4) → Divider → Text → Video → Social
// ============================================
const sunsetWarm: BiolinkTemplate = {
  id: "sunset-warm",
  name: "Sunset Quente",
  description: "Visual quente e cinematográfico para fotógrafos e videomakers.",
  isPremium: true,
  config: {
    theme: {
      background: "#1A0A0A",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(135deg, #F97316 0%, #EC4899 50%, #8B5CF6 100%)",
      textColor: "#FFFFFF",
      buttonStyle: "filled",
      buttonColor: "#F97316",
      buttonTextColor: "#FFFFFF",
      font: "Poppins",
      effects: {
        entrance: "fade",
        buttonShimmer: true,
        glassmorphism: true,
        animatedBg: "aurora",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Fotógrafo & Videomaker", nameSize: "lg" } },
      { id: "blk-featured", type: "featured", visible: true, data: { image: "", title: "Portfólio 2025", description: "Ensaios, casamentos, eventos corporativos e muito mais.", url: "https://" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Solicitar Orçamento", url: "https://", icon: "FileText", enabled: true },
        { id: "lnk-2", title: "Portfólio Completo", url: "https://", icon: "Image", enabled: true },
        { id: "lnk-3", title: "Agendar Ensaio", url: "https://", icon: "Calendar", enabled: true },
        { id: "lnk-4", title: "Comprar Presets", url: "https://", icon: "Download", enabled: true },
      ] } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "line" } },
      { id: "blk-text", type: "text", visible: true, data: { content: "📸 Disponível para ensaios, eventos e projetos comerciais", align: "center" } },
      { id: "blk-video", type: "video", visible: true, data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", aspectRatio: "16:9" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "tiktok", url: "https://tiktok.com/@" },
        { platform: "pinterest", url: "https://pinterest.com/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// PREMIUM 7 — Natureza Verde (Nutricionista / Saúde)
// Blocos: Avatar → Text → Links(5) → Divider → Featured → Social
// ============================================
const natureGreen: BiolinkTemplate = {
  id: "nature-green",
  name: "Natureza Verde",
  description: "Natural e acolhedor para profissionais de saúde e bem-estar.",
  isPremium: true,
  config: {
    theme: {
      background: "#F0FDF4",
      backgroundType: "solid",
      backgroundValue: "#F0FDF4",
      textColor: "#14532D",
      buttonStyle: "rounded",
      buttonColor: "#16A34A",
      buttonTextColor: "#FFFFFF",
      font: "Nunito",
      effects: {
        entrance: "fade",
        gradientText: true,
        gradientColors: ["#16A34A", "#4ADE80"],
        animatedBg: "aurora",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Nutricionista | CRN 12345", nameSize: "md" } },
      { id: "blk-text", type: "text", visible: true, data: { content: "🌿 Nutrição funcional e qualidade de vida — atendimento online e presencial", align: "center" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Agendar Consulta", url: "https://", icon: "Calendar", enabled: true },
        { id: "lnk-2", title: "Planos Alimentares", url: "https://", icon: "Leaf", enabled: true },
        { id: "lnk-3", title: "E-book de Receitas", url: "https://", icon: "BookOpen", enabled: true },
        { id: "lnk-4", title: "Receitas no Blog", url: "https://", icon: "UtensilsCrossed", enabled: true },
        { id: "lnk-5", title: "WhatsApp", url: "https://", icon: "MessageCircle", enabled: true },
      ] } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "space" } },
      { id: "blk-featured", type: "featured", visible: true, data: { image: "", title: "E-book: 30 Receitas Saudáveis", description: "Receitas práticas para sua rotina. Baixe grátis e comece hoje!", url: "https://" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "tiktok", url: "https://tiktok.com/@" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// PREMIUM 8 — Oceano Azul (Educador / Professor Online)
// Blocos: Avatar → Marquee → Links(4) → Video → Divider → Text → Social
// ============================================
const oceanBlue: BiolinkTemplate = {
  id: "ocean-blue",
  name: "Oceano Azul",
  description: "Inspirador e educacional para professores e mentores online.",
  isPremium: true,
  config: {
    theme: {
      background: "#0C4A6E",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)",
      textColor: "#F0F9FF",
      buttonStyle: "outline",
      buttonColor: "#38BDF8",
      buttonTextColor: "#38BDF8",
      font: "Inter",
      effects: {
        entrance: "slide",
        buttonGlow: true,
        gradientText: true,
        gradientColors: ["#38BDF8", "#0EA5E9"],
        animatedBg: "particles",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Professor | Educador Digital", nameSize: "lg" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Matemática", "Física", "Química", "Vestibular", "ENEM", "Concursos"], speed: "normal" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Curso Completo", url: "https://", icon: "GraduationCap", enabled: true },
        { id: "lnk-2", title: "Aulas Gratuitas", url: "https://", icon: "Play", enabled: true },
        { id: "lnk-3", title: "Material em PDF", url: "https://", icon: "FileText", enabled: true },
        { id: "lnk-4", title: "Grupo VIP de Estudos", url: "https://", icon: "Users", enabled: true },
      ] } },
      { id: "blk-video", type: "video", visible: true, data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", aspectRatio: "16:9" } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "line" } },
      { id: "blk-text", type: "text", visible: true, data: { content: "📚 +10.000 alunos aprovados em vestibulares e concursos", align: "center" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "tiktok", url: "https://tiktok.com/@" },
        { platform: "telegram", url: "https://t.me/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// PREMIUM 9 — Luxo Escuro (Empreendedor / CEO)
// Blocos: Avatar → Text → Marquee → Links(5) → Divider → Featured → Social
// ============================================
const luxuryDark: BiolinkTemplate = {
  id: "luxury-dark",
  name: "Luxo Escuro",
  description: "Dark premium para empreendedores, CEOs e líderes de mercado.",
  isPremium: true,
  config: {
    theme: {
      background: "#09090B",
      backgroundType: "solid",
      backgroundValue: "#09090B",
      textColor: "#FAFAFA",
      buttonStyle: "filled",
      buttonColor: "#F97316",
      buttonTextColor: "#FFFFFF",
      font: "Playfair Display",
      effects: {
        entrance: "fade",
        buttonGlow: true,
        buttonShimmer: true,
        gradientText: true,
        gradientColors: ["#F97316", "#FBBF24"],
        glassmorphism: true,
        animatedBg: "aurora",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Fundador & CEO | Empreendedor Serial", nameSize: "lg" } },
      { id: "blk-text", type: "text", visible: true, data: { content: "Transformando o mercado digital com inovação e liderança estratégica", align: "center" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Inovação", "Liderança", "Escala", "Impacto", "Visão"], speed: "slow" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Minha Empresa", url: "https://", icon: "Building", enabled: true },
        { id: "lnk-2", title: "Podcast Semanal", url: "https://", icon: "Headphones", enabled: true },
        { id: "lnk-3", title: "Mentoria Executiva", url: "https://", icon: "Target", enabled: true },
        { id: "lnk-4", title: "Meu Livro", url: "https://", icon: "BookOpen", enabled: true },
        { id: "lnk-5", title: "Próximos Eventos", url: "https://", icon: "Ticket", enabled: true },
      ] } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "dots" } },
      { id: "blk-featured", type: "featured", visible: true, data: { image: "", title: "Livro: A Arte de Escalar", description: "Bestseller com mais de 50.000 cópias vendidas. Garanta o seu!", url: "https://" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "linkedin", url: "https://linkedin.com/in/" },
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "twitter", url: "https://x.com/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// EXPORTS
// ============================================
export const BIOLINK_TEMPLATES: BiolinkTemplate[] = [
  defaultTemplate,
  darkElegante,
  neonGradient,
  pastelSoft,
  professional,
  creativeBold,
  sunsetWarm,
  natureGreen,
  oceanBlue,
  luxuryDark,
];

export function getBiolinkTemplate(id: string): BiolinkTemplate | undefined {
  return BIOLINK_TEMPLATES.find((t) => t.id === id);
}

export const FREE_BIOLINK_TEMPLATE_IDS = BIOLINK_TEMPLATES.filter((t) => !t.isPremium).map((t) => t.id);
