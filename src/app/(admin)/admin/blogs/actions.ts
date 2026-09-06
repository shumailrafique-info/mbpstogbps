"use server";

import { desc, eq, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import type { BlogType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import type { ApiResponse } from "@/types/global";

const LIKE_ESCAPE = "\\";

function escapeLikeTerm(term: string) {
  return term.replace(/[\\%_]/g, (match) => `${LIKE_ESCAPE}${match}`);
}

export async function getBlogs(
  search?: string,
): Promise<ApiResponse<BlogType[]>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const term = search?.trim();

  try {
    const rows = await db
      .select()
      .from(blog)
      .where(
        term
          ? or(
              ilike(blog.title, `%${escapeLikeTerm(term)}%`),
              ilike(blog.slug, `%${escapeLikeTerm(term)}%`),
            )
          : undefined,
      )
      .orderBy(desc(blog.created_at));

    return { success: true, data: rows };
  } catch (error) {
    console.error("getBlogs failed", error);
    return { success: false, error: "Could not load blog posts." };
  }
}

export async function deleteBlog(
  id: string,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  if (!id) {
    return { success: false, error: "Missing blog id." };
  }

  try {
    const [deleted] = await db
      .delete(blog)
      .where(eq(blog.id, id))
      .returning({ id: blog.id, slug: blog.slug });

    if (!deleted) {
      return { success: false, error: "That blog post no longer exists." };
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    revalidatePath(`/blog/${deleted.slug}`);

    return { success: true, data: { id: deleted.id } };
  } catch (error) {
    console.error("deleteBlog failed", error);
    return { success: false, error: "Could not delete the blog post." };
  }
}
