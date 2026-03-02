import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { PLAN_PRICES, PLAN_LABELS } from "@/lib/abacatepay";

/* ============================================
   POST /api/checkout/pix
   Cria um PIX QR Code diretamente pelo endpoint
   /pixQrCode/create do AbacatePay.
   Retorna brCode + qrCodeImage (base64) para
   renderizar no modal proprio sem redirect.
   ============================================ */

const ABACATE_BASE = "https://api.abacatepay.com/v1";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function abacatePost(path: string, data: unknown) {
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
  console.log(`AbacatePay ${path} status:${res.status} body:`, text);

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
      .select("email, full_name, phone, tax_id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Perfil nao encontrado" }, { status: 404 });
    }

    const amount = PLAN_PRICES[plan];
    const description = `${PLAN_LABELS[plan]} - GeraProposta`;

    // Montar payload para /pixQrCode/create
    const pixPayload: Record<string, unknown> = {
      amount,
      expiresIn: 3600, // 1 hora
      description,
    };

    // Incluir dados do cliente se disponiveis
    const hasCustomerData =
      profile.full_name &&
      profile.email &&
      (profile.tax_id && profile.tax_id.length >= 11);

    if (hasCustomerData) {
      pixPayload.customer = {
        name: profile.full_name,
        email: profile.email || user.email || "",
        cellphone: profile.phone || "11999999999",
        taxId: (profile.tax_id || "").replace(/\D/g, ""),
      };
    }

    console.log("AbacatePay PIX request:", JSON.stringify(pixPayload));

    const pixJson = await abacatePost("/pixQrCode/create", pixPayload);
    const pix = pixJson.data || pixJson;

    if (!pix || !pix.id) {
      return NextResponse.json(
        { error: `Resposta inesperada do AbacatePay: ${JSON.stringify(pixJson)}` },
        { status: 500 },
      );
    }

    // Salvar billing/pix ID no perfil para rastrear no webhook
    await admin
      .from("profiles")
      .update({
        subscription_id: pix.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    // brCode = codigo copia-e-cola, qrCodeImage = base64 da imagem
    return NextResponse.json({
      billingId: pix.id,
      brCode: pix.brCode || pix.pixCode || pix.qrCode || "",
      qrCodeImage: pix.qrCodeImage || pix.qrCode || "",
      expiresAt: pix.expiresAt || null,
      plan,
      amount,
    });
  } catch (err) {
    console.error("PIX checkout error:", err);
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
