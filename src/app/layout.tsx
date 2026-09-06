import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/toast";
import { serverEnv } from "@/env/server";
import {
  absoluteUrl,
  graph,
  ORGANIZATION_ID,
  organizationRef,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Results are numbers in columns, so they get a monospace face of their own.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(serverEnv.BETTER_AUTH_URL),
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1313" },
  ],
  colorScheme: "light dark",
};

const SITE_SCHEMA = graph([
  {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.png"),
    },
  },
  {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: organizationRef,
    inLanguage: "en",
  },
]);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // next-themes swaps the class on this element before paint.
      suppressHydrationWarning
      className={cn("h-full", inter.variable, jetbrainsMono.variable)}
    >
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={SITE_SCHEMA} />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
