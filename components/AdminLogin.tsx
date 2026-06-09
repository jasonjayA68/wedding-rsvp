"use client";

import { useActionState } from "react";

import { login, type LoginState } from "@/app/admin/actions";
import { Field } from "@/components/ui/Field";
import { inputClassName } from "@/components/ui/inputs";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { siteContent } from "@/data/site-content";

const initial: LoginState = {};

export function AdminLogin() {
  const [state, formAction] = useActionState(login, initial);

  return (
    <div className="w-full max-w-sm">
      <div className="text-center">
        <p className="font-script text-5xl text-sage-700">
          {siteContent.couple.partnerOne} &amp; {siteContent.couple.partnerTwo}
        </p>
        <h1 className="mt-4 font-serif text-2xl text-ink-800">Admin sign in</h1>
        <p className="mt-1 text-sm text-ink-400">Manage your guest responses</p>
      </div>

      <form
        action={formAction}
        className="mt-8 space-y-5 rounded-2xl border border-cream-200 bg-white/70 p-7 shadow-sm"
        noValidate
      >
        {state.error && (
          <p
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {state.error}
          </p>
        )}

        <Field label="Username" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="username"
            required
            placeholder="admin"
            className={inputClassName}
          />
        </Field>

        <Field label="Password" htmlFor="password" required>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className={inputClassName}
          />
        </Field>

        <SubmitButton size="md" pendingLabel="Signing in…" className="w-full">
          Sign in
        </SubmitButton>
      </form>
    </div>
  );
}
