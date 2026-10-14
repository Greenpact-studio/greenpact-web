import { EmailProtegeClient } from "./EmailProtegeClient";

/**
 * Protection anti-spam : l'adresse n'apparaît jamais en clair dans le HTML
 * généré ni dans les données transmises au navigateur. Elle est encodée ici
 * (côté serveur, au build) et reconstituée côté client au montage.
 */
export function EmailProtege({
  email,
  className,
  sujet,
  children,
}: {
  email: string;
  className?: string;
  sujet?: string;
  children?: React.ReactNode;
}) {
  const code = Buffer.from(email.split("").reverse().join(""), "utf8").toString("base64");
  const [user, domaine] = email.split("@");
  const affichage = `${user} [at] ${domaine.replace(/\./g, " [point] ")}`;
  return (
    <EmailProtegeClient code={code} affichage={affichage} className={className} sujet={sujet}>
      {children}
    </EmailProtegeClient>
  );
}
