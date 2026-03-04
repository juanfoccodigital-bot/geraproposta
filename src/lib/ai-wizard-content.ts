import type { ProposalConfig } from "@/types/proposal";

/* ============================================
   AI WIZARD — CONTENT MAPS & GENERATION
   Conteudo pre-escrito por nicho para o wizard
   de geracao de propostas "com IA".
   Nenhuma LLM e usada — tudo e estatico.
   ============================================ */

// ── Tipos ──
export interface WizardFormData {
  companyName: string;
  businessType: string;
  usageType: "personal" | "business";
  clientName: string;
  objectives: string;
  // Pricing & contact
  priceCurrent: string;
  priceOriginal: string;
  pricePeriod: string;
  whatsappNumber: string;
  includedItems: string[];
  guarantee: string;
  // Visual
  colorPaletteId: string;
  stylePreference: "light" | "dark";
  selectedTemplateId: string;
}

// ── Paletas de cores ──
export const COLOR_PALETTES = [
  { id: "gold", label: "Dourado", gold: "#C9A96E", goldLight: "#F5ECD7", goldDark: "#8B7340", bg: "#FDFBF8" },
  { id: "blue", label: "Azul", gold: "#4A7BC7", goldLight: "#D0DEF5", goldDark: "#2C5A9E", bg: "#F8FAFD" },
  { id: "green", label: "Verde", gold: "#22C55E", goldLight: "#DCFCE7", goldDark: "#15803D", bg: "#F0FDF4" },
  { id: "pink", label: "Rosa", gold: "#C4727F", goldLight: "#F5D5DA", goldDark: "#9E4A56", bg: "#FDF2F8" },
  { id: "purple", label: "Roxo", gold: "#8B5CF6", goldLight: "#DDD6FE", goldDark: "#6D28D9", bg: "#0D0D0D" },
  { id: "orange", label: "Laranja", gold: "#F97316", goldLight: "#FED7AA", goldDark: "#C2410C", bg: "#FFF7ED" },
  { id: "neon", label: "Neon", gold: "#00FF88", goldLight: "#B2FFD6", goldDark: "#00B85E", bg: "#0A0A0A" },
  { id: "red", label: "Vermelho", gold: "#EF4444", goldLight: "#FECACA", goldDark: "#B91C1C", bg: "#0D0D0D" },
] as const;

// ── Conteudo por nicho ──
interface NicheContent {
  hero: { badge: string; titleLine1: string; titleHighlight: string; subtitle: string };
  diagnostico: {
    title: string;
    subtitle: string;
    cards: { icon: string; title: string; description: string; severity: "alto" | "medio" | "positivo" }[];
  };
  estrategia: {
    title: string;
    subtitle: string;
    cards: { icon: string; title: string; description: string; items: string[] }[];
  };
  visao: {
    items: { icon: string; label: string }[];
    quote: string;
    quoteHighlight: string;
  };
}

export const NICHE_CONTENT: Record<string, NicheContent> = {
  "social-media": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Gestao de Redes Sociais",
      titleHighlight: "que Gera Resultados",
      subtitle: "Transforme suas redes sociais em uma maquina de atracao de clientes com conteudo estrategico e posicionamento profissional.",
    },
    diagnostico: {
      title: "Analise da Presenca Digital",
      subtitle: "Identificamos os principais pontos de atencao para potencializar suas redes sociais.",
      cards: [
        { icon: "Eye", title: "Baixa Visibilidade nas Redes", description: "O perfil atual nao transmite a autoridade e profissionalismo necessarios. Publicacoes sem padrao visual e frequencia irregular reduzem o alcance organico.", severity: "alto" },
        { icon: "Users", title: "Engajamento Abaixo do Potencial", description: "A comunidade nao interage com o conteudo. Faltam estrategias de engajamento, CTAs claros e conteudo que gere conversas com o publico.", severity: "alto" },
        { icon: "Palette", title: "Identidade Visual Inconsistente", description: "A comunicacao visual nao possui coerencia entre cores, tipografia e estilo. Isso prejudica o reconhecimento da marca no feed.", severity: "medio" },
        { icon: "Star", title: "Potencial de Marca Forte", description: "A marca possui diferenciais claros que podem ser amplificados com uma estrategia de conteudo bem estruturada.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Acao Personalizado",
      subtitle: "Estrategia completa para transformar suas redes sociais em um canal de vendas.",
      cards: [
        { icon: "Sparkles", title: "Conteudo Estrategico", description: "Producao de conteudo profissional alinhado com os objetivos do negocio.", items: ["Planejamento editorial mensal", "Producao de carrosseis e reels", "Stories diarios com engajamento", "Conteudo educativo e de autoridade"] },
        { icon: "TrendingUp", title: "Crescimento Organico", description: "Tecnicas para aumentar alcance e seguidores de forma organica e qualificada.", items: ["Hashtags estrategicas por nicho", "Horarios otimizados de publicacao", "Colaboracoes e parcerias", "Reels com tendencias do momento"] },
        { icon: "MessageCircle", title: "Engajamento & Conversao", description: "Transformar seguidores em clientes com estrategias de relacionamento.", items: ["Scripts para Direct e comentarios", "Sequencias de Stories para vendas", "Prova social e depoimentos", "CTAs estrategicos em cada post"] },
      ],
    },
    visao: {
      items: [
        { icon: "TrendingUp", label: "Crescimento consistente de seguidores qualificados" },
        { icon: "Heart", label: "Comunidade engajada que interage diariamente" },
        { icon: "Award", label: "Reconhecimento como referencia no nicho" },
        { icon: "ShoppingBag", label: "Vendas recorrentes vindas das redes sociais" },
      ],
      quote: "Uma marca que se posiciona com estrategia nas redes sociais atrai clientes que valorizam qualidade.",
      quoteHighlight: "estrategia nas redes sociais",
    },
  },

  "trafego-pago": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Trafego Pago",
      titleHighlight: "de Alta Performance",
      subtitle: "Campanhas estrategicas de anuncios para atrair clientes qualificados e maximizar o retorno sobre investimento.",
    },
    diagnostico: {
      title: "Diagnostico de Performance",
      subtitle: "Analise dos pontos criticos que impactam seus resultados em anuncios.",
      cards: [
        { icon: "Target", title: "Segmentacao Imprecisa", description: "As campanhas atuais nao atingem o publico ideal. Sem segmentacao avancada, o orcamento e desperdicado em cliques que nao convertem.", severity: "alto" },
        { icon: "BarChart3", title: "Custo por Lead Elevado", description: "O custo de aquisicao esta acima do mercado. Faltam otimizacoes em criativos, copys e paginas de destino para reduzir o CPL.", severity: "alto" },
        { icon: "RefreshCw", title: "Ausencia de Remarketing", description: "Visitantes que demonstraram interesse nao sao impactados novamente. Uma estrategia de remarketing pode recuperar ate 30% dos leads perdidos.", severity: "medio" },
        { icon: "Zap", title: "Oportunidade de Escala", description: "O mercado e a demanda permitem escalar rapidamente com o orcamento certo e campanhas otimizadas.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Estrategia de Trafego",
      subtitle: "Plano completo para maximizar resultados com anuncios pagos.",
      cards: [
        { icon: "Target", title: "Campanhas Segmentadas", description: "Estrutura de campanhas com publicos estrategicos para cada etapa do funil.", items: ["Publicos frios por interesse e comportamento", "Lookalike dos melhores clientes", "Remarketing de visitantes e engajadores", "Exclusao de publicos irrelevantes"] },
        { icon: "Sparkles", title: "Criativos de Alta Conversao", description: "Producao de anuncios que captam atencao e geram cliques qualificados.", items: ["Testes A/B de imagens e videos", "Copys persuasivas com gatilhos mentais", "Variacoes de formato por plataforma", "Otimizacao continua por metricas"] },
        { icon: "TrendingUp", title: "Otimizacao & Escala", description: "Analise constante para reduzir custos e escalar resultados.", items: ["Dashboard de metricas em tempo real", "Ajustes semanais de orcamento", "Relatorios mensais de ROI", "Estrategia de escala progressiva"] },
      ],
    },
    visao: {
      items: [
        { icon: "DollarSign", label: "ROI positivo e previsivel todo mes" },
        { icon: "Users", label: "Fluxo constante de leads qualificados" },
        { icon: "TrendingUp", label: "Custo por lead abaixo da media do mercado" },
        { icon: "BarChart3", label: "Dados claros para decisoes estrategicas" },
      ],
      quote: "Trafego pago bem gerenciado transforma orcamento de marketing em receita previsivel.",
      quoteHighlight: "receita previsivel",
    },
  },

  "design": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Design Grafico",
      titleHighlight: "Profissional & Estrategico",
      subtitle: "Identidade visual que comunica valor, profissionalismo e diferenciacao no mercado.",
    },
    diagnostico: {
      title: "Analise Visual da Marca",
      subtitle: "Pontos identificados na comunicacao visual atual.",
      cards: [
        { icon: "Palette", title: "Identidade Visual Desatualizada", description: "A marca nao transmite modernidade e profissionalismo. Elementos visuais inconsistentes enfraquecem a percepcao de valor.", severity: "alto" },
        { icon: "Layout", title: "Materiais Sem Padrao", description: "Posts, apresentacoes e materiais impressos nao seguem um guia de estilo. Cada peca parece de uma marca diferente.", severity: "alto" },
        { icon: "Eye", title: "Baixo Impacto Visual", description: "Os materiais nao se destacam no feed ou no ponto de venda. Faltam elementos que captem atencao do publico.", severity: "medio" },
        { icon: "Star", title: "Produto/Servico de Qualidade", description: "O produto entregue e excelente — so precisa de uma identidade visual a altura para comunicar esse valor.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Design",
      subtitle: "Estrategia visual completa para elevar a percepcao da marca.",
      cards: [
        { icon: "Palette", title: "Identidade Visual", description: "Criacao ou redesign da identidade completa da marca.", items: ["Logo e variacoes", "Paleta de cores e tipografia", "Manual de marca completo", "Elementos graficos exclusivos"] },
        { icon: "Layout", title: "Materiais de Marketing", description: "Pecas graficas profissionais para todos os pontos de contato.", items: ["Templates para redes sociais", "Cartao de visita e papelaria", "Apresentacoes corporativas", "Materiais para ponto de venda"] },
        { icon: "Sparkles", title: "Design Continuo", description: "Suporte criativo mensal para manter a marca sempre atualizada.", items: ["Pecas mensais para redes sociais", "Adaptacoes para campanhas", "Criativos para anuncios", "Atualizacoes sazonais"] },
      ],
    },
    visao: {
      items: [
        { icon: "Award", label: "Marca reconhecida e memoravel no mercado" },
        { icon: "Eye", label: "Materiais que transmitem profissionalismo" },
        { icon: "Heart", label: "Clientes que se identificam com a marca" },
        { icon: "TrendingUp", label: "Maior percepcao de valor nos produtos/servicos" },
      ],
      quote: "Design profissional nao e custo — e investimento que multiplica o valor percebido da marca.",
      quoteHighlight: "multiplica o valor percebido",
    },
  },

  "webdesign": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Web Design",
      titleHighlight: "Moderno & Funcional",
      subtitle: "Sites e landing pages que convertem visitantes em clientes com design profissional e experiencia otimizada.",
    },
    diagnostico: {
      title: "Analise da Presenca Web",
      subtitle: "Diagnostico do site e presenca digital atual.",
      cards: [
        { icon: "Globe", title: "Site Desatualizado ou Inexistente", description: "A presenca web nao reflete a qualidade dos servicos oferecidos. Visitantes formam opiniao nos primeiros 3 segundos.", severity: "alto" },
        { icon: "Smartphone", title: "Experiencia Mobile Ruim", description: "Mais de 70% do trafego vem de dispositivos moveis. Um site nao responsivo perde a maioria dos visitantes.", severity: "alto" },
        { icon: "Zap", title: "Velocidade de Carregamento", description: "Paginas lentas aumentam a taxa de rejeicao. Cada segundo extra reduz as conversoes em ate 7%.", severity: "medio" },
        { icon: "Search", title: "Oportunidade de SEO", description: "Com um site otimizado, e possivel atrair trafego organico qualificado sem custo por clique.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Desenvolvimento",
      subtitle: "Criacao de uma presenca web profissional e otimizada.",
      cards: [
        { icon: "Layout", title: "Design & UX", description: "Interface moderna com foco em conversao e experiencia do usuario.", items: ["Design responsivo para todos os dispositivos", "Prototipo interativo para aprovacao", "Hierarquia visual estrategica", "CTAs posicionados para conversao"] },
        { icon: "Code", title: "Desenvolvimento", description: "Codigo limpo, rapido e otimizado para performance.", items: ["Desenvolvimento com tecnologias modernas", "Otimizacao de velocidade (Core Web Vitals)", "Integracao com ferramentas de analytics", "Formularios e automacoes"] },
        { icon: "Search", title: "SEO & Performance", description: "Otimizacao para motores de busca desde o lancamento.", items: ["Estrutura semantica otimizada", "Meta tags e Open Graph", "Sitemap e robots.txt", "Monitoramento de metricas pos-lancamento"] },
      ],
    },
    visao: {
      items: [
        { icon: "Globe", label: "Presenca web profissional 24/7" },
        { icon: "Users", label: "Visitantes convertidos em leads qualificados" },
        { icon: "Search", label: "Visibilidade organica no Google" },
        { icon: "Zap", label: "Site rapido com experiencia impecavel" },
      ],
      quote: "Um site profissional e o vendedor que trabalha 24 horas por dia, 7 dias por semana.",
      quoteHighlight: "vendedor que trabalha 24 horas",
    },
  },

  "desenvolvimento": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Desenvolvimento de Software",
      titleHighlight: "Sob Medida",
      subtitle: "Solucoes digitais personalizadas que automatizam processos e impulsionam o crescimento do negocio.",
    },
    diagnostico: {
      title: "Analise de Necessidades",
      subtitle: "Diagnostico dos processos e oportunidades de automacao.",
      cards: [
        { icon: "Clock", title: "Processos Manuais Ineficientes", description: "Tarefas repetitivas consomem tempo da equipe que poderia ser investido em atividades estrategicas e atendimento ao cliente.", severity: "alto" },
        { icon: "Database", title: "Dados Descentralizados", description: "Informacoes espalhadas em planilhas, e-mails e sistemas diferentes dificultam a tomada de decisao e geram retrabalho.", severity: "alto" },
        { icon: "Shield", title: "Riscos de Seguranca", description: "Processos manuais e ferramentas inadequadas aumentam o risco de erros, perda de dados e vulnerabilidades.", severity: "medio" },
        { icon: "Zap", title: "Alta Demanda de Mercado", description: "O negocio tem demanda crescente — uma solucao digital pode escalar operacoes sem aumentar custos proporcionalmente.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Desenvolvimento",
      subtitle: "Etapas para criar uma solucao digital robusta e escalavel.",
      cards: [
        { icon: "FileText", title: "Discovery & Planejamento", description: "Levantamento detalhado de requisitos e arquitetura da solucao.", items: ["Mapeamento de processos atuais", "Definicao de funcionalidades prioritarias", "Wireframes e prototipo navegavel", "Cronograma de entregas por sprints"] },
        { icon: "Code", title: "Desenvolvimento Agil", description: "Construcao iterativa com entregas frequentes e feedback continuo.", items: ["Frontend moderno e responsivo", "Backend robusto e escalavel", "Integracoes com APIs externas", "Testes automatizados"] },
        { icon: "Rocket", title: "Deploy & Suporte", description: "Lancamento e acompanhamento pos-entrega.", items: ["Deploy em infraestrutura cloud", "Treinamento da equipe", "Monitoramento de performance", "Suporte tecnico por 90 dias"] },
      ],
    },
    visao: {
      items: [
        { icon: "Zap", label: "Processos automatizados e eficientes" },
        { icon: "TrendingUp", label: "Escalabilidade sem aumento de custos" },
        { icon: "Shield", label: "Dados seguros e centralizados" },
        { icon: "Clock", label: "Mais tempo para focar no que importa" },
      ],
      quote: "Tecnologia bem aplicada transforma problemas operacionais em vantagem competitiva.",
      quoteHighlight: "vantagem competitiva",
    },
  },

  "marketing": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Marketing Digital",
      titleHighlight: "Completo & Estrategico",
      subtitle: "Estrategia integrada de marketing para atrair, engajar e converter clientes no ambiente digital.",
    },
    diagnostico: {
      title: "Diagnostico de Marketing",
      subtitle: "Analise da presenca e estrategia digital atual.",
      cards: [
        { icon: "Target", title: "Ausencia de Estrategia Integrada", description: "Acoes isoladas em diferentes canais sem uma estrategia unificada reduzem a eficiencia e desperdicam recursos.", severity: "alto" },
        { icon: "BarChart3", title: "Metricas Sem Acompanhamento", description: "Sem dashboards e KPIs claros, nao e possivel medir o retorno das acoes de marketing e tomar decisoes embasadas.", severity: "alto" },
        { icon: "Users", title: "Funil de Vendas Indefinido", description: "Falta clareza nas etapas de atracao, nutriacao e conversao. Leads entram mas nao percorrem a jornada de compra.", severity: "medio" },
        { icon: "Star", title: "Marca com Potencial", description: "O posicionamento e os diferenciais existem — falta uma estrategia para comunica-los de forma eficaz.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Estrategia de Marketing",
      subtitle: "Plano integrado para todos os canais digitais.",
      cards: [
        { icon: "Sparkles", title: "Conteudo & Inbound", description: "Atracao de leads qualificados atraves de conteudo relevante.", items: ["Blog com artigos otimizados para SEO", "E-books e materiais ricos", "Email marketing com automacao", "Redes sociais com conteudo estrategico"] },
        { icon: "Target", title: "Performance & Trafego", description: "Campanhas pagas para resultados imediatos e escalaveis.", items: ["Google Ads e Meta Ads", "Remarketing multi-canal", "Landing pages otimizadas", "Testes e otimizacao continua"] },
        { icon: "BarChart3", title: "Analytics & Growth", description: "Dados e insights para decisoes estrategicas.", items: ["Dashboard de KPIs personalizado", "Relatorios semanais de performance", "Testes A/B de mensagens e canais", "Reunioes mensais de resultado"] },
      ],
    },
    visao: {
      items: [
        { icon: "TrendingUp", label: "Crescimento previsivel e sustentavel" },
        { icon: "Users", label: "Funil de vendas otimizado e eficiente" },
        { icon: "BarChart3", label: "Decisoes baseadas em dados reais" },
        { icon: "Award", label: "Marca forte e reconhecida no mercado" },
      ],
      quote: "Marketing digital estrategico transforma presenca online em receita previsivel e escalavel.",
      quoteHighlight: "receita previsivel e escalavel",
    },
  },

  "consultoria": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Consultoria Estrategica",
      titleHighlight: "para Resultados Reais",
      subtitle: "Diagnostico profundo e plano de acao personalizado para acelerar o crescimento do seu negocio.",
    },
    diagnostico: {
      title: "Diagnostico Empresarial",
      subtitle: "Pontos criticos identificados na operacao atual.",
      cards: [
        { icon: "Target", title: "Falta de Foco Estrategico", description: "Energia e recursos dispersos em muitas frentes sem priorizacao clara. O negocio precisa de direcao e metas definidas.", severity: "alto" },
        { icon: "BarChart3", title: "Processos Sem Metricas", description: "Decisoes tomadas por intuicao, nao por dados. Sem indicadores claros nao ha como medir progresso e corrigir rota.", severity: "alto" },
        { icon: "Users", title: "Equipe Desalinhada", description: "Falta de processos claros e comunicacao eficiente entre areas gera retrabalho e frustracao na equipe.", severity: "medio" },
        { icon: "Star", title: "Mercado com Demanda", description: "O mercado apresenta oportunidades claras de crescimento para quem se posicionar com estrategia.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Consultoria",
      subtitle: "Metodologia testada para transformar diagnostico em resultados.",
      cards: [
        { icon: "Search", title: "Analise & Diagnostico", description: "Imersao profunda no negocio para entender cenario completo.", items: ["Entrevistas com stakeholders", "Analise de dados e metricas", "Mapeamento de processos", "Benchmarking de mercado"] },
        { icon: "Map", title: "Planejamento Estrategico", description: "Definicao de metas, prioridades e plano de acao.", items: ["Definicao de OKRs e KPIs", "Roadmap trimestral de acoes", "Priorizacao por impacto e esforco", "Alocacao de recursos"] },
        { icon: "Rocket", title: "Implementacao & Mentoria", description: "Acompanhamento da execucao e mentoria para a equipe.", items: ["Reunioes semanais de acompanhamento", "Mentoria para lideranca", "Ajustes de rota baseados em dados", "Relatorio final de resultados"] },
      ],
    },
    visao: {
      items: [
        { icon: "Target", label: "Metas claras e acompanhamento constante" },
        { icon: "TrendingUp", label: "Crescimento sustentavel e previsivel" },
        { icon: "Users", label: "Equipe alinhada e produtiva" },
        { icon: "Award", label: "Negocio preparado para escalar" },
      ],
      quote: "Consultoria estrategica e o atalho entre onde voce esta e onde quer chegar.",
      quoteHighlight: "atalho entre onde voce esta",
    },
  },

  "fotografia": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Fotografia & Video",
      titleHighlight: "Profissional",
      subtitle: "Imagens e videos que contam historias, transmitem emocao e elevam a percepcao da sua marca.",
    },
    diagnostico: {
      title: "Analise de Imagem",
      subtitle: "Diagnostico da comunicacao visual atual.",
      cards: [
        { icon: "Camera", title: "Fotos Amadoras ou Genericas", description: "Imagens de banco ou fotos sem producao profissional nao transmitem a qualidade real dos produtos e servicos.", severity: "alto" },
        { icon: "Video", title: "Ausencia de Conteudo em Video", description: "Video e o formato com maior engajamento. Sem ele, oportunidades de conexao com o publico sao desperdicadas.", severity: "alto" },
        { icon: "Palette", title: "Falta de Direcao de Arte", description: "As imagens nao seguem uma linha estetica coerente. Cada producao tem um estilo diferente.", severity: "medio" },
        { icon: "Star", title: "Produto Visual Atrativo", description: "O produto/servico e visualmente atrativo e se beneficia enormemente de uma producao profissional.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Producao",
      subtitle: "Estrategia completa de producao visual.",
      cards: [
        { icon: "Camera", title: "Ensaio Fotografico", description: "Producao profissional de imagens para todos os pontos de contato.", items: ["Direcao de arte e planejamento", "Ensaio com iluminacao profissional", "Edicao e tratamento de imagens", "Entrega em alta resolucao"] },
        { icon: "Video", title: "Producao de Video", description: "Videos profissionais para redes sociais e institucional.", items: ["Roteiro e storyboard", "Filmagem com equipamento profissional", "Edicao e motion graphics", "Adaptacao para diferentes formatos"] },
        { icon: "Sparkles", title: "Conteudo Recorrente", description: "Producao mensal para manter a comunicacao visual atualizada.", items: ["Ensaios mensais de produtos/servicos", "Videos curtos para Reels e Stories", "Banco de imagens exclusivo", "Conteudo sazonal e campanhas"] },
      ],
    },
    visao: {
      items: [
        { icon: "Eye", label: "Imagens que captam atencao no primeiro olhar" },
        { icon: "Heart", label: "Conexao emocional com o publico" },
        { icon: "Award", label: "Percepcao de marca premium" },
        { icon: "TrendingUp", label: "Mais engajamento e conversao" },
      ],
      quote: "Uma imagem profissional vale mais que mil palavras — e pode valer muito mais em vendas.",
      quoteHighlight: "vale mais que mil palavras",
    },
  },

  "saude": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Posicionamento Digital",
      titleHighlight: "para Profissionais de Saude",
      subtitle: "Transforme sua presenca digital e atraia pacientes qualificados com uma estrategia completa e etica.",
    },
    diagnostico: {
      title: "Analise da Presenca Digital",
      subtitle: "Diagnostico do posicionamento online atual.",
      cards: [
        { icon: "Eye", title: "Baixa Visibilidade Online", description: "O perfil nao transmite a autoridade e credibilidade que voce possui. Pacientes buscam profissionais online antes de agendar.", severity: "alto" },
        { icon: "Target", title: "Ausencia de Trafego Estrategico", description: "Sem campanhas segmentadas, a captacao depende exclusivamente de indicacoes. Pacientes da regiao nao encontram voce.", severity: "alto" },
        { icon: "Users", title: "Funil de Captacao Limitado", description: "O processo de atracamento e agendamento nao possui etapas claras. Interessados se perdem no caminho.", severity: "medio" },
        { icon: "Star", title: "Reputacao Positiva", description: "Avaliacoes positivas e pacientes satisfeitos sao um ativo valioso que pode ser amplificado estrategicamente.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Acao",
      subtitle: "Estrategia etica e eficiente para atrair pacientes qualificados.",
      cards: [
        { icon: "Sparkles", title: "Conteudo de Autoridade", description: "Posicionamento como referencia na area de atuacao.", items: ["Conteudo educativo sobre procedimentos", "Carrosseis com informacoes relevantes", "Stories com bastidores e humanizacao", "Depoimentos e resultados (com autorizacao)"] },
        { icon: "Target", title: "Captacao de Pacientes", description: "Campanhas segmentadas para atrair o perfil ideal de paciente.", items: ["Anuncios para publico da regiao", "Landing page de agendamento", "Remarketing para interessados", "WhatsApp Business integrado"] },
        { icon: "MessageCircle", title: "Relacionamento", description: "Nutricao e fidelizacao de pacientes.", items: ["Sequencia de boas-vindas por WhatsApp", "Follow-up pos consulta", "Programa de indicacao", "Comunicacao em datas especiais"] },
      ],
    },
    visao: {
      items: [
        { icon: "Calendar", label: "Agenda preenchida com pacientes ideais" },
        { icon: "Award", label: "Reconhecimento como autoridade na regiao" },
        { icon: "Heart", label: "Pacientes fieis que indicam seus servicos" },
        { icon: "TrendingUp", label: "Crescimento sustentavel e etico" },
      ],
      quote: "Profissionais de saude que se posicionam no digital atraem pacientes que valorizam qualidade e expertise.",
      quoteHighlight: "qualidade e expertise",
    },
  },

  "educacao": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Lancamento Digital",
      titleHighlight: "para Infoprodutos & Cursos",
      subtitle: "Estrategia completa para lancar, vender e escalar seu curso ou infoproduto no mercado digital.",
    },
    diagnostico: {
      title: "Analise do Cenario",
      subtitle: "Diagnostico das oportunidades e desafios do lancamento.",
      cards: [
        { icon: "Users", title: "Audiencia Nao Qualificada", description: "Seguidores que nao estao prontos para comprar. Falta uma estrategia de nutriacao que leve o publico da consciencia a decisao.", severity: "alto" },
        { icon: "ShoppingBag", title: "Funil de Vendas Incompleto", description: "Sem um funil estruturado, leads entram mas nao percorrem a jornada de compra ate a conversao.", severity: "alto" },
        { icon: "MessageCircle", title: "Copy Sem Persuasao", description: "Paginas de vendas e conteudos sem gatilhos mentais e storytelling que conectem com as dores do publico.", severity: "medio" },
        { icon: "Star", title: "Expertise Comprovada", description: "Conhecimento solido e resultados que podem ser transformados em provas sociais poderosas.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Estrategia de Lancamento",
      subtitle: "Plano completo do pre-lancamento a entrega.",
      cards: [
        { icon: "Sparkles", title: "Pre-Lancamento", description: "Construcao de audiencia e antecipacao antes do carrinho abrir.", items: ["Conteudo de aquecimento nas redes", "Lista de espera com lead magnet", "Sequencia de emails de nutriacao", "Lives e conteudos de autoridade"] },
        { icon: "Rocket", title: "Lancamento", description: "Abertura de carrinho com estrategia de urgencia e escassez.", items: ["Pagina de vendas otimizada", "Sequencia de lancamento (4 PLs)", "Campanhas de trafego pago", "Bonus exclusivos por tempo limitado"] },
        { icon: "TrendingUp", title: "Pos-Lancamento", description: "Entrega, fidelizacao e preparacao para o proximo lancamento.", items: ["Onboarding dos alunos", "Comunidade de suporte", "Upsell de produtos complementares", "Analise de metricas e aprendizados"] },
      ],
    },
    visao: {
      items: [
        { icon: "Users", label: "Base de alunos crescente e engajada" },
        { icon: "DollarSign", label: "Receita recorrente com infoprodutos" },
        { icon: "Award", label: "Autoridade reconhecida no nicho" },
        { icon: "TrendingUp", label: "Lancamentos cada vez maiores" },
      ],
      quote: "Conhecimento so se transforma em renda quando voce tem uma estrategia de lancamento eficiente.",
      quoteHighlight: "estrategia de lancamento eficiente",
    },
  },

  "automacao": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Automacao & Tecnologia",
      titleHighlight: "para Escalar Seu Negocio",
      subtitle: "Automatize processos, elimine tarefas repetitivas e libere sua equipe para focar no que gera receita.",
    },
    diagnostico: {
      title: "Diagnostico de Processos",
      subtitle: "Analise dos gargalos e oportunidades de automacao.",
      cards: [
        { icon: "Clock", title: "Tarefas Manuais Repetitivas", description: "A equipe gasta horas em atividades que podem ser automatizadas: envio de emails, atualizacao de planilhas, follow-ups.", severity: "alto" },
        { icon: "RefreshCw", title: "Fluxos Desconectados", description: "Ferramentas e sistemas que nao conversam entre si geram retrabalho, erros e perda de informacao.", severity: "alto" },
        { icon: "Database", title: "Dados Nao Centralizados", description: "Informacoes de clientes e operacoes espalhadas em varios lugares dificultam analises e decisoes.", severity: "medio" },
        { icon: "Zap", title: "Alto Potencial de Automacao", description: "Os processos atuais tem grande potencial de automacao com retorno rapido sobre investimento.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Automacao",
      subtitle: "Implementacao estrategica de automacoes no negocio.",
      cards: [
        { icon: "Search", title: "Mapeamento & Priorizacao", description: "Identificacao dos processos com maior impacto para automacao.", items: ["Mapeamento de fluxos de trabalho", "Priorizacao por ROI e complexidade", "Selecao de ferramentas ideais", "Cronograma de implementacao"] },
        { icon: "Zap", title: "Implementacao", description: "Configuracao e integracao das automacoes.", items: ["Automacao de email marketing", "CRM com fluxos automatizados", "Integracoes entre ferramentas (Zapier/Make)", "Chatbots e respostas automaticas"] },
        { icon: "BarChart3", title: "Monitoramento & Otimizacao", description: "Acompanhamento de resultados e melhorias continuas.", items: ["Dashboard de metricas de eficiencia", "Relatorios de tempo economizado", "Otimizacao de fluxos existentes", "Novas automacoes conforme demanda"] },
      ],
    },
    visao: {
      items: [
        { icon: "Clock", label: "Horas economizadas toda semana" },
        { icon: "Zap", label: "Processos rodando no piloto automatico" },
        { icon: "Shield", label: "Menos erros humanos e mais consistencia" },
        { icon: "TrendingUp", label: "Escala sem aumento proporcional de custos" },
      ],
      quote: "Automacao nao substitui pessoas — libera pessoas para fazer o que maquinas nao podem.",
      quoteHighlight: "libera pessoas",
    },
  },

  "outro": {
    hero: {
      badge: "Proposta Comercial",
      titleLine1: "Solucao Profissional",
      titleHighlight: "Sob Medida Para Voce",
      subtitle: "Uma proposta personalizada para atender suas necessidades e impulsionar seus resultados.",
    },
    diagnostico: {
      title: "Analise do Cenario Atual",
      subtitle: "Identificamos os principais pontos de atencao e oportunidades.",
      cards: [
        { icon: "Target", title: "Oportunidades Nao Exploradas", description: "Existem caminhos de crescimento que ainda nao estao sendo aproveitados. Com a estrategia certa, o potencial e enorme.", severity: "alto" },
        { icon: "BarChart3", title: "Resultados Abaixo do Potencial", description: "Os esforcos atuais nao estao gerando o retorno esperado. Ajustes estrategicos podem mudar esse cenario rapidamente.", severity: "alto" },
        { icon: "Users", title: "Publico Nao Alcancado", description: "O publico-alvo ideal ainda nao esta sendo impactado de forma eficiente. Falta presenca nos canais certos.", severity: "medio" },
        { icon: "Star", title: "Diferenciais Competitivos", description: "O negocio possui qualidades unicas que, bem comunicadas, podem se tornar vantagem competitiva real.", severity: "positivo" },
      ],
    },
    estrategia: {
      title: "Plano de Acao",
      subtitle: "Estrategia personalizada em 3 pilares.",
      cards: [
        { icon: "Search", title: "Analise & Planejamento", description: "Entendimento profundo do cenario para definir a melhor estrategia.", items: ["Pesquisa de mercado e concorrencia", "Definicao de metas e KPIs", "Planejamento de acoes prioritarias", "Cronograma de execucao"] },
        { icon: "Sparkles", title: "Execucao Estrategica", description: "Implementacao das acoes com foco em resultados mensuráveis.", items: ["Acoes priorizadas por impacto", "Entregas semanais com acompanhamento", "Testes e otimizacoes continuas", "Comunicacao transparente de progresso"] },
        { icon: "TrendingUp", title: "Crescimento & Escala", description: "Otimizacao e expansao dos resultados alcancados.", items: ["Analise de metricas e ROI", "Identificacao de novas oportunidades", "Escala das acoes que funcionam", "Relatorio mensal de resultados"] },
      ],
    },
    visao: {
      items: [
        { icon: "TrendingUp", label: "Resultados mensuráveis e consistentes" },
        { icon: "Award", label: "Posicionamento forte no mercado" },
        { icon: "Users", label: "Base de clientes crescente" },
        { icon: "Star", label: "Negocio preparado para o futuro" },
      ],
      quote: "Resultados extraordinarios comecam com uma estrategia clara e execucao consistente.",
      quoteHighlight: "estrategia clara e execucao consistente",
    },
  },
};

// ── Analise de contexto dos objetivos ──
interface ContextSignals {
  wantsMoreClients: boolean;
  wantsBranding: boolean;
  wantsAutomation: boolean;
  wantsSales: boolean;
  wantsPresence: boolean;
  wantsAuthority: boolean;
  wantsScale: boolean;
  mentionedPlatforms: string[];
  mentionedGoals: string[];
  rawText: string;
}

function analyzeObjectives(text: string): ContextSignals {
  const lower = (text || "").toLowerCase();
  const signals: ContextSignals = {
    wantsMoreClients: /cliente|lead|captacao|captar|atrair|prospectar|vend|faturamento|receita|paciente|aluno/.test(lower),
    wantsBranding: /marca|identidade|visual|logo|branding|posicionamento|reconhec/.test(lower),
    wantsAutomation: /automat|processo|eficien|fluxo|sistema|integra|zapier|crm/.test(lower),
    wantsSales: /vend|convert|fatur|lucr|roi|retorno|resultado|fechar/.test(lower),
    wantsPresence: /presenca|visibilidade|alcance|seguid|engaj|rede|social|instagram|tiktok|youtube/.test(lower),
    wantsAuthority: /autoridade|referencia|expert|especialista|mentor|lider/.test(lower),
    wantsScale: /escal|crescer|crescimento|expandir|ampliar|dobrar|triplicar/.test(lower),
    mentionedPlatforms: [],
    mentionedGoals: [],
    rawText: text || "",
  };

  // Detect platforms
  if (/instagram/i.test(lower)) signals.mentionedPlatforms.push("Instagram");
  if (/tiktok/i.test(lower)) signals.mentionedPlatforms.push("TikTok");
  if (/youtube/i.test(lower)) signals.mentionedPlatforms.push("YouTube");
  if (/google/i.test(lower)) signals.mentionedPlatforms.push("Google");
  if (/facebook|meta ads/i.test(lower)) signals.mentionedPlatforms.push("Facebook");
  if (/linkedin/i.test(lower)) signals.mentionedPlatforms.push("LinkedIn");
  if (/whatsapp/i.test(lower)) signals.mentionedPlatforms.push("WhatsApp");
  if (/site|landing|pagina/i.test(lower)) signals.mentionedPlatforms.push("Site");

  // Extract goals as short phrases
  const goalPatterns = [
    /quer(?:o|emos)?\s+(.{5,60}?)(?:\.|,|$)/gi,
    /precis(?:o|amos)?\s+(?:de\s+)?(.{5,60}?)(?:\.|,|$)/gi,
    /objetivo\s+(?:e|é)\s+(.{5,60}?)(?:\.|,|$)/gi,
    /gostaria\s+(?:de\s+)?(.{5,60}?)(?:\.|,|$)/gi,
  ];
  for (const pattern of goalPatterns) {
    let match;
    while ((match = pattern.exec(lower)) !== null) {
      if (match[1] && match[1].trim().length > 4) {
        signals.mentionedGoals.push(match[1].trim());
      }
    }
  }

  return signals;
}

/** Build a personalized subtitle using objectives + niche */
function buildPersonalizedSubtitle(
  niche: NicheContent,
  formData: WizardFormData,
  signals: ContextSignals,
): string {
  const clientRef = formData.usageType === "personal" ? "voce" : formData.clientName;

  // If user wrote specific objectives, weave them in
  if (signals.rawText.length > 15) {
    if (signals.wantsMoreClients && signals.wantsPresence) {
      return `Estrategia personalizada para ${clientRef} atrair mais clientes e fortalecer a presenca digital com resultados mensuráveis.`;
    }
    if (signals.wantsMoreClients) {
      return `Proposta sob medida para ${clientRef} aumentar a captacao de clientes e converter mais oportunidades em resultados reais.`;
    }
    if (signals.wantsBranding) {
      return `Uma identidade visual e posicionamento estrategico para que ${clientRef} seja reconhecido como referencia no mercado.`;
    }
    if (signals.wantsAutomation) {
      return `Automacoes inteligentes para que ${clientRef} ganhe eficiencia, elimine tarefas repetitivas e escale sem aumentar custos.`;
    }
    if (signals.wantsSales) {
      return `Estrategia focada em resultados para ${clientRef} aumentar vendas, melhorar conversoes e maximizar o retorno sobre investimento.`;
    }
    if (signals.wantsScale) {
      return `Plano estrategico para ${clientRef} escalar o negocio de forma sustentavel, com processos otimizados e previsibilidade.`;
    }
    if (signals.wantsAuthority) {
      return `Posicionamento estrategico para ${clientRef} se consolidar como autoridade e referencia no mercado de atuacao.`;
    }
  }

  // Fallback to niche default
  return niche.hero.subtitle;
}

/** Reorder diagnostico cards based on what the user mentioned */
function prioritizeDiagnosticoCards(
  cards: NicheContent["diagnostico"]["cards"],
  signals: ContextSignals,
): NicheContent["diagnostico"]["cards"] {
  if (!signals.rawText || signals.rawText.length < 10) return cards;

  // Score each card based on relevance to objectives
  const scored = cards.map((card) => {
    let score = 0;
    const text = `${card.title} ${card.description}`.toLowerCase();
    if (signals.wantsMoreClients && /cliente|lead|captacao|conversao/.test(text)) score += 3;
    if (signals.wantsSales && /vend|convert|roi|retorno|fatur/.test(text)) score += 3;
    if (signals.wantsPresence && /presenca|visibilidade|alcance|engaj/.test(text)) score += 3;
    if (signals.wantsBranding && /marca|visual|identidade|posicion/.test(text)) score += 3;
    if (signals.wantsAutomation && /process|automat|eficien|manual/.test(text)) score += 3;
    if (signals.wantsAuthority && /autoridade|referencia|expert/.test(text)) score += 3;
    if (signals.wantsScale && /escal|cresc|ampliar/.test(text)) score += 2;
    // Keep "positivo" cards at the end
    if (card.severity === "positivo") score -= 10;
    return { card, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.card);
}

/** Add objective-specific items to estrategia cards */
function enrichEstrategiaCards(
  cards: NicheContent["estrategia"]["cards"],
  signals: ContextSignals,
): NicheContent["estrategia"]["cards"] {
  if (!signals.rawText || signals.rawText.length < 10) return cards;

  return cards.map((card, i) => {
    const enrichedItems = [...card.items];
    // Add platform-specific items to the first card
    if (i === 0 && signals.mentionedPlatforms.length > 0) {
      const platforms = signals.mentionedPlatforms.slice(0, 2).join(" e ");
      enrichedItems.push(`Foco especial em ${platforms}`);
    }
    // Add goal-specific item to the second card
    if (i === 1 && signals.mentionedGoals.length > 0) {
      const goal = signals.mentionedGoals[0];
      const capitalized = goal.charAt(0).toUpperCase() + goal.slice(1);
      enrichedItems.push(capitalized);
    }
    return { ...card, items: enrichedItems.slice(0, 5) };
  });
}

/** Build personalized visao subtitle */
function buildVisaoSubtitle(formData: WizardFormData, signals: ContextSignals): string {
  const clientRef = formData.usageType === "personal" ? "voce" : formData.clientName;

  if (signals.wantsMoreClients) {
    return `Imagine ${clientRef} com uma maquina previsivel de captacao de clientes.`;
  }
  if (signals.wantsSales) {
    return `Imagine ${clientRef} batendo recordes de faturamento mes apos mes.`;
  }
  if (signals.wantsScale) {
    return `Imagine ${clientRef} escalando o negocio de forma sustentavel e lucrativa.`;
  }
  if (signals.wantsBranding) {
    return `Imagine ${clientRef} sendo reconhecido como a principal referencia do mercado.`;
  }
  return `Imagine ${clientRef} alcancando resultados extraordinarios.`;
}

// ── Mensagens da animacao ──
export const GENERATION_MESSAGES = [
  "Analisando seu nicho de atuacao...",
  "Processando seus objetivos...",
  "Selecionando o template ideal...",
  "Personalizando conteudo da proposta...",
  "Ajustando cores e identidade visual...",
  "Finalizando sua proposta...",
];

// ── Geracao do config ──
export function generateProposalConfig(
  formData: WizardFormData,
  baseConfig: ProposalConfig,
): ProposalConfig {
  const config = structuredClone(baseConfig);
  const niche = NICHE_CONTENT[formData.businessType] || NICHE_CONTENT["outro"];
  const palette = COLOR_PALETTES.find((p) => p.id === formData.colorPaletteId);
  const signals = analyzeObjectives(formData.objectives);

  // Helper: replace block/section data by type
  function replaceData(type: string, data: Record<string, unknown>) {
    // V2 blocks
    if (config.blocks) {
      for (const block of config.blocks) {
        if (block.type === type) {
          block.data = { ...block.data, ...data };
          break;
        }
      }
    }
    // V1 sections
    if (config.sections) {
      for (const section of config.sections) {
        if (section.type === type) {
          section.data = { ...section.data, ...data };
          break;
        }
      }
    }
  }

  // Hero — personalized subtitle based on objectives
  const personalizedSubtitle = buildPersonalizedSubtitle(niche, formData, signals);
  replaceData("hero", {
    badge: niche.hero.badge,
    titleLine1: formData.companyName,
    titleHighlight: niche.hero.titleHighlight,
    subtitle: personalizedSubtitle,
    clientName: formData.usageType === "personal"
      ? formData.companyName
      : `${formData.clientName} — Proposta Comercial`,
  });

  // Diagnostico — reorder cards by relevance to objectives
  const prioritizedCards = prioritizeDiagnosticoCards(niche.diagnostico.cards, signals);
  replaceData("diagnostico", {
    title: niche.diagnostico.title,
    subtitle: signals.rawText.length > 15
      ? `Pontos identificados com base nos seus objetivos e no cenario atual.`
      : niche.diagnostico.subtitle,
    cards: prioritizedCards,
  });

  // Estrategia — enrich with platform/goal-specific items
  const enrichedCards = enrichEstrategiaCards(niche.estrategia.cards, signals);
  replaceData("estrategia", {
    title: niche.estrategia.title,
    subtitle: niche.estrategia.subtitle,
    cards: enrichedCards,
  });

  // Visao — personalized subtitle
  replaceData("visao", {
    title: "O Futuro do Seu Negocio",
    subtitle: buildVisaoSubtitle(formData, signals),
    items: niche.visao.items,
    quote: niche.visao.quote,
    quoteHighlight: niche.visao.quoteHighlight,
    footerClientName: formData.usageType === "personal" ? formData.companyName : formData.clientName,
    footerNote: "Proposta valida por 7 dias. Valores e condicoes sujeitos a alteracao apos este prazo.",
  });

  // Investimento (pricing)
  if (formData.priceCurrent) {
    const investimentoData: Record<string, unknown> = {
      priceCurrent: formData.priceCurrent,
      priceCurrency: "R$",
      pricePeriod: formData.pricePeriod || "/mes",
      description: `Investimento para ${formData.usageType === "personal" ? "seu projeto" : formData.clientName}.`,
    };
    if (formData.priceOriginal) investimentoData.priceOriginal = formData.priceOriginal;
    if (formData.includedItems.length > 0) investimentoData.includedItems = formData.includedItems;
    if (formData.guarantee) investimentoData.guarantee = formData.guarantee;
    if (formData.whatsappNumber) {
      const cleanNumber = formData.whatsappNumber.replace(/\D/g, "");
      investimentoData.ctaLabel = "Fechar Proposta";
      investimentoData.ctaUrl = `https://wa.me/${cleanNumber}`;
    }
    replaceData("investimento", investimentoData);
  }

  // Hero CTA — WhatsApp
  if (formData.whatsappNumber) {
    const cleanNumber = formData.whatsappNumber.replace(/\D/g, "");
    replaceData("hero", {
      ctaSecondary: {
        label: "Falar no WhatsApp",
        url: `https://wa.me/${cleanNumber}`,
      },
    });
  }

  // Meta
  config.meta.title = formData.usageType === "personal"
    ? `${formData.companyName} — Proposta`
    : `${formData.companyName} — Proposta para ${formData.clientName}`;
  config.meta.description = personalizedSubtitle;

  // Override theme colors if palette selected
  if (palette) {
    config.theme.colors.gold = palette.gold;
    config.theme.colors.goldLight = palette.goldLight;
    config.theme.colors.goldDark = palette.goldDark;
  }

  return config;
}
