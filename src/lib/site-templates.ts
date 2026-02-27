/* ============================================
   SITE TEMPLATES
   16 templates premium para GeraSites.
   Cada um com blocos variados e conteudo de nicho.
   ============================================ */

import type { SiteTemplate, SiteConfig, SiteCategory, SiteBlock } from "@/types/site";

function makeSiteConfig(opts: {
  id: string;
  title: string;
  colors: { gold: string; goldLight: string; goldDark: string; background: string; foreground: string; beige: string; nude: string; cream: string };
  fonts: { heading: string; body: string };
  navStyle?: "topbar" | "sidebar" | "none";
  heroHeight?: "full" | "large" | "medium";
  heroAlign?: "left" | "center" | "right";
  extraBlocks?: SiteBlock[];
  hero?: { title: string; subtitle: string; ctaPrimary?: string; ctaSecondary?: string };
  marqueeItems?: string[];
  about?: { title?: string; body: string };
  services?: { title?: string; subtitle?: string; items: Array<{ icon: string; title: string; description: string }> };
  contact?: { title?: string; subtitle?: string; whatsappMessage?: string };
}): SiteConfig {
  const heroTitle = opts.hero?.title ?? "Transformamos Ideias em Resultados";
  const heroSubtitle = opts.hero?.subtitle ?? "Soluções profissionais para impulsionar seu negócio.";
  const heroCtaPrimary = opts.hero?.ctaPrimary ?? "Começar Agora";
  const heroCtaSecondary = opts.hero?.ctaSecondary ?? "Saiba Mais";
  const marqueeItems = opts.marqueeItems ?? ["Qualidade", "Compromisso", "Inovação", "Excelência", "Resultados"];
  const aboutTitle = opts.about?.title ?? "Sobre Nós";
  const aboutBody = opts.about?.body ?? "Somos especialistas em entregar resultados excepcionais. Nossa equipe combina criatividade e estratégia para transformar seu negócio.";
  const servicesTitle = opts.services?.title ?? "Nossos Serviços";
  const servicesSubtitle = opts.services?.subtitle ?? "Soluções completas para você.";
  const servicesItems = opts.services?.items
    ? opts.services.items.map((item) => ({ icon: item.icon, title: item.title, description: item.description, image: "" }))
    : [
        { icon: "Palette", title: "Design", description: "Visuais impactantes para sua marca.", image: "" },
        { icon: "Code", title: "Desenvolvimento", description: "Sites e apps modernos.", image: "" },
        { icon: "TrendingUp", title: "Marketing", description: "Estratégias de crescimento.", image: "" },
      ];
  const contactTitle = opts.contact?.title ?? "Entre em Contato";
  const contactSubtitle = opts.contact?.subtitle ?? "Estamos prontos para ajudar.";
  const contactWhatsappMessage = opts.contact?.whatsappMessage ?? "Olá! Vim pelo site.";

  const blocks: SiteBlock[] = [
    {
      id: "blk-nav", type: "site-navbar", visible: true,
      data: {
        logo: "", logoText: opts.title,
        links: [{ label: "Início", href: "#hero" }, { label: "Sobre", href: "#sobre" }, { label: "Serviços", href: "#servicos" }, { label: "Contato", href: "#contato" }],
        style: "solid", ctaText: "Fale Conosco", ctaUrl: "#contato",
      },
      layout: { align: "center", fullWidth: true, background: { type: "none", value: "", overlay: 0 }, padding: "none" },
    },
    {
      id: "blk-hero", type: "site-hero", visible: true,
      data: {
        title: heroTitle, subtitle: heroSubtitle,
        backgroundImage: "", backgroundOverlay: 50,
        ctaPrimary: { text: heroCtaPrimary, url: "#contato" }, ctaSecondary: { text: heroCtaSecondary, url: "#sobre" },
        height: opts.heroHeight || "large", align: opts.heroAlign || "center",
      },
      layout: { align: opts.heroAlign || "center", fullWidth: true, background: { type: "color", value: opts.colors.gold, overlay: 0 }, padding: "xl" },
    },
    {
      id: "blk-marquee", type: "marquee", visible: true,
      data: {
        items: marqueeItems,
        speed: "normal", direction: "left", variant: "solid", separator: "star", size: "md", repeat: 4, pauseOnHover: true,
      },
      layout: { align: "center", fullWidth: true, background: { type: "color", value: opts.colors.gold, overlay: 0 }, padding: "none" },
    },
    {
      id: "blk-about", type: "site-about", visible: true,
      data: {
        title: aboutTitle, body: aboutBody,
        image: "", imagePosition: "right", ctaText: "Conhecer Mais", ctaUrl: "#servicos",
      },
      layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" },
    },
    {
      id: "blk-services", type: "site-services", visible: true,
      data: {
        title: servicesTitle, subtitle: servicesSubtitle,
        items: servicesItems,
        columns: 3, style: "card",
      },
      layout: { align: "center", fullWidth: false, background: { type: "color", value: opts.colors.beige, overlay: 0 }, padding: "lg" },
    },
    {
      id: "blk-contact", type: "site-contact", visible: true,
      data: {
        title: contactTitle, subtitle: contactSubtitle,
        mode: "whatsapp", whatsappNumber: "", whatsappMessage: contactWhatsappMessage, email: "",
      },
      layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" },
    },
    // Extra blocks injected per template
    ...(opts.extraBlocks || []),
    {
      id: "blk-footer", type: "site-footer", visible: true,
      data: {
        columns: [
          { title: "Empresa", links: [{ label: "Sobre", url: "#sobre" }, { label: "Serviços", url: "#servicos" }] },
          { title: "Contato", links: [{ label: "WhatsApp", url: "#" }, { label: "Email", url: "#" }] },
        ],
        copyright: `© ${new Date().getFullYear()} Empresa. Todos os direitos reservados.`,
        socialLinks: [{ platform: "instagram", url: "#" }, { platform: "linkedin", url: "#" }],
      },
      layout: { align: "center", fullWidth: true, background: { type: "color", value: opts.colors.foreground, overlay: 0 }, padding: "md" },
    },
  ];

  return {
    version: 2,
    templateId: opts.id,
    meta: { title: opts.title, description: `Site profissional ${opts.title}` },
    theme: { colors: opts.colors, fonts: opts.fonts },
    nav: { style: opts.navStyle || "topbar", sticky: true, logo: "", links: [{ label: "Início", href: "#hero" }, { label: "Sobre", href: "#sobre" }, { label: "Serviços", href: "#servicos" }, { label: "Contato", href: "#contato" }] },
    globalStyles: { maxWidth: "1200", sectionSpacing: "md" },
    blocks,
  };
}

export const SITE_TEMPLATES: SiteTemplate[] = [
  // ============================================
  // 1. BUSINESS CORPORATE
  // Extras: counter, depoimentos, team, logos, timeline
  // ============================================
  {
    id: "business-corporate", name: "Business Corporate", description: "Site corporativo profissional com tons azuis.", category: "negocios",
    config: makeSiteConfig({
      id: "business-corporate", title: "Business Corporate",
      colors: { gold: "#1E40AF", goldLight: "#3B82F6", goldDark: "#1E3A8A", background: "#FFFFFF", foreground: "#0F172A", beige: "#F1F5F9", nude: "#E2E8F0", cream: "#F8FAFC" },
      fonts: { heading: "Inter", body: "Inter" },
      hero: { title: "Soluções Corporativas de Excelência", subtitle: "Estratégia e inovação para impulsionar o crescimento da sua empresa.", ctaPrimary: "Agendar Reunião", ctaSecondary: "Conheça a Empresa" },
      marqueeItems: ["Estratégia", "Gestão", "Inovação", "Resultados", "Liderança"],
      about: { body: "Com mais de 15 anos no mercado, somos referência em consultoria empresarial. Nossa equipe atua em gestão, planejamento estratégico e transformação digital." },
      services: {
        items: [
          { icon: "Building2", title: "Consultoria Estratégica", description: "Análise e planejamento para decisões mais assertivas." },
          { icon: "BarChart3", title: "Gestão Empresarial", description: "Processos otimizados para máxima eficiência operacional." },
          { icon: "Laptop", title: "Transformação Digital", description: "Modernize sua operação com tecnologia de ponta." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de agendar uma reunião sobre consultoria empresarial." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "Números", title: "Nossos Resultados", subtitle: "", items: [{ value: 500, suffix: "+", label: "Clientes" }, { value: 98, suffix: "%", label: "Satisfação" }, { value: 15, suffix: "+", label: "Anos" }], columns: 3, duration: 2000, style: "card" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F1F5F9", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nossa Equipe", subtitle: "Profissionais dedicados ao seu sucesso.", members: [{ name: "Carlos Silva", role: "CEO & Fundador", image: "", social: [{ platform: "linkedin", url: "#" }] }, { name: "Ana Souza", role: "Diretora de Operações", image: "", social: [{ platform: "linkedin", url: "#" }] }, { name: "Pedro Santos", role: "Diretor Comercial", image: "", social: [{ platform: "linkedin", url: "#" }] }], columns: 3 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Empresas que Confiam em Nós", items: [{ image: "", alt: "Empresa A", url: "#" }, { image: "", alt: "Empresa B", url: "#" }, { image: "", alt: "Empresa C", url: "#" }, { image: "", alt: "Empresa D", url: "#" }, { image: "", alt: "Empresa E", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F8FAFC", overlay: 0 }, padding: "md" } },
        { id: "blk-timeline", type: "timeline", visible: true, data: { sectionLabel: "Nossa História", title: "Trajetória de Sucesso", subtitle: "", layout: "vertical", connectorStyle: "solid", items: [{ icon: "Building", period: "2008", title: "Fundação", description: "Início das operações com foco em consultoria empresarial." }, { icon: "Globe", period: "2013", title: "Expansão Nacional", description: "Abertura de escritórios em 5 capitais brasileiras." }, { icon: "Laptop", period: "2018", title: "Transformação Digital", description: "Migração para soluções 100% digitais." }, { icon: "Trophy", period: "2024", title: "Líder de Mercado", description: "Reconhecidos como referência no setor." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Depoimentos", title: "O que dizem nossos clientes", items: [{ name: "Carlos M.", role: "CEO", text: "Excelente trabalho e profissionalismo.", avatar: "" }, { name: "Ana S.", role: "Diretora", text: "Resultados acima do esperado.", avatar: "" }, { name: "Pedro L.", role: "Empresário", text: "Parceria sólida e confiável.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F1F5F9", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 2. CREATIVE PORTFOLIO
  // Extras: galeria, video, banner, depoimentos
  // ============================================
  {
    id: "creative-portfolio", name: "Creative Portfolio", description: "Portfólio criativo com design moderno.", category: "portfolio",
    config: makeSiteConfig({
      id: "creative-portfolio", title: "Creative Portfolio",
      colors: { gold: "#8B5CF6", goldLight: "#A78BFA", goldDark: "#7C3AED", background: "#FAFAFA", foreground: "#18181B", beige: "#F4F4F5", nude: "#E4E4E7", cream: "#FAFAFA" },
      fonts: { heading: "Space Grotesk", body: "Inter" },
      heroAlign: "left",
      hero: { title: "Design que Conta Histórias", subtitle: "Criatividade e estratégia visual para marcas que querem se destacar.", ctaPrimary: "Ver Portfolio", ctaSecondary: "Solicitar Orçamento" },
      marqueeItems: ["Branding", "UI/UX", "Motion", "Identidade Visual", "Ilustração"],
      about: { body: "Designer com mais de 8 anos de experiência criando identidades visuais, interfaces e peças que comunicam. Cada projeto é uma nova história para contar." },
      services: {
        items: [
          { icon: "Palette", title: "Identidade Visual", description: "Logos, paletas e materiais que traduzem sua marca." },
          { icon: "Monitor", title: "UI/UX Design", description: "Interfaces intuitivas e experiências memoráveis." },
          { icon: "Film", title: "Motion Design", description: "Animações e vídeos que capturam a atenção." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de solicitar um orçamento para um projeto de design." },
      extraBlocks: [
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Portfólio", title: "Trabalhos Recentes", subtitle: "Uma seleção dos meus melhores projetos.", images: [{ src: "", alt: "Branding Completo — Startup Tech" }, { src: "", alt: "UI/UX — App de Finanças" }, { src: "", alt: "Identidade Visual — Restaurante" }, { src: "", alt: "Website — Agência Digital" }, { src: "", alt: "Motion Design — Campanha" }, { src: "", alt: "Embalagem — Produto Orgânico" }], columns: 3, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-video", type: "video", visible: true, data: { sectionLabel: "Showreel", title: "Veja meu trabalho em ação", url: "", subtitle: "", aspectRatio: "16:9", maxWidth: "md", rounded: true, shadow: true, autoplay: false }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F4F4F5", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Disponível para Novos Projetos", subtitle: "Vamos criar algo incrível juntos? Entre em contato.", backgroundImage: "", overlay: 60, align: "center", ctaText: "Fale Comigo", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#8B5CF6", overlay: 0 }, padding: "xl" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Clientes", title: "Depoimentos", items: [{ name: "Studio A", role: "Design", text: "Criatividade e execução impecáveis.", avatar: "" }, { name: "Marca B", role: "Branding", text: "Superou todas as expectativas.", avatar: "" }, { name: "Tech C", role: "Startup", text: "Entregou um produto excepcional no prazo.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 3. DIGITAL AGENCY
  // Extras: logos, counter, team, banner, faq, depoimentos
  // ============================================
  {
    id: "digital-agency", name: "Digital Agency", description: "Agência digital com visual impactante.", category: "agencia",
    config: makeSiteConfig({
      id: "digital-agency", title: "Digital Agency",
      colors: { gold: "#F97316", goldLight: "#FB923C", goldDark: "#EA580C", background: "#0A0A0A", foreground: "#FFFFFF", beige: "#1A1A1A", nude: "#262626", cream: "#111111" },
      fonts: { heading: "Montserrat", body: "Open Sans" },
      hero: { title: "Sua Agência Digital Completa", subtitle: "Marketing, design e tecnologia para acelerar seus resultados online.", ctaPrimary: "Falar com Especialista", ctaSecondary: "Nossos Cases" },
      marqueeItems: ["Performance", "Social Media", "Branding", "Tráfego Pago", "SEO"],
      about: { body: "Somos uma agência digital full-service. Combinamos criatividade, dados e tecnologia para gerar resultados reais para nossos clientes." },
      services: {
        items: [
          { icon: "TrendingUp", title: "Marketing Digital", description: "Estratégias de performance e crescimento." },
          { icon: "Smartphone", title: "Gestão de Redes Sociais", description: "Conteúdo e engajamento para suas redes." },
          { icon: "Code", title: "Desenvolvimento Web", description: "Sites e apps modernos e responsivos." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de saber mais sobre os serviços da agência." },
      extraBlocks: [
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Clientes que Confiam em Nós", items: [{ image: "", alt: "Cliente 1", url: "#" }, { image: "", alt: "Cliente 2", url: "#" }, { image: "", alt: "Cliente 3", url: "#" }, { image: "", alt: "Cliente 4", url: "#" }, { image: "", alt: "Cliente 5", url: "#" }, { image: "", alt: "Cliente 6", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#111111", overlay: 0 }, padding: "md" } },
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "Impacto", title: "Resultados que Falam", subtitle: "", items: [{ value: 250, suffix: "+", label: "Projetos Entregues" }, { value: 50, suffix: "M+", label: "Em Receita Gerada" }, { value: 98, suffix: "%", label: "Clientes Satisfeitos" }, { value: 12, suffix: "+", label: "Anos no Mercado" }], columns: 4, duration: 2000, style: "card" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#1A1A1A", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nosso Time", subtitle: "Especialistas em performance digital.", members: [{ name: "Rafael Costa", role: "CEO & Estrategista", image: "", social: [{ platform: "linkedin", url: "#" }] }, { name: "Juliana Mendes", role: "Head de Criação", image: "", social: [{ platform: "instagram", url: "#" }] }, { name: "Lucas Pereira", role: "Lead Developer", image: "", social: [{ platform: "github", url: "#" }] }, { name: "Maria Santos", role: "Head de Mídia", image: "", social: [{ platform: "linkedin", url: "#" }] }], columns: 4 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Clientes", title: "O que dizem sobre nós", items: [{ name: "João P.", role: "Startup", text: "Transformaram nossa presença digital.", avatar: "" }, { name: "Maria L.", role: "E-commerce", text: "ROI incrível desde o primeiro mês.", avatar: "" }, { name: "Carlos R.", role: "SaaS", text: "A melhor agência com quem já trabalhamos.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#111111", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Pronto para Escalar seu Negócio?", subtitle: "Agende uma call de diagnóstico gratuita com nosso time.", backgroundImage: "", overlay: 0, align: "center", ctaText: "Agendar Call Gratuita", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#F97316", overlay: 0 }, padding: "xl" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Perguntas Frequentes", subtitle: "Tire suas dúvidas sobre nossos serviços.", items: [{ question: "Quanto tempo leva um projeto?", answer: "Depende da complexidade, mas em média entre 2 a 8 semanas." }, { question: "Vocês trabalham com contrato mensal?", answer: "Sim, oferecemos planos mensais e projetos pontuais." }, { question: "Como funciona o processo?", answer: "Briefing → Estratégia → Execução → Otimização contínua." }, { question: "Atendem empresas de todo o Brasil?", answer: "Sim, atendemos 100% online com reuniões semanais." }, { question: "Qual o investimento mínimo?", answer: "Entre em contato para um orçamento personalizado." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 4. RESTAURANT & FOOD
  // Extras: galeria, counter, banner, map, logos, depoimentos
  // ============================================
  {
    id: "restaurant-food", name: "Restaurant & Food", description: "Restaurante com estilo acolhedor e completo.", category: "restaurante",
    config: makeSiteConfig({
      id: "restaurant-food", title: "Restaurant & Food",
      colors: { gold: "#B45309", goldLight: "#D97706", goldDark: "#92400E", background: "#FFFBEB", foreground: "#1C1917", beige: "#FEF3C7", nude: "#FDE68A", cream: "#FFFBEB" },
      fonts: { heading: "Playfair Display", body: "Lora" },
      hero: { title: "Sabores que Encantam", subtitle: "Experiência gastronômica única com ingredientes selecionados e receitas autorais.", ctaPrimary: "Reserve sua Mesa", ctaSecondary: "Ver Cardápio" },
      marqueeItems: ["Gastronomia", "Sabor", "Tradição", "Chef's Table", "Experiência"],
      about: { body: "Nosso restaurante une tradição e inovação em cada prato. Com ingredientes frescos e selecionados, proporcionamos uma experiência gastronômica inesquecível." },
      services: {
        title: "Nosso Cardápio",
        subtitle: "Sabores para todos os paladares.",
        items: [
          { icon: "Salad", title: "Entradas", description: "Opções leves e saborosas para abrir o apetite." },
          { icon: "ChefHat", title: "Pratos Principais", description: "Receitas autorais com ingredientes selecionados." },
          { icon: "Cake", title: "Sobremesas", description: "Doces artesanais para finalizar com chave de ouro." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de fazer uma reserva." },
      extraBlocks: [
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Galeria", title: "Nossos Pratos", subtitle: "Feitos com ingredientes selecionados e muito carinho.", images: [{ src: "", alt: "Risoto de Funghi Porcini" }, { src: "", alt: "Filé ao Molho de Vinho" }, { src: "", alt: "Salada Mediterrânea" }, { src: "", alt: "Sobremesa do Chef" }, { src: "", alt: "Tábua de Frios Artesanais" }, { src: "", alt: "Drinks Autorais" }], columns: 3, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Tradição e Sabor", subtitle: "", items: [{ value: 200, suffix: "+", label: "Pratos no Cardápio" }, { value: 12, suffix: "+", label: "Anos de História" }, { value: 50000, suffix: "+", label: "Clientes Atendidos" }], columns: 3, duration: 2000, style: "simple" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#FEF3C7", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Reserve Sua Mesa", subtitle: "Experiência gastronômica exclusiva para você e sua família.", backgroundImage: "", overlay: 60, align: "center", ctaText: "Fazer Reserva", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#B45309", overlay: 0 }, padding: "xl" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Avaliações", title: "O que dizem nossos clientes", items: [{ name: "Rafael T.", role: "Cliente Frequente", text: "A melhor experiência gastronômica da cidade.", avatar: "" }, { name: "Juliana M.", role: "Food Blogger", text: "Sabores únicos e atendimento impecável.", avatar: "" }, { name: "Marcos A.", role: "Crítico Gastronômico", text: "Um dos melhores restaurantes que já visitei.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-map", type: "site-map", visible: true, data: { title: "Nossa Localização", address: "Rua dos Sabores, 123 — Centro, São Paulo - SP", embedUrl: "", height: "md" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#FEF3C7", overlay: 0 }, padding: "lg" } },
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Reconhecimentos e Prêmios", items: [{ image: "", alt: "Guia Gastronômico", url: "#" }, { image: "", alt: "Prêmio Sabor", url: "#" }, { image: "", alt: "Selo Qualidade", url: "#" }, { image: "", alt: "TripAdvisor", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "md" } },
      ],
    }),
  },

  // ============================================
  // 5. HEALTH & WELLNESS
  // Extras: counter, team, logos, timeline, banner, faq
  // ============================================
  {
    id: "health-wellness", name: "Health & Wellness", description: "Saúde e bem-estar completo com equipe e jornada.", category: "saude",
    config: makeSiteConfig({
      id: "health-wellness", title: "Health & Wellness",
      colors: { gold: "#059669", goldLight: "#10B981", goldDark: "#047857", background: "#F0FDF4", foreground: "#14532D", beige: "#DCFCE7", nude: "#BBF7D0", cream: "#F0FDF4" },
      fonts: { heading: "Nunito", body: "Open Sans" },
      hero: { title: "Cuidando da Sua Saúde com Excelência", subtitle: "Atendimento humanizado e profissionais especializados para seu bem-estar.", ctaPrimary: "Agendar Consulta", ctaSecondary: "Nossos Especialistas" },
      marqueeItems: ["Saúde", "Bem-estar", "Prevenção", "Qualidade de Vida", "Cuidado"],
      about: { body: "Nossa clínica oferece atendimento multidisciplinar com foco em prevenção e qualidade de vida. Profissionais renomados e equipamentos modernos." },
      services: {
        items: [
          { icon: "Stethoscope", title: "Consultas Médicas", description: "Atendimento personalizado com especialistas." },
          { icon: "Microscope", title: "Exames e Diagnósticos", description: "Tecnologia avançada para diagnósticos precisos." },
          { icon: "HeartPulse", title: "Tratamentos Especializados", description: "Protocolos modernos para sua recuperação." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de agendar uma consulta." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Cuidando de Você", subtitle: "", items: [{ value: 1200, suffix: "+", label: "Pacientes Atendidos" }, { value: 100, suffix: "%", label: "Dedicação" }, { value: 8, suffix: "+", label: "Especialistas" }], columns: 3, duration: 2000, style: "simple" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#DCFCE7", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nossa Equipe Médica", subtitle: "Profissionais qualificados e comprometidos com sua saúde.", members: [{ name: "Dra. Carla Mendes", role: "Clínica Geral — CRM 12345", image: "", social: [] }, { name: "Dr. Roberto Lima", role: "Cardiologista — CRM 23456", image: "", social: [] }, { name: "Dra. Fernanda Alves", role: "Dermatologista — CRM 34567", image: "", social: [] }, { name: "Dr. Marcos Oliveira", role: "Ortopedista — CRM 45678", image: "", social: [] }], columns: 4 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Convênios Aceitos", items: [{ image: "", alt: "Unimed", url: "#" }, { image: "", alt: "Bradesco Saúde", url: "#" }, { image: "", alt: "SulAmérica", url: "#" }, { image: "", alt: "Amil", url: "#" }, { image: "", alt: "Porto Seguro", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F0FDF4", overlay: 0 }, padding: "md" } },
        { id: "blk-timeline", type: "timeline", visible: true, data: { sectionLabel: "Jornada", title: "Sua Jornada de Cuidado", subtitle: "", layout: "vertical", connectorStyle: "solid", items: [{ icon: "CalendarCheck", period: "Passo 1", title: "Agendamento", description: "Marque sua consulta online ou por telefone." }, { icon: "Stethoscope", period: "Passo 2", title: "Consulta", description: "Avaliação completa com nosso especialista." }, { icon: "HeartPulse", period: "Passo 3", title: "Tratamento", description: "Plano personalizado para suas necessidades." }, { icon: "ShieldCheck", period: "Passo 4", title: "Acompanhamento", description: "Suporte contínuo para sua recuperação." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Agende Sua Consulta Hoje", subtitle: "Cuidar da saúde não pode esperar. Marque agora mesmo!", backgroundImage: "", overlay: 0, align: "center", ctaText: "Agendar pelo WhatsApp", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#059669", overlay: 0 }, padding: "xl" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Perguntas Frequentes", subtitle: "", items: [{ question: "Como agendar uma consulta?", answer: "Entre em contato pelo WhatsApp ou telefone." }, { question: "Aceita convênios?", answer: "Sim, aceitamos os principais convênios do mercado." }, { question: "Qual o horário de atendimento?", answer: "Segunda a sexta, das 8h às 18h. Sábados das 8h às 12h." }, { question: "Atendem emergência?", answer: "Sim, temos plantão para urgências." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 6. PERSONAL BRAND
  // Extras: timeline, video, galeria, banner, depoimentos
  // ============================================
  {
    id: "personal-brand", name: "Personal Brand", description: "Marca pessoal elegante e sofisticada.", category: "pessoal",
    config: makeSiteConfig({
      id: "personal-brand", title: "Personal Brand",
      colors: { gold: "#C9A96E", goldLight: "#D4BA88", goldDark: "#B8944F", background: "#FDFBF8", foreground: "#1A1A1A", beige: "#F5F0EB", nude: "#E8DDD3", cream: "#FAF7F4" },
      fonts: { heading: "Playfair Display", body: "Poppins" },
      heroAlign: "left",
      hero: { title: "Construa sua Autoridade Digital", subtitle: "Mentoria, conteúdo e estratégia para quem quer crescer e se posicionar.", ctaPrimary: "Agendar Mentoria", ctaSecondary: "Sobre Mim" },
      marqueeItems: ["Mentoria", "Conteúdo", "Estratégia", "Crescimento", "Autoridade"],
      about: { body: "Ajudo profissionais e empreendedores a construir autoridade e gerar resultados através de posicionamento estratégico e presença digital." },
      services: {
        items: [
          { icon: "Users", title: "Mentoria Individual", description: "Acompanhamento personalizado para sua evolução." },
          { icon: "Mic", title: "Palestras e Workshops", description: "Conteúdo inspirador para equipes e eventos." },
          { icon: "Target", title: "Consultoria de Marca", description: "Posicionamento estratégico para se destacar." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de saber mais sobre a mentoria." },
      extraBlocks: [
        { id: "blk-timeline", type: "timeline", visible: true, data: { sectionLabel: "Trajetória", title: "Minha Carreira", subtitle: "", layout: "alternating", connectorStyle: "dashed", items: [{ icon: "Rocket", period: "2015", title: "Início da Carreira", description: "Primeiros projetos como freelancer." }, { icon: "GraduationCap", period: "2017", title: "Especialização", description: "MBA em Gestão e Estratégia de Negócios." }, { icon: "Building", period: "2019", title: "Fundação da Empresa", description: "Criei minha própria consultoria." }, { icon: "Award", period: "2021", title: "Reconhecimento", description: "Prêmio de melhor profissional do setor." }, { icon: "Globe", period: "2024", title: "Expansão", description: "Mentorias e palestras internacionais." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-video", type: "video", visible: true, data: { sectionLabel: "Apresentação", title: "Conheça meu trabalho", url: "", subtitle: "", aspectRatio: "16:9", maxWidth: "md", rounded: true, shadow: true, autoplay: false }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F5F0EB", overlay: 0 }, padding: "lg" } },
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Portfólio", title: "Trabalhos em Destaque", subtitle: "", images: [{ src: "", alt: "Consultoria para Empresa X" }, { src: "", alt: "Palestra no Evento Y" }, { src: "", alt: "Mentoria para Startups" }, { src: "", alt: "Workshop de Liderança" }], columns: 2, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Vamos Trabalhar Juntos?", subtitle: "Transforme sua visão em resultados concretos.", backgroundImage: "", overlay: 0, align: "center", ctaText: "Entrar em Contato", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#C9A96E", overlay: 0 }, padding: "xl" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Depoimentos", title: "O que dizem sobre mim", items: [{ name: "Empresa X", role: "Cliente", text: "Trabalho impecável e atendimento excepcional.", avatar: "" }, { name: "Empresa Y", role: "Parceiro", text: "Profissional dedicado e criativo.", avatar: "" }, { name: "Startup Z", role: "Mentorado", text: "Transformou completamente minha visão de negócio.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F5F0EB", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 7. TECH STARTUP
  // Extras: counter, pricing-table, logos, depoimentos, banner, faq
  // ============================================
  {
    id: "tech-startup", name: "Tech Startup", description: "Startup tech com visual moderno e completo.", category: "tecnologia",
    config: makeSiteConfig({
      id: "tech-startup", title: "Tech Startup",
      colors: { gold: "#6366F1", goldLight: "#818CF8", goldDark: "#4F46E5", background: "#0F0F23", foreground: "#E2E8F0", beige: "#1E1B4B", nude: "#312E81", cream: "#0F0F23" },
      fonts: { heading: "Space Grotesk", body: "Inter" },
      hero: { title: "Tecnologia que Transforma Negócios", subtitle: "Soluções SaaS inovadoras para escalar sua operação com inteligência.", ctaPrimary: "Começar Free Trial", ctaSecondary: "Ver Demo" },
      marqueeItems: ["SaaS", "Cloud", "Automação", "Inteligência Artificial", "Escalabilidade"],
      about: { body: "Desenvolvemos soluções tecnológicas que simplificam processos e potencializam resultados. Nossa plataforma já impacta milhares de empresas no Brasil." },
      services: {
        items: [
          { icon: "Cloud", title: "Plataforma SaaS", description: "Software na nuvem com atualizações constantes." },
          { icon: "Puzzle", title: "Integrações e APIs", description: "Conecte com as ferramentas que você já usa." },
          { icon: "Headphones", title: "Suporte Técnico", description: "Time dedicado para te ajudar a qualquer momento." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de conhecer a plataforma e fazer um free trial." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Impacto em Números", subtitle: "", items: [{ value: 10, suffix: "M+", label: "Usuários Ativos" }, { value: 99.9, suffix: "%", label: "Uptime" }, { value: 150, suffix: "+", label: "Países" }, { value: 4.9, suffix: "★", label: "Avaliação" }], columns: 4, duration: 2000, style: "card" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#1E1B4B", overlay: 0 }, padding: "lg" } },
        { id: "blk-pricing", type: "pricing-table", visible: true, data: { sectionLabel: "Planos", title: "Escolha seu Plano", subtitle: "Comece grátis. Escale quando precisar.", plans: [{ name: "Starter", badge: "", highlighted: false, price: "Grátis", currency: "", period: "/mês", description: "Para quem está começando", features: ["Até 100 usuários", "1 GB de armazenamento", "Suporte por email", "API básica"], ctaLabel: "Começar Grátis", ctaUrl: "#" }, { name: "Pro", badge: "Mais Popular", highlighted: true, price: "R$ 99", currency: "", period: "/mês", description: "Para empresas em crescimento", features: ["Até 10.000 usuários", "100 GB de armazenamento", "Suporte prioritário", "API completa", "Integrações"], ctaLabel: "Assinar Pro", ctaUrl: "#" }, { name: "Enterprise", badge: "", highlighted: false, price: "Sob consulta", currency: "", period: "", description: "Para grandes operações", features: ["Usuários ilimitados", "Armazenamento ilimitado", "Gerente dedicado", "SLA 99.99%", "On-premise"], ctaLabel: "Falar com Vendas", ctaUrl: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Investidores & Parceiros", items: [{ image: "", alt: "Venture Capital A", url: "#" }, { image: "", alt: "Aceleradora B", url: "#" }, { image: "", alt: "Partner C", url: "#" }, { image: "", alt: "Tech D", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#1E1B4B", overlay: 0 }, padding: "md" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Depoimentos", title: "Confiado por Líderes", items: [{ name: "Tech Corp", role: "CTO", text: "Revolucionou nosso fluxo de trabalho.", avatar: "" }, { name: "StartupX", role: "Founder", text: "Solução essencial para escalar.", avatar: "" }, { name: "BigCo", role: "VP Engineering", text: "A melhor ferramenta da categoria.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Comece seu Free Trial de 14 Dias", subtitle: "Sem cartão de crédito. Cancele quando quiser.", backgroundImage: "", overlay: 0, align: "center", ctaText: "Começar Agora — É Grátis", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#6366F1", overlay: 0 }, padding: "xl" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Perguntas Frequentes", subtitle: "", items: [{ question: "Preciso de cartão de crédito para testar?", answer: "Não! O free trial é 100% gratuito sem compromisso." }, { question: "Posso migrar de plano a qualquer momento?", answer: "Sim, faça upgrade ou downgrade quando quiser." }, { question: "Vocês oferecem suporte em português?", answer: "Sim, nosso suporte é 100% em português." }, { question: "Meus dados estão seguros?", answer: "Usamos criptografia de ponta e somos compliance LGPD." }, { question: "Tem API disponível?", answer: "Sim, API REST completa com documentação." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 8. FITNESS & GYM
  // Extras: counter, galeria, pricing-table, team, banner, faq
  // ============================================
  {
    id: "fitness-gym", name: "Fitness & Gym", description: "Academia energética com planos e equipe.", category: "academia",
    config: makeSiteConfig({
      id: "fitness-gym", title: "Fitness & Gym",
      colors: { gold: "#DC2626", goldLight: "#EF4444", goldDark: "#B91C1C", background: "#0A0A0A", foreground: "#FFFFFF", beige: "#1A1A1A", nude: "#262626", cream: "#111111" },
      fonts: { heading: "Montserrat", body: "Open Sans" },
      hero: { title: "Supere Seus Limites", subtitle: "Treinos personalizados, estrutura completa e uma comunidade que te motiva.", ctaPrimary: "Matricule-se", ctaSecondary: "Conheça a Estrutura" },
      marqueeItems: ["Fitness", "Saúde", "Performance", "Força", "Disciplina"],
      about: { body: "Nossa academia oferece o melhor em equipamentos, aulas coletivas e acompanhamento profissional. Aqui você encontra o suporte para alcançar seus objetivos." },
      services: {
        items: [
          { icon: "Dumbbell", title: "Musculação", description: "Equipamentos de última geração para todos os níveis." },
          { icon: "Music", title: "Aulas Coletivas", description: "Zumba, spinning, funcional e muito mais." },
          { icon: "UserCheck", title: "Personal Trainer", description: "Treinos sob medida para seus objetivos." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de saber sobre as modalidades." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Nossos Números", subtitle: "", items: [{ value: 3000, suffix: "+", label: "Alunos Ativos" }, { value: 50, suffix: "+", label: "Modalidades" }, { value: 10, suffix: "", label: "Unidades" }], columns: 3, duration: 2000, style: "card" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#1A1A1A", overlay: 0 }, padding: "lg" } },
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Estrutura", title: "Nossas Instalações", subtitle: "Equipamentos de última geração e ambientes climatizados.", images: [{ src: "", alt: "Sala de Musculação" }, { src: "", alt: "Área de CrossFit" }, { src: "", alt: "Piscina Semi-Olímpica" }, { src: "", alt: "Estúdio de Spinning" }, { src: "", alt: "Área de Lutas" }, { src: "", alt: "Espaço Funcional" }], columns: 3, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-pricing", type: "pricing-table", visible: true, data: { sectionLabel: "Planos", title: "Escolha seu Plano", subtitle: "Invista em você. Resultados garantidos.", plans: [{ name: "Basic", badge: "", highlighted: false, price: "R$ 89", currency: "", period: "/mês", description: "Para quem está começando", features: ["Musculação", "Cardio", "Horário comercial", "1 modalidade"], ctaLabel: "Matricular", ctaUrl: "#contato" }, { name: "Premium", badge: "Mais Popular", highlighted: true, price: "R$ 149", currency: "", period: "/mês", description: "O plano mais escolhido", features: ["Acesso total", "Todas as modalidades", "Personal 1x/semana", "Horário livre", "Avaliação física"], ctaLabel: "Matricular", ctaUrl: "#contato" }, { name: "VIP", badge: "", highlighted: false, price: "R$ 249", currency: "", period: "/mês", description: "Experiência completa", features: ["Tudo do Premium", "Personal 3x/semana", "Nutricionista", "Armário exclusivo", "Acesso a todas unidades"], ctaLabel: "Matricular", ctaUrl: "#contato" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#1A1A1A", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nossos Treinadores", subtitle: "Profissionais certificados para guiar sua evolução.", members: [{ name: "André Costa", role: "Personal Trainer — CREF 12345", image: "", social: [{ platform: "instagram", url: "#" }] }, { name: "Camila Ramos", role: "Instrutora de Yoga", image: "", social: [{ platform: "instagram", url: "#" }] }, { name: "Bruno Mendes", role: "Coach de CrossFit", image: "", social: [{ platform: "instagram", url: "#" }] }], columns: 3 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Primeira Semana Grátis!", subtitle: "Venha conhecer nossa estrutura sem compromisso.", backgroundImage: "", overlay: 0, align: "center", ctaText: "Agendar Visita", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#DC2626", overlay: 0 }, padding: "xl" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Dúvidas Frequentes", subtitle: "", items: [{ question: "Posso trocar de plano depois?", answer: "Sim, você pode fazer upgrade a qualquer momento." }, { question: "Preciso de atestado médico?", answer: "Recomendamos, mas não é obrigatório para iniciar." }, { question: "Qual o horário de funcionamento?", answer: "Segunda a sexta: 6h-23h. Sábados: 8h-14h." }, { question: "Tem estacionamento?", answer: "Sim, estacionamento gratuito para alunos." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 9. BEAUTY & SALON
  // Extras: galeria, team, before-after, depoimentos, banner, logos, faq
  // ============================================
  {
    id: "beauty-salon", name: "Beauty & Salon", description: "Salão de beleza completo com portfólio e transformações.", category: "beleza",
    config: makeSiteConfig({
      id: "beauty-salon", title: "Beauty & Salon",
      colors: { gold: "#EC4899", goldLight: "#F472B6", goldDark: "#DB2777", background: "#FFF1F2", foreground: "#1A1A1A", beige: "#FFE4E6", nude: "#FECDD3", cream: "#FFF1F2" },
      fonts: { heading: "Cormorant Garamond", body: "Nunito" },
      hero: { title: "Realce Sua Beleza Natural", subtitle: "Cuidados capilares, estética e bem-estar em um ambiente exclusivo.", ctaPrimary: "Agendar Horário", ctaSecondary: "Nossos Serviços" },
      marqueeItems: ["Beleza", "Estilo", "Cuidado", "Transformação", "Autoestima"],
      about: { body: "Nosso salão é referência em beleza e bem-estar. Com profissionais certificados e produtos premium, oferecemos tratamentos que realçam sua beleza natural." },
      services: {
        items: [
          { icon: "Scissors", title: "Corte e Coloração", description: "Tendências e técnicas para seu estilo único." },
          { icon: "Sparkles", title: "Tratamentos Capilares", description: "Recuperação e hidratação profissional." },
          { icon: "Heart", title: "Estética Facial", description: "Protocolos de rejuvenescimento e cuidado com a pele." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de agendar um horário." },
      extraBlocks: [
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Portfólio", title: "Nossos Trabalhos", subtitle: "Beleza e cuidado em cada detalhe.", images: [{ src: "", alt: "Coloração Premium" }, { src: "", alt: "Corte Moderno" }, { src: "", alt: "Penteado para Noivas" }, { src: "", alt: "Tratamento Capilar" }, { src: "", alt: "Design de Sobrancelhas" }, { src: "", alt: "Maquiagem Profissional" }], columns: 3, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nossas Profissionais", subtitle: "Especialistas em realçar sua beleza natural.", members: [{ name: "Isabela Costa", role: "Hair Stylist Senior", image: "", social: [{ platform: "instagram", url: "#" }] }, { name: "Patrícia Alves", role: "Maquiadora Profissional", image: "", social: [{ platform: "instagram", url: "#" }] }, { name: "Larissa Santos", role: "Especialista em Coloração", image: "", social: [{ platform: "instagram", url: "#" }] }], columns: 3 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-before-after", type: "before-after", visible: true, data: { sectionLabel: "Transformações", title: "Antes e Depois", subtitle: "Veja o resultado dos nossos tratamentos", layout: "side-by-side", beforeImage: "", beforeLabel: "Antes", afterImage: "", afterLabel: "Depois", beforeItems: ["Cabelo danificado", "Sem brilho", "Pontas duplas"], afterItems: ["Cabelo restaurado", "Brilho natural", "Maciez e hidratação"] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#FFE4E6", overlay: 0 }, padding: "lg" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Depoimentos", title: "Clientes Satisfeitas", items: [{ name: "Camila R.", role: "Cliente", text: "Atendimento maravilhoso e resultado incrível!", avatar: "" }, { name: "Fernanda S.", role: "Noiva", text: "Meu dia especial ficou perfeito graças a vocês.", avatar: "" }, { name: "Beatriz L.", role: "Cliente VIP", text: "Melhor salão que já frequentei na vida.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Agende pelo WhatsApp", subtitle: "Garanta seu horário e transforme seu visual.", backgroundImage: "", overlay: 0, align: "center", ctaText: "Agendar Agora", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#EC4899", overlay: 0 }, padding: "xl" } },
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Marcas que Trabalhamos", items: [{ image: "", alt: "L'Oréal", url: "#" }, { image: "", alt: "Wella", url: "#" }, { image: "", alt: "Kerastase", url: "#" }, { image: "", alt: "Redken", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#FFF1F2", overlay: 0 }, padding: "md" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Dúvidas Frequentes", subtitle: "", items: [{ question: "Preciso agendar horário?", answer: "Sim, recomendamos agendamento prévio para garantir seu horário." }, { question: "Quais formas de pagamento?", answer: "Aceitamos cartões, Pix e dinheiro." }, { question: "Fazem atendimento a domicílio?", answer: "Sim, consulte disponibilidade pelo WhatsApp." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 10. PHOTOGRAPHY
  // Extras: galeria, video, banner, pricing-table, depoimentos
  // ============================================
  {
    id: "photography", name: "Photography", description: "Fotografia com portfólio, pacotes e depoimentos.", category: "fotografia",
    config: makeSiteConfig({
      id: "photography", title: "Photography",
      colors: { gold: "#A3A3A3", goldLight: "#D4D4D4", goldDark: "#737373", background: "#FAFAFA", foreground: "#171717", beige: "#F5F5F5", nude: "#E5E5E5", cream: "#FAFAFA" },
      fonts: { heading: "Playfair Display", body: "Inter" },
      heroHeight: "full",
      heroAlign: "center",
      hero: { title: "Momentos que Viram Eternidade", subtitle: "Fotografia autoral para casamentos, ensaios e eventos especiais.", ctaPrimary: "Agendar Ensaio", ctaSecondary: "Ver Portfolio" },
      marqueeItems: ["Fotografia", "Ensaios", "Casamentos", "Retratos", "Eventos"],
      about: { body: "Com um olhar sensível e técnica apurada, registro momentos únicos que contam histórias. Cada clique é pensado para eternizar suas melhores lembranças." },
      services: {
        items: [
          { icon: "Heart", title: "Casamentos e Eventos", description: "Cobertura completa do seu grande dia." },
          { icon: "Camera", title: "Ensaios Fotográficos", description: "Sessões externas e em estúdio com direção." },
          { icon: "Building2", title: "Fotografia Corporativa", description: "Imagens profissionais para sua empresa." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de agendar um ensaio fotográfico." },
      extraBlocks: [
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Portfólio", title: "Meus Trabalhos", subtitle: "Cada foto conta uma história única.", images: [{ src: "", alt: "Ensaio ao Ar Livre" }, { src: "", alt: "Casamento na Praia" }, { src: "", alt: "Retrato Corporativo" }, { src: "", alt: "Ensaio de Família" }, { src: "", alt: "Evento Corporativo" }, { src: "", alt: "Fotografia de Produto" }, { src: "", alt: "Ensaio Gestante" }, { src: "", alt: "Formatura" }], columns: 4, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-video", type: "video", visible: true, data: { sectionLabel: "Making Of", title: "Por trás das lentes", url: "", subtitle: "", aspectRatio: "16:9", maxWidth: "md", rounded: true, shadow: true, autoplay: false }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F5F5F5", overlay: 0 }, padding: "lg" } },
        { id: "blk-pricing", type: "pricing-table", visible: true, data: { sectionLabel: "Pacotes", title: "Pacotes de Fotografia", subtitle: "Encontre o pacote ideal para seu momento especial.", plans: [{ name: "Essencial", badge: "", highlighted: false, price: "R$ 800", currency: "", period: "", description: "Sessão rápida e profissional", features: ["2 horas de sessão", "50 fotos editadas", "Galeria online", "Entrega em 10 dias"], ctaLabel: "Orçamento", ctaUrl: "#contato" }, { name: "Premium", badge: "Mais Vendido", highlighted: true, price: "R$ 1.500", currency: "", period: "", description: "A escolha ideal", features: ["4 horas de sessão", "150 fotos editadas", "Álbum impresso", "Galeria online", "Entrega em 7 dias"], ctaLabel: "Orçamento", ctaUrl: "#contato" }, { name: "Exclusive", badge: "", highlighted: false, price: "R$ 3.000", currency: "", period: "", description: "Experiência completa", features: ["Dia inteiro", "Fotos ilimitadas", "Álbum premium", "Vídeo making of", "2 locações", "Entrega em 5 dias"], ctaLabel: "Orçamento", ctaUrl: "#contato" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Clientes", title: "O que dizem meus clientes", items: [{ name: "Carolina M.", role: "Noiva", text: "As fotos do casamento ficaram perfeitas, emocionantes!", avatar: "" }, { name: "Empresa Tech", role: "Evento Corporativo", text: "Profissionalismo e qualidade excepcionais.", avatar: "" }, { name: "Família Santos", role: "Ensaio de Família", text: "Registrou momentos que vamos guardar para sempre.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F5F5F5", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Agende seu Ensaio", subtitle: "Vagas limitadas — garanta sua data!", backgroundImage: "", overlay: 60, align: "center", ctaText: "Agendar Agora", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#737373", overlay: 0 }, padding: "xl" } },
      ],
    }),
  },

  // ============================================
  // 11. LAW OFFICE
  // Extras: counter, team, logos, timeline, banner, faq
  // ============================================
  {
    id: "law-office", name: "Escritório de Advocacia", description: "Site jurídico completo com equipe e processo.", category: "advocacia" as SiteCategory,
    config: makeSiteConfig({
      id: "law-office", title: "Escritório de Advocacia",
      colors: { gold: "#1E293B", goldLight: "#334155", goldDark: "#0F172A", background: "#FFFFFF", foreground: "#0F172A", beige: "#F1F5F9", nude: "#E2E8F0", cream: "#F8FAFC" },
      fonts: { heading: "Cormorant Garamond", body: "Lora" },
      heroAlign: "left",
      hero: { title: "Advocacia de Confiança e Resultado", subtitle: "Assessoria jurídica especializada para proteger seus direitos e interesses.", ctaPrimary: "Consulta Gratuita", ctaSecondary: "Áreas de Atuação" },
      marqueeItems: ["Direito", "Justiça", "Ética", "Compromisso", "Experiência"],
      about: { body: "Nosso escritório atua há mais de 10 anos nas áreas cível, trabalhista e empresarial. Atendimento personalizado com foco em soluções eficientes." },
      services: {
        items: [
          { icon: "Building2", title: "Direito Empresarial", description: "Assessoria jurídica completa para sua empresa." },
          { icon: "Shield", title: "Direito Trabalhista", description: "Defesa dos direitos do trabalhador e empregador." },
          { icon: "Scale", title: "Direito Civil", description: "Contratos, família, sucessões e responsabilidade." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de agendar uma consulta jurídica." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "Experiência", title: "Resultados Comprovados", subtitle: "", items: [{ value: 2000, suffix: "+", label: "Processos" }, { value: 95, suffix: "%", label: "Êxito" }, { value: 20, suffix: "+", label: "Anos" }], columns: 3, duration: 2000, style: "card" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F1F5F9", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nossos Advogados", subtitle: "Profissionais com sólida formação e experiência.", members: [{ name: "Dr. Ricardo Ferreira", role: "Sócio Fundador — OAB/SP 12345", image: "", social: [{ platform: "linkedin", url: "#" }] }, { name: "Dra. Patrícia Gomes", role: "Direito Trabalhista — OAB/SP 23456", image: "", social: [{ platform: "linkedin", url: "#" }] }, { name: "Dr. Eduardo Martins", role: "Direito Empresarial — OAB/SP 34567", image: "", social: [{ platform: "linkedin", url: "#" }] }, { name: "Dra. Camila Rocha", role: "Direito Civil — OAB/SP 45678", image: "", social: [{ platform: "linkedin", url: "#" }] }], columns: 4 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Certificações e Associações", items: [{ image: "", alt: "OAB", url: "#" }, { image: "", alt: "IASP", url: "#" }, { image: "", alt: "CESA", url: "#" }, { image: "", alt: "Legal 500", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F8FAFC", overlay: 0 }, padding: "md" } },
        { id: "blk-timeline", type: "timeline", visible: true, data: { sectionLabel: "Processo", title: "Como Funciona nosso Atendimento", subtitle: "", layout: "vertical", connectorStyle: "solid", items: [{ icon: "MessageCircle", period: "Etapa 1", title: "Consulta Inicial", description: "Análise gratuita do seu caso com um especialista." }, { icon: "FileText", period: "Etapa 2", title: "Estratégia", description: "Definição da melhor abordagem jurídica." }, { icon: "Scale", period: "Etapa 3", title: "Execução", description: "Acompanhamento processual com atualizações constantes." }, { icon: "CheckCircle", period: "Etapa 4", title: "Resolução", description: "Fechamento do caso com o melhor resultado possível." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Consulta Inicial Gratuita", subtitle: "Agende agora e descubra seus direitos sem compromisso.", backgroundImage: "", overlay: 0, align: "center", ctaText: "Agendar Consulta", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#1E293B", overlay: 0 }, padding: "xl" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Perguntas Frequentes", subtitle: "", items: [{ question: "Como funciona a primeira consulta?", answer: "A primeira consulta é gratuita e serve para avaliar seu caso." }, { question: "Quais áreas de atuação?", answer: "Direito civil, trabalhista, empresarial e tributário." }, { question: "Atendem online?", answer: "Sim, oferecemos atendimento presencial e online." }, { question: "Como são cobrados os honorários?", answer: "Depende do caso. Trabalhamos com honorários fixos e êxito." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 12. EDUCATION & COURSES
  // Extras: counter, pricing-table, galeria, logos, depoimentos, video, faq
  // ============================================
  {
    id: "education-courses", name: "Educação & Cursos", description: "Plataforma educacional completa com planos e depoimentos.", category: "educacao" as SiteCategory,
    config: makeSiteConfig({
      id: "education-courses", title: "Educação & Cursos",
      colors: { gold: "#0EA5E9", goldLight: "#38BDF8", goldDark: "#0284C7", background: "#FFFFFF", foreground: "#0C4A6E", beige: "#F0F9FF", nude: "#E0F2FE", cream: "#F0F9FF" },
      fonts: { heading: "Nunito", body: "Inter" },
      hero: { title: "Conhecimento que Transforma Carreiras", subtitle: "Cursos online e presenciais com certificação e suporte completo.", ctaPrimary: "Ver Cursos", ctaSecondary: "Inscreva-se" },
      marqueeItems: ["Educação", "Conhecimento", "Certificação", "Carreira", "Aprendizado"],
      about: { body: "Oferecemos cursos de alta qualidade com metodologia prática e professores experientes. Nossos alunos conquistam resultados reais no mercado de trabalho." },
      services: {
        items: [
          { icon: "Monitor", title: "Cursos Online", description: "Aprenda no seu ritmo, de qualquer lugar." },
          { icon: "Users", title: "Turmas Presenciais", description: "Aulas práticas com turmas reduzidas." },
          { icon: "Award", title: "Certificações", description: "Diplomas reconhecidos pelo mercado." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de saber mais sobre os cursos disponíveis." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Números que Impressionam", subtitle: "", items: [{ value: 5000, suffix: "+", label: "Alunos" }, { value: 120, suffix: "+", label: "Cursos" }, { value: 98, suffix: "%", label: "Aprovação" }], columns: 3, duration: 2000, style: "card" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F0F9FF", overlay: 0 }, padding: "lg" } },
        { id: "blk-video", type: "video", visible: true, data: { sectionLabel: "Aula Demonstrativa", title: "Experimente uma aula grátis", url: "", subtitle: "", aspectRatio: "16:9", maxWidth: "md", rounded: true, shadow: true, autoplay: false }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-pricing", type: "pricing-table", visible: true, data: { sectionLabel: "Planos", title: "Invista no seu Futuro", subtitle: "Acesso a todos os cursos com um único plano.", plans: [{ name: "Mensal", badge: "", highlighted: false, price: "R$ 49", currency: "", period: "/mês", description: "Flexibilidade total", features: ["Acesso a todos os cursos", "Certificados", "Suporte por email", "Comunidade"], ctaLabel: "Assinar", ctaUrl: "#contato" }, { name: "Anual", badge: "Melhor Custo", highlighted: true, price: "R$ 29", currency: "", period: "/mês", description: "Economize 40%", features: ["Tudo do Mensal", "Economia de 40%", "Mentoria mensal", "Aulas ao vivo", "Material exclusivo"], ctaLabel: "Assinar com Desconto", ctaUrl: "#contato" }, { name: "Vitalício", badge: "", highlighted: false, price: "R$ 997", currency: "", period: "único", description: "Acesso para sempre", features: ["Acesso vitalício", "Todos os cursos futuros", "Mentoria semanal", "Grupo VIP", "Certificações premium"], ctaLabel: "Garantir Acesso", ctaUrl: "#contato" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F0F9FF", overlay: 0 }, padding: "lg" } },
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Certificados", title: "Reconhecimento Garantido", subtitle: "Certificados reconhecidos pelo mercado.", images: [{ src: "", alt: "Certificado de Conclusão" }, { src: "", alt: "Selo de Qualidade MEC" }, { src: "", alt: "Prêmio Educação Digital" }, { src: "", alt: "Parceria Universidade" }], columns: 4, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Parceiros Educacionais", items: [{ image: "", alt: "Universidade A", url: "#" }, { image: "", alt: "Instituto B", url: "#" }, { image: "", alt: "Fundação C", url: "#" }, { image: "", alt: "Empresa D", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F0F9FF", overlay: 0 }, padding: "md" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Alunos", title: "O que dizem nossos alunos", items: [{ name: "Lucas V.", role: "Aluno", text: "Os cursos mudaram minha carreira profissional.", avatar: "" }, { name: "Mariana C.", role: "Aluna", text: "Conteúdo prático e professores excelentes.", avatar: "" }, { name: "João P.", role: "Aluno", text: "Consegui uma promoção graças ao que aprendi aqui.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Perguntas Frequentes", subtitle: "", items: [{ question: "Como acesso os cursos?", answer: "Após a assinatura, você acessa a plataforma 24/7." }, { question: "Os certificados são reconhecidos?", answer: "Sim, certificados com validação digital." }, { question: "Posso cancelar a qualquer momento?", answer: "Sim, sem fidelidade. Cancele quando quiser." }, { question: "Tem suporte para dúvidas?", answer: "Sim, fórum da comunidade e suporte por email." }, { question: "Os cursos são atualizados?", answer: "Sim, conteúdo atualizado regularmente." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 13. REAL ESTATE
  // Extras: counter, galeria, team, depoimentos, map, banner, faq
  // ============================================
  {
    id: "real-estate", name: "Imobiliária", description: "Site imobiliário completo com galeria e equipe.", category: "imoveis" as SiteCategory,
    config: makeSiteConfig({
      id: "real-estate", title: "Imobiliária",
      colors: { gold: "#92400E", goldLight: "#B45309", goldDark: "#78350F", background: "#FFFBEB", foreground: "#1C1917", beige: "#FEF3C7", nude: "#FDE68A", cream: "#FFFBEB" },
      fonts: { heading: "Playfair Display", body: "Poppins" },
      heroHeight: "full",
      hero: { title: "Encontre o Imóvel dos Seus Sonhos", subtitle: "Apartamentos, casas e salas comerciais nas melhores localizações.", ctaPrimary: "Ver Imóveis", ctaSecondary: "Falar com Corretor" },
      marqueeItems: ["Imóveis", "Localização", "Investimento", "Qualidade", "Confiança"],
      about: { body: "Há mais de 10 anos no mercado imobiliário, ajudamos famílias e investidores a encontrar o imóvel perfeito. Atendimento personalizado e transparente." },
      services: {
        items: [
          { icon: "Home", title: "Compra e Venda", description: "As melhores opções para morar ou investir." },
          { icon: "Key", title: "Locação", description: "Imóveis prontos para você se mudar." },
          { icon: "ClipboardCheck", title: "Avaliação de Imóveis", description: "Laudos técnicos e análise de mercado." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de saber mais sobre os imóveis disponíveis." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Experiência no Mercado", subtitle: "", items: [{ value: 800, suffix: "+", label: "Imóveis Vendidos" }, { value: 15, suffix: "+", label: "Anos no Mercado" }, { value: 350, suffix: "+", label: "Clientes Felizes" }], columns: 3, duration: 2000, style: "simple" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#FEF3C7", overlay: 0 }, padding: "lg" } },
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Imóveis", title: "Imóveis em Destaque", subtitle: "As melhores oportunidades selecionadas para você.", images: [{ src: "", alt: "Apartamento 3 quartos — Jardins" }, { src: "", alt: "Casa com piscina — Alphaville" }, { src: "", alt: "Cobertura duplex — Vila Mariana" }, { src: "", alt: "Sala comercial — Faria Lima" }, { src: "", alt: "Studio moderno — Pinheiros" }, { src: "", alt: "Chácara — Interior SP" }], columns: 3, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nossos Corretores", subtitle: "Especialistas prontos para encontrar seu imóvel ideal.", members: [{ name: "Fernando Silva", role: "Corretor Senior — CRECI 12345", image: "", social: [{ platform: "linkedin", url: "#" }] }, { name: "Tatiana Rocha", role: "Corretora — CRECI 23456", image: "", social: [{ platform: "instagram", url: "#" }] }, { name: "Roberto Almeida", role: "Corretor — CRECI 34567", image: "", social: [{ platform: "linkedin", url: "#" }] }], columns: 3 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Clientes", title: "Realizamos Sonhos", items: [{ name: "Roberto M.", role: "Comprador", text: "Encontraram o imóvel perfeito para minha família.", avatar: "" }, { name: "Sandra K.", role: "Investidora", text: "Ótimas opções de investimento e suporte completo.", avatar: "" }, { name: "Paulo S.", role: "Primeiro Imóvel", text: "Realizei meu sonho da casa própria com total suporte.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#FEF3C7", overlay: 0 }, padding: "lg" } },
        { id: "blk-map", type: "site-map", visible: true, data: { title: "Nosso Escritório", address: "Av. Paulista, 1000 — Bela Vista, São Paulo - SP", embedUrl: "", height: "md" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Encontre seu Imóvel Ideal", subtitle: "Milhares de opções com condições exclusivas.", backgroundImage: "", overlay: 0, align: "center", ctaText: "Ver Imóveis Disponíveis", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#92400E", overlay: 0 }, padding: "xl" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Dúvidas Frequentes", subtitle: "", items: [{ question: "Como funciona a visita ao imóvel?", answer: "Agendamos um horário que seja conveniente para você." }, { question: "Vocês ajudam com financiamento?", answer: "Sim, temos parceria com os principais bancos." }, { question: "Cobram taxa de corretagem?", answer: "A taxa é negociada caso a caso." }, { question: "Atendem qual região?", answer: "Atuamos em toda a Grande São Paulo." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 14. PET & VETERINARY
  // Extras: counter, team, galeria, before-after, map, banner, faq
  // ============================================
  {
    id: "pet-veterinary", name: "Pet & Veterinária", description: "Clínica veterinária completa com equipe e tratamentos.", category: "pet" as SiteCategory,
    config: makeSiteConfig({
      id: "pet-veterinary", title: "Pet & Veterinária",
      colors: { gold: "#16A34A", goldLight: "#22C55E", goldDark: "#15803D", background: "#FFFFFF", foreground: "#14532D", beige: "#F0FDF4", nude: "#DCFCE7", cream: "#F0FDF4" },
      fonts: { heading: "Nunito", body: "Nunito" },
      hero: { title: "Cuidamos de Quem Você Ama", subtitle: "Clínica veterinária completa com atendimento 24 horas e equipe especializada.", ctaPrimary: "Agendar Consulta", ctaSecondary: "Emergência 24h" },
      marqueeItems: ["Veterinária", "Cuidado Animal", "Saúde Pet", "Amor", "Confiança"],
      about: { body: "Nossa clínica veterinária oferece atendimento completo para cães, gatos e animais exóticos. Equipamentos modernos e profissionais carinhosos — seu pet em boas mãos." },
      services: {
        items: [
          { icon: "Stethoscope", title: "Consultas e Vacinas", description: "Acompanhamento preventivo e check-ups completos." },
          { icon: "Syringe", title: "Cirurgias", description: "Procedimentos seguros com anestesia monitorada." },
          { icon: "Bath", title: "Banho e Tosa", description: "Cuidados estéticos com carinho e profissionalismo." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de agendar uma consulta para meu pet." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Cuidamos com Amor", subtitle: "", items: [{ value: 3000, suffix: "+", label: "Pets Atendidos" }, { value: 5, suffix: "+", label: "Veterinários" }, { value: 24, suffix: "h", label: "Emergência" }], columns: 3, duration: 2000, style: "simple" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F0FDF4", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nossos Veterinários", subtitle: "Profissionais apaixonados por animais.", members: [{ name: "Dra. Amanda Silva", role: "Clínica Geral — CRMV 12345", image: "", social: [] }, { name: "Dr. Bruno Costa", role: "Cirurgião — CRMV 23456", image: "", social: [] }, { name: "Dra. Carla Santos", role: "Dermatologia Pet — CRMV 34567", image: "", social: [] }], columns: 3 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Estrutura", title: "Nossa Clínica", subtitle: "Ambiente preparado para o conforto do seu pet.", images: [{ src: "", alt: "Recepção Acolhedora" }, { src: "", alt: "Sala de Consultas" }, { src: "", alt: "Centro Cirúrgico" }, { src: "", alt: "Internação com Monitoramento" }, { src: "", alt: "Banho e Tosa" }, { src: "", alt: "Área de Recreação" }], columns: 3, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-before-after", type: "before-after", visible: true, data: { sectionLabel: "Tratamentos", title: "Antes e Depois", subtitle: "Veja a recuperação dos nossos pacientes", layout: "side-by-side", beforeImage: "", beforeLabel: "Antes", afterImage: "", afterLabel: "Depois", beforeItems: ["Pelo opaco e sem brilho", "Comportamento apático", "Problemas de pele"], afterItems: ["Pelo saudável e brilhante", "Energia e vitalidade", "Pele tratada e recuperada"] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F0FDF4", overlay: 0 }, padding: "lg" } },
        { id: "blk-map", type: "site-map", visible: true, data: { title: "Nossa Localização", address: "Rua dos Animais, 456 — Moema, São Paulo - SP", embedUrl: "", height: "md" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Emergência 24 Horas", subtitle: "Seu pet precisa de ajuda? Estamos sempre disponíveis.", backgroundImage: "", overlay: 0, align: "center", ctaText: "Ligar Agora", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#16A34A", overlay: 0 }, padding: "xl" } },
        { id: "blk-faq", type: "site-faq", visible: true, data: { title: "Dúvidas Frequentes", subtitle: "", items: [{ question: "Atendem emergência?", answer: "Sim, temos plantão 24h para emergências." }, { question: "Quais animais atendem?", answer: "Cães, gatos, aves e animais exóticos." }, { question: "Aceitam convênio pet?", answer: "Sim, trabalhamos com os principais convênios." }, { question: "Fazem cirurgias?", answer: "Sim, temos centro cirúrgico completo." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
      ],
    }),
  },

  // ============================================
  // 15. CONSULTING
  // Extras: counter, timeline, logos, depoimentos, video, pricing-table, banner
  // ============================================
  {
    id: "consulting", name: "Consultoria", description: "Consultoria empresarial premium com metodologia e pacotes.", category: "consultoria" as SiteCategory,
    config: makeSiteConfig({
      id: "consulting", title: "Consultoria",
      colors: { gold: "#7C3AED", goldLight: "#8B5CF6", goldDark: "#6D28D9", background: "#FAFAFA", foreground: "#1E1B4B", beige: "#F5F3FF", nude: "#EDE9FE", cream: "#FAFAFA" },
      fonts: { heading: "Inter", body: "Inter" },
      heroAlign: "left",
      hero: { title: "Acelere o Crescimento do Seu Negócio", subtitle: "Consultoria estratégica com metodologia comprovada para PMEs e startups.", ctaPrimary: "Diagnóstico Gratuito", ctaSecondary: "Nosso Método" },
      marqueeItems: ["Estratégia", "Crescimento", "Processos", "Resultados", "Gestão"],
      about: { body: "Ajudamos empresas a atingir seu potencial máximo. Nossa metodologia combina análise de dados, planejamento estratégico e acompanhamento contínuo." },
      services: {
        items: [
          { icon: "Search", title: "Diagnóstico Empresarial", description: "Identificamos gargalos e oportunidades de melhoria." },
          { icon: "Map", title: "Planejamento Estratégico", description: "Metas claras e plano de ação detalhado." },
          { icon: "GraduationCap", title: "Mentoria para Gestores", description: "Desenvolvimento de liderança e gestão." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de agendar um diagnóstico gratuito para minha empresa." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Resultados que Falam", subtitle: "", items: [{ value: 300, suffix: "+", label: "Empresas Atendidas" }, { value: 40, suffix: "%", label: "Aumento Médio de Receita" }, { value: 12, suffix: "+", label: "Anos de Mercado" }], columns: 3, duration: 2000, style: "card" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F5F3FF", overlay: 0 }, padding: "lg" } },
        { id: "blk-timeline", type: "timeline", visible: true, data: { sectionLabel: "Metodologia", title: "Nossa Metodologia em 5 Passos", subtitle: "Um processo estruturado para resultados previsíveis.", layout: "alternating", connectorStyle: "dashed", items: [{ icon: "Search", period: "Passo 1", title: "Diagnóstico", description: "Análise profunda do cenário atual da empresa." }, { icon: "Map", period: "Passo 2", title: "Planejamento", description: "Criação do plano estratégico personalizado." }, { icon: "Zap", period: "Passo 3", title: "Implementação", description: "Execução das mudanças com acompanhamento." }, { icon: "BarChart", period: "Passo 4", title: "Otimização", description: "Ajustes baseados em dados e resultados." }, { icon: "TrendingUp", period: "Passo 5", title: "Escala", description: "Replicação do sucesso para novas áreas." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-video", type: "video", visible: true, data: { sectionLabel: "Apresentação", title: "Conheça nossa abordagem", url: "", subtitle: "", aspectRatio: "16:9", maxWidth: "md", rounded: true, shadow: true, autoplay: false }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F5F3FF", overlay: 0 }, padding: "lg" } },
        { id: "blk-logos", type: "site-logos", visible: true, data: { title: "Clientes que Confiam em Nós", items: [{ image: "", alt: "Empresa A", url: "#" }, { image: "", alt: "Empresa B", url: "#" }, { image: "", alt: "Empresa C", url: "#" }, { image: "", alt: "Empresa D", url: "#" }, { image: "", alt: "Empresa E", url: "#" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "md" } },
        { id: "blk-depoimentos", type: "depoimentos", visible: true, data: { sectionLabel: "Cases", title: "Clientes que Cresceram", items: [{ name: "Paulo R.", role: "CEO, TechCo", text: "A consultoria triplicou nosso faturamento em 1 ano.", avatar: "" }, { name: "Ana M.", role: "Diretora, StartupX", text: "Processos otimizados e equipe mais produtiva.", avatar: "" }, { name: "Carlos F.", role: "Sócio, AgênciaY", text: "Finalmente conseguimos escalar de forma sustentável.", avatar: "" }] }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#F5F3FF", overlay: 0 }, padding: "lg" } },
        { id: "blk-pricing", type: "pricing-table", visible: true, data: { sectionLabel: "Pacotes", title: "Pacotes de Consultoria", subtitle: "Escolha o nível de suporte ideal para sua empresa.", plans: [{ name: "Essencial", badge: "", highlighted: false, price: "R$ 2.500", currency: "", period: "/mês", description: "Para empresas em estruturação", features: ["Diagnóstico completo", "Reuniões quinzenais", "Relatórios mensais", "Suporte por email"], ctaLabel: "Agendar Diagnóstico", ctaUrl: "#contato" }, { name: "Premium", badge: "Recomendado", highlighted: true, price: "R$ 5.000", currency: "", period: "/mês", description: "Para quem quer acelerar", features: ["Tudo do Essencial", "Reuniões semanais", "Implementação assistida", "Dashboard de KPIs", "Suporte prioritário"], ctaLabel: "Agendar Diagnóstico", ctaUrl: "#contato" }, { name: "Enterprise", badge: "", highlighted: false, price: "Sob consulta", currency: "", period: "", description: "Suporte dedicado completo", features: ["Tudo do Premium", "Consultores dedicados", "Treinamento da equipe", "SLA garantido", "Acompanhamento diário"], ctaLabel: "Falar com Especialista", ctaUrl: "#contato" }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Diagnóstico Gratuito", subtitle: "Descubra onde sua empresa pode melhorar. Agende agora!", backgroundImage: "", overlay: 0, align: "center", ctaText: "Agendar Diagnóstico Gratuito", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#7C3AED", overlay: 0 }, padding: "xl" } },
      ],
    }),
  },

  // ============================================
  // 16. CHURCH
  // Extras: counter, galeria, video, team, timeline, banner
  // ============================================
  {
    id: "church", name: "Igreja & Ministério", description: "Site para igrejas com comunidade, agenda e equipe.", category: "igreja" as SiteCategory,
    config: makeSiteConfig({
      id: "church", title: "Igreja & Ministério",
      colors: { gold: "#7C3AED", goldLight: "#A78BFA", goldDark: "#6D28D9", background: "#FEFCE8", foreground: "#1C1917", beige: "#FEF9C3", nude: "#FEF08A", cream: "#FEFCE8" },
      fonts: { heading: "Cormorant Garamond", body: "Open Sans" },
      hero: { title: "Venha Fazer Parte da Nossa Família", subtitle: "Uma comunidade de fé, amor e transformação. Todos são bem-vindos.", ctaPrimary: "Visite-nos", ctaSecondary: "Nossos Cultos" },
      marqueeItems: ["Fé", "Comunidade", "Amor", "Esperança", "Adoração"],
      about: { body: "Somos uma comunidade acolhedora que vive os princípios do amor e da fé. Cultos inspiradores, grupos de estudo e projetos sociais para todos." },
      services: {
        title: "Nossos Ministérios",
        subtitle: "Caminhos para crescer na fé e servir.",
        items: [
          { icon: "Music", title: "Louvor e Adoração", description: "Momentos de louvor que tocam o coração." },
          { icon: "BookOpen", title: "Grupos de Estudo", description: "Estudo bíblico semanal para todas as idades." },
          { icon: "Heart", title: "Ação Social", description: "Projetos que transformam vidas na comunidade." },
        ],
      },
      contact: { whatsappMessage: "Olá! Gostaria de saber os horários dos cultos." },
      extraBlocks: [
        { id: "blk-counter", type: "counter", visible: true, data: { sectionLabel: "", title: "Nossa Comunidade", subtitle: "", items: [{ value: 500, suffix: "+", label: "Membros" }, { value: 10, suffix: "+", label: "Ministérios" }, { value: 15, suffix: "+", label: "Anos de Fé" }], columns: 3, duration: 2000, style: "simple" }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#FEF9C3", overlay: 0 }, padding: "lg" } },
        { id: "blk-galeria", type: "galeria", visible: true, data: { sectionLabel: "Galeria", title: "Momentos da Comunidade", subtitle: "Celebrando juntos em fé e amor.", images: [{ src: "", alt: "Culto de Adoração" }, { src: "", alt: "Grupo de Jovens" }, { src: "", alt: "Escola Bíblica" }, { src: "", alt: "Ação Social" }, { src: "", alt: "Retiro Espiritual" }, { src: "", alt: "Coral da Igreja" }], columns: 3, style: "grid" }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-video", type: "video", visible: true, data: { sectionLabel: "Ao Vivo", title: "Assista nosso último culto", url: "", subtitle: "", aspectRatio: "16:9", maxWidth: "md", rounded: true, shadow: true, autoplay: false }, layout: { align: "center", fullWidth: false, background: { type: "color", value: "#FEF9C3", overlay: 0 }, padding: "lg" } },
        { id: "blk-team", type: "site-team", visible: true, data: { title: "Nossa Liderança", subtitle: "Servindo com amor e dedicação.", members: [{ name: "Pastor João Silva", role: "Pastor Titular", image: "", social: [] }, { name: "Pastora Maria Silva", role: "Copastora", image: "", social: [] }, { name: "Diácono Pedro Santos", role: "Líder de Jovens", image: "", social: [{ platform: "instagram", url: "#" }] }], columns: 3 }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-timeline", type: "timeline", visible: true, data: { sectionLabel: "Agenda", title: "Programação Semanal", subtitle: "Venha participar dos nossos encontros.", layout: "vertical", connectorStyle: "dots", items: [{ icon: "Church", period: "Domingo", title: "Culto de Celebração", description: "Domingo às 10h e 18h — Todos são bem-vindos!" }, { icon: "Heart", period: "Quarta", title: "Culto de Oração", description: "Quarta-feira às 19h30 — Momento de intercessão." }, { icon: "Users", period: "Sexta", title: "Grupo de Jovens", description: "Sexta-feira às 20h — Louvor, palavra e comunhão." }, { icon: "BookOpen", period: "Sábado", title: "Escola Bíblica", description: "Sábado às 9h — Estudo aprofundado da Palavra." }] }, layout: { align: "center", fullWidth: false, background: { type: "none", value: "", overlay: 0 }, padding: "lg" } },
        { id: "blk-banner", type: "site-banner", visible: true, data: { title: "Venha nos Visitar!", subtitle: "Você é bem-vindo(a) em nossa comunidade. Esperamos por você!", backgroundImage: "", overlay: 0, align: "center", ctaText: "Como Chegar", ctaUrl: "#contato" }, layout: { align: "center", fullWidth: true, background: { type: "color", value: "#7C3AED", overlay: 0 }, padding: "xl" } },
      ],
    }),
  },
];

export function getSiteTemplate(id: string): SiteTemplate | undefined {
  return SITE_TEMPLATES.find((t) => t.id === id);
}
