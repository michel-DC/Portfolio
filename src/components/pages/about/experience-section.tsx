"use client";

import React, { useRef, useLayoutEffect, JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  company: string;
  role: string;
  date: string;
  description: string;
}

const experiences: Experience[] = [
  {
    company: "Freelance",
    role: "Développeur Front-End (Freelance)",
    date: "Décembre 2025 – Aujourd'hui",
    description:
      "Analyse du brief client, échanges réguliers avec le client pour cadrer et ajuster le projet. Conception et développement de mini-sites front-end sans back-end, intégration d'interfaces visuelles soignées, responsives et optimisées. Livraison des projets finalisés avec remise des livrables et accompagnement client.",
  },
  {
    company: "BUMPS Agency",
    role: "Développeur Full-Stack (Freelance)",
    date: "Juillet 2025 – Septembre 2025",
    description:
      "Développement web principalement en React, TypeScript et Next.js pour plusieurs entreprises. Intégration d'IA via les assistants OpenAI et Perplexity via des fonctions serverless supabase. Réalisation d'intégrations front-end à partir de maquettes Figma.",
  },
  {
    company: "Lookaroun",
    role: "Stage Développeur Front-End",
    date: "Juin 2025 – Aout 2025",
    description:
      "Intégration de maquettes Figma en React.JS, développement d'interfaces dynamiques, design responsive, optimisation du référencement naturel et des performances, collaboration avec l'équipe de développement.",
  },
];

export default function ExperienceSection(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animation de la ligne verticale qui descend
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      // Animation des items (fade in + slide)
      const items = gsap.utils.toArray<Element>(".timeline-item");
      items.forEach((item) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-30 bg-white text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 relative">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 font-bricolage-grotesque">
            Mon expérience <span className="text-[#008366] italic font-serif">professionnelle</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 top-0">
            <div
              ref={lineRef}
              className="w-full bg-[#008366] absolute top-0 left-0"
              style={{ height: "0%" }}
            ></div>
          </div>

          {/* Items */}
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item flex flex-col md:flex-row items-center justify-between w-full relative ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div
                  className={`w-full md:w-[45%] ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  } mb-8 md:mb-0`}
                >
                  <h3 className="text-4xl md:text-5xl font-bold font-bricolage-grotesque mb-2">
                    {exp.company}
                  </h3>
                  <p className="text-lg text-gray-500 font-light mb-4">
                    {exp.role}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg max-w-lg mx-auto md:mx-0 inline-block">
                    {exp.description}
                  </p>
                  <div
                    className={`mt-4 text-sm font-medium text-[#008366] uppercase tracking-wider`}
                  >
                    {exp.date}
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#008366] border-4 border-[#F3F4F6] z-10 shadow-sm"></div>
                </div>

                {/* Empty Side (for balance) */}
                <div className="w-full md:w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
