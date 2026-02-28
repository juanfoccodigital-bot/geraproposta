import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

/* ============================================
   GET /api/profile/me
   Retorna o perfil do usuario autenticado.
   Cria automaticamente se nao existir.
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function GET() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Use admin client to bypass any RLS issues
    const admin = getAdminClient();

    const { data: profile } = await admin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile) {
      // Verificar se assinatura expirou
      if (
        profile.subscription_status === "active" &&
        profile.subscription_expires_at
      ) {
        const expiresAt = new Date(profile.subscription_expires_at);
        if (expiresAt < new Date()) {
          await admin
            .from("profiles")
            .update({
              plan: "free",
              subscription_status: "expired",
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);
          profile.plan = "free";
          profile.subscription_status = "expired";
        }
      }
      return NextResponse.json(profile);
    }

    // Profile doesn't exist — create it
    const today = new Date().toISOString().split("T")[0];
    const { data: created, error } = await admin
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
        phone: user.user_metadata?.phone || "",
        tax_id: user.user_metadata?.tax_id || "",
        plan: "free",
        onboarding_complete: false,
        proposals_today: 0,
        proposals_month: 0,
        edits_today: 0,
        last_daily_reset: today,
        last_monthly_reset: today.slice(0, 7) + "-01",
        business_type: "",
        service_area: "",
      })
      .select("*")
      .single();

    if (error) {
      console.error("Profile creation error:", error.message);
      return NextResponse.json({ error: "Erro ao criar perfil" }, { status: 500 });
    }

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

/* ============================================
   PATCH /api/profile/me
   Atualiza campos do perfil via service role
   (bypassa RLS). Usado pelo onboarding.
   ============================================ */

const ALLOWED_FIELDS = new Set([
  "business_type",
  "service_area",
  "onboarding_complete",
  "full_name",
  "phone",
  "tax_id",
]);

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();

    // Filter to only allowed fields
    const updates: Record<string, unknown> = {};
    for (const key of Object.keys(body)) {
      if (ALLOWED_FIELDS.has(key)) {
        updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Nenhum campo válido" }, { status: 400 });
    }

    updates.updated_at = new Date().toISOString();

    const admin = getAdminClient();
    const { data, error } = await admin
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select("*")
      .single();

    if (error) {
      console.error("Profile update error:", error.message);
      return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
