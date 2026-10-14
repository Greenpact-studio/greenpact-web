import type { Metadata } from "next";
import { HeroPhoto } from "@/components/HeroPhoto";
import { Hero } from "@/components/accueil/Hero";
import { RecitModele } from "@/components/accueil/RecitModele";
import { Chiffres } from "@/components/accueil/Chiffres";
import { VentureStudio } from "@/components/accueil/VentureStudio";
import { Renvois } from "@/components/Renvois";
import { SITE } from "@/data/config";

export const metadata: Metadata = {
  title: "Greenpact — Entrepreneurs for a better world",
  description: SITE.description,
};

export default function Accueil() {
  return (
    <>
      <HeroPhoto />
      <Hero />
      <RecitModele />
      <Chiffres />
      <VentureStudio />
      <Renvois
        items={[
          {
            href: "/these-investissement/",
            titre: "Thèse d'investissement",
            texte: "Pourquoi et où nous investissons.",
            image: "/images/entree-these.webp",
            alt: "Lignes à haute tension au-dessus d'un champ de blé",
          },
          {
            href: "/portfolio/",
            titre: "Portfolio",
            texte: "Participations directes et startups des studios.",
            image: "/images/entree-portfolio.webp",
            alt: "Homme debout dans un atelier industriel",
          },
          {
            href: "/devenir-investisseur/",
            titre: "Devenir investisseur",
            texte: "Un double retour sur investissement : financier et à impact.",
            image: "/images/entree-investir.webp",
            alt: "Champ de blé doré surplombant un lac",
          },
        ]}
      />
    </>
  );
}
