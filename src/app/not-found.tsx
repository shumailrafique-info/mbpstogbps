import Link from "next/link";
import { POPULAR_TOOLS } from "@/lib/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <p className="font-mono text-[40px] leading-none font-bold text-primary/40">
        404
      </p>
      <h1 className="mt-5 text-[26px] leading-[1.2] font-semibold tracking-tight text-foreground sm:text-[30px]">
        Page not found
      </h1>
      <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
        That address does not match any tool on the site. Try one of these
        instead.
      </p>

      <ul className="mt-7 flex flex-wrap gap-2">
        {POPULAR_TOOLS.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={tool.path}
              className="inline-flex rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to home
      </Link>
    </div>
  );
}
