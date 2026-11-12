import type { ReactNode } from "react";
import { EnTetePage } from "@/components/EnTetePage";
import styles from "./PageLegale.module.css";

/** Gabarit commun des pages légales : en-tête éditorial et texte en colonne lisible. */
export function PageLegale({ titre, intro, miseAJour, children }: { titre: string; intro?: string; miseAJour: string; children: ReactNode }) {
  return (
    <>
      <EnTetePage titre={titre} intro={intro} />
      <article className={`conteneur ${styles.corps}`}>
        <p className={`small sobre ${styles.maj}`}>Dernière mise à jour : {miseAJour}</p>
        {children}
      </article>
    </>
  );
}
