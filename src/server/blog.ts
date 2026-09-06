import "server-only";
import { and, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import type { BlogAuthor, BlogType } from "@/drizzle/types";

export type PublishedPost = BlogType & { author: BlogAuthor | null };

/**
 * Reads one published post by slug, with the admin who wrote it.
 *
 * Memoised per request so `generateMetadata` and the page body share a single
 * query. Matching on status here is what keeps a draft URL a 404 rather than
 * something readable by anyone who guesses the slug.
 */
export const getPublishedPost = cache(
  async (slug: string): Promise<PublishedPost | null> => {
    const post = await db.query.blog.findFirst({
      where: and(eq(blog.slug, slug), eq(blog.status, "PUBLISHED")),
      with: {
        // Only the byline fields - never the email or role.
        author: { columns: { id: true, name: true, image: true } },
      },
    });

    return post ?? null;
  },
);
