import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageContentBody } from "@/components/page-content/page-content-body";
import { PageContentHeader } from "@/components/page-content/page-content-header";
import { PageFaq } from "@/components/page-content/page-faq";
import { PageRelated } from "@/components/page-content/page-related";
import { JsonLd } from "@/components/seo/json-ld";
import { toolBySlug } from "@/lib/navigation";
import { parseFaqs } from "@/lib/page-content";
import {
  absoluteUrl,
  breadcrumbList,
  faqPage,
  graph,
  organizationRef,
  webSiteRef,
} from "@/lib/seo";
import { getPageContent } from "@/server/page-content";
import { ToolsSidebar } from "./tools-sidebar";

/**
 * The shared shape of every tool page: crumbs, the managed heading, the tool
 * itself, the sidebar, then the editor-managed body, FAQs and related links.
 *
 * Keeping it in one place means a change to the layout does not have to be
 * repeated across twelve routes.
 */
export async function ToolPage({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const tool = toolBySlug(slug);
  const content = await getPageContent(slug);
  const name = tool?.name ?? slug;

  const schema = graph([
    {
      "@type": "WebApplication",
      "@id": `${absoluteUrl(tool?.path ?? `/${slug}`)}#app`,
      name: content?.title ?? name,
      url: absoluteUrl(tool?.path ?? `/${slug}`),
      description: content?.meta_description ?? content?.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isPartOf: webSiteRef,
      publisher: organizationRef,
      // Every tool here is genuinely free and needs no account.
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbList([
      { name: "Home", path: "/" },
      { name, path: tool?.path ?? `/${slug}` },
    ]),
    faqPage(parseFaqs(content?.faqs)),
  ]);

  return (
    <div className="space-y-12">
      <JsonLd data={schema} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: name }]} />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8 xl:col-span-9">
          <PageContentHeader slug={slug} />
          {children}
        </div>

        <ToolsSidebar
          className="lg:col-span-4 xl:col-span-3"
          activeSlug={slug}
        />
      </div>

      <PageContentBody slug={slug} />
      <PageFaq slug={slug} />
      <PageRelated slug={slug} />
    </div>
  );
}
