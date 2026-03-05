import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, getAdminSupabase } from "@/lib/supabase-server";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { updateBiolinkSchema, parseBody } from "@/lib/validations";
import { addDomainToVercel, removeDomainFromVercel } from "@/lib/vercel-domains";

/**
 * Get a DB client that works. Tries admin (bypasses RLS), falls back to regular supabase.
 * Also returns the regular supabase for auth.
 */
async function getClients() {
  const supabase = await getServerSupabase();
  let db;
  let usingAdmin = false;
  try {
    db = getAdminSupabase();
    usingAdmin = true;
  } catch {
    db = supabase;
  }
  return { supabase, db, usingAdmin };
}

/**
 * Fetch biolink by ID, then verify ownership in code.
 * This avoids combined SQL filters that may silently fail.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchBiolinkWithOwnership(db: any, supabase: any, id: string, userId: string, select: string) {
  // First try with db (admin or supabase)
  let { data, error } = await db.from("biolinks").select(select).eq("id", id).maybeSingle();

  // If admin failed, fallback to regular supabase
  if (error && db !== supabase) {
    console.error("[biolink] Admin query failed, trying regular client:", error.message);
    const retry = await supabase.from("biolinks").select(select).eq("id", id).maybeSingle();
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    console.error("[biolink] DB error:", error.message, error.code);
    return { data: null, error: "db_error" as const };
  }

  if (!data) {
    return { data: null, error: "not_found" as const };
  }

  // Check ownership in code
  if (data.user_id !== userId) {
    console.error("[biolink] Ownership mismatch:", { biolinkUserId: data.user_id, authUserId: userId });
    return { data: null, error: "forbidden" as const };
  }

  return { data, error: null };
}

// ============================================
// GET /api/biolinks/[id]
// ============================================
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { supabase, db } = await getClients();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl = checkRateLimit(`biolinks:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const result = await fetchBiolinkWithOwnership(db, supabase, id, user.id, "*");

    if (result.error === "db_error") {
      return NextResponse.json({ error: "Erro ao acessar banco de dados" }, { status: 500 });
    }
    if (result.error) {
      return NextResponse.json({ error: "Biolink não encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.data);
  } catch (e) {
    console.error("[biolink-get] Exception:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// PUT /api/biolinks/[id]
// ============================================
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { supabase, db } = await getClients();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl2 = checkRateLimit(`biolinks:write:${user.id}`, WRITE_LIMIT);
    if (!rl2.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    // Verify ownership
    const ownership = await fetchBiolinkWithOwnership(db, supabase, id, user.id, "id, user_id, custom_domain");

    if (ownership.error === "db_error") {
      return NextResponse.json({ error: "Erro ao acessar banco de dados" }, { status: 500 });
    }
    if (ownership.error) {
      return NextResponse.json({ error: "Biolink não encontrado" }, { status: 404 });
    }

    const existing = ownership.data;
    const body = await request.json();
    const parsed = parseBody(updateBiolinkSchema, body);
    if (!parsed.success) return parsed.response;

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (parsed.data.title !== undefined) updates.title = parsed.data.title;
    if (parsed.data.config !== undefined) updates.config = parsed.data.config;
    if (parsed.data.is_active !== undefined) updates.is_active = parsed.data.is_active;
    if (parsed.data.template_id !== undefined) updates.template_id = parsed.data.template_id;
    if (parsed.data.slug !== undefined) {
      const newSlug = parsed.data.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
      if (newSlug) {
        const { data: slugExists } = await db
          .from("biolinks")
          .select("id")
          .eq("slug", newSlug)
          .neq("id", id)
          .maybeSingle();
        if (slugExists) return NextResponse.json({ error: "Slug já está em uso" }, { status: 409 });
        updates.slug = newSlug;
      }
    }
    if (parsed.data.custom_domain !== undefined) {
      if (parsed.data.custom_domain) {
        const domain = parsed.data.custom_domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
        if (domain) {
          const { data: domainExists } = await db
            .from("biolinks")
            .select("id")
            .eq("custom_domain", domain)
            .neq("id", id)
            .maybeSingle();
          if (domainExists) return NextResponse.json({ error: "Domínio já está em uso" }, { status: 409 });
          updates.custom_domain = domain;
        }
      } else {
        updates.custom_domain = null;
      }
    }

    // Use db (admin preferred) for the update, with user_id guard
    const { data, error } = await db
      .from("biolinks")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("[biolink-put] update error:", error.message, error.code);
      // Fallback to regular supabase for update
      if (db !== supabase) {
        const { data: retryData, error: retryErr } = await supabase
          .from("biolinks")
          .update(updates)
          .eq("id", id)
          .eq("user_id", user.id)
          .select()
          .single();
        if (!retryErr && retryData) {
          console.error("[biolink-put] Update succeeded with regular client");
          return NextResponse.json(retryData);
        }
      }
      return NextResponse.json({ error: "Erro ao atualizar biolink" }, { status: 500 });
    }

    // Auto-add/remove custom domain on Vercel (non-blocking)
    const oldDomain = existing.custom_domain;
    const newDomain = updates.custom_domain as string | null | undefined;
    if (newDomain !== undefined) {
      if (oldDomain && oldDomain !== newDomain) {
        removeDomainFromVercel(oldDomain).catch(() => {});
      }
      if (newDomain) {
        const result = await addDomainToVercel(newDomain);
        if (!result.success) {
          console.error(`[vercel-domains] Could not add ${newDomain}: ${result.error}`);
        }
      }
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("[biolink-put] Exception:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// DELETE /api/biolinks/[id]
// ============================================
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { supabase, db } = await getClients();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl3 = checkRateLimit(`biolinks:write:${user.id}`, WRITE_LIMIT);
    if (!rl3.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    // Verify ownership & get custom_domain
    const ownership = await fetchBiolinkWithOwnership(db, supabase, id, user.id, "id, user_id, custom_domain");
    if (ownership.error) {
      return NextResponse.json({ error: "Biolink não encontrado" }, { status: 404 });
    }

    const { error } = await db
      .from("biolinks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return NextResponse.json({ error: "Erro ao deletar biolink" }, { status: 500 });

    if (ownership.data?.custom_domain) {
      removeDomainFromVercel(ownership.data.custom_domain).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[biolink-delete] Exception:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
