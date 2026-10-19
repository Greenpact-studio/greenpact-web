import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EnTetePage } from "@/components/EnTetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane } from "@/data/seo";
import { Onglets } from "@/components/actualites/Onglets";
import { SITE } from "@/data/config";
import { listerArticles, listerEpisodes, listerApparitions, listerPostsLinkedIn, dateFR } from "@/lib/actualites";
import styles from "./actualites.module.css";

export const metadata: Metadata = {
  title: "Actualités, podcast REGEN et presse",
  description: "Articles, podcast REGEN, apparitions et publications LinkedIn de Greenpact.",
  alternates: { canonical: "/actualites/" },
};

const externe = { target: "_blank", rel: "noopener noreferrer" } as const;

function Exemple({ si }: { si?: boolean }) {
  return si ? <span className={styles.exemple}>Exemple</span> : null;
}

export default async function Page() {
  const articles = listerArticles();
  const episodes = await listerEpisodes(8);
  const apparitions = listerApparitions();
  const posts = listerPostsLinkedIn();

  const onglets = [
    {
      id: "articles",
      label: "Articles",
      compte: articles.length,
      contenu:
        articles.length === 0 ? (
          <p className={styles.vide}>Aucun article pour le moment.</p>
        ) : (
          <div className={styles.articles}>
            {articles.map((a) => (
              <Link key={a.slug} href={`/actualites/${a.slug}/`} className={styles.article}>
                <span className={styles.articleCadre}>
                  {a.vignette && <Image src={a.vignette} alt="" width={1600} height={1200} className={styles.articleImage} loading="lazy" />}
                </span>
                <span className={styles.articleTexte}>
                  <span className={styles.date}>
                    {dateFR(a.date)}
                    <Exemple si={a.exemple} />
                  </span>
                  <span className={`${styles.articleTitre}`} style={{ display: "block" }}>
                    {a.titre}
                  </span>
                  <span style={{ display: "block" }}>{a.resume}</span>
                </span>
              </Link>
            ))}
          </div>
        ),
    },
    {
      id: "podcast",
      label: `Podcast ${SITE.podcast.nom}`,
      compte: episodes.length,
      contenu: (
        <>
          <p className={`lead ${styles.intro}`}>
            {SITE.podcast.nom} met en lumière les acteurs de la régénération, ceux qui transforment concrètement l'économie et le monde des affaires.
          </p>
          {episodes.length === 0 ? (
            <iframe
              title={`Lecteur Apple Podcasts : ${SITE.podcast.nom}`}
              src={`https://embed.podcasts.apple.com/fr/podcast/regen/id${SITE.podcast.appleId}?theme=light`}
              className={styles.lecteur}
              allow="autoplay *; encrypted-media *; clipboard-write"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              loading="lazy"
            />
          ) : (
            <ul className={styles.lignes}>
              {episodes.map((e) => (
                <li key={e.lien + e.date}>
                  <a href={e.lien} {...externe} className={styles.ligne} aria-label={`${e.titre}, écouter dans un nouvel onglet`}>
                    <span className={styles.date}>{dateFR(e.date)}</span>
                    <span className={styles.ligneTitre}>{e.titre}</span>
                    <span className={styles.ligneDroite}>
                      {e.duree ? `${e.duree} · ` : ""}Écouter ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className={styles.podcastPied}>
            <a href={SITE.podcast.apple} {...externe} className="lien">
              Tous les épisodes sur Apple Podcasts ↗
            </a>
          </p>
        </>
      ),
    },
    {
      id: "apparitions",
      label: "Apparitions",
      compte: apparitions.length,
      contenu:
        apparitions.length === 0 ? (
          <p className={styles.vide}>Aucune apparition référencée pour le moment.</p>
        ) : (
          <ul className={styles.lignes}>
            {apparitions.map((ap) => {
              const corps = (
                <>
                  <span className={styles.date}>{dateFR(ap.date)}</span>
                  <span>
                    <span className={styles.ligneTitre}>
                      {ap.titre}
                      <Exemple si={ap.exemple} />
                    </span>
                    <span className={styles.ligneSous}>{ap.media}</span>
                  </span>
                  <span className={styles.ligneDroite}>{ap.lien ? "Voir ↗" : ""}</span>
                </>
              );
              return (
                <li key={ap.titre + ap.date}>
                  {ap.lien ? (
                    <a href={ap.lien} {...externe} className={styles.ligne}>
                      {corps}
                    </a>
                  ) : (
                    <span className={styles.ligne}>{corps}</span>
                  )}
                </li>
              );
            })}
          </ul>
        ),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      compte: posts.length,
      contenu: (
        <>
          {posts.length === 0 ? (
            <p className={styles.vide}>Aucune publication intégrée pour le moment.</p>
          ) : (
            <ul className={styles.posts}>
              {posts.map((p) => (
                <li key={p.titre + p.date} className={styles.post}>
                  <span className={styles.postMeta}>
                    <span>
                      {p.titre}
                      <Exemple si={p.exemple} />
                    </span>
                    <span>{dateFR(p.date)}</span>
                  </span>
                  {/* Code d'intégration copié depuis LinkedIn (« Intégrer ce post »), voir data/linkedin.json */}
                  {p.iframe ? (
                    <span dangerouslySetInnerHTML={{ __html: p.iframe }} />
                  ) : p.lien ? (
                    <a href={p.lien} {...externe} className={styles.postLien} aria-label={`${p.titre}, voir sur LinkedIn dans un nouvel onglet`}>
                      <span className={styles.postLienTitre}>Voir la publication sur LinkedIn</span>
                      <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
          <p className={styles.podcastPied}>
            <a href={SITE.contact.linkedin} {...externe} className="lien">
              Suivre Greenpact sur LinkedIn ↗
            </a>
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={filAriane("/actualites/")} />
      <EnTetePage titre="Actualités" intro="Articles, podcast REGEN, apparitions et publications LinkedIn de Greenpact." />
      <section className="conteneur" style={{ paddingBottom: "var(--section)" }}>
        <Onglets onglets={onglets} styles={styles} />
      </section>
    </>
  );
}
