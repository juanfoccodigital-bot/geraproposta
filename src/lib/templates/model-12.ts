import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "azul-ceu-light",
  meta: {
    title: "Azul Ceu Light",
    description:
      "Template leve e moderno com tons de azul celeste, ideal para propostas de social media e marketing de conteudo.",
  },
  theme: {
    colors: {
      gold: "#0EA5E9",
      goldLight: "#38BDF8",
      goldDark: "#0284C7",
      background: "#F8FDFF",
      foreground: "#0C1824",
      beige: "#E8F6FD",
      nude: "#CCE9F8",
      cream: "#EFF5F7",
    },
    fonts: {
      heading: "Plus Jakarta Sans",
      body: "Plus Jakarta Sans",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Comercial",
        titleLine1: "Marketing de",
        titleHighlight: "Conteudo Estrategico",
        subtitle:
          "Transforme seguidores em clientes com uma estrategia de conteudo pensada para educar, engajar e converter seu publico ideal.",
        clientName: "Nome do Cliente",
        ctaPrimary: {
          label: "Ver Proposta",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Falar Conosco",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Panorama de Conteudo Atual",
        subtitle:
          "Analise objetiva da sua presenca de conteudo para identificar gaps e oportunidades de crescimento organico.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "FileText",
            title: "Conteudo Sem Estrategia",
            description:
              "As publicacoes atuais nao seguem uma logica de funil. Sem conteudo para cada etapa da jornada do cliente, o perfil atrai curiosos mas nao converte em vendas.",
            severity: "alto",
          },
          {
            icon: "Search",
            title: "Ausencia de SEO Social",
            description:
              "Publicacoes nao utilizam palavras-chave estrategicas, hashtags otimizadas ou otimizacao de legenda para buscas dentro do Instagram e TikTok.",
            severity: "medio",
          },
          {
            icon: "Video",
            title: "Pouco Conteudo em Video",
            description:
              "O formato video (Reels, TikTok) e o que mais gera alcance organico atualmente. A ausencia desse formato limita drasticamente o crescimento do perfil.",
            severity: "medio",
          },
          {
            icon: "BookOpen",
            title: "Blog ou Newsletter Inexistentes",
            description:
              "Sem um canal de conteudo longo, a marca depende exclusivamente das redes sociais. Um blog ou newsletter cria um ativo proprio e perene.",
            severity: "medio",
          },
          {
            icon: "Heart",
            title: "Audiencia Fiel Existente",
            description:
              "Os seguidores atuais sao engajados e confiam na marca. Com conteudo estrategico, esse nucleo fiel pode ser multiplicado organicamente.",
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
        title: "Plano de Conteudo",
        subtitle:
          "Uma maquina de conteudo que atrai, nutre e converte seu publico ideal de forma organica e escalavel.",
        cards: [
          {
            icon: "PenTool",
            title: "Producao de Conteudo",
            description:
              "Criacao de conteudo multiformat que educa, entretem e posiciona sua marca como referencia no segmento.",
            items: [
              "Planejamento editorial mensal com 20 publicacoes",
              "Producao de Reels semanais otimizados para alcance",
              "Carrosseis educativos sobre temas do seu nicho",
              "Posts de autoridade com dados e insights unicos",
              "Stories diarios com micro-conteudo e interacao",
            ],
          },
          {
            icon: "Newspaper",
            title: "Newsletter & Conteudo Long-form",
            description:
              "Criacao de um canal proprio de comunicacao para nutrir leads e construir um ativo perene fora das redes sociais.",
            items: [
              "Setup e design da newsletter semanal",
              "Redacao de 4 edicoes mensais com conteudo exclusivo",
              "Estrategia de captacao de assinantes via redes sociais",
              "Sequencia de boas-vindas automatizada para novos assinantes",
            ],
          },
          {
            icon: "TrendingUp",
            title: "Growth & Otimizacao",
            description:
              "Estrategias de crescimento organico e otimizacao continua baseada em dados de performance.",
            items: [
              "Analise semanal de metricas de cada publicacao",
              "Otimizacao de hashtags e horarios de publicacao",
              "Estrategia de colaboracoes e conteudo co-criado",
              "Testes de formatos, hooks e CTAs para maximizar conversao",
              "Relatorio mensal com insights e proximos passos",
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
        title: "Conteudo que Converte",
        subtitle:
          "Nao fazemos conteudo por fazer. Cada peca tem um objetivo claro dentro da estrategia de negocio.",
        cards: [
          {
            icon: "Target",
            title: "Orientado a Conversao",
            description:
              "Todo conteudo e pensado como parte de um funil. Cada post tem um objetivo: atrair, nutrir ou converter.",
          },
          {
            icon: "PenTool",
            title: "Copy Estrategica",
            description:
              "Textos escritos por copywriters que entendem de persuasao, storytelling e gatilhos mentais aplicados a redes sociais.",
          },
          {
            icon: "BarChart3",
            title: "Decisoes por Dados",
            description:
              "Analisamos o que funciona e dobramos a aposta. O que nao funciona e ajustado rapidamente. Zero achismo.",
          },
          {
            icon: "Palette",
            title: "Design Premium",
            description:
              "Visual limpo e profissional que destaca seu conteudo no feed. Design que para o scroll e prende a atencao.",
          },
          {
            icon: "Zap",
            title: "Agilidade e Flexibilidade",
            description:
              "Aproveitamos tendencias e oportunidades em tempo real. Conteudo relevante no timing certo faz toda diferenca.",
          },
          {
            icon: "Users",
            title: "Imersao no Seu Negocio",
            description:
              "Mergulhamos no seu universo para criar conteudo autentico. Nao somos genericos, somos uma extensao da sua marca.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Plano Mensal",
        subtitle:
          "Investimento em conteudo estrategico que constroi um ativo perene de audiencia e autoridade para sua marca.",
        badge: "Mais Popular",
        priceOriginal: "R$ 2.500",
        priceCurrent: "R$ 1.797",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Producao completa de conteudo estrategico com design, copy e gestao de publicacoes. Contrato minimo de 3 meses.",
        includedItems: [
          "20 publicacoes mensais (feed + Reels)",
          "Stories diarios estrategicos",
          "4 edicoes de newsletter mensal",
          "Calendario editorial mensal",
          "Design profissional para todas as pecas",
          "Copy estrategica com foco em conversao",
          "Relatorio mensal de performance",
          "Reuniao quinzenal de alinhamento",
        ],
        ctaLabel: "Comecar a Produzir",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se no primeiro mes voce nao perceber evolucao na qualidade e consistencia do conteudo, devolvemos integralmente o valor investido.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Resultados",
        title: "Uma Marca que Educa e Vende",
        subtitle:
          "Imagine sua marca sendo a primeira opcao quando seu publico precisa do que voce oferece, gracas ao conteudo que voce compartilha.",
        items: [
          {
            icon: "BookOpen",
            label: "Conteudo que posiciona voce como autoridade no nicho",
          },
          {
            icon: "TrendingUp",
            label: "Crescimento organico constante sem depender de anuncios",
          },
          {
            icon: "Users",
            label: "Audiencia qualificada que confia e compra",
          },
          {
            icon: "Newspaper",
            label: "Canal proprio de comunicacao com sua audiencia",
          },
        ],
        quote:
          "Conteudo estrategico e o melhor investimento de longo prazo que uma marca pode fazer. Cada peca publicada e um ativo que continua trabalhando por voce indefinidamente.",
        quoteHighlight: "ativo que continua trabalhando por voce",
        footerClientName: "Nome do Cliente",
        footerNote:
          "Proposta valida por 7 dias. Condicoes especiais para contrato semestral.",
      },
    },
  ],
};
