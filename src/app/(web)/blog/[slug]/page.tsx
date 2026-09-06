import { and, desc, eq, ne } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import { BLOG_PROSE } from "@/lib/blogProse";
import {
  absoluteUrl,
  breadcrumbList,
  graph,
  organizationRef,
  webSiteRef,
} from "@/lib/seo";
import { getPublishedPost } from "@/server/blog";
import { ogImagePath } from "@/server/page-metadata";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return { robots: { index: false, follow: false } };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const url = `/blog/${post.slug}`;

  const image = post.cover_image?.url ?? ogImagePath(title, description);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      siteName: "MbpsToGbps",
      title,
      description,
      url,
      publishedTime: post.published_at?.toISOString(),
      modifiedTime: post.updated_at.toISOString(),
      images: [{ url: image, alt: post.image_alt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const morePosts = await db
    .select({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
    })
    .from(blog)
    .where(and(eq(blog.status, "PUBLISHED"), ne(blog.id, post.id)))
    .orderBy(desc(blog.published_at))
    .limit(3);

  const url = `/blog/${post.slug}`;

  // Article structured data. dateModified comes from the row, so an edit in
  // the dashboard is reflected without touching this file.
  const schema = graph([
    {
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(url)}#post`,
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(url),
      mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(url) },
      image: post.cover_image?.url ? [post.cover_image.url] : undefined,
      datePublished: post.published_at?.toISOString(),
      dateModified: post.updated_at.toISOString(),
      // A named byline when the post has an author, otherwise the site itself.
      author: post.author
        ? {
            "@type": "Person",
            name: post.author.name,
            image: post.author.image ?? undefined,
          }
        : organizationRef,
      publisher: organizationRef,
      isPartOf: webSiteRef,
    },
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: url },
    ]),
  ]);

  return (
    <div className="space-y-10">
      <JsonLd data={schema} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        className="mx-auto max-w-[68ch]"
      />

      <article className="max-w-[68ch] mx-auto">
        <header>
          {post.published_at ? (
            <time
              dateTime={post.published_at.toISOString()}
              className="text-[13px] text-muted-foreground"
            >
              {dateFormatter.format(post.published_at)}
            </time>
          ) : null}

          <h1 className="mt-1.5 text-[26px] leading-[1.2] font-semibold tracking-tight text-foreground sm:text-[30px]">
            {post.title}
          </h1>

          {post.author ? (
            <div className="mt-3 flex items-center gap-2.5">
              {post.author.image ? (
                // biome-ignore lint/performance/noImgElement: <due>
                <img
                  src={post.author.image}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 rounded-full border border-border object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex size-8 items-center justify-center rounded-full border border-border bg-accent text-[13px] font-semibold text-primary"
                >
                  {post.author.name.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="text-[14px] text-muted-foreground">
                By{" "}
                <span className="font-medium text-foreground">
                  {post.author.name}
                </span>
              </span>
            </div>
          ) : null}

          <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </header>

        {post.cover_image?.url ? (
          // biome-ignore lint/performance/noImgElement: <explanation
          <img
            src={post.cover_image.url}
            alt={post.image_alt}
            className="mt-8 aspect-video w-full rounded-lg border border-border object-cover"
          />
        ) : null}

        <div
          className={`mt-8 ${BLOG_PROSE}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: stored HTML from the admin editor
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      {morePosts.length > 0 ? (
        <section className="border-t border-border pt-8 max-w-[68ch] mx-auto">
          <h2 className="mb-4 border-l-2 border-primary pl-3 text-[17px] font-semibold tracking-tight text-primary">
            Read next
          </h2>

          <ul className="grid gap-4 sm:grid-cols-1">
            {morePosts.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  <h3 className="text-[15px] leading-snug font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[14px] leading-[1.7] text-muted-foreground">
                    {item.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
