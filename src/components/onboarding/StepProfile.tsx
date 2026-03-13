"use client";

import { motion } from "framer-motion";
import {
  Instagram, Target, Palette, Globe, Code, Megaphone,
  Briefcase, Camera, Heart, GraduationCap, Zap, MoreHorizontal,
  Check, User, Users, Building, Wrench, Phone,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

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

const SERVICE_AREAS = [
  { id: "freelancer", label: "Freelancer", icon: User },
  { id: "agencia", label: "Agencia", icon: Users },
  { id: "empresa", label: "Empresa", icon: Building },
  { id: "autonomo", label: "Autonomo", icon: Wrench },
];

interface StepProfileProps {
  selectedTypes: string[];
  selectedArea: string;
  phone: string;
  onToggleType: (id: string) => void;
  onSelectArea: (id: string) => void;
  onPhoneChange: (value: string) => void;
}

/** Format phone as (XX) XXXXX-XXXX */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function StepProfile({
  selectedTypes,
  selectedArea,
  phone,
  onToggleType,
  onSelectArea,
  onPhoneChange,
}: StepProfileProps) {
  return (
    <motion.div
      key="step-profile"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Welcome header */}
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl font-bold text-white mt-6 mb-2">
          Bem-vindo ao gerapropostas!
        </h1>
        <p className="text-sm" style={{ color: "#A3A3A3" }}>
          Conte um pouco sobre voce para personalizarmos sua experiencia.
        </p>
      </div>

      {/* Business type */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={16} style={{ color: "#F97316" }} />
          <h2 className="text-sm font-semibold text-white">Tipo de negocio</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "#262626", color: "#737373" }}>
            Selecione um ou mais
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BUSINESS_TYPES.map((type, i) => {
            const selected = selectedTypes.includes(type.id);
            const Icon = type.icon;
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onToggleType(type.id)}
                className="px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2"
                style={{
                  background: selected ? "rgba(249,115,22,0.12)" : "#111111",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: selected ? "#F97316" : "#262626",
                  color: selected ? "#F97316" : "#A3A3A3",
                }}
              >
                {selected ? <Check size={14} /> : <Icon size={14} />}
                {type.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Service area */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} style={{ color: "#F97316" }} />
          <h2 className="text-sm font-semibold text-white">Area de atuacao</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SERVICE_AREAS.map((area, i) => {
            const selected = selectedArea === area.id;
            const Icon = area.icon;
            return (
              <motion.button
                key={area.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => onSelectArea(area.id)}
                className="px-3 py-3 rounded-xl text-xs font-medium transition-all cursor-pointer flex flex-col items-center gap-1.5"
                style={{
                  background: selected ? "rgba(249,115,22,0.12)" : "#111111",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: selected ? "#F97316" : "#262626",
                  color: selected ? "#F97316" : "#A3A3A3",
                }}
              >
                <Icon size={18} />
                {area.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* WhatsApp */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Phone size={16} style={{ color: "#F97316" }} />
          <h2 className="text-sm font-semibold text-white">WhatsApp</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "#262626", color: "#737373" }}>
            Para suporte e novidades
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(formatPhone(e.target.value))}
            placeholder="(41) 99999-9999"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#525252] outline-none transition-all focus:ring-1 focus:ring-[#F97316]"
            style={{ background: "#111111", border: "1px solid #262626" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
