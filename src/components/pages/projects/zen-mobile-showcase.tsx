import Image from "next/image";

interface ZenScreen {
  src: string;
  label: string;
  description: string;
}

interface ZenMobileShowcaseProps {
  images: string[];
}

const SCREEN_DETAILS: Omit<ZenScreen, "src">[] = [
  {
    label: "Accueil",
    description: "Une entrée immédiate dans la cinémathèque personnelle.",
  },
  {
    label: "Catalogue",
    description: "Les films vus, à voir et favoris réunis au même endroit.",
  },
  {
    label: "Recherche",
    description: "Une exploration rapide par titre, cinéaste ou ambiance.",
  },
  {
    label: "Fiche film",
    description: "L’affiche, le casting et les détails essentiels du film.",
  },
];

function PhoneFrame({ screen, priority }: { screen: ZenScreen; priority: boolean }) {
  return (
    <figure className="group flex flex-col items-center">
      <div className="relative w-full max-w-[330px]">
        <span className="absolute -left-[3px] top-[18%] h-[8%] w-[4px] rounded-l-full bg-neutral-700" />
        <span className="absolute -left-[3px] top-[29%] h-[13%] w-[4px] rounded-l-full bg-neutral-700" />
        <span className="absolute -right-[3px] top-[25%] h-[18%] w-[4px] rounded-r-full bg-neutral-700" />
        <div className="relative aspect-[430/932] overflow-hidden rounded-[3.2rem] bg-neutral-950 p-[7px] shadow-[0_28px_70px_-22px_rgba(15,23,42,0.55)] ring-1 ring-neutral-400 transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <div className="relative h-full w-full overflow-hidden rounded-[2.75rem] bg-white">
            <div className="absolute inset-x-0 bottom-0 top-6">
              <Image
                src={screen.src}
                alt={`Zen sur iPhone 15 Pro Max — ${screen.label}`}
                fill
                className="object-fill"
                sizes="(max-width: 768px) 82vw, (max-width: 1280px) 36vw, 22vw"
                priority={priority}
                quality={90}
              />
            </div>
            <span className="absolute left-1/2 top-3 h-[25px] w-[84px] -translate-x-1/2 rounded-full bg-black shadow-sm" />
          </div>
        </div>
      </div>
      <figcaption className="mt-7 max-w-[310px] text-center">
        <h3 className="text-xl font-bold text-neutral-950">{screen.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {screen.description}
        </p>
      </figcaption>
    </figure>
  );
}

export function ZenProjectPreview() {
  const previewScreens = [
    "/images/projects/zen/screens/catalog.png",
    "/images/projects/zen/screens/home.png",
    "/images/projects/zen/screens/movie.png",
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#eee3d2]">
      <div className="absolute inset-x-0 top-[12%] flex items-start justify-center gap-[3%] px-[8%]">
        {previewScreens.map((src, index) => (
          <div
            key={src}
            className={`relative aspect-[430/932] w-[30%] overflow-hidden rounded-[1.25rem] bg-neutral-950 p-[3px] shadow-xl ${
              index === 0 ? "rotate-[-7deg] translate-y-[9%]" : index === 2 ? "rotate-[7deg] translate-y-[9%]" : "z-10"
            }`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.05rem] bg-white">
              <div className="absolute inset-x-0 bottom-0 top-[2.5%]">
                <Image
                  src={src}
                  alt="Aperçu mobile de Zen"
                  fill
                  className="object-fill"
                  sizes="20vw"
                  quality={90}
                />
              </div>
              <span className="absolute left-1/2 top-[2%] h-[3%] w-[28%] -translate-x-1/2 rounded-full bg-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ZenMobileShowcase({ images }: ZenMobileShowcaseProps) {
  const screens = images.map((src, index) => ({
    src,
    ...SCREEN_DETAILS[index],
  }));

  return (
    <section
      aria-label="Zen sur iPhone 15 Pro Max"
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
        {screens.map((screen, index) => (
          <PhoneFrame key={screen.src} screen={screen} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
