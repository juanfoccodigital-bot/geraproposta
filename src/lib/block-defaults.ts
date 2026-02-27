import type {
  BlockType,
  BlockData,
  HeroConfig,
  DiagnosticoConfig,
  EstrategiaConfig,
  DiferenciaisConfig,
  InvestimentoConfig,
  VisaoConfig,
  TextoData,
  ImagemData,
  CardsGridData,
  CtaData,
  DividerData,
  GaleriaData,
  DepoimentosData,
  MarqueeData,
  BackgroundImageData,
  SplitContentData,
  VideoData,
  CounterData,
  TimelineData,
  PricingTableData,
  BeforeAfterData,
} from "@/types/proposal";

/* ============================================
   BLOCK DEFAULTS
   Dados padrão para cada tipo de bloco quando
   adicionado da paleta
   ============================================ */

const defaults: Record<BlockType, BlockData> = {
  hero: {
    badge: "Proposta Comercial",
    titleLine1: "Transforme sua",
    titleHighlight: "Presença Digital",
    subtitle: "Uma proposta personalizada para alcançar seus objetivos.",
    clientName: "Cliente",
    ctaPrimary: { label: "Ver Investimento", scrollTo: "investimento" },
    ctaSecondary: { label: "Fale Conosco", url: "https://wa.me/" },
  } as HeroConfig,

  diagnostico: {
    sectionLabel: "Diagnóstico",
    title: "Análise Atual",
    subtitle: "Identificamos os principais pontos de atenção.",
    showImages: false,
    imagesLabel: "Análise Visual",
    images: [],
    cards: [
      { icon: "AlertCircle", title: "Ponto 1", description: "Descrição do ponto de atenção.", severity: "alto" },
      { icon: "TrendingUp", title: "Oportunidade", description: "Há espaço para crescimento.", severity: "positivo" },
    ],
  } as DiagnosticoConfig,

  estrategia: {
    sectionLabel: "Estratégia",
    title: "Plano de Ação",
    subtitle: "Os pilares da nossa estratégia.",
    cards: [
      {
        icon: "Target",
        title: "Pilar 1",
        description: "Descrição do primeiro pilar estratégico.",
        items: ["Item 1", "Item 2"],
      },
    ],
  } as EstrategiaConfig,

  diferenciais: {
    sectionLabel: "Diferenciais",
    title: "Por que nos escolher",
    subtitle: "O que nos diferencia no mercado.",
    cards: [
      { icon: "Star", title: "Diferencial 1", description: "Descrição do diferencial." },
      { icon: "Shield", title: "Diferencial 2", description: "Descrição do diferencial." },
    ],
  } as DiferenciaisConfig,

  investimento: {
    sectionLabel: "Investimento",
    title: "Investimento",
    subtitle: "Valor acessível para resultados reais.",
    badge: "Oferta Especial",
    priceOriginal: "R$ 2.000",
    priceCurrent: "1.497",
    priceCurrency: "R$",
    pricePeriod: "/mês",
    description: "Inclui todos os serviços listados abaixo.",
    includedItems: ["Serviço 1", "Serviço 2", "Serviço 3"],
    ctaLabel: "Fechar Proposta",
    ctaUrl: "https://wa.me/",
    guarantee: "Garantia de 30 dias",
  } as InvestimentoConfig,

  visao: {
    sectionLabel: "Visão",
    title: "Visão de Crescimento",
    subtitle: "O que você pode esperar nos próximos meses.",
    items: [
      { icon: "TrendingUp", label: "Crescimento nas redes" },
      { icon: "Users", label: "Mais clientes" },
    ],
    quote: "Juntos, vamos",
    quoteHighlight: "transformar resultados.",
    footerClientName: "Cliente",
    footerNote: "Proposta válida por 15 dias",
  } as VisaoConfig,

  texto: {
    title: "Título da Seção",
    body: "Adicione seu texto aqui. Você pode explicar detalhes, contar uma história ou apresentar informações importantes.",
    alignment: "left",
  } as TextoData,

  imagem: {
    src: "",
    alt: "Imagem",
    caption: "",
    fullWidth: true,
  } as ImagemData,

  "cards-grid": {
    sectionLabel: "Seção",
    title: "Título dos Cards",
    subtitle: "Uma breve descrição sobre esta seção.",
    columns: 3,
    cards: [
      { icon: "Star", title: "Card 1", description: "Descrição do card." },
      { icon: "Heart", title: "Card 2", description: "Descrição do card." },
      { icon: "Zap", title: "Card 3", description: "Descrição do card." },
    ],
  } as CardsGridData,

  cta: {
    title: "Pronto para começar?",
    subtitle: "Entre em contato e vamos conversar sobre seu projeto.",
    buttonLabel: "Fale Conosco",
    buttonUrl: "https://wa.me/",
  } as CtaData,

  divider: {
    style: "line",
    spacing: "md",
  } as DividerData,

  galeria: {
    title: "Galeria",
    columns: 3,
    images: [],
  } as GaleriaData,

  depoimentos: {
    sectionLabel: "Depoimentos",
    title: "O que dizem sobre nós",
    items: [
      {
        name: "João Silva",
        role: "Empresário",
        text: "Excelente trabalho! Recomendo a todos.",
        avatar: "",
      },
    ],
  } as DepoimentosData,

  // ---- BLOCOS PREMIUM ----

  marquee: {
    items: ["Estratégia Digital", "Resultados Reais", "Sua Marca no Topo"],
    speed: "normal",
    direction: "left",
    variant: "solid",
    separator: "star",
    size: "md",
    repeat: 3,
    pauseOnHover: true,
  } as MarqueeData,

  "background-image": {
    src: "",
    overlayColor: "dark",
    overlayOpacity: 50,
    title: "Transforme sua Presença Digital",
    subtitle: "Uma abordagem estratégica para resultados excepcionais.",
    alignment: "center",
    textColor: "white",
    minHeight: "md",
    parallax: false,
    buttonLabel: "",
    buttonUrl: "",
  } as BackgroundImageData,

  "split-content": {
    layout: "image-left",
    image: "",
    imageAlt: "Imagem",
    imageFit: "cover",
    sectionLabel: "",
    title: "Por que essa estratégia funciona",
    body: "Descubra como nossa abordagem personalizada gera resultados mensuráveis para o seu negócio.",
    items: ["Planejamento estratégico", "Execução profissional", "Resultados mensuráveis"],
    buttonLabel: "",
    buttonUrl: "",
    verticalAlign: "center",
    imageRounded: true,
  } as SplitContentData,

  video: {
    url: "",
    title: "",
    subtitle: "",
    aspectRatio: "16:9",
    maxWidth: "md",
    rounded: true,
    shadow: true,
    autoplay: false,
  } as VideoData,

  counter: {
    sectionLabel: "Resultados",
    title: "Números que Falam por Si",
    subtitle: "Dados reais de projetos anteriores.",
    items: [
      { value: 500, prefix: "+", suffix: "", label: "Clientes atendidos" },
      { value: 10, prefix: "", suffix: "x", label: "Retorno sobre investimento" },
      { value: 98, prefix: "", suffix: "%", label: "Satisfação dos clientes" },
    ],
    columns: 3,
    duration: 2000,
    style: "card",
  } as CounterData,

  timeline: {
    sectionLabel: "Cronograma",
    title: "Etapas do Projeto",
    subtitle: "Um plano estruturado para alcançar resultados.",
    items: [
      { icon: "Search", title: "Diagnóstico", description: "Análise completa da situação atual.", period: "Semana 1" },
      { icon: "Target", title: "Estratégia", description: "Definição do plano de ação.", period: "Semana 2" },
      { icon: "Rocket", title: "Execução", description: "Implementação das ações definidas.", period: "Mês 1-2" },
      { icon: "TrendingUp", title: "Resultados", description: "Acompanhamento e otimização.", period: "Mês 3+" },
    ],
    layout: "alternating",
    connectorStyle: "solid",
  } as TimelineData,

  "pricing-table": {
    sectionLabel: "Planos",
    title: "Escolha o Plano Ideal",
    subtitle: "Opções flexíveis para cada necessidade.",
    plans: [
      {
        name: "Essencial",
        badge: "",
        highlighted: false,
        price: "997",
        currency: "R$",
        period: "/mês",
        description: "Para quem está começando.",
        features: ["Gestão de redes sociais", "Relatórios mensais", "Suporte por email"],
        ctaLabel: "Escolher Plano",
        ctaUrl: "https://wa.me/",
      },
      {
        name: "Profissional",
        badge: "Recomendado",
        highlighted: true,
        price: "1.997",
        currency: "R$",
        period: "/mês",
        description: "O mais completo para crescer.",
        features: ["Tudo do Essencial", "Tráfego pago", "Conteúdo premium", "Suporte prioritário"],
        ctaLabel: "Escolher Plano",
        ctaUrl: "https://wa.me/",
      },
    ],
  } as PricingTableData,

  "before-after": {
    sectionLabel: "Transformação",
    title: "Antes e Depois",
    subtitle: "Veja a diferença que nossa estratégia pode fazer.",
    layout: "side-by-side",
    beforeImage: "",
    beforeLabel: "Antes",
    afterImage: "",
    afterLabel: "Depois",
    beforeItems: ["Sem estratégia definida", "Baixo engajamento", "Resultados inconsistentes"],
    afterItems: ["Estratégia personalizada", "Engajamento em alta", "Resultados mensuráveis"],
  } as BeforeAfterData,
};

export function getBlockDefault(type: BlockType): BlockData {
  return JSON.parse(JSON.stringify(defaults[type]));
}
