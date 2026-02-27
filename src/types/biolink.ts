/* ============================================
   GERALINK TYPES
   Tipos para biolinks (link na bio).
   ============================================ */

// ============================================
// BLOCK TYPES
// ============================================
export type BiolinkBlockType =
  | "avatar"
  | "links"
  | "social"
  | "divider"
  | "text"
  | "featured"
  | "video"
  | "marquee";

export const BIOLINK_FREE_BLOCKS: BiolinkBlockType[] = ["avatar", "links"];

export const biolinkBlockLabels: Record<BiolinkBlockType, string> = {
  avatar: "Perfil",
  links: "Links",
  social: "Redes Sociais",
  divider: "Separador",
  text: "Texto",
  featured: "Destaque",
  video: "Vídeo",
  marquee: "Faixa Animada",
};

// ============================================
// BLOCK DATA INTERFACES
// ============================================
export interface AvatarData {
  image: string;
  name: string;
  bio: string;
  nameSize: "sm" | "md" | "lg";
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface LinksData {
  items: LinkItem[];
}

export interface SocialItem {
  platform: string;
  url: string;
}

export interface SocialData {
  items: SocialItem[];
  size: "sm" | "md" | "lg";
}

export interface BiolinkDividerData {
  style: "line" | "dots" | "space";
}

export interface BiolinkTextData {
  content: string;
  align: "left" | "center" | "right";
}

export interface FeaturedData {
  image: string;
  title: string;
  description: string;
  url: string;
}

export interface BiolinkVideoData {
  url: string;
  aspectRatio: "16:9" | "1:1" | "9:16";
}

export interface BiolinkMarqueeData {
  items: string[];
  speed: "slow" | "normal" | "fast";
}

export type BiolinkBlockData =
  | AvatarData
  | LinksData
  | SocialData
  | BiolinkDividerData
  | BiolinkTextData
  | FeaturedData
  | BiolinkVideoData
  | BiolinkMarqueeData;

// ============================================
// BLOCK
// ============================================
export interface BiolinkBlock {
  id: string;
  type: BiolinkBlockType;
  visible: boolean;
  data: BiolinkBlockData;
}

// ============================================
// PREMIUM EFFECTS
// ============================================
export interface BiolinkEffects {
  /** Block entrance animation */
  entrance?: "none" | "fade" | "slide" | "scale";
  /** Glow effect on buttons */
  buttonGlow?: boolean;
  /** Shimmer sweep on buttons */
  buttonShimmer?: boolean;
  /** Gradient text on avatar name */
  gradientText?: boolean;
  /** Gradient colors for text (from → to) */
  gradientColors?: [string, string];
  /** Glass morphism on featured cards */
  glassmorphism?: boolean;
  /** Animated background effect */
  animatedBg?: "none" | "aurora" | "particles" | "float";
}

// ============================================
// THEME
// ============================================
export interface BiolinkTheme {
  background: string;
  backgroundType: "solid" | "gradient" | "image";
  backgroundValue: string;
  textColor: string;
  buttonStyle: "filled" | "outline" | "ghost" | "rounded";
  buttonColor: string;
  buttonTextColor: string;
  font: string;
  effects?: BiolinkEffects;
}

// ============================================
// CONFIG
// ============================================
export interface BiolinkConfig {
  theme: BiolinkTheme;
  blocks: BiolinkBlock[];
}

// ============================================
// RECORD (from Supabase)
// ============================================
export interface BiolinkRecord {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  template_id: string;
  config: BiolinkConfig;
  views: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// TEMPLATE
// ============================================
export interface BiolinkTemplate {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  config: BiolinkConfig;
}
