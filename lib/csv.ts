import type { Participant } from "@/lib/types";

/** Escape a single CSV cell per RFC 4180. */
function cell(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const COLUMNS: { key: keyof Participant; header: string }[] = [
  { key: "full_name", header: "Full Name" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  { key: "response_status", header: "Status" },
  { key: "guest_count", header: "Guests" },
  { key: "notes", header: "Notes" },
  { key: "created_at", header: "Submitted At" },
  { key: "updated_at", header: "Updated At" },
];

/** Serialize participants to a CSV string (with header row). */
export function participantsToCsv(participants: Participant[]): string {
  const header = COLUMNS.map((c) => cell(c.header)).join(",");
  const rows = participants.map((p) => COLUMNS.map((c) => cell(p[c.key])).join(","));
  // Leading BOM so Excel opens UTF-8 correctly.
  return "﻿" + [header, ...rows].join("\r\n");
}
