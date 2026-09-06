import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageContentBody } from "@/components/page-content/page-content-body";
import { PageContentHeader } from "@/components/page-content/page-content-header";
import { JsonLd } from "@/components/seo/json-ld";
import { hasPageContent, parseFaqs } from "@/lib/page-content";
import {
  absoluteUrl,
  breadcrumbList,
  faqPage,
  graph,
  organizationRef,
  webSiteRef,
} from "@/lib/seo";
import { getPageContent } from "@/server/page-content";
import { pageMetadata } from "@/server/page-metadata";

const SLUG = "privacy-policy";
const NAME = "Privacy Policy";
const PATH = "/privacy-policy";

export const revalidate = 172800;

export async function generateMetadata() {
  return pageMetadata(SLUG);
}

export default async function Page() {
  const content = await getPageContent(SLUG);

  if (!hasPageContent(content)) {
    notFound();
  }

  const schema = graph([
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(PATH)}#page`,
      name: content?.title ?? NAME,
      url: absoluteUrl(PATH),
      description: content?.meta_description ?? content?.description,
      isPartOf: webSiteRef,
      publisher: organizationRef,
      dateModified: content?.updated_at.toISOString(),
    },
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: NAME, path: PATH },
    ]),
    faqPage(parseFaqs(content?.faqs)),
  ]);

  return (
    <>
      <JsonLd data={schema} />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <article className="max-w-[68ch] space-y-2">
        <PageContentHeader slug={SLUG} />
        <PageContentBody slug={SLUG} />
      </article>
    </>
  );
}
