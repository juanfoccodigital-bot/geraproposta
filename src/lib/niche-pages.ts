import { ProposalCategory } from "@/types/proposal";

export interface NichePage {
  slug: string;
  title: string;
  headline: string;
  subheadline: string;
  description: string;
  benefits: string[];
  templateIds: string[];
  testimonial: { quote: string; author: string; role: string };
  stats: { label: string; value: string }[];
  category: ProposalCategory;
}

export const nichePages: NichePage[] = [
  {
    slug: "social-media",
    title: "Propostas para Social Media",
    headline: "Feche mais contratos de Social Media",
    subheadline: "Templates profissionais criados especificamente para gestores de redes sociais.",
    description: "Propostas prontas para apresentar seus servicos de gestao de redes sociais, criacao de conteudo e estrategia digital.",
    benefits: [
      "Templates com secoes de diagnostico de redes sociais",
      "Blocos de metricas e KPIs relevantes",
      "Secoes de pacotes de servicos e precos",
      "Apresentacao visual de cases e resultados",
      "Envio instantaneo via WhatsApp",
    ],
    templateIds: ["corporativo-azul", "cinza-minimalista", "azul-ceu-light", "marrom-cafe", "azul-royal-luxo", "pink-neon-dark", "amarelo-solar", "copper-warm", "crimson-bold"],
    testimonial: {
      quote: "Minhas propostas de social media ficaram muito mais profissionais. Fechei 3 contratos novos no primeiro mes usando o gerapropostas.",
      author: "Julia Santos",
      role: "Social Media Manager",
    },
    stats: [
      { label: "Templates para Social Media", value: "+50" },
      { label: "Social Medias ja usam", value: "+800" },
      { label: "Taxa de conversao media", value: "42%" },
    ],
    category: "social-media",
  },
  {
    slug: "gestor-de-trafego",
    title: "Propostas para Gestores de Trafego",
    headline: "Propostas que convertem para Gestores de Trafego",
    subheadline: "Mostre seus resultados e feche mais contratos de trafego pago com propostas profissionais.",
    description: "Templates especializados em trafego pago com secoes de ROI, metricas de campanhas e investimento projetado.",
    benefits: [
      "Secoes de ROI e metricas de performance",
      "Blocos de investimento e projecao de resultados",
      "Apresentacao de estrategia por plataforma (Meta, Google, TikTok)",
      "Graficos e indicadores visuais",
      "Cases de sucesso com resultados reais",
    ],
    templateIds: ["azul-marinho-classico", "laranja-energia", "sunset-gradient", "red-impact-dark", "amarelo-solar", "electric-blue", "crimson-bold", "amber-infoprodutor"],
    testimonial: {
      quote: "Como gestor de trafego, preciso mostrar dados e projecoes de forma clara. Os templates do gerapropostas sao perfeitos para isso.",
      author: "Pedro Mendes",
      role: "Gestor de Trafego Pago",
    },
    stats: [
      { label: "Templates para Trafego", value: "+40" },
      { label: "Gestores ja usam", value: "+500" },
      { label: "Valor medio por contrato", value: "R$2.500" },
    ],
    category: "trafego-pago",
  },
  {
    slug: "freelancer",
    title: "Propostas para Freelancers",
    headline: "Freelancer: feche contratos como um profissional",
    subheadline: "Pare de perder tempo com propostas amadoras. Impressione seus clientes desde o primeiro contato.",
    description: "Templates versateis para freelancers de todas as areas, com secoes de servicos, portfolio e investimento.",
    benefits: [
      "Templates adaptaveis para qualquer nicho",
      "Secoes de portfolio e cases de sucesso",
      "Tabelas de precos e pacotes de servicos",
      "Compartilhamento instantaneo por link ou WhatsApp",
      "Editor visual sem necessidade de design",
    ],
    templateIds: ["cinza-minimalista", "preto-branco-clean", "bege-neutro", "verde-limao-fresh", "rosa-moderno", "coral-vibrante", "salmon-criativo"],
    testimonial: {
      quote: "Sou freelancer e nao tenho tempo para montar propostas elaboradas. Com o gerapropostas, monto em 5 minutos e fico com cara de agencia.",
      author: "Lucas Ferreira",
      role: "Designer Freelancer",
    },
    stats: [
      { label: "Freelancers ativos", value: "+1.200" },
      { label: "Propostas enviadas", value: "+8.000" },
      { label: "Tempo medio de criacao", value: "4 min" },
    ],
    category: "design",
  },
  {
    slug: "clinica",
    title: "Propostas para Clinicas e Saude",
    headline: "Propostas profissionais para Clinicas e Saude",
    subheadline: "Templates elegantes para profissionais da saude, estetica e bem-estar.",
    description: "Propostas com visual premium para clinicas medicas, esteticas, academias e profissionais da saude.",
    benefits: [
      "Templates com tons premium (dourado, verde saude)",
      "Secoes de servicos e procedimentos",
      "Apresentacao de infraestrutura e equipe",
      "Blocos de depoimentos de pacientes",
      "Visual elegante e confiavel",
    ],
    templateIds: ["premium-dourado", "verde-saude", "verde-limao-fresh", "verde-escuro-elegante", "turquesa-zen", "rose-gold-elegance", "coral-vibrante", "forest-deep"],
    testimonial: {
      quote: "Uso para enviar propostas de parcerias com clinicas. O visual premium faz toda diferenca na hora da negociacao.",
      author: "Dra. Ana Paula",
      role: "Nutricionista Clinica",
    },
    stats: [
      { label: "Templates para Saude", value: "+30" },
      { label: "Clinicas usam", value: "+200" },
      { label: "Taxa de aprovacao", value: "58%" },
    ],
    category: "saude",
  },
  {
    slug: "agencia",
    title: "Propostas para Agencias Digitais",
    headline: "Escale sua agencia com propostas padronizadas",
    subheadline: "Templates profissionais para cada membro da equipe enviar propostas com a identidade da agencia.",
    description: "Solucao completa para agencias digitais que precisam padronizar e escalar o envio de propostas comerciais.",
    benefits: [
      "Templates com white-label (logo da agencia)",
      "Padronizacao visual para toda a equipe",
      "Slug personalizado com nome da agencia",
      "Dashboard com metricas de conversao",
      "Integracao com IA para geracao automatica",
    ],
    templateIds: ["corporativo-azul", "azul-marinho-classico", "preto-branco-clean", "cinza-azulado-corporate", "midnight-blue-dark", "luxe-noir", "neon-pulse", "gradient-aurora", "arctic-silver", "slate-executivo"],
    testimonial: {
      quote: "Antes cada vendedor mandava proposta de um jeito. Com o gerapropostas, padronizamos tudo e nossa taxa de conversao subiu 35%.",
      author: "Marcos Ribeiro",
      role: "CEO - Agencia Connect",
    },
    stats: [
      { label: "Agencias ativas", value: "+150" },
      { label: "Membros de equipe", value: "+400" },
      { label: "Aumento em conversao", value: "+35%" },
    ],
    category: "automacao",
  },
];

export function getNichePage(slug: string): NichePage | undefined {
  return nichePages.find((n) => n.slug === slug);
}

export function getAllNicheSlugs(): string[] {
  return nichePages.map((n) => n.slug);
}
