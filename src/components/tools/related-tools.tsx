import Link from "next/link";
import { toolBySlug } from "@/lib/navigation";
import { SectionHeading } from "./section-heading";

/**
 * Related tools for a page, driven by the slugs stored on its content row.
 *
 * Slugs resolve through the registry and anything unknown is dropped, so a
 * renamed tool leaves one fewer link rather than a dead one.
 */
export function RelatedTools({ slugs }: { slugs: readonly string[] }) {
  const related = slugs
    .map((slug) => toolBySlug(slug))
    .filter((tool) => tool !== undefined);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <SectionHeading
        id="related-heading"
        kicker="Keep going"
        title="Related tools"
      />
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={tool.path}
              className="group flex h-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:border-primary hover:bg-accent/40"
            >
              <span className="truncate text-sm font-medium text-foreground">
                {tool.name}
              </span>
              <span className="shrink-0 font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-primary">
                {tool.badge}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
