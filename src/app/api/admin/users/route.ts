import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin-auth";
import { getAdminSupabase } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const plan = searchParams.get("plan") || "";
  const q = searchParams.get("q") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const admin = getAdminSupabase();

  let query = admin
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (plan && plan !== "all") {
    query = query.eq("plan", plan);
  }

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%`);
  }

  if (from) {
    query = query.gte("created_at", from);
  }

  if (to) {
    query = query.lte("created_at", to + "T23:59:59Z");
  }

  const { data: users, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get proposal/biolink/site counts per user
  const userIds = (users || []).map((u) => u.id);

  const [proposalCounts, biolinkCounts, siteCounts] = await Promise.all([
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

  const pMap = countBy(proposalCounts.data);
  const bMap = countBy(biolinkCounts.data);
  const sMap = countBy(siteCounts.data);

  const enriched = (users || []).map((u) => ({
    ...u,
    proposals_count: pMap[u.id] || 0,
    biolinks_count: bMap[u.id] || 0,
    sites_count: sMap[u.id] || 0,
  }));

  return NextResponse.json({
    users: enriched,
    total: count || 0,
    page,
    limit,
  });
}
