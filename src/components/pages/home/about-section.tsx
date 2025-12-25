"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full bg-[#1E1E1E] pb-24 pt-32 text-white mt-60"
    >
      <div className="absolute -top-[240px] left-0 right-0 h-[242px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[#1E1E1E] rounded-[50%_50%_0_0/100%_100%_0_0]" />
      </div>

      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center relative z-10">
        <h2 className="about-text mb-12 max-w-5xl text-5xl font-medium leading-tight md:text-5xl">
          Je suis Michel, développeur full stack, spécialisé dans la création
          d&apos;expériences digitales performantes et scalables.
        </h2>

        <p className="about-text mb-16 max-w-6xl text-3xl md:text-3xl">
          Je me spécialise dans le développement de plateformes SaaS, de
          produits pilotés par l&apos;IA et d&apos;expériences web interactives
          3D en utilisant des technologies comme Next.js, Node.js et Three.js.
        </p>

        <div className="about-text flex items-center">
          <button className="flex h-12 items-center gap-2 rounded-l-full bg-[#D1F840] pl-8 pr-4 text-black font-semibold transition-transform hover:scale-105 hover:z-10">
            À propos de moi
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-r-full bg-[#D1F840] text-black transition-transform hover:scale-110 hover:z-10"
            aria-label="En savoir plus"
          >
            <ArrowUpRight size={24} />
          </button>
        </div>

        <div className="about-text mt-auto mb-40 hidden w-full max-w-5xl justify-between text-md md:flex">
          <div>↓ Scrollez pour explorer</div>
          <div>Ma petite histoire</div>
        </div>
      </div>
    </section>
  );
}
