"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Map, Layout, Server, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    icon: <Map size={32} />,
    title: "Développement Full Stack",
    description:
      "Conception et développement d’applications web modernes et performantes avec React, Next.js, Node.js et TypeScript. Mise en place d’architectures claires, maintenables et adaptées à des projets évolutifs.",
  },
  {
    id: "02",
    icon: <Layout size={32} />,
    title: "UI / UX Design",
    description:
      "Conception d’interfaces modernes, accessibles et responsives à partir de maquettes Figma. Attention portée à l’ergonomie, aux parcours utilisateurs et à l’intégration fidèle des designs.",
  },
  {
    id: "03",
    icon: <Database size={32} />,
    title: "API & Architecture",
    description:
      "Conception et intégration d’API robustes et sécurisées avec PostgreSQL, Prisma et TypeScript. Gestion des données, logique métier et optimisation des échanges entre le front-end et le back-end.",
  },
  {
    id: "04",
    icon: <Server size={32} />,
    title: "Performance & Qualité Web",
    description:
      "Optimisation des performances, du référencement et de l’accessibilité des applications web. Mise en œuvre des bonnes pratiques front-end pour garantir des interfaces rapides, fiables et durables.",
  },
];

export default function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);
  const servicesTrack = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const track = servicesTrack.current;
    const title = titleRef.current;
    const containerEl = container.current;

    if (!track || !title || !containerEl) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée du titre (toujours actif)
      gsap.from(title, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      const mm = gsap.matchMedia();

      // Desktop : Horizontal Scroll
      mm.add("(min-width: 768px)", () => {
        const services = Array.from(track.children);
        if (services.length === 0) return;

        const trackWidth = services.reduce(
          (acc, service) => acc + (service as HTMLElement).offsetWidth,
          0
        );
        track.style.width = `${trackWidth}px`;
        track.style.flexDirection = "row"; // Force row on desktop

        const titleLeft = title.getBoundingClientRect().left;
        const scrollDuration = trackWidth;

        gsap.fromTo(
          track,
          {
            x: window.innerWidth * 0.5,
          },
          {
            x: () => -(trackWidth - window.innerWidth + titleLeft),
            ease: "none",
            scrollTrigger: {
              trigger: containerEl,
              pin: true,
              scrub: 1,
              end: () => `+=${scrollDuration}`,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        services.forEach((service) => {
          gsap.from(service, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: service,
              containerAnimation: gsap.getTweensOf(track)[0],
              start: "left 90%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      // Mobile : Vertical Stack (No animations, purely static layout)
      mm.add("(max-width: 767px)", () => {
        track.style.width = "100%";
        track.style.transform = "none";
        track.style.flexDirection = "column";
        
        // Reset any properties GSAP might have set if resizing from desktop
        const services = Array.from(track.children);
        services.forEach((service) => {
             gsap.set(service, { clearProps: "all" });
        });
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full text-black overflow-hidden pt-20"
    >
      <div className="max-w-7xl relative px-6 md:px-16 mb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-450 mx-auto w-full">
          <h2
            className="text-3xl md:text-5xl font-medium tracking-tight font-bricolage-grotesque"
            ref={titleRef}
          >
            Ces compétences traduisent ma façon de concevoir des{" "}
            <span className="text-[#008366] italic font-serif">
              solutions web fiables
            </span>{" "}
            claires et centrées sur l&apos;utilisateur.
          </h2>
        </div>
      </div>

      <div className="w-full md:h-150 flex items-start md:items-center">
        <div ref={servicesTrack} className="flex flex-col md:flex-row w-full md:w-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-item relative flex flex-col p-8 md:p-10 lg:p-12 min-h-auto md:min-h-125 w-full md:w-125 border-b border-gray-400 md:border-y md:border-r md:border-b transition-colors duration-500 group overflow-hidden ${
                index === 0 ? "md:border-l border-t" : ""
              }`}
            >
              {/* Rayures par défaut */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-40" 
                style={{
                  backgroundImage: `repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.08) 0px, rgba(0, 0, 0, 0.08) 1px, transparent 1px, transparent 10px)`
                }}
              />
              
              {/* Number, Icon, Title, Description */}
              <div className="absolute top-4 right-4 text-gray-400 font-light text-xl group-hover:text-black transition-colors">
                {service.id}
              </div>
              <div className="mb-8 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#008366] border border-[#008366] text-white transition-transform duration-500 shrink-0">
                {service.icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-bricolage-grotesque leading-tight w-[95%] min-h-auto md:min-h-20">
                {service.title}
              </h3>

              <div className="flex-1 flex mb-4 md:mb-0">
                <div className="w-full h-px bg-gray-500"></div>
              </div>

              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
