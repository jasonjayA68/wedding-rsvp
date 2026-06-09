import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SERVICE ROLE key.
 *
 * This key bypasses Row Level Security, so it must NEVER be imported into a
 * Client Component. The `server-only` import above turns any such mistake into
 * a build error.
 *
 * Because every table has RLS enabled with no public policies (see
 * `supabase/schema.sql`), this server client is the only way the app reads or
 * writes data. All Server Actions and Route Handlers that use it perform their
 * own authentication/authorization checks.
 */

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Missing env var NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!serviceKey) {
    throw new Error(
      "Missing env var SUPABASE_SERVICE_ROLE_KEY. Find it in your Supabase project under Settings → API → service_role key.",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cached;
}
