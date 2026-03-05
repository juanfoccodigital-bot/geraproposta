import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, getAdminSupabase } from "@/lib/supabase-server";
import { checkRateLimit, READ_LIMIT, WRITE_LIMIT } from "@/lib/rate-limit";
import { updateBiolinkSchema, parseBody } from "@/lib/validations";
import { addDomainToVercel, removeDomainFromVercel } from "@/lib/vercel-domains";

// ============================================
// GET /api/biolinks/[id]
// ============================================
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl = checkRateLimit(`biolinks:read:${user.id}`, READ_LIMIT);
    if (!rl.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    // Usa admin client para evitar bloqueio por RLS com token expirado
    const admin = getAdminSupabase();
    const { data, error } = await admin
      .from("biolinks")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !data) return NextResponse.json({ error: "Biolink não encontrado" }, { status: 404 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// PUT /api/biolinks/[id]
// ============================================
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl2 = checkRateLimit(`biolinks:write:${user.id}`, WRITE_LIMIT);
    if (!rl2.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const admin = getAdminSupabase();

    // Verify ownership + get current custom_domain
    const { data: existing } = await admin
      .from("biolinks")
      .select("id, custom_domain")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (!existing) return NextResponse.json({ error: "Biolink não encontrado" }, { status: 404 });

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
        const { data: slugExists } = await admin
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
          const { data: domainExists } = await admin
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

    const { data, error } = await admin
      .from("biolinks")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Biolink update error:", error.message, error.code, error.details);
      return NextResponse.json({ error: "Erro ao atualizar biolink" }, { status: 500 });
    }

    // Auto-add/remove custom domain on Vercel (non-blocking)
    const oldDomain = (existing as { custom_domain?: string | null }).custom_domain;
    const newDomain = updates.custom_domain as string | null | undefined;
    if (newDomain !== undefined) {
      // Remove old domain if it changed
      if (oldDomain && oldDomain !== newDomain) {
        removeDomainFromVercel(oldDomain).catch(() => {});
      }
      // Add new domain
      if (newDomain) {
        const result = await addDomainToVercel(newDomain);
        if (!result.success) {
          console.error(`[vercel-domains] Could not add ${newDomain}: ${result.error}`);
          // Don't fail the save — domain was saved in DB, Vercel add can be retried
        }
      }
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// ============================================
// DELETE /api/biolinks/[id]
// ============================================
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const rl3 = checkRateLimit(`biolinks:write:${user.id}`, WRITE_LIMIT);
    if (!rl3.allowed) return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });

    const admin = getAdminSupabase();

    // Get custom_domain before deleting so we can remove from Vercel
    const { data: biolink } = await admin
      .from("biolinks")
      .select("custom_domain")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    const { error } = await admin
      .from("biolinks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return NextResponse.json({ error: "Erro ao deletar biolink" }, { status: 500 });

    // Remove custom domain from Vercel if it had one
    if (biolink?.custom_domain) {
      removeDomainFromVercel(biolink.custom_domain).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
