import { serverEnv } from "@/env/server";
import type { FaqItem } from "@/lib/validation/zod/page-content.schema";

export type Thing = Record<string, unknown>;
export type WithContext<T extends Thing> = T & {
  "@context": "https://schema.org";
};

export const SITE_NAME = "Gen Z Font Generator";

export const SITE_URL = serverEnv.BETTER_AUTH_URL;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export const ORGANIZATION_ID = `${SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;

export const organizationRef = { "@id": ORGANIZATION_ID };
export const webSiteRef = { "@id": WEBSITE_ID };

export function withContext<T extends Thing>(data: T): WithContext<T> {
  return { "@context": "https://schema.org", ...data };
}

export function breadcrumbList(items: { name: string; path: string }[]): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPage(faqs: FaqItem[]): Thing | null {
  if (faqs.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function graph(nodes: (Thing | null | undefined)[]): WithContext<Thing> {
  return withContext({ "@graph": nodes.filter(Boolean) as Thing[] });
}
