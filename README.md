# Site greenpact.fr

Site vitrine de Greenpact : Next.js en export statique, publié sur OVH par GitHub Actions.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000. `npm run build` génère le site statique dans `out/`.

## Où modifier quoi

| Je veux…                          | Fichier                                   |
| --------------------------------- | ----------------------------------------- |
| Ajouter une personne à l'équipe   | `src/data/equipe.ts` + photo `public/team/` |
| Ajouter / modifier une startup    | `src/data/portfolio.ts` + logo `public/logos/` |
| Publier un article                | nouveau `.md` dans `content/actualites/`  |
| Ajouter une apparition presse     | `data/apparitions.json`                   |
| Ajouter un post LinkedIn          | `data/linkedin.json` (code « Intégrer »)  |
| Résultats d'impact                | `src/data/impact.ts`                      |
| Contact, podcast, navigation      | `src/data/config.ts`                      |

## Alimenter la page Actualités

Tout se fait sans toucher au code. Les entrées marquées `exemple: true` portent un badge
« Exemple » : les supprimer avant la mise en ligne.

**Article.** Dupliquer `content/actualites/2026-01-15-exemple-article.md`, le renommer
`AAAA-MM-JJ-mon-titre.md` (le nom de fichier devient l'URL `/actualites/AAAA-MM-JJ-mon-titre/`),
remplir l'en-tête (`titre`, `date`, `image`, `resume`), écrire le corps en Markdown, retirer
`exemple: true`. L'image va dans `public/images/` (WebP 1600 px).

**Podcast REGEN.** Automatique : le flux RSS (`src/data/config.ts`, `podcast.rss`) est lu à
chaque build ; le build planifié toutes les 6 h met la liste à jour. Si le flux est injoignable
au build, la page affiche le lecteur Apple Podcasts à la place.

**Apparition (presse, conférence).** Ajouter un objet dans `data/apparitions.json` :
`{ "titre", "media", "date": "AAAA-MM-JJ", "lien" }` (`lien` facultatif).

**Post LinkedIn.** Sur le post, menu « … » → « Intégrer ce post », copier le code `<iframe …>`
et l'ajouter dans `data/linkedin.json` : `{ "titre", "date", "iframe" }`. Ne coller que des
codes provenant de LinkedIn.

## Déploiement

Chaque push sur `main` reconstruit le site et l'envoie par FTP dans `/www/` chez OVH
(`.github/workflows/deploy-ovh.yml`). Un build planifié toutes les 6 h rafraîchit
les épisodes du podcast REGEN.

## Référencement (SEO et moteurs IA)

- `src/data/seo.ts` : données structurées schema.org (Organisation, site, fil d'Ariane, FAQ).
  Les questions fréquentes de la page Devenir investisseur se modifient là.
- Chaque page a un titre, une description, une URL canonique et une image de partage
  (`public/images/og-greenpact.jpg`, 1200 × 630).
- `public/llms.txt` : fiche de présentation lue par les assistants IA ; à tenir à jour
  avec les chiffres clés (nombre de participations, partenaires).
- `sitemap.xml` et `robots.txt` sont générés au build (`src/app/sitemap.ts`, `robots.ts`).
- Règle absolue : aucune donnée financière confidentielle (voir `src/data/seo.ts`).
