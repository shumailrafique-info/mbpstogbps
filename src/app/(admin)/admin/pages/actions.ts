"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { pageContent } from "@/drizzle/schema";
import type { PageContentType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import {
  isManagedSlug,
  normalizeHtml,
  normalizeText,
  pathForSlug,
  supportsRelated,
} from "@/lib/page-content";
import {
  type PageContentSchemaValues,
  pageContentSchema,
} from "@/lib/validation/zod/page-content.schema";
import type { ApiResponse } from "@/types/global";

export async function listConfiguredSlugs(): Promise<ApiResponse<string[]>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const rows = await db.select({ slug: pageContent.slug }).from(pageContent);

    return { success: true, data: rows.map((row) => row.slug) };
  } catch (error) {
    console.error("listConfiguredSlugs failed", error);
    return { success: false, error: "Could not load configured pages." };
  }
}

export async function upsertPageContent(
  input: PageContentSchemaValues,
): Promise<ApiResponse<PageContentType>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const parsed = pageContentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid page content.",
    };
  }

  if (!isManagedSlug(parsed.data.slug)) {
    return { success: false, error: "That page does not exist." };
  }

  // Empty lists are stored as null, matching the other blank fields, so the
  // public components can decide with one truthiness check.
  const faqs = parsed.data.faqs?.length ? parsed.data.faqs : null;

  // Only generator pages have a related section; anything sent for another
  // page is dropped rather than quietly stored where nothing reads it.
  const related =
    supportsRelated(parsed.data.slug) && parsed.data.related_slugs?.length
      ? parsed.data.related_slugs
      : null;

  const values = {
    slug: parsed.data.slug,
    title: normalizeText(parsed.data.title),
    description: normalizeText(parsed.data.description),
    meta_title: normalizeText(parsed.data.meta_title),
    meta_description: normalizeText(parsed.data.meta_description),
    html: normalizeHtml(parsed.data.html),
    faqs,
    related_slugs: related,
  };

  try {
    const [saved] = await db
      .insert(pageContent)
      .values(values)
      .onConflictDoUpdate({
        target: pageContent.slug,
        set: {
          title: values.title,
          description: values.description,
          meta_title: values.meta_title,
          meta_description: values.meta_description,
          html: values.html,
          faqs: values.faqs,
          related_slugs: values.related_slugs,
        },
      })
      .returning();

    if (!saved) {
      return { success: false, error: "Could not save this page's content." };
    }

    revalidatePath(pathForSlug(saved.slug));
    revalidatePath("/admin/pages");

    return { success: true, data: saved };
  } catch (error) {
    console.error("upsertPageContent failed", error);
    return { success: false, error: "Could not save this page's content." };
  }
}

export async function deletePageContent(
  slug: string,
): Promise<ApiResponse<{ slug: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  if (!slug) {
    return { success: false, error: "Missing page slug." };
  }

  try {
    const [deleted] = await db
      .delete(pageContent)
      .where(eq(pageContent.slug, slug))
      .returning({ slug: pageContent.slug });

    if (!deleted) {
      return { success: false, error: "That page has no content to clear." };
    }

    revalidatePath(pathForSlug(deleted.slug));
    revalidatePath("/admin/pages");

    return { success: true, data: { slug: deleted.slug } };
  } catch (error) {
    console.error("deletePageContent failed", error);
    return { success: false, error: "Could not clear this page's content." };
  }
}
