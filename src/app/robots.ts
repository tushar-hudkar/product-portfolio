import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Lets search engines crawl everything, and points them at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
