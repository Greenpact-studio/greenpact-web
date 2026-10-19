import Link from "next/link";
import Image from "next/image";
import { RESULTATS_MESURES } from "@/data/impact";
import { Reveal } from "@/components/Reveal";
import styles from "./Resultats.module.css";

/** Ce que les startups changent déjà : Bluefins et Sapiologie, avec leur niveau de preuve, chacune menant à sa carte du portfolio. */
export function Resultats() {
  return (
    <section className="conteneur section" aria-labelledby="res-titre">
      <div className={styles.tete}>
        <h2 id="res-titre" style={{ maxWidth: "18ch" }}>
          Ce que les startups changent déjà, chez des industriels.
        </h2>
        <p className="lead">Deux résultats chez des clients, sur des navires et des produits réels, chacun avec son niveau de preuve.</p>
      </div>

      <Reveal cascade className={styles.cartes} y={24}>
        {RESULTATS_MESURES.map((r) => (
          <Link key={r.startup} href={`/portfolio/#${r.ancre}`} className={`sur-photo ${styles.carte}`} aria-label={`${r.startup} : ${r.chiffre} ${r.libelle}. Voir sa fiche dans le portfolio`}>
            <Image src={`/images/${r.image}`} alt={r.alt} width={1600} height={1067} className={styles.photo} loading="lazy" />
            <span className={styles.voile} aria-hidden />
            <span className={styles.contenu}>
              <span className={`${styles.badge} ${r.niveau === "Estimé" ? styles.estime : ""}`}>{r.niveau}</span>
              <span className={styles.theme}>{r.theme}</span>
              <span className={styles.chiffre}>{r.chiffre}</span>
              <span className={styles.libelle}>{r.libelle}</span>
              <span className={styles.preuve}>{r.preuve}</span>
              <span className={styles.lien}>
                {r.startup} dans le portfolio <span aria-hidden>→</span>
              </span>
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
