"use client";

import { useState, useEffect, ReactNode } from "react";
import { Lock, Loader2 } from "lucide-react";
import Logo from "@/components/ui/Logo";

const SESSION_KEY = "admin-secret";

export function getAdminSecret(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(SESSION_KEY) || "";
}

export function adminFetch(url: string, opts?: RequestInit) {
  return fetch(url, {
    ...opts,
    headers: {
      ...opts?.headers,
      "x-admin-secret": getAdminSecret(),
    },
  });
}

export default function AdminAuthGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      sessionStorage.setItem(SESSION_KEY, password);
      setAuthenticated(true);
    } else {
      setError("Senha incorreta");
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
        <Loader2 className="w-6 h-6 animate-spin text-white/20" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>

          <div className="rounded-2xl border p-6" style={{ background: "#111111", borderColor: "#262626" }}>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5" style={{ color: "#F97316" }} />
              <h2 className="text-lg font-bold text-white">Admin</h2>
            </div>

            <p className="text-xs mb-4" style={{ color: "#737373" }}>
              Area restrita. Insira a senha de administrador.
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Senha"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#525252] outline-none mb-3 focus:ring-1 focus:ring-[#F97316]"
              style={{ background: "#0A0A0A", border: "1px solid #262626" }}
              autoFocus
            />

            {error && (
              <p className="text-xs text-red-400 mb-3">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !password}
              className="w-full py-3 rounded-xl text-sm font-bold text-white cursor-pointer transition-all hover:brightness-110 disabled:opacity-40"
              style={{ background: "#F97316" }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Entrar"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
