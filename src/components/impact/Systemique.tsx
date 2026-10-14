"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LEVIERS_SYSTEMIQUES } from "@/data/impact";
import styles from "./Systemique.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Six leviers d'impact systémique : des cercles concentriques qui s'élargissent
 * au défilement, de l'entreprise à la communauté. Le schéma est collant à gauche,
 * chaque levier se révèle à droite et allume son cercle.
 */
export function Systemique() {
  const racine = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
        const q = gsap.utils.selector(racine);
        const cercles = q<SVGCircleElement>("[data-cercle]");
        gsap.set(cercles, { scale: 0.2, opacity: 0, transformOrigin: "center" });
        q<HTMLElement>(`.${styles.levier}`).forEach((lv, i) => {
          ScrollTrigger.create({
            trigger: lv,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: () => gsap.to(cercles[i], { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" }),
            onLeaveBack: () => gsap.to(cercles[i], { scale: 0.2, opacity: 0, duration: 0.5 }),
            onToggle: (st) => lv.classList.toggle(styles.actif, st.isActive),
          });
        });
      });
      gsap.matchMedia().add("(prefers-reduced-motion: reduce), (max-width: 899px)", () => {
        gsap.set(racine.current!.querySelectorAll("[data-cercle]"), { scale: 1, opacity: 1 });
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  const n = LEVIERS_SYSTEMIQUES.length;

  return (
    <section ref={racine} className={`section ${styles.sys}`} aria-labelledby="sys-titre">
      <div className={`conteneur ${styles.grille}`}>
        <div className={styles.colSchema}>
          <div className={styles.collant}>
            <h2 id="sys-titre" style={{ maxWidth: "14ch" }}>
              Au-delà de nos startups : un impact systémique.
            </h2>
            <p className="sobre">Six leviers pour recalibrer un système entier plutôt qu'une solution ponctuelle.</p>
            <svg viewBox="0 0 400 400" className={styles.schema} role="img" aria-label="Cercles concentriques : entreprise, dirigeants, clients et fournisseurs, filière, industrie, communauté">
              {LEVIERS_SYSTEMIQUES.map((l, i) => {
                const r = 28 + (i * 160) / (n - 1);
                return (
                  <g key={l.niveau}>
                    <circle data-cercle cx="200" cy="200" r={r} fill="none" />
                    <text x="200" y={200 - r + 11} textAnchor="middle" className={styles.etiquette}>
                      {l.niveau}
                    </text>
                  </g>
                );
              })}
              <circle cx="200" cy="200" r="4" className={styles.centre} />
            </svg>
          </div>
        </div>

        <ol className={styles.leviers}>
          {LEVIERS_SYSTEMIQUES.map((l, i) => (
            <li key={l.niveau} className={styles.levier}>
              <p className={styles.meta}>
                {String(i + 1).padStart(2, "0")} · {l.niveau}
              </p>
              <h3>{l.effet}</h3>
              <p className={styles.texte}>{l.texte}</p>
              <p className={styles.exemple}>{l.exemple}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
