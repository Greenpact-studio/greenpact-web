// Configuration générale du site. Modifier ici, jamais dans les composants.

export const SITE = {
  nom: "Greenpact",
  url: "https://www.greenpact.fr",
  description:
    "Holding d'investissement à impact, Greenpact finance des startups pour la transformation durable des entreprises (industrie, énergie, construction, agriculture) via deux startup studios et des participations directes.",
  tagline: "Investir dans la transformation durable des entreprises",
  contact: {
    email: "Laurent@greenpact.fr",
    emailEmmanuel: "Emmanuel@greenpact.fr",
    rendezVous: "https://fantastical.app/LaurentGERAY",
    linkedin: "https://www.linkedin.com/company/greenpactstudio/posts/",
  },
  podcast: {
    nom: "REGEN",
    apple: "https://podcasts.apple.com/fr/podcast/regen/id1784416624",
    // Obtenu via https://itunes.apple.com/lookup?id=1784416624 (champ feedUrl)
    rss: "https://anchor.fm/s/fe58efb8/podcast/rss",
    appleId: "1784416624",
  },
};

// Espace investisseur : la page publique /espace-investisseur/ présente l'espace
// privé ; le bouton « Se connecter » ouvre l'application des actionnaires
// (publiée sur Claude), dont l'accès est réservé aux personnes invitées.
// `ouvert: false` : le bouton affiche « Bientôt disponible » et ne mène nulle part
// (le lien de connexion n'apparaît pas dans la page). Passer à `true` pour ouvrir l'accès.
export const ESPACE_INVESTISSEUR = {
  href: "/espace-investisseur/",
  label: "Espace investisseur",
  ouvert: false,
};
// Adresse de l'application des actionnaires (sur Claude). Constante à part : elle
// n'est lue que par la page /espace-investisseur/, rendue au build, et n'est donc
// jamais envoyée au navigateur tant que l'espace est fermé.
export const CONNEXION_ESPACE_INVESTISSEUR = "https://claude.ai/artifact/HAZBk2GEnsAjWPtBh4hbxi";

// Les 7 pages du site, dans l'ordre de l'en-tête.
export const NAV = [
  { href: "/", label: "Le Modèle" },
  { href: "/these-investissement/", label: "Thèse d'investissement" },
  { href: "/these-impact/", label: "Thèse d'impact" },
  { href: "/equipe/", label: "Équipe" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/actualites/", label: "Actualités" },
  { href: "/devenir-investisseur/", label: "Devenir investisseur" },
] as const;

// Anciennes ancres du site mono-page → nouvelles pages.
export const ANCIENNES_ANCRES: Record<string, string> = {
  "#vision": "/",
  "#markets": "/these-investissement/",
  "#performance": "/these-investissement/",
  "#portfolio": "/portfolio/",
  "#startups": "/portfolio/",
  "#impact": "/these-impact/",
  "#team": "/equipe/",
  "#investors": "/devenir-investisseur/",
  "#contact": "/devenir-investisseur/",
};

export const MENTIONS_REGLEMENTAIRES =
  "Ce document est un document marketing, non réglementaire, et n'est pas approuvé par l'Autorité des Marchés Financiers. Les informations contenues sont fournies à titre indicatif et ne constituent pas une garantie de performance future. GREENPACT décline toute responsabilité quant à l'exactitude ou l'exhaustivité des informations. Le projet d'investissement ne bénéficiera d'aucune garantie ou protection et comportera un risque de perte en capital, limité à l'investissement initial, et une période de blocage minimum. Les performances passées ne préjugent pas des performances futures.";
