"use client";

import { motion } from "framer-motion";
import { FileText, Link2, Globe, Lock, ArrowRight, Clock } from "lucide-react";

export type ProductChoice = "proposal" | "biolink" | "site";

const PRODUCTS = [
  {
    id: "proposal" as ProductChoice,
    icon: FileText,
    name: "Proposta Comercial",
    description: "Crie propostas profissionais para fechar mais contratos.",
    count: "41 templates",
    gradient: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
    comingSoon: false,
  },
  {
    id: "biolink" as ProductChoice,
    icon: Link2,
    name: "Link na Bio",
    description: "Monte sua pagina de links para redes sociais.",
    count: "10 templates",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
    comingSoon: false,
  },
  {
    id: "site" as ProductChoice,
    icon: Globe,
    name: "Site Profissional",
    description: "Crie um site completo para seu negocio em minutos.",
    count: "16 templates",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
    comingSoon: true,
  },
];

interface StepChooseProductProps {
  onSelect: (product: ProductChoice) => void;
}

export default function StepChooseProduct({ onSelect }: StepChooseProductProps) {

  return (
    <motion.div
      key="step-product"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          O que voce quer criar primeiro?
        </h1>
        <p className="text-sm" style={{ color: "#A3A3A3" }}>
          Escolha um produto para comecar agora mesmo.
        </p>
      </div>

      <div className="space-y-3">
        {PRODUCTS.map((product, i) => {
          const Icon = product.icon;
          const isDisabled = product.comingSoon;

          return (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={isDisabled ? {} : { scale: 1.01 }}
              whileTap={isDisabled ? {} : { scale: 0.99 }}
              onClick={() => {
                if (isDisabled) return;
                onSelect(product.id);
              }}
              disabled={isDisabled}
              className="w-full flex items-center gap-4 p-5 rounded-2xl border transition-all group relative overflow-hidden"
              style={{
                background: "#111111",
                borderColor: isDisabled ? "#1A1A1A" : "#262626",
                opacity: isDisabled ? 0.45 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: isDisabled ? "#262626" : product.gradient }}
              >
                {isDisabled ? (
                  <Clock size={22} className="text-white/50" />
                ) : (
                  <Icon size={22} className="text-white" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-semibold text-white">{product.name}</h3>
                  {isDisabled && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "#F97316", color: "#FFFFFF" }}>
                      Em breve
                    </span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "#A3A3A3" }}>
                  {isDisabled ? "Estamos finalizando essa funcionalidade. Em breve!" : product.description}
                </p>
              </div>

              {/* Count + Arrow */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {!isDisabled && (
                  <>
                    <span className="text-[10px] font-medium px-2 py-1 rounded-full hidden sm:inline-block" style={{ background: "#262626", color: "#A3A3A3" }}>
                      {product.count}
                    </span>
                    <ArrowRight size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
                  </>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
