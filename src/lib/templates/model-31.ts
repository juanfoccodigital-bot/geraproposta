import { ProposalConfig } from "@/types/proposal";

/* ── FREE: Slate Executivo ── */
export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "slate-executivo",
  meta: {
    title: "Slate Executivo",
    description:
      "Template dark sofisticado em slate, perfeito para consultorias empresariais, financeiras e juridicas.",
  },
  theme: {
    colors: {
      gold: "#94A3B8",
      goldLight: "#CBD5E1",
      goldDark: "#64748B",
      background: "#0F172A",
      foreground: "#E2E8F0",
      beige: "#1E293B",
      nude: "#334155",
      cream: "#171F32",
    },
    fonts: {
      heading: "Fraunces",
      body: "Source Sans 3",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Executiva",
        titleLine1: "Consultoria",
        titleHighlight: "Empresarial Estrategica",
        subtitle:
          "Transformamos desafios empresariais em oportunidades de crescimento. Consultoria sob medida para empresas que querem liderar.",
        clientName: "Nome da Empresa",
        ctaPrimary: { label: "Ver Diagnostico", scrollTo: "diagnostico" },
        ctaSecondary: { label: "Agendar Reuniao", url: "https://wa.me/5500000000000" },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Assessment",
        title: "Diagnostico Organizacional",
        subtitle: "Analise profunda dos processos, estrutura e oportunidades da sua organizacao.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          { icon: "Building", title: "Processos Ineficientes", description: "Fluxos de trabalho manuais e redundantes que consomem recursos e limitam a capacidade de escala da operacao.", severity: "alto" },
          { icon: "Users", title: "Gestao de Talentos", description: "Dificuldade em atrair, reter e desenvolver profissionais de alto calibre. Turnover acima da media do setor.", severity: "medio" },
          { icon: "BarChart3", title: "Decisoes sem Dados", description: "Ausencia de dashboards e KPIs claros. Decisoes estrategicas baseadas em intuicao ao inves de evidencias.", severity: "medio" },
          { icon: "TrendingUp", title: "Mercado Favoravel", description: "Setor em crescimento com espaco para expansao. Posicionamento atual permite capturar market share adicional.", severity: "positivo" },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Framework",
        title: "Plano Estrategico",
        subtitle: "Abordagem metodica em tres pilares para transformacao organizacional sustentavel.",
        cards: [
          {
            icon: "Target",
            title: "Estrategia & Governanca",
            description: "Alinhamento estrategico com visao clara de curto, medio e longo prazo.",
            items: ["Revisao do planejamento estrategico", "Definicao de OKRs por area", "Implementacao de governanca corporativa", "Dashboard executivo de performance"],
          },
          {
            icon: "Settings",
            title: "Processos & Operacoes",
            description: "Otimizacao de fluxos e eliminacao de ineficiencias para maxima produtividade.",
            items: ["Mapeamento de processos criticos (AS-IS)", "Redesenho de fluxos otimizados (TO-BE)", "Automacao de processos repetitivos", "Implementacao de gestao agil"],
          },
          {
            icon: "Users",
            title: "Pessoas & Cultura",
            description: "Desenvolvimento de liderancas e cultura de alta performance.",
            items: ["Assessment de liderancas", "Programa de desenvolvimento gerencial", "Pesquisa de clima e plano de acao", "PDI individualizado para lideres"],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Credenciais",
        title: "Por Que Nossa Consultoria",
        subtitle: "Experiencia comprovada em transformacao organizacional com resultados mensuráveis.",
        cards: [
          { icon: "Award", title: "20+ Anos de Mercado", description: "Duas decadas de experiencia com empresas de todos os portes e segmentos." },
          { icon: "BarChart3", title: "Resultados Comprovados", description: "Media de 35% de ganho em eficiencia operacional nos primeiros 6 meses." },
          { icon: "Shield", title: "Confidencialidade", description: "NDA assinado antes do inicio. Suas informacoes estrategicas estao 100% protegidas." },
          { icon: "Target", title: "Metodologia Propria", description: "Framework desenvolvido com base em mais de 200 projetos bem-sucedidos." },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Proposta de Honorarios",
        subtitle: "Investimento com retorno mensuravel desde o primeiro trimestre de atuacao.",
        badge: "Projeto Completo",
        priceOriginal: "",
        priceCurrent: "R$ 15.000",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description: "Consultoria estrategica com dedicacao de 40h mensais, incluindo todas as entregas e acompanhamento.",
        includedItems: [
          "Diagnostico organizacional completo",
          "Plano estrategico detalhado",
          "Sessoes semanais com diretoria",
          "Implementacao assistida de melhorias",
          "Dashboard de KPIs customizado",
          "Relatorio executivo mensal",
        ],
        ctaLabel: "Iniciar Consultoria",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee: "Contrato minimo de 3 meses. Primeiro mes com clausula de satisfacao garantida.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Horizonte",
        title: "A Empresa que Voce Quer Liderar",
        subtitle: "Imagine uma organizacao alinhada, eficiente e preparada para os desafios do futuro.",
        items: [
          { icon: "TrendingUp", label: "Crescimento consistente com processos escaláveis" },
          { icon: "Users", label: "Time engajado e alinhado com a visao da empresa" },
          { icon: "BarChart3", label: "Decisoes rapidas baseadas em dados concretos" },
          { icon: "Award", label: "Reputacao de empresa referencia no seu setor" },
        ],
        quote: "O papel da consultoria nao e dar respostas prontas, e fazer as perguntas certas que levam sua empresa ao proximo nivel.",
        quoteHighlight: "as perguntas certas",
        footerClientName: "Nome da Empresa",
        footerNote: "Proposta confidencial. Valida por 15 dias.",
      },
    },
  ],
};
