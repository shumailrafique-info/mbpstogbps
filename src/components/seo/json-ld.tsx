import type { Thing, WithContext } from "@/lib/seo";

export function JsonLd({ data }: { data: WithContext<Thing> | Thing }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be inlined, and the payload is escaped above
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
