import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "cinza-azulado-corporate",
  meta: {
    title: "Cinza Azulado Corporate",
    description:
      "Template corporativo em cinza azulado, ideal para propostas de automacao, sistemas e consultoria de TI.",
  },
  theme: {
    colors: {
      gold: "#64748B",
      goldLight: "#94A3B8",
      goldDark: "#475569",
      background: "#F8FAFC",
      foreground: "#0F172A",
      beige: "#F1F5F9",
      nude: "#E2E8F0",
      cream: "#F8FAFC",
    },
    fonts: {
      heading: "IBM Plex Sans",
      body: "IBM Plex Sans",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Tecnica",
        titleLine1: "Consultoria em",
        titleHighlight: "Transformacao Digital",
        subtitle:
          "Modernize processos, integre sistemas e prepare sua empresa para operar com eficiencia e inteligencia no ambiente digital.",
        clientName: "Nome da Empresa",
        ctaPrimary: {
          label: "Ver Escopo",
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
        sectionLabel: "Assessment",
        title: "Diagnostico de Maturidade Digital",
        subtitle:
          "Avaliacao do nivel de maturidade tecnologica da empresa e identificacao de oportunidades para ganhos de eficiencia.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Server",
            title: "Infraestrutura Legada",
            description:
              "Sistemas antigos e desatualizados que limitam a produtividade da equipe. Ferramentas que nao conversam entre si geram retrabalho e erros que consomem horas diarias.",
            severity: "alto",
          },
          {
            icon: "FileText",
            title: "Processos Manuais Criticos",
            description:
              "Fluxos operacionais que dependem de planilhas, e-mails e intervencao humana para funcionar. Cada passo manual e um ponto de falha e atraso na operacao.",
            severity: "alto",
          },
          {
            icon: "Lock",
            title: "Seguranca Digital Basica",
            description:
              "Politicas de acesso e backup insuficientes para o volume de dados sensíveis da empresa. Sem protecao adequada, riscos de perda e vazamento sao significativos.",
            severity: "medio",
          },
          {
            icon: "BarChart3",
            title: "Dados Sem Inteligencia",
            description:
              "A empresa gera dados valiosos mas nao possui ferramentas para analisa-los. Decisoes estrategicas sao tomadas por intuicao ao inves de inteligencia de dados.",
            severity: "medio",
          },
          {
            icon: "Users",
            title: "Equipe Receptiva a Mudancas",
            description:
              "O time demonstra abertura para adotar novas ferramentas e processos. Esse fator humano e determinante para o sucesso de qualquer transformacao digital.",
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
        title: "Plano de Transformacao",
        subtitle:
          "Um roadmap estruturado em fases para modernizar a operacao da empresa de forma gradual, segura e mensuravel.",
        cards: [
          {
            icon: "Settings",
            title: "Fase 1: Infraestrutura & Processos",
            description:
              "Modernizacao da base tecnologica e digitalizacao dos processos operacionais criticos da empresa.",
            items: [
              "Migracao de sistemas legados para plataformas cloud",
              "Digitalizacao e automacao dos 5 processos mais criticos",
              "Implementacao de plataforma de gestao integrada",
              "Setup de politicas de seguranca e backup automatico",
              "Treinamento da equipe nas novas ferramentas",
            ],
          },
          {
            icon: "Zap",
            title: "Fase 2: Automacao & Integracao",
            description:
              "Conexao entre sistemas e automacao de fluxos para eliminar tarefas repetitivas e reduzir erros operacionais.",
            items: [
              "Integracao entre CRM, financeiro e operacional",
              "Automacao de notificacoes, alertas e follow-ups",
              "Workflows automaticos para aprovacoes e processos",
              "APIs de integracao com fornecedores e parceiros",
            ],
          },
          {
            icon: "BarChart3",
            title: "Fase 3: Inteligencia & Otimizacao",
            description:
              "Implementacao de dashboards, BI e inteligencia artificial para tomada de decisao baseada em dados.",
            items: [
              "Dashboard executivo com KPIs em tempo real",
              "Relatorios automatizados para gestao e diretoria",
              "Implementacao de IA para analise preditiva",
              "Otimizacao continua dos processos automatizados",
              "Plano de evolucao digital para os proximos 12 meses",
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
        title: "Tecnologia a Servico do Negocio",
        subtitle:
          "Nao implementamos tecnologia pela tecnologia. Cada solucao e escolhida para resolver um problema real de negocio.",
        cards: [
          {
            icon: "Briefcase",
            title: "Visao de Negocio",
            description:
              "Entendemos de negocio antes de entender de tecnologia. Cada solucao proposta tem um caso de uso claro e retorno mensuravel.",
          },
          {
            icon: "Settings",
            title: "Stack Moderna",
            description:
              "Utilizamos as ferramentas mais consolidadas e confiaveis do mercado. Sem tecnologias experimentais em producao.",
          },
          {
            icon: "Shield",
            title: "Seguranca em Primeiro Lugar",
            description:
              "Todas as implementacoes seguem boas praticas de seguranca. Dados protegidos, acessos controlados e auditoria completa.",
          },
          {
            icon: "BookOpen",
            title: "Documentacao Completa",
            description:
              "Cada processo e sistema entregue vem com documentacao detalhada e treinamento para que sua equipe tenha autonomia total.",
          },
          {
            icon: "RefreshCw",
            title: "Suporte Continuado",
            description:
              "Apos a implantacao, oferecemos suporte tecnico e evolucao continua para garantir que tudo funcione perfeitamente.",
          },
          {
            icon: "Users",
            title: "Gestao de Mudanca",
            description:
              "Nao basta implementar tecnologia. Acompanhamos a adocao pela equipe com treinamentos, materiais e suporte de transicao.",
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
          "Investimento em transformacao digital que gera retorno atraves da reducao de custos operacionais e aumento de produtividade.",
        badge: "Projeto Completo",
        priceOriginal: "R$ 25.000",
        priceCurrent: "R$ 18.997",
        priceCurrency: "R$",
        pricePeriod: " total",
        description:
          "Projeto completo de transformacao digital em 3 fases com prazo de 90 dias. Pagamento em ate 6x sem juros ou parcelado conforme cronograma de entregas.",
        includedItems: [
          "Diagnostico completo de maturidade digital",
          "Migracao e modernizacao de infraestrutura",
          "Automacao de ate 10 processos criticos",
          "Integracoes entre sistemas existentes",
          "Dashboard executivo personalizado",
          "Documentacao tecnica completa",
          "Treinamento da equipe em todas as ferramentas",
          "90 dias de suporte pos-implantacao inclusos",
        ],
        ctaLabel: "Iniciar Transformacao",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Ao final de cada fase, apresentamos os resultados obtidos. Se a fase nao atingir os objetivos acordados, ajustamos sem custo adicional ate a entrega completa.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Uma Empresa Digitalmente Madura",
        subtitle:
          "Imagine sua empresa operando com processos automaticos, dados acessiveis e equipe empoderada com as melhores ferramentas.",
        items: [
          {
            icon: "Zap",
            label: "Processos automaticos que rodam sem intervencao manual",
          },
          {
            icon: "BarChart3",
            label: "Decisoes estrategicas embasadas em dados reais",
          },
          {
            icon: "Shield",
            label: "Dados protegidos com backup e seguranca robustos",
          },
          {
            icon: "Users",
            label: "Equipe produtiva focada em atividades estrategicas",
          },
        ],
        quote:
          "Transformacao digital nao e sobre tecnologia. E sobre usar a tecnologia certa para liberar o potencial humano da sua empresa e competir no mercado de amanha.",
        quoteHighlight: "liberar o potencial humano",
        footerClientName: "Nome da Empresa",
        footerNote:
          "Proposta valida por 15 dias uteis. Escopo final e prazos definidos apos reuniao de alinhamento tecnico.",
      },
    },
  ],
};
