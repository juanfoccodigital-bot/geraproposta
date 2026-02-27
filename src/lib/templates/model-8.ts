import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "azul-marinho-classico",
  meta: {
    title: "Azul Marinho Classico",
    description:
      "Template classico e confiavel com tons de azul marinho, perfeito para propostas de trafego pago e marketing de performance.",
  },
  theme: {
    colors: {
      gold: "#1E3A5F",
      goldLight: "#2E5A8F",
      goldDark: "#0F2440",
      background: "#FAFBFD",
      foreground: "#0A1628",
      beige: "#EDF1F7",
      nude: "#D4DDEA",
      cream: "#F5F7FB",
    },
    fonts: {
      heading: "Merriweather",
      body: "Source Sans 3",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta de Servico",
        titleLine1: "Trafego Pago",
        titleHighlight: "de Alta Performance",
        subtitle:
          "Campanhas estruturadas com metodologia comprovada para gerar leads qualificados e maximizar o retorno sobre cada real investido em anuncios.",
        clientName: "Nome da Empresa",
        ctaPrimary: {
          label: "Ver Diagnostico",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Agendar Consultoria",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Analise de Performance Atual",
        subtitle:
          "Avaliacao detalhada das campanhas e canais de aquisicao atuais para identificar oportunidades de otimizacao imediata.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "DollarSign",
            title: "CPA Acima da Media",
            description:
              "O custo por aquisicao atual esta 40% acima do benchmark do setor. Sem otimizacao de publicos e criativos, o orcamento e consumido sem gerar o volume necessario de conversoes.",
            severity: "alto",
          },
          {
            icon: "Filter",
            title: "Funil de Conversao Quebrado",
            description:
              "A jornada do clique ate a conversao possui pontos de friccao criticos. Paginas de destino lentas e formularios extensos estao causando abandono superior a 70% dos visitantes.",
            severity: "alto",
          },
          {
            icon: "PieChart",
            title: "Orcamento Mal Distribuido",
            description:
              "A alocacao de verba entre campanhas e plataformas nao segue uma logica de performance. Campanhas de baixo retorno continuam recebendo investimento sem criterio de corte.",
            severity: "medio",
          },
          {
            icon: "Database",
            title: "Pixel e Tracking Incompletos",
            description:
              "Os eventos de conversao nao estao sendo rastreados corretamente. Sem dados precisos de atribuicao, e impossivel otimizar campanhas baseado em resultados reais.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Produto com Boa Conversao Organica",
            description:
              "O produto ja converte bem quando o publico certo chega ate ele. Isso indica que com trafego qualificado e segmentado, os resultados podem escalar rapidamente.",
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
        title: "Plano de Performance",
        subtitle:
          "Estrutura completa de trafego pago com foco em reduzir custos, aumentar volume e escalar resultados de forma previsivel.",
        cards: [
          {
            icon: "Settings",
            title: "Setup & Infraestrutura",
            description:
              "Configuracao tecnica completa para garantir rastreamento preciso e estrutura solida antes de investir em anuncios.",
            items: [
              "Auditoria e configuracao do Pixel do Meta e Google Tag",
              "Implementacao de eventos de conversao e atribuicao",
              "Criacao de publicos personalizados e lookalikes",
              "Setup de campanhas com estrutura de funil completa",
              "Configuracao de UTMs e painel de rastreamento",
            ],
          },
          {
            icon: "TrendingUp",
            title: "Gestao de Campanhas",
            description:
              "Operacao diaria de otimizacao das campanhas para garantir o melhor custo por resultado em cada canal.",
            items: [
              "Gestao diaria de Meta Ads com otimizacao de lances",
              "Campanhas de Search e Display no Google Ads",
              "Testes A/B semanais de criativos, copys e publicos",
              "Escala controlada com monitoramento de CPA em tempo real",
              "Remarketing multinivel para recuperar leads perdidos",
            ],
          },
          {
            icon: "FileText",
            title: "Relatorios & Inteligencia",
            description:
              "Monitoramento constante e relatorios executivos para tomar decisoes baseadas em dados concretos.",
            items: [
              "Dashboard em tempo real com metricas de performance",
              "Relatorio semanal resumido com acoes tomadas",
              "Relatorio mensal completo com analise de ROI",
              "Recomendacoes estrategicas baseadas em dados",
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
        title: "Gestao Profissional de Trafego",
        subtitle:
          "Nao somos uma agencia generica. Somos especialistas em performance com foco obsessivo em ROI.",
        cards: [
          {
            icon: "Target",
            title: "Especialistas em Performance",
            description:
              "Equipe certificada pelo Meta e Google com experiencia em gerenciar mais de R$ 500 mil em verba publicitaria com ROI positivo comprovado.",
          },
          {
            icon: "BarChart3",
            title: "Obcecados por Dados",
            description:
              "Cada decisao e baseada em metricas. Analisamos CPL, CPA, ROAS, LTV e taxa de conversao para otimizar continuamente os resultados.",
          },
          {
            icon: "Shield",
            title: "Transparencia Total",
            description:
              "Acesso completo as contas de anuncios. Voce ve exatamente onde cada centavo e investido e qual retorno esta gerando.",
          },
          {
            icon: "Zap",
            title: "Otimizacao Diaria",
            description:
              "Nao esperamos o relatorio mensal para agir. Monitoramos e ajustamos campanhas diariamente para maximizar performance.",
          },
          {
            icon: "RefreshCw",
            title: "Testes Sistematicos",
            description:
              "Cultura de experimentacao constante. Testamos hipoteses de publico, criativo e oferta para encontrar as combinacoes vencedoras.",
          },
          {
            icon: "Headphones",
            title: "Comunicacao Executiva",
            description:
              "Relatorios claros e objetivos, sem jargoes desnecessarios. Voce entende exatamente o que esta acontecendo e por que.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Plano de Gestao",
        subtitle:
          "Investimento em gestao profissional que se paga com a reducao de custos e aumento de conversoes.",
        badge: "Performance",
        priceOriginal: "R$ 3.500",
        priceCurrent: "R$ 2.497",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Fee de gestao mensal para operacao completa de trafego pago. Valor nao inclui verba de anuncios (recomendado minimo de R$ 3.000/mes).",
        includedItems: [
          "Gestao completa de Meta Ads e Google Ads",
          "Setup e configuracao de tracking e pixels",
          "Criacao de ate 10 criativos por mes",
          "Testes A/B semanais de publicos e criativos",
          "Dashboard de performance em tempo real",
          "Relatorio semanal + relatorio mensal detalhado",
          "Reuniao quinzenal de alinhamento estrategico",
          "Suporte via WhatsApp em horario comercial",
        ],
        ctaLabel: "Contratar Gestao",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se em 60 dias nao houver melhoria mensuravel nos indicadores de performance comparado ao cenario inicial, devolvemos o valor do primeiro mes.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Resultados Previsiveis e Escalaveis",
        subtitle:
          "Imagine ter um fluxo constante de leads qualificados chegando todos os dias, com custo controlado e ROI crescente.",
        items: [
          {
            icon: "DollarSign",
            label: "CPA reduzido e ROI positivo em cada campanha",
          },
          {
            icon: "TrendingUp",
            label: "Volume de leads crescente mes apos mes",
          },
          {
            icon: "PieChart",
            label: "Orcamento otimizado com zero desperdicio de verba",
          },
          {
            icon: "Rocket",
            label: "Escala previsivel com margem de lucro saudavel",
          },
        ],
        quote:
          "Trafego pago profissional nao e gastar dinheiro com anuncios. E construir uma maquina de aquisicao previsivel que transforma investimento em receita de forma sistematica.",
        quoteHighlight: "maquina de aquisicao previsivel",
        footerClientName: "Nome da Empresa",
        footerNote:
          "Proposta valida por 10 dias uteis. Valores de gestao nao incluem verba de anuncios.",
      },
    },
  ],
};
