import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "verde-escuro-elegante",
  meta: {
    title: "Verde Escuro Elegante",
    description:
      "Template sofisticado em verde escuro, ideal para clinicas de psicologia, terapia e bem-estar emocional.",
  },
  theme: {
    colors: {
      gold: "#2D6A4F",
      goldLight: "#52B788",
      goldDark: "#1B4332",
      background: "#F7FBF8",
      foreground: "#1A1A1A",
      beige: "#E8F3EC",
      nude: "#D0E4D6",
      cream: "#F0F7F2",
    },
    fonts: {
      heading: "Lora",
      body: "Nunito",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Personalizada",
        titleLine1: "Marketing Digital para",
        titleHighlight: "Profissionais de Saude Mental",
        subtitle:
          "Posicione seu consultorio como referencia em saude emocional, atraia pacientes qualificados e construa uma presenca digital etica e acolhedora.",
        clientName: "Nome do Profissional",
        ctaPrimary: {
          label: "Ver Proposta",
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
        title: "Sua Presenca Digital Atual",
        subtitle:
          "Uma avaliacao cuidadosa de como voce esta se posicionando no ambiente digital e onde ha espaco para crescer de forma etica.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "User",
            title: "Perfil Sem Posicionamento Claro",
            description:
              "A bio e o conteudo do perfil nao comunicam claramente sua especialidade, publico-alvo e diferencial. Potenciais pacientes nao entendem como voce pode ajuda-los especificamente.",
            severity: "alto",
          },
          {
            icon: "FileText",
            title: "Conteudo Generico e Raso",
            description:
              "Posts com frases motivacionais genericas nao demonstram sua expertise real. O publico busca profissionais que demonstrem conhecimento profundo e abordagem unica.",
            severity: "alto",
          },
          {
            icon: "Search",
            title: "Nao Encontrado nas Buscas",
            description:
              "Quando alguem busca psicologo + sua especialidade + sua cidade no Google, voce nao aparece. Esse paciente vai para o concorrente que esta bem posicionado.",
            severity: "medio",
          },
          {
            icon: "Calendar",
            title: "Agenda Dependente de Indicacao",
            description:
              "Novos pacientes chegam quase exclusivamente por indicacao. Sem uma estrategia digital ativa, o crescimento e lento e imprevisivel.",
            severity: "medio",
          },
          {
            icon: "Heart",
            title: "Formacao e Experiencia Solidas",
            description:
              "Sua formacao, especializacoes e experiencia clinica sao diferenciais reais. Quando comunicados estrategicamente, geram confianca imediata em potenciais pacientes.",
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
        title: "Plano de Posicionamento Digital",
        subtitle:
          "Uma estrategia etica e acolhedora que respeita os limites do CFP enquanto posiciona voce como autoridade na sua area.",
        cards: [
          {
            icon: "PenTool",
            title: "Conteudo de Autoridade",
            description:
              "Producao de conteudo educativo e terapeutico que demonstra expertise sem ultrapassar limites eticos da profissao.",
            items: [
              "Planejamento editorial com 12 posts mensais",
              "Conteudo psicoeducativo sobre temas da sua especialidade",
              "Carrosseis com informacoes uteis e acessiveis",
              "Reels com dicas praticas de saude emocional",
              "Revisao etica de todo conteudo antes da publicacao",
            ],
          },
          {
            icon: "Globe",
            title: "Presenca em Buscadores",
            description:
              "Otimizacao para ser encontrado quando potenciais pacientes buscam profissionais da sua especialidade na regiao.",
            items: [
              "Otimizacao do Google Meu Negocio do consultorio",
              "Perfil em diretorios de profissionais de saude mental",
              "Estrategia de SEO para buscas locais",
              "Gestao de avaliacoes e reputacao online",
            ],
          },
          {
            icon: "Target",
            title: "Captacao Etica",
            description:
              "Estrategias de captacao que respeitam os limites eticos da profissao enquanto tornam seu trabalho visivel para quem precisa.",
            items: [
              "Anuncios informativos no Google para buscas ativas",
              "Conteudo patrocinado no Instagram para publico local",
              "Landing page informativa sobre sua abordagem",
              "Automacao sutil de agendamento online",
              "Estrategia de prova social com depoimentos eticos",
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
        title: "Marketing Etico para Saude Mental",
        subtitle:
          "Entendemos os limites eticos da sua profissao e criamos estrategias que respeitam integralmente o codigo de etica do CFP.",
        cards: [
          {
            icon: "Shield",
            title: "Compliance Etico",
            description:
              "Todo conteudo e revisado para garantir conformidade com o codigo de etica do CFP. Sua reputacao profissional e nossa prioridade.",
          },
          {
            icon: "Heart",
            title: "Linguagem Acolhedora",
            description:
              "Comunicacao que reflete empatia e acolhimento. O tom das publicacoes transmite seguranca e cuidado, alinhado ao seu trabalho clinico.",
          },
          {
            icon: "Brain",
            title: "Entendemos Saude Mental",
            description:
              "Nossa equipe tem familiaridade com o campo da saude mental. Sabemos traduzir conceitos complexos em conteudo acessivel sem banalizar.",
          },
          {
            icon: "Eye",
            title: "Visual Terapeutico",
            description:
              "Design que transmite calma, acolhimento e profissionalismo. Cores e elementos visuais escolhidos para criar sensacao de seguranca.",
          },
          {
            icon: "Lock",
            title: "Sigilo e Privacidade",
            description:
              "Nunca solicitaremos informacoes sobre pacientes ou casos clinicos. Todo marketing e feito respeitando a privacidade absoluta.",
          },
          {
            icon: "Headphones",
            title: "Atendimento Sensivel",
            description:
              "Comunicacao respeitosa e compreensiva. Entendemos que seu tempo e energia estao focados nos pacientes, nao em burocracias de marketing.",
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
          "Um investimento acessivel que se paga com 2 a 3 novos pacientes por mes vindos do digital.",
        badge: "Plano Saude Mental",
        priceOriginal: "R$ 2.000",
        priceCurrent: "R$ 1.397",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Gestao completa de marketing digital para profissionais de saude mental com conteudo etico e captacao qualificada.",
        includedItems: [
          "12 publicacoes mensais com design e copy etico",
          "2 Reels educativos por mes",
          "Stories semanais estrategicos",
          "Gestao e otimizacao do Google Meu Negocio",
          "Anuncios no Google para buscas ativas (gestao)",
          "Revisao etica de todo conteudo publicado",
          "Relatorio mensal de performance",
          "Suporte via WhatsApp em horario comercial",
        ],
        ctaLabel: "Quero Lotar Minha Agenda",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se nos primeiros 30 dias voce nao perceber evolucao na qualidade do seu posicionamento digital, devolvemos integralmente o investimento.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Seu Consultorio como Referencia",
        subtitle:
          "Imagine ser o profissional mais procurado da sua especialidade na regiao, com agenda cheia de pacientes que valorizam seu trabalho.",
        items: [
          {
            icon: "Calendar",
            label: "Agenda cheia com pacientes que buscaram voce ativamente",
          },
          {
            icon: "Award",
            label: "Reconhecido como autoridade na sua especialidade",
          },
          {
            icon: "Heart",
            label: "Pacientes alinhados com sua abordagem terapeutica",
          },
          {
            icon: "TrendingUp",
            label: "Crescimento sustentavel e previsivel da pratica clinica",
          },
        ],
        quote:
          "Profissionais de saude mental que se posicionam bem no digital nao competem por preco. Eles atraem pacientes que reconhecem e valorizam a qualidade do acompanhamento oferecido.",
        quoteHighlight: "reconhecem e valorizam a qualidade",
        footerClientName: "Nome do Profissional",
        footerNote:
          "Proposta valida por 10 dias. Todo conteudo segue diretrizes eticas do CFP/CRM.",
      },
    },
  ],
};
