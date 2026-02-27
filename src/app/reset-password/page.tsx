"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import Logo from "@/components/ui/Logo";
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";

/* ============================================
   RESET PASSWORD PAGE
   Usuário chega aqui pelo link do email.
   Define nova senha.
   ============================================ */

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabase();
      const { error: authError } = await supabase.auth.updateUser({
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-sm text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 mx-auto" style={{ color: "#22C55E" }} />
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">
            Senha redefinida
          </h1>
          <p className="text-sm" style={{ color: "#A3A3A3" }}>
            Redirecionando para o dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0A0A0A" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="mb-4 flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">
            Nova senha
          </h1>
          <p className="text-sm" style={{ color: "#A3A3A3" }}>
            Defina sua nova senha abaixo
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#A3A3A3" }}>
              Nova senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:opacity-40 focus:outline-none focus:border-[#F97316]/50 focus:ring-2 focus:ring-[#F97316]/10 transition-all pr-10"
                style={{ background: "#111111", borderColor: "#262626" }}
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

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#A3A3A3" }}>
              Confirmar senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              required
              className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:opacity-40 focus:outline-none focus:border-[#F97316]/50 focus:ring-2 focus:ring-[#F97316]/10 transition-all"
              style={{ background: "#111111", borderColor: "#262626" }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password || !confirmPassword}
            className="w-full py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: "#F97316" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </span>
            ) : (
              "Redefinir senha"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
