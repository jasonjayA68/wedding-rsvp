"use client";

import { useFormStatus } from "react-dom";

import { SpinnerIcon } from "@/components/Icons";
import { Button } from "@/components/ui/Button";

/**
 * Submit button that reads the parent <form>'s pending state via
 * `useFormStatus` and shows a spinner + disables itself while submitting.
 */
export function SubmitButton({
  children,
  pendingLabel,
  size = "lg",
  className,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size={size} className={className} disabled={pending} aria-busy={pending}>
      {pending && <SpinnerIcon className="h-4 w-4" />}
      {pending ? (pendingLabel ?? "Sending…") : children}
    </Button>
  );
}
