"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Palette,
  Laptop,
  Search,
  Map,
  Layout,
  Server,
  Database,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    icon: <Map size={24} />,
    title: "Développement Full Stack",
    description:
      "Conception d'applications web scalables et performantes avec Next.js, React, Node.js et TypeScript, reposant sur des architectures robustes.",
  },
  {
    id: "02",
    icon: <Layout size={24} />,
    title: "UI/UX Design & Frontend",
    description:
      "Création d'interfaces modernes et réactives avec Figma, Tailwind CSS et Framer Motion. Conception d'expériences intuitives et épurées.",
  },
  {
    id: "03",
    icon: <Server size={24} />,
    title: "Développement SaaS",
    description:
      "Développement de solutions SaaS complètes avec gestion d'abonnements, intégration Stripe et architecture multi-tenant.",
  },
  {
    id: "04",
    icon: <Database size={24} />,
    title: "API & Architecture",
    description:
      "Conception d'API performantes et sécurisées avec PostgreSQL, Prisma et MongoDB. Optimisation technique et scalabilité.",
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

    let ctx = gsap.context(() => {
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
      className="relative w-full bg-white text-black overflow-hidden"
    >
      <div className="pt-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <h2
              ref={titleRef}
              className="section-title text-5xl md:text-7xl font-bricolage-grotesque leading-[0.9]"
            >
              Mes Services
            </h2>
            <p className="section-title text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              J'accompagne les entreprises et les startups dans la création de
              produits digitaux d'exception, alliant performance technique et
              design impactant.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[500px] flex items-center">
        <div ref={servicesTrack} className="flex">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item relative flex flex-col p-8 md:p-10 lg:p-12 min-h-[400px] w-[500px] border-y border-r border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-500 group"
            >
              {/* Number, Icon, Title, Description */}
              <div className="absolute top-4 right-4 text-gray-400 font-light text-xl group-hover:text-black transition-colors">
                {service.id}
              </div>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#D1F840] border border-[#bce325] text-black transition-transform duration-500 group-hover:scale-105 group-hover:rotate-12">
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
