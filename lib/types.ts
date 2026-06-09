/**
 * Shared domain types. These mirror the database schema in
 * `supabase/schema.sql`. If you change the SQL, update these too.
 */

export const RESPONSE_STATUSES = ["attending", "not_attending", "maybe", "pending"] as const;
export type ResponseStatus = (typeof RESPONSE_STATUSES)[number];

/** Labels + badge colors for each status, used across the UI. */
export const STATUS_META: Record<
  ResponseStatus,
  { label: string; tone: "green" | "rose" | "amber" | "slate" }
> = {
  attending: { label: "Attending", tone: "green" },
  not_attending: { label: "Not attending", tone: "rose" },
  maybe: { label: "Maybe", tone: "amber" },
  pending: { label: "Pending", tone: "slate" },
};

export type Participant = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  response_status: ResponseStatus;
  guest_count: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

/** Columns guests submit; the rest are set by the database. */
export type ParticipantInsert = {
  full_name: string;
  email: string;
  phone: string | null;
  response_status: ResponseStatus;
  guest_count: number;
  notes: string | null;
};

export type Admin = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export type EventRow = {
  id: string;
  title: string;
  event_date: string;
  location: string;
  description: string | null;
  created_at: string;
};
