"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Props {
  images: string[];
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProjectImagesCarousel({
  images,
  name,
  className = "",
  style,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Log des propriétés initiales
      console.log("[ProjectImagesCarousel] Initialisation", {
        images,
        imagesCount: images?.length || 0,
        name,
        className,
      });

      // Log des chemins d'images
      console.log(
        "[ProjectImagesCarousel] Chemins des images:",
        images?.map((img, idx) => ({
          index: idx,
          path: img,
        }))
      );

      if (!outerRef.current || !trackRef.current) {
        console.warn("[ProjectImagesCarousel] Références manquantes", {
          outerExists: !!outerRef.current,
          trackExists: !!trackRef.current,
        });
        return;
      }

      const outer = outerRef.current;
      const track = trackRef.current;
      const trackStyles = getComputedStyle(track);
      const trackChildren = track.children;

      // Log des informations détaillées du DOM
      console.log("[ProjectImagesCarousel] État du DOM", {
        outer: {
          width: outer.clientWidth,
          height: outer.clientHeight,
          classes: outer.className,
        },
        track: {
          width: track.clientWidth,
          height: track.clientHeight,
          childrenCount: trackChildren.length,
          animation: trackStyles.animationName,
          transform: trackStyles.transform,
        },
        viewport: {
          width: window.innerWidth,
          scrollX: window.scrollX,
        },
      });

      // Vérification des images chargées
      const imageElements = track.getElementsByTagName("img");
      console.log("[ProjectImagesCarousel] État des images", {
        totalImages: imageElements.length,
        loadedImages: Array.from(imageElements).map((img: any) => ({
          src: img.src,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          currentWidth: img.offsetWidth,
          currentHeight: img.offsetHeight,
        })),
      });

      if (!trackStyles.animationName || trackStyles.animationName === "none") {
        console.warn(
          "[ProjectImagesCarousel] Animation non détectée - Vérification des styles"
        );
      }
    } catch (err) {
      console.error("[ProjectImagesCarousel] Erreur lors du debug:", err);
    }
  }, [images, name, className]);

  if (!images || images.length === 0) {
    console.warn("[ProjectImagesCarousel] Aucune image fournie");
    return null;
  }

  console.log("[ProjectImagesCarousel] Préparation du rendu", {
    nombreImages: images.length,
    modeAffichage: images.length === 1 ? "Image unique" : "Carousel",
    imagesDoublées: images.length > 1 ? [...images, ...images].length : "N/A",
  });

  if (images.length === 1) {
    return (
      <div
        ref={outerRef}
        className={
          "relative overflow-hidden mb-10 flex items-center justify-center" +
          (className ? ` ${className}` : "")
        }
        style={style}
      >
        <div className="relative flex items-center justify-center">
          <Image
            src={images[0]}
            alt={name + " image principale"}
            width={1200}
            height={800}
            className="shadow-lg rounded-sm"
            style={{
              width: "60%",
              height: "auto",
              maxWidth: "60%",
            }}
          />
        </div>
      </div>
    );
  }

  const allImages = [...images, ...images];

  return (
    <div
      ref={outerRef}
      className={
        "relative overflow-hidden mb-10" + (className ? ` ${className}` : "")
      }
      style={style}
    >
      <div
        ref={trackRef}
        className="flex flex-nowrap items-center gap-8 portfolio-animate-infinite-scroll"
        style={{
          width: "fit-content",
        }}
      >
        {allImages.map((img, idx) => (
          <div
            key={img + idx}
            className="relative flex-shrink-0"
            style={{
              width: "800px",
              height: "500px",
              marginRight: "2rem",
            }}
          >
            <Image
              src={img}
              alt={name + " image " + ((idx % images.length) + 1)}
              fill
              className="shadow-lg rounded-sm object-contain"
              sizes="800px"
              priority={idx === 0}
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                console.log(
                  `[ProjectImagesCarousel] Image chargée (${idx + 1}/${
                    images.length
                  })`,
                  {
                    src: img,
                    naturalSize: {
                      width: target.naturalWidth,
                      height: target.naturalHeight,
                    },
                    currentSize: {
                      width: target.width,
                      height: target.height,
                    },
                    complete: target.complete,
                  }
                );
              }}
              onError={(e) => {
                console.error(
                  `[ProjectImagesCarousel] Erreur de chargement (${idx + 1}/${
                    images.length
                  })`,
                  {
                    src: img,
                    error: e,
                  }
                );
              }}
            />
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes portfolio-infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .portfolio-animate-infinite-scroll {
          animation: portfolio-infinite-scroll 70s linear infinite;
        }
        .overflow-hidden:hover .portfolio-animate-infinite-scroll {
          animation-play-state: paused;
        }
        @media (min-width: 1024px) {
          .max-w-7xl {
            max-width: 120rem !important;
          }
        }
      `}</style>
    </div>
  );
}
