"use client";

import { PencilIcon, PlusIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogType } from "@/drizzle/types";
import { useBlogs } from "@/lib/react-query/hooks/use-blog";
import DeleteBlogDialog from "./delete-blog-dialog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function StatusBadge({ status }: { status: BlogType["status"] }) {
  const published = status === "PUBLISHED";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        published ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${published ? "bg-blue-600" : "bg-slate-400"}`}
      />
      {published ? "Published" : "Draft"}
    </span>
  );
}

const BlogsList = () => {
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");

  // Debounced so typing does not fire a server action per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(term.trim()), 300);
    return () => clearTimeout(timer);
  }, [term]);

  const { data: blogs, isPending, isError, error, refetch } = useBlogs(search);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Blog posts
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isPending
              ? "Loading posts…"
              : `${blogs?.length ?? 0} ${blogs?.length === 1 ? "post" : "posts"}${
                  search ? ` matching “${search}”` : ""
                }`}
          </p>
        </div>

        <Button
          nativeButton={false}
          size="lg"
          render={<Link href="/admin/blogs/new" />}
        >
          <PlusIcon />
          New post
        </Button>
      </div>

      <div className="border-b border-slate-200 px-6 py-4 sm:px-8">
        <div className="relative max-w-sm">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search by title or slug"
            aria-label="Search blog posts by title or slug"
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
          <div className="flex flex-col items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="text-sm font-medium text-red-700">
              {error?.message || "Could not load blog posts."}
            </p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : isPending ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="flex items-center gap-4">
                <Skeleton className="h-14 w-20 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/5" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-slate-300 px-6 py-16 text-center">
            <p className="text-base font-medium text-slate-900">
              {search ? "No matching posts" : "No blog posts yet"}
            </p>
            <p className="max-w-sm text-sm text-slate-500">
              {search
                ? "Nothing matched that title or slug. Try a different search."
                : "Publish your first post and it will show up right here."}
            </p>
            {search ? (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setTerm("")}
              >
                Clear search
              </Button>
            ) : (
              <Button
                size="sm"
                className="mt-2"
                nativeButton={false}
                render={<Link href="/admin/blogs/new" />}
              >
                <PlusIcon />
                New post
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-medium text-slate-600">Post</th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Status
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-slate-600 md:table-cell">
                    Published
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-slate-600 lg:table-cell">
                    Updated
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-blue-50/40"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {item.cover_image?.url ? (
                          // biome-ignore lint/performance/noImgElement: due
                          <img
                            src={item.cover_image.url}
                            alt={item.image_alt}
                            className="h-12 w-20 shrink-0 rounded-md border border-slate-200 object-cover"
                          />
                        ) : (
                          <div className="h-12 w-20 shrink-0 rounded-md border border-dashed border-slate-200 bg-slate-50" />
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-900">
                            {item.title}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            /{item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="hidden px-4 py-3 whitespace-nowrap text-slate-600 md:table-cell">
                      {item.published_at
                        ? dateFormatter.format(new Date(item.published_at))
                        : "—"}
                    </td>

                    <td className="hidden px-4 py-3 whitespace-nowrap text-slate-600 lg:table-cell">
                      {dateFormatter.format(new Date(item.updated_at))}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          nativeButton={false}
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                          render={
                            <Link href={`/admin/blogs/edit/${item.id}`} />
                          }
                        >
                          <PencilIcon />
                          Edit
                        </Button>
                        <DeleteBlogDialog id={item.id} title={item.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsList;
