"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import Logo from "@/components/ui/Logo";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

/* ============================================
   LOGIN PAGE
   Email + senha + Google OAuth via Supabase Auth
   ============================================ */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const supabase = getSupabase();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (oauthError) {
        setError(oauthError.message);
        setGoogleLoading(false);
      }
    } catch {
      setError("Erro ao conectar com Google");
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabase();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(
          authError.message === "Invalid login credentials"
            ? "Email ou senha incorretos"
            : authError.message
        );
        return;
      }

      // refresh garante que middleware roda com cookies atualizados
      router.refresh();
      router.push("/dashboard");
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0A0A0A" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="mb-4 flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">
            Bem-vindo de volta
          </h1>
          <p className="text-sm" style={{ color: "#A3A3A3" }}>
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border text-sm font-medium transition-all hover:bg-white/5 disabled:opacity-40 cursor-pointer mb-6"
          style={{ borderColor: "#262626", color: "#FFFFFF" }}
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          {googleLoading ? "Conectando..." : "Entrar com Google"}
        </button>

        {/* Separador */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: "#262626" }} />
          <span className="text-xs" style={{ color: "#737373" }}>ou continue com email</span>
          <div className="flex-1 h-px" style={{ background: "#262626" }} />
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#A3A3A3" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoFocus
              required
              className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:opacity-40 focus:outline-none focus:border-[#F97316]/50 focus:ring-2 focus:ring-[#F97316]/10 transition-all"
              style={{
                background: "#111111",
                borderColor: "#262626",
                fontFamily: "var(--font-inter), system-ui",
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium" style={{ color: "#A3A3A3" }}>
                Senha
              </label>
              <Link
                href="/forgot-password"
                className="text-xs hover:underline"
                style={{ color: "#F97316" }}
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:opacity-40 focus:outline-none focus:border-[#F97316]/50 focus:ring-2 focus:ring-[#F97316]/10 transition-all pr-10"
                style={{
                  background: "#111111",
                  borderColor: "#262626",
                  fontFamily: "var(--font-inter), system-ui",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: "#737373" }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: "#F97316" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        {/* Link para signup */}
        <p className="text-center mt-6 text-sm" style={{ color: "#737373" }}>
          Não tem conta?{" "}
          <Link href="/signup" className="font-medium hover:underline" style={{ color: "#F97316" }}>
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
