import type { Metadata } from "next";
import { site } from "./site";

/**
 * Title, description and link-preview tags for one page. A page that sets its own `openGraph`
 * replaces the layout's whole object, so every page builds a complete one here: its own title
 * and description (not the homepage's), the site name LinkedIn shows under the title, and its
 * address. `canonical` tells search engines which address is the page's official one.
 * The share image comes from src/app/opengraph-image.jpg unless `images` is given.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  images,
}: {
  title?: string; // omitted for the homepage, which uses the layout's default title
  description: string;
  path: string;
  ogTitle?: string; // a different headline for link previews
  images?: string[];
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle ?? (title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`),
      description,
      url: path,
      siteName: site.name,
      type: "website",
      ...(images && { images }),
    },
  };
}
