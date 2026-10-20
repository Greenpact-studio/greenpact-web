import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/data/config";
import { Reveal } from "@/components/Reveal";
import s from "./bluefins.module.css";

export const metadata: Metadata = {
  title: "Bluefins : la houle comme moteur",
  description:
    "Bluefins, startup brestoise du portefeuille Greenpact, développe WaveDrive : un hydrofoil biomimétique, inspiré de la nageoire des baleines, qui transforme la houle en poussée pour réduire la consommation des navires.",
  alternates: { canonical: "/these-impact/bluefins/" },
  openGraph: { images: ["/images/bluefins-infographie.webp"] },
};

const filAriane = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE.url}/` },
    { "@type": "ListItem", position: 2, name: "Thèse d'impact", item: `${SITE.url}/these-impact/` },
    { "@type": "ListItem", position: 3, name: "Bluefins", item: `${SITE.url}/these-impact/bluefins/` },
  ],
};

// Uniquement des informations publiques : presse, Ifremer, Bureau Veritas, registre du commerce.
const MECANISME = [
  { titre: "Le navire tangue", texte: "En mer, la houle fait monter et descendre la poupe du navire, en permanence." },
  { titre: "La nageoire bat", texte: "Un hydrofoil articulé, fixé à l'arrière par des bras mécaniques, suit ce mouvement comme la nageoire caudale d'une baleine." },
  { titre: "La houle pousse", texte: "Le battement produit une poussée horizontale qui s'ajoute à celle du moteur, sans aucune source d'énergie extérieure." },
];

const ETAPES = [
  { date: "2021", titre: "Création à Brest", texte: "Fondée par Olivier Giusti, à partir d'un concept développé avec l'Ifremer." },
  { date: "2025", titre: "Premiers essais en mer", texte: "Démonstrateur installé sur le TSM Alizé, navire de service d'environ 45 mètres, en rade de Brest puis en mer d'Iroise." },
  { date: "2026", titre: "Approbation de principe", texte: "Bureau Veritas délivre une Approval in Principle à WaveDrive, après revue de la conception mécanique, hydraulique et électrique." },
  { date: "Prochaine étape", titre: "Les navires commerciaux", texte: "Ingénierie détaillée et intégration à bord des premiers navires de commerce, en vue d'un déploiement.", avenir: true },
];

export default function Page() {
  return (
    <>
      <JsonLd data={filAriane} />

      <section className={`conteneur ${s.entete}`}>
        <nav aria-label="Fil d'Ariane" className={`small ${s.ariane}`}>
          <Link href="/these-impact/" className="lien">
            Thèse d&apos;impact
          </Link>
          <span aria-hidden> / </span>
          <span>Bluefins</span>
        </nav>
        <Image src="/logos/bluefins.png" alt="Bluefins" width={356} height={118} className={s.logo} priority />
        <h1 className="display">La houle comme moteur.</h1>
        <p className={`lead ${s.intro}`}>
          Bluefins équipe les navires d&apos;une nageoire inspirée des baleines. Elle transforme l&apos;énergie des vagues en poussée, et réduit d&apos;autant le carburant brûlé.
        </p>
      </section>

      {/* Ce que fait Bluefins, en vidéo */}
      <section className="conteneur" aria-labelledby="bf-quoi">
        <Reveal className={s.deuxCol}>
          <div className={s.texte}>
            <h2 id="bf-quoi">Ce que fait Bluefins.</h2>
            <p>
              Le transport maritime achemine l&apos;essentiel des marchandises échangées dans le monde, et presque tous les navires brûlent encore du fioul. Les rendre plus sobres sans attendre une nouvelle flotte est l&apos;un des leviers les plus rapides de la décarbonation.
            </p>
            <p>
              Bluefins, startup brestoise, développe WaveDrive : un système d&apos;assistance à la propulsion qui se monte à l&apos;arrière d&apos;un navire, neuf ou existant. Il récupère une énergie gratuite et inépuisable, celle de la houle.
            </p>
          </div>
          <div className={s.video}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/0VtHQKoBJ_g?rel=0"
              title="Bluefins en vidéo"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>

      {/* Le mécanisme */}
      <section className={`section ${s.fond}`} aria-labelledby="bf-mecanisme">
        <div className={`conteneur ${s.deuxCol} ${s.haut}`}>
          <figure className={s.infographie}>
            <Image src="/images/bluefins-infographie.webp" alt="Infographie : un hydrofoil articulé fixé à l'arrière du navire TSM Alizé par un châssis et des vérins ; l'énergie de la houle est transmise au navire." width={1283} height={1514} loading="lazy" />
            <figcaption className="small sobre">Infographie Le Parisien, 27 février 2025. Source : Bluefins.</figcaption>
          </figure>
          <div className={s.texte}>
            <h2 id="bf-mecanisme">Le mécanisme.</h2>
            <p>Un principe biomimétique : la nageoire caudale des baleines, qui propulse des animaux de plusieurs dizaines de tonnes avec une efficacité remarquable.</p>
            <Reveal cascade as="ol" className={s.mecanisme} y={16}>
              {MECANISME.map((m, i) => (
                <li key={m.titre}>
                  <span className={s.numero}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{m.titre}</h3>
                    <p className="small">{m.texte}</p>
                  </div>
                </li>
              ))}
            </Reveal>
            <p className="small sobre">Plus la mer est formée, plus la nageoire travaille : le système tire parti des conditions qui, d&apos;ordinaire, font consommer davantage.</p>
          </div>
        </div>
      </section>

      {/* L'impact écologique */}
      <section className="section sur-vert" aria-labelledby="bf-impact">
        <div className={`conteneur ${s.deuxCol}`}>
          <div className={s.texte}>
            <h2 id="bf-impact">L&apos;impact écologique.</h2>
            <p>
              Le transport maritime pèse environ 3 % des émissions mondiales de gaz à effet de serre. L&apos;Organisation maritime internationale vise la neutralité carbone du secteur vers 2050 : chaque tonne de carburant économisée compte, dès aujourd&apos;hui.
            </p>
            <p>Moins de carburant, c&apos;est aussi moins d&apos;oxydes de soufre et d&apos;azote rejetés en mer, et des coûts d&apos;exploitation plus bas pour les armateurs.</p>
          </div>
          <div className={s.chiffre}>
            <span className={s.chiffreValeur}>−20 %</span>
            <span className={s.chiffreLibelle}>de carburant et de CO₂ en moyenne par navire équipé</span>
            <span className="small sobre">Économie moyenne annoncée par Bluefins, d&apos;après ses simulations et ses essais en bassin.</span>
          </div>
        </div>
      </section>

      {/* L'équipe */}
      <section className="conteneur section" style={{ paddingBottom: 0 }} aria-labelledby="bf-equipe">
        <Reveal className={`${s.deuxCol} ${s.equipe}`}>
          <figure>
            <Image src="/images/bluefins-equipe.webp" alt="L'équipe de Bluefins réunie dans ses locaux" width={1000} height={668} className={s.photo} loading="lazy" />
            <figcaption className="small sobre">L&apos;équipe de Bluefins.</figcaption>
          </figure>
          <div className={s.texte}>
            <h2 id="bf-equipe">L&apos;équipe.</h2>
            <p>Une équipe d&apos;ingénieurs basée à Brest, au cœur de l&apos;écosystème maritime breton, qui réunit hydrodynamique, mécanique et architecture navale.</p>
            <ul className={s.dirigeants}>
              <li>
                <span className={s.nom}>Olivier Giusti</span>
                <span className="small sobre">Cofondateur, président et directeur technique. Architecte naval et ingénieur hydrodynamicien, quinze ans d&apos;industrie offshore.</span>
              </li>
              <li>
                <span className={s.nom}>Philippe Ruffin</span>
                <span className="small sobre">Directeur général.</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Prochaines étapes */}
      <section className={`section ${s.fond}`} aria-labelledby="bf-etapes">
        <div className="conteneur">
          <h2 id="bf-etapes">Les étapes.</h2>
          <Reveal cascade as="ol" className={s.etapes} y={20}>
            {ETAPES.map((e) => (
              <li key={e.titre} className={e.avenir ? s.avenir : undefined}>
                <span className={s.date}>{e.date}</span>
                <h3>{e.titre}</h3>
                <p className="small">{e.texte}</p>
              </li>
            ))}
          </Reveal>
          <div className={s.liens}>
            <Link href="/these-impact/" className="btn">
              ← Retour à la thèse d&apos;impact
            </Link>
            <a href="https://bluefins-systems.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondaire">
              Le site de Bluefins ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
