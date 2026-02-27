import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "purple-dream",
  meta: {
    title: "Purple Dream",
    description:
      "Template delicado em tons lavanda e lilás, ideal para designers de interiores, arquitetos e studios criativos.",
  },
  theme: {
    colors: {
      gold: "#9333EA",
      goldLight: "#A855F7",
      goldDark: "#7E22CE",
      background: "#FDFAFF",
      foreground: "#1A0A24",
      beige: "#F3E8FF",
      nude: "#DDD6FE",
      cream: "#F8F0FF",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Raleway",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta de Projeto",
        titleLine1: "Design de Interiores",
        titleHighlight: "& Arquitetura Digital",
        subtitle:
          "Posicione seu studio como referencia em design de interiores, atraia clientes de alto padrao e mostre seu portfolio de forma impactante no digital.",
        clientName: "Nome do Studio",
        ctaPrimary: {
          label: "Ver Proposta",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Conversar sobre o Projeto",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Analise",
        title: "Presenca Digital do Studio",
        subtitle:
          "Avaliacao de como seu trabalho esta sendo apresentado no ambiente digital e quais oportunidades de atrair novos projetos existem.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Image",
            title: "Portfolio Sem Impacto Visual",
            description:
              "Os projetos publicados nao estao sendo apresentados com a qualidade fotografica e narrativa que merecem. Fotos sem producao e textos sem contexto reduzem a percepcao de valor do trabalho.",
            severity: "alto",
          },
          {
            icon: "Globe",
            title: "Site Desatualizado ou Inexistente",
            description:
              "Sem um site profissional com portfolio curado, clientes em potencial que buscam designers na regiao nao conseguem avaliar seu trabalho e estilo.",
            severity: "alto",
          },
          {
            icon: "Layout",
            title: "Pinterest e Houzz Ignorados",
            description:
              "As plataformas mais relevantes para inspiracao de interiores nao estao sendo utilizadas estrategicamente. Pinterest sozinho gera milhoes de buscas por design de interiores diariamente.",
            severity: "medio",
          },
          {
            icon: "Video",
            title: "Sem Conteudo de Bastidores",
            description:
              "O processo criativo, as visitas a obras e os antes e depois nao estao sendo documentados. Esse conteudo humaniza e gera conexao emocional com potenciais clientes.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Projetos Premiados",
            description:
              "O portfolio possui projetos excepcionais que falam por si. Quando apresentados com a producao visual adequada, sao a melhor ferramenta de venda que existe.",
            severity: "positivo",
          },
        ],
      },
    },
    {
      type: "estrategia",
      visible: true,
      data: {
        sectionLabel: "Projeto",
        title: "Plano de Presenca Digital",
        subtitle:
          "Uma estrategia completa para transformar seu portfolio em uma maquina de atracao de clientes de alto padrao.",
        cards: [
          {
            icon: "Camera",
            title: "Portfolio & Producao Visual",
            description:
              "Documentacao profissional dos projetos e criacao de conteudo visual que faz justica a qualidade do seu trabalho.",
            items: [
              "Sessao fotografica profissional dos projetos finalizados",
              "Edicao e pos-producao com direcao de arte integrada",
              "Videos walkthroughs dos ambientes com narracau do conceito",
              "Series de antes e depois com narrativa do processo",
              "Conteudo de moodboards e processo criativo",
            ],
          },
          {
            icon: "Globe",
            title: "Presenca Multi-Plataforma",
            description:
              "Presenca estrategica nas plataformas mais relevantes para profissionais de design de interiores.",
            items: [
              "Site portfolio profissional com projetos curados",
              "Gestao estrategica do Instagram com conteudo especializado",
              "Pinterest otimizado com pins de cada projeto",
              "Perfil no Houzz com portfolio e avaliacoes",
              "Google Meu Negocio otimizado para buscas locais",
            ],
          },
          {
            icon: "Target",
            title: "Captacao de Projetos",
            description:
              "Estrategia para atrair clientes de alto padrao que valorizam design e estao dispostos a investir em ambientes excepcionais.",
            items: [
              "Anuncios segmentados para publico de alta renda",
              "Conteudo educativo sobre tendencias de design",
              "Parcerias com imobiliarias e construtoras de alto padrao",
              "Eventos virtuais e webinarios sobre design de interiores",
              "Programa de indicacao com clientes satisfeitos",
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
        title: "Marketing para Design",
        subtitle:
          "Entendemos a linguagem do design e sabemos como apresentar projetos de forma que geram desejo e convitem o publico certo.",
        cards: [
          {
            icon: "Palette",
            title: "Sensibilidade Estetica",
            description:
              "Nossa equipe tem formacao em design e entende de composicao, luz e cor. O conteudo que criamos esta a altura do seu portfolio.",
          },
          {
            icon: "Camera",
            title: "Fotografia de Interiores",
            description:
              "Parceria com fotografo especializado em arquitetura e interiores. Imagens que capturam a essencia e a atmosfera de cada ambiente.",
          },
          {
            icon: "Layout",
            title: "Multi-Plataforma",
            description:
              "Presenca integrada em Instagram, Pinterest, Houzz e Google. Onde seu cliente ideal busca inspiracao, voce esta la.",
          },
          {
            icon: "Target",
            title: "Publico High-End",
            description:
              "Estrategia de segmentacao focada em atrair clientes de alto poder aquisitivo que valorizam design e nao decidem por preco.",
          },
          {
            icon: "BookOpen",
            title: "Storytelling de Projeto",
            description:
              "Cada projeto vira uma historia. Do briefing ao resultado final, narrativas que demonstram seu processo e geram conexao emocional.",
          },
          {
            icon: "Award",
            title: "Posicionamento Premium",
            description:
              "Comunicacao visual e verbal que reforcem seu posicionamento como profissional de alto padrao. Cada detalhe comunica excelencia.",
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
          "Um investimento que se paga com um unico novo projeto captado pelo posicionamento digital do studio.",
        badge: "Plano Design",
        priceOriginal: "R$ 3.500",
        priceCurrent: "R$ 2.497",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Marketing digital completo para studios de design de interiores com producao visual, gestao de redes e presenca multi-plataforma.",
        includedItems: [
          "12 publicacoes premium no Instagram com design autoral",
          "Gestao estrategica do Pinterest (30+ pins/mes)",
          "2 Reels cinematograficos de projetos por mes",
          "Stories semanais com bastidores e processo criativo",
          "Manutencao e atualizacao do site portfolio",
          "Gestao de Google Meu Negocio e Houzz",
          "Relatorio mensal de performance e leads",
          "Reuniao mensal de alinhamento estrategico",
        ],
        ctaLabel: "Elevar Meu Studio",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se no primeiro mes o conteudo visual nao atingir o padrao de qualidade que seu portfolio merece, ajustamos sem custo ate sua total aprovacao.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "O Studio Mais Desejado",
        subtitle:
          "Imagine seu studio sendo procurado por clientes que ja conhecem e admiram seu trabalho antes mesmo do primeiro contato.",
        items: [
          {
            icon: "Image",
            label: "Portfolio impactante que vende por si so",
          },
          {
            icon: "Star",
            label: "Reconhecido como referencia em design na regiao",
          },
          {
            icon: "Users",
            label: "Clientes de alto padrao que encontram voce organicamente",
          },
          {
            icon: "TrendingUp",
            label: "Pipeline de projetos saudavel e previsivel",
          },
        ],
        quote:
          "Design de interiores e uma arte que merece ser vista. Quando seu portfolio esta no lugar certo, com a apresentacao certa, os clientes certos aparecem naturalmente.",
        quoteHighlight: "os clientes certos aparecem naturalmente",
        footerClientName: "Nome do Studio",
        footerNote:
          "Proposta valida por 10 dias. Disponibilidade de sessao fotografica sujeita a agenda.",
      },
    },
  ],
};
