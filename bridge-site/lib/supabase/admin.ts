import { createClient } from "@supabase/supabase-js";

// Service-role Supabase client. SERVER-SIDE ONLY. Bypasses RLS.
// Use for: webhook handlers, audit submission, admin dashboard reads.
// Never import this from a client component or expose its key.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
}
if (!serviceKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
