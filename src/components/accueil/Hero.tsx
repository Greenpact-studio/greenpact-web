"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/data/config";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Arrivée plein écran (100svh) : photo de forêt, voile vert, titre.
 * Animations : apparition orchestrée du titre à l'ouverture, et légère
 * parallaxe de la photo au défilement. Rien d'autre.
 */
export function Hero() {
  const racine = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(`.${styles.photo}`, { scale: 1.06, duration: 2.2, ease: "power2.out" }, 0)
          .from(`.${styles.mot}`, { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.3)
          .from(`.${styles.accroche}`, { opacity: 0, y: 16, duration: 1 }, 0.9)
          .from(`.${styles.defiler}`, { opacity: 0, duration: 0.8 }, 1.3);

        gsap.to(`.${styles.photo}`, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: racine.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(`.${styles.contenu}`, {
          yPercent: -10,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: racine.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  const mots = SITE.tagline.split(" ");

  return (
    <section ref={racine} className={`sur-photo ${styles.hero}`} aria-label="Accueil">
      <div className={styles.photo} aria-hidden />
      <div className={styles.voile} aria-hidden />
      <div className={`conteneur ${styles.contenu}`}>
        <h1 className={`display ${styles.titre}`}>
          {mots.map((m, i) => (
            <span key={i}>
              <span className={styles.motWrap}>
                <span className={styles.mot}>{m}</span>
              </span>
              {i < mots.length - 1 && " "}
            </span>
          ))}
        </h1>
        <p className={`lead ${styles.accroche}`}>{SITE.description}</p>
      </div>
      <div className={styles.defiler} aria-hidden>
        <span>Défiler</span>
      </div>
    </section>
  );
}
