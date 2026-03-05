/* ============================================
   ZOD VALIDATION SCHEMAS
   Validações centralizadas para API routes.
   ============================================ */

import { z } from "zod";

// ---- Helpers ----

const slugSchema = z
  .string()
  .min(3, "Slug deve ter pelo menos 3 caracteres")
  .max(60, "Slug deve ter no máximo 60 caracteres")
  .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens");

const safeString = (max = 500) =>
  z.string().max(max).trim();

const optionalString = (max = 500) =>
  safeString(max).optional().nullable();

// ---- Proposals ----

export const createProposalSchema = z.object({
  title: safeString(200).min(1, "Título é obrigatório"),
  client_name: safeString(200).min(1, "Nome do cliente é obrigatório"),
  template_id: safeString(100).min(1, "Template é obrigatório"),
  category: optionalString(100),
  category_id: optionalString(100),
  config: z.record(z.string(), z.unknown()).refine((v) => v !== null && v !== undefined, "Config é obrigatória"),
});

export const updateProposalSchema = z.object({
  title: safeString(200).optional(),
  client_name: safeString(200).optional(),
  category: optionalString(100),
  category_id: optionalString(100),
  config: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(["pendente", "enviada", "aceita", "recusada"]).optional(),
  slug: slugSchema.optional(),
}).refine(
  (data) => Object.values(data).some((v) => v !== undefined),
  "Pelo menos um campo deve ser fornecido"
);

// ---- Categories ----

export const createCategorySchema = z.object({
  name: safeString(100).min(1, "Nome é obrigatório"),
  slug: safeString(100).min(1, "Slug é obrigatório"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve ser um hex válido (#RRGGBB)").optional(),
});

export const updateCategorySchema = z.object({
  name: safeString(100).optional(),
  slug: safeString(100).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve ser um hex válido").optional(),
}).refine(
  (data) => Object.values(data).some((v) => v !== undefined),
  "Pelo menos um campo deve ser fornecido"
);

// ---- Biolinks ----

export const createBiolinkSchema = z.object({
  title: safeString(200).optional(),
  template_id: safeString(100).optional(),
  slug: safeString(60).optional(),
});

export const updateBiolinkSchema = z.object({
  title: safeString(200).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  is_active: z.boolean().optional(),
  template_id: safeString(100).optional(),
  slug: safeString(60).optional(),
  custom_domain: safeString(253).optional().nullable(),
});

// ---- Sites ----

export const createSiteSchema = z.object({
  title: safeString(200).optional(),
  template_id: safeString(100).optional(),
});

export const updateSiteSchema = z.object({
  title: safeString(200).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  is_active: z.boolean().optional(),
  template_id: safeString(100).optional(),
  slug: safeString(60).optional(),
});

// ---- CRM Contacts ----

export const createContactSchema = z.object({
  name: safeString(200).min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").max(300).optional().nullable().or(z.literal("")),
  phone: safeString(50).optional().nullable(),
  company: safeString(200).optional().nullable(),
  notes: safeString(2000).optional().nullable(),
});

export const updateContactSchema = z.object({
  name: safeString(200).optional(),
  email: z.string().email("Email inválido").max(300).optional().nullable().or(z.literal("")),
  phone: safeString(50).optional().nullable(),
  company: safeString(200).optional().nullable(),
  notes: safeString(2000).optional().nullable(),
}).refine(
  (data) => Object.values(data).some((v) => v !== undefined),
  "Pelo menos um campo deve ser fornecido"
);

// ---- CRM Deals ----

const dealStages = ["lead", "contato", "proposta", "negociacao", "fechado_ganho", "fechado_perdido"] as const;

export const createDealSchema = z.object({
  title: safeString(200).min(1, "Título é obrigatório"),
  contact_id: optionalString(100),
  proposal_id: optionalString(100),
  value: z.number().min(0).max(999_999_999).optional(),
  stage: z.enum(dealStages).optional(),
  notes: safeString(2000).optional().nullable(),
});

export const updateDealSchema = z.object({
  title: safeString(200).optional(),
  contact_id: optionalString(100),
  proposal_id: optionalString(100),
  value: z.number().min(0).max(999_999_999).optional(),
  closed_value: z.number().min(0).max(999_999_999).optional(),
  stage: z.enum(dealStages).optional(),
  position: z.number().int().min(0).optional(),
  notes: safeString(2000).optional().nullable(),
});

export const reorderDealsSchema = z.object({
  updates: z.array(
    z.object({
      dealId: z.string().min(1),
      stage: z.enum(dealStages),
      position: z.number().int().min(0),
    })
  ).min(1).max(500),
});

// ---- AI Generate ----

export const aiGenerateSchema = z.object({
  businessName: safeString(200).min(1, "Nome do negócio é obrigatório"),
  serviceType: safeString(200).min(1, "Tipo de serviço é obrigatório"),
  clientName: safeString(200).min(1, "Nome do cliente é obrigatório"),
  objectives: safeString(1000).optional(),
});

export const aiPromptSchema = z.object({
  prompt: safeString(2000).min(10, "Descreva com mais detalhes o que voce precisa (minimo 10 caracteres)"),
});

// ---- Utility: Parse body with Zod ----

import { NextResponse } from "next/server";

export function parseBody<T>(schema: z.ZodType<T>, data: unknown):
  | { success: true; data: T }
  | { success: false; response: NextResponse } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message || "Dados inválidos";
    return {
      success: false,
      response: NextResponse.json(
        { error: firstError },
        { status: 400 }
      ),
    };
  }
  return { success: true, data: result.data };
}
