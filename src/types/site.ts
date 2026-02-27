/* ============================================
   GERASITES TYPES
   Tipos para criador de sites (landing page).
   ============================================ */

import type { ThemeConfig } from "./proposal";

// ============================================
// SITE-SPECIFIC BLOCK TYPES
// ============================================
export type SiteBlockType =
  | "site-navbar"
  | "site-hero"
  | "site-footer"
  | "site-contact"
  | "site-services"
  | "site-about"
  // Blocos reutilizados das propostas
  | "texto"
  | "imagem"
  | "cards-grid"
  | "cta"
  | "divider"
  | "galeria"
  | "depoimentos"
  | "marquee"
  | "background-image"
  | "split-content"
  | "video"
  | "counter"
  | "timeline"
  | "pricing-table"
  | "before-after"
  // Novos blocos site-specific
  | "site-faq"
  | "site-team"
  | "site-map"
  | "site-banner"
  | "site-logos";

export const siteBlockLabels: Record<SiteBlockType, string> = {
  "site-navbar": "Navegação",
  "site-hero": "Hero",
  "site-footer": "Rodapé",
  "site-contact": "Contato",
  "site-services": "Serviços",
  "site-about": "Sobre",
  texto: "Texto",
  imagem: "Imagem",
  "cards-grid": "Cards",
  cta: "Botão CTA",
  divider: "Separador",
  galeria: "Galeria",
  depoimentos: "Depoimentos",
  marquee: "Faixa Animada",
  "background-image": "Imagem de Fundo",
  "split-content": "Conteúdo Dividido",
  video: "Vídeo",
  counter: "Contador",
  timeline: "Timeline",
  "pricing-table": "Tabela de Preços",
  "before-after": "Antes e Depois",
  "site-faq": "FAQ / Perguntas",
  "site-team": "Equipe",
  "site-map": "Mapa / Local",
  "site-banner": "Banner",
  "site-logos": "Logos / Parceiros",
};

// ============================================
// SITE-SPECIFIC BLOCK DATA
// ============================================
export interface NavLink {
  label: string;
  href: string;
}

export interface SiteNavbarData {
  logo: string;
  logoText: string;
  logoDisplay: "image" | "text" | "both";
  showHeader: boolean;
  align: "left" | "center" | "spread";
  links: NavLink[];
  style: "transparent" | "solid" | "glass";
  ctaText: string;
  ctaUrl: string;
}

export interface SiteHeroData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundOverlay: number;
  ctaPrimary: { text: string; url: string };
  ctaSecondary: { text: string; url: string };
  height: "full" | "large" | "medium";
  align: "left" | "center" | "right";
}

export interface FooterColumn {
  title: string;
  links: { label: string; url: string }[];
}

export interface SiteFooterData {
  columns: FooterColumn[];
  copyright: string;
  socialLinks: { platform: string; url: string }[];
}

export interface SiteContactData {
  title: string;
  subtitle: string;
  mode: "form" | "whatsapp" | "both";
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  image: string;
}

export interface SiteServicesData {
  title: string;
  subtitle: string;
  items: ServiceItem[];
  columns: 2 | 3 | 4;
  style: "card" | "icon" | "image";
}

export interface SiteAboutData {
  title: string;
  body: string;
  image: string;
  imagePosition: "left" | "right";
  ctaText: string;
  ctaUrl: string;
}

// ============================================
// NEW SITE-SPECIFIC BLOCK DATA
// ============================================
export interface SiteFaqData {
  title: string;
  subtitle: string;
  items: { question: string; answer: string }[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  social?: { platform: string; url: string }[];
}

export interface SiteTeamData {
  title: string;
  subtitle: string;
  members: TeamMember[];
  columns: 2 | 3 | 4;
}

export interface SiteMapData {
  title: string;
  address: string;
  embedUrl: string;
  height: "sm" | "md" | "lg";
}

export interface SiteBannerData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlay: number;
  align: "left" | "center" | "right";
  ctaText: string;
  ctaUrl: string;
}

export interface SiteLogosData {
  title: string;
  items: { image: string; alt: string; url?: string }[];
}

// ============================================
// BLOCK LAYOUT (per-section styling)
// ============================================
export interface BlockLayout {
  align: "left" | "center" | "right";
  fullWidth: boolean;
  background: {
    type: "none" | "color" | "gradient" | "image";
    value: string;
    overlay: number;
  };
  padding: "none" | "sm" | "md" | "lg" | "xl";
}

// ============================================
// SITE BLOCK
// ============================================
export interface SiteBlock {
  id: string;
  type: SiteBlockType;
  visible: boolean;
  data: Record<string, unknown>;
  layout: BlockLayout;
}

// ============================================
// NAVIGATION CONFIG
// ============================================
export interface SiteNavConfig {
  style: "topbar" | "sidebar" | "none";
  sticky: boolean;
  logo: string;
  links: NavLink[];
}

// ============================================
// GLOBAL STYLES
// ============================================
export interface SiteGlobalStyles {
  maxWidth: "full" | "1200" | "960";
  sectionSpacing: "none" | "sm" | "md" | "lg";
}

// ============================================
// SITE CONFIG
// ============================================
export interface SiteConfig {
  version: 2;
  templateId: string;
  meta: {
    title: string;
    description: string;
    favicon?: string;
  };
  theme: ThemeConfig;
  nav: SiteNavConfig;
  globalStyles: SiteGlobalStyles;
  blocks: SiteBlock[];
}

// ============================================
// RECORD (from Supabase)
// ============================================
export interface SiteRecord {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  template_id: string;
  config: SiteConfig;
  views: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// TEMPLATE
// ============================================
export type SiteCategory =
  | "negocios"
  | "portfolio"
  | "agencia"
  | "restaurante"
  | "saude"
  | "pessoal"
  | "tecnologia"
  | "academia"
  | "beleza"
  | "fotografia";

export const siteCategoryLabels: Record<SiteCategory, string> = {
  negocios: "Negócios",
  portfolio: "Portfólio",
  agencia: "Agência",
  restaurante: "Restaurante",
  saude: "Saúde",
  pessoal: "Pessoal",
  tecnologia: "Tecnologia",
  academia: "Academia",
  beleza: "Beleza",
  fotografia: "Fotografia",
};

export interface SiteTemplate {
  id: string;
  name: string;
  description: string;
  category: SiteCategory;
  config: SiteConfig;
}
