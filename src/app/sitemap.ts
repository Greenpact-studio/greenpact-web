import type { MetadataRoute } from "next";
import { NAV, SITE, ESPACE_INVESTISSEUR } from "@/data/config";
import { listerArticles } from "@/lib/actualites";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...NAV, ESPACE_INVESTISSEUR].map((n) => ({
    url: `${SITE.url}${n.href}`,
    changeFrequency: (n.href === "/actualites/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: n.href === "/" ? 1 : 0.7,
  }));
  const articles = listerArticles()
    .filter((a) => !a.exemple)
    .map((a) => ({
      url: `${SITE.url}/actualites/${a.slug}/`,
      lastModified: a.date ? new Date(a.date) : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));
  const etudes = [{ url: `${SITE.url}/these-impact/bluefins/`, changeFrequency: "monthly" as const, priority: 0.6 }];
  return [...pages, ...etudes, ...articles];
}
