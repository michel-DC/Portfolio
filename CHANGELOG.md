# Changelog

## 18-10-2026

- 22:00 Intégration du film V3 entre la présentation et les projets : aperçu muet de 4,5 secondes, bouton de lecture et lien depuis le hero. Lecture complète avec son dans un dialogue accessible, fermeture par Échap et clic sur le fond, pause hors écran et affiche fixe en mouvement réduit. Vérification Helium à 1920, 1366, 390 et 320 px, lecture des 40 secondes et repli en cas d’erreur validés ; TypeScript validé.
- 14:39 Ajout d’une entrée décalée des deux lignes du nom, avec déploiement et rotations distinctes du « i » et du « O » verts, sans animation en mouvement réduit. Élargissement de la galerie commune à l’accueil et à la page des projets pour reprendre les marges du hero. Vérification Helium de 320 à 2560 px, des filtres et du retour à l’accueil ; TypeScript validé et serveur conservé allumé.
- 10:45 Remplacement de l’accent orange par le Pin profond #173F35, avec un survol #235A4B et un vert clair #A3C2B2 sur les surfaces sombres. Adaptation des textes des boutons, de la sélection, des icônes et de la citation pour préserver leur contraste. Vérification Helium sur ordinateur et mobile, focus et survols validés, TypeScript validé ; serveur conservé allumé.
- 10:29 Intégration des cinq nouveaux mockups Zen fournis par l’utilisateur, avec conservation de leur transparence et de leur ratio 462 × 946. Suppression des téléphones dessinés en code dans la fiche et l’aperçu des cartes, correction du chemin du Top et imports statiques pour renouveler automatiquement les images. Vérification Helium sur ordinateur et mobile, navigation et TypeScript validés ; serveur conservé allumé.
- 10:03 Nouvelle capture du Top de Zen avec The Grand Budapest Hotel, Moonrise Kingdom et Asteroid City, exclusivement réalisés par Wes Anderson. Conservation du format 1290 × 2796 px et renouvellement de l’URL de l’image pour éviter le cache de la version avec placeholders.
- 09:59 Descente légère du bloc du nom et des liens, de 16 px sur ordinateur et de 12 px sur mobile. Ajout d’une cinquième capture Zen pour le Top personnel, avec trois places disponibles et des placeholders, au format 1290 × 2796 px. Présentation et accueil vérifiés dans Helium sur ordinateur et mobile ; TypeScript validé et serveur laissé allumé.
- 09:53 Remontée du bloc du nom et des liens de 32 px sur ordinateur et de 24 px sur mobile, avec contrôle du placement et de la visibilité dans Helium.
- 09:51 Agrandissement d’environ 9 % des deux lignes du nom, avec conservation de la typographie et des accents dorés. Vérification dans Helium en 1920, 1366, 390 et 320 px, sans débordement du titre.
- 09:49 Adoption d’Italiana pour un nom plus sobre et proche de la référence Marie Camilo, avec les seuls « i » et « O » étoilés d’Amoria en doré. Retrait des polices de la proposition précédente et vérification dans Helium sur quatre tailles d’écran ; TypeScript validé.
- 09:46 Remplacement d’Amoria dans le hero par Bodoni Moda et des initiales « M » et « D » en Pinyon Script doré, avec polices et licences hébergées localement. Ajustement de l’espacement pour garder les liens visibles sur petit ordinateur et vérification du titre dans Helium sur ordinateur et mobile.
- 09:40 Agrandissement du nom du hero avec la police locale Amoria, à la même échelle que la référence Marie Camilo, et mise en valeur du « i » étoilé et du « O » ornementé en doré. Vérification dans Helium sur ordinateur, tablette et mobile, contrôle du mouvement réduit et validation TypeScript.

## 10-10-2026

- 18:41 Correction des erreurs de lint existantes : compteurs du dashboard typés, caractères JSX échappés et lecture du cookie de tracking via un store externe. Lint et build de production validés avant commit, avec contrôle de l’accueil et de la recherche dans Helium.
- 18:34 Remplacement uniquement du fond de Zen par une photographie de Yosemite au crépuscule de Casey Horner, avec source et droits documentés. Conservation des autres fonds et vérification sur ordinateur, mobile et TypeScript.
- 18:27 Adoucissement du survol des projets : fondu d’entrée de 500 ms, sortie de 300 ms et zoom limité à 2 % sur 700 ms avec décélération progressive. Vérification des interruptions, du clavier et du mobile ; zoom désactivé en mouvement réduit.
- 18:22 Ajout d’un fond illustré distinct derrière chaque aperçu de projet, avec une illustration centrée et des marges visibles selon la référence Marie Camilo. Création de huit fonds optimisés en WebP, conservation des quatre projets sur l’accueil et vérification des filtres, liens, tailles mobiles et du clavier.
- 18:09 Correction de la transition cinéma : démarrage dès la navigation, pellicule illustrée centrée en haut de l’écran et progression maintenue pendant l’attente de la route. Séquence rapide de 620 ms, vérifiée sur ordinateur et mobile, avec recherche, clavier, retour arrière, clics rapprochés et mouvement réduit ; serveur conservé actif.
- 14:44 Rétablissement de la sélection de quatre projets sur l’accueil et du bouton « Voir tous mes projets », avec la galerie complète et ses filtres réservés à la page dédiée. Vérification sur ordinateur et mobile ainsi que du lien vers les huit projets.
- 13:14 Refonte ciblée du portfolio avec un accent doré inspiré de Marie Camilo, une présentation sur fond papier et une galerie filtrable commune à l’accueil et aux projets ; suppression du curseur suiveur et remplacement des écrans d’entrée par une pellicule illustrée de 560 ms, désactivée en mouvement réduit. Ajout d’aperçus WebP légers et vérification du responsive, du clavier et des types TypeScript.

## 14-09-2026

- 20:33 Canonicalisation SEO complète du portfolio vers `https://www.hey-michel.me` avec métadonnées canoniques et sociales propres à chaque page, redirections 301 des anciens hôtes, sitemap standardisé sur `/sitemap.xml`, robots.txt cohérent et exclusion explicite du dashboard de l’indexation.

## 13-09-2026

- 10:54 Harmonisation des URL canoniques sur le domaine `hey-michel.me` pour toutes les pages indexables, avec neutralisation explicite de la canonique héritée sur les pages légales et les routes du dashboard.
- 10:31 Refonte de la présentation du projet Zen avec quatre captures réelles en mode clair au format iPhone 15 Pro Max, intégrées dans des mockups sans barre de défilement, avec une zone blanche sous la Dynamic Island et la navigation mobile basse entièrement visible.
- 10:31 Nettoyage du portfolio avec suppression des caches, sorties temporaires, anciens visuels Zen, vidéos et médias non référencés, tout en conservant les dépendances `node_modules`, la documentation et les fichiers Python.

## 12-09-2026

- 08:31 Restauration du fond texturé historique `fond-page.png` sur une base blanche et du vert émeraude `#008366` sur l’ensemble des accents de l’interface et des e-mails, avec une variante verte claire pour préserver la lisibilité sur fond sombre.

## 03-09-2026

- 23:37 Correction des balises canoniques : chaque page publique et chaque projet déclare désormais sa propre URL canonique, tandis que les pages légales sont ajoutées au sitemap.

## 28-08-2026

- 13:59 Correction du type de retour du formulaire de contact pour la vérification TypeScript de production.
- 13:57 Sécurisation du typage des conteneurs d’animations d’entrée afin de permettre la compilation de production.
- 13:52 Recomposition de la section contact sur le fond granuleux global, avec une seule information de réponse sous 24 heures et sans panneau noir ni structure en deux colonnes ; suppression du texte de positionnement ajouté au hero.
- 13:45 Refonte complète de la section contact avec une nouvelle hiérarchie en deux panneaux, un formulaire accessible et l’engagement de réponse sous 24 heures ; ajout d’un positionnement métier au hero.
- 13:08 Correction du ciblage des animations d’entrée afin que leurs voiles se retirent correctement sur les pages concernées.
- 13:04 Accélération des écrans d’entrée sur les pages À propos, Projets et légales pour uniformiser le rythme de navigation.
- 13:00 Modernisation visuelle du portfolio : nouveau fond gris bleuté à grain discret, rythme des animations accéléré, informations de projets et d’expériences visibles au repos, rayures décoratives supprimées, accents bleus harmonisés, navigation mobile renforcée pour le clavier et qualité d’images configurée.
- 12:43 Ajout d’une variante bleu brume #AFC4D1 pour les accents textuels sur fonds sombres afin d’assurer un contraste lisible.
- 12:36 Remplacement de la couleur d’accent vert émeraude par le bleu ardoise #4E6471 sur l’ensemble du portfolio, ses composants et ses e-mails de contact.

## 27-08-2026

- 19:12 Migration des URLs, métadonnées SEO, sitemap, robots.txt, liens de projets et coordonnées de contact vers le domaine hey-michel.me.
