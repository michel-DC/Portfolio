# Vérification V4 — révision 5

La V1 de 32 secondes a été lue intégralement dans Helium avant les modifications. Le nouveau film de 45 secondes a ensuite été lu de bout en bout dans le même navigateur, profil isolé helium-tests, en 1920 × 1080, avec le son activé. La dernière lecture atteint la fin sans erreur média : 2 700 images, 1 538 317 octets audio décodés et huit images abandonnées pendant cette lecture de contrôle. Le fichier contient bien ses 2 700 images à 60 images/s. Voir helium-playback.json.

Les captures natives du résultat ont été inspectées. v4-r5-zen.png, à 32,2 secondes, montre les trois écrans de Zen et le champ contenant Wong Kar-wai. v4-r5-php.png et v4-r5-cpp.png confirment les deux outils ajoutés, avec des logos nets. v4-r5-ecran-final.png, à 43,8 secondes, reprend les deux lignes de la capture de référence, la pilule hey-michel.me, le disque fléché et le curseur. Les fichiers v4-r5-python.png et v4-r5-serveurs.png montrent les nouveaux cadrages de travail et de transmission.

Le premier contrôle des nouveaux logos a montré un agrandissement flou du SVG rasterisé à 24 pixels. Leurs dimensions de rendu ont été portées à 512 pixels, la seconde d’animation concernée a été recalculée et le résultat a été vérifié de nouveau dans Helium.

Le MP4 final passe le décodage intégral FFmpeg sans erreur : H.264, 1920 × 1080, 60 images/s, AAC stéréo 48 kHz, durée 45 secondes. Les sources JavaScript et Python passent leurs contrôles syntaxiques. Aucun build ni lint de l’application n’a été lancé.

La continuité musicale est contrôlée directement contre le morceau source, avec son temps qui avance sans saut autour de 11,75 ; 16,75 ; 22,25 ; 27,75 et 29 secondes. Toutes les corrélations dépassent 0,99999. Un premier contrôle avait décelé une différence de gain entre le début approuvé et le nouveau passage ; le gain initial a été mesuré depuis la piste approuvée et sa progression a été rendue graduelle. Les contrôles ont ensuite tous réussi.

Les 11,7 premières secondes de la piste musicale sont identiques à celles de la révision 4. Le mixage complet de 34,5 à 45 secondes est identique à l’échantillon PCM près à celui de cette révision. Les pistes musique et bruitages reconstituent le mixage avec au maximum une unité de quantification d’écart.

Le champ de recherche Zen utilise douze caractères, avec une frappe toutes les cinq images, de l’image 1 875 à l’image 1 930. Le clavier est recherché dans l’audio AAC réellement décodé : corrélation de 0,7594 avec la frappe isolée. Le clic final de 43,5 secondes est également retrouvé, avec une corrélation de 0,7654 et zéro échantillon de décalage. Le film contient 90 repères son/image.

Les images des six outils précédents, des trois verbes et de la signature restent reprises du master V3, sur les sept secondes de 34,5 à 41,5. Leur comparaison donne un SSIM de 0,996723. L’ouverture originale de quatre secondes donne un SSIM de 0,997186. Aucun outil précédent n’a été supprimé ; PHP et C++ les précèdent sur une seconde supplémentaire. La reconstruction du logo a été supprimée. Zen est le seul projet montré.

Les SHA-256 des masters V3 et V4bis sont inchangés. Les quatre sauvegardes précédentes de la V4 ont été vérifiées, dont history/v4-revision-04.zip. Le nouveau fichier mesure 32 882 478 octets et son SHA-256 est 8c42723ae9b17162a7ba5ec3a169c6f74e3bf136c0528fababffc1013109d99f.

Le site n’a pas été modifié. Les fichiers temporaires de rendu ont été supprimés après validation. Les détails mesurés sont enregistrés dans ../exports/verification-technique.json.
