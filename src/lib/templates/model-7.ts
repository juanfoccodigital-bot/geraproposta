import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "cinza-minimalista",
  meta: {
    title: "Cinza Minimalista",
    description:
      "Template clean e minimalista em tons de cinza, ideal para propostas de social media com visual sofisticado e moderno.",
  },
  theme: {
    colors: {
      gold: "#6B7280",
      goldLight: "#9CA3AF",
      goldDark: "#4B5563",
      background: "#FFFFFF",
      foreground: "#111827",
      beige: "#F3F4F6",
      nude: "#E5E7EB",
      cream: "#F9FAFB",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Comercial",
        titleLine1: "Gestao de",
        titleHighlight: "Redes Sociais",
        subtitle:
          "Uma abordagem minimalista e estrategica para posicionar sua marca nas redes sociais com conteudo que gera resultado real.",
        clientName: "Nome do Cliente",
        ctaPrimary: {
          label: "Ver Proposta",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Entrar em Contato",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Analise",
        title: "Diagnostico Atual",
        subtitle:
          "Uma visao clara e objetiva dos pontos de melhoria e oportunidades para sua presenca digital.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Eye",
            title: "Baixa Consistencia Visual",
            description:
              "As publicacoes atuais nao seguem uma identidade visual definida. Sem padronizacao, o feed perde coesao e a marca nao e reconhecida instantaneamente pelo publico.",
            severity: "alto",
          },
          {
            icon: "Calendar",
            title: "Frequencia Irregular de Posts",
            description:
              "A falta de um calendario editorial resulta em semanas sem publicacoes seguidas de varios posts em um dia. Essa inconsistencia prejudica o algoritmo e o engajamento.",
            severity: "alto",
          },
          {
            icon: "MessageCircle",
            title: "Interacao Limitada com Seguidores",
            description:
              "Comentarios e mensagens diretas nao recebem respostas rapidas ou estrategicas. Cada interacao perdida e uma oportunidade de conversao desperdicada.",
            severity: "medio",
          },
          {
            icon: "Hash",
            title: "Hashtags e SEO Social Ausentes",
            description:
              "As publicacoes nao utilizam hashtags estrategicas nem otimizacoes de texto para buscas dentro das plataformas, limitando o alcance organico.",
            severity: "medio",
          },
          {
            icon: "ThumbsUp",
            title: "Boa Reputacao Organica",
            description:
              "Clientes satisfeitos ja recomendam a marca espontaneamente. Com uma estrategia de conteudo, esse boca a boca pode ser amplificado exponencialmente.",
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
        title: "Plano de Acao",
        subtitle:
          "Estrategia simples, direta e eficiente para transformar suas redes sociais em um canal de captacao real.",
        cards: [
          {
            icon: "Palette",
            title: "Identidade & Conteudo",
            description:
              "Criacao de uma identidade visual consistente e producao de conteudo estrategico alinhado aos objetivos da marca.",
            items: [
              "Criacao de linha editorial com 3 pilares de conteudo",
              "Design de templates padronizados para o feed",
              "Producao de 16 posts mensais com copy estrategica",
              "Criacao de Reels semanais com tendencias do nicho",
              "Calendario editorial mensal aprovado previamente",
            ],
          },
          {
            icon: "Users",
            title: "Engajamento & Comunidade",
            description:
              "Gestao ativa da comunidade para transformar seguidores em clientes e promotores da marca.",
            items: [
              "Resposta a comentarios e DMs em ate 4 horas",
              "Estrategia de Stories diarios com enquetes e interacoes",
              "Monitoramento de mencoes e oportunidades de engajamento",
              "Parcerias estrategicas com perfis complementares",
            ],
          },
          {
            icon: "BarChart3",
            title: "Analise & Otimizacao",
            description:
              "Monitoramento continuo de metricas para ajustar a estrategia e maximizar resultados.",
            items: [
              "Relatorio mensal com metricas de crescimento e engajamento",
              "Analise de melhores horarios e formatos de publicacao",
              "Teste de diferentes formatos de conteudo",
              "Benchmarking mensal com concorrentes diretos",
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
        title: "Por Que Nos Escolher",
        subtitle:
          "Simplicidade, estrategia e resultado. Sem enrolacao, sem metricas de vaidade.",
        cards: [
          {
            icon: "Target",
            title: "Foco em Resultado",
            description:
              "Nao medimos sucesso por curtidas. Acompanhamos metricas que importam: leads, vendas e crescimento real do negocio.",
          },
          {
            icon: "Zap",
            title: "Agilidade na Execucao",
            description:
              "Processos enxutos e comunicacao direta. Sem reunioes desnecessarias, sem burocracia. Conteudo aprovado e publicado com eficiencia.",
          },
          {
            icon: "Eye",
            title: "Design Minimalista",
            description:
              "Visual limpo e profissional que destaca a mensagem. Menos ruido, mais impacto na comunicacao da sua marca.",
          },
          {
            icon: "Clock",
            title: "Prazos Cumpridos",
            description:
              "Calendario editorial entregue com antecedencia. Voce aprova o conteudo antes da publicacao sem correria de ultima hora.",
          },
          {
            icon: "MessageCircle",
            title: "Comunicacao Clara",
            description:
              "Canal direto com a equipe. Respostas rapidas e alinhamentos objetivos para manter tudo fluindo sem atrito.",
          },
          {
            icon: "TrendingUp",
            title: "Melhoria Continua",
            description:
              "A cada mes analisamos o que funcionou e otimizamos. Estrategia viva que evolui junto com seu negocio.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Valor do Servico",
        subtitle:
          "Investimento acessivel para quem quer profissionalizar suas redes sociais sem complicacao.",
        badge: "Plano Mensal",
        priceOriginal: "R$ 1.800",
        priceCurrent: "R$ 1.297",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Gestao completa de redes sociais com conteudo estrategico, design profissional e acompanhamento de resultados. Sem fidelidade.",
        includedItems: [
          "16 publicacoes mensais com design e copy",
          "4 Reels ou videos curtos por mes",
          "Stories diarios estrategicos",
          "Gestao de comunidade e respostas",
          "Calendario editorial mensal",
          "Relatorio mensal de performance",
          "Suporte via WhatsApp em horario comercial",
        ],
        ctaLabel: "Comecar Agora",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Teste por 30 dias. Se nao ficar satisfeito com a qualidade do conteudo entregue, devolvemos seu investimento integralmente.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Resultados",
        title: "O Que Voce Vai Conquistar",
        subtitle:
          "Redes sociais profissionais que trabalham por voce todos os dias, atraindo clientes de forma organica e consistente.",
        items: [
          {
            icon: "Sparkles",
            label: "Feed profissional que transmite credibilidade",
          },
          {
            icon: "TrendingUp",
            label: "Crescimento organico consistente de seguidores",
          },
          {
            icon: "Users",
            label: "Comunidade engajada que interage e compra",
          },
          {
            icon: "Clock",
            label: "Tempo livre para focar no que voce faz de melhor",
          },
        ],
        quote:
          "Redes sociais bem gerenciadas nao sao um custo. Sao o vendedor que trabalha 24 horas por dia, 7 dias por semana, sem ferias.",
        quoteHighlight: "vendedor que trabalha 24 horas",
        footerClientName: "Nome do Cliente",
        footerNote:
          "Proposta valida por 7 dias. Valores sujeitos a alteracao apos este prazo.",
      },
    },
  ],
};
