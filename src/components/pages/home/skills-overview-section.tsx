"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Map, Layout, Server, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    icon: <Map size={24} />,
    title: "Développement Full Stack",
    description:
      "Conception et développement d’applications web modernes et performantes avec React, Next.js, Node.js et TypeScript. Mise en place d’architectures claires, maintenables et adaptées à des projets évolutifs.",
  },
  {
    id: "02",
    icon: <Layout size={24} />,
    title: "UI / UX Design",
    description:
      "Conception d’interfaces modernes, accessibles et responsives à partir de maquettes Figma. Attention portée à l’ergonomie, aux parcours utilisateurs et à l’intégration fidèle des designs.",
  },
  {
    id: "03",
    icon: <Database size={24} />,
    title: "API & Architecture",
    description:
      "Conception et intégration d’API robustes et sécurisées avec PostgreSQL, Prisma et TypeScript. Gestion des données, logique métier et optimisation des échanges entre le front-end et le back-end.",
  },
  {
    id: "04",
    icon: <Server size={24} />,
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
      const scrollDistance = trackWidth + titleLeft;

      gsap.fromTo(
        track,
        {
          x: window.innerWidth * 1.5, // Start further to the right
        },
        {
          x: () => -(trackWidth - window.innerWidth + titleLeft), // End aligned with title
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollDistance}`,
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
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20">
          <div className="inline-block mb-6">
            <span
              className="text-sm uppercase tracking-[0.2em] font-light"
              style={{ color: "#008366" }}
            >
              Services
            </span>
          </div>

          <h2
            className="text-5xl md:text-7xl font-light leading-[1.1] mb-8"
            style={{ color: "#008366" }}
            ref={titleRef}
          >
            Mes Compétences
          </h2>

          <div
            className="w-20 h-px mb-8"
            style={{ backgroundColor: "#008366" }}
          ></div>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl font-light leading-relaxed">
            De la conception à la mise en production, j&apos;accorde autant
            d&apos;importance à la logique, à l&apos;interface qu&apos;à la
            performance. Ces compétences traduisent ma façon de concevoir des
            solutions web fiables, claires et centrées sur l&apos;utilisateur.
          </p>
        </div>
      </div>

      <div className="w-full h-[500px] flex items-center">
        <div ref={servicesTrack} className="flex">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item relative flex flex-col p-8 md:p-10 lg:p-12 min-h-[400px] w-[500px] border-y border-r border-gray-300 hover:bg-gray-50 transition-colors duration-500 group"
            >
              {/* Number, Icon, Title, Description */}
              <div className="absolute top-4 right-4 text-gray-400 font-light text-xl group-hover:text-black transition-colors">
                {service.id}
              </div>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#008366] border border-[#008366] text-white transition-transform duration-500 group-hover:scale-105 group-hover:rotate-12">
                {service.icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-bricolage-grotesque leading-tight w-[95%]">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
