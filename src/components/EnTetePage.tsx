import styles from "./EnTetePage.module.css";

/** En-tête éditorial des pages intérieures (sans photo plein écran). */
export function EnTetePage({ titre, intro }: { titre: string; intro?: string }) {
  return (
    <section className={`conteneur ${styles.entete}`}>
      <h1 className="display">{titre}</h1>
      {intro && <p className={`lead ${styles.intro}`}>{intro}</p>}
    </section>
  );
}
