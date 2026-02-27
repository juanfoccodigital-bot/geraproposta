import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

/* ============================================
   POST /api/profile/ensure
   Garante que o perfil existe para o usuário
   autenticado. Cria com service role se necessário
   (bypassa RLS).
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Check if profile already exists
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (existing) {
      return NextResponse.json({ exists: true });
    }

    // Create profile with service role (bypasses RLS)
    const admin = getAdminClient();
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await admin
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ created: true, profile: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
