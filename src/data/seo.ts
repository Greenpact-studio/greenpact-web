// Référencement : données structurées (schema.org) et FAQ. Aucune donnée
// financière confidentielle ici (cf. règle 8.8 : ni TVPI, MOIC, valorisation,
// montants levés, ticket minimum, TRI cible, trajectoire de distribution).
import { SITE, NAV } from "./config";

export const ORGANISATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organisation`,
  name: "Greenpact",
  legalName: "GREENPACT",
  url: `${SITE.url}/`,
  logo: `${SITE.url}/logo-greenpact.png`,
  description: SITE.description,
  foundingDate: "2021",
  slogan: SITE.tagline,
  areaServed: "FR",
  knowsAbout: [
    "investissement à impact",
    "venture studio",
    "startup studio",
    "transformation durable de l'industrie",
    "décarbonation",
    "énergie",
    "construction",
    "agriculture",
    "deeptech",
    "intelligence artificielle",
  ],
  sameAs: [SITE.contact.linkedin, SITE.podcast.apple],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "investor relations",
    url: `${SITE.url}/devenir-investisseur/`,
    availableLanguage: "fr",
  },
  member: [
    { "@type": "Person", name: "Emmanuel Gonon", jobTitle: "Président" },
    { "@type": "Person", name: "Laurent Geray", jobTitle: "Directeur général" },
  ],
  subOrganization: [
    { "@type": "Organization", name: "Hoji Ventures", url: "https://www.hojiventures.com/" },
    { "@type": "Organization", name: "4Elements", url: "https://www.4elements.studio/" },
  ],
};

export const SITE_WEB = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#site`,
  url: `${SITE.url}/`,
  name: "Greenpact",
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE.url}/#organisation` },
};

/** Fil d'Ariane : accueil puis la page courante. */
export function filAriane(href: string) {
  const page = NAV.find((n) => n.href === href);
  const items = [{ name: "Accueil", item: `${SITE.url}/` }];
  if (page && href !== "/") items.push({ name: page.label, item: `${SITE.url}${href}` });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.item })),
  };
}

/** Questions fréquentes de la page Devenir investisseur (affichées et balisées FAQPage). */
export const FAQ = [
  {
    q: "Qu'est-ce que Greenpact ?",
    r: "Greenpact est une holding d'investissement à impact créée en 2021. Elle finance des startups qui accélèrent la transformation durable des entreprises dans l'industrie, l'énergie, la construction et l'agriculture, via deux venture studios, Hoji Ventures et 4Elements, et des participations directes.",
  },
  {
    q: "Comment Greenpact investit-elle ?",
    r: "De deux manières : indirectement, en finançant les venture studios qui créent les startups avec des industriels partenaires, et directement, dans les meilleures startups issues de ces studios. À date, le portefeuille compte 18 participations.",
  },
  {
    q: "Qu'est-ce qu'un venture studio ?",
    r: "Un venture studio crée des entreprises à partir de besoins exprimés par le marché : il identifie un problème industriel, recrute l'équipe fondatrice, apporte le premier capital et accompagne la startup jusqu'à ses premiers clients. Hoji Ventures et 4Elements délivrent ensemble 4 à 6 nouvelles entreprises par an.",
  },
  {
    q: "Qui sont les actionnaires de Greenpact ?",
    r: "Des entrepreneurs, des dirigeants et des family offices, appelés les Greenpacters, qui s'engagent activement aux côtés des startups par leur réseau, leur expertise et leurs premiers contrats.",
  },
  {
    q: "Comment devenir actionnaire de Greenpact ?",
    r: "En prenant contact avec Laurent Geray, directeur général, pour un premier échange sur le modèle, le portefeuille et les modalités. Greenpact est une holding evergreen : c'est un investissement de long terme, sans liquidité immédiate, qui comporte un risque de perte en capital.",
  },
  {
    q: "Comment Greenpact mesure-t-elle son impact ?",
    r: "Chaque startup est suivie sur un cycle d'impact, de l'intention à la mesure. Les résultats publiés distinguent ce qui est mesuré, estimé ou encore au stade de l'intention, et sont détaillés dans la thèse d'impact.",
  },
];

export const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
};
