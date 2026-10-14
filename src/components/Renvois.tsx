import Link from "next/link";
import Image from "next/image";
import styles from "./Renvois.module.css";

export type Renvoi = { href: string; titre: string; texte: string; image: string; alt: string };

/** Grandes entrées photographiques vers d'autres pages. */
export function Renvois({ items }: { items: Renvoi[] }) {
  return (
    <section className={styles.renvois} aria-label="Pour aller plus loin">
      {items.map((r) => (
        <Link key={r.href} href={r.href} className={`sur-photo ${styles.entree}`}>
          <Image src={r.image} alt={r.alt} width={1600} height={1067} loading="lazy" className={styles.image} />
          <span className={styles.voile} aria-hidden />
          <span className={styles.contenu}>
            <span className={styles.titre}>{r.titre}</span>
            <span className={styles.texte}>{r.texte}</span>
          </span>
        </Link>
      ))}
    </section>
  );
}
