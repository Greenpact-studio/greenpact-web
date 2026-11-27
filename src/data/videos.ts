// Vidéos publiques (YouTube) des participations, affichées sur la page Portfolio
// et dans l'onglet « Vidéos » de la page Médias. Uniquement des contenus publics.
// Pour en ajouter une : une ligne ici, avec l'identifiant YouTube (après « v= »).

export type Video = {
  id: string; // ancre : /portfolio/#video-revalue
  startup: string;
  studio: string;
  youtubeId: string;
  titre: string;
  texte: string;
};

export const VIDEOS: Video[] = [
  {
    id: "revalue",
    startup: "Revalue",
    studio: "Hoji Ventures",
    youtubeId: "PojJdtd0yzs",
    titre: "Revalue : redonner de la valeur aux équipements en fin de vie",
    texte:
      "Charles Souillard, CEO et fondateur de Revalue, était présent au SEPEM avec Envie Rhône-Alpes et Grenoble-Alpes Métropole pour parler de remanufacturing : remettre des équipements en service au niveau du neuf.",
  },
  {
    id: "fyxe",
    startup: "Fyxe",
    studio: "Hoji Ventures",
    youtubeId: "PoP5hEoCsmQ",
    titre: "Fyxe : faire du savoir des experts un levier de performance",
    texte:
      "Tanguy Steeg, CEO de Fyxe, était invité au SEPEM avec le directeur des opérations de Kalistrut Aerospace (groupe PCC) pour un retour d'expérience : la démarche menée ensemble, ce qui a coincé et les premiers résultats pour la production et la formation des équipes.",
  },
];
