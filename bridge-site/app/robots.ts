import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api/", "/shadow-audit-free", "/shadow-audit-1", "/shadow-audit/"],
      },
    ],
    sitemap: "https://aibridgedsolutions.com/sitemap.xml",
  };
}
