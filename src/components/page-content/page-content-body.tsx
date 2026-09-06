import { BLOG_PROSE } from "@/lib/blogProse";
import { cn } from "@/lib/utils";
import { getPageContent } from "@/server/page-content";

export async function PageContentBody({ slug }: { slug: string }) {
  const content = await getPageContent(slug);

  if (!content?.html) {
    return null;
  }

  return (
    <section
      className={cn(BLOG_PROSE, "rounded-lg border border-border bg-card p-6")}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: stored HTML from the admin editor
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  );
}
