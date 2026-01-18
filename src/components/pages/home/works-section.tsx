"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  date: string;
  description: string;
  tags: string[];
}

const experiences: Experience[] = [
  {
    company: "Freelance",
    role: "Développeur Front-End",
    date: "2025 – Présent",
    description:
      "Conception de sites web sur mesure et développement d'interfaces réactives. Accompagnement client de la phase de design à la mise en production.",
    tags: ["React", "Next.js", "Tailwind", "GSAP"],
  },
  {
    company: "BUMPS Agency",
    role: "Développeur Full-Stack",
    date: "Juillet 2025 – Sept. 2025",
    description:
      "Développement d'applications web complexes et intégration d'IA. Collaboration étroite avec les équipes design pour une fidélité pixel-perfect.",
    tags: ["TypeScript", "Supabase", "OpenAI", "Figma"],
  },
  {
    company: "Lookaroun",
    role: "Stage Développeur Front",
    date: "Juin 2025 – Aout 2025",
    description:
      "Intégration de maquettes et optimisation SEO. Participation active aux rituels agiles et amélioration de la performance web.",
    tags: ["React", "SEO", "Performance", "Agile"],
  },
];

export default function WorksSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section ref={containerRef} className="w-full py-24 bg-white text-black">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
              {/* Header */}
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
      
              {/* List Container */}
        <div className="flex flex-col border-t border-black">
          {experiences.map((exp, index) => (
            <div key={index} className="group relative border-b border-black/20 transition-colors duration-500 hover:border-black">
              <div className="py-10 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start relative z-10">

                {/* Date - Col 1 */}
                <div className="md:col-span-3">
                  <span className="text-lg md:text-2xl font-medium text-[#008366] md:text-gray-400 md:group-hover:text-[#008366] transition-colors duration-300">
                    {exp.date}
                  </span>
                </div>

                {/* Company & Role - Col 2 */}
                <div className="md:col-span-5">
                  <h3 className="text-2xl md:text-5xl font-bold font-bricolage-grotesque mb-1 md:mb-2 md:group-hover:translate-x-2 transition-transform duration-300">
                    {exp.company}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 md:group-hover:text-black transition-colors">{exp.role}</p>
                </div>

                {/* Description - Col 3 */}
                <div className="md:col-span-4 flex flex-col justify-between h-full gap-4 md:gap-6">
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-50 md:bg-white border border-gray-200 rounded-full text-[10px] md:text-xs uppercase tracking-wide font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile Arrow */}
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