import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "sunset-gradient",
  meta: {
    title: "Sunset Gradient",
    description:
      "Template vibrante com tons de por do sol (laranja, rosa, roxo), ideal para infoprodutores e lancamentos digitais de alto impacto.",
  },
  theme: {
    colors: {
      gold: "#F43F5E",
      goldLight: "#FB7185",
      goldDark: "#E11D48",
      background: "#FFF5F7",
      foreground: "#1A0A10",
      beige: "#FFE4E8",
      nude: "#FFC8D0",
      cream: "#F7EDEF",
    },
    fonts: {
      heading: "Sora",
      body: "Inter",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta de Alto Impacto",
        titleLine1: "Lancamento",
        titleHighlight: "de 6 Digitos",
        subtitle:
          "Estrategia completa de lancamento digital com funis de alta conversao, copy persuasiva e trafego pago escalavel para seu proximo lancamento milionario.",
        clientName: "Nome do Expert",
        ctaPrimary: {
          label: "Ver Estrategia",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Falar com Estrategista",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Cenario",
        title: "Onde Voce Esta Agora",
        subtitle:
          "Uma analise honesta do seu momento para desenhar a estrategia mais eficiente para o seu proximo lancamento.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "TrendingUp",
            title: "Lancamentos com Teto de Faturamento",
            description:
              "Os lancamentos anteriores atingiram um patamar e nao conseguem escalar. Sem otimizacao de funil e trafego, o faturamento fica estagnado no mesmo nivel edicao apos edicao.",
            severity: "alto",
          },
          {
            icon: "Target",
            title: "Custo por Lead Insustentavel",
            description:
              "O CPL esta acima da media do mercado e corroi a margem de lucro. Sem testes sistematicos de criativos e publicos, o trafego nao esta operando na maxima eficiencia.",
            severity: "alto",
          },
          {
            icon: "Mail",
            title: "Taxa de Abertura em Queda",
            description:
              "A base de e-mails nao esta sendo segmentada e nutrida adequadamente. E-mails em massa sem personalizacao estao levando a taxa de abertura abaixo de 15%.",
            severity: "medio",
          },
          {
            icon: "Video",
            title: "Conteudo de PLG Pouco Engajante",
            description:
              "O conteudo de pre-lancamento nao esta gerando o nivel de antecipacao necessario. Lives e videos de conteudo tem baixa retencao e poucas interacoes.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Produto com NPS Alto",
            description:
              "Seus alunos sao fas. NPS acima de 80, depoimentos emocionantes e taxa de recompra alta. Essa prova social e o ativo mais valioso para escalar as vendas.",
            severity: "positivo",
          },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Game Plan",
        title: "Estrategia de Lancamento",
        subtitle:
          "Um lancamento orquestrado em cada detalhe para maximizar captacao, engajamento e vendas em carrinho aberto.",
        cards: [
          {
            icon: "Rocket",
            title: "Pre-Lancamento & Captacao",
            description:
              "Fase de aquecimento e construcao de audiencia qualificada antes da abertura de carrinho.",
            items: [
              "Estrategia de PLG com 3 a 4 eventos de conteudo",
              "Captacao multicanal: ads, organico, parcerias e afiliados",
              "Pagina de captura otimizada com taxa acima de 45%",
              "Sequencia de e-mails de aquecimento (12 e-mails)",
              "Grupo de WhatsApp/Telegram para engajamento direto",
            ],
          },
          {
            icon: "Target",
            title: "Trafego & Escala",
            description:
              "Operacao de trafego pago em larga escala com otimizacao em tempo real durante todo o lancamento.",
            items: [
              "Meta Ads: campanhas para frio, morno e quente",
              "Google Ads: search para publico de alta intencao",
              "YouTube Ads: pre-roll nos dias de carrinho",
              "Escala horizontal com 50+ criativos em teste",
              "War room com otimizacao de campanhas em tempo real",
            ],
          },
          {
            icon: "ShoppingCart",
            title: "Carrinho & Pos-Lancamento",
            description:
              "Estrategia de vendas durante carrinho aberto e transicao para modelo perpetuo.",
            items: [
              "Sequencia de vendas com urgencia e escassez reais",
              "Remarketing agressivo para leads que nao compraram",
              "Downsell e order bump para maximizar ticket medio",
              "Analise pos-lancamento com otimizacoes para o proximo",
              "Transicao para funil perpetuo com webinar automatizado",
            ],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Por Que Nos",
        title: "Time de Lancamento de Elite",
        subtitle:
          "Uma equipe que ja participou de lancamentos milionarios e sabe exatamente como orquestrar cada fase para maximizar resultado.",
        cards: [
          {
            icon: "Award",
            title: "Track Record de 7 Digitos",
            description:
              "Participamos de lancamentos que faturaram acima de R$ 1 milhao. Experiencia real em escala, nao teoria de curso.",
          },
          {
            icon: "Target",
            title: "Trafego que Escala",
            description:
              "Gestores de trafego que sabem escalar de R$ 100/dia para R$ 10.000/dia mantendo CPA e ROAS dentro das metas.",
          },
          {
            icon: "PenTool",
            title: "Copy de Alta Conversao",
            description:
              "Copywriters especializados em lancamentos. Emails, paginas de vendas e scripts que convertem porque entendem de psicologia de compra.",
          },
          {
            icon: "Video",
            title: "Producao de Video",
            description:
              "Edicao profissional de VSLs, depoimentos e criativos para ads. Video que vende e video bem produzido e estrategico.",
          },
          {
            icon: "BarChart3",
            title: "Data-Driven",
            description:
              "Dashboard de lancamento com metricas em tempo real. Cada decisao baseada em dados, cada ajuste justificado por numeros.",
          },
          {
            icon: "Shield",
            title: "Operacao Blindada",
            description:
              "Checklist de 200+ itens, plano de contingencia e equipe de plantao 24h nos dias de carrinho. Zero falhas tecnicas.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Deal",
        title: "Investimento no Lancamento",
        subtitle:
          "Um investimento que se paga com as vendas dos primeiros dias de carrinho aberto.",
        badge: "Lancamento Completo",
        priceOriginal: "R$ 15.000",
        priceCurrent: "R$ 9.997",
        priceCurrency: "R$",
        pricePeriod: "/lancamento",
        description:
          "Fee de lancamento completo com estrategia, copy, trafego, automacoes e acompanhamento. Valor nao inclui verba de anuncios (recomendado R$ 10.000+).",
        includedItems: [
          "Estrategia completa de lancamento personalizada",
          "Copy de todos os e-mails, paginas e criativos",
          "Gestao de trafego pago durante todo o lancamento",
          "50+ criativos para anuncios (imagem e video)",
          "Setup de automacoes e integracao de plataformas",
          "Pagina de captura + pagina de vendas otimizadas",
          "Dashboard de acompanhamento em tempo real",
          "War room 24h nos dias de carrinho aberto",
        ],
        ctaLabel: "Quero Lancar Grande",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se a estrutura completa de lancamento nao for entregue no prazo e escopo acordados, devolvemos 100% do fee de lancamento.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Seu Proximo Record de Vendas",
        subtitle:
          "Imagine abrir o carrinho e ver as vendas entrando minuto a minuto, batendo seu record de faturamento em cada novo lancamento.",
        items: [
          {
            icon: "TrendingUp",
            label: "Faturamento crescente a cada novo lancamento",
          },
          {
            icon: "Users",
            label: "Base de alunos multiplicando a cada edicao",
          },
          {
            icon: "DollarSign",
            label: "ROI positivo desde o primeiro dia de carrinho",
          },
          {
            icon: "Rocket",
            label: "Funil perpetuo vendendo todos os dias entre lancamentos",
          },
        ],
        quote:
          "Lancamentos de 6 e 7 digitos nao sao sorte. Sao resultado de estrategia precisa, execucao impecavel e um time que sabe transformar audiencia em receita de forma sistematica.",
        quoteHighlight: "estrategia precisa, execucao impecavel",
        footerClientName: "Nome do Expert",
        footerNote:
          "Proposta valida por 5 dias. Agenda de lancamento limitada a 2 projetos simultaneos.",
      },
    },
  ],
};
