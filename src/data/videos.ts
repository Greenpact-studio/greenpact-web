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
      "Revalue aide les industriels à choisir, pour chaque équipement en panne ou en fin d'usage, entre réparer, reconditionner, réemployer ou recycler. Une startup du studio Hoji Ventures, dont Greenpact est actionnaire.",
  },
  {
    id: "fyxe",
    startup: "Fyxe",
    studio: "Hoji Ventures",
    youtubeId: "PoP5hEoCsmQ",
    titre: "Fyxe : garder le savoir-faire des équipes de maintenance",
    texte:
      "Fyxe capitalise les connaissances des équipes de maintenance et d'exploitation pour qu'elles profitent à tout le site industriel. Une startup du studio Hoji Ventures, dont Greenpact est actionnaire.",
  },
];
