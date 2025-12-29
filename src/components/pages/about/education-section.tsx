"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Education {
  id: number;
  degree: string;
  school: string;
  year: string;
  description: string;
}

const educationData: Education[] = [
  {
    id: 1,
    degree: "BUT Métiers du Multimédia et de l'Internet (MMI)",
    school: "Université de Versailles Saint-Quentin-en-Yvelines",
    year: "2024 - Présent",
    description:
      "Spécialisation en développement web et dispositifs interactifs. Apprentissage des technologies front-end et back-end.",
  },
  {
    id: 2,
    degree: "Baccalauréat Technologique",
    school: "Lycée Clément Ader",
    year: "2022 - 2024",
    description:
      "Développement de solutions en Python, C++ et PHP. Modélisation et impression 3D.",
  },
];

export default function EducationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-bricolage-grotesque">
            Un parcours scolaire guidé par la.{" "}
            <span className="text-[#008366] italic font-serif">curiosité</span>{" "}
            et l&apos;envie de{" "}
            <span className="text-[#008366] italic font-serif">
              comprendre le numérique.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:gap-8 relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-[30%] top-0 bottom-0 w-px bg-gray-200" />

          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col md:flex-row gap-4 md:gap-12 relative"
            >
              {/* Year column */}
              <div className="md:w-[30%] shrink-0 flex items-start md:justify-end md:pr-12 relative">
                <div className="hidden md:block absolute right-[-6.5px] top-2 w-3 h-3 rounded-full bg-[#008366] ring-4 ring-white" />
                <span className="text-xl md:text-2xl font-bold text-[#008366] font-bricolage-grotesque">
                  {item.year}
                </span>
              </div>

              {/* Content column */}
              <div className="md:w-[70%] pb-8 md:pb-16 border-b border-gray-100 md:border-0 last:border-0 last:pb-0">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-bricolage-grotesque">
                  {item.degree}
                </h3>
                <h4 className="text-lg md:text-xl font-medium text-gray-500 mb-4">
                  {item.school}
                </h4>
                <p className="text-gray-600 leading-relaxed max-w-2xl text-base md:text-lg">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
