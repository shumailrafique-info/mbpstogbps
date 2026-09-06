import { RelatedGenerators } from "@/components/generator/related-generators";
import { parseRelatedSlugs } from "@/lib/page-content";
import { getPageContent } from "@/server/page-content";

/**
 * Related Generators for a managed page, driven by the slugs stored on its row.
 *
 * `RelatedGenerators` resolves slugs through the navigation registry and drops
 * anything it does not recognise, so a generator that was later renamed leaves
 * one fewer link rather than a dead one.
 */
export async function PageRelated({ slug }: { slug: string }) {
  const content = await getPageContent(slug);
  const slugs = parseRelatedSlugs(content?.related_slugs);

  if (slugs.length === 0) {
    return null;
  }

  return <RelatedGenerators slugs={slugs} />;
}
