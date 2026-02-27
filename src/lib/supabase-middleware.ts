import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

/* ============================================
   SUPABASE MIDDLEWARE CLIENT
   Para uso no middleware do Next.js.
   Gerencia refresh de token automaticamente.
   ============================================ */

export function createMiddlewareClient(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Getter garante que sempre retorna o response ATUALIZADO
  // (setAll pode reatribuir `response` durante getUser/refresh)
  return { supabase, get response() { return response; } };
}
