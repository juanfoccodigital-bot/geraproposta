import { ProposalConfig } from "@/types/proposal";

/* ── FREE: Amarelo Solar ── */
export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "amarelo-solar",
  meta: {
    title: "Amarelo Solar",
    description:
      "Template vibrante com amarelo solar, energia e otimismo. Ideal para consultorias de marketing e lancamentos.",
  },
  theme: {
    colors: {
      gold: "#FACC15",
      goldLight: "#FDE047",
      goldDark: "#EAB308",
      background: "#0F0F0A",
      foreground: "#FAFAF5",
      beige: "#1A1A10",
      nude: "#252518",
      cream: "#121208",
    },
    fonts: {
      heading: "Sora",
      body: "Inter",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Comercial",
        titleLine1: "Estrategia de",
        titleHighlight: "Marketing Digital",
        subtitle:
          "Transforme sua presenca digital com campanhas que geram resultado real. Estrategia, execucao e performance em um so lugar.",
        clientName: "Nome do Cliente",
        ctaPrimary: { label: "Ver Estrategia", scrollTo: "diagnostico" },
        ctaSecondary: { label: "Falar no WhatsApp", url: "https://wa.me/5500000000000" },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Analise",
        title: "Cenario Atual",
        subtitle: "Identificamos os principais desafios que impedem o crescimento da sua marca no digital.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          { icon: "AlertTriangle", title: "Baixa Visibilidade", description: "Sua marca nao aparece para o publico certo. Sem estrategia de conteudo, potenciais clientes nao te encontram.", severity: "alto" },
          { icon: "TrendingDown", title: "ROI Negativo em Ads", description: "Investimento em anuncios sem retorno claro. Falta de segmentacao e criativos fracos queimam orcamento.", severity: "alto" },
          { icon: "Users", title: "Audiencia Desengajada", description: "Seguidores que nao interagem. Sem estrategia de conteudo, as redes sociais viram um monologonao.", severity: "medio" },
          { icon: "Star", title: "Produto com Potencial", description: "Seu produto tem qualidade comprovada e clientes satisfeitos. Falta escalar essa mensagem.", severity: "positivo" },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Plano",
        title: "Estrategia Proposta",
        subtitle: "Tres pilares para transformar sua presenca digital e gerar resultados consistentes.",
        cards: [
          {
            icon: "Megaphone",
            title: "Branding & Conteudo",
            description: "Construcao de identidade digital forte e conteudo que conecta com seu publico.",
            items: ["Identidade visual para redes sociais", "Calendario editorial mensal", "Producao de conteudo em video e carrossel", "Copywriting persuasivo para cada formato"],
          },
          {
            icon: "Target",
            title: "Trafego Pago",
            description: "Campanhas otimizadas para atrair o publico certo no momento certo.",
            items: ["Funil de anuncios Meta Ads completo", "Google Ads para buscas de alta intencao", "Remarketing inteligente", "Testes A/B semanais de criativos"],
          },
          {
            icon: "BarChart3",
            title: "Analise & Otimizacao",
            description: "Dados transformados em decisoes para melhorar continuamente.",
            items: ["Dashboard com metricas em tempo real", "Relatorio semanal de performance", "Otimizacao continua de campanhas", "Ajuste de estrategia baseado em dados"],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Diferenciais",
        title: "Por Que Nos",
        subtitle: "Mais do que uma agencia, somos parceiros do seu crescimento.",
        cards: [
          { icon: "Zap", title: "Agilidade", description: "Entregas rapidas e comunicacao transparente. Sem burocracia." },
          { icon: "Award", title: "Experiencia", description: "Mais de 5 anos ajudando empresas a crescer no digital." },
          { icon: "Heart", title: "Dedicacao", description: "Tratamos cada projeto como se fosse nosso. Seu sucesso e o nosso." },
          { icon: "Shield", title: "Transparencia", description: "Acesso total a metricas, campanhas e resultados. Sem letra miuda." },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Plano de Investimento",
        subtitle: "Valor justo por resultado real.",
        badge: "Plano Completo",
        priceOriginal: "R$ 3.500",
        priceCurrent: "R$ 2.497",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description: "Gestao completa de marketing digital com producao de conteudo, trafego pago e relatorios detalhados.",
        includedItems: [
          "Gestao de redes sociais (Instagram + Facebook)",
          "20 posts mensais com design profissional",
          "Campanhas de trafego pago (Meta + Google)",
          "Relatorio semanal de resultados",
          "Reuniao quinzenal de alinhamento",
          "Suporte via WhatsApp",
        ],
        ctaLabel: "Comecar Agora",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee: "Garantia de 30 dias. Se nao estiver satisfeito, devolvemos seu investimento.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "O Futuro da Sua Marca",
        subtitle: "Imagine sua empresa reconhecida como referencia no mercado digital.",
        items: [
          { icon: "TrendingUp", label: "Crescimento organico consistente mes a mes" },
          { icon: "Users", label: "Comunidade engajada que confia na sua marca" },
          { icon: "DollarSign", label: "Retorno sobre investimento crescente e previsivel" },
          { icon: "Star", label: "Reconhecimento como autoridade no seu nicho" },
        ],
        quote: "O marketing digital nao e um gasto, e o investimento mais inteligente que uma empresa pode fazer hoje.",
        quoteHighlight: "o investimento mais inteligente",
        footerClientName: "Nome do Cliente",
        footerNote: "Proposta valida por 10 dias.",
      },
    },
  ],
};
