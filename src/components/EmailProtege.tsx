"use client";

import { useEffect, useState } from "react";

/**
 * Protection anti-spam : l'adresse n'apparaît pas en clair dans le HTML
 * généré ; elle est assemblée côté client.
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
  const [href, setHref] = useState<string | undefined>(undefined);
  const [texte, setTexte] = useState<string>("");
  const [user, domaine] = email.split("@");

  useEffect(() => {
    const adresse = `${user}@${domaine}`;
    setTexte(adresse);
    setHref(`mailto:${adresse}${sujet ? `?subject=${encodeURIComponent(sujet)}` : ""}`);
  }, [user, domaine, sujet]);

  return (
    <a href={href} className={className}>
      {children ?? (texte || `${user} [at] ${domaine}`)}
    </a>
  );
}
