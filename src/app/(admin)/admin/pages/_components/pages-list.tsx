"use client";

import { ExternalLinkIcon, PencilIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MANAGED_PAGES } from "@/lib/page-content";
import { useConfiguredSlugs } from "@/lib/react-query/hooks/use-page-content";

const PagesList = () => {
  const [term, setTerm] = useState("");
  const { data: configured, isPending, isError, error } = useConfiguredSlugs();

  const configuredSet = new Set(configured ?? []);
  const query = term.trim().toLowerCase();
  const pages = query
    ? MANAGED_PAGES.filter(
        (page) =>
          page.name.toLowerCase().includes(query) ||
          page.slug.toLowerCase().includes(query),
      )
    : MANAGED_PAGES;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Page content
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isPending
              ? "Loading…"
              : `${configuredSet.size} of ${MANAGED_PAGES.length} pages have content`}
          </p>
        </div>
      </div>

      <div className="border-b border-border px-6 py-4 sm:px-8">
        <div className="relative max-w-sm">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search pages"
            aria-label="Search pages by name or slug"
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
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8">
        {isError ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-6 py-12 text-center text-sm font-medium text-destructive">
            {error?.message || "Could not load page content."}
          </div>
        ) : isPending ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4, 5].map((row) => (
              <Skeleton key={row} className="h-12 w-full rounded-md" />
            ))}
          </div>
        ) : pages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground">
            No pages match that search.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Page
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {pages.map((page) => {
                  const hasContent = configuredSet.has(page.slug);

                  return (
                    <tr
                      key={page.slug}
                      className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/60"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">
                          {page.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {page.path}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            hasContent
                              ? "bg-accent text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${hasContent ? "bg-primary" : "bg-muted-foreground"}`}
                          />
                          {hasContent ? "Has content" : "Empty"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            className="text-muted-foreground hover:bg-accent hover:text-primary"
                            nativeButton={false}
                            render={<Link href={`/admin/pages/${page.slug}`} />}
                          >
                            <PencilIcon />
                            {hasContent ? "Edit" : "Add"}
                          </Button>
                          <Button
                            nativeButton={false}
                            variant="ghost"
                            size="icon-sm"
                            type="button"
                            className="text-muted-foreground hover:bg-accent hover:text-primary"
                            render={
                              <Link
                                href={page.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${page.name}`}
                              />
                            }
                          >
                            <ExternalLinkIcon />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagesList;
