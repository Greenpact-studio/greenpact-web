"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LEVIERS_SYSTEMIQUES } from "@/data/impact";
import styles from "./Systemique.module.css";

gsap.registerPlugin(ScrollTrigger);

// Nombre de points par niveau : illustration de la portée qui s'élargit (pas une donnée chiffrée).
const ACTEURS = [1, 3, 6, 10, 16, 24];

/**
 * Six leviers d'impact systémique, un par ligne. À gauche, un schéma de diffusion :
 * une colonne relie les niveaux, chaque niveau est une bande qui s'élargit et se
 * peuple d'acteurs. Le schéma va du premier levier au dernier, aligné sur les textes.
 * Au défilement : la colonne se trace, la bande s'ouvre, les points apparaissent.
 */
export function Systemique() {
  const racine = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(racine);
      const leviers = q<HTMLElement>(`.${styles.levier}`);
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        leviers.forEach((lv) => {
          const trait = lv.querySelector(`.${styles.trait}`);
          const bande = lv.querySelector(`.${styles.bande}`);
          const points = lv.querySelectorAll(`.${styles.point}`);
          gsap
            .timeline({ scrollTrigger: { trigger: lv, start: "top 80%", toggleActions: "play none none reverse" } })
            .from(trait, { scaleY: 0, transformOrigin: "top center", duration: 0.5, ease: "none" })
            .from(bande, { scaleX: 0.08, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
            .from(points, { scale: 0, opacity: 0, duration: 0.3, stagger: 0.025, ease: "back.out(2.5)" }, "-=0.35")
            .from(lv.querySelector(`.${styles.etiquette}`), { opacity: 0, y: 6, duration: 0.4 }, "-=0.2");
          ScrollTrigger.create({
            trigger: lv,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (st) => lv.classList.toggle(styles.actif, st.isActive),
          });
        });
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  const n = LEVIERS_SYSTEMIQUES.length;

  return (
    <section ref={racine} className={`section ${styles.sys}`} aria-labelledby="sys-titre">
      <div className="conteneur">
        <div className={styles.tete}>
          <h2 id="sys-titre">Au-delà de nos startups : un impact systémique.</h2>
          <p className="sobre">Six leviers pour recalibrer un système entier plutôt qu&apos;une solution ponctuelle : l&apos;impact part d&apos;une entreprise et s&apos;étend jusqu&apos;à la communauté.</p>
        </div>

        <ol className={styles.leviers}>
          {LEVIERS_SYSTEMIQUES.map((l, i) => (
            <li key={l.niveau} className={styles.levier} style={{ ["--i" as string]: i, ["--largeur" as string]: `${22 + (i * 78) / (n - 1)}%` }}>
              <div className={styles.visuel} aria-hidden>
                <span className={`${styles.trait} ${i === 0 ? styles.premier : ""} ${i === n - 1 ? styles.dernier : ""}`} />
                <span className={styles.bande}>
                  {Array.from({ length: ACTEURS[i] ?? 1 }).map((_, k) => (
                    <span key={k} className={styles.point} />
                  ))}
                </span>
                <span className={styles.etiquette}>
                  {l.niveau}
                </span>
              </div>
              <div className={styles.texte}>
                <p className={styles.meta}>
                  {String(i + 1).padStart(2, "0")} · {l.niveau}
                </p>
                <h3>{l.effet}</h3>
                <p className={styles.description}>{l.texte}</p>
                <p className={styles.exemple}>{l.exemple}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
