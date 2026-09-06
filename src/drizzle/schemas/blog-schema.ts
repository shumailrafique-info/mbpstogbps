import { relations, sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { UploadedFile } from "@/components/shared/image-upader";
import { user } from "./auth-schema";

export const postStatusEnum = pgEnum("post_status", ["DRAFT", "PUBLISHED"]);

export const blog = pgTable(
  "blogs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    description: text("description").notNull(),
    meta_title: text("meta_title").notNull(),
    meta_description: text("meta_description").notNull(),
    slug: text("slug").notNull().unique(),
    html: text("html").notNull(),
    cover_image: jsonb("cover_image").$type<UploadedFile>().notNull(),
    image_alt: text("image_alt").notNull(),
    /**
     * The admin who created the post.
     *
     * Nullable because posts written before authorship existed have none, and
     * set null on delete so removing an account never removes its posts.
     */
    author_id: text("author_id").references(() => user.id, {
      onDelete: "set null",
    }),
    status: postStatusEnum("status").notNull().default("DRAFT"),
    published_at: timestamp("published_at", {
      withTimezone: true,
    }),
    created_at: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("blogs_status_idx").on(table.status),
    index("blogs_slug_idx").on(table.slug),
    index("blogs_created_at_idx").on(table.created_at.desc()),
    index("blogs_title_trgm_idx").using(
      "gin",
      sql`${table.title} gin_trgm_ops`,
    ),
    index("blogs_slug_trgm_idx").using("gin", sql`${table.slug} gin_trgm_ops`),
    index("blogs_author_idx").on(table.author_id),
  ],
);

export const blogRelations = relations(blog, ({ one }) => ({
  author: one(user, {
    fields: [blog.author_id],
    references: [user.id],
  }),
}));
