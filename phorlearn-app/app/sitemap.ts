import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served at /sitemap.xml. Lists the public, indexable pages so Google can
// discover them. Auth-only dashboard pages are intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/signup`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
