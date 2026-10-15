import type { Metadata } from "next";
import Image from "next/image";
import { EnTetePage } from "@/components/EnTetePage";
import { Reveal } from "@/components/Reveal";
import { DIRECTES, STUDIOS, SYNTHESE_PORTFOLIO } from "@/data/portfolio";
import styles from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nos trois participations directes, nos deux venture studios et les startups qu'ils ont créées : 1 holding, 2 venture studios, 18 participations à date.",
};

const externe = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Page() {
  return (
    <>
      <EnTetePage titre="Portfolio" intro="Participations directes et startups de nos deux venture studios." />

      {/* 7.1 Participations directes */}
      <section className={styles.directes} aria-labelledby="dir-titre">
        <div className="conteneur">
          <h2 id="dir-titre" className={styles.titreSection}>
            Nos 3 participations directes
          </h2>
        </div>
        <div className={styles.panneaux}>
          {DIRECTES.map((p, i) => (
            <a key={p.nom} href={p.url} {...externe} className={`sur-photo ${styles.panneau}`} aria-label={`${p.nom}, ouvrir le site dans un nouvel onglet`}>
              <Image src={`/images/${p.photo}`} alt="" width={1600} height={1067} className={styles.panneauPhoto} loading={i === 0 ? "eager" : "lazy"} />
              <span className={styles.panneauVoile} aria-hidden />
              <span className={styles.panneauContenu}>
                {p.logo && (
                  <span className={styles.logoBoite}>
                    <Image src={`/logos/${p.logo}`} alt={p.nom} width={300} height={100} className={styles.logo} loading="lazy" />
                  </span>
                )}
                <span className={styles.secteur}>{p.secteur}</span>
                <span className={styles.panneauNom}>{p.nom}</span>
                <span className={styles.panneauTexte}>{p.description}</span>
                <span className={styles.panneauLien}>{p.url.replace(/^https?:\/\//, "")} ↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 7.2 Venture studios */}
      <section className="conteneur section" aria-labelledby="studios-titre">
        <h2 id="studios-titre" className={styles.titreSection}>
          Nos deux venture studios
        </h2>
        <div className={styles.studios}>
          {STUDIOS.map((st) => (
            <Reveal key={st.id} className={styles.studio}>
              <a href={st.url} {...externe} className={styles.studioEntete} aria-label={`${st.nom}, ouvrir le site dans un nouvel onglet`}>
                <Image src={st.logo} alt="" width={520} height={160} className={`${styles.studioLogo} ${styles[st.id]}`} loading="lazy" />
                <span className={styles.studioNom}>{st.nom}</span>
                <span className={styles.studioPositionnement}>{st.positionnement}</span>
                <span className={styles.studioLien}>{st.url.replace(/^https?:\/\/(www\.)?/, "")} ↗</span>
              </a>
              <ul className={styles.startups}>
                {st.startups.map((su) => {
                  const contenu = (
                    <>
                      <span className={styles.suLogo}>{su.logo ? <Image src={`/logos/${su.logo}`} alt="" width={240} height={80} loading="lazy" /> : <span className={styles.suInitiale}>{su.nom.charAt(0)}</span>}</span>
                      <span className={styles.suNom}>{su.nom}</span>
                      <span className={styles.suTexte}>{su.description}</span>
                      {su.url && <span className={styles.suFleche} aria-hidden>↗</span>}
                    </>
                  );
                  return (
                    <li key={su.nom}>
                      {su.url ? (
                        <a href={su.url} {...externe} className={styles.startup} aria-label={`${su.nom}, ${su.url.includes("linkedin.com") ? "page LinkedIn" : "site"} dans un nouvel onglet`}>
                          {contenu}
                        </a>
                      ) : (
                        <span className={`${styles.startup} ${styles.sansLien}`}>{contenu}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7.3 Synthèse */}
      <section className={`sur-vert ${styles.synthese}`}>
        <p className="conteneur">{SYNTHESE_PORTFOLIO}</p>
      </section>
    </>
  );
}
