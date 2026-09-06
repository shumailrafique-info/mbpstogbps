import {
  BookOpenIcon,
  FileTextIcon,
  MessageCircleQuestionIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAdminStats } from "@/server/admin-stats";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function StatCard({
  label,
  value,
  detail,
  icon,
  href,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-lg border border-border p-5 transition-colors hover:border-primary hover:bg-accent/60"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <span className="text-muted-foreground transition-colors group-hover:text-primary">
          {icon}
        </span>
      </div>
      <p className="text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </Link>
  );
}

export default async function Page() {
  const stats = await getAdminStats();

  const coverage = Math.round(
    (stats.pages.configured / stats.pages.managed) * 100,
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            An overview of the content on the site.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            nativeButton={false}
            size="lg"
            render={<Link href="/admin/blogs/new" />}
          >
            <PlusIcon />
            New post
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/pages" />}
          >
            Page content
          </Button>
        </div>
      </div>

      <div className="space-y-8 px-6 py-6 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Blog posts"
            value={stats.blogs.total}
            detail={`${stats.blogs.published} published, ${stats.blogs.drafts} draft`}
            icon={<BookOpenIcon className="size-5" />}
            href="/admin/blogs"
          />
          <StatCard
            label="Pages with content"
            value={`${stats.pages.configured}/${stats.pages.managed}`}
            detail={`${coverage}% of managed pages filled in`}
            icon={<FileTextIcon className="size-5" />}
            href="/admin/pages"
          />
          <StatCard
            label="FAQs"
            value={stats.faqs.total}
            detail={`across ${stats.faqs.pagesWithFaqs} pages`}
            icon={<MessageCircleQuestionIcon className="size-5" />}
            href="/admin/pages"
          />
          <StatCard
            label="Users"
            value={stats.users.total}
            detail={`${stats.users.admins} with admin access`}
            icon={<UsersIcon className="size-5" />}
            href="/admin"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                Recently updated posts
              </h2>
              <Link
                href="/admin/blogs"
                className="text-xs font-medium text-primary transition-colors hover:text-primary"
              >
                View all
              </Link>
            </div>

            {stats.recentPosts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border px-6 py-12 text-center">
                <p className="text-sm font-medium text-foreground">
                  No blog posts yet
                </p>
                <Button
                  size="sm"
                  className="mt-3"
                  nativeButton={false}
                  render={<Link href="/admin/blogs/new" />}
                >
                  <PlusIcon />
                  Write the first one
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-border rounded-lg border border-border">
                {stats.recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/admin/blogs/edit/${post.id}`}
                      className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-accent/60"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {post.title}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          /{post.slug}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            post.status === "PUBLISHED"
                              ? "bg-accent text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              post.status === "PUBLISHED"
                                ? "bg-primary"
                                : "bg-muted-foreground"
                            }`}
                          />
                          {post.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                        <span className="hidden text-xs whitespace-nowrap text-muted-foreground sm:inline">
                          {dateFormatter.format(new Date(post.updated_at))}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold tracking-tight text-foreground">
              Needs attention
            </h2>

            <div className="rounded-lg border border-border p-4">
              {stats.pages.empty.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Every managed page has content. Nothing to do here.
                </p>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {stats.pages.empty.length}
                    </span>{" "}
                    {stats.pages.empty.length === 1 ? "page has" : "pages have"}{" "}
                    no content yet.
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {stats.pages.empty.slice(0, 6).map((name) => (
                      <li
                        key={name}
                        className="truncate text-xs text-muted-foreground"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    nativeButton={false}
                    render={<Link href="/admin/pages" />}
                  >
                    Fill them in
                  </Button>
                </>
              )}
            </div>

            <div className="mt-4 rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Related links
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {stats.faqs.pagesWithRelated}
                </span>{" "}
                tool pages have related links configured.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
