import type { ReactNode } from "react";
import { EnTetePage } from "@/components/EnTetePage";
import styles from "./PageLegale.module.css";

/** Gabarit commun des pages légales : en-tête éditorial et texte en colonne lisible. */
export function PageLegale({ titre, intro, children }: { titre: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <EnTetePage titre={titre} intro={intro} />
      <article className={`conteneur ${styles.corps}`}>
        {children}
      </article>
    </>
  );
}
