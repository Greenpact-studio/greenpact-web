import type { Metadata } from "next";
import Link from "next/link";
import { PageLegale } from "@/components/legal/PageLegale";
import { SOCIETE, MISE_A_JOUR_LEGAL } from "@/data/legal";
import { EmailProtege } from "@/components/EmailProtege";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation de l'espace investisseur",
  description: "Règles d'accès et d'usage de l'espace réservé aux actionnaires de Greenpact.",
  alternates: { canonical: "/conditions-utilisation/" },
};

export default function Page() {
  return (
    <PageLegale
      titre="Conditions générales d'utilisation"
      intro="Règles d'accès et d'usage de l'espace investisseur, réservé aux actionnaires de Greenpact."
      miseAJour={MISE_A_JOUR_LEGAL}
    >
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions encadrent l&apos;utilisation de l&apos;espace investisseur accessible à l&apos;adresse <a href="/actionnaires/">www.greenpact.fr/actionnaires/</a>, édité par {SOCIETE.denomination} ({SOCIETE.rcs}). Se connecter à l&apos;espace vaut acceptation de ces conditions.
      </p>

      <h2>2. Accès</h2>
      <p>
        L&apos;espace est réservé aux actionnaires de Greenpact et aux personnes expressément autorisées par Greenpact. L&apos;accès se fait par un lien de connexion personnel envoyé à l&apos;adresse e-mail autorisée. Ce lien et la session qui en découle sont strictement personnels : vous vous engagez à ne pas les transmettre et à nous prévenir sans délai de tout usage non autorisé.
      </p>
      <p>Greenpact peut suspendre ou retirer un accès, notamment lorsque la personne n&apos;est plus actionnaire ou en cas de manquement aux présentes conditions.</p>

      <h2>3. Confidentialité</h2>
      <p>
        Les informations de l&apos;espace (valorisations, données financières, informations sur les participations, lettres, documents) sont confidentielles. Elles vous sont communiquées en votre qualité d&apos;actionnaire et ne doivent être ni diffusées, ni reproduites, ni communiquées à des tiers, à l&apos;exception de vos conseils tenus au secret professionnel.
      </p>

      <h2>4. Nature des informations</h2>
      <p>
        Les informations sont fournies à titre indicatif. Elles ne constituent ni un conseil en investissement, ni une recommandation, ni une offre ou sollicitation d&apos;achat ou de vente de titres. Les valorisations, prévisions et objectifs, notamment de prix de la part, sont des estimations sans garantie. Les performances passées ne préjugent pas des performances futures.
      </p>
      <p>
        Un investissement dans Greenpact comporte un risque de perte en capital, limité au montant investi, et une liquidité réduite. Greenpact ne procède à aucune offre au public de ses titres.
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        Greenpact s&apos;efforce de tenir l&apos;espace exact et à jour, sans pouvoir garantir l&apos;absence d&apos;erreur ou d&apos;interruption. Seuls les documents officiels (procès-verbaux, rapports, attestations signées) font foi. Greenpact n&apos;est pas responsable des décisions prises sur la seule base des informations de l&apos;espace.
      </p>

      <h2>6. Questions posées depuis l&apos;espace</h2>
      <p>
        Vos questions sont adressées à l&apos;équipe de Greenpact, qui y répond dans l&apos;espace. Avec votre accord, une question peut être reprise, reformulée et anonymisée dans la foire aux questions visible par les autres actionnaires.
      </p>

      <h2>7. Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans la <Link href="/confidentialite/">politique de confidentialité</Link>.
      </p>

      <h2>8. Propriété intellectuelle</h2>
      <p>Les contenus de l&apos;espace sont la propriété de Greenpact ou de ses participations et ne peuvent être réutilisés sans autorisation écrite.</p>

      <h2>9. Modification</h2>
      <p>Greenpact peut modifier ces conditions. La version en vigueur est celle publiée sur cette page, avec sa date de mise à jour.</p>

      <h2>10. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit français. Tout litige relève des tribunaux compétents du ressort de la cour d&apos;appel de Lyon. Contact : <EmailProtege email={SOCIETE.email} className="lien" />.
      </p>
    </PageLegale>
  );
}
