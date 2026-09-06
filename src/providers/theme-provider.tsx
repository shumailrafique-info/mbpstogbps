"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * The shadcn theme provider.
 *
 * `next-themes` writes the `.dark` class on `<html>` before paint, which is
 * what the palette in `globals.css` keys off. Every colour on the site comes
 * from those tokens, so nothing else has to know which theme is active.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
