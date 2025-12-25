"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "E-Commerce Dashboard",
    category: "Web Application",
    description:
      "Un tableau de bord analytique complet pour les plateformes e-commerce, permettant de suivre les ventes en temps réel, la gestion des stocks et les performances marketing.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    links: {
      demo: "#",
      github: "#",
    },
    color: "bg-blue-600",
  },
  {
    id: "02",
    title: "AI Content Generator",
    category: "SaaS Platform",
    description:
      "Une application SaaS utilisant l'intelligence artificielle pour générer du contenu marketing optimisé pour le SEO, avec une interface éditoriale riche.",
    tags: ["React", "Node.js", "OpenAI API", "Stripe"],
    links: {
      demo: "#",
      github: "#",
    },
    color: "bg-purple-600",
  },
  {
    id: "03",
    title: "Immersive Portfolio",
    category: "Creative Development",
    description:
      "Un portfolio personnel interactif mettant en œuvre des animations 3D et des transitions fluides pour une expérience utilisateur immersive.",
    tags: ["Three.js", "GSAP", "React Fiber", "WebGL"],
    links: {
      demo: "#",
      github: "#",
    },
    color: "bg-orange-500",
  },
];

export default function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Projects Animation
      const projectCards = gsap.utils.toArray(".project-card");
      projectCards.forEach((card: any, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full bg-[#1E1E1E] text-white py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-[#D1F840]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2
              ref={titleRef}
              className="text-5xl md:text-7xl font-bricolage-grotesque leading-[0.9] mb-6"
            >
              Projets <br />
              <span className="text-[#D1F840]">Sélectionnés</span>
            </h2>
          </div>
          <div className="md:w-1/3">
            <p className="text-gray-400 text-lg">
              Une collection de travaux récents mettant en avant mes compétences
              en développement full-stack et en design d'interface.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-16 md:gap-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-16 items-center`}
            >
              {/* Project Visual (Placeholder) */}
              <div className="w-full md:w-3/5 aspect-video relative rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-[#D1F840]/50 transition-colors duration-500">
                <div
                  className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${project.color}`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500 font-light text-xl">
                    Aperçu du projet {project.id}
                  </span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <Link
                    href={project.links.demo}
                    className="p-4 bg-[#D1F840] text-black rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label="Voir la démo"
                  >
                    <ArrowUpRight size={24} />
                  </Link>
                  <Link
                    href={project.links.github}
                    className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label="Voir le code"
                  >
                    <Github size={24} />
                  </Link>
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full md:w-2/5 flex flex-col items-start">
                <span className="text-[#D1F840] font-mono mb-4 text-sm tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 font-bricolage-grotesque group-hover:text-[#D1F840] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-gray-700 text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.links.demo}
                  className="inline-flex items-center gap-2 text-white hover:text-[#D1F840] transition-colors duration-300 border-b border-transparent hover:border-[#D1F840] pb-1"
                >
                  Voir le projet <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link
            href="#"
            className="inline-block px-8 py-4 bg-transparent border border-[#D1F840] text-[#D1F840] rounded-full hover:bg-[#D1F840] hover:text-black transition-all duration-300 font-semibold"
          >
            Voir tous les projets
          </Link>
        </div>
      </div>
    </section>
  );
}
