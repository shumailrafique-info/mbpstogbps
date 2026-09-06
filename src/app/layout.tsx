import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/toast";
import { serverEnv } from "@/env/server";
import {
  absoluteUrl,
  graph,
  ORGANIZATION_ID,
  organizationRef,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
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
  themeColor: "#ffffff",
  colorScheme: "light",
};

const SITE_SCHEMA = graph([
  {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
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
    <html lang="en" className={cn("h-full", poppins.variable)}>
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
