import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkAndIncrementUsage } from "@/lib/usage";
import { checkRateLimit, AI_LIMIT } from "@/lib/rate-limit";
import { aiGenerateSchema, parseBody } from "@/lib/validations";
import OpenAI from "openai";

/* ============================================
   AI PROPOSAL GENERATION (V2 blocks)
   Gera proposta completa via GPT-4o-mini
   Gate: apenas planos Pro e Plus
   ============================================ */

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY nao configurada");
  }
  return new OpenAI({ apiKey });
}

const SYSTEM_PROMPT = `Voce e um assistente especializado em criar propostas comerciais COMPLETAS e PROFISSIONAIS em portugues brasileiro.
Dado o nome do negocio, tipo de servico, nome do cliente e objetivos, gere uma proposta RICA e DETALHADA no formato JSON V2 com blocos.

FORMATO JSON — use "blocks" (NAO "sections"):
{
  "version": 2,
  "templateId": "ai-generated",
  "meta": { "title": "Proposta [Tipo] — [Cliente]", "description": "Descricao breve" },
  "theme": {
    "colors": { "gold": "#C9A96E", "goldLight": "#F5ECD7", "goldDark": "#8B7340", "background": "#FFFFFF", "foreground": "#1A1A1A", "beige": "#FFF7ED", "nude": "#FFEDD5", "cream": "#FFFBF5" },
    "fonts": { "heading": "Playfair Display", "body": "Poppins" }
  },
  "blocks": [
    { "id": "b1", "type": "...", "visible": true, "data": { ... } }
  ]
}

BLOCOS DISPONIVEIS:

1. "hero" — data: { badge, titleLine1, titleHighlight, subtitle, clientName, ctaPrimary: { label, scrollTo }, ctaSecondary: { label, url } }
2. "marquee" — Faixa animada. data: { items: ["Texto1","Texto2"], speed: "normal", direction: "left", variant: "solid"|"outline"|"gradient", separator: "star"|"dot"|"diamond", size: "md", repeat: 3, pauseOnHover: true }
3. "diagnostico" — data: { sectionLabel, title, subtitle, showImages: false, imagesLabel: "", images: [], cards: [{ icon, title, description, severity: "alto"|"medio"|"positivo" }] }
4. "texto" — data: { title, body, alignment: "left"|"center" }
5. "estrategia" — data: { sectionLabel, title, subtitle, cards: [{ icon, title, description, items: ["entrega1"] }] }
6. "cards-grid" — data: { sectionLabel, title, subtitle, columns: 3, cards: [{ icon, title, description }] }
7. "counter" — data: { sectionLabel, title, subtitle, items: [{ value: 500, prefix: "+", suffix: "", label: "Clientes" }], columns: 3, duration: 2000, style: "card" }
8. "timeline" — data: { sectionLabel, title, subtitle, items: [{ icon, title, description, period: "Semana 1" }], layout: "alternating", connectorStyle: "solid" }
9. "pricing-table" — data: { sectionLabel, title, subtitle, plans: [{ name, badge, highlighted, price, currency: "R$", period, description, features: [], ctaLabel, ctaUrl }] }
10. "investimento" — data: { sectionLabel, title, subtitle, badge, priceOriginal, priceCurrent, priceCurrency: "R$", pricePeriod, description, includedItems: [], ctaLabel, ctaUrl, guarantee }
11. "diferenciais" — data: { sectionLabel, title, subtitle, cards: [{ icon, title, description }] }
12. "depoimentos" — data: { sectionLabel, title, items: [{ name, role, text, avatar: "" }] }
13. "divider" — data: { style: "line", spacing: "md" }
14. "cta" — data: { title, subtitle, buttonLabel, buttonUrl }
15. "visao" — data: { sectionLabel, title, subtitle, items: [{ icon, label }], quote, quoteHighlight, footerClientName, footerNote }

ICONES (USE SOMENTE ESTES, escrita exata): TrendingUp, BarChart3, Target, Rocket, Zap, Award, Crown, Star, Sparkles, Gem, MessageCircle, Phone, Mail, Send, Megaphone, Bell, Users, UserCheck, Heart, HeartPulse, Activity, Shield, ShieldCheck, Eye, AlertCircle, CheckCircle2, Search, Palette, Camera, Globe, Smartphone, Calendar, Clock, Timer, DollarSign, CreditCard, Wallet, Settings, Lightbulb, BookOpen, GraduationCap, ArrowRight, ArrowUpRight, Briefcase, Building2, FileText, Link

REGRAS:
- Gere propostas RICAS com 8 a 12 blocos. Inclua marquee, timeline, counter e cards-grid alem dos basicos
- Cada bloco DEVE ter "id" unico ("b1","b2"...)
- severity: varie entre "alto", "medio" e "positivo" — NAO coloque todos iguais
- CONTRASTE DE CORES — OBRIGATORIO:
  * "foreground" DEVE contrastar com "background" (claro vs escuro)
  * "cream", "beige", "nude" devem ser PROXIMOS de "background" (todos claros ou todos escuros)
  * DARK: background="#0A0A0A", foreground="#F5F5F5", beige="#1A1A1A", nude="#262626", cream="#111111"
  * LIGHT: background="#FFFFFF", foreground="#1A1A1A", beige="#FFF7ED", nude="#FFEDD5", cream="#FFFBF5"
  * NUNCA misture fundo claro com texto claro ou fundo escuro com texto escuro
- Adapte a cor "gold" ao nicho (saude=verde, tech=azul, gastronomia=vermelho). Default: dourado #C9A96E
- Textos ESPECIFICOS para o nicho, NUNCA genericos
- Valor realista para o mercado brasileiro
- Retorne APENAS o JSON, sem texto adicional`;

export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`ai:${user.id}`, AI_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Limite de requisicoes de IA atingido. Aguarde um momento." }, { status: 429 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Perfil nao encontrado" }, { status: 404 });
    }

    const plan = profile.plan as PlanName;
    const limits = PLAN_LIMITS[plan];

    if (!limits.ai) {
      return NextResponse.json(
        { error: "Geracao com IA disponivel apenas nos planos Pro e Plus. Faca upgrade para usar este recurso." },
        { status: 403 }
      );
    }

    const usage = await checkAndIncrementUsage(user.id);
    if (!usage.allowed) {
      return NextResponse.json({ error: usage.error }, { status: 429 });
    }

    const body = await request.json();
    const parsed = parseBody(aiGenerateSchema, body);
    if (!parsed.success) return parsed.response;
    const { businessName, serviceType, clientName, objectives } = parsed.data;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Crie uma proposta comercial com os seguintes dados:
- Nome do negocio: ${businessName}
- Tipo de servico: ${serviceType}
- Nome do cliente: ${clientName}
- Objetivos: ${objectives || "Nao especificados"}

Gere a proposta completa em JSON com blocos ricos (marquee, timeline, counter, etc).`,
        },
      ],
      temperature: 0.7,
      max_tokens: 8000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "Falha ao gerar proposta" }, { status: 500 });
    }

    const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    let config;
    try {
      config = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json({ error: "Erro ao processar resposta da IA" }, { status: 500 });
    }

    const slug = Math.random().toString(36).substring(2, 10);
    const heroBlock = config.blocks?.find((b: { type: string }) => b.type === "hero");
    const resolvedClientName = heroBlock?.data?.clientName || clientName;

    const { data: proposal, error: insertError } = await supabase
      .from("proposals")
      .insert({
        title: config.meta?.title || `Proposta para ${resolvedClientName}`,
        client_name: resolvedClientName,
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
      return NextResponse.json({ error: "Erro ao salvar proposta" }, { status: 500 });
    }

    return NextResponse.json({
      id: proposal.id,
      slug: proposal.slug,
      config,
    });
  } catch {
    return NextResponse.json({ error: "Erro interno ao gerar proposta" }, { status: 500 });
  }
}
