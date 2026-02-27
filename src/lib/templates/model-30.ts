import { ProposalConfig } from "@/types/proposal";

/* ── FREE: Salmon Criativo ── */
export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "salmon-criativo",
  meta: {
    title: "Salmon Criativo",
    description:
      "Template quente com tons salmon, ideal para fotografos, videomakers e produtoras de conteudo visual.",
  },
  theme: {
    colors: {
      gold: "#FB923C",
      goldLight: "#FDBA74",
      goldDark: "#F97316",
      background: "#FFFBF5",
      foreground: "#3D2410",
      beige: "#FFF1E0",
      nude: "#FFE4CC",
      cream: "#FFF7EE",
    },
    fonts: {
      heading: "DM Serif Display",
      body: "DM Sans",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Criativa",
        titleLine1: "Fotografia &",
        titleHighlight: "Producao Visual",
        subtitle:
          "Imagens que contam historias e vendem. Producao fotografica profissional para marcas que querem se destacar.",
        clientName: "Nome do Cliente",
        ctaPrimary: { label: "Ver Portfolio", scrollTo: "diagnostico" },
        ctaSecondary: { label: "Orcamento via WhatsApp", url: "https://wa.me/5500000000000" },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Briefing",
        title: "O Que Observamos",
        subtitle: "Analisamos a comunicacao visual da sua marca e identificamos oportunidades.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          { icon: "Camera", title: "Fotos Amadoras", description: "Imagens de baixa qualidade passam uma impressao de marca amadora. No digital, a primeira impressao e visual.", severity: "alto" },
          { icon: "Palette", title: "Sem Identidade Visual", description: "Fotos sem padrao de cores, estilo ou composicao. O feed nao transmite a essencia da marca.", severity: "medio" },
          { icon: "Image", title: "Banco de Imagens Generic", description: "Fotos de banco genericasn nao conectam com o publico. Pessoas querem ver rostos reais e bastidores.", severity: "medio" },
          { icon: "Star", title: "Produto Fotografavel", description: "Seu produto tem apelo visual forte. Com a luz e o angulo certos, ele pode se vender sozinho.", severity: "positivo" },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Proposta",
        title: "Plano de Producao",
        subtitle: "Um pacote completo para transformar a imagem da sua marca.",
        cards: [
          {
            icon: "Camera",
            title: "Ensaio Fotografico",
            description: "Sessao fotografica profissional com direcao de arte e pos-producao premium.",
            items: ["Ensaio de 4 horas em locacao", "Direcao de arte e styling", "100+ fotos editadas em alta resolucao", "Entrega em 7 dias uteis"],
          },
          {
            icon: "Film",
            title: "Video Institucional",
            description: "Video curto e impactante para redes sociais e site.",
            items: ["Roteiro e storyboard", "Filmagem com equipe profissional", "Edicao com motion graphics", "Versoes para feed, stories e reels"],
          },
          {
            icon: "Layout",
            title: "Banco de Imagens",
            description: "Acervo proprio de fotos para usar durante meses no conteudo digital.",
            items: ["Fotos de produto em 360°", "Lifestyle e bastidores", "Fotos para anuncios", "Organizacao por categorias"],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Diferencial",
        title: "Nosso Olhar",
        subtitle: "Cada clique e uma decisao criativa. Cada imagem conta uma historia.",
        cards: [
          { icon: "Eye", title: "Olhar Autoral", description: "Estilo unico que diferencia sua marca. Nao fazemos foto generica, fazemos arte com proposito." },
          { icon: "Zap", title: "Entrega Rapida", description: "Prévias em 48h e entrega completa em 7 dias. Sem enrolacao." },
          { icon: "Award", title: "Equipamento Pro", description: "Camera full-frame, iluminacao profissional e drone. Qualidade cinema para seu projeto." },
          { icon: "Heart", title: "Envolvimento Total", description: "Mergulhamos no universo da sua marca para capturar sua essencia em cada foto." },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Pacotes de Producao",
        subtitle: "Investimento que se paga com a primeira campanha usando as novas imagens.",
        badge: "Pacote Completo",
        priceOriginal: "R$ 5.000",
        priceCurrent: "R$ 3.490",
        priceCurrency: "R$",
        pricePeriod: "",
        description: "Ensaio fotografico + video institucional + banco de imagens. Tudo que sua marca precisa.",
        includedItems: [
          "Ensaio fotografico de 4 horas",
          "100+ fotos editadas em alta resolucao",
          "Video institucional de 60 segundos",
          "Versoes para todas as redes sociais",
          "Banco de imagens categorizado",
          "Direitos de uso ilimitados",
        ],
        ctaLabel: "Quero Esse Pacote",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee: "Pagamento: 50% no fechamento + 50% na entrega. Satisfacao garantida.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Resultado",
        title: "Sua Marca em Alta Definicao",
        subtitle: "Imagine ter um acervo profissional que transforma cada post em uma experiencia visual.",
        items: [
          { icon: "Image", label: "Feed profissional que para o scroll" },
          { icon: "TrendingUp", label: "Engajamento multiplicado com conteudo visual premium" },
          { icon: "Star", label: "Marca percebida como premium e confiavel" },
          { icon: "Camera", label: "Acervo de fotos para meses de conteudo" },
        ],
        quote: "Uma imagem vale mais que mil palavras. No digital, vale mais que mil curtidas.",
        quoteHighlight: "vale mais que mil curtidas",
        footerClientName: "Nome do Cliente",
        footerNote: "Proposta valida por 10 dias. Agenda sujeita a disponibilidade.",
      },
    },
  ],
};
