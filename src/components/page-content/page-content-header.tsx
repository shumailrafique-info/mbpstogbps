import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getPageContent } from "@/server/page-content";

export async function PageContentHeader({
  slug,
  titleClassName,
  descriptionClassName,
  children,
}: {
  slug: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
}) {
  const content = await getPageContent(slug);

  if (!content?.title && !content?.description) {
    return null;
  }

  return (
    <header>
      {content.title ? (
        <h1
          className={cn(
            "text-[26px] leading-[1.2] font-semibold tracking-tight text-foreground sm:text-[30px]",
            titleClassName,
          )}
        >
          {content.title}
        </h1>
      ) : null}

      {content.description ? (
        <p
          className={cn(
            "mt-2.5 max-w-[64ch] text-[15px] leading-relaxed text-muted-foreground",
            descriptionClassName,
          )}
        >
          {content.description}
        </p>
      ) : null}

      {children}
    </header>
  );
}
