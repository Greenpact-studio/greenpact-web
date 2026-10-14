"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VentureStudio.module.css";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPES = [
  "Nous construisons avec le marché, pas à côté, et avec des entrepreneurs expérimentés (venant de Criteo, Brigad, PayFit, Bonitasoft, Neuralink…).",
  "Nous collaborons avec des entreprises pour décoder leurs besoins concrets.",
  "Dès que nous avons identifié un problème commun, avec une bonne profondeur de marché, nous créons, accompagnons et finançons une société.",
];

/**
 * Comment fonctionne un venture studio : besoins des industriels → construction
 * et investissement (avec nos apports) → startups à fort potentiel et fort impact.
 * Le schéma se trace au défilement.
 */
export function VentureStudio() {
  const racine = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(racine);
        gsap.set(q(".fil"), { strokeDasharray: 600, strokeDashoffset: 600 });
        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: { trigger: q(`.${styles.schema}`)[0], start: "top 70%", end: "bottom 60%", scrub: 0.8 },
          })
          .from(q(`.${styles.bloc}`)[0], { opacity: 0, x: -20, duration: 1 })
          .to(q(".fil")[0], { strokeDashoffset: 0, duration: 1 })
          .from(q(`.${styles.bloc}`)[1], { opacity: 0, y: 20, duration: 1 })
          .from(q(`.${styles.apport}`), { opacity: 0, y: 10, stagger: 0.15, duration: 0.6 })
          .to(q(".fil")[1], { strokeDashoffset: 0, duration: 1 })
          .from(q(`.${styles.bloc}`)[2], { opacity: 0, x: 20, duration: 1 });

        gsap.from(q(`.${styles.principe}`), {
          opacity: 0,
          y: 24,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: { trigger: q(`.${styles.principes}`)[0], start: "top 80%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(racine.current!.querySelectorAll(".fil"), { strokeDasharray: "none", strokeDashoffset: 0 });
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={racine} className={`section ${styles.vs}`} aria-labelledby="vs-titre">
      <div className="conteneur">
        <div className={styles.entete}>
          <h2 id="vs-titre">Comment fonctionne un venture studio</h2>
          <p className="lead">
            Le point de départ, ce sont les besoins des entreprises industrielles. Vient ensuite la construction de startups, avec notre investissement et nos apports. Le résultat : des startups à fort potentiel et à fort impact.
          </p>
        </div>

        <div className={styles.schema}>
          <div className={styles.bloc}>
            <p className={styles.etiquette}>Point de départ</p>
            <h3>Les besoins des entreprises industrielles</h3>
            <p className="small sobre">Décodés avec 300 partenaires industriels.</p>
          </div>

          <svg className={styles.fil} viewBox="0 0 120 40" aria-hidden preserveAspectRatio="none">
            <path className="fil" d="M0 20 H 120" fill="none" />
          </svg>

          <div className={`${styles.bloc} ${styles.blocCentral}`}>
            <p className={styles.etiquette}>Construction et investissement</p>
            <h3>Nous créons la startup et nous investissons</h3>
            <ul className={styles.apports}>
              {["Équipe opérationnelle", "Cash", "Clients", "Communs tech & IA"].map((a) => (
                <li key={a} className={styles.apport}>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <svg className={styles.fil} viewBox="0 0 120 40" aria-hidden preserveAspectRatio="none">
            <path className="fil" d="M0 20 H 120" fill="none" />
          </svg>

          <div className={styles.bloc}>
            <p className={styles.etiquette}>Résultat</p>
            <h3>Des startups à fort potentiel et à fort impact</h3>
            <p className="small sobre">Financées ensuite sur le marché, avec nos actionnaires en priorité.</p>
          </div>
        </div>

        <div className={styles.principes}>
          <div className={styles.photo}>
            <Image src="/images/modele-entrepreneurs.webp" alt="Équipe au travail dans un atelier industriel" width={1600} height={900} loading="lazy" />
          </div>
          <ol className={styles.liste}>
            {PRINCIPES.map((p, i) => (
              <li key={i} className={styles.principe}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
