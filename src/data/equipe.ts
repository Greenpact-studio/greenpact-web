// Équipe : pour ajouter une personne : une ligne dans le bon groupe,
// et sa photo (carré, 480 px idéalement, noir et blanc appliqué par le site) dans /public/team/<photo>.jpg.
// `linkedin` vide → la carte n'est pas cliquable.

export type Personne = {
  prenom: string;
  nom: string;
  role: string;
  photo: string; // nom du fichier dans /public/team/
  linkedin?: string;
};

export type Groupe = {
  id: "greenpact" | "4elements" | "hoji";
  nom: string;
  logo: string;
  sousTitre: string;
  membres: Personne[];
};

const li = (chemin: string) => `https://www.linkedin.com/in/${encodeURI(chemin)}/`;

export const EQUIPE: Groupe[] = [
  {
    id: "greenpact",
    nom: "Greenpact",
    logo: "/logo-greenpact.png",
    sousTitre: "Gouvernance",
    membres: [
      { prenom: "Emmanuel", nom: "Gonon", role: "Président", photo: "emmanuel-gonon.jpg", linkedin: li("emmanuelgonon") },
      { prenom: "Laurent", nom: "Geray", role: "Directeur général", photo: "laurent-geray.jpg", linkedin: li("laurentgeray") },
      { prenom: "Eric", nom: "Angelier", role: "Administrateur", photo: "eric-angelier.jpg", linkedin: li("ericangelier") },
      { prenom: "Thierry", nom: "Rouquet", role: "Administrateur", photo: "thierry-rouquet-v2.jpg", linkedin: li("thierryrouquet") },
      { prenom: "Philippe", nom: "Menier", role: "Administrateur", photo: "philippe-menier-v2.jpg", linkedin: li("philippe-menier-63444a43") },
      { prenom: "Virginie", nom: "Madrona", role: "Administratrice indépendante", photo: "virginie-madrona-v2.jpg", linkedin: li("virginie-madrona-debavelaere-9b7aba10") },
      { prenom: "Gaëtan", nom: "Menguy", role: "VC & Impact Management", photo: "gaetan-menguy.jpg", linkedin: li("gaëtan-menguy-912033256") },
    ],
  },
  {
    id: "4elements",
    nom: "4Elements",
    logo: "/logos/logo-4elements-noir.png",
    sousTitre: "Venture studio deeptech climat",
    membres: [
      { prenom: "Cédric", nom: "Favier", role: "Associé", photo: "cedric-favier-v2.jpg", linkedin: li("cfavier") },
      { prenom: "Jean-Baptiste", nom: "Goffart", role: "Associé", photo: "jean-baptiste-goffart-v2.jpg", linkedin: li("jbgoffart") },
      { prenom: "Cédric", nom: "Boisart", role: "Associé", photo: "cedric-boisart.jpg", linkedin: li("cédric-boisart-07b6a622") },
      { prenom: "Olivier", nom: "Flechon", role: "Venture Director", photo: "olivier-flechon.jpg", linkedin: li("olivier-fléchon-a5342322") },
      { prenom: "Sylvain", nom: "Pont", role: "CFO", photo: "sylvain-pont.jpg", linkedin: li("sylvain-pont") },
      { prenom: "Ambre", nom: "Vivet-Gros", role: "Gestion administrative", photo: "ambre-vivet-gros.jpg", linkedin: li("ambre-vivet-gros-55988b30") },
    ],
  },
  {
    id: "hoji",
    nom: "Hoji Ventures",
    logo: "/logos/logo-hoji.png",
    sousTitre: "Venture studio IA pour l'industrie",
    membres: [
      { prenom: "Stéphane", nom: "Folliet", role: "Associé", photo: "stephane-folliet.jpg", linkedin: li("stephane-folliet-a281534") },
      { prenom: "Jean-Christophe", nom: "Berne", role: "Associé", photo: "jean-christophe-berne.jpg", linkedin: li("jeanchristopheberne") },
      { prenom: "Emmanuel", nom: "Gonon", role: "Associé", photo: "emmanuel-gonon.jpg", linkedin: li("emmanuelgonon") },
      { prenom: "Laurent", nom: "Geray", role: "Associé", photo: "laurent-geray.jpg", linkedin: li("laurentgeray") },
      { prenom: "Didier", nom: "Pradeilles", role: "Senior Advisor", photo: "didier-pradeilles.jpg", linkedin: li("didier-pradeilles-7410966") },
      { prenom: "Ugo", nom: "Tarricone", role: "Venture & Impact Management", photo: "ugo-tarricone-v2.jpg", linkedin: li("ugo-tarricone-304608193") },
      { prenom: "Pauline", nom: "Juvigny", role: "Marketing & Communication", photo: "pauline-juvigny.jpg", linkedin: li("paulinejuvigny") },
      { prenom: "Florian", nom: "Gauthier", role: "Product Manager", photo: "florian-gauthier.jpg", linkedin: li("florian-gauthier-38760b49") },
      { prenom: "Thomas", nom: "Joët", role: "Product Manager", photo: "thomas-joet.jpg", linkedin: li("thomasjoet") },
      { prenom: "Maxence", nom: "Aïci", role: "Tech Lead", photo: "maxence-aici.jpg", linkedin: li("maxenceaici") },
      { prenom: "Guillaume", nom: "Salès", role: "Growth", photo: "guillaume-sales.jpg", linkedin: li("guillaume-sales") },
      { prenom: "Dany", nom: "Badr", role: "IA Developer", photo: "dany-badr.jpg", linkedin: li("danybadr") },
      { prenom: "Valentine", nom: "Ducharme", role: "Product Designer", photo: "valentine-ducharme.jpg", linkedin: li("valentine-d-810a5175") },
      { prenom: "Martin", nom: "Cousseau", role: "Product Designer", photo: "martin-cousseau.jpg", linkedin: li("martin-cousseau-358189114") },
      { prenom: "Corentin", nom: "Trosseille", role: "Talent Acquisition", photo: "corentin-trosseille.jpg", linkedin: li("corentintrosseille") },
    ],
  },
];

export const TRACK_RECORD =
  "+100 ventures co-fondées et financées, 28 exits à date, 150 M€ gérés dans des fonds et studios. Des équipes mixant entrepreneurs, opérationnels et VC.";
