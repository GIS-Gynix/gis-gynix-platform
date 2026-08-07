// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // Prevent search engines from indexing raw tile API endpoints
    },
    sitemap: "https://gis-gynix-platform.vercel.app/sitemap.xml",
  };
}