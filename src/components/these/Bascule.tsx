"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Bascule.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTIONS = [
  { valeur: 50, signe: "+", unite: " %", label: "de CO₂" },
  { valeur: 200, signe: "+", unite: " %", label: "de consommation de ressources" },
  { valeur: 450, signe: "+", unite: " %", label: "de consommation en eau" },
  { valeur: 40, signe: "−", unite: " %", label: "de biodiversité" },
  { valeur: 45, signe: "+", unite: " %", label: "de demande énergétique mondiale" },
  { valeur: 11, signe: "−", unite: " %", label: "de PIB mondial" },
];

/**
 * « Le monde a basculé » : 7 limites planétaires sur 9 franchies, puis les
 * projections 2050 animées comme une progression qui se dégrade au défilement
 * (les chiffres montent, les jauges se remplissent, l'ensemble s'assombrit).
 */
export function Bascule() {
  const racine = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(racine);
        // Limites planétaires : 9 cercles, 7 se remplissent un à un
        gsap.from(q("[data-limite='franchie']"), {
          scale: 0.2,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(2)",
          scrollTrigger: { trigger: q(`.${styles.limites}`)[0], start: "top 75%", once: true },
        });
        // Projections : jauges + compteurs scrubbés sur le défilement
        const jauges = q<HTMLElement>("[data-jauge]");
        const nombres = q<HTMLElement>("[data-nombre]");
        nombres.forEach((n) => (n.textContent = "0"));
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q(`.${styles.projections}`)[0], start: "top 90%", end: "top 55%", scrub: 0.4 },
        });
        jauges.forEach((j, i) => {
          const n = nombres[i];
          const cible = Number(n.dataset.nombre);
          const obj = { v: 0 };
          tl.fromTo(j, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", ease: "none", duration: 1 }, i * 0.35);
          tl.to(obj, { v: cible, ease: "none", duration: 1, onUpdate: () => (n.textContent = String(Math.round(obj.v))) }, i * 0.35);
        });
        tl.to(q(`.${styles.projections}`), { backgroundColor: "#14301f", ease: "none", duration: 1.6 }, 0.4);
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={racine} className={`section sur-vert ${styles.bascule}`} aria-labelledby="bascule-titre">
      <div className="conteneur">
        <div className={styles.tete}>
          <h2 id="bascule-titre">Le monde a basculé.</h2>
          <div className={styles.limites} aria-label="7 limites planétaires sur 9 sont franchies">
            <p className={styles.limitesTexte}>
              <span className={styles.grand}>7</span> limites planétaires sur 9 sont franchies.
            </p>
            <div className={styles.cercles} aria-hidden>
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className={styles.cercle}>
                  {i < 7 && <span data-limite="franchie" className={styles.plein} />}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.projections}>
          <p className={styles.sousTitre}>D'ici 2050, sans rien faire :</p>
          <ul className={styles.grille}>
            {PROJECTIONS.map((p) => (
              <li key={p.label} className={styles.projection}>
                <p className={styles.chiffre}>
                  {p.signe}
                  {/* Valeur réelle par défaut : l'animation repart de 0 seulement si elle est active. */}
                  <span data-nombre={p.valeur}>{p.valeur}</span>
                  {p.unite}
                </p>
                <p className={styles.label}>{p.label}</p>
                <span className={styles.piste}>
                  <span data-jauge className={styles.jauge} style={{ width: `${Math.min(100, (p.valeur / 450) * 100)}%` }} />
                </span>
              </li>
            ))}
          </ul>
          <p className={`small ${styles.source}`}>Sources : OCDE 2012, Swiss Re Institute 2021.</p>
        </div>
      </div>
    </section>
  );
}
