import { createClient } from "@supabase/supabase-js";
import { PLAN_LIMITS, PlanName } from "./plan-limits";

/* ============================================
   USAGE TRACKING
   Verifica e incrementa contadores de uso.
   Lazy-reset: contadores são resetados ao
   verificar se a data mudou (sem cron job).
   Usa service role para bypassar RLS.
   ============================================ */

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function checkAndIncrementUsage(
  userId: string,
  options?: { checkActiveLimit?: boolean }
): Promise<{ allowed: boolean; error?: string }> {
  const admin = getAdminClient();

  const { data: profile, error } = await admin
    .from("profiles")
    .select("plan, proposals_today, proposals_month, last_daily_reset, last_monthly_reset")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return { allowed: false, error: "Perfil não encontrado" };
  }

  const plan = profile.plan as PlanName;
  const limits = PLAN_LIMITS[plan];
  const today = new Date().toISOString().split("T")[0];
  const monthStart = today.slice(0, 7) + "-01";

  let dailyCount = profile.proposals_today as number;
  let monthlyCount = profile.proposals_month as number;

  // Lazy reset
  if (profile.last_daily_reset < today) dailyCount = 0;
  if (profile.last_monthly_reset < monthStart) monthlyCount = 0;

  // Check active proposals limit
  if (options?.checkActiveLimit && limits.maxActive !== Infinity) {
    const { count } = await admin
      .from("proposals")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    if (count !== null && count >= limits.maxActive) {
      return {
        allowed: false,
        error: "Limite de propostas ativas atingido. Exclua propostas antigas ou faça upgrade do seu plano.",
      };
    }
  }

  // Check limits
  if (dailyCount >= limits.dailyCreate) {
    return {
      allowed: false,
      error: "Limite diário de propostas atingido. Faça upgrade do seu plano.",
    };
  }
  if (monthlyCount >= limits.monthlyCreate) {
    return {
      allowed: false,
      error: "Limite mensal de propostas atingido. Faça upgrade do seu plano.",
    };
  }

  // Increment counters (admin client bypasses RLS)
  await admin
    .from("profiles")
    .update({
      proposals_today: dailyCount + 1,
      proposals_month: monthlyCount + 1,
      last_daily_reset: today,
      last_monthly_reset: monthStart,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  return { allowed: true };
}

/* ============================================
   CHECK & INCREMENT EDITS
   Verifica e incrementa contador de edições
   diárias. Usa lazy-reset como proposals.
   ============================================ */

// Debounce: autosave fires every 3s, so we group rapid saves
// into a single "edit session". Only counts a new edit if the
// last one was more than EDIT_SESSION_GAP_MS ago.
const EDIT_SESSION_GAP_MS = 5 * 60 * 1000; // 5 minutes

export async function checkAndIncrementEdits(
  userId: string
): Promise<{ allowed: boolean; error?: string }> {
  const admin = getAdminClient();

  const { data: profile, error } = await admin
    .from("profiles")
    .select("plan, edits_today, last_daily_reset, last_edit_at")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return { allowed: false, error: "Perfil não encontrado" };
  }

  const plan = profile.plan as PlanName;
  const limits = PLAN_LIMITS[plan];
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  let editsCount = (profile.edits_today as number) || 0;

  // Lazy reset
  if (profile.last_daily_reset < today) editsCount = 0;

  // Check if this is still the same edit session (< 5 min gap)
  const lastEditAt = profile.last_edit_at ? new Date(profile.last_edit_at) : null;
  const isSameSession = lastEditAt && (now.getTime() - lastEditAt.getTime()) < EDIT_SESSION_GAP_MS;

  if (isSameSession) {
    // Same session — just update timestamp, don't increment counter
    await admin
      .from("profiles")
      .update({
        last_edit_at: now.toISOString(),
        last_daily_reset: today,
      })
      .eq("id", userId);
    return { allowed: true };
  }

  // New edit session — check limit before incrementing
  if (limits.dailyEdits !== Infinity && editsCount >= limits.dailyEdits) {
    return {
      allowed: false,
      error: `Limite de ${limits.dailyEdits} alterações por dia atingido. Faça upgrade do seu plano.`,
    };
  }

  // Increment counter + update timestamp
  await admin
    .from("profiles")
    .update({
      edits_today: editsCount + 1,
      last_edit_at: now.toISOString(),
      last_daily_reset: today,
      updated_at: now.toISOString(),
    })
    .eq("id", userId);

  return { allowed: true };
}

/* ============================================
   GET USAGE STATS
   Retorna estatísticas de uso do usuário
   ============================================ */

export async function getUsageStats(userId: string) {
  const admin = getAdminClient();

  const { data: profile } = await admin
    .from("profiles")
    .select("plan, proposals_today, proposals_month, edits_today, last_daily_reset, last_monthly_reset")
    .eq("id", userId)
    .single();

  if (!profile) return null;

  const plan = profile.plan as PlanName;
  const limits = PLAN_LIMITS[plan];
  const today = new Date().toISOString().split("T")[0];
  const monthStart = today.slice(0, 7) + "-01";

  let dailyCount = profile.proposals_today as number;
  let monthlyCount = profile.proposals_month as number;
  let editsCount = (profile.edits_today as number) || 0;

  if (profile.last_daily_reset < today) {
    dailyCount = 0;
    editsCount = 0;
  }
  if (profile.last_monthly_reset < monthStart) monthlyCount = 0;

  // Count active proposals
  const { count } = await admin
    .from("proposals")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  // Infinity → -1 for JSON serialization (Infinity becomes null in JSON)
  const safe = (v: number) => (v === Infinity ? -1 : v);

  return {
    plan,
    dailyUsed: dailyCount,
    dailyLimit: safe(limits.dailyCreate),
    monthlyUsed: monthlyCount,
    monthlyLimit: safe(limits.monthlyCreate),
    editsUsed: editsCount,
    editsLimit: safe(limits.dailyEdits),
    activeProposals: count || 0,
    maxActive: safe(limits.maxActive),
  };
}
