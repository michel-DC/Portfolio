"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  date: string;
  description: string;
  tags: string[];
  logo: string;
}

const experiences: Experience[] = [
  {
    company: "Éditions Stavnet",
    role: "Stage Développeur Full-Stack",
    date: "Avril 2026 – Aout 2026",
    description:
      "Développement du site e-commerce de la maison d'édition et intégration des solutions de paiement Stripe et PayPal.",
    tags: [
      "Wordpress",
      "PHP",
      "MySQL",
      "JavaScript",
      "Stripe",
      "PayPal",
      "SSH",
    ],
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQF9SncjId8glg/company-logo_200_200/B4EZ4sBJcWKgAE-/0/1778854959130/stavnet_editions_logo?e=2147483647&v=beta&t=CNsCA2HvB1hqAz-6jRRi6TaSLM45Lo5cNO46fAIpo8o",
  },
  {
    company: "BUMPS Agency",
    role: "Développeur Full-Stack",
    date: "Juillet 2025 – Sept. 2025",
    description:
      "Développement d'applications web complexes et intégration d'IA. Collaboration étroite avec les équipes design pour une fidélité pixel-perfect.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "OpenAI",
      "Figma",
      "Scrum",
    ],
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQFOiNdWiuwhJA/company-logo_200_200/company-logo_200_200/0/1678488142368/bumps_logo?e=2147483647&v=beta&t=9NGPM8hOwqX36y5gcBsW95A38q3FlntWJdz84jstTmg",
  },
  {
    company: "Lookaroun",
    role: "Stage Développeur Front-End",
    date: "Juin 2025 – Aout 2025",
    description:
      "Intégration de maquettes et optimisation SEO. Participation active aux rituels agiles et amélioration de la performance web.",
    tags: ["React.js", "Tailwind CSS", "SEO", "Performance", "Agile"],
    logo: "https://www.lookaroun.com/assets/LogoFooter-BV62Lkq2.png",
  },
];

export default function ExperienceSection(): React.JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="w-full py-24 bg-transparent text-black"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-16 md:mb-24 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-medium tracking-tight font-bricolage-grotesque"
          >
            Des expériences qui traduisent une{" "}
            <span className="text-[#008366] italic font-serif">
              montée en compétences
            </span>{" "}
            progressive et orientée terrain.
          </motion.h2>
        </div>

        <div className="flex flex-col border-t border-black">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative border-b border-black/20 transition-colors duration-500 hover:border-black"
            >
              <div className="py-10 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start relative z-10">
                <div className="md:col-span-3">
                  <span className="text-lg md:text-2xl font-medium text-[#008366] md:text-gray-400 md:group-hover:text-[#008366] transition-colors duration-300">
                    {exp.date}
                  </span>
                </div>

                <div className="md:col-span-5 flex items-start gap-5 md:gap-8">
                  <div className="relative size-12 md:size-20 overflow-hidden flex-shrink-0 flex items-center justify-center md:group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-5xl font-bold font-bricolage-grotesque mb-1 md:mb-2 md:group-hover:translate-x-2 transition-transform duration-300">
                      {exp.company}
                    </h3>
                    <p className="text-lg md:text-xl text-gray-600 md:group-hover:text-black transition-colors">
                      {exp.role}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col justify-between h-full gap-4 md:gap-6">
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-50 md:bg-white border border-gray-200 rounded-full text-[10px] md:text-xs uppercase tracking-wide font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-10 right-0 md:hidden">
                  <ArrowUpRight className="size-6 text-[#008366]/40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
