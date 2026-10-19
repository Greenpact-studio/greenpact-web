# Crédits photos

Toutes les photos proviennent d'Unsplash, sous licence Unsplash gratuite
(« Free to use under the Unsplash License »), vérifiée page par page le 2026-10-14.
Aucune image Unsplash+ (payante). Fichiers convertis en WebP dans `public/images/`
(2 400 px de large pour les photos plein écran, 1 600 px pour les autres).

| Fichier | Page | Photographe | Page Unsplash |
| --- | --- | --- | --- |
| `hero-foret.webp` | Le Modèle (accueil, plein écran) | Maciek Sulkowski | https://unsplash.com/photos/qkAqJuX6DVI |
| `modele-entrepreneurs.webp` | Le Modèle | Cemrecan Yurtman | https://unsplash.com/photos/WysVHhi69js |
| `modele-industrie.webp` | Le Modèle | Peter Herrmann | https://unsplash.com/photos/ObYNcuJgrXI |
| `these-economie-reelle.webp` | Thèse d'investissement | Bernd Dittrich | https://unsplash.com/photos/5rKyHGdcKaA |
| `these-europe.webp` | Thèse d'investissement | Ant Rozetsky | https://unsplash.com/photos/SLIFI67jv5k |
| `these-convictions.webp` | Thèse d'investissement | Andrew Dawes | https://unsplash.com/photos/3sbLZ8_w04c |
| `impact-paysage.webp` | Thèse d'impact | Sam Burrough | https://unsplash.com/photos/sbz_GEl-K7o |
| `impact-systemique.webp` | Thèse d'impact | Pascal Kiefer | https://unsplash.com/photos/zS6wQZIUysA |
| `portfolio-bluefins.webp` | Portfolio | Gary Walker-Jones | https://unsplash.com/photos/E2E95q5_tvM |
| `portfolio-enerpacte.webp` | Portfolio | Raphael Cruz | https://unsplash.com/photos/IwY-27ceRCA |
| `portfolio-solarcare.webp` | Portfolio | Sikwe Scarter | https://unsplash.com/photos/hBE96YanOlM |
| `investir-cta.webp` | Devenir investisseur (plein écran) | Anton Darius | https://unsplash.com/photos/UNV-H5PgKNo |
| `entree-these.webp` | Accueil, renvoi Thèse d'investissement | Moritz Kindler | https://unsplash.com/photos/2HAd6_Jz5H4 |
| `entree-portfolio-2.webp` | Accueil, renvoi Portfolio | TruckRun | https://unsplash.com/photos/XBWF6_TEsFM |
| `entree-investir.webp` | Accueil, renvoi Devenir investisseur | Erfan Soltani | https://unsplash.com/photos/Mvqe0B6TINM |

### Visuels repris de l'Espace actionnaires (dépôt `greenpact-investisseurs`, `assets/impact/`)

Origine et licence à confirmer avant mise en ligne (photos déjà utilisées dans l'espace actionnaires).

| Fichier | Page | Source |
| --- | --- | --- |
| `condition-energie.webp` | Thèse d'investissement, six conditions (01) | `assets/impact/consommer.jpg` |
| `condition-matiere.webp` | Thèse d'investissement, six conditions (03) | `assets/impact/boucler.jpg` |
| `condition-climat.webp` | Thèse d'investissement, six conditions (05) | `assets/impact/adapter.jpg` |
| `condition-modeles.webp` | Thèse d'investissement, six conditions (06) | `assets/impact/decarboner.jpg` |

### Visuel provisoire

| Fichier | Page | À faire |
| --- | --- | --- |
| `impact-sapiologie.webp` | Thèse d'impact, article Sapiologie | Logo Sapiologie sur fond vert : remplacer par une capture du logiciel (WebP 1600 × 1067, même nom). |

## Choix de la photo d'accueil

Parmi les trois candidates proposées, **Maciek Sulkowski (qkAqJuX6DVI)** a été retenue :
la brume dans la moitié basse de l'image laisse un large espace calme pour le titre,
le soleil levant apporte la lumière demandée et les tons chauds s'accordent au beige `#edeae4`.
La photo de Mitchell Kmetz (d7Qn3lHTn24) n'a ni soleil ni zone calme ; celle de
Jacek Pobłocki (Z-TQVnJxcCc) est dominée par un ciel orange qui jure avec la charte.

## Remplacer une photo

1. Choisir une photo Unsplash **gratuite** (mention « Free to use under the Unsplash License »).
2. La convertir en WebP à la bonne largeur, par exemple :
   `npx sharp-cli -i photo.jpg -o public/images/nom.webp resize 1600 -f webp -q 78`
3. Mettre à jour la ligne correspondante de ce fichier.
