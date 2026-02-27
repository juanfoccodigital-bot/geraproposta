import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "midnight-blue-dark",
  meta: {
    title: "Midnight Blue Dark",
    description:
      "Template dark premium com azul profundo, ideal para SaaS, startups de tecnologia e propostas de desenvolvimento de software.",
  },
  theme: {
    colors: {
      gold: "#3B82F6",
      goldLight: "#60A5FA",
      goldDark: "#2563EB",
      background: "#080C14",
      foreground: "#E8ECF4",
      beige: "#0F1520",
      nude: "#182030",
      cream: "#0B1018",
    },
    fonts: {
      heading: "Plus Jakarta Sans",
      body: "Inter",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta SaaS",
        titleLine1: "Construa Seu",
        titleHighlight: "Produto Digital",
        subtitle:
          "Do MVP ao produto escalavel. Desenvolvimento de SaaS com arquitetura moderna, experiencia de usuario excepcional e infraestrutura pronta para crescer.",
        clientName: "Nome da Startup",
        ctaPrimary: {
          label: "Ver Escopo",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Agendar Discovery",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Discovery",
        title: "Analise do Cenario Atual",
        subtitle:
          "Mapeamento das necessidades, restricoes e oportunidades para definir o escopo ideal do produto digital.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Lightbulb",
            title: "Ideia Validada, Produto Inexistente",
            description:
              "A proposta de valor ja foi validada com potenciais usuarios, mas ainda nao existe um produto digital funcional. O risco de perder a janela de oportunidade aumenta a cada dia sem o MVP.",
            severity: "alto",
          },
          {
            icon: "Users",
            title: "Usuarios Esperando Solucao",
            description:
              "Ha uma lista de espera ou pre-cadastros demonstrando demanda real. Esses early adopters sao essenciais para feedback, mas vao perder interesse se o produto demorar.",
            severity: "alto",
          },
          {
            icon: "Clock",
            title: "Time-to-Market Critico",
            description:
              "O mercado esta aquecido e concorrentes estao se movendo. Cada mes sem o produto no ar e uma fatia de mercado perdida para quem chegar primeiro.",
            severity: "medio",
          },
          {
            icon: "DollarSign",
            title: "Orcamento Limitado para MVP",
            description:
              "O budget disponivel precisa ser usado com inteligencia maxima. Cada feature deve ser justificada pelo valor que entrega ao usuario e ao negocio.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Proposta de Valor Clara",
            description:
              "O problema que o produto resolve esta bem definido e o diferencial em relacao a concorrencia e claro. Esse clarity de proposta e o maior ativo de uma startup early-stage.",
            severity: "positivo",
          },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Roadmap",
        title: "Plano de Desenvolvimento",
        subtitle:
          "Abordagem lean com sprints curtos, feedback constante e entrega incremental para colocar o produto no ar no menor tempo possivel.",
        cards: [
          {
            icon: "FileText",
            title: "Sprint 0: Discovery & Design",
            description:
              "Imersao no negocio, definicao do escopo do MVP e design da experiencia do usuario antes de escrever uma linha de codigo.",
            items: [
              "Workshop de discovery para mapear user stories",
              "Definicao de funcionalidades core do MVP",
              "Wireframes e fluxos de usuario completos",
              "Design UI com design system reutilizavel",
              "Prototipo navegavel para validacao com stakeholders",
            ],
          },
          {
            icon: "Code",
            title: "Sprints 1-4: Desenvolvimento",
            description:
              "Desenvolvimento agil em sprints de 2 semanas com entrega funcional ao final de cada sprint para feedback continuo.",
            items: [
              "Setup de infraestrutura cloud e CI/CD",
              "Desenvolvimento front-end com Next.js e React",
              "API e backend com autenticacao e permissoes",
              "Integracao com servicos de pagamento (Stripe/etc)",
              "Testes automatizados e QA continuo",
            ],
          },
          {
            icon: "Rocket",
            title: "Sprint 5: Launch & Iteracao",
            description:
              "Deploy em producao, onboarding de early adopters e inicio do ciclo de feedback e iteracao rapida.",
            items: [
              "Deploy em producao com monitoramento completo",
              "Onboarding de primeiros usuarios (beta)",
              "Analytics e rastreamento de comportamento de uso",
              "Coleta de feedback e priorizacao de melhorias",
              "Plano de evolucao para os proximos 3 meses",
            ],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Stack",
        title: "Tecnologia de Startup",
        subtitle:
          "Usamos a mesma stack que as startups mais bem-sucedidas do mundo. Moderna, escalavel e com comunidade ativa.",
        cards: [
          {
            icon: "Rocket",
            title: "Velocidade de Entrega",
            description:
              "MVP funcional em 8 a 10 semanas. Metodologia lean que prioriza o essencial e elimina desperdicio de tempo e recursos.",
          },
          {
            icon: "Cpu",
            title: "Stack de Ponta",
            description:
              "Next.js, TypeScript, Tailwind, Supabase, Vercel. A mesma stack usada por unicornios como Vercel, Linear e Notion.",
          },
          {
            icon: "Maximize",
            title: "Escalabilidade Nativa",
            description:
              "Arquitetura projetada para escalar de 10 a 10.000 usuarios sem reescrever codigo. Serverless, edge functions e CDN global.",
          },
          {
            icon: "GitBranch",
            title: "Codigo seu, Sempre",
            description:
              "Voce e dono do repositorio, do codigo e de toda a infraestrutura. Zero vendor lock-in, total liberdade para evoluir com qualquer equipe.",
          },
          {
            icon: "Shield",
            title: "Seguranca Enterprise",
            description:
              "Autenticacao robusta, row-level security, criptografia de dados e compliance com LGPD desde o dia zero.",
          },
          {
            icon: "FileText",
            title: "Documentacao Viva",
            description:
              "Documentacao tecnica atualizada a cada sprint. Storybook de componentes, API docs e runbook de operacoes.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investment",
        title: "Investimento no MVP",
        subtitle:
          "Investimento otimizado para colocar seu produto no mercado rapido e comecar a validar com usuarios reais.",
        badge: "MVP Completo",
        priceOriginal: "R$ 50.000",
        priceCurrent: "R$ 35.997",
        priceCurrency: "R$",
        pricePeriod: " total",
        description:
          "MVP completo com design, desenvolvimento, deploy e 30 dias de suporte. Prazo de 8 a 10 semanas. Pagamento por sprint conforme entregas.",
        includedItems: [
          "Discovery workshop e definicao de escopo",
          "Design UI/UX completo com design system",
          "Desenvolvimento full-stack (front + back + DB)",
          "Autenticacao, permissoes e seguranca",
          "Integracao com pagamentos e servicos externos",
          "Deploy em producao com CI/CD automatizado",
          "Monitoramento e analytics configurados",
          "30 dias de suporte e bug fixes pos-launch",
        ],
        ctaLabel: "Construir Meu Produto",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Pagamento por sprint: voce so paga o proximo sprint apos aprovacao da entrega anterior. Se o primeiro sprint nao atender, reembolso integral.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Launch",
        title: "Seu SaaS no Mercado",
        subtitle:
          "Imagine seu produto no ar, com usuarios pagantes, metricas crescendo e investidores interessados no que voce esta construindo.",
        items: [
          {
            icon: "Rocket",
            label: "MVP no ar em 10 semanas com usuarios reais",
          },
          {
            icon: "Users",
            label: "Early adopters engajados gerando feedback valioso",
          },
          {
            icon: "TrendingUp",
            label: "Metricas de uso validando product-market fit",
          },
          {
            icon: "DollarSign",
            label: "Receita recorrente (MRR) crescendo mes a mes",
          },
        ],
        quote:
          "O melhor produto do mundo nao vale nada se nao estiver no mercado. Lance rapido, aprenda com usuarios reais e itere. O MVP perfeito e o que existe.",
        quoteHighlight: "O MVP perfeito e o que existe",
        footerClientName: "Nome da Startup",
        footerNote:
          "Proposta valida por 10 dias. Disponibilidade de inicio sujeita a agenda de sprints.",
      },
    },
  ],
};
