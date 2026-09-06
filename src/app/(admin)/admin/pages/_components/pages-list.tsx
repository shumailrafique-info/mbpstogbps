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
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Page content
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isPending
              ? "Loading…"
              : `${configuredSet.size} of ${MANAGED_PAGES.length} pages have content`}
          </p>
        </div>
      </div>

      <div className="border-b border-slate-200 px-6 py-4 sm:px-8">
        <div className="relative max-w-sm">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
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
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <XIcon className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8">
        {isError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-12 text-center text-sm font-medium text-red-700">
            {error?.message || "Could not load page content."}
          </div>
        ) : isPending ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4, 5].map((row) => (
              <Skeleton key={row} className="h-12 w-full rounded-md" />
            ))}
          </div>
        ) : pages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 px-6 py-16 text-center text-sm text-slate-500">
            No pages match that search.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-medium text-slate-600">Page</th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-600">
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
                      className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-blue-50/40"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">
                          {page.name}
                        </p>
                        <p className="text-xs text-slate-500">{page.path}</p>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            hasContent
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${hasContent ? "bg-blue-600" : "bg-slate-400"}`}
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
                            className="text-slate-600 hover:bg-blue-50 hover:text-blue-700"
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
                            className="text-slate-500 hover:bg-blue-50 hover:text-blue-700"
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
