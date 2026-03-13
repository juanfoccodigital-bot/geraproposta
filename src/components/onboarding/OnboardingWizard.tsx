"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { templates } from "@/lib/templates";
import { BIOLINK_TEMPLATES } from "@/lib/biolink-templates";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import StepProfile from "./StepProfile";
import StepChooseProduct from "./StepChooseProduct";
import StepTemplateSelect from "./StepTemplateSelect";
import type { ProductChoice } from "./StepChooseProduct";

const TOTAL_STEPS = 3;

export default function OnboardingWizard() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const [step, setStep] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductChoice | null>(null);
  const [creating, setCreating] = useState(false);

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  /** Save profile via server API (bypasses RLS with service role) */
  const saveProfile = async () => {
    if (!user) return;

    // Ensure profile exists first (for Google OAuth users)
    await fetch("/api/profile/ensure", { method: "POST" });

    // Update profile via server API (uses service role, bypasses RLS)
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch("/api/profile/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_type: selectedTypes.join(","),
        service_area: selectedArea,
        phone: phone.replace(/\D/g, ""),
        onboarding_complete: true,
        proposals_today: 0,
        proposals_month: 0,
        edits_today: 0,
        last_daily_reset: today,
        last_monthly_reset: today.slice(0, 7) + "-01",
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.error || "Erro ao salvar perfil");
    }

    await refreshProfile();
  };

  /** Skip onboarding → save profile + go to dashboard */
  const handleSkip = async () => {
    setCreating(true);
    try {
      await saveProfile();
      router.push("/dashboard");
    } catch {
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setCreating(false);
    }
  };

  /** Handle product selection (Step 1 → Step 2) */
  const handleSelectProduct = (product: ProductChoice) => {
    setSelectedProduct(product);
    setStep(2);
  };

  /** Handle template selection → create item + redirect to editor */
  const handleSelectTemplate = async (templateId: string) => {
    if (!user || !selectedProduct) return;
    setCreating(true);

    try {
      await saveProfile();

      let redirectUrl = "/dashboard";

      if (selectedProduct === "proposal") {
        const tpl = templates.find((t) => t.id === templateId);
        const res = await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Minha Proposta",
            client_name: "Cliente",
            template_id: templateId,
            config: tpl?.config ?? {},
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.error || "Erro ao criar proposta");
        }
        const data = await res.json();
        redirectUrl = `/editor/${data.id}?tour=true`;
      } else if (selectedProduct === "biolink") {
        const tpl = BIOLINK_TEMPLATES.find((t) => t.id === templateId);
        const res = await fetch("/api/biolinks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Meu Link",
            template_id: templateId,
            config: tpl?.config ?? {},
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.error || "Erro ao criar biolink");
        }
        const data = await res.json();
        redirectUrl = `/biolink/editor/${data.id}?tour=true`;
      } else if (selectedProduct === "site") {
        const tpl = SITE_TEMPLATES.find((t) => t.id === templateId);
        const res = await fetch("/api/sites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            template_id: templateId,
            config: tpl?.config ?? {},
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.error || "Erro ao criar site");
        }
        const data = await res.json();
        redirectUrl = `/sites/editor/${data.id}?tour=true`;
      }

      router.push(redirectUrl);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao criar. Tente novamente.";
      alert(`Erro: ${msg}`);
      setCreating(false);
    }
  };

  const canContinue = step === 0 && selectedTypes.length > 0 && selectedArea !== "";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0A0A0A" }}
    >
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, s) => (
            <div
              key={s}
              className="h-1 rounded-full flex-1 transition-all duration-500"
              style={{
                backgroundColor: s <= step ? "#F97316" : "#262626",
              }}
            />
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepProfile
              key="profile"
              selectedTypes={selectedTypes}
              selectedArea={selectedArea}
              phone={phone}
              onToggleType={toggleType}
              onSelectArea={setSelectedArea}
              onPhoneChange={setPhone}
            />
          )}

          {step === 1 && (
            <StepChooseProduct key="product" onSelect={handleSelectProduct} />
          )}

          {step === 2 && selectedProduct && (
            <StepTemplateSelect
              key="templates"
              productType={selectedProduct}
              selectedBusinessTypes={selectedTypes}
              onSelectTemplate={handleSelectTemplate}
              onBack={() => setStep(1)}
              creating={creating}
            />
          )}
        </AnimatePresence>

        {/* Navigation (only on step 0) */}
        {step === 0 && (
          <div className="flex items-center justify-between mt-8">
            <div />
            <button
              onClick={() => setStep(1)}
              disabled={!canContinue || creating}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer disabled:opacity-40 hover:opacity-90"
              style={{ backgroundColor: "#F97316" }}
            >
              Continuar
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Skip link */}
        <div className="text-center mt-4">
          <button
            onClick={handleSkip}
            disabled={creating}
            className="text-xs cursor-pointer transition-colors hover:text-white/60 disabled:opacity-40"
            style={{ color: "#737373" }}
          >
            Pular por agora
          </button>
        </div>
      </div>
    </div>
  );
}
