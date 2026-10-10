# Fonds des cartes projets

La capture utilisateur et le portfolio de [Marie Camilo](https://marie-camilo.fr/) restent la référence de composition : fond couvrant la carte, illustration du projet centrée au premier plan et marge visible autour. Le code conserve les illustrations existantes ; seule la couche décorative varie.

Chaque carte garde son ratio 3:2. L’illustration occupe 82 % de la largeur et de la hauteur, avec une marge de 9 % sur chaque bord. Les fonds sont décoratifs et masqués aux lecteurs d’écran. L’accueil conserve quatre projets ; la page dédiée en conserve huit.

Les huit fonds initiaux ont été créés avec l’outil intégré imagegen, puis optimisés en WebP de 1280 px de large. Le fond de Zen a ensuite été remplacé par une photographie réelle, selon le retour utilisateur. Les PNG de génération restent dans le dossier de sortie de l’outil ; les assets consommés par le portfolio sont dans `public/images/projects/backgrounds/`.

## Sources et prompts

Vérifications dans Helium : quatre cartes sur l’accueil, huit sur la page dédiée, ratio de largeur de l’illustration mesuré à 0,82, huit fonds chargés et décoratifs, filtres avec 4/3/1/8 résultats, ouverture du projet Zen, focus clavier visible et absence de débordement aux largeurs 360, 390, 768, 1366 et 1920 px. Vérification TypeScript réussie. Captures enregistrées dans `.impeccable/review/project-backgrounds-*.png`. Le serveur reste actif.

### zen

Fichier actif : `public/images/projects/backgrounds/zen-landscape.webp`, 1280 × 853 px, 46 104 octets.

Photo : [Casey Horner — « midnight burn », Yosemite Valley](https://unsplash.com/photos/mountain-ranges-at-sunset-K6bXVFkApPY), sous [Unsplash License](https://unsplash.com/license). Le ciel étoilé, les tons bleu ardoise et l’horizon doré remplacent la pellicule ambre. Le fichier initial `zen.webp` est conservé mais n’est plus référencé. La recherche et les droits sont documentés dans `docs/research/zen-background.md`.

Le remplacement a été vérifié sur l’accueil et la page projets, à 1920 et 390 px, avec chargement effectif de l’image et survol fluide. Les empreintes des huit fichiers initiaux sont inchangées : seul le nouvel asset de Zen a été ajouté. Captures : `.impeccable/review/zen-landscape-desktop.png` et `.impeccable/review/zen-landscape-mobile.png`. Vérification TypeScript réussie.

### teamify

Fichier : `public/images/projects/backgrounds/teamify.webp`

Landscape abstract photographic background for a portfolio project card, aspect ratio 3:2. Extreme close-up of pale icy blue and silver translucent rippled glass, sculptural liquid refraction, soft steel blue shadows, broad organic ridges flowing diagonally, tactile studio material and believable reflected daylight. Full-bleed texture filling every edge. Only the background texture, no devices, screens, text, logos, borders or watermark. Center will be covered by an inset project illustration; interesting blue waves visible around outer edges.

### app-analyzer

Fichier : `public/images/projects/backgrounds/app-analyzer.webp`

Landscape abstract photographic background for a portfolio project card, aspect ratio 3:2. Macro dark graphite carbon-black mineral surface with fine irregular metallic crystalline flecks and narrow warm silver fractures, elegant editorial photography, high material detail, directional moody studio light. Full-bleed texture filling every edge, subtly abstract fractured structure. Only background, no computers, screens, typography, neon, logos, borders or watermark. Center will be covered by an inset illustration, so detailed material along the edges.

### lookaroun

Fichier : `public/images/projects/backgrounds/lookaroun.webp`

Landscape abstract photographic background for a portfolio project card, aspect ratio 3:2. Macro close-up of richly colored burnt-orange and terracotta glazed ceramic tiles, irregular handmade surface and thick deep rust grout, polished reflected warm daylight, subtle tactile wavy glazing, bold vibrant editorial photograph. Full-bleed texture filling every edge. Only background, no furniture, computers, screens, text, logos, borders or watermark. Center will be covered by an inset illustration, with glazing and tile seams visible around edges.

### flow-media

Fichier : `public/images/projects/backgrounds/flow-media.webp`

Landscape abstract photographic background for a portfolio project card, 3:2 aspect ratio. Macro study of saffron-yellow translucent resin sheets, softly bent layers with subtle honey gold reflections and ivory negative spaces, tactile physical material photographed in directional warm studio light. Full-bleed organic texture filling every edge. Background only, no devices, text, logos, borders or watermark. Outer edges are most important, center will be covered by a project mockup.

### elecsud-energies

Fichier : `public/images/projects/backgrounds/elecsud-energies.webp`

Landscape abstract photographic background for a portfolio project card, 3:2 aspect ratio. Macro close-up of earthy off-white limestone, chalk and warm beige mineral layers with natural fissures, rough sculptural ridges and directional daylight shadows. Elegant editorial material photography, full-bleed texture, muted warm palette. Background only, no devices, buildings, text, logos, borders or watermark. Interesting tactile stone along outer edges, center will be covered by a project mockup.

### framix

Fichier : `public/images/projects/backgrounds/framix.webp`

Landscape abstract photographic background for a portfolio project card, 3:2 aspect ratio. Macro close-up of forest moss green and pale sage translucent sculptural rippled glass, polished wavy layers and rich shadows, sunlight glancing across edges, elegant tactile editorial material photography. Full-bleed texture filling every edge. Background only, no computers, screens, text, logos, borders or watermark. Outer edges most important, center will be covered by a project mockup.

### lexi-ai

Fichier : `public/images/projects/backgrounds/lexi-ai.webp`

Landscape abstract photographic background for a portfolio project card, 3:2 aspect ratio. Macro photograph of lilac, dusty violet and silver pearlescent satin fabric with broad flowing folds and subtle iridescent sheen, directional soft studio light with rich violet shadows. Full-bleed tactile texture filling every edge, elegant editorial material. Background only, no devices, screens, text, logos, borders or watermark. Visual interest along edges, center will be covered by a project mockup.
