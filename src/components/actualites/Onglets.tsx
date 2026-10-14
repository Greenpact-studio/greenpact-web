"use client";

import { useEffect, useState, type ReactNode } from "react";

export type Onglet = { id: string; label: string; compte: number; contenu: ReactNode };

/**
 * Quatre onglets discrets (Articles, Podcast, Apparitions, LinkedIn).
 * L'onglet actif est reflété dans l'ancre de l'URL (#podcast) pour être partageable.
 */
export function Onglets({ onglets, styles }: { onglets: Onglet[]; styles: Record<string, string> }) {
  const [actif, setActif] = useState(onglets[0].id);

  useEffect(() => {
    const lireAncre = () => {
      const h = window.location.hash.replace("#", "");
      if (onglets.some((o) => o.id === h)) setActif(h);
    };
    lireAncre();
    window.addEventListener("hashchange", lireAncre);
    return () => window.removeEventListener("hashchange", lireAncre);
  }, [onglets]);

  function choisir(id: string) {
    setActif(id);
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <>
      <div role="tablist" aria-label="Type de contenu" className={styles.onglets}>
        {onglets.map((o) => (
          <button
            key={o.id}
            role="tab"
            id={`onglet-${o.id}`}
            aria-selected={actif === o.id}
            aria-controls={`panneau-${o.id}`}
            className={styles.onglet}
            onClick={() => choisir(o.id)}
          >
            {o.label}
            <span className={styles.compte} aria-label={`${o.compte} éléments`}>
              {o.compte}
            </span>
          </button>
        ))}
      </div>
      {onglets.map((o) => (
        <div key={o.id} role="tabpanel" id={`panneau-${o.id}`} aria-labelledby={`onglet-${o.id}`} hidden={actif !== o.id} className={styles.panneau}>
          {actif === o.id && o.contenu}
        </div>
      ))}
    </>
  );
}
