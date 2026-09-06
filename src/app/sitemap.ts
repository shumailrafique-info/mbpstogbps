import { desc, eq } from "drizzle-orm";
import type { MetadataRoute } from "next";
import { db } from "@/drizzle/db";
import { blog, pageContent } from "@/drizzle/schema";
import { serverEnv } from "@/env/server";
import { MANAGED_PAGES } from "@/lib/page-content";

export const revalidate = 172800;

function absolute(path: string) {
  return new URL(path, serverEnv.BETTER_AUTH_URL).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pageRows, posts] = await Promise.all([
    db
      .select({ slug: pageContent.slug, updated_at: pageContent.updated_at })
      .from(pageContent),

    db
      .select({
        slug: blog.slug,
        updated_at: blog.updated_at,
        published_at: blog.published_at,
      })
      .from(blog)
      // Drafts are not public, so they must not be advertised.
      .where(eq(blog.status, "PUBLISHED"))
      .orderBy(desc(blog.published_at)),
  ]);

  const updatedBySlug = new Map(
    pageRows.map((row) => [row.slug, row.updated_at]),
  );

  const managed: MetadataRoute.Sitemap = MANAGED_PAGES
    // A page that requires content and has none returns a 404, so it stays out.
    .filter((page) => !page.requiresContent || updatedBySlug.has(page.slug))
    .map((page) => ({
      url: absolute(page.path),
      lastModified: updatedBySlug.get(page.slug) ?? new Date(),
      changeFrequency: page.kind === "home" ? "daily" : "weekly",
      priority: page.kind === "home" ? 1 : page.kind === "tool" ? 0.8 : 0.4,
    }));

  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: absolute("/blog"),
      lastModified: posts[0]?.updated_at ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absolute(`/blog/${post.slug}`),
    lastModified: post.updated_at,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...managed, ...blogIndex, ...blogPosts];
}
