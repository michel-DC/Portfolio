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
    degree: "BUT MMI (Métiers du Multimédia)",
    school: "UVSQ - Vélizy",
    year: "2024 — Présent",
    description:
      "Spécialisation en Développement Web & Design Interactif. Apprentissage approfondi de l'UX/UI, du développement Full-Stack et de la gestion de projet agile.",
  },
  {
    id: 2,
    degree: "Baccalauréat Technologique",
    school: "Lycée Clément Ader",
    year: "2022 — 2024",
    description:
      "Filière STI2D. Introduction aux sciences de l'ingénieur, algorithmique et prototypage numérique.",
  },
];

export default function EducationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="w-full py-24 md:py-32 bg-[#ffffff] text-black"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-medium tracking-tight font-bricolage-grotesque"
          >
            Un parcours scolaire guidé par la{" "}
            <span className="text-[#008366] italic font-serif">curiosité</span>{" "}
            et l&apos;envie de{" "}
            <span className="text-[#008366] italic font-serif">
              comprendre le numérique.
            </span>
          </motion.h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-20">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group flex flex-col col-span-1 lg:col-span-5 ${
                index % 2 !== 0 ? "lg:col-start-8" : ""
              }`}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-sm font-bold uppercase tracking-widest text-[#008366]">
                  [{item.year}]
                </span>
                <div className="h-px grow bg-gray-100" />
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold font-bricolage-grotesque leading-tight">
                  {item.degree}
                </h3>
                <h4 className="text-xl text-gray-400 font-medium italic font-serif">
                  {item.school}
                </h4>
                <p className="text-gray-600 leading-relaxed text-lg max-w-xl">
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
