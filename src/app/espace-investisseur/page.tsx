import type { Metadata } from "next";
import { EnTetePage } from "@/components/EnTetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane } from "@/data/seo";
import { Reveal } from "@/components/Reveal";
import { EmailProtege } from "@/components/EmailProtege";
import { ESPACE_INVESTISSEUR, SITE } from "@/data/config";
import styles from "./espace.module.css";

export const metadata: Metadata = {
  title: "Espace investisseur",
  description: "L'espace privé des actionnaires de Greenpact : portefeuille, impact, performance, lettres et agenda, accessible sur connexion.",
  alternates: { canonical: ESPACE_INVESTISSEUR.href },
};

// Ce que contient l'espace privé (cf. README de l'application greenpact-investisseurs).
const RUBRIQUES = [
  { titre: "Vue d'ensemble", texte: "La lettre des dirigeants, les chiffres clés et les faits marquants." },
  { titre: "Portefeuille", texte: "Le stade de développement et la fiche détaillée de chaque participation." },
  { titre: "Impact", texte: "Les indicateurs d'impact par famille, avec leur niveau de preuve." },
  { titre: "Performance", texte: "La valeur du portefeuille, ligne par ligne, et son évolution." },
  { titre: "Lettres et agenda", texte: "La lettre aux actionnaires, les lectures et les prochains rendez-vous." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={filAriane(ESPACE_INVESTISSEUR.href)} />
      <EnTetePage titre="Espace investisseur" intro="L'espace privé des Greenpacters, les actionnaires de Greenpact." />

      <section className="conteneur" style={{ paddingBottom: "var(--section)" }} aria-labelledby="connexion-titre">
        <div className={styles.grille}>
          <Reveal className={`sur-vert ${styles.connexion}`}>
            <span className={styles.cadenas} aria-hidden>
              <svg viewBox="0 0 16 16" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <rect x="3" y="7" width="10" height="7" rx="1.5" />
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
            </span>
            <h2 id="connexion-titre">Accéder à mon espace</h2>
            <p className="lead">Connectez-vous avec l&apos;adresse e-mail que vous avez communiquée à Greenpact.</p>
            <a href={ESPACE_INVESTISSEUR.connexion} target="_blank" rel="noopener noreferrer" className={`btn ${styles.bouton}`}>
              Se connecter ↗
            </a>
            <p className={`small ${styles.aide}`}>
              Pas encore d&apos;accès, ou une difficulté pour vous connecter ? Écrivez à <EmailProtege email={SITE.contact.email} className="lien" />.
            </p>
          </Reveal>

          <div className={styles.contenu}>
            <h2 className={styles.titreContenu}>Ce que vous y trouvez</h2>
            <Reveal cascade as="ul" className={styles.rubriques} y={16}>
              {RUBRIQUES.map((r) => (
                <li key={r.titre} className={styles.rubrique}>
                  <span className={styles.rubriqueTitre}>{r.titre}</span>
                  <span className={styles.rubriqueTexte}>{r.texte}</span>
                </li>
              ))}
            </Reveal>
            <p className="small sobre" style={{ marginTop: "1.5rem" }}>
              Les informations de l&apos;espace investisseur sont confidentielles et réservées aux actionnaires de Greenpact.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
