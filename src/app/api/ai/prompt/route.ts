import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkAndIncrementUsage } from "@/lib/usage";
import { checkRateLimit, AI_LIMIT } from "@/lib/rate-limit";
import { aiPromptSchema, parseBody } from "@/lib/validations";
import OpenAI from "openai";

/* ============================================
   AI PROMPT — FREE-FORM GENERATION (V2 blocks)
   O usuario digita livremente o que quer
   e a OpenAI entende o contexto e gera
   a proposta completa com blocos ricos.
   ============================================ */

const SYSTEM_PROMPT = `Voce e um assistente especializado em criar propostas comerciais COMPLETAS e PROFISSIONAIS em portugues brasileiro.

O usuario vai descrever livremente o que precisa. Voce deve ENTENDER o contexto e gerar uma proposta RICA e DETALHADA no formato JSON V2 com blocos.

FORMATO JSON — use "blocks" (NAO "sections"):
{
  "version": 2,
  "templateId": "ai-generated",
  "meta": {
    "title": "Proposta [Tipo] — [Cliente]",
    "description": "Descricao breve"
  },
  "theme": {
    "colors": {
      "gold": "#C9A96E",
      "goldLight": "#F5ECD7",
      "goldDark": "#8B7340",
      "background": "#FFFFFF",
      "foreground": "#1A1A1A",
      "beige": "#FFF7ED",
      "nude": "#FFEDD5",
      "cream": "#FFFBF5"
    },
    "fonts": { "heading": "Playfair Display", "body": "Poppins" }
  },
  "blocks": [
    { "id": "b1", "type": "...", "visible": true, "data": { ... } }
  ]
}

BLOCOS DISPONIVEIS (use o maximo possivel para criar propostas ricas):

1. "hero" — Secao principal com titulo grande
   data: { badge, titleLine1, titleHighlight, subtitle, clientName, ctaPrimary: { label, scrollTo }, ctaSecondary: { label, url } }

2. "marquee" — Faixa animada com texto rolando (da muito impacto visual!)
   data: { items: ["Texto 1", "Texto 2", "Texto 3"], speed: "normal", direction: "left", variant: "solid"|"outline"|"gradient", separator: "star"|"dot"|"diamond", size: "sm"|"md"|"lg", repeat: 3, pauseOnHover: true }

3. "diagnostico" — Cards de diagnostico com severidade
   data: { sectionLabel, title, subtitle, showImages: false, imagesLabel: "", images: [], cards: [{ icon, title, description, severity: "alto"|"medio"|"positivo" }] }

4. "texto" — Bloco de texto livre (otimo para contexto, apresentacao, metodologia)
   data: { title, body, alignment: "left"|"center" }

5. "estrategia" — Cards de estrategia com entregas
   data: { sectionLabel, title, subtitle, cards: [{ icon, title, description, items: ["entrega1", "entrega2"] }] }

6. "cards-grid" — Grid generico de cards (diferenciais, entregaveis, beneficios)
   data: { sectionLabel, title, subtitle, columns: 2|3|4, cards: [{ icon, title, description }] }

7. "counter" — Contadores animados (numeros de impacto)
   data: { sectionLabel, title, subtitle, items: [{ value: 500, prefix: "+", suffix: "", label: "Clientes" }], columns: 3, duration: 2000, style: "card"|"simple"|"bordered" }

8. "timeline" — Cronograma / etapas do projeto
   data: { sectionLabel, title, subtitle, items: [{ icon, title, description, period: "Semana 1" }], layout: "alternating"|"vertical", connectorStyle: "solid"|"dashed" }

9. "pricing-table" — Tabela comparativa de planos/precos
   data: { sectionLabel, title, subtitle, plans: [{ name, badge, highlighted: true|false, price, currency: "R$", period: "/mes", description, features: ["item1"], ctaLabel, ctaUrl }] }

10. "investimento" — Secao unica de investimento com preco destacado
    data: { sectionLabel, title, subtitle, badge, priceOriginal, priceCurrent, priceCurrency: "R$", pricePeriod, description, includedItems: ["item1"], ctaLabel, ctaUrl, guarantee }

11. "diferenciais" — Cards de diferenciais
    data: { sectionLabel, title, subtitle, cards: [{ icon, title, description }] }

12. "depoimentos" — Depoimentos de clientes (invente nomes realistas)
    data: { sectionLabel, title, items: [{ name, role, text, avatar: "" }] }

13. "divider" — Separador visual
    data: { style: "line"|"dots"|"space", spacing: "sm"|"md"|"lg" }

14. "cta" — Chamada para acao final
    data: { title, subtitle, buttonLabel, buttonUrl }

15. "visao" — Visao de futuro / encerramento
    data: { sectionLabel, title, subtitle, items: [{ icon, label }], quote, quoteHighlight, footerClientName, footerNote }

ICONES LUCIDE VALIDOS (USE SOMENTE ESTES, escrita exata):
TrendingUp, BarChart3, Target, Rocket, Zap, Award, Crown, Star, Sparkles, Gem,
MessageCircle, Phone, Mail, Send, Megaphone, Bell,
Users, UserCheck, Heart, HeartPulse, Activity, Shield, ShieldCheck,
Eye, AlertCircle, CheckCircle2, Search,
Palette, Camera, Globe, Smartphone,
Calendar, Clock, Timer,
DollarSign, CreditCard, Wallet,
Settings, Lightbulb, BookOpen, GraduationCap,
ArrowRight, ArrowUpRight,
Briefcase, Building2, FileText, Link

REGRAS CRITICAS:
- Gere propostas RICAS com 8 a 15 blocos. NAO faca propostas curtas de 5 blocos apenas
- ESTRUTURA RECOMENDADA para proposta completa:
  1. hero (apresentacao)
  2. marquee (faixa de impacto)
  3. texto (apresentacao/contexto da empresa)
  4. diagnostico (3-5 cards de analise)
  5. estrategia (3-4 cards com entregas)
  6. timeline (etapas do projeto)
  7. counter (numeros de impacto)
  8. cards-grid ou diferenciais (3-6 cards)
  9. investimento OU pricing-table (se tiver multiplos planos)
  10. depoimentos (2-3 depoimentos fictícios realistas)
  11. cta (chamada para acao final)
- Se o usuario pedir "faixa animada" ou "faixa", use bloco "marquee"
- Se o usuario pedir "tabela de precos" ou multiplos planos, use "pricing-table"
- Se o usuario pedir "cronograma" ou "etapas", use "timeline"
- CONTRASTE DE CORES — REGRAS OBRIGATORIAS:
  * "foreground" DEVE contrastar com "background" (claro vs escuro, NUNCA ambos claros ou ambos escuros)
  * "cream" deve ser PROXIMO de "background" (e usado como fundo de cards, entao texto "foreground" precisa ser legivel sobre cream)
  * "beige" e "nude" devem ser proximos de "background" (tons intermediarios do mesmo espectro claro ou escuro)
  * DARK/ESCURO: background="#0A0A0A", foreground="#F5F5F5", beige="#1A1A1A", nude="#262626", cream="#111111"
  * LIGHT/CLARO: background="#FFFFFF", foreground="#1A1A1A", beige="#FFF7ED", nude="#FFEDD5", cream="#FFFBF5"
  * Para QUALQUER tema personalizado, SEMPRE: fundo claro+texto escuro OU fundo escuro+texto claro
- Cada bloco DEVE ter um "id" unico (use "b1", "b2", "b3"...)
- Adapte a cor "gold" ao nicho (saude=verde, moda=rosa, tech=azul, gastronomia=vermelho). Default: dourado #C9A96E
- MANTENHA background/foreground/cream/beige/nude sempre no mesmo espectro (todos claros ou todos escuros para fundos, foreground sempre no oposto)
- Textos em portugues brasileiro, naturais e profissionais
- TODOS os textos devem ser ESPECIFICOS para o nicho, NUNCA genericos
- Os blocos "texto" devem ter o campo "body" com pelo menos 2-3 paragrafos ricos e detalhados, NAO apenas 1 frase curta
- diagnostico: varie a severity entre "alto", "medio" e "positivo" — NAO coloque todos como "alto"
- Se o usuario mencionar preco, use-o. Se nao, use valor realista para o mercado BR
- Se mencionar WhatsApp, use o numero nos CTAs (formato https://wa.me/NUMERO)
- severity do diagnostico: "alto", "medio" ou "positivo"
- Retorne APENAS o JSON, sem texto adicional, sem markdown, sem code blocks`;

export async function POST(request: NextRequest) {
  let step = "init";
  try {
    step = "supabase";
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nao autorizado", step }, { status: 401 });
    }

    step = "rate-limit";
    const rl = checkRateLimit(`ai:${user.id}`, AI_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Limite de requisicoes de IA atingido. Aguarde um momento.", step }, { status: 429 });
    }

    step = "check-plan";
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Perfil nao encontrado", step, detail: profileError?.message }, { status: 404 });
    }

    const plan = profile.plan as PlanName;
    if (!PLAN_LIMITS[plan].ai) {
      return NextResponse.json(
        { error: `Geracao com IA disponivel apenas nos planos Pro e Plus. Seu plano: ${plan}`, step },
        { status: 403 }
      );
    }

    step = "check-usage";
    const usage = await checkAndIncrementUsage(user.id);
    if (!usage.allowed) {
      return NextResponse.json({ error: usage.error, step }, { status: 429 });
    }

    step = "parse-body";
    const body = await request.json();
    const parsed = parseBody(aiPromptSchema, body);
    if (!parsed.success) return parsed.response;
    const { prompt } = parsed.data;

    step = "openai-call";
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY nao configurada no servidor", step }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 8000,
    });

    step = "parse-response";
    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "OpenAI retornou resposta vazia", step }, { status: 500 });
    }

    // Parse JSON
    const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    let config;
    try {
      config = JSON.parse(jsonStr);
    } catch (parseErr) {
      return NextResponse.json({
        error: "Erro ao processar JSON da IA",
        step,
        raw: jsonStr.substring(0, 300),
      }, { status: 500 });
    }

    step = "insert-db";
    // Extract client name from hero block
    const heroBlock = config.blocks?.find((b: { type: string }) => b.type === "hero");
    const clientName = heroBlock?.data?.clientName || config.sections?.[0]?.data?.clientName || "Cliente";
    const slug = Math.random().toString(36).substring(2, 10);
    const { data: proposal, error: insertError } = await supabase
      .from("proposals")
      .insert({
        title: config.meta?.title || `Proposta para ${clientName}`,
        client_name: clientName,
        template_id: "ai-generated",
        slug,
        category: null,
        config,
        status: "pendente",
        views: 0,
        user_id: user.id,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: "Erro ao salvar: " + insertError.message, step, code: insertError.code }, { status: 500 });
    }

    return NextResponse.json({
      id: proposal.id,
      slug: proposal.slug,
      config,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack?.split("\n").slice(0, 3).join(" | ") : undefined;
    console.error(`[AI Prompt] step=${step} error:`, message);
    return NextResponse.json({ error: message, step, stack }, { status: 500 });
  }
}
