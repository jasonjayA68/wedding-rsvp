"use client";

import { useMemo, useState, useTransition } from "react";

import { deleteParticipant, updateGuestCount, updateStatus } from "@/app/actions/admin";
import { AdminTable, type Column } from "@/components/AdminTable";
import { DownloadIcon, SearchIcon, TrashIcon } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import { selectClassName } from "@/components/ui/inputs";
import { cn } from "@/lib/cn";
import { formatTimestamp } from "@/lib/format";
import { RESPONSE_STATUSES, STATUS_META, type Participant, type ResponseStatus } from "@/lib/types";

const TONE_RING: Record<string, string> = {
  green: "border-emerald-300 text-emerald-700",
  rose: "border-rose-300 text-rose-700",
  amber: "border-amber-300 text-amber-700",
  slate: "border-slate-300 text-slate-600",
};

/** Inline status editor. */
function StatusSelect({ id, value }: { id: string; value: ResponseStatus }) {
  const [current, setCurrent] = useState(value);
  const [seen, setSeen] = useState(value);
  const [pending, start] = useTransition();
  // When the server value changes (after a revalidation), adopt it. Adjusting
  // state during render is the recommended alternative to a syncing effect.
  if (value !== seen) {
    setSeen(value);
    setCurrent(value);
  }

  const tone = STATUS_META[current]?.tone ?? "slate";

  return (
    <select
      aria-label="Response status"
      value={current}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as ResponseStatus;
        setCurrent(next);
        start(async () => {
          await updateStatus(id, next);
        });
      }}
      className={cn(
        "rounded-lg border bg-white px-2.5 py-1.5 text-xs font-medium outline-none transition focus:ring-2 focus:ring-sage-200",
        TONE_RING[tone],
        pending && "opacity-50",
      )}
    >
      {RESPONSE_STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_META[s].label}
        </option>
      ))}
    </select>
  );
}

/** Inline guest-count stepper. */
function GuestCell({ id, value }: { id: string; value: number }) {
  const [count, setCount] = useState(value);
  const [seen, setSeen] = useState(value);
  const [pending, start] = useTransition();
  if (value !== seen) {
    setSeen(value);
    setCount(value);
  }

  const change = (next: number) => {
    const clamped = Math.max(0, Math.min(50, next));
    setCount(clamped);
    start(async () => {
      await updateGuestCount(id, clamped);
    });
  };

  const stepBtn =
    "flex h-7 w-7 items-center justify-center rounded-full border border-cream-300 text-ink-500 transition hover:border-sage-300 hover:text-sage-700 disabled:opacity-40";

  return (
    <div className={cn("inline-flex items-center gap-2", pending && "opacity-60")}>
      <button type="button" className={stepBtn} onClick={() => change(count - 1)} disabled={count <= 0} aria-label="Decrease guests">
        −
      </button>
      <span className="w-5 text-center tabular-nums">{count}</span>
      <button type="button" className={stepBtn} onClick={() => change(count + 1)} aria-label="Increase guests">
        +
      </button>
    </div>
  );
}

/** Delete with confirmation. */
function DeleteButton({ id, name }: { id: string; name: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(`Delete ${name}'s RSVP? This cannot be undone.`)) {
          start(async () => {
            await deleteParticipant(id);
          });
        }
      }}
      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40"
      aria-label={`Delete ${name}`}
    >
      <TrashIcon className="h-4 w-4" />
    </button>
  );
}

export function ParticipantList({ participants }: { participants: Participant[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ResponseStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return participants.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.response_status === statusFilter;
      const matchesQuery =
        q === "" ||
        p.full_name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        (p.phone ?? "").toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [participants, query, statusFilter]);

  const columns: Column<Participant>[] = [
    {
      key: "guest",
      header: "Guest",
      render: (p) => (
        <div className="min-w-[180px]">
          <p className="font-medium text-ink-800">{p.full_name}</p>
          <p className="text-xs text-ink-400">{p.email}</p>
          {p.phone && <p className="text-xs text-ink-400">{p.phone}</p>}
        </div>
      ),
    },
    { key: "status", header: "Status", render: (p) => <StatusSelect id={p.id} value={p.response_status} /> },
    { key: "guests", header: "Guests", render: (p) => <GuestCell id={p.id} value={p.guest_count} /> },
    {
      key: "notes",
      header: "Notes",
      render: (p) =>
        p.notes ? (
          <p className="max-w-[220px] truncate text-ink-500" title={p.notes}>
            {p.notes}
          </p>
        ) : (
          <span className="text-ink-300">—</span>
        ),
    },
    {
      key: "created",
      header: "Submitted",
      render: (p) => <span className="whitespace-nowrap text-xs text-ink-400">{formatTimestamp(p.created_at)}</span>,
    },
    {
      key: "actions",
      header: "",
      headerClassName: "w-12",
      cellClassName: "text-right",
      render: (p) => <DeleteButton id={p.id} name={p.full_name} />,
    },
  ];

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative sm:max-w-xs">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone…"
              className="w-full rounded-xl border border-cream-300 bg-white py-2.5 pl-9 pr-4 text-sm text-ink-800 outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ResponseStatus | "all")}
            className={cn(selectClassName, "sm:w-48 py-2.5")}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            {RESPONSE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>

        <a href="/api/admin/export" className={buttonVariants("outline", "sm")} download>
          <DownloadIcon className="h-4 w-4" />
          Export CSV
        </a>
      </div>

      <p className="mb-3 text-xs text-ink-400">
        Showing {filtered.length} of {participants.length} {participants.length === 1 ? "response" : "responses"}
      </p>

      <AdminTable
        columns={columns}
        rows={filtered}
        getRowKey={(p) => p.id}
        emptyState={
          participants.length === 0
            ? "No RSVPs yet — share your link with guests!"
            : "No guests match your search."
        }
      />
    </div>
  );
}
