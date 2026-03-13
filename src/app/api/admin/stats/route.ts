import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin-auth";
import { getAdminSupabase } from "@/lib/supabase-server";
import { PLAN_PRICES } from "@/lib/hubla";

export async function GET(request: NextRequest) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getAdminSupabase();

  // All profiles
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, plan, subscription_status, created_at, updated_at");

  const allUsers = profiles || [];
  const totalUsers = allUsers.length;
  const activeSubscribers = allUsers.filter((p) => p.subscription_status === "active").length;

  // Plan breakdown
  const planCounts: Record<string, number> = { free: 0, lite: 0, pro: 0, plus: 0 };
  const activePlanCounts: Record<string, number> = { lite: 0, pro: 0, plus: 0 };
  for (const p of allUsers) {
    planCounts[p.plan] = (planCounts[p.plan] || 0) + 1;
    if (p.subscription_status === "active" && p.plan !== "free") {
      activePlanCounts[p.plan] = (activePlanCounts[p.plan] || 0) + 1;
    }
  }

  // MRR in cents
  const mrr = Object.entries(activePlanCounts).reduce(
    (sum, [plan, count]) => sum + (PLAN_PRICES[plan] || 0) * count,
    0
  );

  // Count proposals, biolinks, sites
  const { count: totalProposals } = await admin.from("proposals").select("id", { count: "exact", head: true });
  const { count: totalBiolinks } = await admin.from("biolinks").select("id", { count: "exact", head: true });
  const { count: totalSites } = await admin.from("sites").select("id", { count: "exact", head: true });

  // Signups per day (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
  const signupsMap: Record<string, number> = {};
  for (const u of allUsers) {
    const day = u.created_at?.slice(0, 10);
    if (day && day >= thirtyDaysAgo.slice(0, 10)) {
      signupsMap[day] = (signupsMap[day] || 0) + 1;
    }
  }

  // Fill all 30 days
  const signups: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    signups.push({ date: d, count: signupsMap[d] || 0 });
  }

  // Cumulative users over time
  const sortedUsers = [...allUsers].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const cumulativeMap: Record<string, number> = {};
  let cumCount = 0;
  for (const u of sortedUsers) {
    cumCount++;
    const day = u.created_at?.slice(0, 10);
    if (day) cumulativeMap[day] = cumCount;
  }

  // Fill cumulative for last 30 days
  const cumulative: { date: string; total: number }[] = [];
  let lastTotal = 0;
  // Find total before 30 days ago
  for (const u of sortedUsers) {
    if (u.created_at?.slice(0, 10) < thirtyDaysAgo.slice(0, 10)) lastTotal++;
  }
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    if (cumulativeMap[d]) lastTotal = cumulativeMap[d];
    cumulative.push({ date: d, total: lastTotal });
  }

  return NextResponse.json({
    totalUsers,
    activeSubscribers,
    mrr,
    planCounts,
    activePlanCounts,
    totalProposals: totalProposals || 0,
    totalBiolinks: totalBiolinks || 0,
    totalSites: totalSites || 0,
    signups,
    cumulative,
  });
}
