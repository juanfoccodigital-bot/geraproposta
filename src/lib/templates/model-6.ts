import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "laranja-energia",
  meta: {
    title: "Laranja Energia",
    description:
      "Template vibrante com tons laranja, ideal para infoprodutores, lancamentos digitais e estrategias de trafego pago.",
  },
  theme: {
    colors: {
      gold: "#E67E22",
      goldLight: "#F0A04B",
      goldDark: "#D35400",
      background: "#FFFAF5",
      foreground: "#1A1A1A",
      beige: "#FFF0E0",
      nude: "#FFE0C0",
      cream: "#FFF5EB",
    },
    fonts: {
      heading: "Montserrat",
      body: "Nunito",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Estrategica",
        titleLine1: "Lancamento Digital",
        titleHighlight: "& Estrategia de Trafego",
        subtitle:
          "Estruture seu proximo lancamento com funis de alta conversao, trafego pago estrategico e uma operacao completa para escalar seu infoproduto no mercado digital.",
        clientName: "Nome do Infoprodutor",
        ctaPrimary: {
          label: "Ver Diagnostico",
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
        sectionLabel: "Diagnostico",
        title: "Analise do Cenario Atual",
        subtitle:
          "Mapeamos a maturidade digital do seu projeto e identificamos os gargalos que impedem seu infoproduto de atingir o proximo nivel de faturamento.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "ShoppingCart",
            title: "Funil de Vendas Inexistente ou Quebrado",
            description:
              "O fluxo de captacao ate a compra nao esta estruturado. Sem um funil com etapas claras de aquecimento, os leads chegam frios na pagina de vendas e a taxa de conversao fica abaixo de 1%.",
            severity: "alto",
          },
          {
            icon: "Target",
            title: "Trafego Sem Segmentacao Estrategica",
            description:
              "Os anuncios atuais atingem publicos amplos demais sem diferenciacao por nivel de consciencia. Sem campanhas segmentadas para topo, meio e fundo, o custo por lead se mantém insustentavel.",
            severity: "alto",
          },
          {
            icon: "Mail",
            title: "Base de E-mails Subutilizada",
            description:
              "A lista de contatos existente nao recebe comunicacao frequente ou estrategica. Sem sequencias de nutriacao e lancamento, a base esfria e o potencial de vendas organicas se perde.",
            severity: "medio",
          },
          {
            icon: "Video",
            title: "Conteudo de Autoridade Insuficiente",
            description:
              "A presenca como especialista nas redes sociais nao acompanha o nivel de conhecimento real. Falta uma estrategia de conteudo que construa autoridade e gere desejo pelo produto.",
            severity: "medio",
          },
          {
            icon: "GraduationCap",
            title: "Produto com Alta Avaliacao",
            description:
              "O infoproduto ja possui alunos satisfeitos e depoimentos positivos. Essa prova social e o ativo mais valioso para escalar as vendas com credibilidade e confianca.",
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
        title: "Plano de Lancamento e Escala",
        subtitle:
          "Uma operacao completa de lancamento digital com funis otimizados, trafego estrategico e automacoes que maximizam cada real investido.",
        cards: [
          {
            icon: "Rocket",
            title: "Estrutura de Lancamento",
            description:
              "Montagem completa da estrutura de lancamento com funis de alta conversao, paginas otimizadas e sequencias de comunicacao.",
            items: [
              "Estrategia de lancamento: semente, interno, meteórico ou perpetuo",
              "Criacao de pagina de captura com copy persuasiva",
              "Pagina de vendas com elementos de prova social e urgencia",
              "Sequencia de e-mails para lancamento (pre, durante e pos)",
              "Checkout otimizado com order bump e upsell configurados",
            ],
          },
          {
            icon: "TrendingUp",
            title: "Trafego Pago & Escala",
            description:
              "Campanhas de trafego pago estruturadas em funil para aquecer, engajar e converter o publico ideal ao menor custo possivel.",
            items: [
              "Campanhas de captacao de leads no Meta Ads e Google Ads",
              "Estrategia de remarketing multinivel para leads e visitantes",
              "Criativos em video e imagem com testes A/B sistematicos",
              "Escala horizontal e vertical com controle de CPA",
              "Lookalike audiences baseadas em compradores e leads quentes",
            ],
          },
          {
            icon: "BarChart3",
            title: "Otimizacao & Perpetuo",
            description:
              "Apos o lancamento, transformamos a operacao em um sistema de vendas perpetuo com otimizacao continua baseada em dados.",
            items: [
              "Analise pos-lancamento com identificacao de gargalos",
              "Transicao para funil perpetuo com webinario automatizado",
              "Automacao de nutriacao e vendas via e-mail e WhatsApp",
              "Testes de pagina de vendas, precos e ofertas",
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
        title: "Por Que Lancar Conosco",
        subtitle:
          "Experiencia comprovada em lancamentos digitais com metodologia propria e foco absoluto em ROI.",
        cards: [
          {
            icon: "Rocket",
            title: "Experiencia em Lancamentos",
            description:
              "Ja participamos de lancamentos que faturaram mais de 6 digitos. Conhecemos os bastidores, os riscos e sabemos como maximizar cada fase do processo.",
          },
          {
            icon: "Target",
            title: "Trafego de Alta Performance",
            description:
              "Gestores de trafego certificados com experiencia em escalar campanhas de lancamento mantendo CPL e CPA dentro das metas estabelecidas.",
          },
          {
            icon: "FileText",
            title: "Copy que Converte",
            description:
              "Copywriters especializados em infoprodutos que dominam gatilhos mentais, storytelling e estruturas de persuasao comprovadas pelo mercado.",
          },
          {
            icon: "Zap",
            title: "Automacoes de Lancamento",
            description:
              "Toda a operacao tecnica de e-mail marketing, tags, automacoes de WhatsApp e integracao entre plataformas configurada e testada.",
          },
          {
            icon: "BarChart3",
            title: "Dados em Tempo Real",
            description:
              "Dashboard de lancamento com metricas atualizadas: leads captados, taxa de abertura, CPL, vendas e faturamento acompanhados em tempo real.",
          },
          {
            icon: "Shield",
            title: "Operacao Blindada",
            description:
              "Checklists de lancamento, plano B para contingencias e equipe de plantao durante os dias de carrinho aberto para garantir zero falhas tecnicas.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Investimento no Lancamento",
        subtitle:
          "Um investimento que se paga com as vendas do primeiro lancamento, criando uma base para escalar nos proximos.",
        badge: "Pacote de Lancamento",
        priceOriginal: "R$ 7.500",
        priceCurrent: "R$ 4.997",
        priceCurrency: "R$",
        pricePeriod: "/lancamento",
        description:
          "Estrutura completa de lancamento digital: funis, trafego pago, copy, automacoes e acompanhamento. Valor nao inclui verba de anuncios.",
        includedItems: [
          "Estrategia completa de lancamento personalizada",
          "Pagina de captura + pagina de vendas otimizadas",
          "Gestao de trafego pago durante todo o lancamento",
          "Sequencia de e-mails de lancamento (12 a 15 e-mails)",
          "Criativos para anuncios (videos e imagens)",
          "Configuracao de automacoes e integracao de plataformas",
          "Dashboard de acompanhamento em tempo real",
          "Suporte dedicado durante os dias de carrinho aberto",
        ],
        ctaLabel: "Quero Lancar Agora",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se a estrutura de lancamento nao for entregue dentro do prazo acordado e com todos os itens do escopo, voce recebe 100% do valor de volta.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao de Futuro",
        title: "Seu Infoproduto Escalando",
        subtitle:
          "Imagine seu produto digital vendendo todos os dias, com lancamentos cada vez maiores e uma base de alunos que cresce de forma exponencial.",
        items: [
          {
            icon: "TrendingUp",
            label: "Lancamentos com faturamento crescente a cada edicao",
          },
          {
            icon: "ShoppingCart",
            label: "Funil perpetuo gerando vendas todos os dias",
          },
          {
            icon: "Users",
            label: "Comunidade de alunos engajados e promotores da marca",
          },
          {
            icon: "Star",
            label: "Autoridade reconhecida como referencia no nicho",
          },
        ],
        quote:
          "O mercado digital recompensa quem tem metodo. Um lancamento bem estruturado nao depende de sorte, depende de estrategia, dados e execucao impecavel.",
        quoteHighlight: "metodo",
        footerClientName: "Nome do Infoprodutor",
        footerNote:
          "Proposta valida por 7 dias. Valores nao incluem verba de anuncios, que sera definida em conjunto na reuniao de planejamento.",
      },
    },
  ],
};
