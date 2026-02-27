"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Crown, Lock, Eye, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { templates, isTemplateFree } from "@/lib/templates";
import { BIOLINK_TEMPLATES } from "@/lib/biolink-templates";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { categoryLabels, ProposalCategory } from "@/types/proposal";
import { siteCategoryLabels, SiteCategory } from "@/types/site";
import { getRecommendedTemplates } from "@/lib/niche-template-map";
import TemplatePreviewThumbnail from "@/components/ui/TemplatePreviewThumbnail";
import BiolinkPreviewThumbnail from "@/components/ui/BiolinkPreviewThumbnail";
import SitePreviewThumbnail from "@/components/ui/SitePreviewThumbnail";
import type { ProductChoice } from "./StepChooseProduct";

interface StepTemplateSelectProps {
  productType: ProductChoice;
  selectedBusinessTypes: string[];
  onSelectTemplate: (templateId: string) => void;
  onBack: () => void;
  creating: boolean;
}

export default function StepTemplateSelect({
  productType,
  selectedBusinessTypes,
  onSelectTemplate,
  onBack,
  creating,
}: StepTemplateSelectProps) {
  const { user } = useAuth();
  const userPlan = user?.plan || "free";
  const limits = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS];
  const hasAllTemplates = limits?.allTemplates ?? false;

  const [activeCategory, setActiveCategory] = useState("all");

  // Recommended template IDs (for proposals only)
  const recommendedIds = useMemo(
    () => (productType === "proposal" ? getRecommendedTemplates(selectedBusinessTypes) : []),
    [productType, selectedBusinessTypes]
  );

  // ── PROPOSALS ──
  if (productType === "proposal") {
    const allCats = Array.from(new Set(templates.flatMap((t) => t.categories)));
    const filtered = templates.filter((t) => {
      if (activeCategory === "all") return true;
      return t.categories.includes(activeCategory as ProposalCategory);
    });

    // Sort: recommended first
    const sorted = [...filtered].sort((a, b) => {
      const aRec = recommendedIds.includes(a.id) ? -1 : 0;
      const bRec = recommendedIds.includes(b.id) ? -1 : 0;
      return aRec - bRec;
    });

    return (
      <TemplateLayout
        title="Escolha seu template de proposta"
        subtitle={`${templates.length} templates profissionais`}
        onBack={onBack}
      >
        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <CategoryChip
            label="Todos"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {allCats.map((cat) => (
            <CategoryChip
              key={cat}
              label={categoryLabels[cat as ProposalCategory] || cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {sorted.map((tpl, i) => {
            const isFree = isTemplateFree(tpl.id);
            const hasAccess = isFree || hasAllTemplates;
            const isRecommended = recommendedIds.includes(tpl.id);

            return (
              <TemplateCard
                key={tpl.id}
                index={i}
                name={tpl.name}
                isFree={isFree}
                hasAccess={hasAccess}
                isRecommended={isRecommended}
                creating={creating}
                onClick={() => {
                  if (hasAccess) onSelectTemplate(tpl.id);
                }}
                preview={<TemplatePreviewThumbnail config={tpl.config} height={120} />}
              />
            );
          })}
        </div>
      </TemplateLayout>
    );
  }

  // ── BIOLINKS ──
  if (productType === "biolink") {
    return (
      <TemplateLayout
        title="Escolha seu template de link"
        subtitle={`${BIOLINK_TEMPLATES.length} templates unicos`}
        onBack={onBack}
      >
        <div className="grid grid-cols-2 gap-3">
          {BIOLINK_TEMPLATES.map((tpl, i) => {
            const hasAccess = !tpl.isPremium || (limits?.biolinkAllTemplates ?? false);

            return (
              <TemplateCard
                key={tpl.id}
                index={i}
                name={tpl.name}
                isFree={!tpl.isPremium}
                hasAccess={hasAccess}
                isRecommended={false}
                creating={creating}
                onClick={() => {
                  if (hasAccess || !tpl.isPremium) onSelectTemplate(tpl.id);
                }}
                preview={<BiolinkPreviewThumbnail config={tpl.config} height={140} />}
              />
            );
          })}
        </div>
      </TemplateLayout>
    );
  }

  // ── SITES ──
  const siteCats = Array.from(new Set(SITE_TEMPLATES.map((t) => t.category)));
  const filteredSites = SITE_TEMPLATES.filter((t) => {
    if (activeCategory === "all") return true;
    return t.category === activeCategory;
  });

  return (
    <TemplateLayout
      title="Escolha seu template de site"
      subtitle={`${SITE_TEMPLATES.length} templates premium`}
      onBack={onBack}
    >
      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        <CategoryChip
          label="Todos"
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        />
        {siteCats.map((cat) => (
          <CategoryChip
            key={cat}
            label={siteCategoryLabels[cat as SiteCategory] || cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredSites.map((tpl, i) => (
          <TemplateCard
            key={tpl.id}
            index={i}
            name={tpl.name}
            isFree={false}
            hasAccess={true}
            isRecommended={false}
            creating={creating}
            onClick={() => onSelectTemplate(tpl.id)}
            preview={<SitePreviewThumbnail config={tpl.config} height={120} />}
          />
        ))}
      </div>
    </TemplateLayout>
  );
}

// ── Layout wrapper ──
function TemplateLayout({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key="step-templates"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-medium mb-4 cursor-pointer transition-colors hover:text-white"
        style={{ color: "#737373" }}
      >
        <ArrowLeft size={14} />
        Voltar
      </button>

      <h2 className="text-lg font-bold text-white mb-1">{title}</h2>
      <p className="text-xs mb-5" style={{ color: "#A3A3A3" }}>{subtitle}</p>

      {children}
    </motion.div>
  );
}

// ── Category filter chip ──
function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer"
      style={{
        backgroundColor: active ? "#F97316" : "#111111",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: active ? "#F97316" : "#262626",
        color: active ? "#FFFFFF" : "#A3A3A3",
      }}
    >
      {label}
    </button>
  );
}

// ── Template card ──
function TemplateCard({
  index,
  name,
  isFree,
  hasAccess,
  isRecommended,
  creating,
  onClick,
  preview,
}: {
  index: number;
  name: string;
  isFree: boolean;
  hasAccess: boolean;
  isRecommended: boolean;
  creating: boolean;
  onClick: () => void;
  preview: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={!(creating || !hasAccess) ? onClick : undefined}
      className={`rounded-xl border overflow-hidden text-left transition-all group ${creating || !hasAccess ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      style={{ background: "#111111", borderColor: "#262626" }}
    >
      {/* Preview */}
      <div className="relative overflow-hidden pointer-events-none">
        {preview}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
          {isRecommended && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: "#F97316" }}>
              <Sparkles size={8} />
              Recomendado
            </span>
          )}
          {isFree ? (
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: "rgba(34,197,94,0.8)" }}>
              GRATIS
            </span>
          ) : hasAccess ? (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: "rgba(34,197,94,0.7)" }}>
              <Crown size={8} />
              PRO
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: "rgba(0,0,0,0.6)" }}>
              <Lock size={8} />
              PRO
            </span>
          )}
        </div>

        {/* Hover overlay */}
        {hasAccess && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-white" style={{ background: "#F97316" }}>
              <Eye size={10} />
              Usar
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <div className="px-3 py-2">
        <p className="text-[11px] font-medium text-white truncate">{name}</p>
      </div>
    </motion.div>
  );
}
