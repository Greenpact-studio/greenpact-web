import type { Metadata } from "next";
import Link from "next/link";
import { PageLegale } from "@/components/legal/PageLegale";
import { SOCIETE, HEBERGEUR, MISE_A_JOUR_LEGAL } from "@/data/legal";
import { MENTIONS_REGLEMENTAIRES } from "@/data/config";
import { EmailProtege } from "@/components/EmailProtege";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur et informations légales du site greenpact.fr.",
  alternates: { canonical: "/mentions-legales/" },
};

export default function Page() {
  return (
    <PageLegale titre="Mentions légales" miseAJour={MISE_A_JOUR_LEGAL}>
      <h2>Éditeur du site</h2>
      <dl>
        <dt>Dénomination</dt>
        <dd>{SOCIETE.denomination}</dd>
        <dt>Forme</dt>
        <dd>{SOCIETE.forme}</dd>
        <dt>Capital social</dt>
        <dd>{SOCIETE.capital}</dd>
        <dt>Siège social</dt>
        <dd>{SOCIETE.siege}</dd>
        <dt>Immatriculation</dt>
        <dd>{SOCIETE.rcs}</dd>
        <dt>TVA intracommunautaire</dt>
        <dd>{SOCIETE.tva}</dd>
        <dt>Présidente</dt>
        <dd>{SOCIETE.president}</dd>
        <dt>Contact</dt>
        <dd>
          <EmailProtege email={SOCIETE.email} className="lien" /> · {SOCIETE.telephone}
        </dd>
      </dl>

      <h2>Directeur de la publication</h2>
      <p>{SOCIETE.directeurPublication}.</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par {HEBERGEUR.nom}, {HEBERGEUR.adresse} (
        <a href={HEBERGEUR.site} target="_blank" rel="noopener noreferrer">
          ovhcloud.com
        </a>
        ).
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, graphismes, logos et éléments du site sont la propriété de Greenpact ou de ses partenaires. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite. Les logos des participations sont la propriété de leurs titulaires respectifs.
      </p>
      <p>Les photographies proviennent d&apos;Unsplash et sont utilisées selon la licence Unsplash.</p>

      <h2>Avertissement</h2>
      <p>{MENTIONS_REGLEMENTAIRES}</p>
      <p>
        Conformément à ses statuts, Greenpact ne procède à aucune offre au public de ses titres. Les éventuelles offres sont réservées à des investisseurs qualifiés ou à un cercle restreint d&apos;investisseurs.
      </p>

      <h2>Données personnelles et cookies</h2>
      <p>
        Le traitement des données personnelles est décrit dans la <Link href="/confidentialite/">politique de confidentialité</Link>. Le site public ne dépose aucun cookie de mesure d&apos;audience ni de publicité.
      </p>
    </PageLegale>
  );
}
