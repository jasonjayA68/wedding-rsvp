import { getAdminSession } from "@/lib/auth/dal";
import { participantsToCsv } from "@/lib/csv";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Participant } from "@/lib/types";

/**
 * GET /api/admin/export — download all responses as a CSV.
 *
 * This Route Handler does its own auth check (Route Handlers are public
 * endpoints) and returns 401 rather than redirecting.
 */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return new Response("Failed to load participants.", { status: 500 });
  }

  const csv = participantsToCsv((data ?? []) as Participant[]);
  const filename = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
