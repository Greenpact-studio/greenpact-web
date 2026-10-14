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

## Déploiement

Chaque push sur `main` reconstruit le site et l'envoie par FTP dans `/www/` chez OVH
(`.github/workflows/deploy-ovh.yml`). Un build planifié toutes les 6 h rafraîchit
les épisodes du podcast REGEN.
