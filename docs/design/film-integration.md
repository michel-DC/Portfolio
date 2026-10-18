# Intégration du film V3

La section se trouve dans l’accueil après la présentation et avant la galerie. Le lien « Voir le film » du hero mène à `#film`.

## Ressources

- `public/videos/portfolio/michel-djoumessi-v3.mp4` : copie exacte de la vidéo finale archivée, 40 secondes, 1920 × 1080, 60 images/s, 18 997 124 octets. SHA-256 : `35db1e06b74bee8d79d7acd236129633ab067bfefcee56c46d3688644ecabcf2`.
- `public/videos/portfolio/apercu.mp4` : extrait muet de 4,5 secondes à partir de 26,5 secondes, 1280 × 720 à 30 images/s, 423 149 octets.
- `public/videos/portfolio/affiche.webp` : image extraite à 27,5 secondes, 1600 × 900, 30 126 octets.

Les archives V1, V2 et V3 ne sont pas modifiées. Aucun nouveau dossier de version n’est créé.

## Comportement vérifié

Contrôle TypeScript : `pnpm exec tsc --noEmit` réussi.

Parcours réels dans Helium, profil isolé `helium-tests`, à 1920 × 1080, 1366 × 768, 390 × 844 et 320 × 568 :

- Emplacement entre la présentation et les projets ; lien du hero opérationnel ; aucun débordement horizontal constaté.
- Aucune source du film intégral avant le clic. L’aperçu est muet, sa pause manuelle et sa reprise fonctionnent. Il s’arrête hors écran et à l’ouverture du dialogue.
- Avec mouvement réduit, aucun aperçu vidéo n’est chargé ; l’affiche et le bouton de lecture restent présents.
- Ouverture au clavier et à la souris, lecture avec son, contrôles natifs, fermeture par le bouton, Échap ou clic sur le fond. Le focus retourne au déclencheur ; les éléments du fond ne peuvent pas recevoir le focus pendant le dialogue.
- Lors du parcours Tab dans les contrôles vidéo natifs, le navigateur peut recevoir le focus dans sa propre interface, puis le rend au dialogue ; aucun contrôle de la page derrière ne devient actif.
- Lecture intégrale jusqu’à 40 secondes, 2 400 images signalées et aucune erreur média. Le lecteur a signalé quatre images sautées pendant cette lecture locale.
- Erreur réseau simulée sur la source vidéo : message de repli et lien d’ouverture directe présents. Fermeture puis réouverture : la bonne source est restaurée, la lecture reprend à zéro sans erreur.
- Le dialogue tient dans l’écran de 1366 × 768 et sur mobile. La copie publique du film a la même empreinte que l’archive.

Le serveur local signale des erreurs préexistantes de suivi de visites Prisma liées à sa clé d’API et des avertissements sur la qualité 80 des images de projets. Ces messages ne concernent pas les ressources du film et n’empêchent pas les parcours vidéo. Leur configuration n’est pas modifiée dans cette intégration.

Le serveur démarré pour ces contrôles est arrêté à la fin. Aucun build ni lint n’est lancé pour cette tâche.
