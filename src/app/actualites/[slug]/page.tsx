import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { listerArticles, lireArticle, dateFR } from "@/lib/actualites";
import styles from "./article.module.css";

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
    openGraph: a.image ? { images: [a.image] } : undefined,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const a = await lireArticle(slug);
  if (!a) notFound();

  return (
    <article>
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
