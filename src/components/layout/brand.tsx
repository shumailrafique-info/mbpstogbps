import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The wordmark.
 *
 * The artwork is a raster, so it ships as two recoloured variants rather than
 * one: the supplied logo is drawn in dark teal for light backgrounds, and the
 * dark theme needs the type lifted or it disappears. Only one is ever visible,
 * and both are tiny, so the second file costs little.
 */
export function Brand({
  className,
  height = 30,
}: {
  className?: string;
  /** Rendered height in pixels; the width follows the artwork's ratio. */
  height?: number;
}) {
  // Intrinsic size of public/logo.png, used to keep the aspect ratio exact.
  const width = Math.round((height * 1140) / 232);

  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label="MbpsToGbps home"
    >
      <Image
        src="/logo.png"
        alt="MbpsToGbps"
        width={width}
        height={height}
        priority
        className="block h-auto dark:hidden"
        style={{ width, height: "auto" }}
      />
      <Image
        src="/logo-dark.png"
        alt="MbpsToGbps"
        width={width}
        height={height}
        priority
        className="hidden h-auto dark:block"
        style={{ width, height: "auto" }}
      />
    </Link>
  );
}
