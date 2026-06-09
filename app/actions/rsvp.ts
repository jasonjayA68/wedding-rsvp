"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import { rsvpSchema } from "@/lib/validation";

// NOTE: a "use server" file may only export async functions. Value exports like
// the initial form state must live elsewhere (see components/RSVPForm.tsx).
export type RsvpFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

/**
 * Public RSVP submission. This is an UNAUTHENTICATED Server Action — treat it
 * like a public API endpoint: validate everything server-side. Writes go
 * through the service-role client because RLS denies the anon key.
 *
 * Submissions are upserted on `email`, so a guest can safely update their RSVP
 * by submitting again with the same address.
 */
export async function submitRsvp(
  _prevState: RsvpFormState,
  formData: FormData,
): Promise<RsvpFormState> {
  const parsed = rsvpSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    response_status: formData.get("response_status"),
    guest_count: formData.get("guest_count"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please double-check the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const data = parsed.data;
  // Guests only count when someone is coming.
  const guestCount = data.response_status === "not_attending" ? 0 : Math.max(1, data.guest_count);

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("participants").upsert(
      {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        response_status: data.response_status,
        guest_count: guestCount,
        notes: data.notes,
      },
      { onConflict: "email" },
    );

    if (error) {
      console.error("RSVP insert failed:", error.message);
      return {
        status: "error",
        message: "Something went wrong saving your RSVP. Please try again in a moment.",
      };
    }
  } catch (err) {
    console.error("RSVP unexpected error:", err);
    return {
      status: "error",
      message: "We couldn't reach the server. Please try again shortly.",
    };
  }

  // Refresh the admin list if it's open.
  revalidatePath("/admin");
  return { status: "success" };
}
