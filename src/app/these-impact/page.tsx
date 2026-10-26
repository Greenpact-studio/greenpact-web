import type { Metadata } from "next";
import Image from "next/image";
import { EnTetePage } from "@/components/EnTetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane } from "@/data/seo";
import { Reveal } from "@/components/Reveal";
import { CycleImpact } from "@/components/impact/CycleImpact";
import { Resultats } from "@/components/impact/Resultats";
import { Systemique } from "@/components/impact/Systemique";
import { FlechePrincipes } from "@/components/impact/FlechePrincipes";
import s from "@/components/these/Blocs.module.css";

export const metadata: Metadata = {
  title: "Thèse d'impact",
  description:
    "Impact by design : fonds Article 9, carried conditionné à l'impact, trois objectifs pilotés, un cycle de l'idée au reporting, et ce que les startups changent déjà chez des industriels.",
  alternates: { canonical: "/these-impact/" },
};

const OBJECTIFS = [
  { titre: "Environnement", texte: "Contribuer au respect des limites planétaires et réduire les externalités : CO₂, déchets, consommation d'eau, de ressources, d'énergie décarbonée, biodiversité, pollutions, risques environnementaux." },
  { titre: "Souveraineté", texte: "Libérer l'Europe de ses dépendances : importations de matières critiques, risques géopolitiques, sécurité d'approvisionnement." },
  { titre: "Social", texte: "Renforcer l'emploi et la cohésion territoriale : emplois, ancrage territorial, relocalisation." },
];

const PRINCIPES = [
  { titre: "Intentionnalité", texte: "L'impact est la finalité du business model, pas un effet de bord." },
  { titre: "Additionnalité", texte: "Ce qui n'aurait pas eu lieu si la startup n'existait pas." },
  { titre: "Mesurabilité", texte: "Des KPI liés à l'activité, suivis dans la durée." },
  { titre: "Effets rebonds", texte: "Les externalités négatives sont identifiées et suivies." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={filAriane("/these-impact/")} />
      <EnTetePage titre="Thèse d'impact" intro="Démarche et résultats d'impact." />

      {/* Impact by design */}
      <section className="conteneur section" style={{ paddingTop: 0 }} aria-labelledby="ibd-titre">
        <Reveal className={s.deuxCol}>
          <div className={s.texte}>
            <h2 id="ibd-titre">Impact by design.</h2>
            <p>Les studios sont des fonds Article 9 SFDR, le plus haut niveau d'exigence en matière d'impact. 50 % du carried des studios est conditionné à l'impact et reversé à des ONG si les objectifs ne sont pas atteints.</p>
            <p>La démarche est déclinée dans chaque startup, et une gouvernance impact indépendante (comité impact) l'encadre.</p>
            <blockquote className={s.conviction}>
              <span className={s.convictionLabel}>Notre conviction</span>
              <p>Nous croyons en la force de l'investissement à impact, car la rentabilité viendra de la création de valeur durable.</p>
            </blockquote>
          </div>
          <Image src="/images/impact-paysage.webp" alt="Lever du soleil sur une rivière sinueuse et des champs" width={1600} height={1067} className={`${s.photo} ${s.photoHaute}`} loading="lazy" />
        </Reveal>
      </section>

      {/* Trois objectifs */}
      <section className="conteneur" style={{ paddingBottom: "var(--section)" }} aria-labelledby="obj-titre">
        <Reveal>
          <h2 id="obj-titre">Trois objectifs pilotés.</h2>
        </Reveal>
        <Reveal cascade as="ul" className={s.grilleBarres}>
          {OBJECTIFS.map((o) => (
            <li key={o.titre} className={s.domaine} style={{ fontWeight: 300 }}>
              <h3 style={{ marginBottom: "0.75rem" }}>{o.titre}</h3>
              <p className="small">{o.texte}</p>
            </li>
          ))}
        </Reveal>
      </section>

      <CycleImpact />

      {/* Quatre principes */}
      <section className="conteneur section" aria-labelledby="pr-titre">
        <Reveal>
          <h2 id="pr-titre">Quatre principes d'analyse.</h2>
        </Reveal>
        <Reveal cascade as="ul" className={s.domaines}>
          {PRINCIPES.map((p) => (
            <li key={p.titre} className={s.domaine} style={{ fontWeight: 300 }}>
              <h3 style={{ marginBottom: "0.75rem", fontSize: "var(--t-h3)" }}>{p.titre}</h3>
              <p className="small">{p.texte}</p>
            </li>
          ))}
        </Reveal>
        <FlechePrincipes />
      </section>

      <Resultats />

      <Systemique />
    </>
  );
}
