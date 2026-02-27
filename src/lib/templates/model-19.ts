import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "vinho-premium",
  meta: {
    title: "Vinho Premium",
    description:
      "Template luxuoso em tons de vinho e dourado, ideal para clinicas de estetica, dermatologia e procedimentos premium.",
  },
  theme: {
    colors: {
      gold: "#8B2252",
      goldLight: "#A83D6D",
      goldDark: "#6B1740",
      background: "#FDF8FA",
      foreground: "#1A0A12",
      beige: "#F5E8EE",
      nude: "#E8D0DA",
      cream: "#FAF0F4",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Poppins",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Premium",
        titleLine1: "Marketing de Luxo para",
        titleHighlight: "Clinicas de Estetica",
        subtitle:
          "Posicione sua clinica como destino de beleza e sofisticacao. Atraia pacientes de alto poder aquisitivo com uma estrategia digital que reflete a excelencia dos seus procedimentos.",
        clientName: "Nome da Clinica",
        ctaPrimary: {
          label: "Ver Estrategia",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Falar com Especialista",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Analise de Posicionamento Premium",
        subtitle:
          "Avaliacao de como sua clinica esta sendo percebida no digital e onde ha oportunidade de elevar o posicionamento para atrair o publico ideal.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Crown",
            title: "Posicionamento Abaixo do Real",
            description:
              "A qualidade dos procedimentos e equipamentos nao esta sendo comunicada no digital. O perfil nao transmite o nivel de sofisticacao e excelencia que a clinica oferece presencialmente.",
            severity: "alto",
          },
          {
            icon: "Camera",
            title: "Conteudo Visual Amador",
            description:
              "Fotos de antes e depois com iluminacao ruim, videos tremidos e design inconsistente. O conteudo visual nao faz justica aos resultados excepcionais que a clinica entrega.",
            severity: "alto",
          },
          {
            icon: "DollarSign",
            title: "Competindo por Preco",
            description:
              "Sem um posicionamento claro de valor, potenciais pacientes comparam a clinica por preco com concorrentes que oferecem servicos inferiores. Isso corroi a margem e o posicionamento.",
            severity: "medio",
          },
          {
            icon: "Users",
            title: "Audiencia Nao Segmentada",
            description:
              "O conteudo e os anuncios atingem publico generico. Sem segmentacao por perfil socioeconomico e interesse, o investimento em marketing atrai pacientes fora do perfil ideal.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Resultados Excepcionais",
            description:
              "A clinica entrega resultados que falam por si. Antes e depois impressionantes e pacientes satisfeitas sao a melhor prova social que existe para atrair novas clientes.",
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
        title: "Plano de Marketing Premium",
        subtitle:
          "Uma estrategia de comunicacao que reflete a sofisticacao dos seus procedimentos e atrai pacientes que valorizam excelencia.",
        cards: [
          {
            icon: "Sparkles",
            title: "Branding & Conteudo de Luxo",
            description:
              "Producao de conteudo visual premium que posiciona a clinica como referencia em estetica de alto padrao.",
            items: [
              "Sessao fotografica mensal com fotografo especializado em estetica",
              "Antes e depois profissionais com iluminacao controlada",
              "Reels cinematograficos de procedimentos e bastidores",
              "Conteudo educativo sobre procedimentos com linguagem premium",
              "Stories com bastidores da clinica e rotina da equipe medica",
            ],
          },
          {
            icon: "Target",
            title: "Trafego Segmentado Premium",
            description:
              "Campanhas que atingem exclusivamente o publico com perfil socioeconomico e interesse alinhados ao posicionamento da clinica.",
            items: [
              "Segmentacao por renda, interesses e comportamento premium",
              "Anuncios no Instagram com visual sofisticado e copy elegante",
              "Google Ads para buscas de procedimentos especificos",
              "Remarketing para visitantes engajados do perfil e site",
              "Lookalike de pacientes atuais para encontrar perfis similares",
            ],
          },
          {
            icon: "Heart",
            title: "Experiencia & Fidelizacao",
            description:
              "Estrategia de relacionamento para encantar pacientes e transforma-las em embaixadoras da clinica.",
            items: [
              "Programa VIP com beneficios exclusivos para pacientes fieis",
              "Comunicacao pos-procedimento com cuidados personalizados",
              "Eventos exclusivos para pacientes selecionadas",
              "Programa de indicacao premium com recompensas",
              "Pesquisa de satisfacao com acompanhamento individual",
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
        title: "Marketing a Altura da Sua Clinica",
        subtitle:
          "Nao fazemos marketing generico para saude. Criamos experiencias de marca premium que refletem a excelencia do seu trabalho.",
        cards: [
          {
            icon: "Crown",
            title: "Especialistas em Estetica Premium",
            description:
              "Trabalhamos exclusivamente com clinicas de alto padrao. Entendemos a linguagem, o publico e as regulamentacoes do segmento.",
          },
          {
            icon: "Camera",
            title: "Producao Visual Cinematografica",
            description:
              "Conteudo visual com qualidade de revista. Fotos e videos que transmitem sofisticacao e fazem justica aos seus resultados.",
          },
          {
            icon: "Shield",
            title: "Conformidade com CFM/ANVISA",
            description:
              "Todo conteudo revisado para conformidade com as normas de publicidade medica. Sua reputacao e seguranca juridica em primeiro lugar.",
          },
          {
            icon: "Palette",
            title: "Design de Alto Padrao",
            description:
              "Visual clean, elegante e sofisticado em cada peca. Design que comunica exclusividade e justifica o posicionamento premium.",
          },
          {
            icon: "BarChart3",
            title: "ROI Transparente",
            description:
              "Acompanhamos desde a impressao do anuncio ate o agendamento. Voce sabe exatamente quanto custa cada novo paciente.",
          },
          {
            icon: "Headphones",
            title: "Atendimento White Glove",
            description:
              "Canal direto com a equipe, respostas em ate 2 horas e reunioes semanais. O mesmo padrao de atendimento que sua clinica oferece.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Investimento Premium",
        subtitle:
          "Um investimento que se paga com 3 a 5 novos procedimentos por mes vindos do marketing digital.",
        badge: "Plano VIP",
        priceOriginal: "R$ 5.500",
        priceCurrent: "R$ 3.997",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Gestao completa de marketing digital premium para clinicas de estetica. Inclui producao visual profissional e trafego pago segmentado.",
        includedItems: [
          "Sessao fotografica profissional mensal na clinica",
          "20 publicacoes premium com design e copy sofisticados",
          "4 Reels cinematograficos por mes",
          "Stories diarios estrategicos e engajantes",
          "Gestao de trafego pago segmentado (Meta + Google)",
          "Landing page de agendamento otimizada",
          "Gestao de reputacao e avaliacoes online",
          "Relatorio executivo mensal com ROI detalhado",
        ],
        ctaLabel: "Elevar Minha Clinica",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se nos primeiros 45 dias nao houver aumento mensuravel no volume de leads qualificados, estendemos o servico gratuitamente ate atingir os resultados prometidos.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "A Clinica Mais Desejada da Regiao",
        subtitle:
          "Imagine sua clinica sendo a primeira opcao quando alguem busca procedimentos esteticos premium na sua cidade.",
        items: [
          {
            icon: "Crown",
            label: "Posicionamento premium que atrai pacientes de alto valor",
          },
          {
            icon: "Calendar",
            label: "Agenda lotada com procedimentos de alto ticket",
          },
          {
            icon: "Star",
            label: "Reputacao impecavel que gera indicacoes espontaneas",
          },
          {
            icon: "TrendingUp",
            label: "Faturamento crescente com margem saudavel",
          },
        ],
        quote:
          "Clinicas que se posicionam como premium no digital nao precisam competir por preco. Elas atraem pacientes que reconhecem valor, confiam na expertise e estao dispostas a investir em si mesmas.",
        quoteHighlight: "reconhecem valor",
        footerClientName: "Nome da Clinica",
        footerNote:
          "Proposta valida por 7 dias. Todo conteudo segue rigorosamente as normas do CFM e ANVISA para publicidade medica.",
      },
    },
  ],
};
