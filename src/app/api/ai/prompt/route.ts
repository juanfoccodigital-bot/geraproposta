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

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY nao configurada");
  return new OpenAI({ apiKey });
}

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
        "items": [
          {
            "icon": "TrendingUp",
            "title": "Nome da estrategia",
            "description": "O que sera feito de forma pratica",
            "deliverables": ["Entrega 1", "Entrega 2", "Entrega 3"]
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
        "pricing": {
          "amount": "R$ X.XXX",
          "period": "/mes",
          "note": "Contrato minimo de 3 meses"
        },
        "items": [
          { "text": "Item incluso 1" },
          { "text": "Item incluso 2" }
        ]
      }
    },
    {
      "type": "cta",
      "visible": true,
      "data": {
        "title": "Vamos comecar?",
        "subtitle": "Chamada para acao convincente",
        "primaryButton": { "label": "Aceitar Proposta", "url": "https://wa.me/" },
        "secondaryButton": { "label": "Tenho Duvidas", "url": "https://wa.me/" }
      }
    }
  ]
}

REGRAS IMPORTANTES:
- Gere EXATAMENTE 5 secoes: hero, diagnostico (3-5 cards), estrategia (3-4 itens com 3 deliverables cada), investimento (4-6 itens), cta
- Icones Lucide React validos: Eye, Target, Users, Palette, Star, TrendingUp, BarChart, Globe, Zap, Shield, Heart, Award, Search, MessageCircle, Camera, Layout, Code, Smartphone, Mail, Clock
- O diagnostico deve ter pontos REAIS e RELEVANTES para o tipo de negocio mencionado
- A estrategia deve ter acoes CONCRETAS e ESPECIFICAS para o nicho
- Se o usuario mencionar um preco, use-o. Se nao, use um valor realista para o mercado brasileiro
- Se o usuario mencionar WhatsApp, use o numero nos CTAs
- Adapte as cores ao tipo de negocio (saude=verde, moda=rosa, tech=azul, etc). Se nao houver indicacao, use dourado (#C9A96E)
- Textos em portugues brasileiro natural e profissional
- Retorne APENAS o JSON, sem texto adicional, sem markdown`;

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

    // Check plan allows AI
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Perfil nao encontrado" }, { status: 404 });
    }

    const plan = profile.plan as PlanName;
    if (!PLAN_LIMITS[plan].ai) {
      return NextResponse.json(
        { error: "Geracao com IA disponivel apenas nos planos Pro e Plus." },
        { status: 403 }
      );
    }

    const usage = await checkAndIncrementUsage(user.id);
    if (!usage.allowed) {
      return NextResponse.json({ error: usage.error }, { status: 429 });
    }

    const body = await request.json();
    const parsed = parseBody(aiPromptSchema, body);
    if (!parsed.success) return parsed.response;
    const { prompt } = parsed.data;

    // Generate with OpenAI
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "Falha ao gerar proposta" }, { status: 500 });
    }

    // Parse JSON
    const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    let config;
    try {
      config = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json({ error: "Erro ao processar resposta da IA" }, { status: 500 });
    }

    // Extract client name from config
    const clientName = config.sections?.[0]?.data?.clientName || "Cliente";

    // Save to database
    const slug = `ai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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
      console.error("[AI Prompt] Insert error:", insertError.message);
      return NextResponse.json({ error: "Erro ao salvar proposta: " + insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      id: proposal.id,
      slug: proposal.slug,
      config,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[AI Prompt] Erro:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
