/**
 * Decorative eucalyptus sprig drawn as an SVG. Purely ornamental
 * (aria-hidden). Color comes from `currentColor`, so set a text color on the
 * wrapper. Rotate/scale/position with utility classes from the parent.
 */
import type { SVGProps } from "react";

export function Botanical({ className, ...props }: SVGProps<SVGSVGElement>) {
  // Leaves placed along a gently curving stem.
  const leaves = [
    { cx: 30, cy: 150, rx: 9, ry: 5, rot: -32 },
    { cx: 46, cy: 132, rx: 10, ry: 5.5, rot: -20 },
    { cx: 60, cy: 112, rx: 11, ry: 6, rot: -12 },
    { cx: 72, cy: 90, rx: 11, ry: 6, rot: -4 },
    { cx: 82, cy: 66, rx: 10, ry: 6, rot: 6 },
    { cx: 90, cy: 42, rx: 9, ry: 5.5, rot: 16 },
    { cx: 95, cy: 20, rx: 7.5, ry: 4.5, rot: 28 },
    // left-side leaves
    { cx: 16, cy: 138, rx: 9, ry: 5, rot: 32 },
    { cx: 30, cy: 116, rx: 10, ry: 5.5, rot: 24 },
    { cx: 44, cy: 92, rx: 10, ry: 6, rot: 14 },
    { cx: 56, cy: 66, rx: 9, ry: 5.5, rot: 6 },
    { cx: 66, cy: 40, rx: 8, ry: 5, rot: -6 },
  ];

  return (
    <svg
      viewBox="0 0 120 170"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M22 168 C 40 130, 70 96, 86 56 C 92 40, 96 24, 98 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.cx}
          cy={l.cy}
          rx={l.rx}
          ry={l.ry}
          transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
          fill="currentColor"
          opacity={0.16 + (i % 3) * 0.05}
        />
      ))}
    </svg>
  );
}
