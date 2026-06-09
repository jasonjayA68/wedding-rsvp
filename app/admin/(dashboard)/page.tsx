import type { Metadata } from "next";

import { AdminDashboard } from "@/components/AdminDashboard";
import { requireAdmin } from "@/lib/auth/dal";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Participant } from "@/lib/types";

export const metadata: Metadata = { title: "Guest responses · Admin" };

export default async function AdminPage() {
  await requireAdmin();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminDashboard participants={(data ?? []) as Participant[]} loadError={Boolean(error)} />;
}
