// Résultats d'impact mesurés : seules les startups dont le résultat est constaté
// chez des clients figurent ici (aujourd'hui Bluefins et Sapiologie).
// `ancre` renvoie vers la carte de la startup sur la page Portfolio.

export type ResultatMesure = {
  startup: string;
  theme: string;
  chiffre: string;
  libelle: string;
  preuve: string;
  image: string; // fichier dans /public/images/
  alt: string;
  ancre: string; // id de la carte sur /portfolio/
};

export const RESULTATS_MESURES: ResultatMesure[] = [
  {
    startup: "Bluefins",
    theme: "Décarboner le transport maritime",
    chiffre: "−20 %",
    libelle: "de carburant et de CO₂ par navire équipé",
    preuve: "Essais en mer de mars 2026 : gains à deux chiffres, validés par Bureau Veritas.",
    image: "portfolio-bluefins.webp",
    alt: "Porte-conteneurs en mer au lever du jour",
    ancre: "bluefins",
  },
  {
    startup: "Sapiologie",
    theme: "Éco-concevoir tout un catalogue",
    chiffre: "−25 %",
    libelle: "de CO₂ sur les produits éco-conçus",
    preuve: "Des milliers d'analyses de cycle de vie générées en une journée chez Radiall ; contrat signé avec Hermès.",
    // TODO : remplacer par une capture du logiciel Sapiologie (WebP 1600 px, même nom de fichier).
    image: "impact-sapiologie.webp",
    alt: "Logiciel Sapiologie",
    ancre: "sapiologie",
  },
];

export const LEVIERS_SYSTEMIQUES = [
  { niveau: "Entreprise", effet: "Effet solutions", texte: "Générer des bénéfices sur toutes les dimensions clés.", exemple: "Bluefins : −20 % d'économies et de CO₂." },
  { niveau: "Dirigeants", effet: "Effet d'entraînement", texte: "Inspirer et engager les dirigeants.", exemple: "Kick Day : un jour en entreprise pour démarrer." },
  { niveau: "Clients et fournisseurs", effet: "Effet domino", texte: "Impacter les parties prenantes.", exemple: "Sapiologie : interfaçage avec clients et fournisseurs." },
  { niveau: "Filière", effet: "Effet de bascule", texte: "Débloquer un seuil ou une contrainte.", exemple: "Nepsis rend finançables des projets de moins de 2 M€." },
  { niveau: "Industrie", effet: "Effet plateforme", texte: "Mutualiser problèmes, moyens et solutions entre industriels.", exemple: "Forge : des agents IA qui compilent nos apprentissages." },
  { niveau: "Communauté", effet: "Effet réseau", texte: "Diffuser les apprentissages.", exemple: "Mises en relation, podcast, lettres de tendances, événements." },
];
