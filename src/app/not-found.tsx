import type { Metadata } from "next";
import Link from "next/link";
import { EnTetePage } from "@/components/EnTetePage";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

/** Page 404 : publiée en /404.html, servie par Apache (ErrorDocument 404). */
export default function NotFound() {
  return (
    <>
      <EnTetePage titre="Page introuvable" intro="Cette adresse n'existe pas ou a changé. Le reste du site vous attend." />
      <section className="conteneur" style={{ paddingBottom: "6rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/" className="btn">
          Retour à l'accueil
        </Link>
        <Link href="/actualites/" className="btn btn-secondaire">
          Voir les actualités
        </Link>
      </section>
    </>
  );
}
