# Michel Djoumessi — En mouvement — V2

Film indépendant de 32 secondes, destiné à un public non technique. La typographie, les images et la chorégraphie des logos expriment le design, le développement et l’animation. Aucun ajout aux pages du portfolio.

## Livrables

- `exports/michel-djoumessi-v2-motion.mp4` : version visuelle actuelle, Full HD, 30 images/s, H.264, AAC stéréo.
- `exports/bande-son-originale.wav` : composition et bruitages originaux à 120 BPM.
- `exports/affiche.jpg` : image de présentation.
- `exports/storyboard.jpg` : vingt-quatre moments du film.
- `exports/sources.json` : ressources, empreintes et découpage.
- `exports/verification-technique.json` : contrôles du fichier exporté.
- `exports/michel-djoumessi-v2.mp4` : précédent essai technique conservé pour historique ; ce fichier n’est pas la version actuelle.

## Identité

Vert principal `#173F35`, lu depuis `src/styles/globals.css`. Fond texturé, logo, Italiana, Amoria et Cabinet Grotesk identiques à la V1. Les couleurs propres aux projets sont conservées dans les images.

Les logos TypeScript, Next.js, Python, Tailwind CSS, PostgreSQL et Figma viennent des ressources du portfolio. L’icône Codex provient de sa page officielle ; sa provenance est conservée dans `assets/attribution.json`. Les marques gardent leurs couleurs.

## Montage

| Temps | Mouvement et intention |
| --- | --- |
| 0–3 s | Signature de Michel, construction typographique et trois mots : design, développement, animation |
| 3–6 s | « Imaginer » se dessine dans un cadre de sélection, puis une étoile emporte l’image |
| 6–10 s | Ruban de projets en perspective, téléphone Zen flottant et « Créer » |
| 10–14 s | Les logos passent du centre à la grille, à une ronde, puis à une ligne |
| 14–18,5 s | Les images coulissent en panneaux : « Fluide », « Précis », « Vivant » |
| 18,5–23 s | Le O devient une fenêtre sur les images ; trois téléphones évoluent ensemble |
| 23–27,5 s | « Des idées à l’écran » et défilement des outils |
| 27,5–32 s | « Et si on travaillait ensemble ? » et invitation à prendre contact |

Les projets se mêlent au montage plutôt que de former des chapitres séparés. Python figure parmi les outils animés. Codex apparaît une seule fois, environ 1,3 seconde, dans le ruban des outils. Aucun extrait de code, schéma technique ou chapitre consacré à l’IA.

## V1 préservée

La V1 approuvée reste dans `../portfolio-film/versions/v1/`. Sa seconde copie est `../portfolio-film/backups/portfolio-film-v1-2026-10-18.zip`. La V2 est construite entièrement dans ce dossier séparé. Ces sauvegardes sont locales au même ordinateur.

## Régénération

Prérequis : Node.js 20+, FFmpeg et Python avec NumPy.

```sh
pnpm install
python source/score.py
pnpm preview
pnpm render
```

`MEDIA_NODE_MODULES` permet de réutiliser un dossier de dépendances contenant `@napi-rs/canvas`. `MEDIA_FFMPEG` peut désigner un autre exécutable FFmpeg. Les fichiers de travail et le master silencieux sont ignorés par Git.

Le lecteur de contrôle local se lance avec `node source/preview-server.mjs` sur `http://localhost:4199`. L’arrêter après vérification.
