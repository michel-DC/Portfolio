# Vérification — V2 En mouvement

- Fichier : `../exports/michel-djoumessi-v2-motion.mp4`.
- 32 secondes, 960 images, 1920 × 1080, 30 images/s, H.264, BT.709, AAC stéréo 48 kHz.
- Décodage intégral audio et vidéo avec FFmpeg : aucune erreur.
- Lecture native complète dans Helium, profil `helium-tests`, fenêtre 1920 × 1080 : fin à 32 secondes, aucun défaut de média, aucune image perdue ou corrompue. Son activé dans le lecteur.
- Captures du fichier encodé inspectées à 7,8, 12, 16 et 23,6 secondes, puis à la fin. Perspective sans coutures visibles, textes et logos lisibles.
- Mesure audio du fichier final : −15,83 LUFS intégrés, crête vraie −1,66 dBTP, sans écrêtage. L’agent ne dispose pas d’écoute subjective du son ; les contrôles audio sont instrumentaux.
- Syntaxe JavaScript et Python vérifiée. Aucun build ni lint de l’application lancé.
- 27 ressources comparées à leurs empreintes. Vert principal confirmé depuis le CSS du site.
- 68 fichiers de la V1 figée, vidéo originale et sauvegarde ZIP vérifiés par SHA-256 : intacts.

Le compteur d’images d’Helium inclut les déplacements dans la vidéo avant sa lecture complète ; le fichier contient exactement 960 images.

L’essai technique précédent reste conservé sous `michel-djoumessi-v2.mp4`. Les captures `verified-motion-*.jpg` et le rapport technique concernent exclusivement la révision visuelle actuelle.
