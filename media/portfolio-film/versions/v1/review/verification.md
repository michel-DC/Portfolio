# Vérification du film

- MP4 final : 32 secondes, 1920 × 1080, 30 images/s, 960 images, H.264 et AAC stéréo 48 kHz.
- Décodage intégral vidéo et audio par FFmpeg : aucune erreur.
- Lecture complète du dernier export dans Helium, profil helium-tests : fin atteinte à 32 secondes, aucune erreur média et aucune image perdue. Le compteur de décodage inclut les déplacements effectués pendant l’inspection des plans.
- Inspection des cadrages du fichier encodé : signature, Zen, Teamify, Lookaroun, Flow Media et invitation finale. Le double contour du téléphone de Zen a été corrigé ; les connexions de Teamify ont été déplacées hors du contenu de l’ordinateur.
- Identité : vert #173F35 lu dans le CSS du site ; fichiers de fontes Italiana, Amoria et Cabinet Grotesk du projet ; logo et texture du portfolio. Vingt ressources visuelles vérifiées par empreinte SHA-256.
- Couleurs : plage vidéo limitée et matrice BT.709. Comparaison ponctuelle du vert affiché dans Helium et de l’image source : écart maximal de quatre niveaux RGB, compatible avec l’encodage avec perte.
- Audio mesuré : −15,87 LUFS, crête réelle −1,64 dBTP, sans saturation. L’agent n’a pas pu effectuer d’écoute subjective ; le contrôle sonore repose sur le signal et ses mesures.
- Syntaxe des modules JavaScript et du script Python contrôlée. Aucun build ni lint de l’application lancé.

Les modifications livrées sont contenues dans media/portfolio-film. La vidéo n’est intégrée à aucune page du site. Le lecteur local utilisé pour le contrôle est arrêté après vérification.

Les données détaillées et l’empreinte du MP4 sont dans exports/verification-technique.json. La capture finale du fichier lu dans Helium est review/verified-film.jpg.
