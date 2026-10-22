import Link from "next/link";
import Image from "next/image";
import { RESULTATS_MESURES } from "@/data/impact";
import { Reveal } from "@/components/Reveal";
import styles from "./Resultats.module.css";

/** Ce que les startups changent déjà : Bluefins et Sapiologie, avec leur niveau de preuve, chacune menant à sa page détaillée. */
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
          <Link key={r.startup} href={r.lien} className={`sur-photo ${styles.carte}`} aria-label={`${r.startup} : ${r.chiffre} ${r.libelle}. ${r.libelleLien}`}>
            <Image src={`/images/${r.image}`} alt={r.alt} width={960} height={1200} className={styles.photo} loading="lazy" />
            <span className={styles.voile} aria-hidden />
            <span className={styles.contenu}>
              <span className={styles.entete}>
                <Image src={`/logos/blanc-${r.startup.toLowerCase()}.png`} alt={r.startup} width={360} height={120} className={styles.logo} loading="lazy" />
                <span className={`${styles.badge} ${r.niveau === "Estimé" ? styles.estime : ""}`}>{r.niveau}</span>
              </span>
              <span className={styles.chiffre}>{r.chiffre}</span>
              <span className={styles.libelle}>{r.libelle}</span>
            </span>
            <span className={styles.lien}>
              {r.libelleLien} <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
