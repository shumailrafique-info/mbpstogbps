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
      className="group flex flex-col gap-3 rounded-lg border border-slate-200 p-5 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-slate-400 transition-colors group-hover:text-blue-600">
          {icon}
        </span>
      </div>
      <p className="text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="text-xs text-slate-500">{detail}</p>
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
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
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
              <h2 className="text-sm font-semibold tracking-tight text-slate-900">
                Recently updated posts
              </h2>
              <Link
                href="/admin/blogs"
                className="text-xs font-medium text-blue-700 transition-colors hover:text-blue-900"
              >
                View all
              </Link>
            </div>

            {stats.recentPosts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 px-6 py-12 text-center">
                <p className="text-sm font-medium text-slate-900">
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
              <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                {stats.recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/admin/blogs/edit/${post.id}`}
                      className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-blue-50/40"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {post.title}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          /{post.slug}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            post.status === "PUBLISHED"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              post.status === "PUBLISHED"
                                ? "bg-blue-600"
                                : "bg-slate-400"
                            }`}
                          />
                          {post.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                        <span className="hidden text-xs whitespace-nowrap text-slate-500 sm:inline">
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
            <h2 className="mb-3 text-sm font-semibold tracking-tight text-slate-900">
              Needs attention
            </h2>

            <div className="rounded-lg border border-slate-200 p-4">
              {stats.pages.empty.length === 0 ? (
                <p className="text-sm text-slate-600">
                  Every managed page has content. Nothing to do here.
                </p>
              ) : (
                <>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-900">
                      {stats.pages.empty.length}
                    </span>{" "}
                    {stats.pages.empty.length === 1 ? "page has" : "pages have"}{" "}
                    no content yet.
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {stats.pages.empty.slice(0, 6).map((name) => (
                      <li
                        key={name}
                        className="truncate text-xs text-slate-500"
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

            <div className="mt-4 rounded-lg border border-slate-200 p-4">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Related links
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                <span className="font-medium text-slate-900">
                  {stats.faqs.pagesWithRelated}
                </span>{" "}
                generator pages have related links configured.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
