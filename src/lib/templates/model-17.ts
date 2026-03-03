import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "neon-cyber",
  meta: {
    title: "Neon Cyber",
    description:
      "Template dark mode com verde neon estilo cyberpunk, ideal para desenvolvedores, startups tech e propostas de vibe coding.",
  },
  theme: {
    colors: {
      gold: "#00FF88",
      goldLight: "#33FFAA",
      goldDark: "#00CC6A",
      background: "#0A0A0A",
      foreground: "#E0E0E0",
      beige: "#141414",
      nude: "#1E1E1E",
      cream: "#121212",
    },
    fonts: {
      heading: "Space Grotesk",
      body: "JetBrains Mono",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "// proposta_tecnica",
        titleLine1: "Desenvolvimento",
        titleHighlight: "Full-Stack & IA",
        subtitle:
          "Aplicacoes web modernas, APIs robustas e integracoes com inteligencia artificial. Do conceito ao deploy com stack de ponta e codigo limpo.",
        clientName: "Nome do Cliente",
        ctaPrimary: {
          label: "Ver Stack",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Iniciar Conversa",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Debug",
        title: "Analise do Cenario Tecnico",
        subtitle:
          "Mapeamento dos gargalos tecnicos, divida tecnica e oportunidades de modernizacao da stack atual.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Code",
            title: "Codebase Legada e Fragil",
            description:
              "O codigo atual foi construido sem padroes claros de arquitetura. Sem testes automatizados e com alto acoplamento, cada nova feature e um risco de quebrar funcionalidades existentes.",
            severity: "alto",
          },
          {
            icon: "Server",
            title: "Infraestrutura Nao Escalavel",
            description:
              "A aplicacao roda em servidor unico sem auto-scaling. Picos de acesso causam lentidao ou quedas. Sem CI/CD, deploys sao manuais e arriscados.",
            severity: "alto",
          },
          {
            icon: "Database",
            title: "Banco de Dados Desotimizado",
            description:
              "Queries lentas, falta de indices e modelagem inadequada causam gargalos de performance. A aplicacao demora segundos para carregar dados simples.",
            severity: "medio",
          },
          {
            icon: "Shield",
            title: "Vulnerabilidades de Seguranca",
            description:
              "Endpoints sem autenticacao adequada, SQL injection em formularios e dados sensiveis sem criptografia. Riscos criticos que precisam de correcao imediata.",
            severity: "medio",
          },
          {
            icon: "Sparkles",
            title: "Produto com PMF Validado",
            description:
              "O produto ja tem usuarios ativos e metricas de engajamento positivas. A tecnologia precisa acompanhar o crescimento que o negocio ja esta demonstrando.",
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
        title: "Arquitetura de Solucao",
        subtitle:
          "Stack moderna, escalavel e mantivel. Cada decisao tecnica justificada por requisitos de negocio e performance.",
        cards: [
          {
            icon: "Terminal",
            title: "Desenvolvimento Core",
            description:
              "Construcao ou refatoracao da aplicacao com stack moderna e boas praticas de engenharia de software.",
            items: [
              "Next.js 14+ com App Router e Server Components",
              "API Routes ou tRPC para backend type-safe",
              "Banco de dados Supabase/PostgreSQL com Prisma ORM",
              "Autenticacao completa com NextAuth ou Supabase Auth",
              "Testes unitarios e de integracao com Vitest",
            ],
          },
          {
            icon: "Brain",
            title: "Integracao com IA",
            description:
              "Implementacao de funcionalidades inteligentes usando APIs de IA de ultima geracao.",
            items: [
              "Integracao com Claude API / OpenAI para features de IA",
              "RAG (Retrieval-Augmented Generation) para busca inteligente",
              "Chatbot com IA contextualizado ao seu negocio",
              "Automacao de tarefas com agentes de IA",
            ],
          },
          {
            icon: "Cloud",
            title: "DevOps & Infraestrutura",
            description:
              "Setup de infraestrutura cloud com CI/CD automatizado e monitoramento de producao.",
            items: [
              "Deploy automatizado na Vercel ou AWS com preview por PR",
              "Pipeline CI/CD com testes, lint e build automaticos",
              "Monitoramento de erros com Sentry e logging estruturado",
              "CDN e otimizacao de assets para performance maxima",
              "Documentacao tecnica completa no repositorio",
            ],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Specs",
        title: "Codigo que Escala",
        subtitle:
          "Nao entregamos codigo que funciona. Entregamos codigo que escala, que outros devs entendem e que voce tem orgulho de mostrar.",
        cards: [
          {
            icon: "Code",
            title: "Clean Code",
            description:
              "Codigo limpo, tipado e documentado. TypeScript end-to-end com padroes consistentes que facilitam manutencao futura por qualquer desenvolvedor.",
          },
          {
            icon: "Zap",
            title: "Performance Obsessiva",
            description:
              "Core Web Vitals otimizados, bundle splitting, lazy loading e cache estrategico. Cada milissegundo importa para conversao e SEO.",
          },
          {
            icon: "GitBranch",
            title: "Git Workflow Profissional",
            description:
              "Branches por feature, code review, conventional commits e changelog automatico. Historico limpo e rastreavel de cada alteracao.",
          },
          {
            icon: "Shield",
            title: "Seguranca by Design",
            description:
              "OWASP Top 10 coberto. Input validation, rate limiting, CSRF protection e headers de seguranca configurados desde o dia zero.",
          },
          {
            icon: "Cpu",
            title: "Stack de Ponta",
            description:
              "Next.js, TypeScript, Tailwind CSS, Supabase, Prisma. Ferramentas consolidadas pelo mercado que garantem produtividade e confiabilidade.",
          },
          {
            icon: "FileText",
            title: "Documentacao Real",
            description:
              "README completo, API docs, storybook de componentes e wiki tecnica. Voce recebe o projeto e sabe exatamente como tudo funciona.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Pricing",
        title: "Investimento no Projeto",
        subtitle:
          "Investimento em tecnologia de qualidade que acelera seu negocio e reduz custos de manutencao no longo prazo.",
        badge: "Full-Stack + IA",
        priceOriginal: "R$ 35.000",
        priceCurrent: "R$ 24.997",
        priceCurrency: "R$",
        pricePeriod: " total",
        description:
          "Projeto completo de desenvolvimento full-stack com integracoes de IA. Prazo estimado de 45 a 60 dias. Pagamento por milestone conforme entregas.",
        includedItems: [
          "Desenvolvimento front-end completo com Next.js",
          "API/Backend com autenticacao e banco de dados",
          "Integracao com IA (chatbot, geracao de conteudo)",
          "Setup de CI/CD e infraestrutura cloud",
          "Testes automatizados (unitarios + integracao)",
          "Monitoramento de erros e logging",
          "Documentacao tecnica completa",
          "30 dias de suporte e bug fixes pos-deploy",
        ],
        ctaLabel: "Iniciar Desenvolvimento",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Pagamento por milestone: voce so paga a proxima fase apos aprovacao da entrega anterior. Se a primeira entrega nao atender ao escopo, reembolso integral.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Deploy",
        title: "Seu Produto no Ar",
        subtitle:
          "Imagine seu produto rodando com performance impecavel, escalando automaticamente e impressionando cada usuario que acessa.",
        items: [
          {
            icon: "Rocket",
            label: "Aplicacao rapida, escalavel e pronta para crescer",
          },
          {
            icon: "Brain",
            label: "IA integrada gerando valor real para seus usuarios",
          },
          {
            icon: "Shield",
            label: "Codigo seguro e protegido contra vulnerabilidades",
          },
          {
            icon: "Code",
            label: "Codebase limpa que qualquer dev consegue evoluir",
          },
        ],
        quote:
          "A diferenca entre um produto que escala e um que quebra esta na qualidade do codigo e das decisoes tecnicas tomadas no inicio. Investir em engenharia de qualidade no comeco evita reescritas milionarias depois.",
        quoteHighlight: "qualidade do codigo e das decisoes tecnicas",
        footerClientName: "Nome do Cliente",
        footerNote:
          "Proposta valida por 10 dias. Escopo, prazos e valores finais definidos apos reuniao tecnica de alinhamento.",
      },
    },
  ],
};
