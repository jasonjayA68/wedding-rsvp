/**
 * Inline line-icons (no icon library dependency). All use `currentColor` so
 * they inherit text color, and accept a `className` for sizing.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function RingsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="14" r="6" />
      <circle cx="15" cy="14" r="6" />
      <path d="M9 8l1.5-3h3L15 8" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function DressIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3l3 3 3-3M9 3l-1 4 4 3 4-3-1-4M8 7l-3 6 3 1M16 7l3 6-3 1M8 14l-1 7h10l-1-7" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Symmetric heart centered on x=12 so it sits centered in its circle. */}
      <path d="M12 20.6l-1.45-1.32C5.4 14.74 2 11.66 2 7.88 2 4.8 4.42 2.38 7.5 2.38c1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 20.6z" />
    </svg>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="8" width="18" height="4.5" rx="1" />
      <path d="M19.5 12.5V20a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-7.5" />
      <path d="M12 8v13" />
      <path d="M12 8C12 8 10.7 4 8.2 4a2.1 2.1 0 0 0 0 4z" />
      <path d="M12 8C12 8 13.3 4 15.8 4a2.1 2.1 0 0 1 0 4z" />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg {...base} {...props} className={`animate-spin ${props.className ?? ""}`}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
    </svg>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15 4h3a1 1 0 011 1v14a1 1 0 01-1 1h-3M10 12H3m0 0l3-3m-3 3l3 3" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-9 0l1 13h8l1-13" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12l4.5 4.5L19 7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** Map the string names used in site-content.ts to the detail icons. */
const DETAIL_ICONS = {
  rings: RingsIcon,
  calendar: CalendarIcon,
  location: LocationIcon,
  clock: ClockIcon,
  dress: DressIcon,
  heart: HeartIcon,
};

export function DetailIcon({
  name,
  className,
}: {
  name: keyof typeof DETAIL_ICONS;
  className?: string;
}) {
  const Cmp = DETAIL_ICONS[name] ?? HeartIcon;
  return <Cmp className={className} />;
}
