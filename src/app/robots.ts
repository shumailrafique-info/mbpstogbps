import type { MetadataRoute } from "next";
import { serverEnv } from "@/env/server";

export default function robots(): MetadataRoute.Robots {
  const base = serverEnv.BETTER_AUTH_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/sign-in", "/sign-up", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: new URL(base).host,
  };
}
