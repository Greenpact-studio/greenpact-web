"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FlechePrincipes.module.css";

gsap.registerPlugin(ScrollTrigger);

// Centres des quatre colonnes de principes (grille 4 colonnes, gouttière 1,5 rem, conteneur 1280 px).
const LARGEUR = 1280;
const SOL = 70;
const SOMMET = -14;
const CENTRES = [151, 477, 803, 1129];

const bonds = CENTRES.slice(1).map((x, i) => {
  const x0 = CENTRES[i];
  return { cx: (x0 + x) / 2, x };
});
const trace = `M${CENTRES[0]} ${SOL} ` + bonds.map((b) => `Q${b.cx} ${SOMMET} ${b.x} ${SOL}`).join(" ");

// Pointe de flèche orientée selon la tangente d'arrivée du dernier bond.
const dernier = bonds[bonds.length - 1];
const angle = Math.atan2(SOL - SOMMET, dernier.x - dernier.cx);
const pointe = [-1, 1]
  .map((sens) => {
    const a = angle + Math.PI - sens * 0.5;
    return `${(dernier.x + Math.cos(a) * 16).toFixed(1)} ${(SOL + Math.sin(a) * 16).toFixed(1)}`;
  });
const tracePointe = `M${pointe[0]} L${dernier.x} ${SOL} L${pointe[1]}`;

/** Flèche verte qui rebondit d'un principe à l'autre, dessinée au défilement. */
export function FlechePrincipes() {
  const racine = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = racine.current!;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(el);
        const ligne = q<SVGPathElement>("[data-ligne]")[0];
        const L = ligne.getTotalLength();
        gsap.set(ligne, { strokeDasharray: L, strokeDashoffset: L });
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", end: "top 50%", scrub: 0.6 } });
        tl.to(ligne, { strokeDashoffset: 0, ease: "none", duration: 3 }, 0);
        q("[data-point]").forEach((p, i) => {
          tl.from(p, { scale: 0, transformOrigin: "center", duration: 0.25 }, i === 0 ? 0 : i - 0.1);
        });
        tl.from(q("[data-pointe]"), { opacity: 0, duration: 0.2 }, 2.85);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={racine} className={styles.fleche} viewBox={`0 ${SOMMET - 6} ${LARGEUR} ${SOL - SOMMET + 14}`} aria-hidden>
      <path data-ligne d={trace} className={styles.trait} />
      <path data-pointe d={tracePointe} className={styles.trait} />
      {CENTRES.slice(0, -1).map((x) => (
        <circle key={x} data-point cx={x} cy={SOL} r={5} className={styles.point} />
      ))}
    </svg>
  );
}
