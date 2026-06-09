import { ParticipantList } from "@/components/ParticipantList";
import { cn } from "@/lib/cn";
import type { Participant } from "@/lib/types";

function StatCard({
  label,
  value,
  accent = "text-ink-800",
}: {
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-cream-200 bg-white/70 p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.16em] text-ink-400">{label}</p>
      <p className={cn("mt-2 font-serif text-3xl tabular-nums", accent)}>{value}</p>
    </div>
  );
}

export function AdminDashboard({
  participants,
  loadError,
}: {
  participants: Participant[];
  loadError?: boolean;
}) {
  const guestsComing = participants
    .filter((p) => p.response_status === "attending")
    .reduce((sum, p) => sum + (p.guest_count || 0), 0);
  const maybe = participants.filter((p) => p.response_status === "maybe").length;
  const declined = participants.filter((p) => p.response_status === "not_attending").length;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total responses" value={participants.length} />
        <StatCard label="Guests attending" value={guestsComing} accent="text-sage-700" />
        <StatCard label="Maybe" value={maybe} accent="text-amber-600" />
        <StatCard label="Declined" value={declined} accent="text-rose-600" />
      </div>

      {loadError && (
        <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Couldn&apos;t load responses. Check that your Supabase env vars are set and that the SQL
          schema in <code>supabase/schema.sql</code> has been applied.
        </p>
      )}

      <div className="mt-8">
        <ParticipantList participants={participants} />
      </div>
    </div>
  );
}
