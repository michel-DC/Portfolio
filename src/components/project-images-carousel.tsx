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
      console.log("[ProjectImagesCarousel] mount", {
        imagesCount: images?.length || 0,
        name,
        className,
        hasOuterRef: !!outerRef.current,
        hasTrackRef: !!trackRef.current,
      });

      if (!outerRef.current || !trackRef.current) {
        console.warn("[ProjectImagesCarousel] refs manquants", {
          outerExists: !!outerRef.current,
          trackExists: !!trackRef.current,
        });
        return;
      }

      const outer = outerRef.current;
      const track = trackRef.current;

      const trackStyles = getComputedStyle(track);

      console.log("[ProjectImagesCarousel] DOM info", {
        outerClient: { w: outer.clientWidth, h: outer.clientHeight },
        trackClient: { w: track.clientWidth, h: track.clientHeight },
        trackAnimationName: trackStyles.animationName,
      });

      if (!trackStyles.animationName || trackStyles.animationName === "none") {
        console.warn(
          "[ProjectImagesCarousel] Aucune animation détectée sur la piste. Fallback local actif."
        );
      }
    } catch (err) {
      console.error("[ProjectImagesCarousel] erreur debug:", err);
    }
  }, [images, name, className]);

  if (!images || images.length === 0) {
    console.warn("[ProjectImagesCarousel] Aucune image fournie");
    return null;
  }

  const viewportHeight = "560px";

  if (images.length === 1) {
    return (
      <div
        ref={outerRef}
        className={
          "relative w-full overflow-hidden mb-10 flex items-center justify-center" +
          (className ? ` ${className}` : "")
        }
        style={{ height: viewportHeight, ...style }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={images[0]}
            alt={name + " image principale"}
            fill
            className="object-contain"
            sizes="100vw"
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
        "w-full max-w-full sm:max-w-7xl mx-auto overflow-hidden mb-10" +
        (className ? ` ${className}` : "")
      }
      style={{ height: viewportHeight, ...style }}
    >
      <div
        ref={trackRef}
        className="flex flex-nowrap items-center portfolio-animate-infinite-scroll"
      >
        {allImages.map((img, idx) => (
          <div
            key={img + idx}
            className="marquee-item relative flex items-center justify-center shrink-0"
            style={{
              width: "70vw",
              maxWidth: 1200,
              height: viewportHeight,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={name + " image " + ((idx % images.length) + 1)}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 70vw, 1200px"
                priority={idx === 0}
              />
            </div>
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
          animation: portfolio-infinite-scroll 12s linear infinite;
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
