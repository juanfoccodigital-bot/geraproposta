/* ============================================
   SITE BLOCK DEFAULTS
   Dados padrão para blocos do GeraSites.
   ============================================ */

import type { SiteBlockType, BlockLayout } from "@/types/site";

export const defaultLayout: BlockLayout = {
  align: "center",
  fullWidth: false,
  background: { type: "none", value: "", overlay: 0 },
  padding: "md",
};

const siteDefaults: Partial<Record<SiteBlockType, Record<string, unknown>>> = {
  // ── Site-specific blocks ──
  "site-navbar": {
    logo: "",
    logoText: "Minha Empresa",
    logoDisplay: "text",
    showHeader: true,
    align: "spread",
    links: [
      { label: "Início", href: "#hero" },
      { label: "Sobre", href: "#sobre" },
      { label: "Serviços", href: "#servicos" },
      { label: "Contato", href: "#contato" },
    ],
    style: "solid",
    ctaText: "Fale Conosco",
    ctaUrl: "#contato",
  },
  "site-hero": {
    title: "Transformamos Ideias em Resultados",
    subtitle: "Soluções profissionais para impulsionar seu negócio.",
    backgroundImage: "",
    backgroundOverlay: 50,
    ctaPrimary: { text: "Começar Agora", url: "#contato" },
    ctaSecondary: { text: "Saiba Mais", url: "#sobre" },
    height: "large",
    align: "center",
  },
  "site-footer": {
    columns: [
      { title: "Empresa", links: [{ label: "Sobre", url: "#sobre" }, { label: "Serviços", url: "#servicos" }] },
      { title: "Contato", links: [{ label: "WhatsApp", url: "#" }, { label: "Email", url: "#" }] },
    ],
    copyright: "© 2026 Minha Empresa. Todos os direitos reservados.",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
    ],
  },
  "site-contact": {
    title: "Entre em Contato",
    subtitle: "Estamos prontos para ajudar no seu projeto.",
    mode: "whatsapp",
    whatsappNumber: "",
    whatsappMessage: "Olá! Vim pelo seu site e gostaria de saber mais.",
    email: "",
  },
  "site-services": {
    title: "Nossos Serviços",
    subtitle: "Soluções completas para o seu negócio.",
    items: [
      { icon: "Palette", title: "Design", description: "Criamos visuais impactantes para sua marca.", image: "" },
      { icon: "Code", title: "Desenvolvimento", description: "Sites e aplicações modernas e rápidas.", image: "" },
      { icon: "TrendingUp", title: "Marketing", description: "Estratégias para crescer sua presença online.", image: "" },
    ],
    columns: 3,
    style: "card",
  },
  "site-about": {
    title: "Sobre Nós",
    body: "Somos uma empresa dedicada a entregar resultados excepcionais. Com anos de experiência no mercado, ajudamos nossos clientes a alcançar seus objetivos.",
    image: "",
    imagePosition: "right",
    ctaText: "Saiba Mais",
    ctaUrl: "#contato",
  },

  // ── New site-specific blocks ──
  "site-faq": {
    title: "Perguntas Frequentes",
    subtitle: "Tire suas dúvidas sobre nossos serviços.",
    items: [
      { question: "Como funciona o processo?", answer: "Nosso processo é simples e transparente. Entre em contato, faremos uma análise e apresentaremos uma proposta personalizada." },
      { question: "Qual o prazo de entrega?", answer: "Os prazos variam conforme o projeto. Em geral, entregas são feitas entre 7 e 30 dias úteis." },
      { question: "Vocês oferecem suporte?", answer: "Sim! Oferecemos suporte completo durante e após a entrega do projeto." },
    ],
  },
  "site-team": {
    title: "Nossa Equipe",
    subtitle: "Conheça os profissionais por trás dos resultados.",
    members: [
      { name: "Ana Silva", role: "CEO & Fundadora", image: "", social: [{ platform: "linkedin", url: "#" }] },
      { name: "Carlos Santos", role: "Diretor de Design", image: "", social: [{ platform: "instagram", url: "#" }] },
      { name: "Maria Oliveira", role: "Desenvolvedora", image: "", social: [{ platform: "linkedin", url: "#" }] },
    ],
    columns: 3,
  },
  "site-map": {
    title: "Nossa Localização",
    address: "Rua Exemplo, 123 - Centro, São Paulo - SP",
    embedUrl: "",
    height: "md",
  },
  "site-banner": {
    title: "Pronto para Transformar seu Negócio?",
    subtitle: "Entre em contato e descubra como podemos ajudar.",
    backgroundImage: "",
    overlay: 60,
    align: "center",
    ctaText: "Fale Conosco",
    ctaUrl: "#contato",
  },
  "site-logos": {
    title: "Empresas que Confiam em Nós",
    items: [
      { image: "", alt: "Cliente 1" },
      { image: "", alt: "Cliente 2" },
      { image: "", alt: "Cliente 3" },
      { image: "", alt: "Cliente 4" },
    ],
  },

  // ── Reused proposal blocks ──
  texto: {
    title: "",
    body: "Seu texto aqui. Personalize o conteúdo desta seção.",
    alignment: "center",
  },
  imagem: {
    src: "",
    alt: "Imagem",
    caption: "",
    fullWidth: false,
  },
  "cards-grid": {
    sectionLabel: "Destaques",
    title: "Nossos Diferenciais",
    subtitle: "O que nos torna especiais.",
    columns: 3,
    cards: [
      { icon: "Star", title: "Qualidade", description: "Entregamos trabalhos de alta qualidade." },
      { icon: "Zap", title: "Agilidade", description: "Processos rápidos e eficientes." },
      { icon: "Shield", title: "Segurança", description: "Dados protegidos e processos confiáveis." },
    ],
  },
  cta: {
    title: "Pronto para começar?",
    subtitle: "Entre em contato e vamos conversar sobre seu projeto.",
    buttonLabel: "Fale Conosco",
    buttonUrl: "#contato",
  },
  divider: {
    style: "line",
    spacing: "md",
  },
  galeria: {
    title: "Galeria",
    columns: 3,
    images: [],
  },
  depoimentos: {
    sectionLabel: "Depoimentos",
    title: "O que dizem nossos clientes",
    items: [
      { name: "João P.", role: "Empresário", text: "Excelente trabalho! Superou todas as expectativas.", avatar: "" },
      { name: "Maria L.", role: "Designer", text: "Profissionalismo e qualidade impecáveis.", avatar: "" },
      { name: "Pedro S.", role: "CEO", text: "Parceria incrível. Recomendo para todos!", avatar: "" },
    ],
  },
  marquee: {
    items: ["Destaque", "Promoção", "Novidade", "Qualidade", "Excelência"],
    speed: "normal",
    direction: "left",
    variant: "solid",
    separator: "star",
    size: "md",
    repeat: 4,
    pauseOnHover: true,
  },
  "background-image": {
    src: "",
    overlayColor: "dark",
    overlayOpacity: 50,
    title: "Seu Título Aqui",
    subtitle: "Uma descrição para esta seção.",
    alignment: "center",
    textColor: "white",
    minHeight: "md",
    parallax: false,
    buttonLabel: "Saiba Mais",
    buttonUrl: "#",
  },
  "split-content": {
    layout: "image-left",
    image: "",
    imageAlt: "Imagem",
    imageFit: "cover",
    sectionLabel: "",
    title: "Título da Seção",
    body: "Descrição detalhada sobre este tópico.",
    items: ["Ponto destaque 1", "Ponto destaque 2", "Ponto destaque 3"],
    buttonLabel: "Saiba Mais",
    buttonUrl: "#",
  },
  video: {
    url: "",
    title: "Vídeo",
    subtitle: "Assista ao nosso vídeo.",
    aspectRatio: "16:9",
    maxWidth: "md",
    rounded: true,
    shadow: true,
    autoplay: false,
  },
  counter: {
    sectionLabel: "Números",
    title: "Nossos Resultados",
    subtitle: "Alguns números que nos orgulham.",
    items: [
      { value: 500, suffix: "+", label: "Clientes Atendidos" },
      { value: 98, suffix: "%", label: "Satisfação" },
      { value: 10, suffix: "+", label: "Anos de Experiência" },
    ],
    columns: 3,
    duration: 2000,
    style: "card",
  },
  timeline: {
    sectionLabel: "Processo",
    title: "Como Funciona",
    subtitle: "Nosso processo passo a passo.",
    items: [
      { title: "Consultoria", description: "Entendemos suas necessidades.", date: "Passo 1" },
      { title: "Planejamento", description: "Criamos uma estratégia personalizada.", date: "Passo 2" },
      { title: "Execução", description: "Desenvolvemos e entregamos.", date: "Passo 3" },
    ],
    layout: "vertical",
    connectorStyle: "solid",
  },
  "pricing-table": {
    sectionLabel: "Preços",
    title: "Nossos Planos",
    subtitle: "Escolha o plano ideal para você.",
    plans: [
      { name: "Básico", price: "R$ 99", period: "/mês", features: ["Recurso 1", "Recurso 2"], highlighted: false, buttonLabel: "Começar", buttonUrl: "#" },
      { name: "Profissional", price: "R$ 199", period: "/mês", features: ["Tudo do Básico", "Recurso 3", "Recurso 4"], highlighted: true, buttonLabel: "Escolher", buttonUrl: "#" },
      { name: "Enterprise", price: "R$ 399", period: "/mês", features: ["Tudo do Pro", "Recurso 5", "Recurso 6"], highlighted: false, buttonLabel: "Contato", buttonUrl: "#" },
    ],
  },
  "before-after": {
    sectionLabel: "Transformação",
    title: "Antes e Depois",
    subtitle: "Veja os resultados do nosso trabalho.",
    layout: "side-by-side",
    beforeImage: "",
    beforeLabel: "Antes",
    afterImage: "",
    afterLabel: "Depois",
    beforeItems: ["Problema 1", "Problema 2"],
    afterItems: ["Solução 1", "Solução 2"],
  },
};

export function getSiteBlockDefault(type: SiteBlockType): Record<string, unknown> {
  if (siteDefaults[type]) {
    return JSON.parse(JSON.stringify(siteDefaults[type]));
  }
  return {};
}
