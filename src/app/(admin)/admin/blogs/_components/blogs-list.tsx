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
        published ? "bg-accent text-primary" : "bg-muted text-muted-foreground"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${published ? "bg-primary" : "bg-muted-foreground"}`}
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
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Blog posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
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

      <div className="border-b border-border px-6 py-4 sm:px-8">
        <div className="relative max-w-sm">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
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
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8">
        {isError ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-6 py-12 text-center">
            <p className="text-sm font-medium text-destructive">
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
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center">
            <p className="text-base font-medium text-foreground">
              {search ? "No matching posts" : "No blog posts yet"}
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
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
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Post
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-muted-foreground md:table-cell">
                    Published
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-muted-foreground lg:table-cell">
                    Updated
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/60"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {item.cover_image?.url ? (
                          // biome-ignore lint/performance/noImgElement: due
                          <img
                            src={item.cover_image.url}
                            alt={item.image_alt}
                            className="h-12 w-20 shrink-0 rounded-md border border-border object-cover"
                          />
                        ) : (
                          <div className="h-12 w-20 shrink-0 rounded-md border border-dashed border-border bg-muted" />
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            /{item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="hidden px-4 py-3 whitespace-nowrap text-muted-foreground md:table-cell">
                      {item.published_at
                        ? dateFormatter.format(new Date(item.published_at))
                        : "—"}
                    </td>

                    <td className="hidden px-4 py-3 whitespace-nowrap text-muted-foreground lg:table-cell">
                      {dateFormatter.format(new Date(item.updated_at))}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          nativeButton={false}
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:bg-accent hover:text-primary"
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
