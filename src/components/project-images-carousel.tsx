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
      if (!outerRef.current || !trackRef.current) {
        return;
      }

      const outer = outerRef.current;
      const track = trackRef.current;
      const trackStyles = getComputedStyle(track);
      const trackChildren = track.children;

      const imageElements = track.getElementsByTagName("img");

      if (!trackStyles.animationName || trackStyles.animationName === "none") {
      }
    } catch (err) {}
  }, [images, name, className]);

  if (!images || images.length === 0) {
    return null;
  }

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
              onLoad={() => {}}
              onError={() => {}}
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
