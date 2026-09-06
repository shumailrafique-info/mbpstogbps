import "server-only";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/drizzle/db";
import { pageContent } from "@/drizzle/schema";
import type { PageContentType } from "@/drizzle/types";

export const getPageContent = cache(
  async (slug: string): Promise<PageContentType | null> => {
    try {
      const row = await db.query.pageContent.findFirst({
        where: eq(pageContent.slug, slug),
      });

      return row ?? null;
    } catch (error) {
      console.error(`getPageContent failed for "${slug}"`, error);
      return null;
    }
  },
);
