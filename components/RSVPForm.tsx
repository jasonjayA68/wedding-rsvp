"use client";

import { useActionState, useState } from "react";

import { submitRsvp, type RsvpFormState } from "@/app/actions/rsvp";
import { CheckIcon } from "@/components/Icons";
import { Field } from "@/components/ui/Field";
import { inputClassName, selectClassName } from "@/components/ui/inputs";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { siteContent } from "@/data/site-content";
import { cn } from "@/lib/cn";
import type { ResponseStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: ResponseStatus; label: string; hint: string }[] = [
  { value: "attending", label: "Joyfully accepts", hint: "I'll be there" },
  { value: "maybe", label: "Tentative", hint: "Not sure yet" },
  { value: "not_attending", label: "Regretfully declines", hint: "Can't make it" },
];

const initialRsvpState: RsvpFormState = { status: "idle" };

export function RSVPForm() {
  const { rsvp } = siteContent;
  const [state, formAction] = useActionState(submitRsvp, initialRsvpState);
  const [status, setStatus] = useState<ResponseStatus>("attending");

  if (state.status === "success") {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-sage-200 bg-white/70 p-10 text-center shadow-sm backdrop-blur-sm">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-serif text-3xl text-ink-800">{rsvp.successTitle}</h3>
        <p className="mt-3 text-ink-500">{rsvp.successMessage}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 text-sm font-medium text-sage-600 underline-offset-4 hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  const showGuests = status !== "not_attending";

  return (
    <form
      action={formAction}
      className="mx-auto max-w-xl rounded-3xl border border-cream-200 bg-white/60 p-7 shadow-sm backdrop-blur-sm sm:p-10"
      noValidate
    >
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="full_name" required error={state.errors?.full_name?.[0]}>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            placeholder="Juan Dela Cruz"
            className={inputClassName}
          />
        </Field>

        <Field label="Email" htmlFor="email" required error={state.errors?.email?.[0]}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            className={inputClassName}
          />
        </Field>
      </div>

      <Field
        label="Phone"
        htmlFor="phone"
        hint="Optional — in case we need to reach you."
        error={state.errors?.phone?.[0]}
        className="mt-5"
      >
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+63 900 000 0000"
          className={inputClassName}
        />
      </Field>

      {/* Response status — segmented radio group */}
      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
          Will you attend? <span className="text-sage-500">*</span>
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {STATUS_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer flex-col rounded-xl border px-4 py-3 text-center transition-all",
                status === opt.value
                  ? "border-sage-400 bg-sage-50 ring-2 ring-sage-200"
                  : "border-cream-300 bg-white/60 hover:border-sage-200",
              )}
            >
              <input
                type="radio"
                name="response_status"
                value={opt.value}
                checked={status === opt.value}
                onChange={() => setStatus(opt.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium text-ink-800">{opt.label}</span>
              <span className="mt-0.5 text-xs text-ink-400">{opt.hint}</span>
            </label>
          ))}
        </div>
        {state.errors?.response_status?.[0] && (
          <p className="mt-2 text-xs font-medium text-rose-600">{state.errors.response_status[0]}</p>
        )}
      </fieldset>

      {showGuests && (
        <Field
          label="Number of guests"
          htmlFor="guest_count"
          hint="Including yourself."
          error={state.errors?.guest_count?.[0]}
          className="mt-6"
        >
          <select id="guest_count" name="guest_count" defaultValue="1" className={selectClassName}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field
        label="Notes"
        htmlFor="notes"
        hint="Dietary needs, a song request, or a message for the couple."
        error={state.errors?.notes?.[0]}
        className="mt-6"
      >
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="We can't wait to celebrate with you!"
          className={inputClassName}
        />
      </Field>

      <div className="mt-8 flex flex-col items-center gap-3">
        <SubmitButton pendingLabel="Sending your RSVP…" className="w-full sm:w-auto">
          Send RSVP
        </SubmitButton>
        <p className="text-xs text-ink-400">
          You can update your response anytime by submitting again with the same email.
        </p>
      </div>
    </form>
  );
}
