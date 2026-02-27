import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { getAbacateClient, PLAN_PRICES, PLAN_LABELS } from "@/lib/abacatepay";

/* ============================================
   POST /api/checkout
   Cria uma cobranca no AbacatePay e retorna
   a URL de pagamento para redirect.
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
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

    const abacate = getAbacateClient();

    // Criar ou reutilizar customer no AbacatePay
    let customerId = profile.abacate_customer_id;

    if (!customerId) {
      const customerRes = await abacate.customer.create({
        email: profile.email || user.email || "",
        name: profile.full_name || "",
      });

      if (customerRes.error || !customerRes.data) {
        return NextResponse.json(
          { error: "Erro ao criar cliente no AbacatePay" },
          { status: 500 },
        );
      }

      customerId = customerRes.data.id;

      // Salvar customer ID no perfil
      await admin
        .from("profiles")
        .update({ abacate_customer_id: customerId })
        .eq("id", user.id);
    }

    // Determinar origin para URLs de redirect
    const origin = request.headers.get("origin") || request.headers.get("referer")?.replace(/\/[^/]*$/, "") || "https://www.geraproposta.com";

    // Criar cobranca
    const billingRes = await abacate.billing.create({
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
      customerId,
    });

    if (billingRes.error || !billingRes.data) {
      return NextResponse.json(
        { error: "Erro ao criar cobranca" },
        { status: 500 },
      );
    }

    const billing = billingRes.data;

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
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
