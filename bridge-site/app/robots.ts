import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api/", "/shadow-audit-9", "/shadow-audit-97", "/shadow-audit/"],
      },
    ],
    sitemap: "https://aibridgedsolutions.com/sitemap.xml",
  };
}
