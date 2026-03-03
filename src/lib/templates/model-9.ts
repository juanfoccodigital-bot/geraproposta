import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "verde-limao-fresh",
  meta: {
    title: "Verde Limao Fresh",
    description:
      "Template vibrante e energetico com verde limao, ideal para personal trainers, nutricionistas e negocios fitness.",
  },
  theme: {
    colors: {
      gold: "#84CC16",
      goldLight: "#A3E635",
      goldDark: "#65A30D",
      background: "#FAFFF5",
      foreground: "#1A1A1A",
      beige: "#F0F9E8",
      nude: "#DCEFCC",
      cream: "#F2F7ED",
    },
    fonts: {
      heading: "Outfit",
      body: "DM Sans",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Personalizada",
        titleLine1: "Marketing para",
        titleHighlight: "Personal Trainers",
        subtitle:
          "Atraia alunos qualificados, construa sua autoridade no digital e lote sua agenda com uma estrategia de marketing feita para profissionais fitness.",
        clientName: "Nome do Personal",
        ctaPrimary: {
          label: "Ver Estrategia",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Falar no WhatsApp",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Analise do Seu Posicionamento",
        subtitle:
          "Mapeamos como voce esta se posicionando no digital e identificamos as principais oportunidades de crescimento.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Smartphone",
            title: "Perfil Sem Estrategia de Conteudo",
            description:
              "As publicacoes sao esporadicas e sem uma linha editorial definida. Sem consistencia e estrategia, o perfil nao atrai novos seguidores e nao converte seguidores em alunos.",
            severity: "alto",
          },
          {
            icon: "DollarSign",
            title: "Dependencia Total de Indicacao",
            description:
              "Novos alunos chegam apenas por boca a boca. Sem uma estrategia digital ativa, o crescimento fica limitado e imprevisivel, sujeito a sazonalidades.",
            severity: "alto",
          },
          {
            icon: "Video",
            title: "Reels Sem Otimizacao",
            description:
              "Os videos publicados nao seguem as melhores praticas de formato, duracao e hook. Com ajustes simples, o alcance pode multiplicar significativamente.",
            severity: "medio",
          },
          {
            icon: "FileText",
            title: "Falta de Prova Social Estruturada",
            description:
              "Transformacoes de alunos e depoimentos nao estao sendo documentados e utilizados estrategicamente como conteudo de conversao no perfil.",
            severity: "medio",
          },
          {
            icon: "Award",
            title: "Expertise e Resultados Comprovados",
            description:
              "Voce ja transforma a vida dos seus alunos com resultados reais. Essa experiencia e o combustivel perfeito para criar conteudo que atrai e converte no digital.",
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
        title: "Plano de Crescimento",
        subtitle:
          "Estrategia completa para posicionar voce como referencia fitness na sua regiao e lotar sua agenda de alunos.",
        cards: [
          {
            icon: "Camera",
            title: "Conteudo & Autoridade",
            description:
              "Producao de conteudo estrategico que mostra sua expertise e atrai alunos ideais organicamente.",
            items: [
              "Planejamento editorial com 16 posts mensais",
              "Reels semanais com dicas de treino e nutricao",
              "Series de transformacao de alunos (antes e depois)",
              "Conteudo educativo sobre exercicios e habitos saudaveis",
              "Stories diarios com rotina de treinos e bastidores",
            ],
          },
          {
            icon: "Target",
            title: "Captacao Local",
            description:
              "Campanhas segmentadas para atrair pessoas da sua regiao que buscam um personal trainer.",
            items: [
              "Anuncios geolocalizados no Instagram e Facebook",
              "Campanha de aula experimental com formulario",
              "Remarketing para quem visitou seu perfil",
              "Landing page de captacao otimizada para conversao",
            ],
          },
          {
            icon: "Heart",
            title: "Fidelizacao & Indicacao",
            description:
              "Estrategias para manter alunos engajados e transforma-los em promotores da sua marca.",
            items: [
              "Programa de indicacao com beneficios para alunos",
              "Grupo exclusivo no WhatsApp para comunidade de alunos",
              "Campanha de depoimentos em video",
              "Conteudo exclusivo para alunos nos Stories",
              "Acompanhamento de satisfacao mensal",
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
        title: "Marketing Feito para Fitness",
        subtitle:
          "Entendemos o mercado fitness e criamos estrategias que falam a lingua do seu publico.",
        cards: [
          {
            icon: "Dumbbell",
            title: "Especialistas em Fitness",
            description:
              "Conhecemos as dores e desejos do publico que busca personal trainer. Criamos conteudo que conecta e converte.",
          },
          {
            icon: "MapPin",
            title: "Marketing Hiperlocal",
            description:
              "Campanhas focadas no raio de atuacao da sua area. Cada centavo atinge potenciais alunos perto de voce.",
          },
          {
            icon: "Camera",
            title: "Conteudo que Engaja",
            description:
              "Producao de Reels e posts que combinam tendencias virais com sua expertise para maximizar alcance e autoridade.",
          },
          {
            icon: "Smartphone",
            title: "Mobile First",
            description:
              "Todo conteudo pensado para consumo mobile, onde 95% do seu publico esta navegando e buscando inspiracao.",
          },
          {
            icon: "TrendingUp",
            title: "Metricas Claras",
            description:
              "Acompanhamos leads gerados, custo por lead e novos alunos captados. Metricas reais, nao curtidas.",
          },
          {
            icon: "Headphones",
            title: "Suporte Proximo",
            description:
              "Comunicacao direta por WhatsApp. Alinhamentos semanais e ajustes rapidos na estrategia quando necessario.",
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
          "Um investimento que se paga com 2 a 3 novos alunos por mes. O resto e lucro puro.",
        badge: "Oferta Especial",
        priceOriginal: "R$ 2.200",
        priceCurrent: "R$ 1.497",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Gestao completa de marketing digital com foco em captacao de alunos para personal trainers. Sem fidelidade.",
        includedItems: [
          "16 posts mensais com design e copy profissional",
          "4 Reels otimizados por mes",
          "Stories estrategicos diarios",
          "Gestao de trafego pago local",
          "Landing page de captacao de leads",
          "Relatorio mensal de resultados",
          "Suporte por WhatsApp em horario comercial",
        ],
        ctaLabel: "Quero Lotar Minha Agenda",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se nos primeiros 30 dias voce nao receber leads interessados nos seus servicos, devolvemos 100% do valor investido.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao de Futuro",
        title: "Sua Agenda Sempre Cheia",
        subtitle:
          "Imagine ter uma lista de espera de alunos querendo treinar com voce, sendo referencia fitness na sua regiao.",
        items: [
          {
            icon: "Calendar",
            label: "Agenda lotada com alunos qualificados",
          },
          {
            icon: "Award",
            label: "Reconhecido como autoridade fitness na regiao",
          },
          {
            icon: "Users",
            label: "Alunos que indicam e promovem seu trabalho",
          },
          {
            icon: "TrendingUp",
            label: "Renda previsivel e crescente mes a mes",
          },
        ],
        quote:
          "Personal trainers que investem em marketing digital nao competem por preco. Eles atraem alunos que valorizam qualidade e estao dispostos a investir em sua saude.",
        quoteHighlight: "nao competem por preco",
        footerClientName: "Nome do Personal",
        footerNote:
          "Proposta valida por 7 dias. Valores sujeitos a alteracao apos este prazo.",
      },
    },
  ],
};
