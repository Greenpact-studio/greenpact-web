"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Diversification.module.css";

gsap.registerPlugin(ScrollTrigger);

const A_DATE = 18; // participations à date
const CIBLE_MIN = 25;
const CIBLE_MAX = 30;
const COLONNES = 10;

/**
 * Le véhicule : une diversification sur 25 à 30 participations cibles.
 * Trente emplacements ; les 18 premiers se remplissent au défilement
 * (participations à date), les suivants restent en attente (cibles).
 */
export function Diversification() {
  const racine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = racine.current!;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const pleins = el.querySelectorAll(`.${styles.plein}`);
        const cibles = el.querySelectorAll(`.${styles.cible}`);
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true } });
        tl.from(pleins, { scale: 0, opacity: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.6)", transformOrigin: "50% 50%" })
          .from(cibles, { opacity: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" }, "-=0.2")
          .from(el.querySelectorAll(`.${styles.legende} > *`), { opacity: 0, y: 8, duration: 0.6, stagger: 0.15 }, "-=0.3");
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const cases = Array.from({ length: CIBLE_MAX }, (_, i) => i);
  const taille = 28;
  const pas = 46;
  const largeur = COLONNES * pas - (pas - taille);
  const lignes = Math.ceil(CIBLE_MAX / COLONNES);
  const hauteur = lignes * pas - (pas - taille);

  return (
    <div ref={racine} className={styles.bloc} aria-label={`${A_DATE} participations à date, ${CIBLE_MIN} à ${CIBLE_MAX} participations cibles`} role="img">
      <svg viewBox={`0 0 ${largeur} ${hauteur}`} className={styles.svg} aria-hidden>
        {cases.map((i) => {
          const x = (i % COLONNES) * pas + taille / 2;
          const y = Math.floor(i / COLONNES) * pas + taille / 2;
          const r = taille / 2;
          if (i < A_DATE) return <circle key={i} cx={x} cy={y} r={r} className={styles.plein} />;
          return <circle key={i} cx={x} cy={y} r={r - 0.5} className={`${styles.cible} ${i >= CIBLE_MIN ? styles.option : ""}`} />;
        })}
      </svg>
      <dl className={styles.legende}>
        <div>
          <dt>
            <span className={`${styles.puce} ${styles.pucePleine}`} aria-hidden /> {A_DATE} participations à date
          </dt>
        </div>
        <div>
          <dt>
            <span className={styles.puce} aria-hidden /> {CIBLE_MIN} à {CIBLE_MAX} participations cibles
          </dt>
        </div>
      </dl>
    </div>
  );
}
