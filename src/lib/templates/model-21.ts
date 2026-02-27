import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "pink-neon-dark",
  meta: {
    title: "Pink Neon Dark",
    description:
      "Template dark mode com rosa neon vibrante estilo Behance, ideal para social media managers e agencias criativas.",
  },
  theme: {
    colors: {
      gold: "#FF2D87",
      goldLight: "#FF5CA1",
      goldDark: "#D91A6E",
      background: "#0A0A0A",
      foreground: "#F0F0F0",
      beige: "#1A1018",
      nude: "#2A1525",
      cream: "#110A0F",
    },
    fonts: {
      heading: "Sora",
      body: "DM Sans",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Criativa",
        titleLine1: "Social Media",
        titleHighlight: "que Gera Resultado",
        subtitle:
          "Conteudo criativo, design impactante e estrategia inteligente para transformar suas redes sociais em uma maquina de vendas e posicionamento de marca.",
        clientName: "Nome do Cliente",
        ctaPrimary: {
          label: "Ver Portfolio",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Chamar no WhatsApp",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "O Que Encontramos no Seu Perfil",
        subtitle:
          "Uma analise direta do estado atual das suas redes para entender exatamente onde investir energia para gerar resultado rapido.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Layout",
            title: "Feed Sem Identidade Visual",
            description:
              "O feed nao tem padrao visual, paleta de cores ou tipografia definidas. Cada post parece feito por uma pessoa diferente, sem consistencia que gere reconhecimento de marca.",
            severity: "alto",
          },
          {
            icon: "TrendingDown",
            title: "Engajamento em Queda Livre",
            description:
              "A taxa de interacao despencou nos ultimos meses. Posts com poucas curtidas e zero comentarios indicam que o conteudo nao esta ressoando com a audiencia atual.",
            severity: "alto",
          },
          {
            icon: "Clock",
            title: "Stories Ignorados",
            description:
              "Os Stories nao estao sendo utilizados estrategicamente. Sem stories frequentes e interativos, voce perde o canal de maior conexao com sua audiencia.",
            severity: "medio",
          },
          {
            icon: "Video",
            title: "Reels Abaixo do Potencial",
            description:
              "Os poucos Reels publicados nao seguem boas praticas de hook, edicao e formato. Com ajustes simples, o alcance pode multiplicar em 5x ou mais.",
            severity: "medio",
          },
          {
            icon: "Heart",
            title: "Marca Autenticada e Querida",
            description:
              "O publico que ja te conhece adora o que voce faz. Essa base de fas genuinos e o melhor ponto de partida para uma explosao de crescimento organico.",
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
        title: "O Plano de Ataque",
        subtitle:
          "Uma estrategia agressiva e criativa para transformar seu perfil em uma referencia visual e de conteudo no seu nicho.",
        cards: [
          {
            icon: "Palette",
            title: "Redesign & Identidade",
            description:
              "Reconstrucao total da identidade visual do perfil para criar um feed que impacta, encanta e gera desejo de seguir.",
            items: [
              "Nova identidade visual exclusiva para redes sociais",
              "Paleta de cores, tipografia e elementos graficos unicos",
              "Redesign completo da bio, destaques e links",
              "Templates de posts, carrosseis e covers de Reels",
              "Feed planejado visualmente com grid estrategico",
            ],
          },
          {
            icon: "Sparkles",
            title: "Conteudo Viral & Criativo",
            description:
              "Producao de conteudo que para o scroll, gera compartilhamentos e posiciona voce como criador de tendencias.",
            items: [
              "20 posts mensais com design impactante",
              "4 Reels criativos com edicao profissional",
              "Stories diarios com narrativa e interacao",
              "Trending topics e formatos virais adaptados ao seu nicho",
              "Copy com personalidade: voz unica e memoravel",
            ],
          },
          {
            icon: "Rocket",
            title: "Growth & Monetizacao",
            description:
              "Estrategias de crescimento acelerado e monetizacao para transformar seguidores em faturamento real.",
            items: [
              "Estrategia de hashtags e SEO social otimizada",
              "Parcerias e collabs com perfis complementares",
              "Funil de conversao: do follow ate a compra",
              "Trafego pago para escalar o que ja funciona organicamente",
              "Relatorio de performance com metricas de negocio",
            ],
          },
        ],
      },
    },
    {
      type: "diferenciais",
      visible: true,
      data: {
        sectionLabel: "Nosso Diferencial",
        title: "Criatividade com Estrategia",
        subtitle:
          "Post bonito que ninguem ve e desperdicio. Post feio que converte e improviso. Nos fazemos bonito E que converte.",
        cards: [
          {
            icon: "Sparkles",
            title: "Design que Para o Scroll",
            description:
              "Cada peca e projetada para competir pela atencao em um feed lotado. Visual impactante que faz a pessoa parar, olhar e interagir.",
          },
          {
            icon: "TrendingUp",
            title: "Tendencias em Tempo Real",
            description:
              "Monitoramos tendencias diariamente e adaptamos ao seu nicho na velocidade que o mercado exige. Conteudo relevante no timing perfeito.",
          },
          {
            icon: "Palette",
            title: "Identidade Visual Unica",
            description:
              "Nao usamos Canva templates. Cada design e criado do zero para que seu perfil seja instantaneamente reconhecivel e impossivel de copiar.",
          },
          {
            icon: "MessageCircle",
            title: "Copy que Conecta",
            description:
              "Textos com personalidade, humor e estrategia. Legendas que geram comentarios, salvamentos e compartilhamentos organicos.",
          },
          {
            icon: "BarChart3",
            title: "Resultados Reais",
            description:
              "Nao medimos sucesso por metricas de vaidade. Leads, vendas e crescimento real do negocio sao nossas unicas metricas de sucesso.",
          },
          {
            icon: "Zap",
            title: "Comunicacao Agil",
            description:
              "Respostas rapidas, aprovacoes sem burocracia e ajustes em tempo real. Somos rapidos como seu conteudo precisa ser.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Quanto Custa?",
        subtitle:
          "Menos do que voce imagina. Mais do que voce espera receber. O melhor custo-beneficio do mercado.",
        badge: "Mais Vendido",
        priceOriginal: "R$ 3.000",
        priceCurrent: "R$ 1.997",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Gestao completa de redes sociais com identidade visual unica, conteudo criativo e estrategia de crescimento. Sem fidelidade, sem surpresas.",
        includedItems: [
          "Identidade visual exclusiva para redes sociais",
          "20 posts mensais com design e copy unicos",
          "4 Reels com roteiro e edicao profissional",
          "Stories diarios estrategicos e criativos",
          "Redesign completo de bio e destaques",
          "Planejamento visual do feed (grid strategy)",
          "Relatorio mensal com metricas de negocio",
          "Suporte via WhatsApp em horario comercial",
        ],
        ctaLabel: "Bora Crescer",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se no primeiro mes voce nao amar o conteudo que entregarmos, devolvemos seu dinheiro. Simples assim, sem letras miudas.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "O Futuro",
        title: "Seu Perfil Bombando",
        subtitle:
          "Imagine abrir o Instagram e ver notificacoes explodindo, DMs de clientes e um feed que voce tem orgulho de mostrar pra qualquer um.",
        items: [
          {
            icon: "Sparkles",
            label: "Feed impactante que vira referencia no seu nicho",
          },
          {
            icon: "TrendingUp",
            label: "Crescimento explosivo de seguidores qualificados",
          },
          {
            icon: "MessageCircle",
            label: "DMs lotadas de potenciais clientes todos os dias",
          },
          {
            icon: "DollarSign",
            label: "Redes sociais que geram faturamento real pro negocio",
          },
        ],
        quote:
          "Num mundo onde todo mundo posta a mesma coisa, quem tem identidade visual forte e conteudo criativo com estrategia domina o jogo. Seja impossivel de ignorar.",
        quoteHighlight: "impossivel de ignorar",
        footerClientName: "Nome do Cliente",
        footerNote:
          "Proposta valida por 7 dias. Vagas limitadas a 5 clientes simultaneos para garantir qualidade maxima.",
      },
    },
  ],
};
