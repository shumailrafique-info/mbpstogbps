import { PageContentBody } from "@/components/page-content/page-content-body";
import { PageContentHeader } from "@/components/page-content/page-content-header";
import { PageFaq } from "@/components/page-content/page-faq";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/tools/section-heading";
import { ToolCard } from "@/components/tools/tool-card";
import { UnitConverter } from "@/components/tools/unit-converter";
import {
  CALCULATOR_TOOLS,
  CONVERTER_TOOLS,
  GROUP_DESCRIPTIONS,
  GROUP_LABELS,
  TOOLS,
} from "@/lib/navigation";
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

const FACTS = ["1 Gbps = 1,000 Mbps", "1 Mbps = 0.125 MB/s", "8 bits = 1 byte"];

export default async function HomePage() {
  const content = await getPageContent(SLUG);

  // The home page is itself a tool, so it describes the converter as well as
  // the page, and lists the tools it links to.
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
      name: "Speed and bandwidth tools",
      itemListElement: TOOLS.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: absoluteUrl(tool.path),
      })),
    },
    breadcrumbList([{ name: "Home", path: "/" }]),
    faqPage(parseFaqs(content?.faqs)),
  ]);

  return (
    <div className="space-y-14">
      <JsonLd data={schema} />

      {/* Hero: the managed heading over the faint signal grid. */}
      <section className="relative -mx-4 overflow-hidden px-4 pt-10 pb-2 sm:pt-14">
        <div
          aria-hidden
          className="signal-grid pointer-events-none absolute inset-0 -z-10"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Free, instant, no sign-up
          </p>

          <PageContentHeader
            slug={SLUG}
            titleClassName="text-[30px] leading-[1.12] sm:text-[40px]"
            descriptionClassName="mx-auto text-center text-base"
          >
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {FACTS.map((fact) => (
                <li
                  key={fact}
                  className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[12px] text-muted-foreground"
                >
                  {fact}
                </li>
              ))}
            </ul>
          </PageContentHeader>
        </div>
      </section>

      {/* The headline tool. */}
      <section aria-labelledby="main-tool" className="scroll-mt-20">
        <h2 id="main-tool" className="sr-only">
          Mbps to Gbps converter
        </h2>
        <UnitConverter
          kind="rate"
          defaultFrom="mbps"
          defaultTo="gbps"
          defaultValue={1000}
          presets={[25, 100, 300, 500, 940, 1000, 2000]}
          tableValues={[
            1, 10, 25, 50, 100, 250, 500, 750, 940, 1000, 2000, 10000,
          ]}
          insights
        />
      </section>

      {/* Everything else on the site. */}
      <section aria-labelledby="all-tools">
        <SectionHeading
          id="all-tools"
          kicker="The full set"
          title="Every speed and bandwidth tool"
          description="One registry behind the whole site: convert a figure, or turn it into a transfer time, a capacity plan or a monthly data total."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-1 text-[15px] font-semibold text-foreground">
              {GROUP_LABELS.converter}
            </h3>
            <p className="mb-3 text-[13px] text-muted-foreground">
              {GROUP_DESCRIPTIONS.converter}
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {CONVERTER_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <ToolCard tool={tool} className="h-full" />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-1 text-[15px] font-semibold text-foreground">
              {GROUP_LABELS.calculator}
            </h3>
            <p className="mb-3 text-[13px] text-muted-foreground">
              {GROUP_DESCRIPTIONS.calculator}
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {CALCULATOR_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <ToolCard tool={tool} className="h-full" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageContentBody slug={SLUG} />
      <PageFaq slug={SLUG} />
    </div>
  );
}
