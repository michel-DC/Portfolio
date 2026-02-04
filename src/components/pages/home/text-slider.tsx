"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";

export default function TextSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animation de défilement infini
      gsap.to(sliderRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    },
    { scope: sliderRef },
  );

  return (
    <div className="w-full overflow-hidden bg-transparent py-24 md:py-32">
      <div ref={sliderRef} className="flex w-fit whitespace-nowrap">
        <TextItem />
        <TextItem />
      </div>
    </div>
  );
}

const TextItem = () => {
  return (
    <div className="flex items-center">
      <span className="px-4 text-[10vw] font-black leading-none tracking-normal text-[#181717] uppercase">
        Développeur Fullstack
      </span>
      <Star className="mx-4 h-[6vw] w-[6vw] fill-[#008366] text-[#008366]" />
      <span className="px-4 text-[10vw] font-black leading-none tracking-normal text-[#181717] uppercase">
        UI & UX Designer
      </span>
      <Star className="mx-4 h-[6vw] w-[6vw] fill-[#008366] text-[#008366]" />
    </div>
  );
};
