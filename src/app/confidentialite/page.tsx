import type { Metadata } from "next";
import { PageLegale } from "@/components/legal/PageLegale";
import { SOCIETE, MISE_A_JOUR_LEGAL } from "@/data/legal";
import { EmailProtege } from "@/components/EmailProtege";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Données personnelles traitées par Greenpact, finalités, durées de conservation et droits.",
  alternates: { canonical: "/confidentialite/" },
};

export default function Page() {
  const email = <EmailProtege email={SOCIETE.email} className="lien" />;
  return (
    <PageLegale
      titre="Politique de confidentialité"
      intro="Les données que nous traitons, pourquoi, combien de temps, et comment exercer vos droits."
      miseAJour={MISE_A_JOUR_LEGAL}
    >
      <h2>Responsable du traitement</h2>
      <p>
        {SOCIETE.denomination}, {SOCIETE.forme}, {SOCIETE.siege}, {SOCIETE.rcs}. Contact pour toute question relative à vos données : {email}.
      </p>

      <h2>Données traitées</h2>
      <h3>Site public</h3>
      <p>
        La consultation du site public ne nécessite aucune donnée personnelle. Aucun outil de mesure d&apos;audience, de publicité ou de suivi n&apos;est utilisé. L&apos;hébergeur conserve des journaux techniques (adresse IP, date, page demandée) pour la sécurité du service. Si vous nous écrivez par e-mail, nous utilisons votre adresse et le contenu de votre message pour vous répondre.
      </p>
      <h3>Espace investisseur</h3>
      <ul>
        <li>
          <strong>Adresse e-mail et nom</strong> des actionnaires autorisés : contrôle d&apos;accès et envoi du lien de connexion. Base légale : exécution des relations avec nos actionnaires.
        </li>
        <li>
          <strong>Documents personnels</strong> (attestations, rapports de performance) : mise à disposition de l&apos;information due à chaque actionnaire. Base légale : obligations légales et relation contractuelle.
        </li>
        <li>
          <strong>Questions posées</strong> depuis l&apos;espace et nos réponses : suivi de la relation avec les actionnaires. Une question n&apos;est publiée dans la foire aux questions qu&apos;anonymisée et avec votre accord. Base légale : intérêt légitime.
        </li>
        <li>
          <strong>Données de connexion</strong> (date de connexion, jeton de session) : sécurité de l&apos;espace. Base légale : intérêt légitime.
        </li>
      </ul>
      <h3>Lettres d&apos;information</h3>
      <p>
        Adresse e-mail et nom des destinataires de nos lettres aux actionnaires et partenaires. Base légale : intérêt légitime pour les actionnaires et les contacts professionnels, consentement pour les autres. Chaque lettre comporte un lien de désinscription.
      </p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Accès à l&apos;espace investisseur et documents personnels : tant que vous êtes actionnaire. L&apos;accès est fermé et les documents personnels supprimés dans les 3 mois suivant la cession de la totalité de vos titres.</li>
        <li>Questions et réponses : 1 an après la dernière question.</li>
        <li>Lettres d&apos;information : jusqu&apos;à votre désinscription.</li>
        <li>Échanges par e-mail : 1 an après le dernier échange, sauf relation en cours.</li>
        <li>Journaux techniques : 12 mois au plus.</li>
      </ul>

      <h2>Destinataires et sous-traitants</h2>
      <p>Vos données ne sont ni vendues ni louées. Elles sont accessibles à l&apos;équipe de Greenpact et à nos sous-traitants, chacun pour sa seule mission :</p>
      <ul>
        <li>OVH SAS (France) : hébergement du site.</li>
        <li>Supabase Inc. : hébergement de l&apos;espace investisseur, serveurs situés en {SOCIETE.regionSupabase}.</li>
        <li>Google (Google Workspace) : messagerie et notification des questions posées.</li>
        <li>Mailjet (France) : envoi des lettres d&apos;information.</li>
      </ul>
      <p>
        Lorsque des données sont accessibles depuis un pays hors de l&apos;Union européenne, le transfert est encadré par une décision d&apos;adéquation de la Commission européenne ou par les clauses contractuelles types qu&apos;elle a adoptées.
      </p>

      <h2>Cookies et stockage local</h2>
      <p>
        Le site public ne dépose aucun cookie. L&apos;espace investisseur enregistre dans votre navigateur votre session de connexion et une préférence d&apos;affichage. Ces éléments sont strictement nécessaires au service : ils ne requièrent pas de consentement et ne servent à aucun suivi.
      </p>

      <h2>Sécurité</h2>
      <p>
        Connexion chiffrée (HTTPS), accès à l&apos;espace investisseur par lien de connexion à usage unique, réservé aux adresses autorisées, et règles d&apos;accès limitant chaque actionnaire à ses propres documents.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos données, ainsi que du droit de définir des directives sur leur sort après votre décès. Écrivez-nous à {email}. Nous répondons sous un mois.
      </p>
      <p>
        Vous pouvez aussi adresser une réclamation à la CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 (
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          cnil.fr
        </a>
        ).
      </p>
    </PageLegale>
  );
}
