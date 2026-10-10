# Fond photographique de Zen

Recherche du 10 octobre 2026. Périmètre : remplacer uniquement le fond de la carte Zen par une photographie réelle, à vérifier dans la composition existante avant livraison.

La référence Hikee du [portfolio de Marie Camilo](https://marie-camilo.fr/) utilise un paysage de montagne au coucher du soleil autour du mockup. Son [fichier](https://marie-camilo.fr/uploads/projects/img_692de4d22c7d1.jpg) reste une référence visuelle ; son origine et sa licence ne sont pas établies et il ne doit pas être réutilisé.

## Choix recommandé

**Casey Horner — « midnight burn », Yosemite Valley.** La [page originale Unsplash](https://unsplash.com/photos/mountain-ranges-at-sunset-K6bXVFkApPY) identifie l'auteur, le paysage et une publication le 21 août 2018 ; elle classe explicitement la photographie sous Unsplash License. Elle constitue une option de montagne au crépuscule, à contrôler visuellement pour le cadrage et les couleurs de Zen.

- [Asset original lié par la page](https://images.unsplash.com/photo-1534832796130-37cfe118e925?auto=format&fit=crop&fm=jpg&w=3000&q=85).
- [Variante 1600 px pour intégration](https://images.unsplash.com/photo-1534832796130-37cfe118e925?auto=format&fit=crop&fm=jpg&w=1600&q=85).
- Licence : [Unsplash License officielle](https://unsplash.com/license). Elle autorise téléchargement, utilisation gratuite commerciale ou non commerciale et modifications ; l'attribution est appréciée mais non obligatoire. Ne pas vendre l'image sans modification significative ni constituer un service concurrent.
- Crédit conseillé : « Photo : Casey Horner / Unsplash » avec lien vers la page de la photo dans les crédits des assets.

## Alternative

**Thomas Ciszewski — « forest mountain during sunset », Yosemite Valley.** La [page originale](https://unsplash.com/photos/forest-mountain-during-sunset-z4rqGnlvqKA) identifie l'auteur, une publication le 30 janvier 2018 et la même Unsplash License. Les mots-clés de la page incluent rose, orange et violet, ce qui la rend pertinente pour la direction recherchée ; ce choix chromatique reste à confirmer par inspection de la photographie.

- [Asset lié par la page](https://images.unsplash.com/photo-1517355428470-46eef64fc502?auto=format&fit=crop&fm=jpg&w=1600&q=85).
- Le lecteur Web de recherche a rencontré une erreur de récupération de cet asset ; sa disponibilité de téléchargement n'a pas été confirmée ici.
- Crédit conseillé : « Photo : Thomas Ciszewski / Unsplash ».

## Intégration

Conserver le ratio 3:2 de la carte et recadrer seulement le fond en cover. Vérifier la photographie derrière le mockup de Zen sur ordinateur et mobile. Les autres fonds et illustrations de projets sont hors périmètre. Cette note documente la sélection et les droits, sans prétendre valider le rendu final.

## Validation de l’intégration

La photographie de Casey Horner a été intégrée dans `public/images/projects/backgrounds/zen-landscape.webp` en 1280 × 853 px, pour 46 104 octets. Seule la sélection du fond de Zen dans `src/data/project-gallery.ts` a changé. Les empreintes des fonds initiaux sont identiques avant et après le remplacement.

Le rendu a été exercé dans Helium sur ordinateur (1920 × 1080) et mobile (390 px), sur l’accueil et la page projets : image décodée, quatre projets sur l’accueil, absence de débordement et survol conservé. Les captures finales sont dans `.impeccable/review/zen-landscape-desktop.png` et `.impeccable/review/zen-landscape-mobile.png`. La vérification TypeScript a réussi. Le serveur de développement reste actif conformément à la demande utilisateur.
