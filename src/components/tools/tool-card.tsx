import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import type { ToolEntry } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * One tool in a grid. The badge carries the conversion itself, which reads
 * faster than the full name when someone is scanning for the right tool.
 */
export function ToolCard({
  tool,
  className,
}: {
  tool: ToolEntry;
  className?: string;
}) {
  return (
    <Link
      href={tool.path}
      className={cn(
        "group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-accent/40",
        className,
      )}
    >
      <span className="w-fit rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
        {tool.badge}
      </span>
      <span className="flex items-center gap-1.5 text-[15px] font-semibold text-foreground">
        {tool.name}
        <ArrowRightIcon
          aria-hidden
          className="size-3.5 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </span>
      <span className="text-sm leading-relaxed text-muted-foreground">
        {tool.summary}
      </span>
    </Link>
  );
}
