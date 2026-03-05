import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase-middleware";
import { createClient } from "@supabase/supabase-js";

/* ============================================
   MIDDLEWARE
   - Subdomínio routing (slug.geraproposta.com)
   - Domínio personalizado (meudominio.com)
   - Refresh de sessão Supabase
   - Protege /dashboard e /editor
   - Free users bloqueados de /dashboard
   - Redireciona auth users de /login e /signup
   ============================================ */

/** Main app domain (sem www) */
const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || "geraproposta.com";
/** Domains that are NOT subdomains (app itself, vercel previews, localhost) */
const RESERVED_SUBDOMAINS = ["www", "app", "api", "admin", "mail", "smtp"];

/**
 * Cria um redirect que preserva os cookies do Supabase.
 * Sem isso, tokens refreshados se perdem no redirect
 * e o client fica com sessao invalida.
 */
function redirectWithCookies(url: URL, source: NextResponse) {
  const redirect = NextResponse.redirect(url);
  source.cookies.getAll().forEach((cookie) => {
    redirect.cookies.set(cookie.name, cookie.value);
  });
  return redirect;
}

/**
 * Detecta se o host é um subdomínio de APP_DOMAIN.
 * Retorna o subdomain (slug) ou null.
 */
function getSubdomain(host: string): string | null {
  // Remove port for localhost
  const hostname = host.split(":")[0];
  // Check if it's a subdomain of our app domain
  if (hostname.endsWith(`.${APP_DOMAIN}`)) {
    const sub = hostname.replace(`.${APP_DOMAIN}`, "");
    if (sub && !RESERVED_SUBDOMAINS.includes(sub) && !sub.includes(".")) {
      return sub;
    }
  }
  return null;
}

/**
 * Check if host is a custom domain (not our app domain or its subdomains).
 * Returns the domain or null.
 */
function getCustomDomain(host: string): string | null {
  const hostname = host.split(":")[0];
  // Skip localhost, vercel previews, and our own domain
  if (
    hostname === "localhost" ||
    hostname === APP_DOMAIN ||
    hostname === `www.${APP_DOMAIN}` ||
    hostname.endsWith(`.${APP_DOMAIN}`) ||
    hostname.endsWith(".vercel.app") ||
    hostname.endsWith(".vercel.sh")
  ) {
    return null;
  }
  return hostname;
}

/** Admin supabase for public lookups (no auth needed) */
function getAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // ── SUBDOMAIN ROUTING ──
  // slug.geraproposta.com → rewrite to /link/[slug]
  const subdomain = getSubdomain(host);
  if (subdomain) {
    // Only rewrite root and non-system paths
    if (pathname === "/" || pathname === "") {
      const url = request.nextUrl.clone();
      url.pathname = `/link/${subdomain}`;
      return NextResponse.rewrite(url);
    }
    // For any other path on a subdomain, serve normally (allows assets, etc.)
  }

  // ── CUSTOM DOMAIN ROUTING ──
  // meudominio.com → lookup in DB → rewrite to /link/[slug]
  const customDomain = getCustomDomain(host);
  if (customDomain && (pathname === "/" || pathname === "")) {
    try {
      const supabase = getAdminSupabase();
      const { data } = await supabase
        .from("biolinks")
        .select("slug")
        .eq("custom_domain", customDomain)
        .eq("is_active", true)
        .single();

      if (data?.slug) {
        const url = request.nextUrl.clone();
        url.pathname = `/link/${data.slug}`;
        return NextResponse.rewrite(url);
      }
    } catch {
      // Domain not found — fall through to normal routing
    }
  }

  // ── STANDARD APP ROUTING ──
  const client = createMiddlewareClient(request);
  const supabase = client.supabase;

  // Refresh session (obrigatório para manter tokens atualizados)
  const { data: { user } } = await supabase.auth.getUser();

  // API routes: apenas refresh de sessão, sem redirects
  if (pathname.startsWith("/api/")) {
    return client.response;
  }

  // Rotas protegidas: /dashboard, /editor, /templates, /crm, /biolink, /sites
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/editor") || pathname.startsWith("/templates") || pathname.startsWith("/crm") || pathname.startsWith("/biolink") || pathname.startsWith("/sites")) {
    if (!user) {
      return redirectWithCookies(new URL("/login", request.url), client.response);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, onboarding_complete")
      .eq("id", user.id)
      .single();

    // Redirect to onboarding if no profile or not completed
    if (!profile || !profile.onboarding_complete) {
      return redirectWithCookies(new URL("/onboarding", request.url), client.response);
    }

    // CRM: apenas Pro e Plus
    if (pathname.startsWith("/crm") && !["pro", "plus"].includes(profile.plan || "")) {
      return redirectWithCookies(new URL("/pricing", request.url), client.response);
    }

    // GeraSites: não disponível no plano Free
    if (pathname.startsWith("/sites") && profile.plan === "free") {
      return redirectWithCookies(new URL("/pricing", request.url), client.response);
    }
  }

  // Onboarding route protection
  if (pathname.startsWith("/onboarding")) {
    if (!user) {
      return redirectWithCookies(new URL("/login", request.url), client.response);
    }
  }

  // Redirecionar users autenticados de /login e /signup
  if ((pathname === "/login" || pathname === "/signup") && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, onboarding_complete")
      .eq("id", user.id)
      .single();

    // Sem perfil ou onboarding incompleto → onboarding
    if (!profile || !profile.onboarding_complete) {
      return redirectWithCookies(new URL("/onboarding", request.url), client.response);
    }

    return redirectWithCookies(new URL("/dashboard", request.url), client.response);
  }

  return client.response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)"],
};
