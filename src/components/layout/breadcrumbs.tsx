import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-4 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="font-medium text-blue-700 transition-colors hover:text-blue-900"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? "text-foreground" : undefined}
                >
                  {item.label}
                </span>
              )}
              {last ? null : (
                <ChevronRight aria-hidden className="size-3 text-blue-300" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
