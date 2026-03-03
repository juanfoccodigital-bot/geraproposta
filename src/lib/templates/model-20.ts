import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "azul-royal-luxo",
  meta: {
    title: "Azul Royal Luxo",
    description:
      "Template sofisticado com azul royal e detalhes dourados, ideal para consultorias financeiras, escritorios de advocacia e servicos premium.",
  },
  theme: {
    colors: {
      gold: "#1E40AF",
      goldLight: "#3B82F6",
      goldDark: "#1E3A8A",
      background: "#FAFBFF",
      foreground: "#0A0E1A",
      beige: "#EDF0FA",
      nude: "#D6DDEF",
      cream: "#F2F3F7",
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
        badge: "Proposta Executiva",
        titleLine1: "Assessoria Juridica",
        titleHighlight: "& Marketing Especializado",
        subtitle:
          "Posicione seu escritorio como autoridade no digital, atraia clientes qualificados e construa uma marca juridica solida e respeitada no mercado.",
        clientName: "Nome do Escritorio",
        ctaPrimary: {
          label: "Ver Proposta",
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
        title: "Analise do Posicionamento Atual",
        subtitle:
          "Avaliacao criteriosa de como seu escritorio esta sendo percebido no ambiente digital e quais oportunidades de crescimento existem.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Globe",
            title: "Presenca Digital Limitada",
            description:
              "O escritorio nao possui presenca digital consistente. Potenciais clientes que buscam servicos juridicos na regiao encontram concorrentes melhor posicionados nos resultados de busca.",
            severity: "alto",
          },
          {
            icon: "FileText",
            title: "Conteudo Juridico Generico",
            description:
              "As poucas publicacoes existentes sao textos juridicos complexos que nao conectam com o publico-alvo. Conteudo sem estrategia de funil nao gera leads qualificados.",
            severity: "alto",
          },
          {
            icon: "Search",
            title: "SEO Inexistente",
            description:
              "O site nao aparece nas primeiras paginas do Google para termos estrategicos da area de atuacao. Sem SEO, o escritorio perde clientes para concorrentes diariamente.",
            severity: "medio",
          },
          {
            icon: "Linkedin",
            title: "LinkedIn Subutilizado",
            description:
              "A plataforma mais importante para networking e posicionamento juridico esta sendo ignorada ou usada sem estrategia clara de conteudo e conexoes.",
            severity: "medio",
          },
          {
            icon: "Award",
            title: "Reputacao e Expertise Solidas",
            description:
              "O escritorio possui decadas de experiencia, cases de sucesso e reconhecimento no mercado presencial. Esses ativos sao poderosos quando traduzidos para o digital.",
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
        title: "Plano de Autoridade Digital",
        subtitle:
          "Uma estrategia que respeita as normas da OAB enquanto posiciona o escritorio como referencia na sua area de atuacao.",
        cards: [
          {
            icon: "PenTool",
            title: "Conteudo & Autoridade",
            description:
              "Producao de conteudo juridico acessivel que demonstra expertise e atrai clientes qualificados de forma etica.",
            items: [
              "Artigos semanais sobre temas relevantes da area de atuacao",
              "Posts educativos no Instagram com linguagem acessivel",
              "Conteudo estrategico no LinkedIn para networking",
              "Videos curtos explicando direitos e processos comuns",
              "Revisao de compliance com normas da OAB em todo conteudo",
            ],
          },
          {
            icon: "Globe",
            title: "SEO & Presenca em Buscadores",
            description:
              "Otimizacao para ser encontrado quando potenciais clientes buscam servicos juridicos da sua especialidade.",
            items: [
              "Auditoria e otimizacao de SEO do site do escritorio",
              "Blog com artigos otimizados para termos estrategicos",
              "Google Meu Negocio otimizado com avaliacoes",
              "Estrategia de link building etico e profissional",
            ],
          },
          {
            icon: "Target",
            title: "Captacao Qualificada",
            description:
              "Estrategia de captacao que atrai clientes com perfil ideal de forma etica e dentro das normas da OAB.",
            items: [
              "Google Ads para buscas de servicos juridicos especificos",
              "Conteudo patrocinado informativo no Instagram",
              "Landing pages educativas que captam leads qualificados",
              "Automacao de nutriacao com conteudo relevante",
              "Webinarios educativos sobre temas de interesse do publico",
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
        title: "Marketing Juridico Especializado",
        subtitle:
          "Entendemos as particularidades e restricoes do marketing juridico e criamos estrategias 100% em conformidade com a OAB.",
        cards: [
          {
            icon: "Shield",
            title: "Compliance OAB",
            description:
              "Todo conteudo e estrategia sao revisados para garantir total conformidade com o Provimento 205/2021 da OAB e demais regulamentacoes.",
          },
          {
            icon: "BookOpen",
            title: "Linguagem Acessivel",
            description:
              "Traduzimos linguagem juridica complexa em conteudo que o publico-alvo entende e valoriza. Autoridade sem hermetismo.",
          },
          {
            icon: "Linkedin",
            title: "Experts em LinkedIn",
            description:
              "Estrategia especifica para LinkedIn, a plataforma mais relevante para profissionais do direito. Networking e autoridade no mesmo lugar.",
          },
          {
            icon: "Search",
            title: "SEO Juridico",
            description:
              "Especialistas em SEO para escritorios de advocacia. Sabemos quais termos seus clientes buscam e como aparecer nas primeiras posicoes.",
          },
          {
            icon: "Lock",
            title: "Confidencialidade",
            description:
              "Processos de seguranca para garantir que informacoes sensíveis do escritorio e clientes sejam tratadas com sigilo absoluto.",
          },
          {
            icon: "Headphones",
            title: "Atendimento Executivo",
            description:
              "Comunicacao profissional e respeitosa. Entendemos que advogados valorizam eficiencia e objetividade na comunicacao.",
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
          "Um investimento que se paga com poucos novos clientes captados pelo posicionamento digital do escritorio.",
        badge: "Plano Juridico",
        priceOriginal: "R$ 4.500",
        priceCurrent: "R$ 3.497",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Marketing digital completo para escritorios de advocacia com conteudo especializado, SEO e captacao etica de clientes.",
        includedItems: [
          "12 publicacoes mensais no Instagram com design e copy juridico",
          "4 artigos de blog otimizados para SEO por mes",
          "Gestao de conteudo e networking no LinkedIn",
          "Otimizacao contínua de SEO do site",
          "Gestao de Google Ads para buscas juridicas",
          "Revisao de compliance OAB em todo conteudo",
          "Relatorio mensal executivo de performance",
          "Reuniao mensal de alinhamento estrategico",
        ],
        ctaLabel: "Posicionar Meu Escritorio",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se em 90 dias nao houver melhoria no posicionamento organico e no volume de consultas via digital, estendemos o servico gratuitamente por mais 30 dias.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Referencia Digital na Advocacia",
        subtitle:
          "Imagine seu escritorio sendo encontrado naturalmente quando alguem busca os servicos juridicos que voce oferece na sua regiao.",
        items: [
          {
            icon: "Globe",
            label: "Primeiro resultado no Google para sua especialidade",
          },
          {
            icon: "Award",
            label: "Reconhecido como autoridade juridica no digital",
          },
          {
            icon: "Users",
            label: "Fluxo constante de clientes qualificados via digital",
          },
          {
            icon: "TrendingUp",
            label: "Crescimento sustentavel da carteira de clientes",
          },
        ],
        quote:
          "O cliente juridico moderno pesquisa antes de contratar. O escritorio que se posiciona como autoridade digital ganha a confianca antes da primeira consulta.",
        quoteHighlight: "ganha a confianca antes da primeira consulta",
        footerClientName: "Nome do Escritorio",
        footerNote:
          "Proposta valida por 10 dias uteis. Todo conteudo em conformidade com as normas da OAB.",
      },
    },
  ],
};
