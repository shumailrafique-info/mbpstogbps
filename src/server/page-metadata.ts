import "server-only";
import type { Metadata } from "next";
import { pathForSlug } from "@/lib/page-content";
import { getPageContent } from "./page-content";

const SITE_NAME = "MbpsToGbps";

export function ogImagePath(title?: string, description?: string) {
  const params = new URLSearchParams();
  if (title) params.set("title", title);
  if (description) params.set("description", description);

  const query = params.toString();
  return query ? `/og?${query}` : "/og";
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const content = await getPageContent(slug);

  const title = content?.meta_title ?? content?.title ?? undefined;
  const description =
    content?.meta_description ?? content?.description ?? undefined;

  const url = pathForSlug(slug);
  const image = ogImagePath(title, description);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: title ?? SITE_NAME,
      description,
      url,
      images: [
        { url: image, width: 1200, height: 630, alt: title ?? SITE_NAME },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE_NAME,
      description,
      images: [image],
    },
  };
}
