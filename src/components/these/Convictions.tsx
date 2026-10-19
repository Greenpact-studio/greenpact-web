"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Convictions.module.css";

gsap.registerPlugin(ScrollTrigger);

const CONVICTIONS = [
  { condition: "Sans dépendre d'une énergie carbonée", conviction: "L'énergie la moins chère est la moins carbonée.", image: "condition-energie.webp", alt: "Éolienne sur des collines vertes" },
  { condition: "Sans épuiser les ressources", conviction: "La meilleure source de compétitivité est la sobriété.", image: "these-economie-reelle.webp", alt: "Vue aérienne d'une moissonneuse dans un champ" },
  { condition: "Sans dépendre d'une matière critique importée", conviction: "La matière la plus sûre est celle qu'on a déjà.", image: "condition-matiere.webp", alt: "Bacs de tri sélectif" },
  { condition: "Sans dépendre d'une compétence qui disparaît", conviction: "Le savoir-faire le plus compétitif est celui qui est déjà là.", image: "entree-portfolio-2.webp", alt: "Opérateurs sur une ligne de production" },
  { condition: "Sans être impacté par le climat", conviction: "L'adaptation est la meilleure sécurité d'exploitation.", image: "condition-climat.webp", alt: "Végétation qui reprend sur un versant rocheux" },
  { condition: "Sans dépendre des modèles des autres", conviction: "Pour sortir de la guerre des prix, changeons les règles.", image: "condition-modeles.webp", alt: "Atelier de production industrielle" },
];

/**
 * Six convictions révélées une à une au défilement. À gauche, collants : la photo
 * principale et une vignette par condition, qui s'allume quand la condition est lue.
 */
export function Convictions() {
  const racine = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(racine);
        const vignettes = q<HTMLElement>(`.${styles.vignette}`);
        q<HTMLElement>(`.${styles.item}`).forEach((it, i) => {
          gsap.fromTo(
            it,
            { opacity: 0.18, x: 24 },
            { opacity: 1, x: 0, ease: "none", scrollTrigger: { trigger: it, start: "top 80%", end: "top 45%", scrub: true } },
          );
          ScrollTrigger.create({
            trigger: it,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (st) => vignettes[i]?.classList.toggle(styles.active, st.isActive),
          });
        });
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={racine} className={`section ${styles.convictions}`} aria-labelledby="conv-titre">
      <div className={`conteneur ${styles.grille}`}>
        <div className={styles.colPhoto}>
          <div className={styles.collant}>
            <h2 id="conv-titre">Produire efficacement, à six conditions.</h2>
            <p className="sobre">Chaque condition s'accompagne de sa conviction.</p>
            <Image src="/images/these-convictions.webp" alt="Éoliennes au-dessus d'une forêt" width={1600} height={1067} loading="lazy" className={styles.photo} />
            <ul className={styles.vignettes} aria-hidden>
              {CONVICTIONS.map((c, i) => (
                <li key={i} className={styles.vignette}>
                  <Image src={`/images/${c.image}`} alt="" width={400} height={300} loading="lazy" sizes="(max-width: 900px) 33vw, 12rem" />
                  <span className={styles.vignetteNum}>{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ol className={styles.liste}>
          {CONVICTIONS.map((c, i) => (
            <li key={i} className={styles.item}>
              <p className={styles.condition}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                {c.condition}
              </p>
              <p className={styles.conviction}>{c.conviction}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
