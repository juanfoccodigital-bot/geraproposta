/* ============================================
   USER TYPES
   Tipos para perfil, planos e sessão
   ============================================ */

export type PlanTier = "free" | "lite" | "pro" | "plus";

export type SubscriptionStatus = "none" | "active" | "expired" | "cancelled";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  plan: PlanTier;
  proposals_today: number;
  proposals_month: number;
  edits_today: number;
  last_edit_at: string | null;
  last_daily_reset: string;
  last_monthly_reset: string;
  business_type: string;
  service_area: string;
  onboarding_complete: boolean;
  /* Subscription / Payment */
  subscription_id: string | null;
  subscription_status: SubscriptionStatus;
  subscription_expires_at: string | null;
  abacate_customer_id: string | null;
  last_payment_at: string | null;
  /* Timestamps */
  created_at: string;
  updated_at: string;
}
