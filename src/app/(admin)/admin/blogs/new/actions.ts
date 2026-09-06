"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import type { BlogType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import {
  type BlogSchemaValues,
  blogSchema,
} from "@/lib/validation/zod/blog.schema";
import type { ApiResponse } from "@/types/global";

const UNIQUE_VIOLATION = "23505";

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === UNIQUE_VIOLATION
  );
}

function toRow(values: BlogSchemaValues) {
  return {
    title: values.title,
    excerpt: values.excerpt,
    description: values.description ?? "",
    meta_title: values.meta_title,
    meta_description: values.meta_description,
    slug: values.slug,
    html: values.html,
    cover_image: values.cover_image[0],
    image_alt: values.image_alt,
    status: values.status,
  };
}

function revalidateBlogPaths(slug: string) {
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function createBlog(
  input: BlogSchemaValues,
): Promise<ApiResponse<BlogType>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const parsed = blogSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid blog details.",
    };
  }

  const row = toRow(parsed.data);

  const existing = await db.query.blog.findFirst({
    where: eq(blog.slug, row.slug),
    columns: { id: true },
  });

  if (existing) {
    return {
      success: false,
      error: `The slug "${row.slug}" is already in use.`,
    };
  }

  try {
    const [created] = await db
      .insert(blog)
      .values({
        ...row,
        // Stamped once, on creation. updateBlog deliberately leaves it alone so
        // a later edit by a different admin does not reassign the byline.
        author_id: guard.session.user.id,
        published_at: row.status === "PUBLISHED" ? new Date() : null,
      })
      .returning();

    if (!created) {
      return { success: false, error: "Could not create the blog post." };
    }

    revalidateBlogPaths(created.slug);
    return { success: true, data: created };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The slug "${row.slug}" is already in use.`,
      };
    }
    console.error("createBlog failed", error);
    return { success: false, error: "Could not create the blog post." };
  }
}

export async function updateBlog(
  id: string,
  input: BlogSchemaValues,
): Promise<ApiResponse<BlogType>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  if (!id) {
    return { success: false, error: "Missing blog id." };
  }

  const parsed = blogSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid blog details.",
    };
  }

  const row = toRow(parsed.data);

  try {
    const existing = await db.query.blog.findFirst({
      where: eq(blog.id, id),
      columns: { id: true, status: true, published_at: true, slug: true },
    });

    if (!existing) {
      return { success: false, error: "That blog post no longer exists." };
    }

    const published_at =
      row.status === "PUBLISHED" ? (existing.published_at ?? new Date()) : null;

    const [updated] = await db
      .update(blog)
      .set({ ...row, published_at })
      .where(eq(blog.id, id))
      .returning();

    if (!updated) {
      return { success: false, error: "Could not update the blog post." };
    }

    revalidateBlogPaths(updated.slug);
    if (existing.slug !== updated.slug) revalidateBlogPaths(existing.slug);

    return { success: true, data: updated };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The slug "${row.slug}" is already in use.`,
      };
    }
    console.error("updateBlog failed", error);
    return { success: false, error: "Could not update the blog post." };
  }
}
