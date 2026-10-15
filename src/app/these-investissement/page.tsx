import type { Metadata } from "next";
import Image from "next/image";
import { EnTetePage } from "@/components/EnTetePage";
import { Reveal } from "@/components/Reveal";
import { Barres } from "@/components/Barres";
import { Bascule } from "@/components/these/Bascule";
import { Convictions } from "@/components/these/Convictions";
import s from "@/components/these/Blocs.module.css";

export const metadata: Metadata = {
  title: "Thèse d'investissement",
  description:
    "Pourquoi et où Greenpact investit : l'économie réelle, les limites planétaires, la triple peine européenne, l'opportunité de la transition et de l'IA, et le venture studio.",
};

export default function Page() {
  return (
    <>
      <EnTetePage titre="Thèse d'investissement" intro="Pourquoi et où nous investissons." />

      {/* L'économie réelle pèse lourd */}
      <section className="conteneur section" style={{ paddingTop: 0 }} aria-labelledby="eco-titre">
        <Reveal className={s.deuxCol}>
          <div className={s.texte}>
            <h2 id="eco-titre">L'économie réelle pèse lourd.</h2>
            <p>Industrie, énergie, agriculture, construction : les mêmes secteurs qui font vivre la moitié du monde sont aussi ceux qui doivent le plus se transformer.</p>
            <div className={s.stats}>
              {[
                ["35 %", "du PIB mondial"],
                ["55 %", "des emplois"],
                ["60 %", "des émissions de CO₂"],
              ].map(([v, l]) => (
                <div key={l} className={s.stat}>
                  <p className={s.statValeur}>{v}</p>
                  <p className={s.statLabel}>{l}</p>
                </div>
              ))}
            </div>
            <p className="small sobre">Sources : estimations sectorielles Banque mondiale, OIT, AIE.</p>
          </div>
          <Image src="/images/these-economie-reelle.webp" alt="Vue aérienne d'une moissonneuse dans un champ" width={1600} height={1066} className={s.photo} loading="lazy" />
        </Reveal>
      </section>

      {/* Le monde a basculé */}
      <Bascule />

      {/* Triple peine pour l'Europe */}
      <section className="conteneur section" aria-labelledby="europe-titre">
        <Reveal className={`${s.deuxCol} ${s.inverse}`}>
          <div className={s.texte}>
            <h2 id="europe-titre">Triple peine pour l'Europe.</h2>
            <p>Aux limites planétaires s'ajoutent les guerres économiques et les limites sociales.</p>
            <div className={s.faits}>
              <div className={s.fait}>
                <p className={s.faitChiffre}>× 3</p>
                <p>Énergie 3 fois plus chère qu'en Chine ou aux États-Unis.</p>
              </div>
              <div className={s.fait}>
                <p className={s.faitChiffre}>100 %</p>
                <p>des besoins importés pour 10 matières stratégiques (bore, magnésium…).</p>
              </div>
              <div className={s.fait}>
                <p className={s.faitChiffre}>× 5</p>
                <p>Main-d'œuvre 5 fois plus coûteuse qu'en Asie du Sud-Est.</p>
              </div>
            </div>
            <p>
              C'est en Europe que les enjeux sont les plus cruciaux, mais c'est aussi là que résident les plus grandes opportunités : changer les règles du jeu pour retrouver compétitivité, souveraineté et résilience.
            </p>
          </div>
          <Image src="/images/these-europe.webp" alt="Intérieur d'une grande halle industrielle, ponts roulants et lumière rasante" width={1600} height={900} className={s.photo} loading="lazy" />
        </Reveal>
      </section>

      {/* Opportunité entrepreneuriale */}
      <section className="conteneur section" style={{ paddingTop: 0 }} aria-labelledby="oppo-titre">
        <Reveal>
          <div className={s.texte} style={{ maxWidth: "var(--mesure)" }}>
            <h2 id="oppo-titre">Une opportunité entrepreneuriale majeure.</h2>
            <p>Entre 2023 et 2030, les investissements dans la transition sont multipliés par 3, et les investissements en IA par 6,5. L'IA et les innovations technologiques permettent de créer de nouvelles solutions.</p>
          </div>
        </Reveal>
        <div className={s.grilleBarres} style={{ gridTemplateColumns: "1fr 1fr" }}>
          <Barres
            titre="Transition : × 3"
            max={4800}
            barres={[
              { label: "2023", valeur: 1700, affichage: "1 700 Md$" },
              { label: "2030", valeur: 4800, affichage: "4 800 Md$", fort: true },
            ]}
            note="Source : BloombergNEF."
          />
          <Barres
            titre="Intelligence artificielle : × 6,5"
            max={1811}
            barres={[
              { label: "2023", valeur: 280, affichage: "280 Md$" },
              { label: "2030", valeur: 1811, affichage: "1 811 Md$", fort: true },
            ]}
            note="Source : Grand View Research."
          />
        </div>
        <Reveal>
          <p className="lead" style={{ marginTop: "3rem" }}>
            Mais l'accès au marché des entreprises reste difficile pour une startup seule : cycles de vente longs, crédibilité à construire, comptes difficiles à pénétrer.
          </p>
        </Reveal>
      </section>

      {/* Ce que nous recherchons */}
      <section className="conteneur" style={{ paddingBottom: "var(--section)" }} aria-labelledby="cherche-titre">
        <Reveal className={s.encart}>
          <h2 id="cherche-titre" style={{ maxWidth: "18ch", color: "var(--clair)" }}>
            Ce que nous recherchons.
          </h2>
          <p className="lead" style={{ marginTop: "1.5rem" }}>
            Des innovations qui génèrent des gains économiques importants sur les marchés de la transition, et dont le déploiement à grande échelle modifie structurellement la trajectoire d'une industrie ou d'une filière.
          </p>
          <p className="sobre" style={{ marginTop: "1.25rem" }}>
            Nous visons à réinventer des secteurs où les transitions elles-mêmes créent des dynamiques, sans besoin de prime verte.
          </p>
        </Reveal>
      </section>

      {/* Domaines d'investissement */}
      <section className="conteneur" style={{ paddingBottom: "var(--section)" }} aria-labelledby="dom-titre">
        <Reveal>
          <div className={s.texte} style={{ maxWidth: "var(--mesure)" }}>
            <h2 id="dom-titre">Nos domaines d'investissement.</h2>
            <p className="lead">La question centrale : de quoi une usine, une exploitation, un chantier, une centrale dépendent-ils pour tourner, et à quel prix ?</p>
            <p>Les marchés visés sont l'industrie, l'énergie, la construction et l'agriculture, autour de quatre domaines. Les solutions viennent de l'IA, catalyseur de transition, et de la deeptech, facteur de rupture.</p>
          </div>
        </Reveal>
        <Reveal cascade as="ul" className={s.domaines}>
          {["Performance industrielle", "Transition énergétique", "Circularité et chaînes de valeur", "Résilience et adaptation"].map((d) => (
            <li key={d} className={s.domaine}>
              {d}
            </li>
          ))}
        </Reveal>
      </section>

      <Convictions />

      {/* Pourquoi le venture studio */}
      <section className="section sur-vert" aria-labelledby="vs-titre">
        <div className="conteneur">
          <Reveal>
            <div className={s.texte} style={{ maxWidth: "var(--mesure)" }}>
              <h2 id="vs-titre">Pourquoi le venture studio.</h2>
              <p className="lead">Plus de capital, moins de risque, plus rapide.</p>
            </div>
          </Reveal>
          <div className={s.grilleBarres}>
            <Barres
              inverse
              titre="Plus de capital"
              max={25}
              barres={[
                { label: "Fonds VC", valeur: 10, affichage: "10 %" },
                { label: "Studio", valeur: 25, affichage: "20 à 25 %", fort: true },
              ]}
              note="Part du capital détenue pour un même montant investi : deux fois plus, car l'investissement intervient dès la création, avant que la valeur ne soit créée."
            />
            <Barres
              inverse
              titre="Moins de risque"
              max={100}
              barres={[
                { label: "Série A atteinte", valeur: 60, affichage: "60 %", fort: true },
                { label: "Projets arrêtés avant investissement", valeur: 90, affichage: "90 %" },
              ]}
              note="Nous n'investissons que si nous avons des premiers clients. Nous tuons les dossiers avant d'investir, pas après."
            />
            <Barres
              inverse
              titre="Plus rapide"
              max={56}
              barres={[
                { label: "Seed, studio", valeur: 11, affichage: "11 mois", fort: true },
                { label: "Seed, « solo »", valeur: 36, affichage: "36 mois" },
                { label: "Série A, studio", valeur: 25, affichage: "25 mois", fort: true },
                { label: "Série A, « solo »", valeur: 56, affichage: "56 mois" },
              ]}
            />
          </div>
          <p className={`small sobre ${s.source}`}>Source : GSSN (2020), « Disrupting the Venture Landscape ».</p>
        </div>
      </section>

      {/* Approche du portefeuille */}
      <section className="conteneur section" aria-labelledby="pf-titre">
        <Reveal className={s.deuxCol}>
          <div className={s.texte}>
            <h2 id="pf-titre">Notre approche du portefeuille.</h2>
            <p>Des participations minoritaires, pour motiver les co-fondateurs et pouvoir financer les startups sur le marché.</p>
            <p>Un modèle basé sur la cession d'entreprises en croissance, avec un parcours visant 5 à 15 M€ d'ARR et l'équilibre financier.</p>
            <p>Nous ne parions pas sur d'éventuelles licornes dans nos projections.</p>
          </div>
          <Image src="/images/modele-industrie.webp" alt="Hall industriel baigné de lumière naturelle" width={1600} height={1064} className={s.photo} loading="lazy" />
        </Reveal>
      </section>
    </>
  );
}
