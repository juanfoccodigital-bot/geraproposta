import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "terracota-quente",
  meta: {
    title: "Terracota Quente",
    description:
      "Template acolhedor com tons terracota e terra, ideal para designers, arquitetos e profissionais criativos.",
  },
  theme: {
    colors: {
      gold: "#C2703E",
      goldLight: "#D4916A",
      goldDark: "#A45A2B",
      background: "#FDF9F5",
      foreground: "#2D1B0E",
      beige: "#F5EDE5",
      nude: "#E8D5C4",
      cream: "#FAF4EE",
    },
    fonts: {
      heading: "Libre Baskerville",
      body: "Karla",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Criativa",
        titleLine1: "Design Grafico",
        titleHighlight: "& Direcao de Arte",
        subtitle:
          "Criacao visual estrategica que traduz a essencia da sua marca em pecas que comunicam, emocionam e vendem.",
        clientName: "Nome do Cliente",
        ctaPrimary: {
          label: "Ver Portfolio",
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
        title: "Percepcao Atual da Marca",
        subtitle:
          "Uma avaliacao honesta de como sua marca esta sendo percebida visualmente e onde ha espaco para elevar o posicionamento.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Palette",
            title: "Identidade Visual Fragil",
            description:
              "A marca carece de uma linguagem visual coesa. Elementos graficos, cores e tipografia mudam de material para material, diluindo o reconhecimento e a memorabilidade.",
            severity: "alto",
          },
          {
            icon: "Package",
            title: "Embalagem e Materiais Amadores",
            description:
              "Os materiais impressos e digitais nao refletem a qualidade do servico oferecido. Uma apresentacao visual inferior cria uma barreira de percepcao de valor.",
            severity: "alto",
          },
          {
            icon: "Layout",
            title: "Presenca Digital Desatualizada",
            description:
              "O site e redes sociais utilizam layouts e estilos visuais que nao acompanham as tendencias atuais de design, transmitindo uma imagem de marca estagnada.",
            severity: "medio",
          },
          {
            icon: "FileText",
            title: "Apresentacoes Sem Impacto",
            description:
              "Propostas comerciais e apresentacoes institucionais sao feitas em templates genericos que nao diferenciam sua marca da concorrencia.",
            severity: "medio",
          },
          {
            icon: "Heart",
            title: "Historia e Valores Autenticos",
            description:
              "A marca possui uma historia rica e valores genuinos que, quando traduzidos em linguagem visual, criam conexao emocional poderosa com o publico.",
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
        title: "Escopo do Trabalho Criativo",
        subtitle:
          "Um processo de design que parte da essencia da sua marca para criar uma linguagem visual autentica e memoravel.",
        cards: [
          {
            icon: "PenTool",
            title: "Branding & Identidade",
            description:
              "Construcao ou redesign da identidade visual completa da marca com foco em autenticidade e reconhecimento.",
            items: [
              "Imersao na historia, valores e posicionamento da marca",
              "Moodboard e direcao criativa personalizada",
              "Logotipo com versoes e aplicacoes diversas",
              "Paleta de cores, tipografia e elementos graficos",
              "Manual de identidade visual completo",
            ],
          },
          {
            icon: "Image",
            title: "Materiais & Pecas Graficas",
            description:
              "Criacao de materiais impressos e digitais que mantém a consistencia visual e elevam a percepcao da marca.",
            items: [
              "Cartao de visita e papelaria institucional",
              "Apresentacao comercial e institucional premium",
              "Templates para redes sociais (12 modelos)",
              "Material para ponto de venda e sinalizacao",
            ],
          },
          {
            icon: "Layout",
            title: "Direcao de Arte Digital",
            description:
              "Criacao de uma linguagem visual para o ambiente digital que traduz a personalidade da marca em cada touchpoint.",
            items: [
              "Guia de estilo fotografico e direcao de arte",
              "Templates de Stories e Reels com identidade da marca",
              "Design de newsletter e e-mail marketing",
              "Elementos graficos customizados e icones",
              "Guia de tom visual para equipe de conteudo",
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
        title: "Design com Alma",
        subtitle:
          "Cada projeto e uma imersao na essencia da marca. Nao criamos designs bonitos — criamos designs verdadeiros.",
        cards: [
          {
            icon: "Heart",
            title: "Design Autoral",
            description:
              "Nao usamos templates. Cada projeto nasce de uma pesquisa profunda sobre a marca, o publico e o mercado para criar algo genuinamente unico.",
          },
          {
            icon: "Palette",
            title: "Estetica Contemporanea",
            description:
              "Designs que equilibram tendencias atuais com atemporalidade. Sua marca vai parecer moderna hoje e sofisticada daqui a 5 anos.",
          },
          {
            icon: "Layers",
            title: "Processo Transparente",
            description:
              "Voce acompanha cada etapa da criacao. Compartilhamos referencias, moodboards e rascunhos antes de finalizar qualquer peca.",
          },
          {
            icon: "FileText",
            title: "Entrega Organizada",
            description:
              "Todos os arquivos entregues em formatos editaveis, organizados por categoria com nomenclatura clara e pronta para uso.",
          },
          {
            icon: "Award",
            title: "Portfolio Premiado",
            description:
              "Projetos reconhecidos no mercado criativo com resultados comprovados em percepcao de valor e diferenciacao de marca.",
          },
          {
            icon: "RefreshCw",
            title: "Revisoes Inclusas",
            description:
              "Ate 3 rodadas de revisao em cada entrega. Ajustamos ate que o resultado reflita perfeitamente a visao da sua marca.",
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
          "Design e um investimento que valoriza sua marca e gera retorno em percepcao de valor, confianca e vendas.",
        badge: "Projeto Completo",
        priceOriginal: "R$ 6.500",
        priceCurrent: "R$ 4.497",
        priceCurrency: "R$",
        pricePeriod: " unico",
        description:
          "Projeto completo de branding, materiais graficos e direcao de arte digital. Pagamento em ate 3x sem juros.",
        includedItems: [
          "Identidade visual completa com manual de marca",
          "Papelaria institucional (cartao, timbrado, envelope)",
          "Apresentacao comercial premium",
          "12 templates para redes sociais",
          "Guia de estilo fotografico e direcao de arte",
          "Todos os arquivos fonte editaveis",
          "3 rodadas de revisao por entrega",
          "Suporte por 30 dias apos entrega final",
        ],
        ctaLabel: "Iniciar Projeto",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Na fase de conceito, se a direcao criativa nao atender suas expectativas, voce pode cancelar com reembolso de 70% do valor total.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "Uma Marca que Emociona",
        subtitle:
          "Imagine sua marca sendo reconhecida instantaneamente, transmitindo profissionalismo e gerando confianca antes mesmo da primeira conversa.",
        items: [
          {
            icon: "Palette",
            label: "Identidade visual coesa e memoravel em tudo",
          },
          {
            icon: "Star",
            label: "Percepcao premium que justifica seu posicionamento",
          },
          {
            icon: "Heart",
            label: "Conexao emocional instantanea com seu publico",
          },
          {
            icon: "Sparkles",
            label: "Materiais que voce tem orgulho de apresentar",
          },
        ],
        quote:
          "Uma marca bem desenhada nao precisa se explicar. Ela comunica sua essencia em um olhar e faz as pessoas sentirem que estao no lugar certo.",
        quoteHighlight: "comunica sua essencia em um olhar",
        footerClientName: "Nome do Cliente",
        footerNote:
          "Proposta valida por 15 dias. Prazo de entrega estimado: 20 a 30 dias uteis apos aprovacao do briefing.",
      },
    },
  ],
};
