import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, getClientIP, PUBLIC_LIMIT } from "@/lib/rate-limit";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

// ============================================
// POST /api/biolinks/[id]/view — Track view
// ============================================
export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ip = getClientIP(_request);
    const rl = checkRateLimit(`view:${ip}`, PUBLIC_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Muitas requisições" }, { status: 429 });
    }
    const supabaseAdmin = getAdminClient();

    const { data: current } = await supabaseAdmin
      .from("biolinks")
      .select("views")
      .eq("id", id)
      .single();

    if (current) {
      await supabaseAdmin
        .from("biolinks")
        .update({ views: (current.views || 0) + 1 })
        .eq("id", id);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
