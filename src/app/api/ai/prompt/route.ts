import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkAndIncrementUsage } from "@/lib/usage";
import { checkRateLimit, AI_LIMIT } from "@/lib/rate-limit";
import { aiPromptSchema, parseBody } from "@/lib/validations";
import OpenAI from "openai";

/* ============================================
   AI PROMPT — FREE-FORM GENERATION
   O usuario digita livremente o que quer
   e a OpenAI entende o contexto e gera
   a proposta completa.
   ============================================ */

const SYSTEM_PROMPT = `Voce e um assistente especializado em criar propostas comerciais profissionais em portugues brasileiro.

O usuario vai descrever livremente o que precisa — pode ser algo como:
- "Preciso de uma proposta de social media para a clinica Bella Vida, valor R$2.500/mes"
- "Faz uma proposta de trafego pago pra empresa do Joao, focado em gerar leads"
- "Proposta de criacao de site para restaurante italiano, R$4.000"

Voce deve ENTENDER o contexto e gerar uma proposta completa no formato JSON abaixo.
Extraia do texto: nome do negocio, tipo de servico, nome do cliente, objetivos, precos, etc.
Se algo nao for mencionado, use valores padroes realistas para o mercado brasileiro.

FORMATO JSON OBRIGATORIO:
{
  "version": 2,
  "templateId": "ai-generated",
  "meta": {
    "title": "Proposta [Tipo de Servico] — [Nome do Cliente]",
    "description": "Descricao breve da proposta"
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
    "fonts": {
      "heading": "Playfair Display",
      "body": "Poppins"
    }
  },
  "sections": [
    {
      "type": "hero",
      "visible": true,
      "data": {
        "badge": "Proposta Exclusiva",
        "titleLine1": "Primeira linha do titulo",
        "titleHighlight": "Parte destacada",
        "subtitle": "Subtitulo descritivo com 1-2 frases sobre o servico",
        "clientName": "Nome do Cliente",
        "ctaPrimary": { "label": "Ver Estrategia", "scrollTo": "estrategia" },
        "ctaSecondary": { "label": "Falar no WhatsApp", "url": "https://wa.me/" }
      }
    },
    {
      "type": "diagnostico",
      "visible": true,
      "data": {
        "sectionLabel": "Diagnostico",
        "title": "Titulo da secao de diagnostico",
        "subtitle": "O que analisamos e identificamos",
        "showImages": false,
        "imagesLabel": "",
        "images": [],
        "cards": [
          {
            "icon": "Eye",
            "title": "Titulo do ponto",
            "description": "Descricao detalhada e relevante para o nicho do cliente",
            "severity": "alto|medio|positivo"
          }
        ]
      }
    },
    {
      "type": "estrategia",
      "visible": true,
      "data": {
        "sectionLabel": "Estrategia",
        "title": "Titulo da estrategia proposta",
        "subtitle": "Como vamos resolver os desafios identificados",
        "cards": [
          {
            "icon": "TrendingUp",
            "title": "Nome da estrategia",
            "description": "O que sera feito de forma pratica",
            "items": ["Entrega 1", "Entrega 2", "Entrega 3"]
          }
        ]
      }
    },
    {
      "type": "investimento",
      "visible": true,
      "data": {
        "sectionLabel": "Investimento",
        "title": "Investimento",
        "subtitle": "Tudo que esta incluso",
        "badge": "Mais Popular",
        "priceOriginal": "R$ X.XXX",
        "priceCurrent": "X.XXX",
        "priceCurrency": "R$",
        "pricePeriod": "/mes",
        "description": "Contrato minimo de 3 meses",
        "includedItems": ["Item incluso 1", "Item incluso 2", "Item incluso 3", "Item incluso 4"],
        "ctaLabel": "Aceitar Proposta",
        "ctaUrl": "https://wa.me/",
        "guarantee": "7 dias de garantia"
      }
    },
    {
      "type": "cta",
      "visible": true,
      "data": {
        "title": "Vamos comecar?",
        "subtitle": "Chamada para acao convincente",
        "buttonLabel": "Aceitar Proposta",
        "buttonUrl": "https://wa.me/"
      }
    }
  ]
}

REGRAS IMPORTANTES:
- Gere EXATAMENTE 5 secoes: hero, diagnostico (3-5 cards), estrategia (3-4 cards com 3 items string cada), investimento (4-6 includedItems como strings simples), cta
- ATENCAO na estrutura exata: estrategia usa "cards" (NAO "items") e cada card tem "items" (array de strings, NAO "deliverables")
- Investimento usa campos separados: badge, priceOriginal, priceCurrent, priceCurrency, pricePeriod, description, includedItems (array de strings), ctaLabel, ctaUrl, guarantee. NAO use "pricing" nem "items"
- CTA usa "buttonLabel" e "buttonUrl" (strings). NAO use "primaryButton" nem "secondaryButton"
- severity do diagnostico deve ser exatamente: "alto", "medio" ou "positivo" (escolha um, nao use pipe)
- Icones Lucide React validos: Eye, Target, Users, Palette, Star, TrendingUp, BarChart, Globe, Zap, Shield, Heart, Award, Search, MessageCircle, Camera, Layout, Code, Smartphone, Mail, Clock
- O diagnostico deve ter pontos REAIS e RELEVANTES para o tipo de negocio mencionado
- A estrategia deve ter acoes CONCRETAS e ESPECIFICAS para o nicho
- Se o usuario mencionar um preco, use-o. Se nao, use um valor realista para o mercado brasileiro
- Se o usuario mencionar WhatsApp, use o numero nos CTAs
- Adapte as cores ao tipo de negocio (saude=verde, moda=rosa, tech=azul, etc). Se nao houver indicacao, use dourado (#C9A96E)
- Textos em portugues brasileiro natural e profissional
- Retorne APENAS o JSON, sem texto adicional, sem markdown`;

export async function POST(request: NextRequest) {
  // Step tracker for debugging
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
      max_tokens: 4000,
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
    const clientName = config.sections?.[0]?.data?.clientName || "Cliente";
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
