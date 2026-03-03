import { ProposalConfig } from "@/types/proposal";

/* ── FREE: Turquesa Zen ── */
export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "turquesa-zen",
  meta: {
    title: "Turquesa Zen",
    description:
      "Template sereno com tons de turquesa, ideal para terapeutas, coaches de bem-estar e profissionais de saude mental.",
  },
  theme: {
    colors: {
      gold: "#2DD4BF",
      goldLight: "#5EEAD4",
      goldDark: "#14B8A6",
      background: "#F0FDFA",
      foreground: "#134E4A",
      beige: "#CCFBF1",
      nude: "#99F6E4",
      cream: "#E8F5F2",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Nunito",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta de Servicos",
        titleLine1: "Terapia &",
        titleHighlight: "Bem-Estar Integral",
        subtitle:
          "Acompanhamento terapeutico personalizado para ajudar voce a encontrar equilibrio, clareza e qualidade de vida.",
        clientName: "Nome do Cliente",
        ctaPrimary: { label: "Conhecer Abordagem", scrollTo: "diagnostico" },
        ctaSecondary: { label: "Agendar Sessao", url: "https://wa.me/5500000000000" },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Escuta",
        title: "Entendendo Seu Momento",
        subtitle: "Cada pessoa tem uma historia unica. Identificamos os pontos que merecem atencao.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          { icon: "Brain", title: "Ansiedade e Sobrecarga", description: "Sensacao constante de estar no limite, dificuldade de relaxar e pensamentos acelerados que atrapalham o dia a dia.", severity: "alto" },
          { icon: "Moon", title: "Qualidade do Sono", description: "Insonia, sono fragmentado ou acordar cansado afetam diretamente sua energia e capacidade de tomar decisoes.", severity: "medio" },
          { icon: "Heart", title: "Relacionamentos", description: "Dificuldades de comunicacao e conflitos recorrentes nas relacoes pessoais e profissionais.", severity: "medio" },
          { icon: "Sun", title: "Potencial de Transformacao", description: "Voce ja deu o primeiro passo ao buscar ajuda. Essa consciencia e o alicerce de toda mudanca verdadeira.", severity: "positivo" },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Caminho",
        title: "Abordagem Terapeutica",
        subtitle: "Um plano personalizado que respeita seu ritmo e suas necessidades.",
        cards: [
          {
            icon: "Compass",
            title: "Autoconhecimento",
            description: "Explorar padroes de pensamento e comportamento para entender o que te move e o que te trava.",
            items: ["Sessoes semanais de 50 minutos", "Tecnicas de terapia cognitivo-comportamental", "Exercicios de mindfulness e presenca", "Diario terapeutico guiado"],
          },
          {
            icon: "Heart",
            title: "Regulacao Emocional",
            description: "Desenvolver ferramentas praticas para lidar com emocoes intensas de forma saudavel.",
            items: ["Tecnicas de respiracao e grounding", "Mapeamento de gatilhos emocionais", "Praticas de auto-compaixao", "Estrategias para momentos de crise"],
          },
          {
            icon: "Users",
            title: "Conexao & Relacoes",
            description: "Melhorar a qualidade das suas relacoes construindo comunicacao assertiva e empatia.",
            items: ["Comunicacao nao-violenta", "Definicao de limites saudaveis", "Fortalecimento de vinculos afetivos", "Autonomia emocional nas relacoes"],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Diferenciais",
        title: "Meu Compromisso",
        subtitle: "Um espaco seguro, acolhedor e sem julgamentos para voce ser quem realmente e.",
        cards: [
          { icon: "Shield", title: "Sigilo Absoluto", description: "Tudo que compartilhamos e protegido pelo sigilo terapeutico e etico profissional." },
          { icon: "Clock", title: "Flexibilidade", description: "Sessoes presenciais ou online, com horarios que se adaptam a sua rotina." },
          { icon: "Award", title: "Formacao Solida", description: "Psicologa com especializacao em TCC e mais de 8 anos de experiencia clinica." },
          { icon: "Sparkles", title: "Abordagem Integrativa", description: "Combino diferentes tecnicas para encontrar o que funciona melhor para voce." },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Investimento em Voce",
        subtitle: "Cuidar da saude mental e o investimento com maior retorno que existe.",
        badge: "Acompanhamento",
        priceOriginal: "",
        priceCurrent: "R$ 250",
        priceCurrency: "R$",
        pricePeriod: "/sessao",
        description: "Sessao individual de 50 minutos com acompanhamento continuo e suporte entre sessoes.",
        includedItems: [
          "Sessao individual de 50 minutos",
          "Acompanhamento personalizado",
          "Material de apoio entre sessoes",
          "Suporte via mensagem para urgencias",
          "Flexibilidade para reagendar com 24h de antecedencia",
        ],
        ctaLabel: "Agendar Primeira Sessao",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee: "A primeira sessao e exploratoria. Se nao sentir que e o caminho certo, nao ha compromisso.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Transformacao",
        title: "Seu Novo Capitulo",
        subtitle: "Imagine uma vida com mais leveza, clareza e conexao consigo mesmo.",
        items: [
          { icon: "Sun", label: "Acordar com energia e motivacao para o dia" },
          { icon: "Heart", label: "Relacoes mais saudaveis e significativas" },
          { icon: "Brain", label: "Clareza mental para tomar decisoes com confianca" },
          { icon: "Sparkles", label: "Paz interior que nao depende de circunstancias externas" },
        ],
        quote: "A terapia nao conserta pessoas quebradas. Ela ajuda pessoas inteiras a se reconhecerem como tal.",
        quoteHighlight: "se reconhecerem como tal",
        footerClientName: "Nome do Cliente",
        footerNote: "Proposta valida por 15 dias. Vagas limitadas.",
      },
    },
  ],
};
