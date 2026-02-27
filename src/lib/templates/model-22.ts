import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "emerald-gold",
  meta: {
    title: "Emerald & Gold",
    description:
      "Template sofisticado em verde esmeralda e ouro, ideal para propostas de web design, e-commerce e branding de luxo.",
  },
  theme: {
    colors: {
      gold: "#059669",
      goldLight: "#34D399",
      goldDark: "#047857",
      background: "#FAFDFB",
      foreground: "#0A1A12",
      beige: "#E6F5EC",
      nude: "#C6E7D4",
      cream: "#F0FAF3",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Lato",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta de Projeto",
        titleLine1: "E-commerce &",
        titleHighlight: "Experiencia Digital",
        subtitle:
          "Criacao de lojas virtuais sofisticadas que combinam design excepcional com performance de vendas para escalar seu faturamento online.",
        clientName: "Nome da Marca",
        ctaPrimary: {
          label: "Ver Proposta",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Falar sobre o Projeto",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Analise da Presenca E-commerce",
        subtitle:
          "Avaliacao da experiencia de compra atual e identificacao dos gargalos que limitam as conversoes e o faturamento online.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "ShoppingCart",
            title: "Taxa de Conversao Baixa",
            description:
              "A loja recebe visitas mas converte menos de 1% em vendas. Problemas de usabilidade, design e confianca estao fazendo visitantes abandonarem sem comprar.",
            severity: "alto",
          },
          {
            icon: "Smartphone",
            title: "Experiencia Mobile Precaria",
            description:
              "Mais de 75% dos acessos sao mobile, mas a loja nao oferece experiencia fluida em celulares. Botoes pequenos, imagens cortadas e checkout confuso em telas menores.",
            severity: "alto",
          },
          {
            icon: "Zap",
            title: "Velocidade de Carregamento Lenta",
            description:
              "A loja demora mais de 5 segundos para carregar. Cada segundo extra de carregamento reduz a conversao em 7% segundo estudos do Google.",
            severity: "medio",
          },
          {
            icon: "CreditCard",
            title: "Checkout com Alto Abandono",
            description:
              "O processo de checkout possui etapas desnecessarias e opcoes de pagamento limitadas. A taxa de abandono de carrinho esta acima de 80%.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Produto com Alta Aceitacao",
            description:
              "Os clientes que compram ficam satisfeitos e voltam a comprar. O produto tem market fit comprovado e a marca possui reputacao positiva no mercado.",
            severity: "positivo",
          },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Projeto",
        title: "Redesign & Otimizacao",
        subtitle:
          "Uma loja virtual projetada do zero com foco em experiencia do usuario, performance e conversao de vendas.",
        cards: [
          {
            icon: "PenTool",
            title: "UI/UX Design Premium",
            description:
              "Design de interface sofisticado e intuitivo que guia o visitante naturalmente ate a compra.",
            items: [
              "Pesquisa de UX e analise de concorrentes diretos",
              "Wireframes de todas as paginas e fluxos de compra",
              "Design visual premium alinhado a identidade da marca",
              "Prototipo navegavel para validacao antes do desenvolvimento",
              "Design responsivo otimizado para mobile, tablet e desktop",
            ],
          },
          {
            icon: "Code",
            title: "Desenvolvimento & Performance",
            description:
              "Desenvolvimento front-end otimizado para velocidade maxima e experiencia de compra impecavel.",
            items: [
              "Desenvolvimento em plataforma otimizada (Shopify/Next.js)",
              "Otimizacao de performance (Core Web Vitals no verde)",
              "Checkout otimizado com multiplas formas de pagamento",
              "Integracoes com ERP, logistica e meios de pagamento",
              "Configuracao de SEO tecnico para e-commerce",
            ],
          },
          {
            icon: "BarChart3",
            title: "CRO & Otimizacao Continua",
            description:
              "Estrategia de otimizacao de conversao para maximizar o faturamento com o trafego existente.",
            items: [
              "Implementacao de rastreamento completo (GA4, Pixel)",
              "Testes A/B de paginas de produto e checkout",
              "Estrategia de upsell e cross-sell inteligente",
              "Automacao de recuperacao de carrinho abandonado",
              "Relatorio mensal de conversao e receita",
            ],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Diferenciais",
        title: "E-commerce que Vende",
        subtitle:
          "Nao fazemos lojas bonitas que nao vendem. Criamos experiencias de compra que convertem visitantes em clientes fieis.",
        cards: [
          {
            icon: "ShoppingCart",
            title: "Foco em Conversao",
            description:
              "Cada elemento da loja e projetado com um objetivo: levar o visitante a comprar. UX estrategico baseado em dados de comportamento de compra.",
          },
          {
            icon: "Palette",
            title: "Design que Encanta",
            description:
              "Visual premium que transmite confianca e desejo. Uma loja bonita nao e suficiente, mas e o primeiro passo para a conversao.",
          },
          {
            icon: "Zap",
            title: "Performance Extrema",
            description:
              "Loja carregando em menos de 2 segundos. Otimizacao de imagens, codigo e servidor para garantir a melhor experiencia possivel.",
          },
          {
            icon: "Smartphone",
            title: "Mobile-First Real",
            description:
              "Design e desenvolvimento pensados primeiro para celular. A maioria dos seus clientes compra pelo celular e merece a melhor experiencia.",
          },
          {
            icon: "TrendingUp",
            title: "CRO Integrado",
            description:
              "Otimizacao de conversao nao e algo feito depois. E parte integral de cada decisao de design e desenvolvimento desde o dia zero.",
          },
          {
            icon: "Headphones",
            title: "Suporte Pos-Launch",
            description:
              "Nao sumimos depois da entrega. Acompanhamos os primeiros 90 dias com otimizacoes, ajustes e suporte tecnico completo.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Investimento no Projeto",
        subtitle:
          "Um investimento que se paga com o aumento de conversao e faturamento da loja nos primeiros meses.",
        badge: "E-commerce Completo",
        priceOriginal: "R$ 18.000",
        priceCurrent: "R$ 12.997",
        priceCurrency: "R$",
        pricePeriod: " unico",
        description:
          "Projeto completo de e-commerce com design premium, desenvolvimento otimizado e estrategia de CRO. Pagamento por milestone em ate 4x.",
        includedItems: [
          "Pesquisa de UX e wireframes completos",
          "Design visual premium de todas as paginas",
          "Desenvolvimento responsivo e otimizado",
          "Configuracao de checkout com 5+ formas de pagamento",
          "Integracao com ERP e logistica",
          "SEO tecnico completo para e-commerce",
          "Rastreamento e analytics configurados",
          "90 dias de suporte e otimizacao pos-lancamento",
        ],
        ctaLabel: "Iniciar Meu E-commerce",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se ao final do projeto a loja nao atingir os benchmarks de performance (velocidade, mobile score), ajustamos sem custo adicional ate atingir.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Sua Loja Vendendo 24/7",
        subtitle:
          "Imagine uma loja virtual que vende enquanto voce dorme, com experiencia de compra tao boa que clientes voltam naturalmente.",
        items: [
          {
            icon: "ShoppingCart",
            label: "Taxa de conversao acima da media do mercado",
          },
          {
            icon: "Smartphone",
            label: "Experiencia perfeita em qualquer dispositivo",
          },
          {
            icon: "Zap",
            label: "Loja rapida que carrega em menos de 2 segundos",
          },
          {
            icon: "TrendingUp",
            label: "Faturamento online crescente mes apos mes",
          },
        ],
        quote:
          "No e-commerce, a experiencia de compra E o produto. Uma loja mal projetada nao perde apenas vendas de hoje, perde clientes que nunca mais voltam.",
        quoteHighlight: "a experiencia de compra E o produto",
        footerClientName: "Nome da Marca",
        footerNote:
          "Proposta valida por 15 dias. Prazo de entrega estimado: 45 a 60 dias uteis apos aprovacao do design.",
      },
    },
  ],
};
