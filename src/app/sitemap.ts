import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

// Every public page, so search engines find the case studies as well as the main pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/work", "/contact", "/work/fairmarq", ...projects.map((p) => `/work/${p.slug}`)];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
