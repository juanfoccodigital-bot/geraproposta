import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase-middleware";

/* ============================================
   MIDDLEWARE
   - Refresh de sessão Supabase
   - Protege /dashboard e /editor
   - Free users bloqueados de /dashboard
   - Redireciona auth users de /login e /signup
   ============================================ */

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
  matcher: ["/api/:path*", "/dashboard/:path*", "/editor/:path*", "/templates/:path*", "/crm/:path*", "/biolink/:path*", "/sites/:path*", "/login", "/signup", "/onboarding/:path*"],
};
