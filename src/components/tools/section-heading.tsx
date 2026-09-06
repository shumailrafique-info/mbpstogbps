import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared section header: a mono kicker above the title, with a rule that runs
 * to the edge. Used by every band on a tool page so they read as one document.
 */
export function SectionHeading({
  id,
  kicker,
  title,
  description,
  action,
  className,
}: {
  id?: string;
  kicker?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          {kicker ? (
            <p className="mb-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
              {kicker}
            </p>
          ) : null}
          <h2
            id={id}
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            {title}
          </h2>
        </div>
        {action}
      </div>
      {description ? (
        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      <div className="mt-4 h-px w-full bg-border" />
    </div>
  );
}
