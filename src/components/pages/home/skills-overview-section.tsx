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

    if (!track || !title) return;

    const services = Array.from(track.children);
    if (services.length === 0) return;

    const trackWidth = services.reduce(
      (acc, service) => acc + (service as HTMLElement).offsetWidth,
      0
    );
    track.style.width = `${trackWidth}px`;

    const titleLeft = title.getBoundingClientRect().left;

    const ctx = gsap.context(() => {
      // Animation d'entrée du titre
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

      // Use trackWidth for the scroll duration to ensure it feels natural
      const scrollDuration = trackWidth;

      gsap.fromTo(
        track,
        {
          x: window.innerWidth * 0.5, // Start closer to viewport
        },
        {
          x: () => -(trackWidth - window.innerWidth + titleLeft), // End aligned with title
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: 1,
            // Use a fixed distance based on track width for the scroll interaction duration
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
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full text-black overflow-hidden pt-20"
    >
      <div className="max-w-7xl relative px-16 mb-12">
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

      <div className="w-full h-150 flex items-center">
        <div ref={servicesTrack} className="flex">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-item relative flex flex-col p-8 md:p-10 lg:p-12 min-h-125 w-125 border-y border-r border-b border-gray-400 hover:bg-gray-50 transition-colors duration-500 group ${
                index === 0 ? "border-l" : ""
              }`}
            >
              {/* Number, Icon, Title, Description */}
              <div className="absolute top-4 right-4 text-gray-400 font-light text-xl group-hover:text-black transition-colors">
                {service.id}
              </div>
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#008366] border border-[#008366] text-white transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-bricolage-grotesque leading-tight w-[95%] min-h-20">
                {service.title}
              </h3>

              <div className="flex-1 flex">
                <div className="w-full h-px bg-gray-500"></div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
