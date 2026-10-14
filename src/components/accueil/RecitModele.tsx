"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./RecitModele.module.css";

gsap.registerPlugin(ScrollTrigger);

const ETAPES = [
  {
    titre: "Des entrepreneurs s'associent.",
    texte:
      "Greenpact réunit des entrepreneurs expérimentés, des dirigeants, des investisseurs et des family offices. Nous croyons en la force de l'entrepreneuriat collaboratif : fédérer entrepreneurs, industriels, investisseurs et labos R&D pour concrétiser des innovations sur le marché.",
  },
  {
    titre: "Ils investissent ensemble.",
    texte: "Greenpact est une holding d'investissement à impact, au modèle evergreen, créée en 2021.",
  },
  {
    titre: "Via deux venture studios et des participations directes.",
    texte:
      "Nous investissons indirectement, via deux venture studios que nous avons co-fondés et qui créent des startups : Hoji (IA) et 4Elements (Deeptech). Nous investissons aussi en direct dans des startups qui sortent de nos venture studios.",
  },
  {
    titre: "Pour bâtir une industrie durable.",
    texte:
      "Notre mission : transformer l'économie productive européenne autour de trois piliers. Compétitivité : croître dans le respect des limites planétaires. Souveraineté : libérer l'Europe de ses dépendances. Durabilité : renforcer la résilience et réduire les impacts négatifs.",
  },
];

// Positions de départ des 14 points (entrepreneurs), dispersés.
const POINTS = [
  [60, 70], [140, 40], [230, 90], [330, 50], [420, 110], [500, 60], [90, 180],
  [200, 230], [310, 190], [430, 240], [520, 170], [120, 300], [260, 320], [400, 310],
];
// Positions dans le cercle Greenpact (centre 290,180 ; rayon 52).
const CIBLES = POINTS.map((_, i) => {
  const a = (i / POINTS.length) * Math.PI * 2;
  const r = i % 3 === 0 ? 22 : 44;
  return [290 + Math.cos(a) * r, 180 + Math.sin(a) * r];
});

/**
 * Section épinglée : le schéma se construit pendant que les 4 étapes
 * se succèdent. SVG en traits fins, deux couleurs. Sans prefers-reduced-motion,
 * tout est scrubbé sur le défilement ; avec, les étapes sont simplement
 * affichées les unes sous les autres et le schéma est complet.
 */
export function RecitModele() {
  const racine = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
        const q = gsap.utils.selector(racine);
        const etapes = q<HTMLElement>(`.${styles.etape}`);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: racine.current,
            start: "top top",
            end: "+=" + window.innerHeight * 3.2,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // État initial
        gsap.set(etapes, { opacity: 0, y: 24 });
        gsap.set(etapes[0], { opacity: 1, y: 0 });
        gsap.set(q(".anneau, .flux, .noeud, .branche, .industrie, .direct"), { opacity: 0 });
        gsap.set(q(".trait"), { strokeDasharray: 1000, strokeDashoffset: 1000 });

        const transition = (de: number, vers: number, pos: string) => {
          tl.to(etapes[de], { opacity: 0, y: -24, duration: 0.5 }, pos);
          tl.to(etapes[vers], { opacity: 1, y: 0, duration: 0.5 }, ">-0.1");
        };

        // 1 → 2 : les points se rassemblent, l'anneau se dessine
        tl.addLabel("e1", 0);
        tl.to({}, { duration: 0.6 }); // temps de lecture
        q<SVGCircleElement>(".point").forEach((p, i) => {
          tl.to(p, { attr: { cx: CIBLES[i][0], cy: CIBLES[i][1] }, duration: 1.2, ease: "power2.inOut" }, "e1+=0.6");
        });
        transition(0, 1, "e1+=1.2");
        tl.to(q(".anneau"), { opacity: 1, duration: 0.2 }, "e1+=1.6");
        tl.to(q(".anneau.trait"), { strokeDashoffset: 0, duration: 1.0 }, "e1+=1.6");
        tl.to(q(".legende-gp"), { opacity: 1, duration: 0.4 }, "e1+=2.3");

        // 2 → 3 : flux vers les studios puis les startups
        tl.addLabel("e3", "e1+=3.2");
        transition(1, 2, "e3");
        tl.to(q(".flux"), { opacity: 1, duration: 0.2 }, "e3+=0.2");
        tl.to(q(".flux.trait"), { strokeDashoffset: 0, duration: 1.0, stagger: 0.15 }, "e3+=0.2");
        tl.to(q(".noeud"), { opacity: 1, duration: 0.4, stagger: 0.15 }, "e3+=0.9");
        tl.to(q(".branche"), { opacity: 1, duration: 0.2 }, "e3+=1.4");
        tl.to(q(".branche.trait"), { strokeDashoffset: 0, duration: 0.8, stagger: 0.06 }, "e3+=1.4");
        tl.to(q(".startup"), { opacity: 1, scale: 1, transformOrigin: "center", duration: 0.4, stagger: 0.06 }, "e3+=1.8");
        tl.to(q(".direct"), { opacity: 1, duration: 0.2 }, "e3+=2.2");
        tl.to(q(".direct.trait"), { strokeDashoffset: 0, duration: 0.8 }, "e3+=2.2");

        // 3 → 4 : l'industrie se transforme (ligne d'horizon, usine, éoliennes)
        tl.addLabel("e4", "e3+=3.4");
        transition(2, 3, "e4");
        tl.to(q(".industrie"), { opacity: 1, duration: 0.2 }, "e4+=0.2");
        tl.to(q(".industrie.trait"), { strokeDashoffset: 0, duration: 1.6, stagger: 0.1 }, "e4+=0.2");
        tl.to(q(".pale"), { rotation: 180, transformOrigin: "center", duration: 2.2, ease: "none" }, "e4+=0.8");
        tl.to({}, { duration: 0.8 });
      });

      mm.add("(prefers-reduced-motion: reduce), (max-width: 899px)", () => {
        gsap.set(racine.current!.querySelectorAll(".trait"), { strokeDasharray: "none", strokeDashoffset: 0 });
        gsap.set(racine.current!.querySelectorAll(".anneau, .flux, .noeud, .branche, .industrie, .direct, .startup, .legende-gp"), { opacity: 1, scale: 1 });
        racine.current!.querySelectorAll<SVGCircleElement>(".point").forEach((p, i) => {
          p.setAttribute("cx", String(CIBLES[i][0]));
          p.setAttribute("cy", String(CIBLES[i][1]));
        });
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={racine} className={styles.recit} aria-labelledby="recit-titre">
      <div className={`conteneur ${styles.grille}`}>
        <div className={styles.textes}>
          <h2 id="recit-titre" className={styles.surtitre}>
            Le modèle Greenpact
          </h2>
          <div className={styles.pile}>
            {ETAPES.map((e, i) => (
              <div key={i} className={styles.etape}>
                <p className={styles.numero}>{String(i + 1).padStart(2, "0")}</p>
                <h3>{e.titre}</h3>
                <p className={styles.texte}>{e.texte}</p>
              </div>
            ))}
          </div>
        </div>

        <figure className={styles.schema}>
          <svg viewBox="0 0 580 420" role="img" aria-label="Schéma : des entrepreneurs se rassemblent dans Greenpact, qui investit dans deux venture studios et des startups, pour transformer l'industrie">
            <g className={styles.traits}>
              {/* Points : entrepreneurs */}
              {POINTS.map(([x, y], i) => (
                <circle key={i} className="point" cx={x} cy={y} r={i % 3 === 0 ? 4 : 3} />
              ))}
              {/* Anneau Greenpact */}
              <circle className="anneau trait" cx="290" cy="180" r="62" fill="none" />
              <text className="legende-gp" x="290" y="262" textAnchor="middle">
                Greenpact
              </text>

              {/* Flux vers les studios */}
              <path className="flux trait" d="M240 215 C 200 260, 170 290, 120 320" fill="none" />
              <path className="flux trait" d="M340 215 C 380 260, 410 290, 460 320" fill="none" />
              <g className="noeud">
                <circle cx="110" cy="332" r="16" fill="none" />
                <text x="110" y="366" textAnchor="middle">
                  Hoji · IA
                </text>
              </g>
              <g className="noeud">
                <circle cx="470" cy="332" r="16" fill="none" />
                <text x="470" y="366" textAnchor="middle">
                  4Elements · Deeptech
                </text>
              </g>

              {/* Branches vers les startups */}
              {[
                [96, 345, 40, 392], [104, 348, 70, 400], [116, 348, 100, 404], [124, 345, 130, 398],
                [456, 345, 420, 392], [464, 348, 450, 400], [476, 348, 480, 404], [484, 345, 510, 398], [486, 340, 540, 388],
              ].map(([x1, y1, x2, y2], i) => (
                <g key={i}>
                  <line className="branche trait" x1={x1} y1={y1} x2={x2} y2={y2} />
                  <circle className="startup" cx={x2} cy={y2} r="3.5" style={{ opacity: 0, transform: "scale(0)" }} />
                </g>
              ))}
              {/* Participation directe */}
              <path className="direct trait" d="M290 242 C 290 300, 290 340, 290 390" fill="none" strokeDasharray="4 5" />
              <circle className="startup" cx="290" cy="394" r="3.5" style={{ opacity: 0, transform: "scale(0)" }} />

              {/* Industrie durable : horizon, usine, éoliennes */}
              <g className="industrie">
                <path className="industrie trait" d="M20 150 H 180" fill="none" />
                <path className="industrie trait" d="M30 150 V 118 H 52 V 132 L 70 122 V 132 L 88 122 V 150" fill="none" />
                <path className="industrie trait" d="M100 150 V 100 H 112 V 150" fill="none" />
                <path className="industrie trait" d="M150 150 V 96" fill="none" />
                <g className="pale" style={{ transformBox: "fill-box" }}>
                  <path className="industrie trait" d="M150 96 L 150 74 M150 96 L 169 107 M150 96 L 131 107" fill="none" />
                </g>
                <path className="industrie trait" d="M400 110 H 560" fill="none" />
                <path className="industrie trait" d="M520 110 V 62" fill="none" />
                <g className="pale" style={{ transformBox: "fill-box" }}>
                  <path className="industrie trait" d="M520 62 L 520 40 M520 62 L 539 73 M520 62 L 501 73" fill="none" />
                </g>
                <path className="industrie trait" d="M410 110 V 88 Q 430 70 450 88 V 110" fill="none" />
              </g>
            </g>
          </svg>
        </figure>
      </div>
    </section>
  );
}
