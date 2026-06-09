import { z } from "zod";

import { RESPONSE_STATUSES } from "@/lib/types";

/**
 * Validation schemas (zod v4). Used by Server Actions for server-side
 * validation — the form also uses native HTML validation for instant feedback.
 */

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : null));

export const rsvpSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "That name is a little too long."),
  email: z.email("Please enter a valid email address.").max(200),
  phone: optionalTrimmed(40),
  response_status: z.enum(RESPONSE_STATUSES, {
    error: "Please choose a response.",
  }),
  guest_count: z.coerce
    .number({ error: "Guest count must be a number." })
    .int("Guest count must be a whole number.")
    .min(0, "Guest count can't be negative.")
    .max(20, "For parties larger than 20, please contact the couple directly."),
  notes: optionalTrimmed(1000),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

export const loginSchema = z.object({
  // Identifier — a username or email. Stored in the admins.email column.
  email: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
});
