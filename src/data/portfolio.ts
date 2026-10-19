// Portfolio : pour ajouter une startup : une entrée dans le studio concerné
// (ou dans DIRECTES), son logo éventuel dans /public/logos/<logo>.png.
// `url` absent → la startup s'affiche sans lien.

export type Startup = {
  nom: string;
  description: string;
  url?: string;
  logo?: string; // fichier dans /public/logos/
};

export type ParticipationDirecte = Startup & {
  url: string;
  secteur: string;
  photo: string; // fichier dans /public/images/
  logoClair?: string; // version claire du logo, posée sur la photo : /public/logos/clair/
};

export const DIRECTES: ParticipationDirecte[] = [
  {
    nom: "Bluefins",
    secteur: "Transport maritime",
    description:
      "Foil auto-propulsif qui réduit de 20 % la consommation de carburant et les émissions de CO₂ des navires de commerce.",
    url: "https://bluefins-systems.com",
    logo: "bluefins.png",
    logoClair: "bluefins.png",
    photo: "portfolio-bluefins.webp",
  },
  {
    nom: "Enerpacte",
    secteur: "Énergie solaire",
    description:
      "Exploitation et optimisation de la production des centrales solaires, pour +20 % de productible.",
    url: "https://ener-pacte.fr",
    logo: "ener-pacte.png",
    logoClair: "ener-pacte.png",
    photo: "portfolio-enerpacte.webp",
  },
  {
    nom: "Solarcare",
    secteur: "Énergie solaire",
    description: "Maintenance, retrofit et repowering des centrales solaires déjà installées.",
    url: "https://solarcare.fr",
    logo: "solarcare.png",
    logoClair: "solarcare.png",
    photo: "portfolio-solarcare.webp",
  },
];

export type Studio = {
  id: "hoji" | "4elements";
  nom: string;
  logo: string;
  logoClair: string; // version claire, posée sur l'en-tête foncé
  url: string;
  positionnement: string;
  startups: Startup[];
};

export const STUDIOS: Studio[] = [
  {
    id: "hoji",
    nom: "Hoji Ventures",
    logo: "/logos/logo-hoji.png",
    logoClair: "/logos/clair/hoji.png",
    url: "https://www.hojiventures.com",
    positionnement: "Venture studio IA dédié à la transformation de l'industrie.",
    startups: [
      { nom: "Nepsis", description: "Gestion financière et administrative de projets énergétiques.", url: "https://nepsis.co/en", logo: "nepsis.png" },
      { nom: "Revalue", description: "Valorisation des produits en fin de vie.", url: "https://revalue.eco", logo: "revalue.png" },
      { nom: "Fyxe", description: "Gestion de maintenance et d'exploitation par capitalisation de connaissances.", url: "https://www.linkedin.com/company/fyxe/", logo: "fyxe.png" },
      { nom: "Mina", description: "Gestion de la supply chain et des transports.", url: "https://www.linkedin.com/company/minaflow/" }, // TODO logo
      { nom: "Sapiologie", description: "Éco-conception des produits.", url: "https://www.sapiologie.com", logo: "sapiologie.png" },
      { nom: "Reflect", description: "Achats d'énergie : factures, contrats, ordres d'achat, équilibrage.", url: "https://reflectenergy.com", logo: "reflect.png" },
      { nom: "Neutrogen", description: "Production de neutrons pour la fusion nucléaire, la transmutation de déchets nucléaires et les radio-isotopes médicaux." }, // TODO URL et logo
    ],
  },
  {
    id: "4elements",
    nom: "4Elements",
    logo: "/logos/logo-4elements.png",
    logoClair: "/logos/logo-4elements.png",
    url: "https://www.4elements.studio",
    positionnement: "Venture studio deeptech climat, avec 50 laboratoires R&D partenaires.",
    startups: [
      { nom: "Bluefins", description: "Foil auto-propulsif pour le transport maritime.", url: "https://bluefins-systems.com", logo: "bluefins.png" },
      { nom: "Aqua Green Protect", description: "Gel bio pour protéger les exploitations agricoles et produire des engrais naturels.", logo: "aqua-green-protect.png" }, // TODO URL
      { nom: "CaliCO₂", description: "Captation des émissions carbone dans les fumées industrielles.", url: "https://www.linkedin.com/company/calico2company/", logo: "calico2.png" },
      { nom: "Thermal AI", description: "Fluides thermiques pour réduire la consommation énergétique des datacenters.", logo: "thermal-ai.png" }, // TODO URL
      { nom: "Ayakem", description: "Mousses et isolants biosourcés à partir de résidus de bois.", url: "https://www.linkedin.com/company/ayakem/", logo: "ayakem.png" },
      { nom: "WatAO", description: "Destruction des PFAS dans l'eau.", url: "https://www.linkedin.com/company/watao/", logo: "watao.png" },
      { nom: "Cedrus", description: "Audit et étude énergétiques de bâtiments.", url: "https://cedrus.solutions", logo: "cedrus.png" },
      { nom: "NetCarbon", description: "Optimisation et certification de captation carbone.", url: "https://www.netcarbon.fr", logo: "netcarbon.png" },
    ],
  },
];

export const SYNTHESE_PORTFOLIO = "1 holding, 2 venture studios, 18 participations à date.";
