import type { Metadata } from "next";
import Image from "next/image";
import { EnTetePage } from "@/components/EnTetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane, FAQ, FAQ_JSONLD } from "@/data/seo";
import { Reveal } from "@/components/Reveal";
import { EmailProtege } from "@/components/EmailProtege";
import { Diversification } from "@/components/investir/Diversification";
import { SITE, MENTIONS_REGLEMENTAIRES } from "@/data/config";
import styles from "./investir.module.css";

export const metadata: Metadata = {
  title: "Devenir investisseur dans une holding à impact",
  description: "Un double retour sur investissement : financier et à impact. Rejoindre les Greenpacters, actionnaires d'une holding d'investissement evergreen.",
  alternates: { canonical: "/devenir-investisseur/" },
};

// Éléments qualitatifs uniquement (cf. spec 8.6 et 8.8 : aucune donnée financière confidentielle).
const RAISONS = [
  {
    titre: "Une plateforme de lancement qui a fait ses preuves",
    texte: "Cinq ans d'existence, un modèle rodé : des projets nés de besoins industriels, financés et accompagnés jusqu'à leurs premiers clients.",
  },
  {
    titre: "18 participations lancées, pour un seul échec",
    texte: "Une sélection en amont par le marché et un accompagnement opérationnel qui réduisent le risque d'exécution.",
  },
  {
    titre: "Des venture studios matures",
    texte: "Hoji Ventures et 4Elements délivrent 4 à 6 nouvelles entreprises par an, avec des équipes et des processus en place.",
  },
  {
    titre: "Un réseau de 300 entreprises partenaires et 50 labos R&D",
    texte: "Des industriels qui expriment les besoins, testent les solutions et deviennent les premiers clients ; des laboratoires qui apportent la technologie.",
  },
  {
    titre: "Un actionnariat engagé",
    texte: "Des entrepreneurs, des dirigeants et des family offices qui s'engagent activement aux côtés des startups : réseau, expertise, premiers contrats.",
  },
];

const ATTRIBUTS = [
  { nom: "Nature", valeur: "Holding d'investissement evergreen : le capital reste investi et réinvesti dans la durée." },
  { nom: "Point d'entrée", valeur: "Le point d'entrée naturel pour un premier ticket dans l'écosystème des studios." },
  { nom: "Spectre", valeur: "Large : deeptech, IA, participations directes dans les meilleures startups des studios." },
  { nom: "Diversification", valeur: "Une exposition répartie sur 25 à 30 participations cibles." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={filAriane("/devenir-investisseur/")} />
      <EnTetePage titre="Devenir investisseur" intro="Un double retour sur investissement : financier et à impact." />

      {/* Pourquoi nous rejoindre */}
      <section className="conteneur section" style={{ paddingTop: 0 }} aria-labelledby="pourquoi-titre">
        <div className={styles.pourquoi}>
          <div className={styles.pourquoiTexte}>
            <h2 id="pourquoi-titre">Pourquoi nous rejoindre</h2>
            <p className="sobre">
              Les Greenpacters sont des entrepreneurs, des dirigeants et des family offices qui investissent dans la transformation durable des entreprises, et s'y impliquent.
            </p>
          </div>
          <Reveal cascade as="ol" className={styles.raisons} y={20}>
            {RAISONS.map((r, i) => (
              <li key={r.titre} className={styles.raison}>
                <span className={styles.numero} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className={styles.raisonTitre}>{r.titre}</span>
                  <p>{r.texte}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Le véhicule */}
      <section className="sur-vert section" aria-labelledby="vehicule-titre">
        <div className={`conteneur ${styles.vehicule}`}>
          <div className={styles.vehiculeTexte}>
            <h2 id="vehicule-titre">Le véhicule</h2>
            <p className="lead">
              Greenpact est une holding d'investissement evergreen : le point d'entrée naturel pour un premier ticket, avec un spectre d'investissement large et une diversification sur 25 à 30 participations cibles.
            </p>
            <dl className={styles.attributs}>
              {ATTRIBUTS.map((a) => (
                <div key={a.nom} className={styles.attribut}>
                  <dt>{a.nom}</dt>
                  <dd>{a.valeur}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Diversification />
        </div>
      </section>

      {/* Contact */}
      <section className={`sur-photo ${styles.contact}`} aria-labelledby="contact-titre">
        <Image src="/images/investir-cta.webp" alt="" width={2400} height={1600} className={styles.contactPhoto} loading="lazy" />
        <span className={styles.contactVoile} aria-hidden />
        <div className="conteneur">
          <h2 id="contact-titre" className={styles.contactTitre}>
            Rejoindre les Greenpacters
          </h2>
          <Reveal className={styles.carte}>
            <Image src="/team/laurent-geray.jpg" alt="Laurent Geray" width={240} height={240} className={styles.portrait} loading="lazy" />
            <div className={styles.carteTexte}>
              <p className={styles.carteNom}>Laurent Geray</p>
              <p className={styles.carteRole}>CEO Greenpact</p>
              <p>
                Un échange de trente minutes suffit pour comprendre le modèle, le portefeuille et les modalités pour rejoindre l'actionnariat.
              </p>
              <EmailProtege email={SITE.contact.email} className={`lien ${styles.carteEmail}`} />
              <div className={styles.carteBoutons}>
                <a href={SITE.contact.rendezVous} target="_blank" rel="noopener noreferrer" className="btn">
                  Prendre rendez-vous ↗
                </a>
                <EmailProtege email={SITE.contact.email} sujet="Demande deck Greenpact" className="btn btn-secondaire">
                  Demander le deck complet
                </EmailProtege>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Questions fréquentes (balisées FAQPage pour les moteurs de recherche et les assistants IA) */}
      <section className={`conteneur section ${styles.faq}`} aria-labelledby="faq-titre">
        <JsonLd data={FAQ_JSONLD} />
        <h2 id="faq-titre">Questions fréquentes</h2>
        <div className={styles.faqListe}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary>{f.q}</summary>
              <p>{f.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Mentions réglementaires (identiques au pied de page) */}
      <section className={`conteneur ${styles.mentions}`} aria-labelledby="mentions-titre">
        <h2 id="mentions-titre">Mentions réglementaires</h2>
        <p>{MENTIONS_REGLEMENTAIRES}</p>
      </section>
    </>
  );
}
