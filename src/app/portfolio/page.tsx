import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { EnTetePage } from "@/components/EnTetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane } from "@/data/seo";
import { Reveal } from "@/components/Reveal";
import { DIRECTES, STUDIOS, SYNTHESE_PORTFOLIO } from "@/data/portfolio";
import styles from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Portfolio : participations directes et startups des studios",
  description: "Nos trois participations directes, nos deux venture studios et les startups qu'ils ont créées : 1 holding, 2 venture studios, 18 participations à date.",
  alternates: { canonical: "/portfolio/" },
};

const externe = { target: "_blank", rel: "noopener noreferrer" } as const;
// Ancre d'une startup (/portfolio/#bluefins), utilisée par la page Thèse d'impact.
const ancre = (nom: string) => nom.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Page() {
  return (
    <>
      <JsonLd data={filAriane("/portfolio/")} />
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
            <a key={p.nom} id={ancre(p.nom)} href={p.url} {...externe} className={`sur-photo ${styles.panneau}`} aria-label={`${p.nom}, ouvrir le site dans un nouvel onglet`}>
              <Image src={`/images/${p.photo}`} alt="" width={1600} height={1067} className={styles.panneauPhoto} loading={i === 0 ? "eager" : "lazy"} />
              <span className={styles.panneauVoile} aria-hidden />
              <span className={styles.panneauContenu}>
                {p.logoClair && <Image src={`/logos/clair/${p.logoClair}`} alt={p.nom} width={360} height={120} className={styles.logo} loading="lazy" />}
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
      <section className="conteneur" style={{ paddingBottom: "var(--section)" }} aria-labelledby="studios-titre">
        <h2 id="studios-titre" className={styles.titreSection}>
          Nos deux venture studios
        </h2>
        <div className={styles.studios}>
          {STUDIOS.map((st) => (
            <Reveal key={st.id} className={`${styles.studio} ${styles[st.id]}`}>
              <a href={st.url} {...externe} className={styles.studioEntete} aria-label={`${st.nom}, ouvrir le site dans un nouvel onglet`}>
                <Image src={st.logoClair} alt={st.nom} width={520} height={160} className={styles.studioLogo} loading="lazy" />
                <span className={styles.studioPositionnement}>{st.positionnement}</span>
                <span className={styles.studioPied}>
                  <span>{st.startups.length} startups</span>
                  <span>{st.url.replace(/^https?:\/\/(www\.)?/, "")} ↗</span>
                </span>
              </a>
              <ul className={styles.startups}>
                {st.startups.map((su) => {
                  const contenu = (
                    <>
                      <span className={styles.suLogo} style={su.logoTaille ? ({ "--taille": su.logoTaille } as CSSProperties) : undefined}>
                        {su.logo ? <Image src={`/logos/${su.logo}`} alt="" width={360} height={120} loading="lazy" /> : <span className={styles.suMot}>{su.nom}</span>}
                      </span>
                      <span className={styles.suTexte}>
                        <span className={styles.suNom}>{su.nom}</span>
                        <span className={styles.suDescription}>{su.description}</span>
                      </span>
                      <span className={styles.suFleche} aria-hidden>
                        {su.url ? "↗" : ""}
                      </span>
                    </>
                  );
                  const id = st.id === "hoji" || !DIRECTES.some((d) => d.nom === su.nom) ? ancre(su.nom) : undefined;
                  return (
                    <li key={su.nom} id={id}>
                      {su.url ? (
                        <a href={su.url} {...externe} className={styles.startup} aria-label={`${su.nom}, ${su.url.includes("linkedin.com") ? "page LinkedIn" : "site"} dans un nouvel onglet`}>
                          {contenu}
                        </a>
                      ) : (
                        <span className={styles.startup}>{contenu}</span>
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
