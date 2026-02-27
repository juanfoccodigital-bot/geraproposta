/* ============================================
   CRM TYPES
   Tipos para contatos, deals e pipeline.
   ============================================ */

// ============================================
// PIPELINE STAGES
// ============================================
export type DealStage =
  | "lead"
  | "contato"
  | "proposta_enviada"
  | "negociacao"
  | "fechado_ganho"
  | "fechado_perdido";

export const PIPELINE_STAGES: DealStage[] = [
  "lead",
  "contato",
  "proposta_enviada",
  "negociacao",
  "fechado_ganho",
  "fechado_perdido",
];

export const stageLabels: Record<DealStage, string> = {
  lead: "Lead",
  contato: "Contato",
  proposta_enviada: "Proposta Enviada",
  negociacao: "Negociação",
  fechado_ganho: "Fechado (Ganho)",
  fechado_perdido: "Fechado (Perdido)",
};

export const stageColors: Record<DealStage, string> = {
  lead: "#6366F1",
  contato: "#0EA5E9",
  proposta_enviada: "#F97316",
  negociacao: "#F59E0B",
  fechado_ganho: "#5BA68A",
  fechado_perdido: "#DC2626",
};

// ============================================
// CONTACT
// ============================================
export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================
// DEAL
// ============================================
export interface Deal {
  id: string;
  user_id: string;
  contact_id: string | null;
  proposal_id: string | null;
  title: string;
  value: number;
  closed_value: number | null;
  stage: DealStage;
  position: number;
  notes: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined data (populated by API)
  contact?: Pick<Contact, "id" | "name" | "email" | "phone" | "company">;
  proposal?: { id: string; title: string; client_name: string; status: string; slug: string };
}

// ============================================
// REVENUE STATS
// ============================================
export interface RevenueStats {
  totalPipeline: number;
  wonThisMonth: number;
  wonTotal: number;
  dealsActive: number;
  conversionRate: number;
}
