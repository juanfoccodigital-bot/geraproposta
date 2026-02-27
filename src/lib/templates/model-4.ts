import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "rosa-moderno",
  meta: {
    title: "Rosa Moderno",
    description:
      "Template elegante com tons rosa, ideal para propostas de design, web design e identidade visual.",
  },
  theme: {
    colors: {
      gold: "#C4727F",
      goldLight: "#D4919B",
      goldDark: "#A85565",
      background: "#FDF8F9",
      foreground: "#1A1A1A",
      beige: "#F5ECF0",
      nude: "#E8D8DD",
      cream: "#FAF4F6",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Raleway",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Criativa",
        titleLine1: "Design & Identidade Visual",
        titleHighlight: "que Conecta e Converte",
        subtitle:
          "Transforme a percepcao da sua marca com um design estrategico que comunica profissionalismo, gera confianca e diferencia voce da concorrencia.",
        clientName: "Nome do Cliente",
        ctaPrimary: {
          label: "Ver Diagnostico",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Falar com Designer",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Analise da Identidade Visual Atual",
        subtitle:
          "Avaliamos como sua marca e percebida visualmente e identificamos oportunidades para elevar seu posicionamento atraves do design.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Palette",
            title: "Identidade Visual Desatualizada",
            description:
              "O logotipo e os elementos visuais atuais nao refletem o momento atual da marca. A comunicacao visual transmite uma imagem que nao condiz com a qualidade dos produtos ou servicos oferecidos.",
            severity: "alto",
          },
          {
            icon: "Monitor",
            title: "Website Nao Responsivo",
            description:
              "O site atual nao oferece uma boa experiencia em dispositivos moveis, onde mais de 70% dos acessos acontecem. Tempo de carregamento elevado e navegacao confusa geram alta taxa de rejeicao.",
            severity: "alto",
          },
          {
            icon: "Layers",
            title: "Materiais Sem Padronizacao",
            description:
              "Cada material de comunicacao utiliza estilos diferentes. Sem um manual de marca, a consistencia visual se perde entre redes sociais, apresentacoes e materiais impressos.",
            severity: "medio",
          },
          {
            icon: "Eye",
            title: "Experiencia do Usuario Comprometida",
            description:
              "O fluxo de navegacao no site nao guia o visitante de forma intuitiva ate a acao desejada. Botoes de CTA pouco visiveis e hierarquia visual confusa reduzem as conversoes.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Produto/Servico de Alta Qualidade",
            description:
              "O que voce oferece tem qualidade comprovada e clientes satisfeitos. Um design a altura desse nivel de excelencia vai amplificar a percepcao de valor e justificar precos premium.",
            severity: "positivo",
          },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Estrategia",
        title: "Processo Criativo Estrategico",
        subtitle:
          "Um processo de design thinking que parte do entendimento profundo da sua marca para criar solucoes visuais que geram resultado.",
        cards: [
          {
            icon: "PenTool",
            title: "Identidade Visual Completa",
            description:
              "Redesign ou criacao da identidade visual da marca, construindo uma linguagem visual unica que comunica seus valores e diferencia voce no mercado.",
            items: [
              "Pesquisa de mercado e analise de concorrentes visuais",
              "Criacao de logotipo com variantes e versoes responsivas",
              "Definicao de paleta de cores, tipografia e elementos graficos",
              "Manual de marca completo com diretrizes de aplicacao",
              "Papelaria digital: assinatura de e-mail, cartao e templates",
            ],
          },
          {
            icon: "Monitor",
            title: "Website Profissional",
            description:
              "Criacao de um site moderno, responsivo e otimizado para conversao que reflete a nova identidade visual e oferece uma experiencia excepcional.",
            items: [
              "Design UI/UX com wireframes e prototipos navegaveis",
              "Desenvolvimento responsivo e otimizado para performance",
              "Paginas estrategicas: home, sobre, servicos, contato e portfolio",
              "Integracacao com WhatsApp, formularios e redes sociais",
              "Otimizacao basica de SEO e velocidade de carregamento",
            ],
          },
          {
            icon: "Figma",
            title: "Design System para Redes Sociais",
            description:
              "Templates e elementos visuais padronizados para garantir consistencia em todas as publicacoes nas redes sociais.",
            items: [
              "Kit de templates editaveis para posts no Instagram",
              "Templates para Stories, Reels covers e destaques",
              "Elementos graficos customizados e icones da marca",
              "Guia de estilo fotografico e direcao de arte",
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
        title: "Design com Proposito",
        subtitle:
          "Nao fazemos apenas coisas bonitas. Criamos experiencias visuais estrategicas que comunicam, conectam e convertem.",
        cards: [
          {
            icon: "Lightbulb",
            title: "Design Estrategico",
            description:
              "Cada decisao de design e fundamentada em estrategia de marca e comportamento do usuario. Beleza com inteligencia e proposito de negocio.",
          },
          {
            icon: "Figma",
            title: "Processo Colaborativo",
            description:
              "Voce participa ativamente de cada etapa. Apresentamos opcoes, coletamos feedback e refinamos ate chegarmos ao resultado perfeito juntos.",
          },
          {
            icon: "Layers",
            title: "Entrega Completa",
            description:
              "Voce recebe todos os arquivos em formatos editaveis e prontos para uso. Nada de depender de nos para aplicacoes futuras.",
          },
          {
            icon: "Smartphone",
            title: "Mobile First",
            description:
              "Todos os designs sao pensados primeiro para dispositivos moveis, garantindo uma experiencia impecavel onde seu publico realmente esta.",
          },
          {
            icon: "Clock",
            title: "Prazos Respeitados",
            description:
              "Cronograma definido e cumprido. Cada etapa tem prazo claro e voce acompanha o progresso em tempo real do seu projeto.",
          },
          {
            icon: "Award",
            title: "Portfolio Comprovado",
            description:
              "Projetos entregues para marcas de diversos segmentos com resultados comprovados em percepcao de valor e conversao.",
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
          "Um investimento unico que transforma a percepcao da sua marca e gera retorno por anos.",
        badge: "Pacote Completo",
        priceOriginal: "R$ 8.500",
        priceCurrent: "R$ 5.997",
        priceCurrency: "R$",
        pricePeriod: " unico",
        description:
          "Projeto completo de identidade visual, website profissional e design system para redes sociais. Pagamento em ate 3x sem juros.",
        includedItems: [
          "Identidade visual completa com manual de marca",
          "Website responsivo com ate 5 paginas",
          "Kit de templates para redes sociais (15 modelos)",
          "Papelaria digital completa",
          "Todos os arquivos fonte editaveis (Figma/AI)",
          "2 rodadas de revisao em cada etapa",
          "Suporte por 30 dias apos entrega final",
          "Treinamento para uso dos templates e materiais",
        ],
        ctaLabel: "Iniciar Meu Projeto",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Na primeira etapa de apresentacao, se o conceito criativo nao atender suas expectativas, voce pode cancelar o projeto com reembolso de 80% do valor.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao de Futuro",
        title: "Sua Marca no Proximo Nivel",
        subtitle:
          "Imagine sua marca com uma presenca visual tao impactante que comunica profissionalismo antes mesmo de voce falar uma palavra.",
        items: [
          {
            icon: "Palette",
            label: "Identidade visual coesa em todos os pontos de contato",
          },
          {
            icon: "Monitor",
            label: "Website que converte visitantes em clientes",
          },
          {
            icon: "Star",
            label: "Percepcao premium que justifica precos mais altos",
          },
          {
            icon: "Sparkles",
            label: "Marca memoravel que se destaca da concorrencia",
          },
        ],
        quote:
          "Design nao e apenas estetica. E a linguagem silenciosa que conta a historia da sua marca e faz seu publico sentir antes de pensar. Bom design e bom negocio.",
        quoteHighlight: "linguagem silenciosa",
        footerClientName: "Nome do Cliente",
        footerNote:
          "Proposta valida por 15 dias. Valores e condicoes sujeitos a alteracao apos este prazo. Prazo estimado de entrega: 30 a 45 dias uteis.",
      },
    },
  ],
};
