import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _serviceClient: SupabaseClient | null = null;

/**
 * Cliente Supabase con service_role (sólo servidor).
 * Lazy init para no romper el build si faltan variables locales.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (_serviceClient) return _serviceClient;

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan variables SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  _serviceClient = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _serviceClient;
}

export type LeadRecord = {
  id?: string;
  order_id: string;
  nombre?: string | null;
  patente: string;
  dni?: string | null;
  email: string;
  telefono?: string | null;
  amount: number;
  status: "pending" | "approved" | "rejected" | "in_process" | "cancelled";
  payment_method?: string | null;
  payment_id?: string | null;
  preference_id?: string | null;
  source?: string | null;
  utm?: Record<string, string> | null;
  user_agent?: string | null;
  ip?: string | null;
  created_at?: string;
  updated_at?: string;
};
