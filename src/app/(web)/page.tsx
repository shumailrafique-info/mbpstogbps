import { GeneratorTool } from "@/components/generator/generator-tool";
import { ToolsSidebar } from "@/components/home/tools-sidebar";
import { PageContentBody } from "@/components/page-content/page-content-body";
import { PageContentHeader } from "@/components/page-content/page-content-header";
import { PageFaq } from "@/components/page-content/page-faq";
import { JsonLd } from "@/components/seo/json-ld";
import { homeToolSections } from "@/lib/generators/registry";
import { GENERATORS } from "@/lib/navigation";
import { parseFaqs } from "@/lib/page-content";
import {
  absoluteUrl,
  breadcrumbList,
  faqPage,
  graph,
  organizationRef,
  SITE_NAME,
  webSiteRef,
} from "@/lib/seo";
import { getPageContent } from "@/server/page-content";
import { pageMetadata } from "@/server/page-metadata";

const SLUG = "home";

export const revalidate = 172800;

export async function generateMetadata() {
  return pageMetadata(SLUG);
}

export default async function HomePage() {
  const homeSections = homeToolSections();
  const content = await getPageContent(SLUG);

  // The home page is itself a generator, so it describes the tool as well as
  // the page, and lists the generators it links to.
  const schema = graph([
    {
      "@type": "WebApplication",
      "@id": `${absoluteUrl("/")}#app`,
      name: content?.title ?? SITE_NAME,
      url: absoluteUrl("/"),
      description: content?.meta_description ?? content?.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isPartOf: webSiteRef,
      publisher: organizationRef,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "ItemList",
      name: "Text and font generators",
      itemListElement: GENERATORS.map((generator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: generator.name,
        url: absoluteUrl(`/${generator.slug}`),
      })),
    },
    breadcrumbList([{ name: "Home", path: "/" }]),
    faqPage(parseFaqs(content?.faqs)),
  ]);

  return (
    <div className="space-y-16">
      <JsonLd data={schema} />

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-9 space-y-6">
          <PageContentHeader
            slug={SLUG}
            titleClassName="text-[28px] w-full text-center leading-[1.15] sm:text-[32px]"
            descriptionClassName="max-w-[52ch] w-full text-center mx-auto"
          >
            <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-slate-600">
              <span className="rounded bg-blue-100 px-2 py-0.5 font-semibold text-blue-800">
                150+ styles
              </span>
              <span aria-hidden className="text-blue-300">
                /
              </span>
              <span className="rounded bg-blue-100 px-2 py-0.5 font-semibold text-blue-800">
                Copy and paste ready
              </span>
              <span aria-hidden className="text-blue-300">
                /
              </span>
              <span className="rounded bg-blue-100 px-2 py-0.5 font-semibold text-blue-800">
                Free, no sign-up
              </span>
            </p>
          </PageContentHeader>
          <GeneratorTool seed="Gen Z Font Generator" sections={homeSections} />
        </div>
        <ToolsSidebar className="space-y-6 lg:col-span-3" />
      </div>
      <PageContentBody slug={SLUG} />
      <PageFaq slug={SLUG} />
    </div>
  );
}
