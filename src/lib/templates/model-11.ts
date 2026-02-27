import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "bege-neutro",
  meta: {
    title: "Bege Neutro",
    description:
      "Template sofisticado em tons neutros e bege, perfeito para infoprodutores, coaches e consultores.",
  },
  theme: {
    colors: {
      gold: "#A08B6E",
      goldLight: "#BDA98D",
      goldDark: "#8A7559",
      background: "#FAF8F5",
      foreground: "#2C2418",
      beige: "#F0EBE3",
      nude: "#E0D6C8",
      cream: "#F5F1EB",
    },
    fonts: {
      heading: "Crimson Text",
      body: "Lato",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Exclusiva",
        titleLine1: "Mentoria &",
        titleHighlight: "Consultoria Digital",
        subtitle:
          "Estruture seu posicionamento como especialista, crie produtos digitais de alto valor e construa um negocio de conhecimento escalavel e lucrativo.",
        clientName: "Nome do Consultor",
        ctaPrimary: {
          label: "Ver Proposta",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Agendar Conversa",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Cenario Atual do Seu Negocio",
        subtitle:
          "Avaliacao da sua presenca digital e estrutura de negocio para identificar alavancas de crescimento imediato.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Mic",
            title: "Autoridade Nao Posicionada",
            description:
              "Apesar do conhecimento profundo, seu posicionamento digital nao reflete sua expertise real. Conteudos genericos nao comunicam seu diferencial unico e nao atraem o publico certo.",
            severity: "alto",
          },
          {
            icon: "Package",
            title: "Produto Digital Desestruturado",
            description:
              "A oferta atual nao possui escada de valor clara. Sem produtos em diferentes faixas de preco e complexidade, voce perde oportunidades de monetizar em multiplos niveis.",
            severity: "alto",
          },
          {
            icon: "Mail",
            title: "Lista de Contatos Sem Nutriacao",
            description:
              "A base de e-mails e seguidores nao recebe comunicacao estrategica regular. Sem relacionamento continuo, leads esfriam e o potencial de vendas organicas e desperdicado.",
            severity: "medio",
          },
          {
            icon: "Calendar",
            title: "Modelo de Receita Limitado",
            description:
              "A receita depende exclusivamente de atendimentos individuais. Sem produtos escaláveis, o faturamento tem teto definido pelas horas disponiveis na agenda.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Cases e Resultados Comprovados",
            description:
              "Voce ja transformou a vida de clientes com resultados expressivos. Esses cases sao ativos poderosos para construir autoridade e gerar confianca em novos prospects.",
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
        title: "Plano de Posicionamento",
        subtitle:
          "Uma estrutura completa para transformar seu conhecimento em um negocio digital escalavel e lucrativo.",
        cards: [
          {
            icon: "Crown",
            title: "Posicionamento de Autoridade",
            description:
              "Construcao de uma presenca digital que posiciona voce como a referencia numero 1 no seu nicho de atuacao.",
            items: [
              "Definicao de nicho, publico e proposta unica de valor",
              "Estrategia de conteudo com pilares de autoridade",
              "Producao de conteudo educativo e transformador",
              "Estrategia de prova social com cases e depoimentos",
              "Otimizacao de perfis e bio em todas as plataformas",
            ],
          },
          {
            icon: "Package",
            title: "Escada de Produtos",
            description:
              "Criacao de uma linha de produtos digitais em diferentes niveis de investimento e profundidade.",
            items: [
              "E-book ou material gratuito para captacao de leads",
              "Produto de entrada (curso gravado ou workshop)",
              "Mentoria em grupo com acompanhamento",
              "Consultoria premium individual",
            ],
          },
          {
            icon: "Rocket",
            title: "Lancamento & Vendas",
            description:
              "Estrategia de lancamento e funil de vendas perpetuo para gerar receita consistente e escalavel.",
            items: [
              "Funil de captacao com isca digital e nutriacao",
              "Estrategia de lancamento para produto principal",
              "Automacao de vendas com e-mail marketing",
              "Webinarios de conversao ao vivo ou automatizados",
              "Trafego pago segmentado para escalar vendas",
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
        title: "Por Que Trabalhar Conosco",
        subtitle:
          "Experiencia em construir negocios de conhecimento lucrativos e escalaveis no mercado digital.",
        cards: [
          {
            icon: "Brain",
            title: "Estrategia Primeiro",
            description:
              "Antes de qualquer execucao, desenhamos a estrategia completa do seu negocio digital. Sem clareza de direcao, qualquer acao e desperdicio.",
          },
          {
            icon: "TrendingUp",
            title: "Foco em Receita",
            description:
              "Nosso objetivo e gerar faturamento real para voce. Medimos sucesso em vendas e lucro, nao em metricas de vaidade.",
          },
          {
            icon: "Users",
            title: "Rede de Especialistas",
            description:
              "Equipe multidisciplinar com estrategistas, designers, copywriters e gestores de trafego trabalhando de forma integrada.",
          },
          {
            icon: "Shield",
            title: "Metodologia Testada",
            description:
              "Processo validado com dezenas de especialistas que ja saíram do zero ao 6 digitos com produtos digitais.",
          },
          {
            icon: "Clock",
            title: "Respeito ao Seu Tempo",
            description:
              "Sabemos que seu tempo e precioso. Processos eficientes, comunicacao objetiva e entregas pontuais sem enrolacao.",
          },
          {
            icon: "Headphones",
            title: "Acompanhamento Proximo",
            description:
              "Mentoria e suporte continuo durante todo o processo. Voce nao esta sozinho na jornada de construir seu negocio digital.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Investimento no Projeto",
        subtitle:
          "Um investimento que se multiplica ao criar ativos digitais que geram receita recorrente por anos.",
        badge: "Pacote Completo",
        priceOriginal: "R$ 5.500",
        priceCurrent: "R$ 3.997",
        priceCurrency: "R$",
        pricePeriod: " unico",
        description:
          "Projeto completo de posicionamento, criacao de produto digital e estrutura de vendas. Pagamento em ate 4x sem juros.",
        includedItems: [
          "Estrategia completa de posicionamento e nicho",
          "Criacao de isca digital e produto de entrada",
          "Funil de vendas automatizado com e-mail marketing",
          "Landing pages de captura e vendas otimizadas",
          "Templates de conteudo para redes sociais",
          "Treinamento de uso de todas as ferramentas",
          "60 dias de acompanhamento pos-entrega",
          "Suporte via WhatsApp durante o projeto",
        ],
        ctaLabel: "Quero Escalar Meu Negocio",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se ate a entrega final voce nao estiver satisfeito com o material produzido, ajustamos sem custo ate atingir o resultado esperado.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Seu Negocio de Conhecimento",
        subtitle:
          "Imagine ter um negocio digital que gera receita enquanto voce dorme, com alunos e clientes chegando de forma previsivel.",
        items: [
          {
            icon: "Crown",
            label: "Reconhecido como autoridade numero 1 no seu nicho",
          },
          {
            icon: "DollarSign",
            label: "Receita recorrente e previsivel com produtos digitais",
          },
          {
            icon: "Users",
            label: "Comunidade engajada de alunos e seguidores fieis",
          },
          {
            icon: "Rocket",
            label: "Liberdade para focar no que voce ama: ensinar e transformar",
          },
        ],
        quote:
          "O conhecimento que voce carrega tem o poder de transformar vidas. Quando voce estrutura esse conhecimento em um negocio digital, multiplica seu impacto sem limites.",
        quoteHighlight: "multiplica seu impacto sem limites",
        footerClientName: "Nome do Consultor",
        footerNote:
          "Proposta valida por 10 dias. Condicoes especiais para inicio imediato.",
      },
    },
  ],
};
