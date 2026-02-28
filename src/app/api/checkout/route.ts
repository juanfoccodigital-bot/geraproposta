import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { PLAN_PRICES, PLAN_LABELS } from "@/lib/abacatepay";

/* ============================================
   POST /api/checkout
   Cria uma cobranca no AbacatePay e retorna
   a URL de pagamento para redirect.
   Usa fetch direto em vez do SDK para melhor
   controle de erros.
   ============================================ */

const ABACATE_BASE = "https://api.abacatepay.com/v1";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function abacateRequest(path: string, data: unknown) {
  const apiKey = process.env.ABACATEPAY_API_KEY;
  if (!apiKey) throw new Error("ABACATEPAY_API_KEY not configured");

  const res = await fetch(`${ABACATE_BASE}${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log(`AbacatePay ${path} status:${res.status} response:`, text);

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`AbacatePay returned non-JSON: ${text}`);
  }

  if (!res.ok) {
    throw new Error(`AbacatePay error (${res.status}): ${JSON.stringify(json)}`);
  }

  return json;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const plan = body.plan as string;

    if (!plan || !PLAN_PRICES[plan]) {
      return NextResponse.json({ error: "Plano invalido" }, { status: 400 });
    }

    const admin = getAdminClient();

    // Buscar perfil do usuario
    const { data: profile } = await admin
      .from("profiles")
      .select("email, full_name, abacate_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Perfil nao encontrado" }, { status: 404 });
    }

    // Determinar origin para URLs de redirect
    const origin = request.headers.get("origin") || request.headers.get("referer")?.replace(/\/[^/]*$/, "") || "https://www.geraproposta.com";

    // Montar dados do billing
    const customerEmail = profile.email || user.email || "";
    const customerName = profile.full_name || "Cliente";
    const customerId = profile.abacate_customer_id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const billingData: any = {
      frequency: "ONE_TIME",
      methods: ["PIX"],
      products: [
        {
          externalId: `gp-${plan}-${user.id}`,
          name: `${PLAN_LABELS[plan]} - GeraProposta`,
          quantity: 1,
          price: PLAN_PRICES[plan],
        },
      ],
      returnUrl: `${origin}/pricing`,
      completionUrl: `${origin}/dashboard?payment=success&plan=${plan}`,
    };

    // Se ja tem customerId salvo, usa ele. Senao, passa dados inline.
    if (customerId) {
      billingData.customerId = customerId;
    } else {
      billingData.customer = {
        name: customerName,
        email: customerEmail,
        cellphone: "11999999999",
        taxId: "52998224725",
      };
    }

    console.log("AbacatePay billing request:", JSON.stringify(billingData));
    const billingJson = await abacateRequest("/billing/create", billingData);

    const billing = billingJson.data || billingJson;

    if (!billing || !billing.id) {
      return NextResponse.json(
        { error: `Resposta inesperada do AbacatePay: ${JSON.stringify(billingJson)}` },
        { status: 500 },
      );
    }

    // Salvar customer ID se veio na resposta
    const billingCustomerId = billing.customer?.id;
    if (billingCustomerId && !customerId) {
      await admin
        .from("profiles")
        .update({ abacate_customer_id: billingCustomerId })
        .eq("id", user.id);
    }

    // Salvar billing ID no perfil para rastrear no webhook
    await admin
      .from("profiles")
      .update({
        subscription_id: billing.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    return NextResponse.json({ url: billing.url });
  } catch (err) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
