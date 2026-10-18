import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import homeMockup from "../../../../public/images/projects/zen/screens/home.png";
import catalogMockup from "../../../../public/images/projects/zen/screens/catalog.png";
import searchMockup from "../../../../public/images/projects/zen/screens/search.png";
import movieMockup from "../../../../public/images/projects/zen/screens/movie.png";
import topMockup from "../../../../public/images/projects/zen/screens/top.png";

interface ZenScreen {
  image: StaticImageData;
  label: string;
  description: string;
}

interface ZenScreenFigureProps {
  screen: ZenScreen;
  priority: boolean;
}

const zenScreens: ZenScreen[] = [
  {
    image: homeMockup,
    label: "Accueil",
    description: "Une entrée immédiate dans la cinémathèque personnelle.",
  },
  {
    image: catalogMockup,
    label: "Catalogue",
    description: "Les films vus, à voir et favoris réunis au même endroit.",
  },
  {
    image: searchMockup,
    label: "Recherche",
    description: "Une exploration rapide par titre, cinéaste ou ambiance.",
  },
  {
    image: movieMockup,
    label: "Fiche film",
    description: "L’affiche, le casting et les détails essentiels du film.",
  },
  {
    image: topMockup,
    label: "Top personnel",
    description: "Trois emplacements pour composer son classement de films.",
  },
];

function ZenScreenFigure({ screen, priority }: ZenScreenFigureProps): React.JSX.Element {
  return (
    <figure className="group flex flex-col items-center">
      <Image
        src={screen.image}
        alt={`Zen sur mobile — ${screen.label}`}
        className="h-auto w-full max-w-[330px] transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-2"
        sizes="(max-width: 767px) calc(100vw - 80px), 330px"
        priority={priority}
        quality={90}
      />
      <figcaption className="mt-7 max-w-[310px] text-center">
        <h3 className="text-xl font-bold text-neutral-950">{screen.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {screen.description}
        </p>
      </figcaption>
    </figure>
  );
}

export function ZenProjectPreview(): React.JSX.Element {
  const previewScreens = [catalogMockup, homeMockup, movieMockup];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#eee3d2]">
      <div className="absolute inset-x-0 top-[12%] flex items-start justify-center gap-[3%] px-[8%]">
        {previewScreens.map((image, index) => (
          <div
            key={image.src}
            className={cn(
              "relative w-[30%]",
              index === 0 && "translate-y-[9%] rotate-[-7deg]",
              index === 1 && "z-10",
              index === 2 && "translate-y-[9%] rotate-[7deg]",
            )}
          >
            <Image
              src={image}
              alt="Aperçu mobile de Zen"
              className="h-auto w-full"
              sizes="(max-width: 767px) 22vw, 12vw"
              quality={90}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ZenMobileShowcase(): React.JSX.Element {
  return (
    <section
      aria-label="Zen sur mobile"
      className="overflow-hidden rounded-[2rem] bg-[#f2e9dc] px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
        <h2 className="text-3xl font-bold tracking-[-0.025em] text-neutral-950 md:text-5xl">
          Toute une cinémathèque dans la poche.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
          Une interface pensée pour l’iPhone, de la découverte d’un film à la
          conversation qui suit le générique.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-24">
        {zenScreens.map((screen, index) => (
          <ZenScreenFigure key={screen.image.src} screen={screen} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
