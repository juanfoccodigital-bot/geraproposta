"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { UserProfile } from "@/types/user";

/* ============================================
   AUTH CONTEXT
   Estado de autenticacao centralizado.
   init: getSession() le cookies (rapido).
   onAuthStateChange: escuta login/logout.
   ============================================ */

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  loggingOut: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const currentUserIdRef = useRef<string | null>(null);
  const mountedRef = useRef(true);

  const fetchProfile = useCallback(async (): Promise<UserProfile | null> => {
    // Fetch profile via server API (uses service role, bypasses RLS issues)
    try {
      const res = await fetch("/api/profile/me");
      if (res.ok) {
        const profile = await res.json();
        return profile as UserProfile;
      }
    } catch {
      // API call failed
    }
    return null;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!currentUserIdRef.current) return;
    const profile = await fetchProfile();
    if (profile && mountedRef.current) setUser(profile);
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    setLoggingOut(true);
    try {
      await getSupabase().auth.signOut();
      setUser(null);
      currentUserIdRef.current = null;
      setLoggingOut(false);
      router.push("/login");
    } catch {
      setLoggingOut(false);
    }
  }, [router]);

  useEffect(() => {
    mountedRef.current = true;
    const sb = getSupabase();
    let resolved = false;

    // Helper: resolve auth state (only the first to finish wins)
    async function resolveUser(userId: string) {
      if (userId === currentUserIdRef.current && resolved) return;
      currentUserIdRef.current = userId;
      const profile = await fetchProfile();
      if (mountedRef.current) {
        setUser(profile);
        if (!resolved) {
          resolved = true;
          setLoading(false);
        }
      }
    }

    // 1. Init: read session from cookies (fast, no network call)
    async function init() {
      try {
        const { data: { session } } = await sb.auth.getSession();
        if (!mountedRef.current) return;
        if (session?.user) {
          await resolveUser(session.user.id);
        }
      } catch {
        // no session
      } finally {
        if (mountedRef.current && !resolved) {
          resolved = true;
          setLoading(false);
        }
      }
    }
    init();

    // 2. Listen for auth changes (INITIAL_SESSION, SIGNED_IN, SIGNED_OUT)
    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange(async (event, session) => {
      if (!mountedRef.current) return;

      if (event === "SIGNED_OUT") {
        setUser(null);
        currentUserIdRef.current = null;
        setLoggingOut(false);
        return;
      }

      if (session?.user) {
        await resolveUser(session.user.id);
      }
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const value = useMemo(
    () => ({ user, loading, loggingOut, logout, refreshProfile }),
    [user, loading, loggingOut, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
