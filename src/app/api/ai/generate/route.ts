import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { PLAN_LIMITS, PlanName } from "@/lib/plan-limits";
import { checkAndIncrementUsage } from "@/lib/usage";
import { checkRateLimit, AI_LIMIT } from "@/lib/rate-limit";
import { aiGenerateSchema, parseBody } from "@/lib/validations";
import OpenAI from "openai";

/* ============================================
   AI PROPOSAL GENERATION
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

const SYSTEM_PROMPT = `Você é um assistente especializado em criar propostas comerciais profissionais em português brasileiro.
Dado o nome do negócio, tipo de serviço, nome do cliente e objetivos, gere uma proposta completa no formato JSON.

A proposta deve ter a seguinte estrutura:
{
  "version": 2,
  "templateId": "ai-generated",
  "meta": {
    "title": "Título da proposta",
    "description": "Descrição breve"
  },
  "theme": {
    "colors": {
      "gold": "#F97316",
      "goldLight": "#FB923C",
      "goldDark": "#EA580C",
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
        "titleLine1": "Primeira linha do título",
        "titleHighlight": "Parte destacada do título",
        "subtitle": "Subtítulo descritivo com 1-2 frases",
        "clientName": "Nome do Cliente",
        "ctaPrimary": { "label": "Ver Diagnóstico", "scrollTo": "diagnostico" },
        "ctaSecondary": { "label": "Falar com Especialista", "url": "https://wa.me/" }
      }
    },
    {
      "type": "diagnostico",
      "visible": true,
      "data": {
        "sectionLabel": "Diagnóstico",
        "title": "Título da seção",
        "subtitle": "Descrição da análise",
        "showImages": false,
        "imagesLabel": "",
        "images": [],
        "cards": [
          {
            "icon": "Eye",
            "title": "Título do ponto",
            "description": "Descrição detalhada do ponto diagnósticado",
            "severity": "alto|medio|positivo"
          }
        ]
      }
    },
    {
      "type": "estrategia",
      "visible": true,
      "data": {
        "sectionLabel": "Estratégia",
        "title": "Título da estratégia",
        "subtitle": "Descrição geral",
        "items": [
          {
            "icon": "TrendingUp",
            "title": "Nome da estratégia",
            "description": "Descrição do que será feito",
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
        "title": "Investimento Mensal",
        "subtitle": "Tudo que está incluso no plano",
        "pricing": {
          "amount": "R$ X.XXX",
          "period": "/mês",
          "note": "Contrato mínimo de 3 meses"
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
        "title": "Vamos começar?",
        "subtitle": "Descrição de chamada para ação",
        "primaryButton": { "label": "Aceitar Proposta", "url": "https://wa.me/" },
        "secondaryButton": { "label": "Tenho Dúvidas", "url": "https://wa.me/" }
      }
    }
  ]
}

REGRAS:
- Gere exatamente 5 seções: hero, diagnostico (3-5 cards), estrategia (3-4 itens), investimento (4-6 itens), cta
- Os ícones devem ser do Lucide React: Eye, Target, Users, Palette, Star, TrendingUp, BarChart, Globe, Zap, Shield, Heart, Award
- O diagnóstico deve conter pontos reais e relevantes para o tipo de negócio
- A estratégia deve ter ações concretas e entregas específicas
- O investimento deve ter um valor realista para o mercado brasileiro
- Textos em português brasileiro, sem acentos incorretos
- Retorne APENAS o JSON, sem texto adicional`;

export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`ai:${user.id}`, AI_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Limite de requisições de IA atingido. Aguarde um momento." }, { status: 429 });
    }

    // Check plan allows AI
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    const plan = profile.plan as PlanName;
    const limits = PLAN_LIMITS[plan];

    if (!limits.ai) {
      return NextResponse.json(
        { error: "Geração com IA disponível apenas nos planos Pro e Plus. Faça upgrade para usar este recurso." },
        { status: 403 }
      );
    }

    // Check usage limits
    const usage = await checkAndIncrementUsage(user.id);
    if (!usage.allowed) {
      return NextResponse.json({ error: usage.error }, { status: 429 });
    }

    const body = await request.json();
    const parsed = parseBody(aiGenerateSchema, body);
    if (!parsed.success) return parsed.response;
    const { businessName, serviceType, clientName, objectives } = parsed.data;

    // Generate with OpenAI
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Crie uma proposta comercial com os seguintes dados:
- Nome do negócio: ${businessName}
- Tipo de serviço: ${serviceType}
- Nome do cliente: ${clientName}
- Objetivos: ${objectives || "Não especificados"}

Gere a proposta completa em JSON.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "Falha ao gerar proposta" }, { status: 500 });
    }

    // Parse JSON (remove markdown code block if present)
    const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    let config;
    try {
      config = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json({ error: "Erro ao processar resposta da IA" }, { status: 500 });
    }

    // Create proposal in database
    const slug = `ai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const { data: proposal, error: insertError } = await supabase
      .from("proposals")
      .insert({
        title: config.meta?.title || `Proposta para ${clientName}`,
        client_name: clientName,
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
