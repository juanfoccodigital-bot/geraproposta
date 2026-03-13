import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin-auth";
import { getAdminSupabase } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getAdminSupabase();

  // Get all profiles
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, full_name, email, plan, subscription_status, last_payment_at, updated_at");

  const userIds = (profiles || []).map((p) => p.id);

  // Get all proposals, biolinks, sites
  const [proposalsRes, biolinksRes, sitesRes] = await Promise.all([
    admin.from("proposals").select("user_id").in("user_id", userIds),
    admin.from("biolinks").select("user_id").in("user_id", userIds),
    admin.from("sites").select("user_id").in("user_id", userIds),
  ]);

  const countBy = (data: { user_id: string }[] | null) => {
    const map: Record<string, number> = {};
    for (const row of data || []) {
      map[row.user_id] = (map[row.user_id] || 0) + 1;
    }
    return map;
  };

  const pMap = countBy(proposalsRes.data);
  const bMap = countBy(biolinksRes.data);
  const sMap = countBy(sitesRes.data);

  const enriched = (profiles || []).map((u) => {
    const proposals = pMap[u.id] || 0;
    const biolinks = bMap[u.id] || 0;
    const sites = sMap[u.id] || 0;
    return {
      id: u.id,
      full_name: u.full_name,
      email: u.email,
      plan: u.plan,
      proposals,
      biolinks,
      sites,
      total: proposals + biolinks + sites,
      updated_at: u.updated_at,
    };
  });

  const top = (key: "proposals" | "biolinks" | "sites" | "total", limit = 10) =>
    [...enriched]
      .sort((a, b) => b[key] - a[key])
      .filter((u) => u[key] > 0)
      .slice(0, limit);

  // Most recently active (by updated_at)
  const recentlyActive = [...enriched]
    .filter((u) => u.updated_at)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 10);

  return NextResponse.json({
    byProposals: top("proposals"),
    byBiolinks: top("biolinks"),
    bySites: top("sites"),
    byTotal: top("total"),
    recentlyActive,
  });
}
