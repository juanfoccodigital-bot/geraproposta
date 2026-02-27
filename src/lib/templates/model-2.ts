import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "corporativo-azul",
  meta: {
    title: "Corporativo Azul",
    description:
      "Template corporativo com tons azuis, ideal para propostas de social media e trafego pago para empresas.",
  },
  theme: {
    colors: {
      gold: "#4A7BC7",
      goldLight: "#6E96D6",
      goldDark: "#3560A8",
      background: "#F8FAFD",
      foreground: "#1A1A1A",
      beige: "#EBF0F5",
      nude: "#D3DEE8",
      cream: "#F4F7FA",
    },
    fonts: {
      heading: "DM Serif Display",
      body: "Inter",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Comercial",
        titleLine1: "Gestao de Redes Sociais",
        titleHighlight: "& Trafego Pago Estrategico",
        subtitle:
          "Posicione sua marca como lider de mercado e gere leads qualificados com uma operacao completa de marketing digital orientada a resultados.",
        clientName: "Nome da Empresa",
        ctaPrimary: {
          label: "Ver Diagnostico",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Agendar Reuniao",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Panorama Digital da Sua Empresa",
        subtitle:
          "Analisamos os principais canais digitais e identificamos gaps estrategicos que limitam o crescimento da sua marca online.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Globe",
            title: "Presenca Digital Fragmentada",
            description:
              "As redes sociais da empresa nao possuem uma narrativa unificada. Cada canal transmite uma mensagem diferente, diluindo o posicionamento da marca e confundindo o publico-alvo.",
            severity: "alto",
          },
          {
            icon: "Target",
            title: "Investimento em Ads Sem Estrategia",
            description:
              "Os investimentos atuais em midia paga nao seguem um funil estruturado. Sem segmentacao adequada e testes sistematicos, o custo por lead permanece acima da media do segmento.",
            severity: "alto",
          },
          {
            icon: "BarChart3",
            title: "Metricas Sem Acompanhamento",
            description:
              "Nao ha um painel de controle unificado para acompanhar KPIs relevantes. Decisoes de marketing estao sendo tomadas sem embasamento em dados concretos de performance.",
            severity: "medio",
          },
          {
            icon: "MessageCircle",
            title: "Engajamento Abaixo do Potencial",
            description:
              "A taxa de interacao nas publicacoes esta inferior a media do setor. O conteudo atual nao gera conversas significativas nem estimula o compartilhamento organico.",
            severity: "medio",
          },
          {
            icon: "Award",
            title: "Marca com Forte Reputacao Offline",
            description:
              "A empresa ja possui reconhecimento solido no mercado presencial e carteira de clientes fiel. Essa base e um ativo poderoso para alavancar o posicionamento digital.",
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
        title: "Plano Estrategico de Crescimento",
        subtitle:
          "Uma abordagem integrada que conecta branding, conteudo e performance para gerar resultados mensuraveis e escaláveis.",
        cards: [
          {
            icon: "Compass",
            title: "Posicionamento & Branding Digital",
            description:
              "Construcao de uma presenca de marca consistente e estrategica em todos os pontos de contato digitais.",
            items: [
              "Definicao de tom de voz e pilares de conteudo da marca",
              "Criacao de identidade visual para redes sociais",
              "Planejamento editorial mensal com 24 publicacoes",
              "Producao de conteudo em formato carrossel, video e stories",
              "Gestao de comunidade e respostas estrategicas",
            ],
          },
          {
            icon: "TrendingUp",
            title: "Trafego Pago & Geracao de Leads",
            description:
              "Campanhas de alta performance no Meta Ads e Google Ads para atrair e converter leads qualificados.",
            items: [
              "Estruturacao de funil completo: topo, meio e fundo",
              "Criacao e gestao de campanhas no Meta Ads",
              "Campanhas de pesquisa e display no Google Ads",
              "Otimizacao semanal de publicos, criativos e orcamentos",
              "Implementacao de pixel e rastreamento de conversoes",
            ],
          },
          {
            icon: "LayoutDashboard",
            title: "Inteligencia de Dados & Otimizacao",
            description:
              "Monitoramento continuo e analise de dados para garantir que cada real investido gere o maximo de retorno.",
            items: [
              "Dashboard personalizado com KPIs em tempo real",
              "Analise semanal de performance por canal e campanha",
              "Testes A/B sistematicos de criativos e audiencias",
              "Relatorio executivo mensal com insights e proximos passos",
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
        title: "Por Que Somos a Escolha Certa",
        subtitle:
          "Uma assessoria completa que vai alem da execucao: pensamos estrategia, otimizamos processos e entregamos resultados.",
        cards: [
          {
            icon: "Brain",
            title: "Estrategia Antes de Tudo",
            description:
              "Cada acao e precedida por analise e planejamento. Nao seguimos formulas prontas: criamos estrategias sob medida para o seu segmento e objetivos.",
          },
          {
            icon: "BarChart3",
            title: "Cultura de Performance",
            description:
              "Obcecados por resultados mensuraveis. Monitoramos CPL, CAC, ROAS e taxa de conversao para garantir que seu investimento gere retorno real.",
          },
          {
            icon: "Users",
            title: "Equipe Multidisciplinar",
            description:
              "Profissionais especializados em estrategia, design, copywriting, trafego pago e analise de dados trabalhando de forma integrada na sua conta.",
          },
          {
            icon: "Zap",
            title: "Agilidade e Adaptacao",
            description:
              "Monitoramento diario das campanhas com ajustes rapidos. O mercado muda constantemente e nossa operacao acompanha essa velocidade.",
          },
          {
            icon: "Lock",
            title: "Transparencia Total",
            description:
              "Acesso completo a todas as contas, campanhas e relatorios. Voce e dono dos seus ativos digitais e tem visibilidade total de cada centavo investido.",
          },
          {
            icon: "Headphones",
            title: "Atendimento Consultivo",
            description:
              "Mais do que uma agencia, somos parceiros estrategicos. Reunioes quinzenais de alinhamento e canal direto para decisoes rapidas.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Plano de Investimento",
        subtitle:
          "Uma solucao completa e escalavel para empresas que querem dominar o digital com estrategia e performance.",
        badge: "Melhor Custo-Beneficio",
        priceOriginal: "R$ 4.500",
        priceCurrent: "R$ 3.497",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Gestao integrada de redes sociais e trafego pago com foco em geracao de leads e crescimento de marca. Contrato trimestral com renovacao automatica.",
        includedItems: [
          "Gestao de Instagram e LinkedIn (24 posts/mes)",
          "Gestao de trafego pago (Meta Ads + Google Ads)",
          "Producao de criativos e copys para anuncios",
          "Dashboard de performance em tempo real",
          "Relatorio executivo mensal detalhado",
          "Reunioes quinzenais de alinhamento estrategico",
          "Suporte dedicado via WhatsApp e e-mail",
          "Consultoria estrategica de posicionamento digital",
        ],
        ctaLabel: "Fechar Proposta",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Nos primeiros 30 dias, se voce nao perceber evolucao nos indicadores de performance, devolvemos integralmente o valor do primeiro mes.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao de Futuro",
        title: "O Proximo Nivel da Sua Empresa",
        subtitle:
          "Visualize sua empresa como referencia digital no segmento, com fluxo previsivel de leads e marca reconhecida pelo mercado.",
        items: [
          {
            icon: "TrendingUp",
            label: "Fluxo previsivel e escalavel de leads qualificados",
          },
          {
            icon: "Globe",
            label: "Marca reconhecida como autoridade no segmento",
          },
          {
            icon: "BarChart3",
            label: "ROI positivo e mensuravel em cada canal",
          },
          {
            icon: "Rocket",
            label: "Crescimento sustentavel mes apos mes",
          },
        ],
        quote:
          "Empresas que dominam o digital nao dependem de sorte. Elas constroem sistemas de aquisicao previsiveis e escalaveis que transformam investimento em receita.",
        quoteHighlight: "sistemas de aquisicao previsiveis e escalaveis",
        footerClientName: "Nome da Empresa",
        footerNote:
          "Proposta valida por 10 dias uteis. Valores e condicoes sujeitos a alteracao apos este prazo.",
      },
    },
  ],
};
