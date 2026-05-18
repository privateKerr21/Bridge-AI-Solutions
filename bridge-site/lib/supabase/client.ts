"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser Supabase client. Safe for client components.
// Uses the anon key — all access governed by RLS.

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
