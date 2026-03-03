import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "roxo-tech",
  meta: {
    title: "Roxo Tech",
    description:
      "Template dark com tons roxos vibrantes, ideal para propostas de automacao, desenvolvimento e vibe coding.",
  },
  theme: {
    colors: {
      gold: "#8B5CF6",
      goldLight: "#A78BFA",
      goldDark: "#7C3AED",
      background: "#0F0A1A",
      foreground: "#F5F5F5",
      beige: "#1A1530",
      nude: "#252040",
      cream: "#171222",
    },
    fonts: {
      heading: "Space Grotesk",
      body: "Inter",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Tecnica",
        titleLine1: "Automacao & Desenvolvimento",
        titleHighlight: "com Inteligencia Artificial",
        subtitle:
          "Elimine tarefas repetitivas, integre sistemas e crie solucoes sob medida com automacoes inteligentes e desenvolvimento agil potencializado por IA.",
        clientName: "Nome da Empresa",
        ctaPrimary: {
          label: "Ver Diagnostico",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Agendar Call Tecnica",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Mapeamento de Processos e Gaps",
        subtitle:
          "Analisamos seus fluxos de trabalho atuais e identificamos onde a automacao e a tecnologia podem gerar os maiores ganhos de eficiencia.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Settings",
            title: "Processos Manuais e Repetitivos",
            description:
              "Tarefas criticas como envio de propostas, follow-ups, atualizacao de planilhas e geracao de relatorios ainda sao feitas manualmente, consumindo horas da equipe e aumentando margem de erro.",
            severity: "alto",
          },
          {
            icon: "Database",
            title: "Sistemas Desconectados",
            description:
              "CRM, planilhas, e-mail marketing e ferramentas de gestao operam de forma isolada. Dados ficam fragmentados e a equipe precisa migrar informacoes manualmente entre plataformas.",
            severity: "alto",
          },
          {
            icon: "Clock",
            title: "Tempo de Resposta Elevado",
            description:
              "Sem automacao no atendimento inicial, leads aguardam horas ou dias por uma resposta. Cada minuto de espera reduz drasticamente a probabilidade de conversao.",
            severity: "medio",
          },
          {
            icon: "FileText",
            title: "Falta de Dashboards e Visibilidade",
            description:
              "Nao existe um painel centralizado para acompanhar metricas de operacao, vendas e performance. Decisoes sao tomadas com base em percepcao, nao em dados atualizados.",
            severity: "medio",
          },
          {
            icon: "Code",
            title: "Equipe Aberta a Inovacao",
            description:
              "O time ja utiliza ferramentas digitais e demonstra disposicao para adotar novas tecnologias. Esse mindset facilita a implantacao de automacoes e acelera o retorno do investimento.",
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
        title: "Arquitetura de Solucoes",
        subtitle:
          "Uma abordagem modular e escalavel que combina automacoes no-code, integracao de IA e desenvolvimento sob medida.",
        cards: [
          {
            icon: "Zap",
            title: "Automacao de Workflows",
            description:
              "Automacao dos processos internos criticos utilizando ferramentas no-code e low-code para resultados rapidos e manutencao simplificada.",
            items: [
              "Mapeamento e redesenho dos fluxos de trabalho prioritarios",
              "Automacao de envio de propostas, contratos e follow-ups",
              "Integracao entre CRM, e-mail e ferramentas de gestao",
              "Notificacoes automaticas para equipe em eventos criticos",
              "Automacao de onboarding de novos clientes",
            ],
          },
          {
            icon: "Brain",
            title: "Integracao com IA",
            description:
              "Implementacao de inteligencia artificial para potencializar atendimento, analise de dados e geracao de conteudo.",
            items: [
              "Chatbot inteligente com IA para atendimento inicial 24/7",
              "Assistente de IA para geracao de propostas e documentos",
              "Analise automatizada de dados com insights via IA",
              "Classificacao e priorizacao automatica de leads",
            ],
          },
          {
            icon: "Terminal",
            title: "Desenvolvimento Sob Medida",
            description:
              "Criacao de solucoes personalizadas quando as ferramentas no-code nao atendem a complexidade dos requisitos.",
            items: [
              "Dashboard customizado com metricas em tempo real",
              "APIs e webhooks para integracoes especificas",
              "Aplicacao web interna para gestao de processos",
              "Scripts de automacao para tarefas complexas e recorrentes",
              "Documentacao tecnica completa de todas as solucoes",
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
        title: "Tecnologia com Visao de Negocio",
        subtitle:
          "Nao somos apenas tecnicos. Entendemos de negocio e criamos solucoes que geram impacto real no faturamento e na operacao.",
        cards: [
          {
            icon: "Cpu",
            title: "Stack Moderna",
            description:
              "Utilizamos as ferramentas mais eficientes do mercado: n8n, Make, Supabase, Next.js, APIs de IA e plataformas no-code de ponta.",
          },
          {
            icon: "Zap",
            title: "Entrega Rapida",
            description:
              "Metodologia agil com sprints semanais. Primeiras automacoes funcionando em dias, nao meses. Iteracao rapida baseada em feedback real.",
          },
          {
            icon: "Shield",
            title: "Seguranca e Confiabilidade",
            description:
              "Todas as integracoes seguem boas praticas de seguranca. Dados protegidos, acessos controlados e logs de auditoria em cada automacao.",
          },
          {
            icon: "BookOpen",
            title: "Documentacao Completa",
            description:
              "Cada automacao e solucao entregue vem com documentacao detalhada. Sua equipe tera autonomia para operar e fazer ajustes basicos.",
          },
          {
            icon: "Cloud",
            title: "Escalabilidade Nativa",
            description:
              "Solucoes projetadas para crescer com seu negocio. Arquitetura modular que permite adicionar novas automacoes sem retrabalho.",
          },
          {
            icon: "Headphones",
            title: "Suporte Tecnico Especializado",
            description:
              "Equipe tecnica disponivel para monitoramento, manutencao e evolucao continua das automacoes implantadas.",
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
          "Um investimento que se paga ao eliminar horas de trabalho manual e aumentar a velocidade de conversao.",
        badge: "Setup + Manutencao",
        priceOriginal: "R$ 6.000",
        priceCurrent: "R$ 4.497",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Inclui setup inicial das automacoes, integracoes e desenvolvimento, mais manutencao e evolucao mensal continua. Contrato trimestral.",
        includedItems: [
          "Mapeamento e automacao de ate 5 workflows criticos",
          "Integracoes entre ate 8 ferramentas e plataformas",
          "Chatbot com IA para atendimento automatizado",
          "Dashboard personalizado de metricas e KPIs",
          "Manutencao e monitoramento mensal das automacoes",
          "Ate 10 horas de desenvolvimento sob medida por mes",
          "Suporte tecnico prioritario via Slack ou WhatsApp",
          "Documentacao tecnica e treinamento da equipe",
        ],
        ctaLabel: "Iniciar Projeto",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Garantia de funcionamento: se qualquer automacao entregue apresentar falhas nos primeiros 60 dias, corrigimos sem custo adicional ate que esteja 100% operacional.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao de Futuro",
        title: "Sua Operacao no Piloto Automatico",
        subtitle:
          "Imagine sua empresa operando com eficiencia maxima, onde a tecnologia trabalha enquanto sua equipe foca no que realmente importa.",
        items: [
          {
            icon: "Zap",
            label: "Processos automatizados rodando 24 horas por dia",
          },
          {
            icon: "Brain",
            label: "IA trabalhando para qualificar e converter leads",
          },
          {
            icon: "BarChart3",
            label: "Decisoes embasadas em dados atualizados em tempo real",
          },
          {
            icon: "Rocket",
            label: "Equipe focada em estrategia, nao em tarefas operacionais",
          },
        ],
        quote:
          "O futuro pertence as empresas que automatizam o previsivel e liberam pessoas para o criativo. Automacao inteligente nao substitui equipes, ela multiplica seu potencial.",
        quoteHighlight: "multiplica seu potencial",
        footerClientName: "Nome da Empresa",
        footerNote:
          "Proposta valida por 10 dias. Valores podem variar de acordo com o escopo final definido na reuniao tecnica de alinhamento.",
      },
    },
  ],
};
