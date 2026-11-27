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
    titre: "Revalue : faire d'un équipement en fin de vie une source de revenu",
    texte:
      "Charles Souillard, CEO et fondateur de Revalue, était présent au SEPEM aux côtés d'Envie Rhône-Alpes et de Grenoble-Alpes Métropole pour parler du remanufacturing : remettre des équipements en service à un niveau équivalent au neuf, pour augmenter la valeur et la durée de vie des produits industriels.",
  },
  {
    id: "fyxe",
    startup: "Fyxe",
    studio: "Hoji Ventures",
    youtubeId: "PoP5hEoCsmQ",
    titre: "Fyxe : garder le savoir-faire des équipes de maintenance",
    texte:
      "Tanguy Steeg, CEO de Fyxe, était invité avec le directeur des opérations de Kalistrut Aerospace (groupe PCC) pour un retour d'expérience : capter le savoir-faire des experts de l'usine, le structurer et le rendre accessible aux équipes, avec les difficultés rencontrées et les premiers résultats.",
  },
];
