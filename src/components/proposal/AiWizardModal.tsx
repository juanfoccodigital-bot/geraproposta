"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowLeft, ArrowRight, Sparkles, Loader2,
  Instagram, Target, Palette, Globe, Code, Megaphone,
  Briefcase, Camera, Heart, GraduationCap, Zap, MoreHorizontal,
  Sun, Moon, User, Building2, DollarSign, Phone, Plus, Trash2,
} from "lucide-react";
import { templates, getTemplate } from "@/lib/templates";
import { getRecommendedTemplates } from "@/lib/niche-template-map";
import {
  COLOR_PALETTES,
  GENERATION_MESSAGES,
  generateProposalConfig,
  type WizardFormData,
} from "@/lib/ai-wizard-content";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LIMITS, type PlanName } from "@/lib/plan-limits";

/* ============================================
   AI WIZARD MODAL
   Wizard de 4 steps para "gerar" proposta
   com IA (sem LLM — conteudo estatico por nicho)
   ============================================ */

const BUSINESS_TYPES = [
  { id: "social-media", label: "Social Media", icon: Instagram },
  { id: "trafego-pago", label: "Trafego Pago", icon: Target },
  { id: "design", label: "Design Grafico", icon: Palette },
  { id: "webdesign", label: "Web Design", icon: Globe },
  { id: "desenvolvimento", label: "Desenvolvimento", icon: Code },
  { id: "marketing", label: "Marketing Digital", icon: Megaphone },
  { id: "consultoria", label: "Consultoria", icon: Briefcase },
  { id: "fotografia", label: "Fotografia/Video", icon: Camera },
  { id: "saude", label: "Saude/Estetica", icon: Heart },
  { id: "educacao", label: "Educacao/Cursos", icon: GraduationCap },
  { id: "automacao", label: "Automacao", icon: Zap },
  { id: "outro", label: "Outro", icon: MoreHorizontal },
];

const TOTAL_STEPS = 5;

interface AiWizardModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AiWizardModal({ open, onClose }: AiWizardModalProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(0);

  // Plan gate — only Pro and Plus
  const userPlan = (user?.plan as PlanName) || "free";
  const hasAiAccess = PLAN_LIMITS[userPlan]?.ai === true;

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [usageType, setUsageType] = useState<"personal" | "business">("business");
  const [clientName, setClientName] = useState("");
  const [objectives, setObjectives] = useState("");
  const [priceCurrent, setPriceCurrent] = useState("");
  const [priceOriginal, setPriceOriginal] = useState("");
  const [pricePeriod, setPricePeriod] = useState("/mes");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [includedItems, setIncludedItems] = useState<string[]>([""]);
  const [guarantee, setGuarantee] = useState("");
  const [colorPaletteId, setColorPaletteId] = useState("");
  const [stylePreference, setStylePreference] = useState<"light" | "dark">("light");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState("");

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep(0);
      setCompanyName("");
      setBusinessType("");
      setUsageType("business");
      setClientName("");
      setObjectives("");
      setPriceCurrent("");
      setPriceOriginal("");
      setPricePeriod("/mes");
      setWhatsappNumber("");
      setIncludedItems([""]);
      setGuarantee("");
      setColorPaletteId("");
      setStylePreference("light");
      setSelectedTemplateId("");
      setGenerating(false);
      setProgress(0);
      setMessageIndex(0);
      setError("");
    }
  }, [open]);

  // Validation per step
  const canContinue = useCallback(() => {
    switch (step) {
      case 0: return companyName.trim().length >= 2 && businessType !== "";
      case 1: return usageType === "personal" || clientName.trim().length >= 2;
      case 2: return true; // pricing step is all optional
      case 3: return colorPaletteId !== "";
      case 4: return selectedTemplateId !== "";
      default: return false;
    }
  }, [step, companyName, businessType, usageType, clientName, colorPaletteId, selectedTemplateId]);

  // Get recommended templates for Step 3
  const getRecommended = useCallback(() => {
    const recIds = getRecommendedTemplates([businessType]);
    const isDark = (bg: string) => {
      const hex = bg.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return (r * 299 + g * 587 + b * 114) / 1000 < 128;
    };

    // Filter by style preference + recommended
    const filtered = recIds
      .map((id) => templates.find((t) => t.id === id))
      .filter((t): t is NonNullable<typeof t> => {
        if (!t) return false;
        const dark = isDark(t.config.theme.colors.background);
        return stylePreference === "dark" ? dark : !dark;
      });

    // If too few results, add more matching style
    if (filtered.length < 4) {
      const existing = new Set(filtered.map((t) => t.id));
      for (const t of templates) {
        if (existing.has(t.id)) continue;
        const dark = isDark(t.config.theme.colors.background);
        if (stylePreference === "dark" ? dark : !dark) {
          filtered.push(t);
          if (filtered.length >= 6) break;
        }
      }
    }

    return filtered.slice(0, 6);
  }, [businessType, stylePreference]);

  // Handle generation
  const handleGenerate = async () => {
    if (!selectedTemplateId) return;
    setGenerating(true);
    setProgress(0);
    setMessageIndex(0);
    setError("");

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) { clearInterval(progressInterval); return 92; }
        return prev + Math.random() * 12 + 4;
      });
    }, 500);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, GENERATION_MESSAGES.length - 1));
    }, 700);

    try {
      // Build config
      const tpl = getTemplate(selectedTemplateId);
      if (!tpl) throw new Error("Template nao encontrado");

      const formData: WizardFormData = {
        companyName: companyName.trim(),
        businessType,
        usageType,
        clientName: usageType === "personal" ? companyName.trim() : clientName.trim(),
        objectives: objectives.trim(),
        priceCurrent: priceCurrent.trim(),
        priceOriginal: priceOriginal.trim(),
        pricePeriod,
        whatsappNumber: whatsappNumber.trim(),
        includedItems: includedItems.filter((i) => i.trim() !== ""),
        guarantee: guarantee.trim(),
        colorPaletteId,
        stylePreference,
        selectedTemplateId,
      };

      const config = generateProposalConfig(formData, tpl.config);

      // Create via API
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: config.meta.title,
          client_name: usageType === "personal" ? companyName.trim() : clientName.trim(),
          template_id: selectedTemplateId,
          config,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar proposta");
      }

      // Wait for animation to complete (min 3s)
      await new Promise((resolve) => setTimeout(resolve, 3000));
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      setProgress(100);
      setMessageIndex(GENERATION_MESSAGES.length - 1);

      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push(`/editor/${data.id}`);
    } catch (err) {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      setGenerating(false);
      setError(err instanceof Error ? err.message : "Erro ao gerar proposta");
    }
  };

  if (!open) return null;

  // Not logged in → redirect to login
  if (!user) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-sm rounded-2xl bg-[#111111] border border-[#262626] shadow-2xl p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Sparkles size={32} className="mx-auto mb-4 text-[#F97316]" />
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-center gap-2">
            Gerar Proposta com IA
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30">Beta</span>
          </h3>
          <p className="text-sm text-white/50 mb-6">Faca login para criar propostas personalizadas.</p>
          <button
            onClick={() => { onClose(); router.push("/login"); }}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#F97316" }}
          >
            Fazer Login
          </button>
        </motion.div>
      </div>
    );
  }

  // Plan gate — Pro and Plus only
  if (!hasAiAccess) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-sm rounded-2xl bg-[#111111] border border-[#262626] shadow-2xl p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Sparkles size={32} className="mx-auto mb-4 text-[#F97316]" />
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-center gap-2">
            Gerar Proposta com IA
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30">Beta</span>
          </h3>
          <p className="text-sm text-white/50 mb-2">Recurso exclusivo dos planos <span className="text-white font-medium">Pro</span> e <span className="text-white font-medium">Plus</span>.</p>
          <p className="text-xs text-white/30 mb-6">Crie propostas personalizadas em segundos com conteudo inteligente baseado no seu nicho.</p>
          <button
            onClick={() => { onClose(); router.push("/pricing"); }}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#F97316" }}
          >
            Ver Planos
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 mt-2 text-xs text-white/40 hover:text-white/60 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget && !generating) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-[#111111] border border-[#262626] shadow-2xl overflow-hidden"
      >
        {/* Close button */}
        {!generating && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors z-10 cursor-pointer"
          >
            <X size={18} />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-2 px-6 pt-5 pb-1">
          <Sparkles size={14} className="text-[#F97316]" />
          <span className="text-xs font-medium text-white/50">Gerar com IA</span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30">Beta</span>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 px-6 pt-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-colors duration-300"
              style={{ background: i <= step ? "#F97316" : "#262626" }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {generating ? (
            <GeneratingScreen progress={progress} messageIndex={messageIndex} error={error} onRetry={() => { setGenerating(false); setError(""); }} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {step === 0 && (
                  <StepAboutYou
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    businessType={businessType}
                    setBusinessType={setBusinessType}
                    usageType={usageType}
                    setUsageType={setUsageType}
                  />
                )}
                {step === 1 && (
                  <StepAboutClient
                    usageType={usageType}
                    clientName={clientName}
                    setClientName={setClientName}
                    objectives={objectives}
                    setObjectives={setObjectives}
                  />
                )}
                {step === 2 && (
                  <StepPricing
                    priceCurrent={priceCurrent}
                    setPriceCurrent={setPriceCurrent}
                    priceOriginal={priceOriginal}
                    setPriceOriginal={setPriceOriginal}
                    pricePeriod={pricePeriod}
                    setPricePeriod={setPricePeriod}
                    whatsappNumber={whatsappNumber}
                    setWhatsappNumber={setWhatsappNumber}
                    includedItems={includedItems}
                    setIncludedItems={setIncludedItems}
                    guarantee={guarantee}
                    setGuarantee={setGuarantee}
                  />
                )}
                {step === 3 && (
                  <StepVisualStyle
                    colorPaletteId={colorPaletteId}
                    setColorPaletteId={setColorPaletteId}
                    stylePreference={stylePreference}
                    setStylePreference={setStylePreference}
                  />
                )}
                {step === 4 && (
                  <StepTemplateSelect
                    recommended={getRecommended()}
                    selectedTemplateId={selectedTemplateId}
                    setSelectedTemplateId={setSelectedTemplateId}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Navigation */}
        {!generating && (
          <div className="flex items-center justify-between px-6 pb-5">
            <button
              onClick={() => step > 0 ? setStep(step - 1) : onClose()}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              {step > 0 ? "Voltar" : "Cancelar"}
            </button>

            {step < TOTAL_STEPS - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canContinue()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "#F97316", color: "#fff" }}
              >
                Continuar
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!canContinue()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "#F97316", color: "#fff" }}
              >
                <Sparkles size={14} />
                Gerar Proposta
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ── Step 0: Sobre voce ── */
function StepAboutYou({
  companyName, setCompanyName, businessType, setBusinessType, usageType, setUsageType,
}: {
  companyName: string; setCompanyName: (v: string) => void;
  businessType: string; setBusinessType: (v: string) => void;
  usageType: "personal" | "business"; setUsageType: (v: "personal" | "business") => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
          <Sparkles size={18} className="text-[#F97316]" />
          Sobre voce
        </h2>
        <p className="text-xs text-white/40">Nos conte sobre seu negocio para personalizar a proposta.</p>
      </div>

      {/* Usage type toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setUsageType("personal")}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer"
          style={{
            borderColor: usageType === "personal" ? "#F97316" : "#262626",
            background: usageType === "personal" ? "rgba(249,115,22,0.1)" : "transparent",
            color: usageType === "personal" ? "#F97316" : "rgba(255,255,255,0.4)",
          }}
        >
          <User size={14} />
          Uso Pessoal
        </button>
        <button
          onClick={() => setUsageType("business")}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer"
          style={{
            borderColor: usageType === "business" ? "#F97316" : "#262626",
            background: usageType === "business" ? "rgba(249,115,22,0.1)" : "transparent",
            color: usageType === "business" ? "#F97316" : "rgba(255,255,255,0.4)",
          }}
        >
          <Building2 size={14} />
          Empresarial
        </button>
      </div>

      <div>
        <label className="text-xs text-white/50 mb-1.5 block">
          {usageType === "personal" ? "Seu nome ou marca" : "Nome da empresa"}
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder={usageType === "personal" ? "Ex: Ana Souza" : "Ex: Agencia Digital XYZ"}
          className="w-full px-3 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      </div>

      <div>
        <label className="text-xs text-white/50 mb-2 block">Area de atuacao</label>
        <div className="grid grid-cols-3 gap-2">
          {BUSINESS_TYPES.map((bt) => {
            const Icon = bt.icon;
            const active = businessType === bt.id;
            return (
              <button
                key={bt.id}
                onClick={() => setBusinessType(bt.id)}
                className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl text-[10px] font-medium border transition-all cursor-pointer"
                style={{
                  borderColor: active ? "#F97316" : "#262626",
                  background: active ? "rgba(249,115,22,0.1)" : "transparent",
                  color: active ? "#F97316" : "rgba(255,255,255,0.4)",
                }}
              >
                <Icon size={16} />
                {bt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Sobre o cliente ── */
function StepAboutClient({
  usageType, clientName, setClientName, objectives, setObjectives,
}: {
  usageType: "personal" | "business";
  clientName: string; setClientName: (v: string) => void;
  objectives: string; setObjectives: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">
          {usageType === "personal" ? "Sobre o projeto" : "Sobre o cliente"}
        </h2>
        <p className="text-xs text-white/40">
          {usageType === "personal"
            ? "Conte um pouco sobre o que voce oferece."
            : "Para quem e essa proposta?"
          }
        </p>
      </div>

      {usageType === "business" && (
        <div>
          <label className="text-xs text-white/50 mb-1.5 block">Nome do cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ex: Clinica Bem Estar"
            className="w-full px-3 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
      )}

      <div>
        <label className="text-xs text-white/50 mb-1.5 block">
          {usageType === "personal" ? "Descreva seus servicos (opcional)" : "Objetivos ou contexto (opcional)"}
        </label>
        <textarea
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          placeholder={usageType === "personal"
            ? "Ex: Ofereço serviços de social media e design..."
            : "Ex: Aumentar presenca digital e captar mais pacientes..."
          }
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50 resize-none"
        />
      </div>
    </div>
  );
}

/* ── Step 2: Precos & Contato ── */
function StepPricing({
  priceCurrent, setPriceCurrent, priceOriginal, setPriceOriginal,
  pricePeriod, setPricePeriod, whatsappNumber, setWhatsappNumber,
  includedItems, setIncludedItems, guarantee, setGuarantee,
}: {
  priceCurrent: string; setPriceCurrent: (v: string) => void;
  priceOriginal: string; setPriceOriginal: (v: string) => void;
  pricePeriod: string; setPricePeriod: (v: string) => void;
  whatsappNumber: string; setWhatsappNumber: (v: string) => void;
  includedItems: string[]; setIncludedItems: (v: string[]) => void;
  guarantee: string; setGuarantee: (v: string) => void;
}) {
  const addItem = () => setIncludedItems([...includedItems, ""]);
  const removeItem = (idx: number) => setIncludedItems(includedItems.filter((_, i) => i !== idx));
  const updateItem = (idx: number, val: string) => {
    const updated = [...includedItems];
    updated[idx] = val;
    setIncludedItems(updated);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
          <DollarSign size={18} className="text-[#F97316]" />
          Precos & Contato
        </h2>
        <p className="text-xs text-white/40">Opcional — preencha para ja ter a secao de investimento pronta.</p>
      </div>

      {/* Prices row */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] text-white/40 mb-1 block">Preco atual (R$)</label>
          <input
            type="text"
            value={priceCurrent}
            onChange={(e) => setPriceCurrent(e.target.value)}
            placeholder="2.500"
            className="w-full px-3 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
        <div>
          <label className="text-[10px] text-white/40 mb-1 block">Preco original</label>
          <input
            type="text"
            value={priceOriginal}
            onChange={(e) => setPriceOriginal(e.target.value)}
            placeholder="3.500"
            className="w-full px-3 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
        <div>
          <label className="text-[10px] text-white/40 mb-1 block">Periodo</label>
          <select
            value={pricePeriod}
            onChange={(e) => setPricePeriod(e.target.value)}
            className="w-full px-2 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F97316]/50"
          >
            <option value="/mes">/mes</option>
            <option value="/projeto">/projeto</option>
            <option value="/hora">/hora</option>
            <option value="/trimestre">/trimestre</option>
            <option value="/semestre">/semestre</option>
            <option value="/ano">/ano</option>
          </select>
        </div>
      </div>

      {/* WhatsApp */}
      <div>
        <label className="text-[10px] text-white/40 mb-1 flex items-center gap-1">
          <Phone size={10} />
          WhatsApp (com DDD)
        </label>
        <input
          type="text"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="5511999999999"
          className="w-full px-3 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      </div>

      {/* Included items */}
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">O que esta incluso</label>
        <div className="space-y-1.5">
          {includedItems.map((item, idx) => (
            <div key={idx} className="flex gap-1.5">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(idx, e.target.value)}
                placeholder={`Item ${idx + 1}`}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
              />
              {includedItems.length > 1 && (
                <button onClick={() => removeItem(idx)} className="text-white/20 hover:text-red-400 cursor-pointer p-1">
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
          {includedItems.length < 8 && (
            <button
              onClick={addItem}
              className="flex items-center gap-1 text-[10px] text-white/30 hover:text-[#F97316] transition-colors cursor-pointer"
            >
              <Plus size={10} />
              Adicionar item
            </button>
          )}
        </div>
      </div>

      {/* Guarantee */}
      <div>
        <label className="text-[10px] text-white/40 mb-1 block">Garantia (opcional)</label>
        <input
          type="text"
          value={guarantee}
          onChange={(e) => setGuarantee(e.target.value)}
          placeholder="Ex: 30 dias de garantia ou seu dinheiro de volta"
          className="w-full px-3 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/50"
        />
      </div>
    </div>
  );
}

/* ── Step 3: Estilo visual ── */
function StepVisualStyle({
  colorPaletteId, setColorPaletteId, stylePreference, setStylePreference,
}: {
  colorPaletteId: string; setColorPaletteId: (v: string) => void;
  stylePreference: "light" | "dark"; setStylePreference: (v: "light" | "dark") => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Estilo visual</h2>
        <p className="text-xs text-white/40">Escolha as cores e o estilo da proposta.</p>
      </div>

      {/* Light/Dark toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setStylePreference("light")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium border transition-all cursor-pointer"
          style={{
            borderColor: stylePreference === "light" ? "#F97316" : "#262626",
            background: stylePreference === "light" ? "rgba(249,115,22,0.1)" : "transparent",
            color: stylePreference === "light" ? "#F97316" : "rgba(255,255,255,0.4)",
          }}
        >
          <Sun size={16} />
          Claro
        </button>
        <button
          onClick={() => setStylePreference("dark")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium border transition-all cursor-pointer"
          style={{
            borderColor: stylePreference === "dark" ? "#F97316" : "#262626",
            background: stylePreference === "dark" ? "rgba(249,115,22,0.1)" : "transparent",
            color: stylePreference === "dark" ? "#F97316" : "rgba(255,255,255,0.4)",
          }}
        >
          <Moon size={16} />
          Escuro
        </button>
      </div>

      {/* Color palettes */}
      <div>
        <label className="text-xs text-white/50 mb-2 block">Cor principal</label>
        <div className="grid grid-cols-4 gap-2">
          {COLOR_PALETTES.map((palette) => {
            const active = colorPaletteId === palette.id;
            return (
              <button
                key={palette.id}
                onClick={() => setColorPaletteId(palette.id)}
                className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl border transition-all cursor-pointer"
                style={{
                  borderColor: active ? "#F97316" : "#262626",
                  background: active ? "rgba(249,115,22,0.08)" : "transparent",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 transition-transform"
                  style={{
                    background: palette.gold,
                    borderColor: active ? "#fff" : "transparent",
                    transform: active ? "scale(1.15)" : "scale(1)",
                  }}
                />
                <span
                  className="text-[10px] font-medium"
                  style={{ color: active ? "#F97316" : "rgba(255,255,255,0.4)" }}
                >
                  {palette.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Escolha o template ── */
function StepTemplateSelect({
  recommended, selectedTemplateId, setSelectedTemplateId,
}: {
  recommended: { id: string; name: string; description: string; config: { theme: { colors: { gold: string; background: string; foreground: string } } } }[];
  selectedTemplateId: string; setSelectedTemplateId: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Escolha o template</h2>
        <p className="text-xs text-white/40">Selecionamos os melhores templates para seu nicho.</p>
      </div>

      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
        {recommended.map((tpl) => {
          const active = selectedTemplateId === tpl.id;
          const { gold, background, foreground } = tpl.config.theme.colors;
          return (
            <button
              key={tpl.id}
              onClick={() => setSelectedTemplateId(tpl.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer text-left"
              style={{
                borderColor: active ? "#F97316" : "#262626",
                background: active ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.02)",
              }}
            >
              {/* Color preview */}
              <div
                className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border"
                style={{ background, borderColor: "rgba(255,255,255,0.1)" }}
              >
                <div className="w-4 h-4 rounded-full" style={{ background: gold }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{tpl.name}</p>
                <p className="text-[10px] text-white/30 truncate">{tpl.description}</p>
              </div>
              {/* Color dots */}
              <div className="flex gap-1 flex-shrink-0">
                <div className="w-3 h-3 rounded-full" style={{ background: gold }} />
                <div className="w-3 h-3 rounded-full border" style={{ background, borderColor: "rgba(255,255,255,0.15)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: foreground }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Tela de geracao (fake AI) ── */
function GeneratingScreen({
  progress, messageIndex, error, onRetry,
}: {
  progress: number; messageIndex: number; error: string; onRetry: () => void;
}) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
          <X size={24} className="text-red-400" />
        </div>
        <p className="text-sm text-white/60 text-center">{error}</p>
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-xl text-sm font-medium cursor-pointer"
          style={{ background: "#F97316", color: "#fff" }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Pulsing icon */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "rgba(249,115,22,0.15)" }}
      >
        <Sparkles size={28} className="text-[#F97316]" />
      </motion.div>

      {/* Message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-sm text-white/60 text-center"
        >
          {GENERATION_MESSAGES[messageIndex] || GENERATION_MESSAGES[0]}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "#F97316" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="text-[10px] text-white/30 text-center mt-2">{Math.round(Math.min(progress, 100))}%</p>
      </div>
    </div>
  );
}
