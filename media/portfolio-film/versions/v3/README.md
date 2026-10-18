# Michel Djoumessi — V11

Deux corrections de la V10, sans modification du montage de 40 secondes :

- Le titre d’ouverture affiche le nom complet « Michel Djoumessi », avec la même animation de lettres et les mêmes polices. Sa taille est ajustée pour tenir sur une ligne.
- La musique est composée d’un seul tenant sur les 40 secondes, avec les mêmes instruments et le même tempo. Le fondu à 10 secondes et la réinsertion de la piste de la V9 sont supprimés. La résolution musicale accompagne uniquement la fin du film. Les 58 repères des animations sont inchangés et restent utilisés pour les bruitages synchronisés.

L’ouverture est recalculée jusqu’à la première image clé suivante, à l’image 250. Les 2 150 images suivantes sont copiées depuis la V10 sans réencodage et comparées après décodage. La première séquence se termine toujours à 4 secondes ; les dix images entre cette coupe et l’image clé sont rendues avec les sources inchangées de la V10.

## Fichiers

- `exports/michel-djoumessi-v11.mp4` : 1920 × 1080, 60 images/s, 40 secondes.
- `exports/bande-son-originale.wav` : composition continue, stéréo 48 kHz.
- `exports/verification-technique.json` : contrôles de durée, décodage, conservation des images, repères sonores et continuité audio.
- `review/verification.md` : preuve de lecture et capture du nom complet.

La V10 reste intacte dans son dossier. Le film n’est pas intégré au site.

## Reproduction

Avec Node.js 20+, FFmpeg, Python et NumPy, ainsi que `@napi-rs/canvas` dans les dépendances ou via `MEDIA_NODE_MODULES` :

```sh
pnpm preview
python source/score.py
pnpm render
python source/verify-film.py
```

Le lecteur temporaire de contrôle utilise `http://localhost:4209`.
