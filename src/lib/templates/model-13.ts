import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "preto-branco-clean",
  meta: {
    title: "Preto & Branco",
    description:
      "Template minimalista em preto e branco puro, ideal para designers, fotografos e propostas de alto impacto visual.",
  },
  theme: {
    colors: {
      gold: "#000000",
      goldLight: "#333333",
      goldDark: "#000000",
      background: "#FFFFFF",
      foreground: "#000000",
      beige: "#F5F5F5",
      nude: "#E0E0E0",
      cream: "#F7F7F7",
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
        badge: "Proposta de Projeto",
        titleLine1: "Fotografia &",
        titleHighlight: "Direcao Visual",
        subtitle:
          "Imagens que contam historias, transmitem emocoes e elevam o posicionamento da sua marca a um patamar de excelencia visual.",
        clientName: "Nome do Cliente",
        ctaPrimary: {
          label: "Ver Projeto",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Conversar",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Analise",
        title: "Cenario Visual Atual",
        subtitle:
          "Uma analise critica do acervo e da linguagem visual que sua marca utiliza atualmente em seus canais de comunicacao.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Camera",
            title: "Banco de Imagens Generico",
            description:
              "A marca utiliza fotos de banco de imagens que nao transmitem autenticidade. Imagens genericas diluem a personalidade da marca e nao geram conexao emocional com o publico.",
            severity: "alto",
          },
          {
            icon: "Image",
            title: "Inconsistencia Estetica",
            description:
              "As fotos utilizadas nos diferentes canais nao seguem uma direcao de arte unificada. Cores, iluminacao e composicao variam, quebrando a identidade visual da marca.",
            severity: "alto",
          },
          {
            icon: "Monitor",
            title: "Fotos Nao Otimizadas para Digital",
            description:
              "As imagens atuais nao estao preparadas para as diferentes plataformas digitais. Formatos, resolucoes e enquadramentos inadequados comprometem a experiencia visual.",
            severity: "medio",
          },
          {
            icon: "Layers",
            title: "Sem Guia de Estilo Fotografico",
            description:
              "A ausencia de diretrizes fotograficas faz com que cada producao tenha um resultado diferente, dificultando a construcao de uma linguagem visual consistente.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Produto Visualmente Atraente",
            description:
              "O produto ou espaco da marca tem qualidades visuais naturais que, quando capturadas com direcao de arte profissional, geram imagens de altissimo impacto.",
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
        title: "Escopo de Producao",
        subtitle:
          "Uma producao fotografica completa com direcao de arte, tratamento profissional e entrega de um acervo visual estrategico.",
        cards: [
          {
            icon: "Camera",
            title: "Producao Fotografica",
            description:
              "Sessao fotografica profissional com direcao de arte alinhada a identidade e posicionamento da marca.",
            items: [
              "Reuniao de briefing e definicao do conceito visual",
              "Moodboard com referencias e direcao estetica",
              "Producao de 1 dia completo de fotografia",
              "Fotos de produto, ambiente, equipe e lifestyle",
              "Fotos em diferentes enquadramentos para redes sociais",
            ],
          },
          {
            icon: "Sliders",
            title: "Pos-Producao & Tratamento",
            description:
              "Tratamento profissional de todas as imagens com harmonizacao cromatica e acabamento premium.",
            items: [
              "Selecao e curadoria das melhores imagens",
              "Tratamento de cor e iluminacao profissional",
              "Retoque sutil e ajuste de composicao",
              "Versoes otimizadas para cada plataforma digital",
            ],
          },
          {
            icon: "FileText",
            title: "Guia Visual & Entrega",
            description:
              "Entrega organizada de todo o acervo com diretrizes para uso consistente das imagens em todos os canais.",
            items: [
              "Acervo final com 80 a 120 fotos tratadas",
              "Guia de estilo fotografico da marca",
              "Organizacao por categoria e formato",
              "Banco de imagens organizado em nuvem",
              "Licenca de uso completa para todos os canais",
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
        title: "Fotografia com Intencao",
        subtitle:
          "Cada clique e intencional. Nao fazemos fotos bonitas por acaso — criamos imagens estrategicas com proposito claro.",
        cards: [
          {
            icon: "Eye",
            title: "Olhar Autoral",
            description:
              "Estilo fotografico unico que da personalidade a sua marca. Imagens que sao reconheciveis instantaneamente como suas.",
          },
          {
            icon: "Palette",
            title: "Direcao de Arte Integrada",
            description:
              "Cada foto e pensada dentro do contexto da identidade visual da marca. Cores, texturas e composicoes alinham com o branding.",
          },
          {
            icon: "Smartphone",
            title: "Pensado para Digital",
            description:
              "Todas as fotos sao produzidas ja pensando nos formatos de cada plataforma: feed, stories, site, anuncios e impressos.",
          },
          {
            icon: "Clock",
            title: "Entrega Rapida",
            description:
              "Selecao e preview em ate 5 dias uteis. Acervo completo tratado em ate 15 dias uteis apos a producao.",
          },
          {
            icon: "RefreshCw",
            title: "Revisoes Inclusas",
            description:
              "Ate 2 rodadas de ajuste no tratamento das imagens para garantir que o resultado atenda exatamente sua visao.",
          },
          {
            icon: "Shield",
            title: "Direitos Completos",
            description:
              "Voce recebe licenca de uso total das imagens para qualquer canal e formato, sem restricoes ou custos adicionais.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Investimento na Producao",
        subtitle:
          "Um dia de producao que gera um acervo visual para meses de conteudo profissional.",
        badge: "Producao Completa",
        priceOriginal: "R$ 4.500",
        priceCurrent: "R$ 2.997",
        priceCurrency: "R$",
        pricePeriod: " unico",
        description:
          "Producao fotografica completa com direcao de arte, tratamento profissional e entrega de acervo organizado. Pagamento em 2x sem juros.",
        includedItems: [
          "1 dia completo de producao fotografica",
          "Direcao de arte e moodboard personalizado",
          "80 a 120 fotos tratadas profissionalmente",
          "Versoes otimizadas para cada plataforma",
          "Guia de estilo fotografico da marca",
          "Banco de imagens organizado em nuvem",
          "Licenca de uso completa e irrestrita",
          "2 rodadas de revisao no tratamento",
        ],
        ctaLabel: "Agendar Producao",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Apos a sessao de preview, se as imagens nao atenderem ao briefing acordado, refazemos a producao sem custo adicional.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Resultado",
        title: "Imagens que Vendem por Voce",
        subtitle:
          "Imagine ter um acervo fotografico tao impactante que cada publicacao eleva a percepcao da sua marca automaticamente.",
        items: [
          {
            icon: "Camera",
            label: "Acervo profissional exclusivo da sua marca",
          },
          {
            icon: "Sparkles",
            label: "Visual que para o scroll e prende a atencao",
          },
          {
            icon: "Star",
            label: "Percepcao premium em cada ponto de contato",
          },
          {
            icon: "Calendar",
            label: "Meses de conteudo visual profissional garantido",
          },
        ],
        quote:
          "Uma imagem vale mais que mil palavras. Uma imagem com direcao de arte estrategica vale mais que mil anuncios. Invista em fotografia profissional.",
        quoteHighlight: "direcao de arte estrategica",
        footerClientName: "Nome do Cliente",
        footerNote:
          "Proposta valida por 10 dias. Disponibilidade de agenda sujeita a confirmacao.",
      },
    },
  ],
};
