# Michel Djoumessi — Film de portfolio

## Livrables

- `exports/michel-djoumessi-showreel.mp4` : vidéo de 32 secondes, 1920 × 1080, 30 images/seconde, H.264 et son AAC stéréo.
- `exports/bande-son-originale.wav` : musique et bruitages originaux, 48 kHz, stéréo.
- `exports/affiche.jpg` : signature du portfolio.
- `exports/storyboard.jpg` : vingt moments du film.
- `exports/sources.json` : identité extraite du code, ressources utilisées, empreintes SHA-256 et découpage temporel.
- `exports/verification-technique.json` : caractéristiques mesurées de la vidéo exportée.

La vidéo est conservée ici, sans intégration dans le site.

## Identité du site

Le vert principal est lu dans `src/styles/globals.css`, variable `--portfolio-accent` : `#173F35` lors de ce rendu. Les variables `--accent-hover` et `--accent-on-dark` sont également relevées.

Les fontes sont celles du portfolio : Italiana pour les grandes capitales, Amoria pour le « i » étoilé et le « O » de la signature, Cabinet Grotesk pour les textes et les éléments d’interface. Le logo et le fond texturé sont chargés directement depuis les ressources du site.

Les références observées dans Helium sont les deux vidéos de Melvyn sur Lumail :

- https://x.com/melvynx/status/2104074646224248944 : annonce des régions, 30 secondes.
- https://x.com/melvynx/status/2103741783234732518 : lancement de Lumail, 45 secondes.

Leur principe de mise en scène est repris : typographie construite en mouvement, cartes et connexions, démonstrations d’interface, zooms et raccords entre les éléments. Aucun média de ces vidéos n’est incorporé au film.

## Découpage

| Temps | Séquence |
| --- | --- |
| 0–3 s | Construction de la signature du site, lettre par lettre ; rapprochement vers le O d’Amoria |
| 3–6 s | « Vos idées. À l’écran. » ; les boutons Design, Développement et Expérience se relient |
| 6–8,5 s | Galerie de quatre projets ; déplacement du curseur et sélection de Zen |
| 8,5–13 s | Zen : nouveaux mockups, recherche tapée et changement de film |
| 13–17 s | Teamify : carte d’événement, invitations, connexions et apparition du mobile |
| 17–21 s | Lookaroun : réseau de points reliés, vues ordinateur et mobile |
| 21–25,5 s | Flow Media : tracé de maquette, révélation du rendu et passage au mobile |
| 25,5–28,5 s | Défilement des compétences du portfolio |
| 28,5–32 s | Invitation à travailler ensemble, bouton du site et signature |

Les visuels proviennent de Zen, Teamify, Lookaroun et Flow Media. Les couleurs propres aux projets restent dans leurs visuels. Les cartes d’événement, connexions et cadres de maquette sont des compositions de motion design ; elles illustrent les fonctions décrites dans le contenu du portfolio.

## Son

Composition électro originale à 120 BPM, en ré mineur : nappes, basse, arpèges, batterie synthétique et bruitages placés sur les arrivées de lettres, la saisie, les connexions et les transitions. Les sons sont synthétisés par `source/score.py`, sans échantillon externe. Le mix est normalisé lors de l’encodage.

## Régénération

Prérequis : Node.js 20 ou plus récent, FFmpeg dans le PATH, Python avec NumPy.

Depuis ce dossier :

```sh
pnpm install
python source/score.py
pnpm preview
pnpm render
```

`pnpm preview` exporte les images de contrôle et la planche. Le rendu complet produit 960 images puis les encode en H.264 avec signalisation BT.709 et plage vidéo limitée. Les copies de travail restent dans `.work/` ; les médias sources du site ne sont pas modifiés.

`MEDIA_NODE_MODULES` permet de réutiliser un répertoire contenant `@napi-rs/canvas`. `MEDIA_FFMPEG` permet de désigner un autre exécutable FFmpeg. `picture-master.mp4` est un intermédiaire silencieux ignoré par Git.

Pour examiner le fichier dans un lecteur local indépendant :

```sh
node source/preview-server.mjs
```

Le lecteur est sur `http://localhost:4198`. Arrêter ce serveur avec Ctrl+C après le contrôle.
