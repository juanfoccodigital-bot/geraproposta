import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "verde-saude",
  meta: {
    title: "Verde Saude",
    description:
      "Template com tons verdes vibrantes, ideal para academias, personal trainers e negocios de fitness e bem-estar.",
  },
  theme: {
    colors: {
      gold: "#5BA68A",
      goldLight: "#7DBBA3",
      goldDark: "#458D72",
      background: "#F8FDF9",
      foreground: "#1A1A1A",
      beige: "#EBF5F0",
      nude: "#D3E8DD",
      cream: "#F0F5F1",
    },
    fonts: {
      heading: "Lora",
      body: "DM Sans",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Personalizada",
        titleLine1: "Marketing Digital",
        titleHighlight: "para Academias que Crescem",
        subtitle:
          "Atraia novos alunos, reduza a rotatividade e construa uma comunidade engajada ao redor da sua academia com estrategias digitais comprovadas.",
        clientName: "Nome da Academia \u2014 Cidade/UF",
        ctaPrimary: {
          label: "Ver Diagnostico",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Conversar no WhatsApp",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Raio-X Digital da Sua Academia",
        subtitle:
          "Mapeamos os pontos criticos e as oportunidades para transformar sua presenca online em uma maquina de captacao de alunos.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Users",
            title: "Alta Rotatividade de Alunos",
            description:
              "A taxa de cancelamento esta acima da media do setor. Sem uma estrategia de engajamento e comunidade, alunos perdem a motivacao nos primeiros 90 dias e nao renovam o plano.",
            severity: "alto",
          },
          {
            icon: "Smartphone",
            title: "Redes Sociais Sem Estrategia",
            description:
              "O perfil no Instagram possui conteudo generico sem diferenciacao. Publicacoes de exercicios sem contexto nao geram conexao emocional nem transmitem o ambiente unico da academia.",
            severity: "alto",
          },
          {
            icon: "Search",
            title: "Invisivel no Google Local",
            description:
              "O Google Meu Negocio esta desatualizado e com poucas avaliacoes. Pessoas buscando academias na regiao encontram concorrentes melhor posicionados nos resultados de busca.",
            severity: "medio",
          },
          {
            icon: "MessageCircle",
            title: "Atendimento Digital Lento",
            description:
              "Mensagens no Direct e WhatsApp demoram a ser respondidas. Leads que solicitam informacoes sobre planos perdem o interesse quando o tempo de resposta ultrapassa 2 horas.",
            severity: "medio",
          },
          {
            icon: "Heart",
            title: "Comunidade Presencial Forte",
            description:
              "A academia ja possui um grupo fiel de alunos engajados e satisfeitos. Esses embaixadores naturais podem ser ativados digitalmente para gerar indicacoes e conteudo autentico.",
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
        title: "Plano de Crescimento Digital",
        subtitle:
          "Estrategias integradas para atrair alunos qualificados, engajar a comunidade e reduzir cancelamentos de forma consistente.",
        cards: [
          {
            icon: "Sparkles",
            title: "Conteudo & Comunidade",
            description:
              "Transforme sua academia em uma marca que inspira, educa e conecta pessoas atraves de conteudo estrategico nas redes sociais.",
            items: [
              "Producao de Reels com treinos, dicas e transformacoes de alunos",
              "Series de conteudo educativo sobre nutricao e bem-estar",
              "Desafios mensais no Instagram para engajar a comunidade",
              "Destaques organizados: planos, estrutura, equipe e depoimentos",
              "Stories diarios com rotina da academia e bastidores",
            ],
          },
          {
            icon: "Target",
            title: "Captacao & Trafego Pago",
            description:
              "Campanhas segmentadas para atrair pessoas do seu bairro e regiao que estao prontas para comecar a treinar.",
            items: [
              "Anuncios geolocalizados no Instagram e Facebook",
              "Campanhas de aula experimental gratuita com formulario",
              "Remarketing para visitantes do perfil e site",
              "Landing page otimizada para conversao de leads",
            ],
          },
          {
            icon: "Activity",
            title: "Retencao & Fidelizacao",
            description:
              "Estrategias para manter alunos motivados, reduzir cancelamentos e transformar clientes em promotores da marca.",
            items: [
              "Programa de indicacao com beneficios para alunos",
              "Automacao de mensagens para alunos inativos",
              "Campanha de depoimentos e transformacoes em video",
              "Calendario de eventos e acoes de engajamento presencial",
              "Pesquisa de satisfacao trimestral com plano de acao",
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
        title: "O Que Nos Torna Diferentes",
        subtitle:
          "Especializacao no mercado fitness combinada com metodologia orientada a resultados mensuraveis.",
        cards: [
          {
            icon: "Dumbbell",
            title: "Foco no Mercado Fitness",
            description:
              "Entendemos as dores, sazonalidades e oportunidades do setor de academias. Falamos a lingua do seu publico e sabemos o que converte.",
          },
          {
            icon: "MapPin",
            title: "Estrategia Hiperlocal",
            description:
              "Campanhas focadas no raio de atuacao da sua academia. Cada centavo investido atinge pessoas que podem se tornar alunos presenciais.",
          },
          {
            icon: "Camera",
            title: "Producao de Conteudo",
            description:
              "Equipe preparada para criar conteudo visual que transmite energia, motivacao e o ambiente real da sua academia.",
          },
          {
            icon: "TrendingUp",
            title: "Metricas que Importam",
            description:
              "Nao medimos apenas curtidas. Acompanhamos leads gerados, custo por matricula, taxa de retencao e crescimento real de alunos.",
          },
          {
            icon: "Calendar",
            title: "Planejamento Sazonal",
            description:
              "Estrategias adaptadas para alta e baixa temporada. Campanhas de verao, volta as aulas e datas comerciais planejadas com antecedencia.",
          },
          {
            icon: "Headphones",
            title: "Suporte Proximo",
            description:
              "Comunicacao direta e agil com a equipe que cuida da sua conta. Alinhamentos semanais e disponibilidade para ajustes rapidos.",
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
          "Um investimento que se paga com os novos alunos captados ja nos primeiros meses de operacao.",
        badge: "Oferta por Tempo Limitado",
        priceOriginal: "R$ 2.800",
        priceCurrent: "R$ 1.997",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Gestao completa de marketing digital com foco em captacao de alunos e construcao de comunidade. Contrato minimo de 3 meses.",
        includedItems: [
          "Gestao completa do Instagram (16 posts/mes)",
          "Producao de Reels e Stories semanais",
          "Gestao de trafego pago segmentado por regiao",
          "Otimizacao do Google Meu Negocio",
          "Criacao de landing page para captacao",
          "Automacao de mensagens para leads",
          "Relatorio mensal com metricas de captacao",
          "Reuniao quinzenal de resultados e planejamento",
        ],
        ctaLabel: "Garantir Minha Vaga",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se nos primeiros 30 dias voce nao receber leads qualificados interessados em conhecer sua academia, devolvemos 100% do investimento.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao de Futuro",
        title: "A Academia que Voce Sempre Sonhou",
        subtitle:
          "Imagine sua academia lotada, com lista de espera e sendo a mais comentada da regiao nas redes sociais.",
        items: [
          {
            icon: "Users",
            label: "Fluxo constante de novos alunos qualificados",
          },
          {
            icon: "Heart",
            label: "Comunidade engajada que promove sua marca",
          },
          {
            icon: "Star",
            label: "Referencia fitness na regiao com autoridade digital",
          },
          {
            icon: "TrendingUp",
            label: "Crescimento sustentavel e previsivel da base de alunos",
          },
        ],
        quote:
          "Academias que investem em presenca digital nao competem por preco. Elas criam comunidades que atraem, engajam e fidelizam alunos de forma natural e escalavel.",
        quoteHighlight: "criam comunidades",
        footerClientName: "Nome da Academia \u2014 Cidade/UF",
        footerNote:
          "Proposta valida por 7 dias. Valores e condicoes sujeitos a alteracao apos este prazo.",
      },
    },
  ],
};
