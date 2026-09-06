import { z } from "zod";
import { uploadedFileSchema } from "./uplaod-file.schema";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),

  excerpt: z.string().min(1, "Excerpt is required"),

  description: z.string().optional(),

  meta_title: z.string().min(1, "Meta title is required"),

  meta_description: z.string().min(1, "Meta description is required"),

  slug: z.string().min(1, "Slug is required"),

  html: z.string().refine(
    (value) =>
      value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim().length > 0 || /<(img|iframe|hr)\b/i.test(value),
    "Content is required",
  ),
  cover_image: z
    .array(uploadedFileSchema)
    .min(1, "Cover image is required")
    .max(1, "Only one cover image is allowed"),

  image_alt: z.string().min(1, "Image alt text is required"),

  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type BlogSchemaValues = z.infer<typeof blogSchema>;
