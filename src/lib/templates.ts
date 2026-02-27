import { ProposalCategory } from "@/types/proposal";
import { ProposalConfig } from "@/types/proposal";
import { templateConfig as model1 } from "./templates/model-1";
import { templateConfig as model2 } from "./templates/model-2";
import { templateConfig as model3 } from "./templates/model-3";
import { templateConfig as model4 } from "./templates/model-4";
import { templateConfig as model5 } from "./templates/model-5";
import { templateConfig as model6 } from "./templates/model-6";
import { templateConfig as model7 } from "./templates/model-7";
import { templateConfig as model8 } from "./templates/model-8";
import { templateConfig as model9 } from "./templates/model-9";
import { templateConfig as model10 } from "./templates/model-10";
import { templateConfig as model11 } from "./templates/model-11";
import { templateConfig as model12 } from "./templates/model-12";
import { templateConfig as model13 } from "./templates/model-13";
import { templateConfig as model14 } from "./templates/model-14";
import { templateConfig as model15 } from "./templates/model-15";
import { templateConfig as model16 } from "./templates/model-16";
import { templateConfig as model17 } from "./templates/model-17";
import { templateConfig as model18 } from "./templates/model-18";
import { templateConfig as model19 } from "./templates/model-19";
import { templateConfig as model20 } from "./templates/model-20";
import { templateConfig as model21 } from "./templates/model-21";
import { templateConfig as model22 } from "./templates/model-22";
import { templateConfig as model23 } from "./templates/model-23";
import { templateConfig as model24 } from "./templates/model-24";
import { templateConfig as model25 } from "./templates/model-25";
import { templateConfig as model26 } from "./templates/model-26";
import { templateConfig as model27 } from "./templates/model-27";
import { templateConfig as model28 } from "./templates/model-28";
import { templateConfig as model29 } from "./templates/model-29";
import { templateConfig as model30 } from "./templates/model-30";
import { templateConfig as model31 } from "./templates/model-31";
import { templateConfig as model32 } from "./templates/model-32";
import { templateConfig as model33 } from "./templates/model-33";
import { templateConfig as model34 } from "./templates/model-34";
import { templateConfig as model35 } from "./templates/model-35";
import { templateConfig as model36 } from "./templates/model-36";
import { templateConfig as model37 } from "./templates/model-37";
import { templateConfig as model38 } from "./templates/model-38";
import { templateConfig as model39 } from "./templates/model-39";
import { templateConfig as model40 } from "./templates/model-40";
import { templateConfig as model41 } from "./templates/model-41";

/* ============================================
   REGISTRO DE TEMPLATES
   Cada template é um ProposalConfig padrão
   que serve de base para novas propostas
   ============================================ */

export interface Template {
  id: string;
  name: string;
  description: string;
  categories: ProposalCategory[];
  config: ProposalConfig;
}

export const templates: Template[] = [
  // ── FREE TEMPLATES ──────────────────────────
  {
    id: "premium-dourado",
    name: "Premium Dourado",
    description: "Design elegante com tons dourados, ideal para clínicas de estética e saúde.",
    categories: ["saude", "academia"],
    config: model1,
  },
  {
    id: "corporativo-azul",
    name: "Corporativo Azul",
    description: "Visual corporativo em tons azuis, perfeito para social media e tráfego pago.",
    categories: ["social-media", "trafego-pago"],
    config: model2,
  },
  {
    id: "cinza-minimalista",
    name: "Cinza Minimalista",
    description: "Clean e moderno em tons de cinza, ideal para gestão de redes sociais.",
    categories: ["social-media"],
    config: model7,
  },
  {
    id: "azul-marinho-classico",
    name: "Azul Marinho Clássico",
    description: "Clássico e confiável com azul marinho, perfeito para tráfego pago e performance.",
    categories: ["trafego-pago"],
    config: model8,
  },
  {
    id: "verde-limao-fresh",
    name: "Verde Limão Fresh",
    description: "Vibrante e energético com verde limão, ideal para personal trainers e fitness.",
    categories: ["academia", "saude"],
    config: model9,
  },
  {
    id: "terracota-quente",
    name: "Terracota Quente",
    description: "Acolhedor com tons terracota, perfeito para designers e criativos.",
    categories: ["design"],
    config: model10,
  },
  {
    id: "bege-neutro",
    name: "Bege Neutro",
    description: "Sofisticado em tons neutros, ideal para coaches, consultores e infoprodutores.",
    categories: ["infoprodutor"],
    config: model11,
  },
  {
    id: "azul-ceu-light",
    name: "Azul Céu Light",
    description: "Leve e moderno com azul celeste, perfeito para marketing de conteúdo.",
    categories: ["social-media"],
    config: model12,
  },
  {
    id: "preto-branco-clean",
    name: "Preto & Branco",
    description: "Minimalista em P&B puro, ideal para fotógrafos e propostas de alto impacto.",
    categories: ["design", "webdesign"],
    config: model13,
  },
  {
    id: "marrom-cafe",
    name: "Marrom Café",
    description: "Acolhedor com tons de café, perfeito para restaurantes e gastronomia.",
    categories: ["social-media"],
    config: model14,
  },
  {
    id: "verde-escuro-elegante",
    name: "Verde Escuro Elegante",
    description: "Sofisticado em verde escuro, ideal para psicólogos e saúde mental.",
    categories: ["saude"],
    config: model15,
  },
  {
    id: "cinza-azulado-corporate",
    name: "Cinza Azulado Corporate",
    description: "Corporativo em cinza azulado, ideal para consultoria de TI e transformação digital.",
    categories: ["automacao"],
    config: model16,
  },

  // ── PRO TEMPLATES ───────────────────────────
  {
    id: "verde-saude",
    name: "Verde Saúde",
    description: "Tons verdes vibrantes para academias, personal trainers e fitness.",
    categories: ["saude", "academia"],
    config: model3,
  },
  {
    id: "rosa-moderno",
    name: "Rosa Moderno",
    description: "Elegante com tons rosa, ideal para propostas de design e web design.",
    categories: ["design", "webdesign"],
    config: model4,
  },
  {
    id: "roxo-tech",
    name: "Roxo Tech",
    description: "Dark mode com roxo vibrante para automação e desenvolvimento.",
    categories: ["automacao", "vibe-coding"],
    config: model5,
  },
  {
    id: "laranja-energia",
    name: "Laranja Energia",
    description: "Vibrante em laranja para infoprodutores e lançamentos digitais.",
    categories: ["infoprodutor", "trafego-pago"],
    config: model6,
  },
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    description: "Dark mode com verde neon cyberpunk para devs, startups e vibe coding.",
    categories: ["vibe-coding", "automacao"],
    config: model17,
  },
  {
    id: "sunset-gradient",
    name: "Sunset Gradient",
    description: "Rosa vibrante estilo sunset para lançamentos digitais de alto impacto.",
    categories: ["infoprodutor", "trafego-pago"],
    config: model18,
  },
  {
    id: "vinho-premium",
    name: "Vinho Premium",
    description: "Luxuoso em tons de vinho, ideal para clínicas de estética e dermatologia premium.",
    categories: ["saude"],
    config: model19,
  },
  {
    id: "azul-royal-luxo",
    name: "Azul Royal Luxo",
    description: "Sofisticado com azul royal, perfeito para escritórios de advocacia e consultorias.",
    categories: ["social-media", "trafego-pago"],
    config: model20,
  },
  {
    id: "pink-neon-dark",
    name: "Pink Neon Dark",
    description: "Dark mode com rosa neon estilo Behance para social media managers e agências.",
    categories: ["social-media", "design"],
    config: model21,
  },
  {
    id: "emerald-gold",
    name: "Emerald & Gold",
    description: "Verde esmeralda elegante, ideal para e-commerce e web design premium.",
    categories: ["webdesign"],
    config: model22,
  },
  {
    id: "midnight-blue-dark",
    name: "Midnight Blue Dark",
    description: "Dark mode premium com azul profundo para SaaS e startups de tecnologia.",
    categories: ["vibe-coding", "automacao"],
    config: model23,
  },
  {
    id: "coral-vibrante",
    name: "Coral Vibrante",
    description: "Energético em coral, ideal para nutricionistas, pilates e wellness.",
    categories: ["saude", "academia"],
    config: model24,
  },
  {
    id: "purple-dream",
    name: "Purple Dream",
    description: "Delicado em lavanda, ideal para designers de interiores e studios criativos.",
    categories: ["design", "webdesign"],
    config: model25,
  },
  {
    id: "red-impact-dark",
    name: "Red Impact Dark",
    description: "Dark mode ousado com vermelho, para growth hackers e marketing de performance.",
    categories: ["trafego-pago", "infoprodutor"],
    config: model26,
  },

  // ── NEW FREE TEMPLATES ────────────────────────
  {
    id: "amarelo-solar",
    name: "Amarelo Solar",
    description: "Vibrante com amarelo solar, energia e otimismo para consultorias de marketing.",
    categories: ["social-media", "trafego-pago"],
    config: model27,
  },
  {
    id: "turquesa-zen",
    name: "Turquesa Zen",
    description: "Sereno em turquesa, ideal para terapeutas, coaches e profissionais de saude mental.",
    categories: ["saude"],
    config: model28,
  },
  {
    id: "indigo-profundo",
    name: "Indigo Profundo",
    description: "Dark premium com indigo vibrante para agencias digitais e empresas de tecnologia.",
    categories: ["vibe-coding", "webdesign"],
    config: model29,
  },
  {
    id: "salmon-criativo",
    name: "Salmon Criativo",
    description: "Quente com tons salmon para fotografos, videomakers e produtoras de conteudo visual.",
    categories: ["design"],
    config: model30,
  },
  {
    id: "slate-executivo",
    name: "Slate Executivo",
    description: "Dark sofisticado em slate para consultorias empresariais, financeiras e juridicas.",
    categories: ["automacao"],
    config: model31,
  },

  // ── NEW PRO TEMPLATES (V2 com blocos premium) ─
  {
    id: "luxe-noir",
    name: "Luxe Noir",
    description: "Ultra-premium dark com dourado. Marquee animado, contadores e timeline de projeto.",
    categories: ["design"],
    config: model32,
  },
  {
    id: "neon-pulse",
    name: "Neon Pulse",
    description: "Futurista dark com magenta neon. IA, automacao e pricing-table interativo.",
    categories: ["automacao", "vibe-coding"],
    config: model33,
  },
  {
    id: "gradient-aurora",
    name: "Gradient Aurora",
    description: "Vibrante verde-azul aurora com timeline e split-content para web design.",
    categories: ["webdesign", "vibe-coding"],
    config: model34,
  },
  {
    id: "rose-gold-elegance",
    name: "Rose Gold Elegance",
    description: "Sofisticado rose gold com timeline e contadores para clinicas de estetica.",
    categories: ["saude"],
    config: model35,
  },
  {
    id: "electric-blue",
    name: "Electric Blue",
    description: "Eletrico dark com azul vibrante e pricing-table para agencias de trafego pago.",
    categories: ["trafego-pago"],
    config: model36,
  },
  {
    id: "forest-deep",
    name: "Forest Deep",
    description: "Dark premium verde floresta com pricing-table para personal trainers e fitness.",
    categories: ["academia", "saude"],
    config: model37,
  },
  {
    id: "amber-infoprodutor",
    name: "Amber Infoprodutor",
    description: "Dark amber dourado com pricing-table e depoimentos para lancamentos digitais.",
    categories: ["infoprodutor", "trafego-pago"],
    config: model38,
  },
  {
    id: "copper-warm",
    name: "Copper Warm",
    description: "Acolhedor cobre quente com timeline e contadores para gestao de redes sociais.",
    categories: ["social-media"],
    config: model39,
  },
  {
    id: "arctic-silver",
    name: "Arctic Silver",
    description: "Minimalista prata com pricing-table e contadores para SaaS e startups B2B.",
    categories: ["automacao", "vibe-coding"],
    config: model40,
  },
  {
    id: "crimson-bold",
    name: "Crimson Bold",
    description: "Ousado dark vermelho com timeline e depoimentos para agencias full-service.",
    categories: ["social-media", "trafego-pago"],
    config: model41,
  },
];

/* ── IDs dos templates gratuitos (fonte única de verdade) ── */
export const FREE_TEMPLATE_IDS: string[] = [
  "premium-dourado",
  "corporativo-azul",
  "cinza-minimalista",
  "azul-marinho-classico",
  "verde-limao-fresh",
  "terracota-quente",
  "bege-neutro",
  "azul-ceu-light",
  "preto-branco-clean",
  "marrom-cafe",
  "verde-escuro-elegante",
  "cinza-azulado-corporate",
  "amarelo-solar",
  "turquesa-zen",
  "indigo-profundo",
  "salmon-criativo",
  "slate-executivo",
];

/** Verifica se template é gratuito */
export function isTemplateFree(id: string): boolean {
  return FREE_TEMPLATE_IDS.includes(id);
}

/** Busca template pelo ID */
export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
