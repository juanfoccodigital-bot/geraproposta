import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "premium-dourado",
  meta: {
    title: "Premium Dourado",
    description:
      "Template premium com tons dourados, ideal para clinicas de estetica, saude e bem-estar.",
  },
  theme: {
    colors: {
      gold: "#C9A96E",
      goldLight: "#D4BA88",
      goldDark: "#B8944F",
      background: "#FDFBF8",
      foreground: "#1A1A1A",
      beige: "#F5F0EB",
      nude: "#E8DDD3",
      cream: "#FAF7F4",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Poppins",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Exclusiva",
        titleLine1: "Posicionamento Digital",
        titleHighlight: "para Clinicas de Excelencia",
        subtitle:
          "Transforme a presenca digital da sua clinica e atraia pacientes qualificados com uma estrategia completa de marketing medico.",
        clientName: "Nome do Cliente \u2014 Cidade/UF",
        ctaPrimary: {
          label: "Ver Diagnostico",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Falar com Especialista",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Analise da Presenca Digital Atual",
        subtitle:
          "Identificamos os principais pontos de atencao e oportunidades para potencializar o posicionamento online da sua clinica.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Eye",
            title: "Baixa Visibilidade no Instagram",
            description:
              "O perfil atual nao transmite a autoridade e sofisticacao que a clinica oferece presencialmente. Publicacoes sem padrao visual e frequencia irregular reduzem o alcance organico e a percepcao de valor.",
            severity: "alto",
          },
          {
            icon: "Target",
            title: "Ausencia de Trafego Pago Estrategico",
            description:
              "Sem campanhas de anuncios segmentados, a clinica depende exclusivamente de indicacoes. Pacientes que buscam ativamente por procedimentos na regiao nao encontram a clinica nos resultados.",
            severity: "alto",
          },
          {
            icon: "Users",
            title: "Captacao de Pacientes Limitada",
            description:
              "O funil de captacao atual nao possui etapas claras de atracamento, nutriacao e conversao. Potenciais pacientes que demonstram interesse nao recebem acompanhamento adequado.",
            severity: "medio",
          },
          {
            icon: "Palette",
            title: "Identidade Visual Inconsistente",
            description:
              "A comunicacao visual nas redes sociais nao esta alinhada com a identidade premium da clinica. Falta coesao entre cores, tipografia e estilo fotografico nas publicacoes.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Reputacao Online Positiva",
            description:
              "A clinica possui avaliacoes positivas no Google e depoimentos espontaneos de pacientes satisfeitos. Esse ativo pode ser amplificado com uma estrategia de prova social estruturada.",
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
        title: "Plano de Acao Personalizado",
        subtitle:
          "Uma estrategia completa para posicionar sua clinica como referencia digital na regiao e atrair pacientes de alto valor.",
        cards: [
          {
            icon: "Sparkles",
            title: "Branding & Conteudo Premium",
            description:
              "Construcao de uma presenca visual sofisticada e conteudo estrategico que transmita autoridade medica e exclusividade.",
            items: [
              "Redesign completo do perfil e destaques do Instagram",
              "Planejamento editorial mensal com 20 publicacoes estrategicas",
              "Producao de carrosséis educativos sobre procedimentos",
              "Stories diarios com bastidores e humanizacao da equipe",
              "Reels otimizados com tendencias e linguagem do nicho",
            ],
          },
          {
            icon: "TrendingUp",
            title: "Trafego Pago & Captacao",
            description:
              "Campanhas de anuncios segmentados para atrair pacientes qualificados que buscam procedimentos na sua regiao.",
            items: [
              "Campanhas de reconhecimento para publico frio na regiao",
              "Anuncios de conversao para agendamento direto via WhatsApp",
              "Remarketing para visitantes do perfil e site da clinica",
              "Testes A/B de criativos e copys para otimizacao continua",
            ],
          },
          {
            icon: "MessageCircle",
            title: "Relacionamento & Conversao",
            description:
              "Estrategia de nutriacao e acompanhamento para transformar seguidores em pacientes fieis.",
            items: [
              "Scripts de atendimento para Direct e WhatsApp",
              "Sequencia de mensagens para follow-up pos consulta",
              "Estrategia de depoimentos e prova social em video",
              "Programa de indicacao digital entre pacientes",
              "Relatorios mensais de metricas e resultados",
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
        title: "Por Que Escolher Nossa Assessoria",
        subtitle:
          "Combinamos expertise em marketing digital com profundo conhecimento do mercado de saude e estetica.",
        cards: [
          {
            icon: "Stethoscope",
            title: "Especialistas em Saude",
            description:
              "Equipe com experiencia comprovada no marketing para clinicas, respeitando as normas do CFM e diretrizes eticas da publicidade medica.",
          },
          {
            icon: "Palette",
            title: "Design Premium",
            description:
              "Criacoes visuais sofisticadas que transmitem a qualidade e exclusividade que seus pacientes esperam ao escolher sua clinica.",
          },
          {
            icon: "BarChart3",
            title: "Decisoes Baseadas em Dados",
            description:
              "Cada acao e mensurada e otimizada. Voce recebe relatorios claros com metricas que importam: agendamentos, custo por lead e ROI.",
          },
          {
            icon: "Shield",
            title: "Compliance e Etica",
            description:
              "Todo conteudo e revisado para garantir conformidade com as regulamentacoes de publicidade na area da saude, protegendo sua reputacao.",
          },
          {
            icon: "Headphones",
            title: "Suporte Dedicado",
            description:
              "Canal direto com a equipe responsavel pela sua conta. Respostas rapidas e alinhamentos semanais para garantir que tudo esteja no caminho certo.",
          },
          {
            icon: "Rocket",
            title: "Resultados Acelerados",
            description:
              "Metodologia propria que gera os primeiros resultados visiveis ja nas primeiras semanas, com crescimento consistente mes a mes.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Investimento Mensal",
        subtitle:
          "Um investimento acessivel para transformar a presenca digital da sua clinica e gerar retorno real.",
        badge: "Condicao Especial",
        priceOriginal: "R$ 3.200",
        priceCurrent: "R$ 2.497",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Plano completo de gestao de redes sociais, trafego pago e estrategia de captacao de pacientes. Sem fidelidade, cancele quando quiser.",
        includedItems: [
          "Gestao completa do Instagram (20 posts/mes)",
          "Criacao de conteudo visual premium",
          "Gestao de trafego pago (Meta Ads)",
          "Planejamento editorial estrategico mensal",
          "Stories e Reels semanais",
          "Relatorio mensal de desempenho",
          "Suporte via WhatsApp em horario comercial",
          "Reuniao mensal de alinhamento e resultados",
        ],
        ctaLabel: "Quero Comecar Agora",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Garantia de satisfacao nos primeiros 30 dias. Se nao ficar satisfeito com o trabalho entregue, devolvemos 100% do valor investido.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao de Futuro",
        title: "O Futuro Digital da Sua Clinica",
        subtitle:
          "Imagine sua clinica reconhecida como referencia digital na regiao, com agenda cheia de pacientes qualificados.",
        items: [
          {
            icon: "TrendingUp",
            label: "Crescimento constante de seguidores qualificados",
          },
          {
            icon: "Calendar",
            label: "Agenda preenchida com pacientes ideais",
          },
          {
            icon: "Award",
            label: "Reconhecimento como autoridade na regiao",
          },
          {
            icon: "Heart",
            label: "Pacientes fieis que indicam sua clinica",
          },
        ],
        quote:
          "Uma clinica que se posiciona com excelencia no digital atrai pacientes que valorizam qualidade e estao dispostos a investir em si mesmos.",
        quoteHighlight: "excelencia no digital",
        footerClientName: "Nome do Cliente \u2014 Cidade/UF",
        footerNote:
          "Proposta valida por 7 dias. Valores e condicoes sujeitos a alteracao apos este prazo.",
      },
    },
  ],
};
