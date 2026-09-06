import { z } from "zod";
import { GENERATORS } from "@/lib/navigation";

/** Upper bounds so a stray paste cannot bloat every statically generated page. */
export const MAX_FAQS = 20;
export const MAX_RELATED = 8;

export const faqItemSchema = z.object({
  question: z.string().trim().min(1, "Question is required").max(200),
  answer: z.string().trim().min(1, "Answer is required").max(1000),
});

export const faqsSchema = z.array(faqItemSchema).max(MAX_FAQS);

/**
 * Related links may only point at generators that actually exist, so a stale or
 * crafted slug cannot be saved. The list is built from the navigation registry
 * rather than hardcoded, so it stays correct as generators change.
 */
export const relatedSlugsSchema = z
  .array(
    z.enum(
      GENERATORS.map((generator) => generator.slug) as [string, ...string[]],
    ),
  )
  .max(MAX_RELATED)
  .refine(
    (slugs) => new Set(slugs).size === slugs.length,
    "The same generator cannot be listed twice",
  );

/**
 * Every field except the slug is optional. A page is allowed to have only a
 * title, only a body, or nothing at all - whatever is left blank simply does
 * not render on the live page.
 */
export const pageContentSchema = z.object({
  slug: z.string().min(1, "Page is required"),
  title: z.string().optional(),
  description: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  html: z.string().optional(),
  faqs: faqsSchema.optional(),
  related_slugs: relatedSlugsSchema.optional(),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
export type PageContentSchemaValues = z.infer<typeof pageContentSchema>;
