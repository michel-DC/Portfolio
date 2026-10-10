# Transition cinéma compacte

Recherche du 10 octobre 2026 pour la refonte du portfolio.

## Direction retenue

Une petite « pellicule de montage » : trois images des projets dans des cadres noirs perforés, une tête de lecture ambre et un pourcentage à chiffres tabulaires. Elle apparaît en bas à droite, sans masque sur la page et sans interrompre les interactions. Sur mobile, elle tient dans une largeur maximale de 260 px, avec une marge de 16 px.

Correction du 10 octobre à 18:09 : cette première version était trop discrète et ne démarrait qu’après le changement de chemin. La version livrée est centrée en haut de l’écran, large de 400 px au maximum, avec 16 px de marge sur mobile, et démarre dès la navigation. Elle progresse jusqu’à 85 %, attend si la route tarde, puis atteint 100 % et disparaît. Sa séquence rapide de 620 ms reste plus de deux fois plus rapide que les anciennes timelines de 1 300 ms. Le délai serveur éventuel est distinct de cette durée.

Cette proposition est une synthèse de design, pas une reproduction d'un loader existant. La pellicule perforée rend la référence cinéma immédiate : Kodak documente les perforations et leur espacement pour les films 16 et 35 mm. Les miniatures parcourues par un repère évoquent le montage numérique : Adobe décrit l'aperçu visuel et le scrubbing des miniatures dans Premiere. [Kodak, FAQ Motion Picture](https://www.kodak.com/en/motion/page/frequently-asked-questions/), [Adobe, Icon View et Hover Scrub](https://helpx.adobe.com/sg/premiere/desktop/get-started/customize-the-project-panel/customize-icon-view-in-project-panel.html).

Le chiffre rappelle aussi le leader de début de film. Le BFI décrit *At the Academy* de Guy Sherwin comme une œuvre construite à partir de ce compte à rebours. On conserve ici l'idée de préparation d'une séquence, avec un nombre intégré à la pellicule. [BFI, At the Academy](https://player.bfi.org.uk/free/film/watch-at-the-academy-1974-online).

## Séquence réalisable

1. Apparition de la pellicule par opacité pendant 80 ms.
2. Un repère traverse les trois images pendant 360 ms ; le chiffre progresse de 00 à 100, avec l'accent ambre du nouveau portfolio.
3. Disparition par opacité pendant 120 ms. Durée totale proposée : 560 ms.

Les anciennes timelines du dépôt durent 1 300 ms pour les projets, la page à propos, les détails de projet et les pages légales : 450 + 250 + 150 de délai + 450 ms. L'accueil dure 1 350 ms avec une sortie de 500 ms. Une séquence de 560 ms est donc environ 2,32 à 2,41 fois plus rapide. Ces durées proviennent de la lecture des fichiers `src/animations/*-animation.tsx`, pas d'une mesure du chargement réseau.

Images disponibles et adaptées : `public/images/projects/zen/screens/movie.png` pour le lien explicite au cinéma, `public/images/projects/framix/001.png` et `public/images/projects/elecsud-energies/001.png` pour montrer le travail réel du portfolio. Leur usage comme miniatures évite de télécharger des images de films extérieures. Les perforations et le repère peuvent être produits par le code de l'interface.

Le pourcentage représente la progression de la séquence visuelle. Il ne doit pas être présenté comme une mesure du téléchargement. La navigation doit rester immédiate ; aucun délai artificiel avant le changement de route. Le composant unique peut être relancé au changement de chemin afin de remplacer les six overlays actuels.

## Accessibilité et performance

Avec `prefers-reduced-motion: reduce`, supprimer le déplacement et le décompte ; afficher au besoin une pellicule statique brièvement, ou supprimer entièrement cette transition décorative. Le W3C recommande de permettre la désactivation des animations d'interaction et documente cette media query comme technique suffisante. [W3C, Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions), [W3C, technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html).

Limiter les animations à `transform` et `opacity`, sans modifier la largeur réelle de la barre, et éviter le clignotement. Ces propriétés sont celles recommandées par web.dev pour éviter des recalculs de layout et des opérations de peinture coûteuses. [web.dev, High-performance CSS animations](https://web.dev/articles/animations-guide).

Les images et la progression étant décoratives et très brèves, les masquer aux lecteurs d'écran ; ne pas annoncer chaque variation de pourcentage. Maintenir la gestion de focus habituelle de la navigation et `pointer-events: none` sur le composant.

## Référence de la refonte et validation

Le portfolio de [Marie Camilo](https://marie-camilo.fr/) a été visité dans Helium : accent CSS relevé `rgb(232, 175, 89)` (`#E8AF59`), présentation centrée sur fond papier, galerie de deux colonnes avec cartes image au ratio voisin de 3/2, filtres en texte et informations au survol. Les contenus et visuels restent ceux de Michel. Une variante `#95601e` porte les textes sur fond clair pour préserver leur lisibilité.

Montserrat est auto-hébergée, avec sa licence OFL, à partir du [dépôt officiel Google Fonts](https://github.com/google/fonts/tree/main/ofl/montserrat). Cabinet Grotesk et Amoria restent utilisés ailleurs dans le portfolio.

Les aperçus `public/images/projects/previews/*.webp` proviennent des fichiers PNG du projet, réduits avec Sharp ; les originaux sont conservés. Les trois images de la pellicule représentent 8 244 octets au total. Les aperçus de galerie conservent les compositions et visuels d’origine.

Vérifications réelles dans Helium (`localhost:3000`) :

- Filtres : Tous 8, Applications web 4, Sites vitrines 3, Backend 1 ; compteur et annonce de résultat cohérents.
- Ouverture d’un projet, retour à la galerie, lien de présentation vers À propos et pages légales ; aucun ancien écran plein écran.
- Clavier : focus visible sur les liens de projet et informations révélées au focus.
- `prefers-reduced-motion: reduce` : pellicule masquée.
- Aucune largeur débordante aux tailles 360, 390, 768, 1366 et 1920 px ; appel à l’action du hero visible sur 1366 × 768.
- Séquence isolée : environ 519 ms de visibilité observée par échantillonnage `requestAnimationFrame`, pour 560 ms de timeline ; le compteur atteint 100.
- `pnpm exec tsc --noEmit` : réussite. Aucun build ou lint lancé.

Captures finales enregistrées dans `.impeccable/review/`. La durée d’animation ne mesure pas le temps de réponse serveur ou de chargement réseau.

Validation de la correction : première visibilité mesurée avant le changement de page, de 63 à 610 ms après le lancement du parcours ; trois images chargées, panneau de 400 × 176 px sur ordinateur et 358 × 176 px sur mobile, aucune interaction bloquée. Une requête de navigation retardée dans le test reste à 85 % sur la page de départ, puis termine à 100 % et se masque à l’arrivée. Menu mobile, recherche, retour arrière, activation au clavier, clics rapprochés et retour entre ancres testés ; aucune pellicule persistante. Mouvement réduit : panneau masqué. Vérification TypeScript réussie avec accès aux dépendances du projet. Captures `cinema-visible-desktop.png`, `cinema-visible-mobile.png`, `cinema-pending-desktop.png` et `cinema-pending-mobile.png` dans `.impeccable/review/`. Le serveur reste actif selon la demande de l’utilisateur.

La revue indépendante a demandé un renforcement du dégradé mobile derrière le titre Zen. Le stop central est passé de 20 % à 60 % d’opacité. La capture corrigée a été contrôlée localement après que le sous-agent a atteint sa limite d’utilisation : quatre échantillons de fond voisins du titre donnent un contraste avec le blanc de 4,74:1 à 5,44:1, au-dessus du seuil de 3:1 pour ce grand texte. Le parcours des filtres a été rejoué avec 8 cartes et sans débordement à 390 px. Le serveur démarré pour les tests a ensuite été arrêté.
