import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "coral-vibrante",
  meta: {
    title: "Coral Vibrante",
    description:
      "Template energetico em tons coral e peach, ideal para nutricionistas, studios de pilates e wellness.",
  },
  theme: {
    colors: {
      gold: "#F97066",
      goldLight: "#FCA5A0",
      goldDark: "#E5453A",
      background: "#FFFAF9",
      foreground: "#1A1210",
      beige: "#FFF0EE",
      nude: "#FFDDD8",
      cream: "#FFF5F4",
    },
    fonts: {
      heading: "Outfit",
      body: "Nunito",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Personalizada",
        titleLine1: "Marketing para",
        titleHighlight: "Nutricao & Wellness",
        subtitle:
          "Posicione-se como referencia em nutricao e bem-estar, atraia pacientes alinhados com sua abordagem e construa uma comunidade engajada no digital.",
        clientName: "Nome do Profissional",
        ctaPrimary: {
          label: "Ver Estrategia",
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
        title: "Sua Presenca Digital",
        subtitle:
          "Analise de como voce esta se posicionando no digital e oportunidades para atrair mais pacientes qualificados.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Utensils",
            title: "Conteudo Generico de Nutricao",
            description:
              "Posts com tabelas nutricionais e dicas genericas que qualquer perfil publica. Sem diferenciacao de abordagem, voce se mistura com milhares de outros profissionais.",
            severity: "alto",
          },
          {
            icon: "Camera",
            title: "Fotos de Pratos Sem Apelo",
            description:
              "Imagens de refeicoes sem producao fotografica adequada. No Instagram, a apresentacao visual e tao importante quanto o conteudo nutricional para atrair e engajar.",
            severity: "alto",
          },
          {
            icon: "Video",
            title: "Ausencia de Conteudo em Video",
            description:
              "O formato que mais engaja no segmento de saude e wellness esta sendo ignorado. Receitas, dicas e bastidores em video geram 3x mais engajamento que posts estaticos.",
            severity: "medio",
          },
          {
            icon: "Users",
            title: "Comunidade Nao Cultivada",
            description:
              "Seguidores existem mas nao ha estrategia de comunidade. Sem engajamento ativo, a audiencia e passiva e nao se converte em pacientes.",
            severity: "medio",
          },
          {
            icon: "Award",
            title: "Resultados Reais com Pacientes",
            description:
              "Seus pacientes alcancam resultados incriveis com seu acompanhamento. Essas transformacoes sao conteudo de ouro quando documentadas e compartilhadas estrategicamente.",
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
        title: "Plano de Posicionamento Wellness",
        subtitle:
          "Estrategia completa para construir sua autoridade no segmento de nutricao e atrair pacientes que valorizam sua abordagem unica.",
        cards: [
          {
            icon: "Sparkles",
            title: "Conteudo & Autoridade",
            description:
              "Producao de conteudo que demonstra sua expertise e diferencia sua abordagem de todos os outros profissionais.",
            items: [
              "Planejamento editorial com 16 posts mensais tematicos",
              "Reels semanais de receitas, dicas e mitos da nutricao",
              "Carrosseis educativos sobre temas do seu nicho especifico",
              "Conteudo de bastidores e rotina do consultorio",
              "Stories diarios com dicas praticas e interacao",
            ],
          },
          {
            icon: "Camera",
            title: "Producao Visual Food",
            description:
              "Conteudo visual de alta qualidade que faz a comida saudavel parecer irresistivel e inspira mudanca de habitos.",
            items: [
              "Sessao fotografica mensal de receitas e pratos",
              "Edicao profissional de videos de receitas",
              "Templates visuais com identidade da marca",
              "Guia de estilo para fotos do dia a dia",
            ],
          },
          {
            icon: "Target",
            title: "Captacao & Conversao",
            description:
              "Estrategia para transformar seguidores engajados em pacientes do consultorio.",
            items: [
              "Anuncios locais para publico interessado em nutricao",
              "E-book ou material gratuito para captacao de leads",
              "Funil de nutriacao por e-mail com conteudo exclusivo",
              "Landing page de agendamento de consulta",
              "Programa de indicacao entre pacientes atuais",
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
        title: "Marketing para Saude & Wellness",
        subtitle:
          "Combinamos criatividade visual com conhecimento do segmento para criar conteudo que engaja e converte no nicho de saude.",
        cards: [
          {
            icon: "Heart",
            title: "Foco em Wellness",
            description:
              "Experiencia no segmento de saude e bem-estar. Sabemos que tipo de conteudo ressoa com quem busca qualidade de vida e alimentacao consciente.",
          },
          {
            icon: "Camera",
            title: "Food Photography",
            description:
              "Producao visual que faz comida saudavel parecer tao atraente quanto fast food. Imagens que inspiram e geram desejo de experimentar.",
          },
          {
            icon: "Shield",
            title: "Etica Profissional",
            description:
              "Conteudo revisado para nao fazer promessas irreais ou contrariar diretrizes do CFN. Sua credibilidade profissional e sagrada.",
          },
          {
            icon: "Palette",
            title: "Visual Fresh & Acolhedor",
            description:
              "Design que transmite leveza, saude e positividade. Cores e elementos visuais que atraem o publico certo para seu consultorio.",
          },
          {
            icon: "TrendingUp",
            title: "Metricas de Consultorio",
            description:
              "Medimos agendamentos e consultas, nao curtidas. O sucesso do marketing e medido pelo impacto real na sua agenda.",
          },
          {
            icon: "Headphones",
            title: "Suporte Dedicado",
            description:
              "Comunicacao proxima e respeitosa com seu tempo. Sabemos que entre consultas e conteudo, sua agenda e apertada.",
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
          "Investimento que se paga com 2 a 3 novas consultas por mes vindas do marketing digital.",
        badge: "Plano Wellness",
        priceOriginal: "R$ 2.500",
        priceCurrent: "R$ 1.697",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Gestao completa de marketing digital para profissionais de nutricao e wellness com producao visual e conteudo especializado.",
        includedItems: [
          "16 publicacoes mensais com design e copy especializados",
          "4 Reels de receitas ou dicas por mes",
          "Stories diarios estrategicos",
          "Sessao fotografica mensal de food photography",
          "Gestao de trafego pago local",
          "Material gratuito para captacao de leads",
          "Relatorio mensal de performance",
          "Suporte via WhatsApp em horario comercial",
        ],
        ctaLabel: "Quero Crescer no Digital",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se nos primeiros 30 dias voce nao perceber evolucao real na qualidade do conteudo e posicionamento, devolvemos 100% do investimento.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Referencia em Nutricao & Wellness",
        subtitle:
          "Imagine ser a nutricionista mais procurada da regiao, com pacientes que te encontram pelo Instagram e ja chegam confiando no seu trabalho.",
        items: [
          {
            icon: "Calendar",
            label: "Agenda lotada com pacientes que valorizam sua abordagem",
          },
          {
            icon: "Award",
            label: "Referencia no digital quando alguem busca nutricao",
          },
          {
            icon: "Heart",
            label: "Comunidade engajada que pratica e compartilha seus ensinamentos",
          },
          {
            icon: "TrendingUp",
            label: "Crescimento sustentavel e previsivel do consultorio",
          },
        ],
        quote:
          "Profissionais de nutricao que se posicionam com autenticidade no digital nao atraem qualquer paciente. Atraem os pacientes certos, que valorizam seu trabalho e seguem o tratamento.",
        quoteHighlight: "atraem os pacientes certos",
        footerClientName: "Nome do Profissional",
        footerNote:
          "Proposta valida por 7 dias. Conteudo em conformidade com diretrizes do CFN.",
      },
    },
  ],
};
