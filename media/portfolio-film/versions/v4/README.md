# V4 — Encore un détail

V4 officielle validée le 21 octobre 2026, issue de la révision 5. Film de 45 secondes, 1920 × 1080, 60 images/s, stéréo 48 kHz.

La V1 de 32 secondes a été revue intégralement dans Helium. Son énergie repose sur les changements de cadrage, les déplacements qui suivent une action et les arrivées avec ressort, plutôt que sur une légère oscillation d’objets déjà posés. La révision 5 reprend ces principes : transitions latérales de 0,28 seconde, gros plans sur la courbe et la préparation Python, suivi du trajet du PC vers les serveurs, puis retour au plan large. Les grandes légendes restent fixes et lisibles.

Le montage musical précédent sautait à un nouveau passage du morceau aux changements de scènes. Ces sauts ont été supprimés. **Cat Walk, d’Arulo**, avance continûment depuis son repère de 28 secondes, après ajustement du tempo de 130 à 120 BPM. La progression garde la même source autour de 11,75 ; 16,75 ; 22,25 ; 27,75 et 29 secondes. Le niveau augmente progressivement, sans redémarrage de phrase. Les 11,7 premières secondes de musique approuvées restent identiques. Un seul fondu, de 33,75 à 34,5 secondes, rejoint le final approuvé ; son mixage est ensuite conservé à l’échantillon PCM près jusqu’à la fin.

La reconstruction du logo est supprimée. **Zen est le seul projet visible**, pendant 3,5 secondes, de 30 à 33,5 secondes. Les trois écrans actuels du projet sont montrés ensemble. Le champ de recherche reçoit « Wong Kar-wai » : douze frappes, chacune associée à une image précise et à un son de clavier, puis un clic révèle la fiche du film.

PHP et C++ sont ajoutés de 33,5 à 34,5 secondes. Les six outils d’origine, les verbes et la signature restent présents de 34,5 à 41,5 secondes, avec leurs images et leur musique approuvées. Les nouveaux logos proviennent de Simple Icons ; les ressources déjà présentes restent celles du portfolio.

L’écran de 41,5 à 45 secondes reprend la capture de l’utilisateur : « ET SI ON TRAVAILLAIT », « ENSEMBLE ? », la pilule hey-michel.me et la flèche dans un disque séparé. Le texte apparaît en mouvement et le curseur appuie à 43,5 secondes, avec le clic sonore conservé. Les en-têtes et pieds de page sont absents de cet écran, comme sur la référence.

## Fichiers

- exports/michel-djoumessi-v4.mp4 : film.
- exports/bande-son-originale.wav : mixage de production, sous son nom historique.
- exports/musique-mixkit-montage.wav et exports/bruitages.wav : pistes de travail.
- exports/frappe-clavier.wav : les douze touches du passage Zen, sans silence préalable.
- exports/clic-final.wav : clic final isolé.
- exports/audio-manifest.json : source musicale, continuité et préservation du final.
- exports/sources.json : découpage, images Zen, logos ajoutés et capture de référence.
- exports/storyboard.jpg : nouvelles images de contrôle.
- exports/verification-technique.json et review/verification.md : vérifications.
- history/v4-revision-04.zip : sauvegarde de la révision précédente et source du mixage final conservé.

La musique reste attribuée à Arulo, sous la Mixkit Stock Music Free License. Les sources et conditions sont documentées dans assets/music-license.md. Les pistes de travail servent à reproduire la vidéo ; elles ne sont pas destinées à une publication musicale séparée.

Le site, les masters V1 à V3 et la V4bis restent inchangés.

## Reproduction

Depuis ce dossier, avec Node.js, FFmpeg, Python et NumPy :

```powershell
$env:MEDIA_NODE_MODULES='C:/Users/djoum/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'
pnpm preview
python source/score.py
pnpm render
python source/verify-film.py
```

La V1 fournit les fonctions de tracé de l’écran final. La V3 fournit les images d’ouverture et des outils jusqu’à la signature. L’archive de la révision 4 fournit le son final approuvé. Les polices, la texture et les images Zen sont celles du portfolio.
