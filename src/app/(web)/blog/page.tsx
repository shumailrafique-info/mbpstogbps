import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import {
  absoluteUrl,
  breadcrumbList,
  graph,
  organizationRef,
  webSiteRef,
} from "@/lib/seo";
import { ogImagePath } from "@/server/page-metadata";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Longer pieces on internet speed, bandwidth and the units behind them - what the numbers mean and where they mislead.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "MbpsToGbps",
    title: "Blog",
    url: "/blog",
    images: [{ url: ogImagePath("Blog"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    images: [ogImagePath("Blog")],
  },
};

export default async function Page() {
  const posts = await db
    .select({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      cover_image: blog.cover_image,
      image_alt: blog.image_alt,
      published_at: blog.published_at,
    })
    .from(blog)
    // Drafts never reach the public site.
    .where(eq(blog.status, "PUBLISHED"))
    .orderBy(desc(blog.published_at));

  // Structured data for the blog index and its posts.
  const schema = graph([
    {
      "@type": "Blog",
      "@id": `${absoluteUrl("/blog")}#blog`,
      name: "Blog",
      url: absoluteUrl("/blog"),
      isPartOf: webSiteRef,
      publisher: organizationRef,
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/blog/${post.slug}`)}#post`,
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.published_at?.toISOString(),
      })),
    },
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ]);

  return (
    <div className="space-y-10">
      <JsonLd data={schema} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <header>
        <h1 className="text-[26px] leading-[1.2] font-semibold tracking-tight text-foreground sm:text-[30px]">
          Blog
        </h1>
        <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
          Longer pieces on internet speed, bandwidth and the units behind them -
          what the numbers mean, and where they mislead.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="border-l-2 border-primary py-1 pl-3 text-[15px] text-muted-foreground">
          No posts published yet. Check back soon.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                {post.cover_image?.url ? (
                  // biome-ignore lint/performance/noImgElement: <explanation
                  <img
                    src={post.cover_image.url}
                    alt={post.image_alt}
                    className="aspect-video w-full rounded-lg border border-border object-cover transition-colors group-hover:border-primary"
                  />
                ) : (
                  <div className="aspect-video w-full rounded-lg border border-dashed border-border bg-muted" />
                )}

                <div className="flex flex-1 flex-col">
                  {post.published_at ? (
                    <time
                      dateTime={post.published_at.toISOString()}
                      className="text-[13px] text-muted-foreground"
                    >
                      {dateFormatter.format(post.published_at)}
                    </time>
                  ) : null}

                  <h2 className="mt-1 text-[17px] leading-snug font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-[15px] leading-[1.7] text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <span className="mt-3 text-[13px] font-medium text-primary transition-colors group-hover:text-primary">
                    Read article →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
