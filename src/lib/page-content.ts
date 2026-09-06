import type { PageContentType } from "@/drizzle/types";
import {
  type FaqItem,
  faqsSchema,
  relatedSlugsSchema,
} from "@/lib/validation/zod/page-content.schema";
import { HOME_TOOL_SLUG, TOOLS } from "./navigation";

export const HOME_SLUG = HOME_TOOL_SLUG;

export type ManagedPageKind = "home" | "static" | "tool";

export type ManagedPage = {
  slug: string;
  name: string;
  path: string;
  kind: ManagedPageKind;
  /**
   * When true the page has nothing of its own to show, so an empty row means
   * the route 404s. Tool pages instead render the tool with no copy.
   */
  requiresContent?: boolean;
};

/** Informational pages that consist of nothing but their managed content. */
export const STATIC_PAGES: readonly ManagedPage[] = [
  {
    slug: "about-us",
    name: "About Us",
    path: "/about-us",
    kind: "static",
    requiresContent: true,
  },
  {
    slug: "contact-us",
    name: "Contact Us",
    path: "/contact-us",
    kind: "static",
    requiresContent: true,
  },
  {
    slug: "privacy-policy",
    name: "Privacy Policy",
    path: "/privacy-policy",
    kind: "static",
    requiresContent: true,
  },
  {
    slug: "terms-and-conditions",
    name: "Terms and Conditions",
    path: "/terms-and-conditions",
    kind: "static",
    requiresContent: true,
  },
];

export const MANAGED_PAGES: readonly ManagedPage[] = [
  ...TOOLS.map(
    (tool): ManagedPage => ({
      slug: tool.slug,
      name: tool.slug === HOME_SLUG ? "Home - Mbps to Gbps" : tool.name,
      path: tool.path,
      kind: tool.slug === HOME_SLUG ? "home" : "tool",
    }),
  ),
  ...STATIC_PAGES,
];

export function isManagedSlug(slug: string) {
  return MANAGED_PAGES.some((page) => page.slug === slug);
}

export function managedPage(slug: string) {
  return MANAGED_PAGES.find((page) => page.slug === slug);
}

export function pathForSlug(slug: string) {
  return slug === HOME_SLUG ? "/" : `/${slug}`;
}

/** Only tool pages carry a Related Tools section. */
export function supportsRelated(slug: string) {
  return managedPage(slug)?.kind === "tool";
}

/**
 * Heading for a page's FAQ section. Derived rather than stored, because every
 * page already follows one of these two patterns.
 */
export function faqHeading(slug: string) {
  const page = managedPage(slug);
  if (!page || page.kind === "home") return "Frequently Asked Questions";
  return `FAQs - ${page.name}`;
}

/**
 * jsonb columns are typed at compile time but unchecked at runtime, so a
 * hand-edited row or an older shape would otherwise crash a page mid-render.
 * Anything that does not parse is treated as absent.
 */
export function parseFaqs(value: unknown): FaqItem[] {
  const parsed = faqsSchema.safeParse(value ?? []);
  return parsed.success ? parsed.data : [];
}

export function parseRelatedSlugs(value: unknown): string[] {
  const parsed = relatedSlugsSchema.safeParse(value ?? []);
  return parsed.success ? parsed.data : [];
}

export function hasPageContent(content: PageContentType | null | undefined) {
  return Boolean(content?.title || content?.description || content?.html);
}

export function normalizeHtml(html: string | null | undefined) {
  if (!html) return null;

  const stripped = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  const hasEmbeddedMedia = /<(img|iframe|hr)\b/i.test(html);

  return stripped.length > 0 || hasEmbeddedMedia ? html : null;
}

export function normalizeText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
