"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STUDIOS, DIRECTES } from "@/data/portfolio";
import styles from "./RecitModele.module.css";

gsap.registerPlugin(ScrollTrigger);

const ETAPES = [
  {
    titre: "Des entrepreneurs s'associent.",
    textes: [
      "Greenpact réunit des entrepreneurs expérimentés, des dirigeants, des investisseurs et des family offices.",
      "Nous croyons en la force de l'entrepreneuriat collaboratif : fédérer entrepreneurs, industriels, investisseurs et labos R&D pour concrétiser des innovations sur le marché.",
    ],
  },
  {
    titre: "Ils investissent ensemble.",
    textes: ["Greenpact est une holding d'investissement à impact, au modèle evergreen, créée en 2021."],
  },
  {
    titre: "Via deux venture studios et des participations directes.",
    textes: [
      "Nous investissons indirectement, via deux venture studios que nous avons co-fondés et qui créent des startups : Hoji (IA) et 4Elements (Deeptech).",
      "Nous investissons aussi en direct dans des startups qui sortent de nos venture studios.",
    ],
  },
  {
    titre: "Pour bâtir une industrie durable.",
    textes: [
      "Notre mission : transformer l'économie productive européenne autour de trois piliers.",
      "Compétitivité : croître dans le respect des limites planétaires. Souveraineté : libérer l'Europe de ses dépendances. Durabilité : renforcer la résilience et réduire les impacts négatifs.",
    ],
  },
];

/* ─── Géométrie du schéma (viewBox 600 × 470) ─── */
const GP = { x: 300, y: 92, r: 50 };
// 14 entrepreneurs, dispersés au départ, qui viennent former l'anneau Greenpact.
const DEPARTS = [
  [70, 40], [150, 120], [40, 200], [230, 30], [520, 60], [470, 150], [560, 230],
  [120, 300], [210, 380], [360, 420], [480, 360], [560, 420], [60, 420], [400, 250],
];
const ANNEAU = DEPARTS.map((_, i) => {
  const a = (i / DEPARTS.length) * Math.PI * 2 - Math.PI / 2;
  return [GP.x + Math.cos(a) * GP.r, GP.y + Math.sin(a) * GP.r];
});

// Trois branches alignées sur trois colonnes : Hoji, directes, 4Elements.
const COLONNES = [
  { id: "hoji", x: 125, titre: "Hoji Ventures", sous: "Venture studio IA", n: STUDIOS[0].startups.length },
  { id: "directes", x: 300, titre: "En direct", sous: "Participations", n: DIRECTES.length },
  { id: "4elements", x: 475, titre: "4Elements", sous: "Venture studio deeptech", n: STUDIOS[1].startups.length },
];
const BLOC = { l: 156, h: 56, y: 212 }; // blocs studios / directes
const PEIGNE_Y = 300; // barre horizontale qui distribue vers les startups
const STARTUP_Y = 330;
const SOCLE_Y = 404; // l'industrie durable
const PILIERS = ["Compétitivité", "Souveraineté", "Durabilité"];

function positionsStartups(x: number, n: number) {
  const pas = Math.min(20, 140 / Math.max(1, n - 1));
  return Array.from({ length: n }, (_, i) => x + (i - (n - 1) / 2) * pas);
}

/**
 * Section épinglée : le schéma se construit pendant que les quatre étapes se succèdent.
 * Un seul trait fin, deux couleurs, aucune ligne ne passe sur un texte.
 * Le défilement épinglé est court (≈ 1,5 écran). Sans animation (mobile ou
 * prefers-reduced-motion), les étapes sont empilées et le schéma est complet.
 */
export function RecitModele() {
  const racine = useRef<HTMLElement>(null);
  // On épingle un conteneur interne, jamais la <section> elle-même : GSAP l'enveloppe
  // dans un « pin-spacer », et React doit pouvoir retirer la section intacte au
  // changement de page (sinon : « removeChild » et « This page couldn't load »).
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
        const q = gsap.utils.selector(racine);
        const etapes = q<HTMLElement>(`.${styles.etape}`);
        const traits = q<SVGGeometryElement>(".trait");
        traits.forEach((t) => {
          const L = t.getTotalLength();
          gsap.set(t, { strokeDasharray: L, strokeDashoffset: L });
        });
        gsap.set(etapes, { autoAlpha: 0, y: 20 });
        gsap.set(etapes[0], { autoAlpha: 1, y: 0 });
        gsap.set(q(".apparait"), { autoAlpha: 0 });
        gsap.set(q(".startup"), { scale: 0, transformOrigin: "50% 50%" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scene.current,
            start: "top top",
            end: "+=" + Math.round(window.innerHeight * 1.5),
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        const passer = (de: number, vers: number, pos: number) => {
          tl.to(etapes[de], { autoAlpha: 0, y: -20, duration: 0.3 }, pos);
          tl.to(etapes[vers], { autoAlpha: 1, y: 0, duration: 0.3 }, pos + 0.32);
        };

        // 1 → 2 : les entrepreneurs se rassemblent et forment Greenpact.
        q<SVGCircleElement>(".entrepreneur").forEach((p, i) => {
          tl.to(p, { attr: { cx: ANNEAU[i][0], cy: ANNEAU[i][1] }, duration: 0.8, ease: "power2.inOut" }, 0);
        });
        passer(0, 1, 0.55);
        tl.to(q(".gp-anneau"), { strokeDashoffset: 0, duration: 0.5 }, 0.7);
        tl.to(q(".gp-coeur, .gp-nom"), { autoAlpha: 1, duration: 0.3 }, 0.95);
        tl.to(q(".entrepreneur"), { autoAlpha: 0, duration: 0.2 }, 1.05);

        // 2 → 3 : trois branches, puis les startups.
        passer(1, 2, 1.4);
        tl.to(q(".branche"), { strokeDashoffset: 0, duration: 0.45, stagger: 0.08 }, 1.5);
        tl.to(q(".bloc"), { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, 1.8);
        tl.to(q(".peigne"), { strokeDashoffset: 0, duration: 0.4, stagger: 0.05 }, 2.1);
        tl.to(q(".startup"), { scale: 1, duration: 0.25, stagger: 0.015 }, 2.35);

        // 3 → 4 : tout converge vers le socle d'une industrie durable.
        passer(2, 3, 2.9);
        tl.to(q(".descente"), { strokeDashoffset: 0, duration: 0.35, stagger: 0.06 }, 3.0);
        tl.to(q(".socle"), { strokeDashoffset: 0, duration: 0.45 }, 3.25);
        tl.to(q(".pilier"), { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, 3.5);
        tl.to({}, { duration: 0.3 });
      });

      mm.add("(prefers-reduced-motion: reduce), (max-width: 899px)", () => {
        const r = racine.current!;
        r.querySelectorAll<SVGCircleElement>(".entrepreneur").forEach((p) => (p.style.opacity = "0"));
      });
    }, racine);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={racine} aria-labelledby="recit-titre">
      <h2 id="recit-titre" className="sr-only">
        Le modèle Greenpact
      </h2>
      <div ref={scene} className={styles.recit}>
        <div className={`conteneur ${styles.grille}`}>
          <div className={styles.pile}>
            {ETAPES.map((e, i) => (
              <div key={i} className={styles.etape}>
                <h3>{e.titre}</h3>
                {e.textes.map((t, j) => (
                  <p key={j} className={styles.texte}>
                    {t}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <figure className={styles.schema}>
            <svg
              viewBox="0 0 600 470"
              role="img"
              aria-label="Schéma : des entrepreneurs se rassemblent dans Greenpact, qui investit via Hoji Ventures (IA), 4Elements (deeptech) et en direct dans des startups, pour une industrie compétitive, souveraine et durable"
            >
              {/* Greenpact */}
              <circle className="gp-coeur apparait" cx={GP.x} cy={GP.y} r={GP.r} />
              <circle className="trait gp-anneau" cx={GP.x} cy={GP.y} r={GP.r} fill="none" />
              <text className={`gp-nom apparait ${styles.nomGp}`} x={GP.x} y={GP.y + 5} textAnchor="middle">
                Greenpact
              </text>
              {DEPARTS.map(([x, y], i) => (
                <circle key={i} className={`entrepreneur ${styles.plein}`} cx={x} cy={y} r={i % 3 === 0 ? 4.5 : 3.5} />
              ))}

              {/* Branches Greenpact → blocs */}
              {COLONNES.map((c) => {
                const depart = c.x === GP.x ? `M${GP.x} ${GP.y + GP.r}` : `M${GP.x + Math.sign(c.x - GP.x) * 34} ${GP.y + 37}`;
                const d = c.x === GP.x ? `${depart} V ${BLOC.y}` : `${depart} C ${GP.x + Math.sign(c.x - GP.x) * 60} ${BLOC.y - 40}, ${c.x} ${BLOC.y - 60}, ${c.x} ${BLOC.y}`;
                return <path key={c.id} className={`trait branche ${styles.ligne}`} d={d} fill="none" />;
              })}

              {COLONNES.map((c) => {
                const xs = positionsStartups(c.x, c.n);
                return (
                  <g key={c.id}>
                    {/* Bloc : studio ou participations directes */}
                    <g className="bloc apparait">
                      <rect x={c.x - BLOC.l / 2} y={BLOC.y} width={BLOC.l} height={BLOC.h} rx={BLOC.h / 2} className={c.id === "directes" ? styles.blocVide : styles.blocPlein} />
                      <text x={c.x} y={BLOC.y + 25} textAnchor="middle" className={c.id === "directes" ? styles.titreBlocClair : styles.titreBloc}>
                        {c.titre}
                      </text>
                      <text x={c.x} y={BLOC.y + 42} textAnchor="middle" className={c.id === "directes" ? styles.sousBlocClair : styles.sousBloc}>
                        {c.sous}
                      </text>
                    </g>
                    {/* Peigne : tronc, barre, et une attache par startup */}
                    <path className={`trait peigne ${styles.ligne}`} d={`M${c.x} ${BLOC.y + BLOC.h} V ${PEIGNE_Y}`} fill="none" />
                    <path className={`trait peigne ${styles.ligne}`} d={`M${xs[0]} ${PEIGNE_Y} H ${xs[xs.length - 1]}`} fill="none" />
                    {xs.map((x, i) => (
                      <g key={i}>
                        <path className={`trait peigne ${styles.ligne}`} d={`M${x} ${PEIGNE_Y} V ${STARTUP_Y - 6}`} fill="none" />
                        <circle className={`startup ${styles.plein}`} cx={x} cy={STARTUP_Y} r={5.5} />
                      </g>
                    ))}
                    {/* Descente vers le socle */}
                    <path className={`trait descente ${styles.ligne}`} d={`M${c.x} ${STARTUP_Y + 14} V ${SOCLE_Y}`} fill="none" />
                  </g>
                );
              })}

              {/* Industrie durable : un socle et trois piliers */}
              <path className={`trait socle ${styles.socle}`} d={`M40 ${SOCLE_Y} H 560`} fill="none" />
              {COLONNES.map((c, i) => (
                <text key={c.id} className={`pilier apparait ${styles.pilier}`} x={c.x} y={SOCLE_Y + 34} textAnchor="middle">
                  {PILIERS[i]}
                </text>
              ))}
            </svg>
          </figure>
        </div>
      </div>
    </section>
  );
}
