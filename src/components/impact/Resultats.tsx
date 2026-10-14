import { RESULTATS_IMPACT, type NiveauPreuve } from "@/data/impact";
import { Reveal } from "@/components/Reveal";
import styles from "./Resultats.module.css";

const LEGENDE: Record<NiveauPreuve, string> = {
  Mesuré: "résultat constaté chez des clients",
  Estimé: "calcul à partir de données réelles",
  Intention: "objectif du projet, non encore mesuré",
};

/** Ce que les startups changent déjà, avec le niveau de preuve de chaque résultat. */
export function Resultats() {
  return (
    <section className="conteneur section" aria-labelledby="res-titre">
      <div className={styles.tete}>
        <div>
          <h2 id="res-titre" style={{ maxWidth: "16ch" }}>
            Ce que les startups changent déjà, chez des industriels.
          </h2>
          <p className="lead" style={{ marginTop: "1.25rem" }}>
            Chaque résultat est affiché avec son niveau de preuve.
          </p>
        </div>
        <dl className={styles.legende}>
          {(Object.keys(LEGENDE) as NiveauPreuve[]).map((n) => (
            <div key={n} className={styles.legendeItem}>
              <dt>
                <Badge niveau={n} />
              </dt>
              <dd>{LEGENDE[n]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.themes}>
        {RESULTATS_IMPACT.map((t) => (
          <Reveal key={t.theme} className={styles.theme}>
            <h3 className={styles.themeTitre}>{t.theme}</h3>
            <ul className={styles.liste}>
              {t.resultats.map((r) => (
                <li key={r.startup} className={styles.resultat}>
                  <p className={styles.startup}>{r.startup}</p>
                  <p className={styles.texte}>{r.resultat}</p>
                  <Badge niveau={r.niveau} />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Badge({ niveau }: { niveau: NiveauPreuve }) {
  return <span className={`${styles.badge} ${styles[niveau.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()]}`}>{niveau}</span>;
}
