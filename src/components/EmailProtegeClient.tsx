"use client";

import { useEffect, useState } from "react";

/** Décode ce que `EmailProtege` (serveur) a encodé : base64 de l'adresse inversée. */
function decoder(code: string): string {
  return atob(code).split("").reverse().join("");
}

export function EmailProtegeClient({
  code,
  affichage,
  className,
  sujet,
  children,
}: {
  code: string;
  affichage: string;
  className?: string;
  sujet?: string;
  children?: React.ReactNode;
}) {
  const [href, setHref] = useState<string | undefined>(undefined);
  const [texte, setTexte] = useState<string>(affichage);

  useEffect(() => {
    const adresse = decoder(code);
    setTexte(adresse);
    setHref(`mailto:${adresse}${sujet ? `?subject=${encodeURIComponent(sujet)}` : ""}`);
  }, [code, sujet]);

  return (
    <a href={href} className={className}>
      {children ?? texte}
    </a>
  );
}
