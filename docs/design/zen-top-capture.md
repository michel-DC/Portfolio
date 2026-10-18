# Mockups mobiles de Zen

Les cinq PNG fournis par l’utilisateur le 18 octobre 2026 sont conservés dans `public/images/projects/zen/screens/` : `home.png`, `catalog.png`, `search.png`, `movie.png` et `top.png`.

Chaque image mesure 462 × 946 px, possède un canal alpha et contient déjà le téléphone complet. La fiche Zen et l’aperçu des cartes les affichent directement via des imports statiques `next/image`, avec leur ratio naturel. Le composant ne dessine plus de cadre, de boutons latéraux ni d’encoche. Les fichiers fournis n’ont pas été retouchés.

## Origine du contenu du Top

Le contenu du Top provient d’une capture réalisée dans Helium, profil isolé `helium-tests`, depuis `https://zen.hey-michel.me/top`, avec un viewport mobile de 430 × 932 px et une densité de 3. Cette capture initiale mesurait 1290 × 2796 px avant son intégration dans le mockup fourni par l’utilisateur.

Le podium avait été préparé temporairement dans le DOM avec The Grand Budapest Hotel en Top 1, Moonrise Kingdom en Top 2 et Asteroid City en Top 3. Les trois films et leurs affiches provenaient du catalogue réel et identifiaient Wes Anderson comme réalisateur. La recherche de la liste de sélection était filtrée sur « Wes Anderson ». Aucun classement enregistré ni aucune donnée de Zen n’ont été modifiés.

## Vérification

Les cinq mockups se chargent dans la fiche Zen, avec un ratio rendu correspondant à 462/946 et sans élément de téléphone ajouté dans le DOM. L’aperçu des cartes charge trois mockups, conserve son survol et mène à la fiche Zen. Fiche et galerie vérifiées dans Helium sur ordinateur et mobile, sans débordement horizontal. Vérification TypeScript réussie.
