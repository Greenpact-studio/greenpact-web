import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { listerArticles, lireArticle, dateFR } from "@/lib/actualites";
import styles from "./article.module.css";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/data/config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return listerArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await lireArticle(slug);
  if (!a) return {};
  return {
    title: a.titre,
    description: a.resume,
    alternates: { canonical: `/actualites/${slug}/` },
    openGraph: a.image ? { images: [a.image] } : undefined,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const a = await lireArticle(slug);
  if (!a) notFound();

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.titre,
          description: a.resume,
          datePublished: a.date,
          inLanguage: "fr-FR",
          image: a.image ? `${SITE.url}${a.image}` : undefined,
          author: { "@type": "Organization", name: "Greenpact", url: `${SITE.url}/` },
          publisher: { "@id": `${SITE.url}/#organisation` },
          mainEntityOfPage: `${SITE.url}/actualites/${a.slug}/`,
        }}
      />
      <div className={`conteneur ${styles.entete}`}>
        <Link href="/actualites/" className={`lien ${styles.retour}`}>
          ← Toutes les actualités
        </Link>
        <span className={styles.date}>
          {dateFR(a.date)}
          {a.exemple && <span className={styles.exemple}>Exemple</span>}
        </span>
        <h1>{a.titre}</h1>
        {a.resume && <p className={`lead ${styles.resume}`}>{a.resume}</p>}
      </div>
      {a.image && (
        <div className="conteneur">
          <Image src={a.image} alt="" width={1600} height={900} className={styles.image} priority />
        </div>
      )}
      <div className="conteneur">
        <div className={styles.corps} dangerouslySetInnerHTML={{ __html: a.html ?? "" }} />
      </div>
    </article>
  );
}
