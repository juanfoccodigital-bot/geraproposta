import { ProposalConfig } from "@/types/proposal";

export const templateConfig: ProposalConfig = {
  version: 1,
  templateId: "marrom-cafe",
  meta: {
    title: "Marrom Cafe",
    description:
      "Template acolhedor com tons de cafe e marrom, perfeito para cafeterias, restaurantes e negocios de gastronomia.",
  },
  theme: {
    colors: {
      gold: "#8B6914",
      goldLight: "#A88B3D",
      goldDark: "#6B4F0A",
      background: "#FBF8F3",
      foreground: "#2C1810",
      beige: "#F0E8D8",
      nude: "#DDD0B8",
      cream: "#F7F2E8",
    },
    fonts: {
      heading: "Fraunces",
      body: "Nunito Sans",
    },
  },
  sections: [
    {
      type: "hero",
      visible: true,
      data: {
        badge: "Proposta Comercial",
        titleLine1: "Marketing para",
        titleHighlight: "Gastronomia & Food",
        subtitle:
          "Atraia mais clientes, fidelize seu publico e transforme seu restaurante ou cafe em destino obrigatorio da regiao com marketing digital especializado.",
        clientName: "Nome do Estabelecimento",
        ctaPrimary: {
          label: "Ver Estrategia",
          scrollTo: "diagnostico",
        },
        ctaSecondary: {
          label: "Falar no WhatsApp",
          url: "https://wa.me/5500000000000",
        },
      },
    },
    {
      type: "diagnostico",
      visible: true,
      data: {
        sectionLabel: "Diagnostico",
        title: "Presenca Digital do Seu Negocio",
        subtitle:
          "Analisamos como seu estabelecimento esta sendo visto no digital e onde estao as maiores oportunidades de atrair mais clientes.",
        showImages: false,
        imagesLabel: "",
        images: [],
        cards: [
          {
            icon: "Camera",
            title: "Fotos Amadoras nos Pratos",
            description:
              "As imagens dos pratos publicadas nao fazem justica a qualidade real da comida. Fotos sem iluminacao e composicao adequada reduzem o apelo visual e o desejo do publico.",
            severity: "alto",
          },
          {
            icon: "MapPin",
            title: "Google Meu Negocio Desatualizado",
            description:
              "O perfil no Google nao esta otimizado: horarios desatualizados, poucas fotos e respostas pendentes. Clientes buscando onde comer na regiao encontram concorrentes primeiro.",
            severity: "alto",
          },
          {
            icon: "Calendar",
            title: "Conteudo Esporadico nas Redes",
            description:
              "Semanas sem publicar seguidas de posts apressados. Sem consistencia, o algoritmo enterra o perfil e potenciais clientes esquecem que o estabelecimento existe.",
            severity: "medio",
          },
          {
            icon: "Star",
            title: "Avaliacoes Sem Gestao",
            description:
              "Avaliacoes no Google e iFood nao recebem resposta. Cada avaliacao e uma oportunidade de demonstrar cuidado com o cliente e influenciar novos visitantes.",
            severity: "medio",
          },
          {
            icon: "Heart",
            title: "Clientes Apaixonados",
            description:
              "O estabelecimento ja possui clientes fieis que adoram a experiencia e recomendam espontaneamente. Esse amor genuino e o melhor material de marketing que existe.",
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
        title: "Plano de Marketing Food",
        subtitle:
          "Estrategia completa para transformar seu estabelecimento no lugar mais desejado da regiao no digital.",
        cards: [
          {
            icon: "Camera",
            title: "Conteudo Visual Premium",
            description:
              "Producao de fotos e videos profissionais que fazem os pratos parecerem tao irresistiveis quanto sao na vida real.",
            items: [
              "Sessao fotografica mensal dos pratos e ambiente",
              "Reels semanais com preparacao de pratos e bastidores",
              "Stories diarios com cardapio do dia e novidades",
              "Conteudo de lifestyle com experiencia dos clientes",
              "Fotos otimizadas para Google Meu Negocio e iFood",
            ],
          },
          {
            icon: "MapPin",
            title: "Presenca Local & Google",
            description:
              "Otimizacao completa da presenca em buscadores e plataformas de avaliacao para ser encontrado por clientes famintos.",
            items: [
              "Otimizacao completa do Google Meu Negocio",
              "Gestao de avaliacoes com respostas estrategicas",
              "Estrategia de SEO local para buscas de restaurantes",
              "Parcerias com influenciadores gastronomicos locais",
            ],
          },
          {
            icon: "Target",
            title: "Trafego & Promocoes",
            description:
              "Campanhas segmentadas e acoes promocionais para atrair novos clientes e lotar o salao nos dias mais fracos.",
            items: [
              "Anuncios geolocalizados para publico da regiao",
              "Campanhas sazonais (datas comemorativas, feriados)",
              "Promocoes estrategicas para dias de menor movimento",
              "Programa de fidelidade digital com beneficios",
              "Parcerias com apps de delivery e plataformas food",
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
        title: "Especialistas em Food Marketing",
        subtitle:
          "Entendemos o mercado de gastronomia e sabemos que uma foto bem feita de um prato vende mais que qualquer copy.",
        cards: [
          {
            icon: "ChefHat",
            title: "Foco em Gastronomia",
            description:
              "Trabalhamos exclusivamente com food e gastronomia. Conhecemos as tendencias, os formatos e o que faz o publico salivar no feed.",
          },
          {
            icon: "Camera",
            title: "Food Photography",
            description:
              "Equipe com fotografo especializado em gastronomia. Fotos que fazem seus pratos parecerem ainda mais irresistiveis que ao vivo.",
          },
          {
            icon: "MapPin",
            title: "Marketing Hiperlocal",
            description:
              "Estrategias focadas em atrair clientes num raio de 5 a 10 km. Anuncios que alcancam quem esta com fome perto de voce.",
          },
          {
            icon: "TrendingUp",
            title: "Resultados em Mesas",
            description:
              "Nao medimos curtidas. Medimos reservas, pedidos e movimento no salao. Metricas que pagam suas contas no final do mes.",
          },
          {
            icon: "Calendar",
            title: "Planejamento Sazonal",
            description:
              "Cardapios especiais, datas comemorativas e temporadas planejados com antecedencia para maximizar receita em cada oportunidade.",
          },
          {
            icon: "Headphones",
            title: "Suporte Rapido",
            description:
              "Sabemos que no food service tudo e urgente. Comunicacao agil para ajustar campanhas e conteudo em tempo real.",
          },
        ],
      },
    },
    {
      type: "investimento",
      visible: true,
      data: {
        sectionLabel: "Investimento",
        title: "Plano Mensal",
        subtitle:
          "Um investimento que se paga com o movimento extra gerado pelo marketing digital estrategico.",
        badge: "Plano Food",
        priceOriginal: "R$ 2.800",
        priceCurrent: "R$ 1.997",
        priceCurrency: "R$",
        pricePeriod: "/mes",
        description:
          "Marketing completo para estabelecimentos gastronomicos com producao de conteudo visual, gestao de redes e trafego pago local.",
        includedItems: [
          "Sessao fotografica mensal de pratos e ambiente",
          "16 publicacoes mensais com design e copy",
          "4 Reels de bastidores e preparacao por mes",
          "Stories diarios com cardapio e novidades",
          "Gestao e otimizacao do Google Meu Negocio",
          "Gestao de trafego pago geolocal",
          "Gestao de avaliacoes e reputacao online",
          "Relatorio mensal de performance e movimento",
        ],
        ctaLabel: "Quero Lotar Meu Restaurante",
        ctaUrl: "https://wa.me/5500000000000",
        guarantee:
          "Se nos primeiros 30 dias voce nao perceber aumento no movimento vindo do digital, devolvemos o valor do primeiro mes integralmente.",
      },
    },
    {
      type: "visao",
      visible: true,
      data: {
        sectionLabel: "Visao",
        title: "O Restaurante Mais Desejado da Regiao",
        subtitle:
          "Imagine seu estabelecimento sendo o primeiro resultado no Google, com fila de espera nos finais de semana e reservas esgotando antes do horario de pico.",
        items: [
          {
            icon: "MapPin",
            label: "Primeiro resultado quando alguem busca onde comer na regiao",
          },
          {
            icon: "Star",
            label: "Avaliacoes 5 estrelas que atraem novos clientes diariamente",
          },
          {
            icon: "Users",
            label: "Comunidade de fas que compartilham e indicam seu negocio",
          },
          {
            icon: "TrendingUp",
            label: "Faturamento crescente com previsibilidade de movimento",
          },
        ],
        quote:
          "No mercado de gastronomia, a experiencia comeca no celular. Antes de provar seu prato, o cliente ja decidiu se vai visitar seu restaurante pela foto que viu no Instagram.",
        quoteHighlight: "a experiencia comeca no celular",
        footerClientName: "Nome do Estabelecimento",
        footerNote:
          "Proposta valida por 7 dias. Valores sujeitos a alteracao apos este prazo.",
      },
    },
  ],
};
