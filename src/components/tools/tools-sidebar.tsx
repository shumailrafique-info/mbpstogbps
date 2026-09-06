import Link from "next/link";
import {
  CALCULATOR_TOOLS,
  CONVERTER_TOOLS,
  GROUP_LABELS,
  TOOLS,
  type ToolEntry,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { ToolSearch } from "./tool-search";

function ToolList({
  id,
  heading,
  items,
  activeSlug,
}: {
  id: string;
  heading: string;
  items: readonly ToolEntry[];
  activeSlug?: string;
}) {
  return (
    <nav aria-labelledby={id}>
      <h2
        id={id}
        className="mb-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-primary uppercase"
      >
        {heading}
      </h2>
      <ul className="grid gap-0.5">
        {items.map((tool) => {
          const active = tool.slug === activeSlug;

          return (
            <li key={tool.slug}>
              <Link
                href={tool.path}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "-mx-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-4 w-0.5 shrink-0 rounded-full",
                    active ? "bg-primary" : "bg-border",
                  )}
                />
                <span className="truncate">{tool.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * The sidebar shown beside every tool. Built from the registry, so a new tool
 * appears here the moment it is added.
 */
export function ToolsSidebar({
  className,
  activeSlug,
}: {
  className?: string;
  activeSlug?: string;
}) {
  const index = TOOLS.map((tool) => ({
    path: tool.path,
    name: tool.name,
    badge: tool.badge,
    summary: tool.summary,
  }));

  return (
    <aside className={className} aria-label="Browse tools">
      <div className="lg:sticky lg:top-20 space-y-6">
        <ToolSearch entries={index} />

        <ToolList
          id="sidebar-converters"
          heading={GROUP_LABELS.converter}
          items={CONVERTER_TOOLS}
          activeSlug={activeSlug}
        />

        <ToolList
          id="sidebar-calculators"
          heading={GROUP_LABELS.calculator}
          items={CALCULATOR_TOOLS}
          activeSlug={activeSlug}
        />

        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            Quick maths
          </p>
          <dl className="mt-2.5 space-y-1.5 font-mono text-[12px] text-muted-foreground tabular">
            <div className="flex justify-between gap-2">
              <dt>1 Gbps</dt>
              <dd className="text-foreground">1,000 Mbps</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>1 Mbps</dt>
              <dd className="text-foreground">0.125 MB/s</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>1 MB/s</dt>
              <dd className="text-foreground">8 Mbps</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>1 Gbps</dt>
              <dd className="text-foreground">125 MB/s</dd>
            </div>
          </dl>
        </div>
      </div>
    </aside>
  );
}
