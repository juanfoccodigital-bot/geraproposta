"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import Logo from "@/components/ui/Logo";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ============================================
   FORGOT PASSWORD PAGE
   Envia link de reset de senha por email
   ============================================ */

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabase();
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      setSent(true);
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0A0A0A" }}>
        <div className="w-full max-w-sm text-center">
          <div className="mb-6">
            <Mail className="w-16 h-16 mx-auto" style={{ color: "#F97316" }} />
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">
            Email enviado
          </h1>
          <p className="text-sm mb-6" style={{ color: "#A3A3A3" }}>
            Enviamos um link para <strong className="text-white">{email}</strong>.
            Verifique sua caixa de entrada e spam.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            style={{ color: "#F97316" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para login
          </Link>
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
            Recuperar senha
          </h1>
          <p className="text-sm" style={{ color: "#A3A3A3" }}>
            Enviaremos um link para redefinir sua senha
          </p>
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
              style={{ background: "#111111", borderColor: "#262626" }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: "#F97316" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </span>
            ) : (
              "Enviar link"
            )}
          </button>
        </form>

        {/* Voltar */}
        <p className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            style={{ color: "#F97316" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para login
          </Link>
        </p>
      </div>
    </div>
  );
}
