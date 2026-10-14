"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Barres.module.css";

gsap.registerPlugin(ScrollTrigger);

export type Barre = { label: string; valeur: number; affichage: string; fort?: boolean };

/**
 * Comparaison en barres horizontales qui se remplissent au défilement.
 * `max` fixe l'échelle commune ; `fort` met une barre en pleine couleur.
 */
export function Barres({ barres, max, titre, note, inverse = false }: { barres: Barre[]; max: number; titre?: string; note?: string; inverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el.querySelectorAll("[data-barre]"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
        gsap.from(el.querySelectorAll("[data-val]"), {
          opacity: 0,
          duration: 0.6,
          delay: 0.8,
          stagger: 0.15,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`${styles.bloc} ${inverse ? "sur-vert" : ""}`}>
      {titre && <h3 className={styles.titre}>{titre}</h3>}
      <ul className={styles.liste}>
        {barres.map((b) => (
          <li key={b.label} className={styles.ligne}>
            <span className={styles.label}>{b.label}</span>
            <span className={styles.piste}>
              <span data-barre className={`${styles.barre} ${b.fort ? styles.fort : ""}`} style={{ width: `${Math.min(100, (b.valeur / max) * 100)}%` }} />
            </span>
            <span data-val className={styles.valeur}>
              {b.affichage}
            </span>
          </li>
        ))}
      </ul>
      {note && <p className={`small sobre ${styles.note}`}>{note}</p>}
    </div>
  );
}
