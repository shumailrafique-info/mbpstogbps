import "dotenv/config";
import { sql } from "drizzle-orm";
import { MANAGED_PAGES, normalizeText } from "@/lib/page-content";
import { db } from "../db";
import { pageContent } from "../schema";
import { PAGE_SEEDS_TOOLS, type PageSeed } from "./page-content-seed-data";
import { PAGE_SEEDS_STATIC } from "./page-content-seed-data-static";
import { PAGE_EXTRAS } from "./page-extras-seed-data";

const SEEDS: PageSeed[] = [...PAGE_SEEDS_TOOLS, ...PAGE_SEEDS_STATIC];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Escapes text, then turns [label](href) into an anchor. Tiptap stores links
 * as plain anchors, so these round trip through the editor unchanged.
 */
function inline(text: string) {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label, href) => `<a href="${href}">${label}</a>`,
  );
}

/**
 * Renders a seed as the HTML Tiptap itself produces, so a seeded page can be
 * opened in the dashboard editor and saved back without the markup changing.
 * Tiptap wraps list item and blockquote content in paragraphs.
 */
function renderHtml(seed: PageSeed) {
  const parts: string[] = [`<p>${inline(seed.lead)}</p>`];

  for (const section of seed.sections) {
    parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);

    for (const paragraph of section.paragraphs) {
      parts.push(`<p>${inline(paragraph)}</p>`);
    }

    if (section.list) {
      const items = section.list
        .map((item) => `<li><p>${inline(item)}</p></li>`)
        .join("");
      parts.push(`<ul>${items}</ul>`);
    }

    if (section.quote) {
      parts.push(`<blockquote><p>${inline(section.quote)}</p></blockquote>`);
    }
  }

  return parts.join("");
}

async function main() {
  const slugs = SEEDS.map((seed) => seed.slug);

  const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
  if (duplicates.length > 0) {
    throw new Error(`Duplicate slug in seed data: ${duplicates.join(", ")}`);
  }

  // Every seeded slug must be a page the site actually has, and every page
  // should be covered - otherwise the seed silently leaves gaps.
  const managed = new Set(MANAGED_PAGES.map((page) => page.slug));
  const unknown = slugs.filter((slug) => !managed.has(slug));
  if (unknown.length > 0) {
    throw new Error(`Seed targets unknown pages: ${unknown.join(", ")}`);
  }

  const missing = [...managed].filter((slug) => !slugs.includes(slug));
  if (missing.length > 0) {
    throw new Error(`No seed content for: ${missing.join(", ")}`);
  }

  console.log(`Seeding content for ${SEEDS.length} pages...`);

  // Blank fields become null, matching what the dashboard stores, so an empty
  // description does not count as content.
  const rows = SEEDS.map((seed) => {
    const extras = PAGE_EXTRAS[seed.slug];

    return {
      slug: seed.slug,
      title: normalizeText(seed.title),
      description: normalizeText(seed.description),
      meta_title: normalizeText(seed.metaTitle),
      meta_description: normalizeText(seed.metaDescription),
      html: renderHtml(seed),
      faqs: extras?.faqs.length ? extras.faqs : null,
      related_slugs: extras?.related.length ? extras.related : null,
    };
  });

  const written = await db
    .insert(pageContent)
    .values(rows)
    .onConflictDoUpdate({
      target: pageContent.slug,
      set: {
        title: sql`excluded.title`,
        description: sql`excluded.description`,
        meta_title: sql`excluded.meta_title`,
        meta_description: sql`excluded.meta_description`,
        html: sql`excluded.html`,
        faqs: sql`excluded.faqs`,
        related_slugs: sql`excluded.related_slugs`,
      },
    })
    .returning({ slug: pageContent.slug });

  console.log(`Done. ${written.length} pages written.`);
  process.exit(0);
}

main().catch((error) => {
  console.error("Page content seed failed", error);
  process.exit(1);
});
