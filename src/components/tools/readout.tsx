import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

/** The card every tool sits in. */
export function ToolPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * The headline answer.
 *
 * Kept deliberately loud and monospaced: it is the reason the page exists, and
 * tabular figures stop it jumping around as the reader types.
 */
export function Readout({
  label,
  value,
  unit,
  caption,
  copyValue,
  tone = "primary",
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  caption?: ReactNode;
  copyValue?: string;
  tone?: "primary" | "muted";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        tone === "primary"
          ? "border-primary/30 bg-accent/50"
          : "border-border bg-muted/40",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          {label}
        </p>
        {copyValue ? (
          <CopyButton value={copyValue} label={label} className="-mt-1" />
        ) : null}
      </div>

      <p className="mt-2 flex flex-wrap items-baseline gap-x-2 font-mono font-bold tracking-tight text-foreground tabular">
        <span className="text-3xl break-all sm:text-4xl">{value}</span>
        {unit ? (
          <span className="text-lg text-primary sm:text-xl">{unit}</span>
        ) : null}
      </p>

      {caption ? (
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

/** A secondary figure sitting under the headline. */
export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-mono text-sm font-semibold text-foreground tabular">
        {value}
      </p>
      {hint ? (
        <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function StatGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}

/**
 * A reference table. Scrolls inside itself rather than pushing the page wide
 * on a phone.
 */
export function DataTable({
  caption,
  columns,
  rows,
  highlightIndex,
}: {
  caption?: string;
  columns: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  /** Row to mark as the reader's current figure. */
  highlightIndex?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-lg grid border border-border">
      <table className="w-full  border-collapse text-sm">
        {caption ? (
          <caption className="px-4 pt-3 pb-2 text-left text-[13px] text-muted-foreground">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-2.5 text-left font-mono text-[11px] font-semibold tracking-widest text-muted-foreground uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              // Rows are positional reference data with no id of their own.
              // biome-ignore lint/suspicious/noArrayIndexKey: static reference rows
              key={index}
              className={cn(
                "border-b border-border last:border-0",
                index === highlightIndex
                  ? "bg-accent/60"
                  : "odd:bg-muted/20 hover:bg-muted/40",
              )}
            >
              {row.map((cell, cellIndex) => (
                <td
                  // biome-ignore lint/suspicious/noArrayIndexKey: static reference cells
                  key={cellIndex}
                  className={cn(
                    "px-4 py-2.5 tabular",
                    cellIndex === 0
                      ? "font-medium text-foreground"
                      : "font-mono text-muted-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A short aside explaining an assumption the tool has made. */
export function Note({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border border-l-2 border-l-primary bg-muted/30 px-4 py-3">
      {title ? (
        <p className="mb-1 text-[13px] font-semibold text-foreground">
          {title}
        </p>
      ) : null}
      <p className="text-[13px] leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}
