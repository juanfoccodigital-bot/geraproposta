/* ============================================
   TOUR STEPS
   Definicoes dos passos do guided tour
   para cada tipo de editor.
   ============================================ */

export interface TourStep {
  id: string;
  target: string;
  title: string;
  description: string;
  placement: "top" | "bottom" | "left" | "right";
}

export const PROPOSAL_TOUR_STEPS: TourStep[] = [
  {
    id: "proposal-content",
    target: '[data-tour="sidebar-tab-content"]',
    title: "Edite o conteudo",
    description:
      "Aqui voce edita o nome do cliente, titulo da proposta e todos os textos de cada bloco.",
    placement: "right",
  },
  {
    id: "proposal-theme",
    target: '[data-tour="sidebar-tab-theme"]',
    title: "Personalize as cores",
    description:
      "Ajuste cores, fontes e o visual da proposta para combinar com a sua marca ou a do cliente.",
    placement: "right",
  },
  {
    id: "proposal-blocks",
    target: '[data-tour="sidebar-tab-sections"]',
    title: "Adicione e organize blocos",
    description:
      "Adicione, remova e reordene blocos para montar a proposta perfeita para cada projeto.",
    placement: "right",
  },
  {
    id: "proposal-share",
    target: '[data-tour="share-button"]',
    title: "Compartilhe sua proposta",
    description:
      "Quando estiver pronto, compartilhe o link com seu cliente via WhatsApp ou copie o link.",
    placement: "bottom",
  },
];

export const BIOLINK_TOUR_STEPS: TourStep[] = [
  {
    id: "biolink-profile",
    target: '[data-tour="sidebar-tab-profile"]',
    title: "Adicione sua foto e bio",
    description:
      "Configure seu avatar, nome e uma bio curta para personalizar seu link na bio.",
    placement: "right",
  },
  {
    id: "biolink-blocks",
    target: '[data-tour="sidebar-tab-blocks"]',
    title: "Edite seus links",
    description:
      "Adicione e organize os links, videos e conteudos que aparecerao na sua pagina.",
    placement: "right",
  },
  {
    id: "biolink-theme",
    target: '[data-tour="sidebar-tab-theme"]',
    title: "Personalize o visual",
    description:
      "Escolha cores, fontes e efeitos visuais para deixar seu link com a sua cara.",
    placement: "right",
  },
  {
    id: "biolink-share",
    target: '[data-tour="share-link"]',
    title: "Publique seu link",
    description:
      "Copie o link da sua pagina e compartilhe nas redes sociais. E so isso!",
    placement: "bottom",
  },
];

export const SITE_TOUR_STEPS: TourStep[] = [
  {
    id: "site-content",
    target: '[data-tour="sidebar-tab-content"]',
    title: "Edite o conteudo",
    description:
      "Altere textos, imagens e informacoes de cada secao do seu site.",
    placement: "right",
  },
  {
    id: "site-design",
    target: '[data-tour="sidebar-tab-design"]',
    title: "Personalize cores e fontes",
    description:
      "Ajuste o visual do site com as cores e fontes da sua marca.",
    placement: "right",
  },
  {
    id: "site-sections",
    target: '[data-tour="sidebar-tab-sections"]',
    title: "Adicione secoes",
    description:
      "Insira novas secoes como galeria, depoimentos, equipe, mapa e muito mais.",
    placement: "right",
  },
  {
    id: "site-share",
    target: '[data-tour="share-link"]',
    title: "Publique seu site",
    description:
      "Quando estiver pronto, publique e compartilhe o link do seu site profissional.",
    placement: "bottom",
  },
];
