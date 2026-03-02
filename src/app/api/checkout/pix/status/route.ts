import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

/* ============================================
   GET /api/checkout/pix/status?billingId=xxx
   Consulta o status de um PIX QR Code no
   AbacatePay. Usado pelo modal para polling
   a cada 3s ate confirmar o pagamento.
   ============================================ */

const ABACATE_BASE = "https://api.abacatepay.com/v1";

export async function GET(request: NextRequest) {
    try {
        const supabase = await getServerSupabase();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const billingId = searchParams.get("billingId");

        if (!billingId) {
            return NextResponse.json({ error: "billingId obrigatorio" }, { status: 400 });
        }

        const apiKey = process.env.ABACATEPAY_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key nao configurada" }, { status: 500 });
        }

        const res = await fetch(`${ABACATE_BASE}/pixQrCode/${billingId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
            },
        });

        const text = await res.text();
        let json;
        try {
            json = JSON.parse(text);
        } catch {
            return NextResponse.json({ error: "Resposta invalida do AbacatePay" }, { status: 500 });
        }

        if (!res.ok) {
            return NextResponse.json(
                { error: `AbacatePay error: ${JSON.stringify(json)}` },
                { status: res.status },
            );
        }

        const pix = json.data || json;

        // Normalizar status para PENDING | PAID | EXPIRED
        const rawStatus = (pix.status || "").toUpperCase();
        let status: "PENDING" | "PAID" | "EXPIRED" = "PENDING";
        if (rawStatus === "PAID" || rawStatus === "COMPLETED" || rawStatus === "SUCCESS") {
            status = "PAID";
        } else if (rawStatus === "EXPIRED" || rawStatus === "CANCELLED" || rawStatus === "CANCELED") {
            status = "EXPIRED";
        }

        return NextResponse.json({ status, raw: pix.status });
    } catch (err) {
        console.error("PIX status error:", err);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
