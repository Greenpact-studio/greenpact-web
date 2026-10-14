"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Chiffres.module.css";

gsap.registerPlugin(ScrollTrigger);

const CHIFFRES = [
  { valeur: 45, suffixe: " M€", label: "sous gestion" },
  { valeur: 18, suffixe: "", label: "participations à date" },
  { valeur: 2, suffixe: "", label: "venture studios" },
  { valeur: 300, suffixe: "", label: "partenaires industriels" },
];

/** Quatre chiffres clés, compteur animé à l'apparition. Mise en page éditoriale. */
export function Chiffres() {
  const racine = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nombres = Array.from(racine.current!.querySelectorAll<HTMLElement>("[data-valeur]"));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const compter = () => {
        nombres.forEach((el, i) => {
          const cible = Number(el.dataset.valeur);
          if (reduce) {
            el.textContent = String(cible);
            return;
          }
          const obj = { v: 0 };
          gsap.to(obj, {
            v: cible,
            duration: 1.8,
            delay: i * 0.12,
            ease: "power3.out",
            onUpdate: () => (el.textContent = String(Math.round(obj.v))),
          });
        });
      };
      // IntersectionObserver plutôt que ScrollTrigger : indépendant des
      // sections épinglées en amont et du défilement amorti.
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            compter();
            io.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      io.observe(racine.current!);
      gsap.from(`.${styles.item}`, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: racine.current, start: "top 75%", once: true },
      });
      return () => io.disconnect();
    }, racine);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={racine} className={`section ${styles.chiffres}`} aria-label="Chiffres clés">
      <div className={`conteneur ${styles.grille}`}>
        <p className={styles.intro}>Greenpact en quelques chiffres</p>
        {CHIFFRES.map((c, i) => (
          <div key={i} className={`${styles.item} ${styles[`item${i + 1}`]}`}>
            <p className={styles.valeur}>
              <span className={styles.nombre} data-valeur={c.valeur}>
                0
              </span>
              {c.suffixe}
            </p>
            <p className={styles.label}>{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
