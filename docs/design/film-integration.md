# Intégration du film V4

La V4 officielle validée le 21 octobre 2026 remplace la V3 dans la section vidéo de l’accueil. L’emplacement, le lecteur et ses interactions sont conservés : après la présentation, avant les projets ; le lien Voir le film du hero mène à #film.

## Ressources

- public/videos/portfolio/michel-djoumessi-v4.mp4 : copie exacte du master validé, 45 secondes, 1920 × 1080, 60 images/s, AAC stéréo 48 kHz, 32 882 478 octets. SHA-256 : 8c42723ae9b17162a7ba5ec3a169c6f74e3bf136c0528fababffc1013109d99f.
- public/videos/portfolio/apercu-v4.mp4 : aperçu muet de six secondes, 1280 × 720, 30 images/s, 923 298 octets. Il réunit des extraits de l’ouverture, du déploiement, de Zen et des outils.
- public/videos/portfolio/affiche-v4.webp : image de l’ouverture à 1,7 seconde, 1600 × 900, 237 660 octets.

Les libellés visibles et accessibles indiquent 45 secondes. Les URL versionnées évitent de réutiliser en cache les anciens médias. L’ancien master V3 et ses ressources ne sont plus référencés par la section vidéo ; ses archives sont conservées.

## Archivage

La version validée reste dans media/portfolio-film/versions/v4/exports/michel-djoumessi-v4.mp4, sans réencodage. ARCHIVE.md et archive-manifest.json identifient cette V4 officielle. Les 122 fichiers du manifeste ont été vérifiés par SHA-256, ainsi que l’égalité du master et de la copie publique.

Les ressources utilisées du portfolio sont figées dans inputs/public et les fonctions graphiques V1 de l’écran final dans inputs/dependencies/v1. Les sources, les bruitages, les conditions musicales, les contrôles et les sauvegardes précédentes restent disponibles dans le dossier de version.

## Vérifications de cette intégration

- pnpm exec tsc --noEmit --incremental false : réussi. Aucun build ni lint lancé.
- Aperçu V4 muet et animé lorsque la section est visible ; pause manuelle et reprise exercées dans Helium.
- Le film intégral n’a aucune source avant le clic.
- Lecture intégrale depuis le dialogue du site, avec son, jusqu’à 45 secondes, à 1920 × 1080. Le lecteur décode 2 700 images, ne signale aucune erreur média et abandonne trois images pendant cette lecture locale.
- L’aperçu reste en pause derrière le dialogue. La fermeture par le bouton a été exercée.
- À 390 × 844, ouverture et lecture avec son de la bonne V4, dialogue entièrement dans l’écran et aucun débordement horizontal.
- Format et durée du master et de l’aperçu contrôlés avec ffprobe.
- Captures natives inspectées : portfolio-v4-site-final.png, portfolio-v4-lecteur-desktop.png et portfolio-v4-lecteur-mobile.png.

Le serveur local signale toujours l’erreur préexistante de clé d’API du suivi des visites Prisma et des avertissements de qualité d’images de projets. Ces messages étaient déjà documentés lors de l’intégration de la V3 ; ils ne bloquent pas la vidéo et leur configuration n’est pas modifiée.

Une tentative complémentaire de capture mobile avec les contrôles natifs a expiré dans Helium après les parcours réussis ci-dessus. Elle n’a modifié aucun fichier du site ; les captures et les résultats issus du parcours complet validé sont conservés.

Le serveur démarré temporairement pour cette vérification a été arrêté après les contrôles. Cette intégration modifie les fichiers locaux du site ; aucune publication distante, aucun commit et aucun push ne sont effectués dans cette tâche.
