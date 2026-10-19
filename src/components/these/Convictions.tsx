"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Convictions.module.css";

gsap.registerPlugin(ScrollTrigger);

// Une image par condition, dans le même ordre (fichiers dans /public/images/).
const CONVICTIONS = [
  { condition: "Sans dépendre d'une énergie carbonée", conviction: "L'énergie la moins chère est la moins carbonée.", image: "condition-energie.webp", alt: "Parc éolien sur des collines au soleil couchant" },
  { condition: "Sans épuiser les ressources", conviction: "La meilleure source de compétitivité est la sobriété.", image: "condition-ressources.webp", alt: "Toit couvert de panneaux solaires vu du ciel" },
  { condition: "Sans dépendre d'une matière critique importée", conviction: "La matière la plus sûre est celle qu'on a déjà.", image: "condition-matiere.webp", alt: "Roche couverte de cristaux de sel au bord d'un lac salé" },
  { condition: "Sans dépendre d'une compétence qui disparaît", conviction: "Le savoir-faire le plus compétitif est celui qui est déjà là.", image: "condition-savoir-faire.webp", alt: "Artisan ponçant une pièce de bois à l'atelier" },
  { condition: "Sans être impacté par le climat", conviction: "L'adaptation est la meilleure sécurité d'exploitation.", image: "condition-climat.webp", alt: "Toits végétalisés vus du ciel" },
  { condition: "Sans dépendre des modèles des autres", conviction: "Pour sortir de la guerre des prix, changeons les règles.", image: "condition-modeles.webp", alt: "Drapeaux de différents pays alignés" },
];

/**
 * Six conditions, chacune sur une ligne : son image à gauche, à la hauteur exacte
 * du texte à droite (alignées en haut et en bas). Révélées une à une au défilement.
 */
export function Convictions() {
  const racine = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(racine);
        q<HTMLElement>(`.${styles.item}`).forEach((it) => {
          gsap.fromTo(
            it,
            { opacity: 0.18, y: 24 },
            { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: it, start: "top 85%", end: "top 55%", scrub: true } },
          );
        });
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={racine} className={`section ${styles.convictions}`} aria-labelledby="conv-titre">
      <div className="conteneur">
        <div className={styles.entete}>
          <h2 id="conv-titre">Produire efficacement, à six conditions.</h2>
          <p className="sobre">Chaque condition s&apos;accompagne de sa conviction.</p>
        </div>
        <ol className={styles.liste}>
          {CONVICTIONS.map((c, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.visuel}>
                <Image src={`/images/${c.image}`} alt={c.alt} width={1200} height={800} loading="lazy" sizes="(max-width: 900px) 100vw, 40vw" />
              </span>
              <div className={styles.texte}>
                <p className={styles.condition}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  {c.condition}
                </p>
                <p className={styles.conviction}>{c.conviction}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
