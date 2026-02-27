/* ============================================
   TIPOS DO GERADOR DE PROPOSTAS
   Todas as interfaces que definem a estrutura
   de uma proposta comercial
   ============================================ */

// ============================================
// ÍCONES
// ============================================
/** Nome do ícone lucide-react em PascalCase (ex: "Eye", "Target") */
export type LucideIconName = string;

// ============================================
// CATEGORIAS
// ============================================
export type ProposalCategory =
  | "social-media"
  | "trafego-pago"
  | "infoprodutor"
  | "design"
  | "webdesign"
  | "automacao"
  | "vibe-coding"
  | "saude"
  | "academia";

export const categoryLabels: Record<ProposalCategory, string> = {
  "social-media": "Social Media",
  "trafego-pago": "Tráfego Pago",
  infoprodutor: "Infoprodutor",
  design: "Design",
  webdesign: "Web Design",
  automacao: "Automação",
  "vibe-coding": "Vibe Coding",
  saude: "Saúde",
  academia: "Academia",
};

export const allCategories: ProposalCategory[] = [
  "social-media",
  "trafego-pago",
  "infoprodutor",
  "design",
  "webdesign",
  "automacao",
  "vibe-coding",
  "saude",
  "academia",
];

// ============================================
// TEMA
// ============================================
export interface ThemeColors {
  gold: string;
  goldLight: string;
  goldDark: string;
  background: string;
  foreground: string;
  beige: string;
  nude: string;
  cream: string;
}

export interface ThemeFonts {
  heading: string; // Google Font family (ex: "Playfair Display")
  body: string;    // Google Font family (ex: "Poppins")
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts: ThemeFonts;
}

// ============================================
// SEÇÕES — DADOS INDIVIDUAIS (V1 compat)
// ============================================

/** Hero Section */
export interface HeroConfig {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  clientName: string;
  ctaPrimary: {
    label: string;
    scrollTo: string;
  };
  ctaSecondary: {
    label: string;
    url: string;
  };
}

/** Diagnóstico Section */
export type Severity = "alto" | "medio" | "positivo";

export interface DiagnosticoCard {
  icon: LucideIconName;
  title: string;
  description: string;
  severity: Severity;
}

export interface DiagnosticoConfig {
  sectionLabel: string;
  title: string;
  subtitle: string;
  showImages: boolean;
  imagesLabel: string;
  images: Array<{ src: string; alt: string }>;
  cards: DiagnosticoCard[];
}

/** Estratégia Section */
export interface EstrategiaCard {
  icon: LucideIconName;
  title: string;
  description: string;
  items: string[];
}

export interface EstrategiaConfig {
  sectionLabel: string;
  title: string;
  subtitle: string;
  cards: EstrategiaCard[];
}

/** Diferenciais Section */
export interface DiferencialCard {
  icon: LucideIconName;
  title: string;
  description: string;
}

export interface DiferenciaisConfig {
  sectionLabel: string;
  title: string;
  subtitle: string;
  cards: DiferencialCard[];
}

/** Investimento Section */
export interface InvestimentoConfig {
  sectionLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  priceOriginal: string;
  priceCurrent: string;
  priceCurrency: string;
  pricePeriod: string;
  description: string;
  includedItems: string[];
  ctaLabel: string;
  ctaUrl: string;
  guarantee: string;
}

/** Visão Section */
export interface VisaoItem {
  icon: LucideIconName;
  label: string;
}

export interface VisaoConfig {
  sectionLabel: string;
  title: string;
  subtitle: string;
  items: VisaoItem[];
  quote: string;
  quoteHighlight: string;
  footerClientName: string;
  footerNote: string;
}

// ============================================
// SEÇÃO WRAPPER V1 (tipo + visibilidade + dados)
// ============================================
export type SectionType =
  | "hero"
  | "diagnostico"
  | "estrategia"
  | "diferenciais"
  | "investimento"
  | "visao";

export interface SectionEntry<T = HeroConfig | DiagnosticoConfig | EstrategiaConfig | DiferenciaisConfig | InvestimentoConfig | VisaoConfig> {
  type: SectionType;
  visible: boolean;
  data: T;
}

// ============================================
// BLOCOS V2 — NOVOS TIPOS
// ============================================

/** Texto livre */
export interface TextoData {
  title: string;
  body: string;
  alignment: "left" | "center" | "right";
}

/** Imagem */
export interface ImagemData {
  src: string;
  alt: string;
  caption: string;
  fullWidth: boolean;
}

/** Grid de cards genérico */
export interface CardsGridData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  columns: 2 | 3 | 4;
  cards: Array<{
    icon: LucideIconName;
    title: string;
    description: string;
  }>;
}

/** Call to Action */
export interface CtaData {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonUrl: string;
}

/** Divisor */
export interface DividerData {
  style: "line" | "dots" | "space";
  spacing: "sm" | "md" | "lg";
}

/** Galeria de imagens */
export interface GaleriaData {
  title: string;
  columns: 2 | 3 | 4;
  images: Array<{ src: string; alt: string }>;
}

/** Depoimentos */
export interface DepoimentosData {
  sectionLabel: string;
  title: string;
  items: Array<{
    name: string;
    role: string;
    text: string;
    avatar: string;
  }>;
}

// ============================================
// BLOCOS PREMIUM
// ============================================

/** Faixa animada com texto scrollando */
export interface MarqueeData {
  items: string[];
  speed: "slow" | "normal" | "fast";
  direction: "left" | "right";
  variant: "solid" | "outline" | "gradient";
  separator: "star" | "dot" | "diamond" | "slash" | "none";
  size: "sm" | "md" | "lg";
  repeat: number;
  pauseOnHover: boolean;
}

/** Seção com imagem de fundo + overlay */
export interface BackgroundImageData {
  src: string;
  overlayColor: "dark" | "light" | "gold";
  overlayOpacity: number;
  title: string;
  subtitle: string;
  alignment: "left" | "center" | "right";
  textColor: "white" | "dark" | "gold";
  minHeight: "sm" | "md" | "lg" | "xl";
  parallax: boolean;
  buttonLabel: string;
  buttonUrl: string;
}

/** Layout dividido: imagem + texto */
export interface SplitContentData {
  layout: "image-left" | "image-right";
  image: string;
  imageAlt: string;
  imageFit: "cover" | "contain";
  sectionLabel: string;
  title: string;
  body: string;
  items: string[];
  buttonLabel: string;
  buttonUrl: string;
  verticalAlign: "top" | "center" | "bottom";
  imageRounded: boolean;
}

/** Embed de vídeo YouTube/Vimeo */
export interface VideoData {
  url: string;
  title: string;
  subtitle: string;
  aspectRatio: "16:9" | "4:3" | "1:1";
  maxWidth: "sm" | "md" | "lg" | "full";
  rounded: boolean;
  shadow: boolean;
  autoplay: boolean;
}

/** Contadores animados */
export interface CounterItem {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}

export interface CounterData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  items: CounterItem[];
  columns: 2 | 3 | 4;
  duration: number;
  style: "simple" | "card" | "bordered";
}

/** Linha do tempo / Cronograma */
export interface TimelineItem {
  icon: LucideIconName;
  title: string;
  description: string;
  period: string;
}

export interface TimelineData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  items: TimelineItem[];
  layout: "vertical" | "alternating";
  connectorStyle: "solid" | "dashed" | "dots";
}

/** Tabela comparativa de preços */
export interface PricingPlan {
  name: string;
  badge: string;
  highlighted: boolean;
  price: string;
  currency: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
}

export interface PricingTableData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  plans: PricingPlan[];
}

/** Comparação antes/depois */
export interface BeforeAfterData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  layout: "side-by-side" | "slider";
  beforeImage: string;
  beforeLabel: string;
  afterImage: string;
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];
}

// ============================================
// BLOCK TYPE UNION
// ============================================
export type BlockType =
  | "hero"
  | "diagnostico"
  | "estrategia"
  | "diferenciais"
  | "investimento"
  | "visao"
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
  | "before-after";

export type BlockData =
  | HeroConfig
  | DiagnosticoConfig
  | EstrategiaConfig
  | DiferenciaisConfig
  | InvestimentoConfig
  | VisaoConfig
  | TextoData
  | ImagemData
  | CardsGridData
  | CtaData
  | DividerData
  | GaleriaData
  | DepoimentosData
  | MarqueeData
  | BackgroundImageData
  | SplitContentData
  | VideoData
  | CounterData
  | TimelineData
  | PricingTableData
  | BeforeAfterData;

export interface Block {
  id: string;
  type: BlockType;
  visible: boolean;
  data: BlockData;
}

/** Labels para todos os tipos de bloco */
export const blockLabels: Record<BlockType, string> = {
  hero: "Hero",
  diagnostico: "Diagnóstico",
  estrategia: "Estratégia",
  diferenciais: "Diferenciais",
  investimento: "Investimento",
  visao: "Visão de Crescimento",
  texto: "Texto",
  imagem: "Imagem",
  "cards-grid": "Grid de Cards",
  cta: "Call to Action",
  divider: "Divisor",
  galeria: "Galeria",
  depoimentos: "Depoimentos",
  marquee: "Faixa Animada",
  "background-image": "Imagem de Fundo",
  "split-content": "Conteúdo Dividido",
  video: "Vídeo",
  counter: "Contadores",
  timeline: "Linha do Tempo",
  "pricing-table": "Tabela de Preços",
  "before-after": "Antes e Depois",
};

// ============================================
// CONFIG PRINCIPAL DA PROPOSTA
// ============================================
export interface ProposalConfig {
  version: 1 | 2;
  templateId: string;
  meta: {
    title: string;
    description: string;
    clientLogo?: string;
    companyLogo?: string;
  };
  theme: ThemeConfig;
  sections: SectionEntry[];  // V1 compat
  blocks?: Block[];          // V2
}

// ============================================
// STATUS DA PROPOSTA
// ============================================
export type ProposalStatus = "pendente" | "aceita" | "recusada";

export const statusLabels: Record<ProposalStatus, string> = {
  pendente: "Pendente",
  aceita: "Aceita",
  recusada: "Recusada",
};

export const statusColors: Record<ProposalStatus, string> = {
  pendente: "#E67E22",
  aceita: "#5BA68A",
  recusada: "#DC2626",
};

// ============================================
// CATEGORIA DINÂMICA (Supabase)
// ============================================
export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  color: string;
  user_id?: string;
  created_at: string;
}

// ============================================
// REGISTRO NO BANCO (Supabase)
// ============================================
export interface ProposalRecord {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  template_id: string;
  category: ProposalCategory | null;
  category_id: string | null;
  config: ProposalConfig;
  status: ProposalStatus;
  views: number;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// MAPA DE TIPO → CONFIG (helper)
// ============================================
export type SectionDataMap = {
  hero: HeroConfig;
  diagnostico: DiagnosticoConfig;
  estrategia: EstrategiaConfig;
  diferenciais: DiferenciaisConfig;
  investimento: InvestimentoConfig;
  visao: VisaoConfig;
};

/** Labels amigáveis para cada seção (V1 compat) */
export const sectionLabels: Record<SectionType, string> = {
  hero: "Hero",
  diagnostico: "Diagnóstico",
  estrategia: "Estratégia",
  diferenciais: "Diferenciais",
  investimento: "Investimento",
  visao: "Visão de Crescimento",
};
