import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** A page section with a centered, letter-spaced heading and a sage rule. */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-16 px-6 py-20 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-5xl">
        {(eyebrow || title || subtitle) && (
          <header className="mb-12 flex flex-col items-center text-center sm:mb-16">
            {eyebrow && (
              <p className="eyebrow mb-4 text-xs text-sage-600">{eyebrow}</p>
            )}
            {title && (
              <h2 className="text-4xl font-light text-ink-800 sm:text-5xl">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-4 max-w-xl text-balance text-ink-500">{subtitle}</p>
            )}
            <div className="rule mt-8 w-full max-w-xs">
              <span className="text-base">❦</span>
            </div>
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
