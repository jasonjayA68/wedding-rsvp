"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Botanical } from "@/components/Botanical";
import { RingsIcon, UsersIcon, XIcon } from "@/components/Icons";
import { siteContent } from "@/data/site-content";
import { cn } from "@/lib/cn";

type Group = { role: string; note?: string; names: readonly string[] };

/** Script role label with an optional letter-spaced sub-note. */
function RoleLabel({ title, note }: { title: string; note?: string }) {
  return (
    <div className="text-center">
      <p className="font-script text-2xl leading-none text-sage-700 sm:text-3xl">{title}</p>
      {note && <p className="eyebrow mt-1.5 text-[10px] text-sage-600">{note}</p>}
    </div>
  );
}

function NameList({ names, className }: { names: readonly string[]; className?: string }) {
  return (
    <ul className={cn("space-y-1 font-serif text-[15px] text-ink-700", className)}>
      {names.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

/** A role label above a centered list of names. */
function Block({ role, note, names }: Group) {
  return (
    <div className="flex flex-col items-center gap-2">
      <RoleLabel title={role} note={note} />
      <NameList names={names} className="text-center" />
    </div>
  );
}

/** A large script section divider. */
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-script text-4xl text-sage-700">{children}</h3>
      <div className="rule mt-2 w-28">
        <span>❦</span>
      </div>
    </div>
  );
}

export function Entourage() {
  const { entourage } = siteContent;
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // While open: lock body scroll, close on Escape, focus the close button,
  // and return focus to the trigger when it closes.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      trigger?.focus();
    };
  }, [open]);

  const { secondarySponsors: secondary } = entourage;

  // Principal sponsors render as two equal-length columns; any leftover names
  // (when one side has more) are centered below so they don't dangle.
  const ps = entourage.principalSponsors;
  const psPairLen = Math.min(ps.left.length, ps.right.length);
  const psTail = [...ps.left.slice(psPairLen), ...ps.right.slice(psPairLen)];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="animate-soft-pulse inline-flex h-12 items-center justify-center gap-2 rounded-full border border-sage-400 bg-white px-7 text-sm font-medium tracking-[0.08em] text-sage-700 shadow-sm outline-none transition-colors duration-200 hover:bg-sage-50 focus-visible:ring-2 focus-visible:ring-sage-300"
      >
        <UsersIcon className="h-[18px] w-[18px]" />
        {entourage.triggerLabel}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="entourage-title"
          >
            {/* Backdrop */}
            <div
              aria-hidden
              onClick={() => setOpen(false)}
              className="animate-fade-in absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            />

            {/* Panel */}
            <div className="animate-fade-up relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 shadow-2xl">
              {/* Decorative greenery, echoing the program */}
              <Botanical className="pointer-events-none absolute left-0 top-0 z-0 h-28 w-20 text-sage-300 opacity-80" />
              <Botanical className="pointer-events-none absolute right-0 top-0 z-0 h-28 w-20 -scale-x-100 text-sage-300 opacity-80" />

              {/* Floating close button (stays visible while scrolling) */}
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close entourage"
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/80 text-ink-500 shadow-sm ring-1 ring-cream-200 backdrop-blur transition hover:bg-cream-200 hover:text-ink-800"
              >
                <XIcon className="h-5 w-5" />
              </button>

              {/* Scrollable content */}
              <div className="relative z-10 flex-1 overflow-y-auto px-6 py-12 sm:px-12">
                <div className="mx-auto flex max-w-2xl flex-col items-center gap-14">
                  <header className="text-center">
                    <p className="eyebrow text-[10px] text-sage-600">The Wedding Party</p>
                    <h2 id="entourage-title" className="mt-3 font-script text-6xl text-sage-700">
                      {entourage.title}
                    </h2>
                    <p className="mt-2 eyebrow text-xs text-ink-500">{entourage.subtitle}</p>
                    <div className="rule mx-auto mt-5 w-40">
                      <span>❦</span>
                    </div>
                  </header>

                  {/* Officiant */}
                  <Block {...entourage.officiant} />

                  {/* Parents */}
                  <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2">
                    {entourage.parents.map((p) => (
                      <Block key={p.role} {...p} />
                    ))}
                  </div>

                  {/* Principal Sponsors */}
                  <section className="w-full">
                    <SectionHeading>{entourage.principalSponsors.title}</SectionHeading>
                    <p className="mb-6 mt-3 text-center eyebrow text-[10px] text-sage-600">
                      {entourage.principalSponsors.note}
                    </p>
                    {/* Two equal columns so guests see their pairing; extras center below. */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-x-10">
                      <ul className="space-y-1.5 text-right font-serif text-[13.5px] leading-snug text-ink-700 sm:text-[18px]">
                        {ps.left.slice(0, psPairLen).map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                      <ul className="space-y-1.5 text-left font-serif text-[13.5px] leading-snug text-ink-700 sm:text-[18px]">
                        {ps.right.slice(0, psPairLen).map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    </div>
                    {psTail.length > 0 && (
                      <ul className="mt-1.5 space-y-1.5 text-center font-serif text-[13.5px] leading-snug text-ink-700 sm:text-[18px]">
                        {psTail.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    )}
                  </section>

                  {/* Best Man / Maid of Honor */}
                  <section className="w-full">
                    <p className="mb-7 text-center eyebrow text-[10px] text-sage-600">
                      {entourage.assist.note}
                    </p>
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                      {entourage.assist.pair.map((p) => (
                        <Block key={p.role} {...p} />
                      ))}
                    </div>
                  </section>

                  {/* Groomsmen / Bridesmaids */}
                  <section className="w-full">
                    <p className="mb-7 text-center eyebrow text-[10px] text-sage-600">
                      {entourage.party.note}
                    </p>
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                      {entourage.party.columns.map((c) => (
                        <Block key={c.title} role={c.title} names={c.names} />
                      ))}
                    </div>
                  </section>

                  {/* Usherettes */}
                  <Block {...entourage.usherettes} />

                  {/* Secondary Sponsors */}
                  <section className="w-full">
                    <SectionHeading>{secondary.title}</SectionHeading>

                    <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
                      {secondary.rites.map((r) => (
                        <Block key={r.role} {...r} />
                      ))}
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
                      {secondary.bearers.map((b) => (
                        <Block key={b.role} {...b} />
                      ))}
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-12">
                      {secondary.offertory.map((o) => (
                        <div key={o.role} className="w-full sm:w-auto sm:max-w-[240px]">
                          <Block {...o} />
                        </div>
                      ))}
                    </div>

                    <div className="mt-12">
                      <Block {...secondary.flowerGirls} />
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-10">
                      {secondary.littles.map((l) => (
                        <Block key={l.role} {...l} />
                      ))}
                    </div>
                  </section>

                  <RingsIcon className="h-10 w-10 text-sage-400" />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
