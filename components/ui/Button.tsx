import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-sage-600 text-cream-50 hover:bg-sage-700 focus-visible:ring-sage-300 shadow-sm",
  outline:
    "border border-sage-300 text-sage-700 hover:bg-sage-50 focus-visible:ring-sage-200",
  ghost: "text-sage-700 hover:bg-sage-100 focus-visible:ring-sage-200",
  danger:
    "border border-rose-200 text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-200",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-sm",
};

/** Shared button styling, usable on `<button>`, `<Link>`, or `<a>`. */
export function buttonVariants(variant: Variant = "primary", size: Size = "md"): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.08em] transition-colors duration-200 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return <button className={cn(buttonVariants(variant, size), className)} {...props} />;
}
