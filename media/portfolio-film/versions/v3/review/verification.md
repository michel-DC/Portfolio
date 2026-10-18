# Vérification V11

Deux modifications : nom complet en ouverture et musique continue sur 40 secondes. La comparaison des sources d’ouverture avec la V10 montre uniquement le remplacement du prénom par le nom complet et son ajustement typographique.

- Durée : 40 secondes ; 1920 × 1080 ; 60 images/s ; 2 400 images.
- Décodage intégral FFmpeg : aucune erreur.
- Les 2 150 images à partir de l’image 250 sont strictement identiques aux images correspondantes de la V10 après décodage.
- Chronologie et 58 repères d’animation identiques à la V10 ; les 58 événements sonores suivent ces repères.
- La musique est synthétisée dans un seul tableau de 40 secondes, avec réverbérations continues. Aucun morceau précédent n’est lu ni recollé. L’enveloppe ne comporte qu’une entrée en début de film et une sortie sur les 350 dernières millisecondes.
- Contrôle des fenêtres audio de 100 ms entre 0,2 et 39,5 secondes : niveau le plus faible −24,95 dBFS, sans plage silencieuse interne. Ce contrôle confirme la continuité du signal, pas un jugement d’écoute musicale.
- Niveau du MP4 : −16,27 LUFS intégrés ; crête réelle −2,25 dBTP.
- La V10 conserve son empreinte SHA-256 d’origine. Palette et polices correspondent toujours à la V2.

Lecture complète dans Helium, profil `helium-tests`, en 1920 × 1080 avec le son activé : arrivée à 40 secondes, aucune erreur média et aucune image corrompue. Le lecteur signale 3 images sautées sur 2 400 pendant cette lecture ; le fichier a été décodé intégralement sans erreur.

Captures inspectées : `helium-ouverture.png` affiche « Michel Djoumessi » lisiblement ; `helium-fin.png` conserve l’invitation au portfolio. Le serveur temporaire a été arrêté après les contrôles. Le site n’a pas été modifié.
