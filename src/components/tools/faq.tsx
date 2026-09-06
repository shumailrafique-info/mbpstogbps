import { PlusIcon } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "./section-heading";

export function FaqEntry({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-lg border border-border bg-card px-4 transition-colors open:border-primary/40 hover:border-primary/40">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-medium text-foreground">
        <span>{question}</span>
        <PlusIcon
          aria-hidden
          className="size-4 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
        />
      </summary>
      <div className="max-w-[70ch] pb-4 text-[15px] leading-[1.75] text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

export function Faq({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="faq-heading">
      <SectionHeading id="faq-heading" kicker="Answers" title={title} />
      <div className="grid gap-2">{children}</div>
    </section>
  );
}
