import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/* ============================================
   AUTH CALLBACK
   Exchange de código para sessão.
   Usado para email confirmation, password reset
   e OAuth (Google, etc).
   ============================================ */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";

  if (code) {
    const response = NextResponse.redirect(new URL(next, request.url));

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return response;
    }
    console.error("OAuth callback error:", error.message, error);
    return NextResponse.redirect(new URL(`/login?error=callback&message=${encodeURIComponent(error.message)}`, request.url));
  }

  // No code parameter — check for error from provider
  const errorParam = searchParams.get("error");
  const errorDesc = searchParams.get("error_description");
  console.error("OAuth callback - no code. error:", errorParam, "desc:", errorDesc);
  return NextResponse.redirect(new URL(`/login?error=callback&message=${encodeURIComponent(errorDesc || errorParam || "no_code")}`, request.url));
}
