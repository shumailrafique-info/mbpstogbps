import { ActivityIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The wordmark. A mark plus type rather than an image file, so it stays sharp
 * and picks up the theme without a second asset for dark mode.
 */
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label="MbpsToGbps home"
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-translate-y-0.5">
        <ActivityIcon aria-hidden className="size-[18px]" strokeWidth={2.5} />
      </span>
      <span className="font-mono text-[15px] font-bold tracking-tight text-foreground">
        Mbps<span className="text-primary">To</span>Gbps
      </span>
    </Link>
  );
}
