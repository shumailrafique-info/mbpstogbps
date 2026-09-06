"use client";

import { SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

export type SearchEntry = {
  path: string;
  name: string;
  badge: string;
  summary: string;
};

/**
 * Sidebar filter over the tool list. The whole index is twelve rows, so it
 * matches in place rather than calling anything.
 */
export function ToolSearch({ entries }: { entries: SearchEntry[] }) {
  const [term, setTerm] = useState("");

  const query = term.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!query) return [];

    return entries.filter(
      (entry) =>
        entry.name.toLowerCase().includes(query) ||
        entry.badge.toLowerCase().includes(query) ||
        entry.summary.toLowerCase().includes(query),
    );
  }, [entries, query]);

  return (
    <div className="relative">
      <SearchIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Find a tool"
        aria-label="Search tools"
        className="h-10 pr-9 pl-9"
      />
      {term ? (
        <button
          type="button"
          onClick={() => setTerm("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <XIcon className="size-4" />
        </button>
      ) : null}

      {query ? (
        <div className="mt-2 overflow-hidden rounded-lg border border-border bg-card">
          {matches.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">
              No tool matches "{term}".
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {matches.map((entry) => (
                <li key={entry.path}>
                  <Link
                    href={entry.path}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 transition-colors hover:bg-accent"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {entry.name}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {entry.badge}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
