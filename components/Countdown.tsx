"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(targetMs: number): Parts {
  const total = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

/**
 * Live countdown to the event. Renders a stable placeholder on the server and
 * until mounted to avoid hydration mismatches (the value is time-dependent).
 */
export function Countdown({ targetISO, time = "13:00:00" }: { targetISO: string; time?: string }) {
  const targetMs = new Date(`${targetISO}T${time}`).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const update = () => setParts(diff(targetMs));
    // First update on the next frame (async, so it doesn't run during the
    // effect body), then tick every second.
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [targetMs]);

  const units: { label: string; value: number | null }[] = [
    { label: "Days", value: parts?.days ?? null },
    { label: "Hours", value: parts?.hours ?? null },
    { label: "Minutes", value: parts?.minutes ?? null },
    { label: "Seconds", value: parts?.seconds ?? null },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5" aria-label="Time until the wedding">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="font-serif text-3xl tabular-nums text-sage-700 sm:text-4xl">
            {u.value === null ? "—" : String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink-400">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
