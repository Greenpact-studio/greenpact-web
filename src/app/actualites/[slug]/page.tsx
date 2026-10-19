import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { listerArticles, lireArticle, dateFR } from "@/lib/actualites";
import styles from "./article.module.css";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/data/config";
import { CorpsArticle } from "@/components/actualites/CorpsArticle";

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
          author: { "@type": "Organization", name: a.auteur ?? "Greenpact", url: `${SITE.url}/` },
          publisher: { "@id": `${SITE.url}/#organisation` },
          mainEntityOfPage: `${SITE.url}/actualites/${a.slug}/`,
        }}
      />
      <div className={`conteneur ${styles.entete}`}>
        <div className={styles.colonne}>
          <Link href="/actualites/" className={`lien ${styles.retour}`}>
            ← Toutes les actualités
          </Link>
          <h1>{a.titre}</h1>
          <p className={styles.signature}>
            {a.auteur && <span className={styles.auteur}>{a.auteur}</span>}
            <span>{dateFR(a.date)}</span>
            {a.lecture && <span>{a.lecture}</span>}
            {a.exemple && <span className={styles.exemple}>Exemple</span>}
          </p>
          {a.resume && <p className={`lead ${styles.resume}`}>{a.resume}</p>}
        </div>
      </div>
      {a.image && (
        <div className="conteneur">
          <Image src={a.image} alt="" width={1600} height={900} className={styles.image} priority />
        </div>
      )}
      <div className="conteneur">
        <CorpsArticle html={a.html ?? ""} className={styles.corps} pret={styles.pret} visible={styles.visible} />
      </div>
    </article>
  );
}
