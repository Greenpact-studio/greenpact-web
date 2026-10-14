// Résultats d'impact des startups, avec niveau de preuve.
// Niveaux : "Mesuré" | "Estimé" | "Intention".
// TODO vérifier : les niveaux marqués `aVerifier: true` sont à confirmer
// avec les studios (NetCarbon, Enerpacte, Revalue, Sapiologie).

export type NiveauPreuve = "Mesuré" | "Estimé" | "Intention";

export type Resultat = {
  startup: string;
  resultat: string;
  niveau: NiveauPreuve;
  aVerifier?: boolean;
};

export type ThemeImpact = { theme: string; resultats: Resultat[] };

export const RESULTATS_IMPACT: ThemeImpact[] = [
  {
    theme: "Décarboner la production",
    resultats: [
      { startup: "Bluefins", resultat: "−20 % de carburant et de CO₂ par navire équipé", niveau: "Mesuré" },
      { startup: "CaliCO₂", resultat: "Coût de captation divisé par 2", niveau: "Intention" },
      { startup: "NetCarbon", resultat: "11 270 tCO₂e évitées ou captées", niveau: "Estimé", aVerifier: true }, // TODO vérifier
    ],
  },
  {
    theme: "Consommer moins d'énergie",
    resultats: [
      { startup: "Enerpacte", resultat: "+20 % de productible", niveau: "Estimé", aVerifier: true }, // TODO vérifier
      { startup: "Thermal AI", resultat: "−50 % de consommation des datacenters", niveau: "Intention" },
      { startup: "Cedrus", resultat: "531 bâtiments audités, 50 à 200 ktCO₂ de gisement", niveau: "Intention" },
    ],
  },
  {
    theme: "Boucler les cycles",
    resultats: [
      { startup: "Revalue", resultat: "Jusqu'à 97 % d'impact évité par produit reconditionné", niveau: "Estimé", aVerifier: true }, // TODO vérifier
      { startup: "Sapiologie", resultat: "−25 % de CO₂ sur les produits éco-conçus", niveau: "Mesuré", aVerifier: true }, // TODO vérifier
      { startup: "Ayakem", resultat: "PoC d'isolants biosourcés issus de résidus de bois", niveau: "Intention" },
    ],
  },
  {
    theme: "Adapter, transitionner",
    resultats: [
      { startup: "Nepsis", resultat: "2 GW de renouvelable dont le financement est structuré", niveau: "Estimé" },
      { startup: "WatAO", resultat: "Destruction des PFAS dans l'eau", niveau: "Intention" },
      { startup: "Aqua Green Protect", resultat: "Gel bio pour la protection des cultures", niveau: "Intention" },
    ],
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
