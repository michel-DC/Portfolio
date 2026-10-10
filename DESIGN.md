---
name: Portfolio de Michel Djoumessi
description: Galerie de projets sur fond texturé, avec un accent doré et une typographie lisible.
colors:
  portfolio-accent: "#E8AF59"
  accent-ink: "#95601e"
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

L'accent doré souligne les éléments graphiques, le compteur des projets et le montage. L'encre brune porte les textes accentués et les focus sur fond clair. Le noir porte les textes et les surfaces sombres ; le blanc porte les textes superposés aux projets.

## Typography

Montserrat est chargé localement via `next/font/local`, avec `display: swap`. Son usage est limité à la section À propos de l'accueil et à la galerie de projets, y compris ses filtres et cartes. Cabinet Grotesk et Amoria restent les familles existantes ailleurs.

Le texte À propos passe à (2rem) dès le breakpoint tablette. Les filtres passent à (0.875rem). Les titres des cartes passent de (1.5rem) à (2.5rem), en gras et capitales. Le titre « Projets » suit le token fluide `gallery-display`.

## Layout

La galerie a une colonne sur mobile et deux à partir de (768px). L’accueil présente quatre projets sans filtres, puis le lien « Voir tous mes projets ». La page dédiée conserve huit projets et quatre filtres : Tous, Applications web, Sites vitrines, Backend. Le nombre affiché sur cette page suit le filtre actif.

Le conteneur est plafonné à (1920px), avec les marges définies dans les tokens puis (6.5%) à partir de (1024px). Les aperçus ont un ratio (3:2). La section À propos est centrée dans un conteneur de (72rem).

## Elevation & Depth

Les cartes mettent en avant les images sans ombre additionnelle. Leur profondeur vient de la superposition sombre et du zoom léger à l'interaction. Le voile et les informations apparaissent progressivement sur 500 ms avec `ease-in-out`, puis disparaissent sur 300 ms. Le zoom est limité à 2 % sur 700 ms avec `cubic-bezier(0.22, 1, 0.36, 1)` ; il est désactivé en mouvement réduit. Les transitions se reprennent depuis leur état courant lorsque le survol est interrompu. Le panneau de montage conserve une ombre douce sur une surface noire.

## Shapes

Les cartes arrondies superposent deux plans : un fond décoratif couvrant toute la carte et l’illustration originale centrée dans une surface de 82 % de sa largeur et de sa hauteur. Une marge de 9 % laisse le fond visible sur les quatre côtés. Les images sont recadrées avec `object-cover`, sans cadre additionnel autour de l’illustration. Les filtres sont des libellés textuels ; le filtre sélectionné est encadré par des crochets. Le montage garde des coins légèrement arrondis et des perforations de pellicule.

## Components

### Galerie et cartes

Sur un ordinateur avec pointeur précis, le survol ou le focus clavier révèle le titre, la description, la catégorie, les technologies et la date. Sur mobile et sur les périphériques tactiles, le titre et les métadonnées restent visibles ; la description longue est masquée sur mobile. La flèche utilise l'accent doré.

Le zoom de l'image est limité à (1.02), sur (700ms). La superposition apparaît sur (500ms) et disparaît sur (300ms). Le focus reste visible autour de chaque lien. Zen utilise son aperçu mobile dédié ; les autres cartes utilisent leurs aperçus de projet.

### Filtres et lien À propos

Les filtres sont des boutons avec `aria-pressed` et une zone minimale de (44px). Le résultat filtré est annoncé via une région de statut. Le lien À propos utilise l'encre brune, un soulignement au survol et un focus visible.

### Transition cinéma

Le montage est un panneau décoratif de (400px), plafonné à la largeur du mobile moins (32px), centré en haut de l’écran, marqué `aria-hidden` et sans interaction. Il démarre dès le clic, le retour arrière ou la sélection d’une page dans la recherche. Sa séquence rapide dure (620ms) : apparition (80ms), progression vers 85 % (360ms), finalisation (60ms), disparition (120ms). Il reste à 85 % si la route est encore en attente, puis se termine à son arrivée. Le pourcentage décrit la séquence visuelle, pas les octets téléchargés. Il n'occupe pas le plein écran et disparaît lorsque `prefers-reduced-motion` est actif.

## Do's and Don'ts

- Do conserver la texture, les contenus, les fonctions et les métadonnées SEO existants.
- Do utiliser les aperçus des vrais projets et conserver les originaux.
- Do rendre les métadonnées accessibles au clavier et visibles sur les périphériques tactiles.
- Don't étendre Montserrat à tout le site.
- Don't remplacer la composition de référence ou les illustrations originales des projets par des images générées ; les fonds décoratifs demandés sont une couche séparée.
- Don't transformer le montage décoratif en écran de chargement bloquant.
