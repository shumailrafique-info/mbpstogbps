"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { writeToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  /** Announced to screen readers, e.g. "Copy result in Gbps". */
  label: string;
  className?: string;
  /** Shows the word "Copy" next to the icon. */
  withLabel?: boolean;
};

export function CopyButton({
  value,
  label,
  className,
  withLabel = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const onCopy = useCallback(async () => {
    const ok = await writeToClipboard(value);
    if (!ok) return;

    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }, [value]);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary",
        copied && "border-primary text-primary",
        className,
      )}
    >
      {copied ? (
        <CheckIcon aria-hidden className="size-3.5" />
      ) : (
        <CopyIcon aria-hidden className="size-3.5" />
      )}
      {withLabel ? (copied ? "Copied" : "Copy") : null}
    </button>
  );
}
