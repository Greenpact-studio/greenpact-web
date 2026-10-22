import type { MetadataRoute } from "next";
import { SITE } from "@/data/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // L'espace actionnaires est privé : jamais indexé.
    rules: { userAgent: "*", allow: "/", disallow: "/actionnaires/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
