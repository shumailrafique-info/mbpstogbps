import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { FaqItem } from "@/lib/validation/zod/page-content.schema";

export const pageContent = pgTable("page_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title"),
  description: text("description"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  html: text("html"),
  /**
   * Ordered question and answer pairs. `$type` is a compile-time promise only -
   * the database can hold any shape, so readers parse this with `faqsSchema`
   * rather than trusting the type.
   */
  faqs: jsonb("faqs").$type<FaqItem[]>(),
  /** Generator slugs shown in the Related Generators section. */
  related_slugs: jsonb("related_slugs").$type<string[]>(),
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
});
