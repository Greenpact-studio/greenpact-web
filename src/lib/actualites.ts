import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Parser from "rss-parser";
import { SITE } from "@/data/config";

const RACINE = process.cwd();

/* ─── Articles Markdown (content/actualites/*.md) ─── */
export type Article = {
  slug: string;
  titre: string;
  date: string;
  image?: string;
  resume: string;
  auteur?: string; // ex. « L'équipe Greenpact »
  lecture?: string; // ex. « 5 min de lecture »
  exemple?: boolean;
  html?: string;
};

const DOSSIER_ARTICLES = path.join(RACINE, "content", "actualites");

export function listerArticles(): Article[] {
  if (!fs.existsSync(DOSSIER_ARTICLES)) return [];
  return fs
    .readdirSync(DOSSIER_ARTICLES)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(DOSSIER_ARTICLES, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        titre: String(data.titre ?? ""),
        date: toISO(data.date),
        image: data.image ? String(data.image) : undefined,
        resume: String(data.resume ?? ""),
        exemple: Boolean(data.exemple),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function lireArticle(slug: string): Promise<Article | null> {
  const fichier = path.join(DOSSIER_ARTICLES, `${slug}.md`);
  if (!fs.existsSync(fichier)) return null;
  const { data, content } = matter(fs.readFileSync(fichier, "utf8"));
  const rendu = await remark().use(html).process(content);
  return {
    slug,
    titre: String(data.titre ?? ""),
    date: toISO(data.date),
    image: data.image ? String(data.image) : undefined,
    resume: String(data.resume ?? ""),
    auteur: data.auteur ? String(data.auteur) : undefined,
    lecture: data.lecture ? String(data.lecture) : undefined,
    exemple: Boolean(data.exemple),
    html: String(rendu),
  };
}

/* ─── Podcast REGEN (flux RSS lu au build) ─── */
export type Episode = {
  titre: string;
  date: string;
  duree?: string;
  lien: string;
  audio?: string;
};

export async function listerEpisodes(max = 8): Promise<Episode[]> {
  try {
    const parser = new Parser({ timeout: 10000 });
    const flux = await parser.parseURL(SITE.podcast.rss);
    return (flux.items ?? []).slice(0, max).map((it) => ({
      titre: it.title ?? "",
      date: toISO(it.isoDate ?? it.pubDate),
      duree: formatDuree(it.itunes?.duration),
      lien: it.link ?? SITE.podcast.apple,
      audio: it.enclosure?.url,
    }));
  } catch (e) {
    console.warn("Podcast : flux RSS indisponible au build :", (e as Error).message);
    return [];
  }
}

/* ─── Données JSON (data/*.json) ─── */
export type Apparition = { titre: string; media: string; date: string; lien?: string; exemple?: boolean };
export type PostLinkedIn = { titre: string; date: string; iframe: string; exemple?: boolean };

export function listerApparitions(): Apparition[] {
  return lireJSON<Apparition[]>("apparitions.json").sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function listerPostsLinkedIn(): PostLinkedIn[] {
  return lireJSON<PostLinkedIn[]>("linkedin.json").sort((a, b) => (a.date < b.date ? 1 : -1));
}

function lireJSON<T>(nom: string): T {
  const f = path.join(RACINE, "data", nom);
  return fs.existsSync(f) ? (JSON.parse(fs.readFileSync(f, "utf8")) as T) : ([] as T);
}

/* ─── Utilitaires ─── */
function toISO(d: unknown): string {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(String(d));
  return isNaN(date.getTime()) ? String(d) : date.toISOString().slice(0, 10);
}

function formatDuree(d?: string): string | undefined {
  if (!d) return undefined;
  if (d.includes(":")) {
    const p = d.split(":").map(Number);
    const min = p.length === 3 ? p[0] * 60 + p[1] : p[0];
    return `${min} min`;
  }
  const s = Number(d);
  return isNaN(s) ? d : `${Math.round(s / 60)} min`;
}

export function dateFR(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
