import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type Column<T> = {
  key: string;
  header: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => ReactNode;
};

/**
 * Reusable, presentational data table. Pass a `columns` config (each with a
 * `render` function) and an array of `rows`. Horizontally scrolls on small
 * screens so it stays usable on mobile.
 */
export function AdminTable<T>({
  columns,
  rows,
  getRowKey,
  emptyState,
}: {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyState?: ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cream-200 bg-white/70 shadow-sm">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-cream-200">
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  "px-5 py-4 text-xs font-semibold uppercase tracking-wider text-ink-400",
                  c.headerClassName,
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-16 text-center text-ink-400">
                {emptyState ?? "No records found."}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-b border-cream-100 transition-colors last:border-0 hover:bg-cream-50/70"
              >
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-5 py-4 align-middle", c.cellClassName)}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
