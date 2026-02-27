import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "red-impact-dark",
  meta: {
    title: "Red Impact Dark",
    description:
      "Template dark mode ousado com vermelho vibrante, ideal para agencias de performance, growth hackers e estrategistas de vendas.",
  },
  theme: {
    colors: {
      gold: "#EF4444",
      goldLight: "#F87171",
      goldDark: "#DC2626",
      background: "#0A0A0A",
      foreground: "#F0F0F0",
      beige: "#1A1212",
      nude: "#2A1818",
      cream: "#120A0A",
    },
    fonts: {
      heading: "Montserrat",
      body: "Inter",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta de Growth",
        titleLine1: "Performance &",
        titleHighlight: "Growth Marketing",
        subtitle:
          "Estrategia de crescimento agressivo com trafego pago, CRO e automacoes para escalar seu faturamento de forma rapida e sustentavel.",
        clientName: "Nome da Empresa",
        ctaPrimary: {
          label: "Ver Plano de Acao",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Agendar Call",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Analise",
        title: "Gaps de Crescimento",
        subtitle:
          "Identificacao dos gargalos que estao limitando o crescimento do faturamento e as alavancas de escala imediata.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "TrendingDown",
            title: "CAC Insustentavel",
            description:
              "O custo de aquisicao de clientes esta consumindo a margem de lucro. Sem otimizacao de funil e trafego, cada novo cliente custa mais do que deveria e o crescimento vira prejuizo.",
            severity: "alto",
          },
          {
            icon: "Filter",
            title: "Funil com Vazamentos Criticos",
            description:
              "O funil de vendas possui pontos de queda drasticos entre cada etapa. De 100 visitantes, menos de 1 se torna cliente. Cada ponto de friccao e dinheiro escorrendo pelo ralo.",
            severity: "alto",
          },
          {
            icon: "RefreshCw",
            title: "LTV Baixo e Churn Alto",
            description:
              "Clientes nao estao voltando a comprar e a taxa de cancelamento corroe a receita. Sem estrategia de retencao, o balde esta furando mais rapido do que enche.",
            severity: "medio",
          },
          {
            icon: "Database",
            title: "Dados Sem Inteligencia",
            description:
              "Metricas estao sendo coletadas mas nao analisadas. Sem dashboards e analise estruturada, decisoes de growth sao baseadas em achismo ao inves de dados.",
            severity: "medio",
          },
          {
            icon: "Rocket",
            title: "Produto com Potencial de Escala",
            description:
              "O produto tem aceitacao de mercado comprovada e margem saudavel. Com uma maquina de aquisicao otimizada, o crescimento pode ser exponencial.",
            severity: "positivo",
          },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Playbook",
        title: "Plano de Growth",
        subtitle:
          "Estrategia agressiva de crescimento em 3 frentes: reduzir CAC, aumentar LTV e escalar o que funciona.",
        cards: [
          {
            icon: "Target",
            title: "Aquisicao & Trafego",
            description:
              "Operacao de trafego de alta performance para adquirir clientes no menor custo possivel em todos os canais relevantes.",
            items: [
              "Audit completo de campanhas e reconstrucao de funil ads",
              "Meta Ads: funil de 3 niveis com 50+ criativos em teste",
              "Google Ads: Search, Shopping e YouTube para alta intencao",
              "Escala horizontal com controle rigoroso de CPA/ROAS",
              "Experimentacao de novos canais: TikTok Ads, LinkedIn Ads",
            ],
          },
          {
            icon: "BarChart3",
            title: "CRO & Conversao",
            description:
              "Otimizacao de cada etapa do funil para transformar mais visitantes em clientes pagantes.",
            items: [
              "Auditoria de UX do site e paginas de vendas",
              "Testes A/B sistematicos de landing pages e CTAs",
              "Otimizacao de checkout e reducao de abandono",
              "Implementacao de provas sociais e gatilhos de urgencia",
              "Heatmaps e gravacao de sessoes para identificar friccao",
            ],
          },
          {
            icon: "Heart",
            title: "Retencao & LTV",
            description:
              "Estrategia para maximizar o valor de cada cliente ao longo do tempo e transformar compradores em fas.",
            items: [
              "Segmentacao de base por comportamento e valor",
              "Automacao de email marketing para upsell e cross-sell",
              "Programa de fidelidade e recompra",
              "NPS e pesquisa de satisfacao com acoes automaticas",
              "Estrategia de reativacao para clientes inativos",
            ],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "DNA",
        title: "Growth na Veia",
        subtitle:
          "Nao somos uma agencia de marketing. Somos uma squad de growth que pensa como co-fundador e age como operador.",
        cards: [
          {
            icon: "Rocket",
            title: "Mentalidade de Startup",
            description:
              "Agimos com velocidade e foco em resultado. Testes rapidos, decisoes ageis e execucao sem burocracia. Se nao funciona, pivotamos.",
          },
          {
            icon: "BarChart3",
            title: "100% Data-Driven",
            description:
              "Cada decisao e justificada por dados. Dashboard em tempo real, testes com significancia estatistica e relatorios sem floreios.",
          },
          {
            icon: "Target",
            title: "Full-Funnel",
            description:
              "Atuamos do topo do funil ao pos-venda. Aquisicao, ativacao, retencao, receita e referral. O framework AARRR na pratica.",
          },
          {
            icon: "Zap",
            title: "Velocidade de Execucao",
            description:
              "Sprints semanais com experimentos definidos, executados e mensurados. Em 30 dias rodamos 12+ experimentos com resultados concretos.",
          },
          {
            icon: "Code",
            title: "Growth Engineering",
            description:
              "Alem de marketing, temos developers no time. Automacoes, scripts, integracao de ferramentas e hacks tecnicos para escala rapida.",
          },
          {
            icon: "Shield",
            title: "Transparencia Brutal",
            description:
              "Acesso total a dashboards, campanhas e resultados. Se algo nao funciona, voce sabe primeiro. Sem maquiar numeros, sem esconder problemas.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Deal",
        title: "Investimento em Growth",
        subtitle:
          "Fee de performance que se paga com o aumento de receita ja no primeiro mes de operacao.",
        badge: "Growth Squad",
        priceOriginal: "R$ 8.000",
        priceCurrent: "R$ 5.997",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Squad dedicada de growth com estrategistas, gestores de trafego, designers e developers. Fee mensal + bonus por performance. Contrato trimestral.",
        includedItems: [
          "Estrategia completa de growth e roadmap de experimentos",
          "Gestao de trafego pago em todos os canais relevantes",
          "CRO com testes A/B semanais e otimizacao continua",
          "50+ criativos novos por mes para anuncios",
          "Automacoes de marketing e vendas",
          "Dashboard de growth com metricas em tempo real",
          "Sprint semanal com novos experimentos",
          "Reuniao semanal de resultados e proximos passos",
        ],
        ctaLabel: "Escalar Agora",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se em 90 dias nao houver melhoria mensuravel nas metricas de aquisicao e receita, devolvemos o valor do ultimo mes e encerramos sem multa.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Scale",
        title: "Crescimento Exponencial",
        subtitle:
          "Imagine seu negocio crescendo 30%, 50%, 100% ao mes com uma maquina de aquisicao previsivel e um time obcecado por resultado.",
        items: [
          {
            icon: "TrendingUp",
            label: "Receita crescendo mes a mes de forma previsivel",
          },
          {
            icon: "DollarSign",
            label: "CAC reduzido e margem saudavel em cada canal",
          },
          {
            icon: "Heart",
            label: "Clientes fieis que voltam e indicam sua marca",
          },
          {
            icon: "Rocket",
            label: "Maquina de growth rodando no piloto automatico",
          },
        ],
        quote:
          "Growth nao e sorte, nao e hack e nao e milagre. E metodo: hipotese, teste, medicao, aprendizado. Repita isso 100 vezes e o crescimento se torna inevitavel.",
        quoteHighlight: "o crescimento se torna inevitavel",
        footerClientName: "Nome da Empresa",
        footerNote:
          "Proposta valida por 7 dias. Vagas limitadas a 4 operacoes simultaneas por trimestre.",
      },
    },
  ],
};
