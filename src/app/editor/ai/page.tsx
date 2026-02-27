"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, ArrowRight, Loader2, Briefcase, User, Target, FileText, AlertCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

/* ============================================
   AI PROPOSAL GENERATOR
   Formulário para gerar proposta com IA
   ============================================ */

export default function AiGeneratorPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [clientName, setClientName] = useState("");
  const [objectives, setObjectives] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!businessName.trim() || !serviceType.trim() || !clientName.trim()) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          serviceType: serviceType.trim(),
          clientName: clientName.trim(),
          objectives: objectives.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao gerar proposta");
        return;
      }

      // Redirect to editor with the generated proposal
      router.push(`/editor/${data.id}`);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      {/* Header */}
      <header className="border-b" style={{ background: "#111111", borderColor: "#262626" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#A3A3A3" }}
            >
              <ArrowLeft size={16} />
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)" }}>
              <Sparkles size={28} style={{ color: "#F97316" }} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Gerar Proposta com IA
            </h1>
            <p className="text-sm" style={{ color: "#A3A3A3" }}>
              Descreva seu servico e a IA criara uma proposta profissional completa.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Business Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <Briefcase size={14} style={{ color: "#F97316" }} />
                Nome do seu negocio *
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ex: Studio Digital, Agencia XYZ, João Designer..."
                className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
                style={{ background: "#111111", borderColor: "#262626" }}
                disabled={generating}
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <FileText size={14} style={{ color: "#F97316" }} />
                Tipo de servico *
              </label>
              <input
                type="text"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="Ex: Gestao de redes sociais, Desenvolvimento de site, Trafego pago..."
                className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
                style={{ background: "#111111", borderColor: "#262626" }}
                disabled={generating}
              />
            </div>

            {/* Client Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <User size={14} style={{ color: "#F97316" }} />
                Nome do cliente *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Clinica Bela Vida, Restaurante Sabor & Arte..."
                className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
                style={{ background: "#111111", borderColor: "#262626" }}
                disabled={generating}
              />
            </div>

            {/* Objectives */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <Target size={14} style={{ color: "#F97316" }} />
                Objetivos do cliente (opcional)
              </label>
              <textarea
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="Ex: Aumentar seguidores no Instagram, gerar mais leads pelo site, melhorar posicionamento no Google..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:text-white/30 focus:outline-none transition-all resize-none"
                style={{ background: "#111111", borderColor: "#262626" }}
                disabled={generating}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleGenerate}
              disabled={generating || !businessName.trim() || !serviceType.trim() || !clientName.trim()}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: "#F97316" }}
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Gerando proposta... (pode levar alguns segundos)
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Gerar Proposta com IA
                </>
              )}
            </button>
          </div>

          {/* Info note */}
          <p className="text-center text-xs mt-6" style={{ color: "#737373" }}>
            A IA vai gerar uma proposta completa com diagnostico, estrategia e investimento.
            Voce podera editar todos os detalhes no editor visual depois.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
