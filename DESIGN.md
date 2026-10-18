---
name: Portfolio de Michel Djoumessi
description: Galerie de projets sur fond texturé, avec un accent vert pin et une typographie lisible.
colors:
  portfolio-accent: "#173F35"
  accent-ink: "#173F35"
  accent-hover: "#235A4B"
  accent-on-dark: "#A3C2B2"
  black: "#1e1e1e"
  white: "#ffffff"
typography:
  gallery-display:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 9rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  about-body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.5rem"
    lineHeight: 1.6
  gallery-label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
  site-body:
    fontFamily: "CabinetGrotesk-Regular, sans-serif"
rounded:
  project: "0.625rem"
  montage: "0.375rem"
spacing:
  gallery-gap: "16px"
  page-mobile: "24px"
  page-tablet: "48px"
components:
  gallery-filter:
    textColor: "{colors.black}"
    typography: "{typography.gallery-label}"
  project-card:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    rounded: "{rounded.project}"
  about-link:
    textColor: "{colors.accent-ink}"
---

# Design System: Portfolio de Michel Djoumessi

## Overview

La petite refonte conserve les contenus, les fonctions et le SEO du portfolio. La galerie reprend la direction visuelle de la référence utilisateur marie-camilo.fr : images de projets lisibles, grands titres et métadonnées révélées à l'interaction. La référence fournie reste prioritaire.

Le fond conserve la texture répétée `/images/background/fond-page.png`. Les aperçus WebP dérivent des images originales conservées ; aucune image générée ne remplace les illustrations des projets. Les fonds décoratifs occupent la couche arrière des cartes, dans `public/images/projects/backgrounds/`. Zen utilise une photographie de Yosemite au crépuscule par [Casey Horner](https://unsplash.com/photos/mountain-ranges-at-sunset-K6bXVFkApPY). Les sept autres fonds générés avec imagegen conservent leurs matières : verre bleu, graphite, terre cuite, résine dorée, pierre claire, verre sauge et satin lilas.

## Colors

Le Pin profond `#173F35` souligne les éléments graphiques, les textes accentués et les focus sur fond clair. Les boutons et la sélection associent ce vert au blanc, avec un contraste de 11,67:1. Le survol des boutons utilise `#235A4B` (7,97:1 avec le blanc). Sur les surfaces sombres, les accents utilisent le vert clair `#A3C2B2` (8,67:1 avec `#1e1e1e`), notamment les flèches des projets, les liens du pied de page au survol et les repères du montage. Les couleurs des illustrations des projets sont conservées.

## Typography

Le nom dans le hero utilise [Italiana](https://github.com/google/fonts/tree/main/ofl/italiana) en graisse 400 : des formes simples et contrastées proches de la référence Marie Camilo. Le « i » de Michel et le « O » de DJOUMESSI utilisent seuls les glyphes étoilés d’Amoria dans le vert pin. Les polices sont hébergées localement et chargées via `next/font/local` avec `display: swap` ; la licence OFL d’Italiana accompagne son fichier. Les deux lignes suivent `clamp(3.25rem, 18.5vw, 26rem)`, une hauteur de ligne de 0.9 et un espacement de -0.025em ; le nom de famille utilise 94 % de cette taille. Le prénom est aligné à gauche, le nom à droite. Un seul titre accessible annonce « Michel Djoumessi ». La grande échelle est conservée, sans initiales calligraphiées.

Montserrat est chargé localement via `next/font/local`, avec `display: swap`. Son usage est limité à la section À propos de l'accueil et à la galerie de projets, y compris ses filtres et cartes. Cabinet Grotesk et Amoria restent les familles existantes ailleurs.

Le texte À propos passe à (2rem) dès le breakpoint tablette. Les filtres passent à (0.875rem). Les titres des cartes passent de (1.5rem) à (2.5rem), en gras et capitales. Le titre « Projets » suit le token fluide `gallery-display`.

## Layout

Le bloc du nom et des liens sociaux est remonté de 12 px sur mobile et de 16 px à partir du breakpoint tablette, tout en conservant sa taille et ses alignements.

La galerie a une colonne sur mobile et deux à partir de (768px). L’accueil présente quatre projets sans filtres, puis le lien « Voir tous mes projets ». La page dédiée conserve huit projets et quatre filtres : Tous, Applications web, Sites vitrines, Backend. Le nombre affiché sur cette page suit le filtre actif.

La galerie partage les alignements du hero sur l’accueil et la page des projets : marges latérales de 16 px sur mobile, 24 px dès 640 px, puis 4 % dès 768 px, avec une largeur utile plafonnée à 2200 px. Les aperçus ont un ratio (3:2). La section À propos est centrée dans un conteneur de (72rem).

## Elevation & Depth

Les cartes mettent en avant les images sans ombre additionnelle. Leur profondeur vient de la superposition sombre et du zoom léger à l'interaction. Le voile et les informations apparaissent progressivement sur 500 ms avec `ease-in-out`, puis disparaissent sur 300 ms. Le zoom est limité à 2 % sur 700 ms avec `cubic-bezier(0.22, 1, 0.36, 1)` ; il est désactivé en mouvement réduit. Les transitions se reprennent depuis leur état courant lorsque le survol est interrompu. Le panneau de montage conserve une ombre douce sur une surface noire.

## Shapes

Les cartes arrondies superposent deux plans : un fond décoratif couvrant toute la carte et l’illustration originale centrée dans une surface de 82 % de sa largeur et de sa hauteur. Une marge de 9 % laisse le fond visible sur les quatre côtés. Les images sont recadrées avec `object-cover`, sans cadre additionnel autour de l’illustration. Les filtres sont des libellés textuels ; le filtre sélectionné est encadré par des crochets. Le montage garde des coins légèrement arrondis et des perforations de pellicule.

## Components

### Entrée du nom

Les deux lignes du nom entrent en 800 ms par une translation verticale de 30 % et un fondu, avec un décalage de 120 ms et une décélération exponentielle. Le « i » vert se déploie depuis une rotation de -35° et une échelle de 0,6 ; le « O » tourne depuis -100° et une échelle de 0,65. Ces deux accents durent une seconde et démarrent à 180 et 300 ms. La séquence joue une fois au montage du hero, y compris après un retour à l’accueil. GSAP nettoie les styles et les animations au démontage. Le nom reste visible sans JavaScript ; la préférence de mouvement réduit supprime son entrée spatiale.

### Captures de Zen

La présentation détaillée de Zen utilise les cinq mockups fournis par l’utilisateur : accueil, catalogue, recherche, fiche film et Top personnel. Les PNG transparents mesurent 462 × 946 px et intègrent déjà le téléphone complet. Ils sont importés statiquement via `next/image`, affichés à leur ratio naturel et plafonnés à 330 px de largeur. Aucun cadre, bouton latéral ou encoche supplémentaire n’est dessiné en code. L’aperçu des cartes réutilise directement les mockups Catalogue, Accueil et Fiche film avec ses rotations existantes. Le fichier du Top est `top.png` ; son contenu et sa provenance sont documentés dans `docs/design/zen-top-capture.md`.

### Galerie et cartes

Sur un ordinateur avec pointeur précis, le survol ou le focus clavier révèle le titre, la description, la catégorie, les technologies et la date. Sur mobile et sur les périphériques tactiles, le titre et les métadonnées restent visibles ; la description longue est masquée sur mobile. La flèche utilise l'accent vert clair sur la superposition sombre.

Le zoom de l'image est limité à (1.02), sur (700ms). La superposition apparaît sur (500ms) et disparaît sur (300ms). Le focus reste visible autour de chaque lien. Zen utilise son aperçu mobile dédié ; les autres cartes utilisent leurs aperçus de projet.

### Filtres et lien À propos

Les filtres sont des boutons avec `aria-pressed` et une zone minimale de (44px). Le résultat filtré est annoncé via une région de statut. Le lien À propos utilise le vert pin, un soulignement au survol et un focus visible.

### Transition cinéma

Le montage est un panneau décoratif de (400px), plafonné à la largeur du mobile moins (32px), centré en haut de l’écran, marqué `aria-hidden` et sans interaction. Il démarre dès le clic, le retour arrière ou la sélection d’une page dans la recherche. Sa séquence rapide dure (620ms) : apparition (80ms), progression vers 85 % (360ms), finalisation (60ms), disparition (120ms). Il reste à 85 % si la route est encore en attente, puis se termine à son arrivée. Le pourcentage décrit la séquence visuelle, pas les octets téléchargés. Il n'occupe pas le plein écran et disparaît lorsque `prefers-reduced-motion` est actif.

## Do's and Don'ts

- Do conserver la texture, les contenus, les fonctions et les métadonnées SEO existants.
- Do utiliser les aperçus des vrais projets et conserver les originaux.
- Do rendre les métadonnées accessibles au clavier et visibles sur les périphériques tactiles.
- Don't étendre Montserrat à tout le site.
- Don't remplacer la composition de référence ou les illustrations originales des projets par des images générées ; les fonds décoratifs demandés sont une couche séparée.
- Don't transformer le montage décoratif en écran de chargement bloquant.
