import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

/* ============================================
   SUPABASE BROWSER CLIENT
   Usa @supabase/ssr para gerenciamento de
   sessão via cookies automaticamente
   ============================================ */

let _browserClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_browserClient) return _browserClient;
  _browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return _browserClient;
}

/** Compat: export como `supabase` para código existente */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
