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
// ULTRA PREMIUM 1 — Agency Dark (Agência / Vendas Online)
// Inspirado no link do João Castanheiro
// Blocos: Avatar → Banner → ImageLink(4) → Video → CTA → Marquee → Social
// ============================================
const agencyDark: BiolinkTemplate = {
  id: "agency-dark",
  name: "Agency Dark",
  description: "Link premium nível agência com botões visuais, vídeo e CTA poderoso.",
  isPremium: true,
  config: {
    theme: {
      background: "#050510",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(180deg, #050510 0%, #0A0A2E 40%, #0F0F35 100%)",
      textColor: "#FFFFFF",
      buttonStyle: "filled",
      buttonColor: "#3B82F6",
      buttonTextColor: "#FFFFFF",
      font: "Space Grotesk",
      effects: {
        entrance: "fade",
        buttonGlow: true,
        buttonShimmer: true,
        gradientText: true,
        gradientColors: ["#3B82F6", "#8B5CF6"],
        glassmorphism: true,
        animatedBg: "particles",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Especialista em Vendas Online | Marketing Digital", nameSize: "lg" } },
      { id: "blk-banner", type: "banner", visible: true, data: { image: "", title: "Enriquecendo Online", subtitle: "O método completo para dominar a internet e faturar 5 dígitos", url: "https://", overlay: 50, height: "lg" } },
      { id: "blk-imagelink", type: "image-link", visible: true, data: { items: [
        { id: "il-1", title: "Especialista em Vendas Online", subtitle: "O melhor curso de marketing digital", url: "https://", image: "", enabled: true },
        { id: "il-2", title: "Jornada Enriquecendo Online", subtitle: "Marketing para vender de R$2.000 a R$10.000", url: "https://", image: "", enabled: true },
        { id: "il-3", title: "Primeiras Vendas em Tempo Recorde", subtitle: "Sem precisar produzir conteúdo", url: "https://", image: "", enabled: true },
        { id: "il-4", title: "Curso Gratuito de Marketing Digital", subtitle: "Do extremo básico às primeiras vendas", url: "https://", image: "", enabled: true },
      ], layout: "overlay" } },
      { id: "blk-video", type: "video", visible: true, data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", aspectRatio: "16:9" } },
      { id: "blk-cta", type: "cta", visible: true, data: { headline: "Quer um link desse para você?", description: "Me chama no WhatsApp e a gente produz um link premium personalizado para o seu negócio.", buttonText: "Chamar no WhatsApp", buttonUrl: "https://wa.me/", image: "", style: "glass" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Marketing Digital", "Vendas Online", "Tráfego Pago", "Funis de Venda", "Escala"], speed: "normal" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "tiktok", url: "https://tiktok.com/@" },
        { platform: "twitter", url: "https://x.com/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// ULTRA PREMIUM 2 — Motion Studio (Videomaker / Motion Designer)
// Blocos: Avatar → Carousel → Text → ImageLink(3) → Video → Countdown → CTA → Social
// ============================================
const motionStudio: BiolinkTemplate = {
  id: "motion-studio",
  name: "Motion Studio",
  description: "Cinematográfico com carrossel, motion e countdown para lançamentos.",
  isPremium: true,
  config: {
    theme: {
      background: "#0A0A0A",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(135deg, #0A0A0A 0%, #1A0A2E 50%, #0A1628 100%)",
      textColor: "#F5F5F5",
      buttonStyle: "rounded",
      buttonColor: "#A855F7",
      buttonTextColor: "#FFFFFF",
      font: "Montserrat",
      effects: {
        entrance: "scale",
        buttonGlow: true,
        buttonShimmer: true,
        gradientText: true,
        gradientColors: ["#A855F7", "#EC4899"],
        glassmorphism: true,
        animatedBg: "aurora",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Motion Designer & Videomaker", nameSize: "lg" } },
      { id: "blk-carousel", type: "carousel", visible: true, data: { items: [
        { id: "cr-1", image: "", title: "Projeto Alpha", url: "https://" },
        { id: "cr-2", image: "", title: "Projeto Beta", url: "https://" },
        { id: "cr-3", image: "", title: "Projeto Gamma", url: "https://" },
      ], autoPlay: 4, aspectRatio: "16:9" } },
      { id: "blk-text", type: "text", visible: true, data: { content: "Criando experiências visuais que vendem e impactam", align: "center" } },
      { id: "blk-imagelink", type: "image-link", visible: true, data: { items: [
        { id: "il-1", title: "Portfólio Completo", subtitle: "Veja meus melhores trabalhos", url: "https://", image: "", enabled: true },
        { id: "il-2", title: "Curso de Motion Design", subtitle: "Do zero ao profissional", url: "https://", image: "", enabled: true },
        { id: "il-3", title: "Pack de Templates", subtitle: "After Effects & Premiere Pro", url: "https://", image: "", enabled: true },
      ], layout: "overlay" } },
      { id: "blk-video", type: "video", visible: true, data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", aspectRatio: "16:9" } },
      { id: "blk-countdown", type: "countdown", visible: true, data: { targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), label: "Novo curso lança em", endMessage: "Lançamento disponível!", style: "cards" } },
      { id: "blk-cta", type: "cta", visible: true, data: { headline: "Solicite um Orçamento", description: "Vídeos, motion graphics e edição profissional para sua marca.", buttonText: "Solicitar Orçamento", buttonUrl: "https://", image: "", style: "gradient" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "behance", url: "https://behance.net/" },
        { platform: "dribbble", url: "https://dribbble.com/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// ULTRA PREMIUM 3 — Infoprodutor Pro (Infoprodutor / Lançador)
// Blocos: Avatar → Marquee → Banner → ImageLink(3) → Countdown → Video → CTA → Divider → Featured → Social
// ============================================
const infoprodutorPro: BiolinkTemplate = {
  id: "infoprodutor-pro",
  name: "Infoprodutor Pro",
  description: "Completo para infoprodutores com countdown, CTA e botões visuais.",
  isPremium: true,
  config: {
    theme: {
      background: "#0B0B0F",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(180deg, #0B0B0F 0%, #1A0F0F 50%, #0F1A0F 100%)",
      textColor: "#FFFFFF",
      buttonStyle: "filled",
      buttonColor: "#EF4444",
      buttonTextColor: "#FFFFFF",
      font: "Inter",
      effects: {
        entrance: "slide",
        buttonGlow: true,
        buttonShimmer: true,
        gradientText: true,
        gradientColors: ["#EF4444", "#F97316"],
        glassmorphism: true,
        animatedBg: "aurora",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Infoprodutor | Mentor de Lançamentos Digitais", nameSize: "lg" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Lançamento Aberto", "Vagas Limitadas", "Garantia de 7 Dias", "Bônus Exclusivos"], speed: "normal" } },
      { id: "blk-banner", type: "banner", visible: true, data: { image: "", title: "Método 6em7", subtitle: "Fature 6 dígitos em 7 dias com lançamentos digitais", url: "https://", overlay: 45, height: "md" } },
      { id: "blk-imagelink", type: "image-link", visible: true, data: { items: [
        { id: "il-1", title: "Treinamento Completo", subtitle: "Acesso vitalício + comunidade VIP", url: "https://", image: "", enabled: true },
        { id: "il-2", title: "Mentoria Individual", subtitle: "Acompanhamento 1:1 por 90 dias", url: "https://", image: "", enabled: true },
        { id: "il-3", title: "Pack de Materiais", subtitle: "Scripts, templates e checklists", url: "https://", image: "", enabled: true },
      ], layout: "side" } },
      { id: "blk-countdown", type: "countdown", visible: true, data: { targetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), label: "Oferta especial termina em", endMessage: "Inscrições encerradas!", style: "cards" } },
      { id: "blk-video", type: "video", visible: true, data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", aspectRatio: "16:9" } },
      { id: "blk-cta", type: "cta", visible: true, data: { headline: "Garanta sua Vaga Agora", description: "São apenas 50 vagas nessa turma. Não fique de fora!", buttonText: "QUERO MINHA VAGA", buttonUrl: "https://", image: "", style: "glass" } },
      { id: "blk-divider", type: "divider", visible: true, data: { style: "dots" } },
      { id: "blk-featured", type: "featured", visible: true, data: { image: "", title: "Case: R$127k em 7 dias", description: "Veja o passo a passo do meu último lançamento de sucesso.", url: "https://" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "tiktok", url: "https://tiktok.com/@" },
        { platform: "telegram", url: "https://t.me/" },
      ], size: "md" } },
    ],
  },
};

// ============================================
// ULTRA PREMIUM 4 — Personal Brand (Marca Pessoal / Influencer Top)
// Blocos: Avatar → Banner → Carousel → Links(3) → ImageLink(2) → Video → Marquee → CTA → Social
// ============================================
const personalBrand: BiolinkTemplate = {
  id: "personal-brand",
  name: "Personal Brand",
  description: "Identidade visual premium para marcas pessoais e influencers de alto nível.",
  isPremium: true,
  config: {
    theme: {
      background: "#0C0C0C",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(180deg, #0C0C0C 0%, #1A1A1A 100%)",
      textColor: "#FFFFFF",
      buttonStyle: "outline",
      buttonColor: "#D4AF37",
      buttonTextColor: "#D4AF37",
      font: "Playfair Display",
      effects: {
        entrance: "fade",
        buttonGlow: true,
        gradientText: true,
        gradientColors: ["#D4AF37", "#F4E4A6"],
        glassmorphism: true,
        animatedBg: "float",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Seu Nome", bio: "Marca Pessoal | Autoridade | Lifestyle", nameSize: "lg" } },
      { id: "blk-banner", type: "banner", visible: true, data: { image: "", title: "", subtitle: "", url: "https://", overlay: 0, height: "lg" } },
      { id: "blk-carousel", type: "carousel", visible: true, data: { items: [
        { id: "cr-1", image: "", title: "Minha História", url: "https://" },
        { id: "cr-2", image: "", title: "Nos Bastidores", url: "https://" },
        { id: "cr-3", image: "", title: "Eventos VIP", url: "https://" },
        { id: "cr-4", image: "", title: "Resultados", url: "https://" },
      ], autoPlay: 5, aspectRatio: "4:3" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "Meu Podcast", url: "https://", icon: "Headphones", enabled: true },
        { id: "lnk-2", title: "Livro Best-Seller", url: "https://", icon: "BookOpen", enabled: true },
        { id: "lnk-3", title: "Agenda de Eventos", url: "https://", icon: "Calendar", enabled: true },
      ] } },
      { id: "blk-imagelink", type: "image-link", visible: true, data: { items: [
        { id: "il-1", title: "Mentoria Premium", subtitle: "Programa exclusivo de 6 meses", url: "https://", image: "", enabled: true },
        { id: "il-2", title: "Círculo de Líderes", subtitle: "Networking de alto nível", url: "https://", image: "", enabled: true },
      ], layout: "overlay" } },
      { id: "blk-video", type: "video", visible: true, data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", aspectRatio: "16:9" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Autoridade", "Influência", "Impacto", "Legacy", "Premium"], speed: "slow" } },
      { id: "blk-cta", type: "cta", visible: true, data: { headline: "Agende uma Reunião Exclusiva", description: "Vagas limitadas para assessoria de marca pessoal.", buttonText: "Falar com minha Equipe", buttonUrl: "https://", image: "", style: "glass" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "youtube", url: "https://youtube.com/@" },
        { platform: "linkedin", url: "https://linkedin.com/in/" },
        { platform: "twitter", url: "https://x.com/" },
      ], size: "lg" } },
    ],
  },
};

// ============================================
// ULTRA PREMIUM 5 — E-commerce Vitrine (Loja / Dropshipping)
// Blocos: Avatar → Marquee → Carousel → ImageLink(4) → Banner → Countdown → Links(3) → CTA → Social
// ============================================
const ecommerceVitrine: BiolinkTemplate = {
  id: "ecommerce-vitrine",
  name: "E-commerce Vitrine",
  description: "Vitrine completa para lojas online com carrossel de produtos e ofertas.",
  isPremium: true,
  config: {
    theme: {
      background: "#0F0F0F",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(180deg, #0F0F0F 0%, #0F1419 50%, #0A1A1A 100%)",
      textColor: "#FFFFFF",
      buttonStyle: "filled",
      buttonColor: "#10B981",
      buttonTextColor: "#FFFFFF",
      font: "Poppins",
      effects: {
        entrance: "slide",
        buttonShimmer: true,
        gradientText: true,
        gradientColors: ["#10B981", "#34D399"],
        glassmorphism: true,
        animatedBg: "float",
      },
    },
    blocks: [
      { id: "blk-avatar", type: "avatar", visible: true, data: { image: "", name: "Sua Marca", bio: "Loja Oficial | Frete Grátis acima de R$199", nameSize: "lg" } },
      { id: "blk-marquee", type: "marquee", visible: true, data: { items: ["Frete Grátis", "Até 70% OFF", "Pix com Desconto", "Parcele em 12x", "Troca Grátis"], speed: "normal" } },
      { id: "blk-carousel", type: "carousel", visible: true, data: { items: [
        { id: "cr-1", image: "", title: "Nova Coleção", url: "https://" },
        { id: "cr-2", image: "", title: "Mais Vendidos", url: "https://" },
        { id: "cr-3", image: "", title: "Promoções", url: "https://" },
      ], autoPlay: 3, aspectRatio: "1:1" } },
      { id: "blk-imagelink", type: "image-link", visible: true, data: { items: [
        { id: "il-1", title: "Nova Coleção 2025", subtitle: "Lançamento exclusivo com até 30% OFF", url: "https://", image: "", enabled: true },
        { id: "il-2", title: "Kit Bestseller", subtitle: "Nossos 3 produtos mais vendidos", url: "https://", image: "", enabled: true },
        { id: "il-3", title: "Outlet até 70% OFF", subtitle: "Últimas unidades com preço de custo", url: "https://", image: "", enabled: true },
        { id: "il-4", title: "Catálogo Completo", subtitle: "+200 produtos disponíveis", url: "https://", image: "", enabled: true },
      ], layout: "side" } },
      { id: "blk-banner", type: "banner", visible: true, data: { image: "", title: "MEGA PROMO", subtitle: "Até 70% de desconto em produtos selecionados", url: "https://", overlay: 40, height: "md" } },
      { id: "blk-countdown", type: "countdown", visible: true, data: { targetDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), label: "Promoção termina em", endMessage: "Promoção encerrada!", style: "inline" } },
      { id: "blk-links", type: "links", visible: true, data: { items: [
        { id: "lnk-1", title: "WhatsApp — Atendimento", url: "https://", icon: "MessageCircle", enabled: true },
        { id: "lnk-2", title: "Rastrear Meu Pedido", url: "https://", icon: "ExternalLink", enabled: true },
        { id: "lnk-3", title: "Trocas e Devoluções", url: "https://", icon: "Mail", enabled: true },
      ] } },
      { id: "blk-cta", type: "cta", visible: true, data: { headline: "Primeira Compra?", description: "Ganhe 15% de desconto usando o cupom PRIMEIRA15 na sua primeira compra.", buttonText: "Comprar com Desconto", buttonUrl: "https://", image: "", style: "gradient" } },
      { id: "blk-social", type: "social", visible: true, data: { items: [
        { platform: "instagram", url: "https://instagram.com/" },
        { platform: "tiktok", url: "https://tiktok.com/@" },
        { platform: "facebook", url: "https://facebook.com/" },
        { platform: "pinterest", url: "https://pinterest.com/" },
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
  agencyDark,
  motionStudio,
  infoprodutorPro,
  personalBrand,
  ecommerceVitrine,
];

export function getBiolinkTemplate(id: string): BiolinkTemplate | undefined {
  return BIOLINK_TEMPLATES.find((t) => t.id === id);
}

export const FREE_BIOLINK_TEMPLATE_IDS = BIOLINK_TEMPLATES.filter((t) => !t.isPremium).map((t) => t.id);
