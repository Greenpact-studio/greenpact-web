"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CycleImpact.module.css";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    porteur: "Studios",
    moment: "Avant investissement",
    titre: "Sélection",
    points: ["Exclusions sectorielles et critères DNSH", "Fiche impact remplie par les fondateurs", "Scoring sur 4 thématiques pondéré par les effets rebonds", "Go / No Go en comité"],
  },
  {
    porteur: "Studios",
    moment: "Pendant l'accompagnement",
    titre: "Construction",
    points: ["Business plan d'impact et seuils déclencheurs", "KPI reliés au cœur de l'activité", "Les premiers clients industriels sont les premiers terrains de mesure"],
  },
  {
    porteur: "Studios et Greenpact",
    moment: "Chaque année",
    titre: "Suivi et reporting",
    points: ["Collecte annuelle des données par les studios", "Rapport d'impact validé en comité", "Agrégation Greenpact par levier", "Observatoire publié aux actionnaires"],
  },
];

/** Le cycle d'impact, de l'idée au reporting : une frise qui se dessine au défilement. */
export function CycleImpact() {
  const racine = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(racine);
        const ligne = q<SVGPathElement>("[data-ligne]")[0];
        const L = ligne.getTotalLength();
        gsap.set(ligne, { strokeDasharray: L, strokeDashoffset: L });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q(`.${styles.frise}`)[0], start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        });
        tl.to(ligne, { strokeDashoffset: 0, ease: "none", duration: 3 }, 0);
        q(`.${styles.phase}`).forEach((p, i) => {
          tl.from(p.querySelector(`.${styles.point}`), { scale: 0, transformOrigin: "center", duration: 0.3 }, 0.2 + i);
          tl.from(p.querySelector(`.${styles.carte}`), { opacity: 0, y: 20, duration: 0.6 }, 0.3 + i);
        });
        tl.from(q(`.${styles.consolidation}`), { opacity: 0, y: 20, duration: 0.6 }, 3.1);
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={racine} className="section sur-vert" aria-labelledby="cycle-titre">
      <div className="conteneur">
        <h2 id="cycle-titre" style={{ maxWidth: "16ch" }}>
          Le cycle d'impact, de l'idée au reporting.
        </h2>
        <p className="lead" style={{ marginTop: "1.25rem", color: "var(--clair-80)" }}>
          Trois phases portées par les studios, une consolidation portée par Greenpact.
        </p>

        <div className={styles.frise}>
          <svg className={styles.trace} viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden>
            <path data-ligne d="M0 20 H 1000" fill="none" />
          </svg>
          <ol className={styles.phases}>
            {PHASES.map((p, i) => (
              <li key={i} className={styles.phase}>
                <span className={styles.point} aria-hidden />
                <div className={styles.carte}>
                  <p className={styles.meta}>
                    {p.porteur} · {p.moment}
                  </p>
                  <h3>
                    {String(i + 1).padStart(2, "0")} {p.titre}
                  </h3>
                  <ul className={styles.points}>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.consolidation}>
            <p className={styles.meta}>Greenpact</p>
            <p>Consolidation : les données des studios sont agrégées par levier d'impact et publiées aux actionnaires dans l'observatoire.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
