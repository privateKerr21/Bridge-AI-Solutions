import { createClient } from "@supabase/supabase-js";

// Service-role Supabase client. SERVER-SIDE ONLY. Bypasses RLS.
// Use for: webhook handlers, audit submission, admin dashboard reads.
// Never import this from a client component or expose its key.

// Use placeholders during build if env vars are missing. Any actual query
// will fail at runtime. This lets `next build` evaluate routes that import
// this module without env vars set (e.g. on a fresh Vercel deploy).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export function assertSupabaseConfigured(): void {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
}
