import type { Metadata } from "next";
import Image from "next/image";
import { EnTetePage } from "@/components/EnTetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane } from "@/data/seo";
import { Reveal } from "@/components/Reveal";
import { EQUIPE, TRACK_RECORD, type Personne } from "@/data/equipe";
import styles from "./equipe.module.css";

export const metadata: Metadata = {
  title: "Équipe : gouvernance, Hoji Ventures et 4Elements",
  description: "Toutes les personnes de l'écosystème Greenpact, Hoji Ventures et 4Elements : gouvernance, associés et équipes opérationnelles.",
  alternates: { canonical: "/equipe/" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={filAriane("/equipe/")} />
      <EnTetePage titre="Équipe" intro={TRACK_RECORD} />

      {EQUIPE.map((g) => (
        <section key={g.id} className={`${styles.groupe} ${styles[g.id]}`} aria-labelledby={`g-${g.id}`}>
          <div className="conteneur">
            <div className={styles.groupeTete}>
              <h2 id={`g-${g.id}`} className={styles.titreLogo}>
                <Image src={g.logo} alt={g.nom} width={520} height={160} className={styles.logo} loading="lazy" />
              </h2>
              <p className={styles.sousTitre}>{g.sousTitre}</p>
              <span className={styles.effectif}>{g.membres.length} personnes</span>
            </div>
            <Reveal cascade as="ul" className={styles.grille} y={20}>
              {g.membres.map((m) => (
                <li key={`${g.id}-${m.photo}`}>
                  <Carte personne={m} />
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}

function Carte({ personne: p }: { personne: Personne }) {
  const contenu = (
    <>
      <span className={styles.cadre}>
        <Image src={`/team/${p.photo}`} alt={`${p.prenom} ${p.nom}`} width={240} height={240} sizes="10.5rem" className={styles.photo} loading="lazy" />
      </span>
      <span className={styles.nom}>
        {p.prenom} <strong>{p.nom}</strong>
      </span>
      <span className={styles.role}>{p.role}</span>
      {p.linkedin && (
        <span className={styles.linkedin} aria-hidden>
          LinkedIn ↗
        </span>
      )}
    </>
  );
  return p.linkedin ? (
    <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className={styles.carte} aria-label={`${p.prenom} ${p.nom}, ${p.role}, profil LinkedIn dans un nouvel onglet`}>
      {contenu}
    </a>
  ) : (
    <div className={styles.carte}>{contenu}</div>
  );
}
