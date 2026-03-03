import { ProposalConfig } from "@/types/proposal";

/* ── FREE: Indigo Profundo ── */
export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "indigo-profundo",
  meta: {
    title: "Indigo Profundo",
    description:
      "Template dark premium com indigo vibrante. Perfeito para agencias digitais, SaaS e empresas de tecnologia.",
  },
  theme: {
    colors: {
      gold: "#818CF8",
      goldLight: "#A5B4FC",
      goldDark: "#6366F1",
      background: "#09090F",
      foreground: "#E8E8F0",
      beige: "#13131F",
      nude: "#1E1E2E",
      cream: "#111117",
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
        badge: "Proposta Tecnica",
        titleLine1: "Solucoes em",
        titleHighlight: "Tecnologia & Design",
        subtitle:
          "Criamos produtos digitais que combinam design de alto nivel com engenharia robusta. Do MVP ao produto escalavel.",
        clientName: "Nome da Empresa",
        ctaPrimary: { label: "Ver Solucao", scrollTo: "diagnostico" },
        ctaSecondary: { label: "Agendar Reuniao", url: "https://wa.me/5500000000000" },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Discovery",
        title: "Mapeamento Tecnico",
        subtitle: "Analisamos o cenario atual para identificar as melhores oportunidades de evolucao.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          { icon: "Globe", title: "Presenca Digital Fraca", description: "Site desatualizado, sem responsividade e sem otimizacao para conversao. A experiencia do usuario esta afastando potenciais clientes.", severity: "alto" },
          { icon: "Smartphone", title: "Sem App ou PWA", description: "Concorrentes ja oferecem experiencia mobile nativa. Ficar para tras nesse aspecto e perder mercado diariamente.", severity: "medio" },
          { icon: "Server", title: "Sistemas Desconectados", description: "Ferramentas que nao conversam entre si geram retrabalho, erros e lentidao operacional.", severity: "medio" },
          { icon: "Rocket", title: "Timing de Mercado", description: "O momento e ideal para modernizar. O mercado esta aquecido e early adopters de tecnologia ganham vantagem competitiva.", severity: "positivo" },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Roadmap",
        title: "Plano de Execucao",
        subtitle: "Abordagem iterativa com entregas incrementais e feedback continuo.",
        cards: [
          {
            icon: "Paintbrush",
            title: "UX/UI Design",
            description: "Experiencia do usuario como prioridade numero um em cada decisao de design.",
            items: ["Pesquisa de usuario e personas", "Wireframes e prototipos interativos", "Design system escalavel", "Testes de usabilidade"],
          },
          {
            icon: "Code",
            title: "Desenvolvimento",
            description: "Stack moderna com foco em performance, seguranca e escalabilidade.",
            items: ["Frontend em React/Next.js", "Backend em Node.js com APIs REST", "Banco de dados otimizado", "CI/CD automatizado"],
          },
          {
            icon: "Rocket",
            title: "Deploy & Suporte",
            description: "Lancamento estruturado com monitoramento e suporte pos-deploy.",
            items: ["Deploy em cloud escalavel", "Monitoramento 24/7", "Treinamento da equipe", "3 meses de suporte incluso"],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Diferenciais",
        title: "Por Que Trabalhar Conosco",
        subtitle: "Somos um squad enxuto de especialistas obcecados por qualidade.",
        cards: [
          { icon: "Code", title: "Full-Stack", description: "Design, frontend, backend e devops em um so time. Sem dependencia de terceiros." },
          { icon: "Zap", title: "Entregas Rapidas", description: "Sprints de 2 semanas com entregas funcionais. Voce ve progresso real desde a semana 1." },
          { icon: "Shield", title: "Seguranca", description: "OWASP Top 10 em cada linha de codigo. Seus dados e os dos seus usuarios estao protegidos." },
          { icon: "RefreshCw", title: "Iterativo", description: "Construimos, testamos, aprendemos e melhoramos. Sem surpresas no final do projeto." },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Proposta de Investimento",
        subtitle: "Investimento justo por um produto que gera valor real para o seu negocio.",
        badge: "Projeto Completo",
        priceOriginal: "R$ 25.000",
        priceCurrent: "R$ 18.900",
        priceCurrency: "R$",
        pricePeriod: "",
        description: "Projeto completo de design e desenvolvimento com entregas semanais e suporte pos-lancamento.",
        includedItems: [
          "UX Research e design de interface completo",
          "Desenvolvimento frontend e backend",
          "Integracao com APIs e servicos",
          "Deploy e configuracao de infraestrutura",
          "3 meses de suporte e manutencao",
          "Codigo-fonte 100% seu",
        ],
        ctaLabel: "Iniciar Projeto",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee: "Pagamento em 3x. Primeira parcela so apos aprovacao do wireframe.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "O Produto dos Sonhos",
        subtitle: "Imagine ter um produto digital que seus usuarios amam e que escala com o seu negocio.",
        items: [
          { icon: "Smartphone", label: "Produto digital moderno que impressiona usuarios" },
          { icon: "TrendingUp", label: "Metricas de engajamento crescendo organicamente" },
          { icon: "Shield", label: "Plataforma segura e confiavel em producao" },
          { icon: "Star", label: "Referencia no mercado em experiencia do usuario" },
        ],
        quote: "Bons produtos nao sao feitos com tecnologia de ponta. Sao feitos com empatia e atencao obsessiva aos detalhes.",
        quoteHighlight: "empatia e atencao obsessiva aos detalhes",
        footerClientName: "Nome da Empresa",
        footerNote: "Proposta valida por 15 dias.",
      },
    },
  ],
};
