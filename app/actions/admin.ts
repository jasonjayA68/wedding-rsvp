"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/dal";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { RESPONSE_STATUSES, type ResponseStatus } from "@/lib/types";

export type ActionResult = { ok: boolean; error?: string };

/**
 * Admin mutations. Each one re-verifies the admin session (Server Actions are
 * public POST endpoints, so this is the real security boundary — never rely on
 * the Proxy alone). All writes go through the service-role client.
 */

export async function updateStatus(id: string, status: ResponseStatus): Promise<ActionResult> {
  await requireAdmin();
  if (!RESPONSE_STATUSES.includes(status)) {
    return { ok: false, error: "Invalid status." };
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("participants")
    .update({ response_status: status })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateGuestCount(id: string, count: number): Promise<ActionResult> {
  await requireAdmin();
  const safe = Math.max(0, Math.min(50, Math.trunc(Number(count) || 0)));

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("participants")
    .update({ guest_count: safe })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteParticipant(id: string): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("participants").delete().eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}
