"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Skill {
  name: string;
  description: string;
  iconPath: string;
}

const skills: Skill[] = [
  {
    name: "Next.JS",
    description: "Framework fullstack pour mes projets web",
    iconPath: "/images/skills/nextjs.svg",
  },
  {
    name: "TypeScript",
    description: "Typage statique pour un code robuste",
    iconPath: "/images/skills/typescript.svg",
  },
  {
    name: "PostgreSQL",
    description: "Base de données relationnelle performante",
    iconPath: "/images/skills/postgresql.png",
  },
  {
    name: "Tailwind CSS",
    description: "Framework CSS utility-first pour styling rapide",
    iconPath: "/images/skills/tailwindcss.svg",
  },
  {
    name: "PHP",
    description: "Développement back-end et intégration CMS",
    iconPath: "/images/skills/php.svg",
  },
  {
    name: "Figma",
    description: "Conception d'interfaces UI/UX et prototypage",
    iconPath: "/images/skills/figma.svg",
  },
  {
    name: "Framer",
    description: "Outil de prototypage interactif et design",
    iconPath: "/images/skills/framer.svg",
  },
];

const BentoSkillCard = ({
  skill,
  index,
  className = "",
}: {
  skill: Skill;
  index: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className={`relative bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm ${className}`}
  >
    <div className="flex flex-col h-full">
      <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4">
        <Image
          src={skill.iconPath}
          alt={skill.name}
          fill
          className="object-contain"
        />
      </div>

      <h4 className="text-xl md:text-2xl font-bold font-bricolage-grotesque mb-2 text-slate-900">
        {skill.name}
      </h4>

      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
        {skill.description}
      </p>
    </div>
  </motion.div>
);

const BentoQuoteCard = ({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className={`relative bg-[#008366] rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-lg ${className}`}
  >
    <svg
      className="w-10 h-10 md:w-12 md:h-12 text-white/30 mb-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>

    <p className="text-lg md:text-xl font-medium text-white leading-relaxed mb-4">
      Le design n&apos;est pas à quoi le produit ressemble ou quelle impression
      il donne. Le design, c&apos;est comment il fonctionne
    </p>

    <p className="text-sm md:text-base text-white/80 font-medium">
      — Steve Jobs
    </p>
  </motion.div>
);

export default function SkillsSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-500 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-left max-w-7xl"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-bricolage-grotesque">
            Du code à l&apos;interface, chaque compétence participe à la
            cohérence{" "}
            <span className="text-[#008366] italic font-serif">du projet.</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* NextJS - Large */}
          <BentoSkillCard
            skill={skills[0]}
            index={0}
            className="md:col-span-2 row-span-1"
          />

          {/* TypeScript */}
          <BentoSkillCard
            skill={skills[1]}
            index={1}
            className="md:col-span-1 row-span-1"
          />

          {/* PostgreSQL */}
          <BentoSkillCard
            skill={skills[2]}
            index={2}
            className="md:col-span-1 row-span-1"
          />

          {/* Quote Card - Tall Right */}
          <BentoQuoteCard
            index={3}
            className="md:col-span-1 md:row-span-2 md:col-start-5 md:row-start-1 h-full min-h-[250px] md:min-h-0"
          />

          {/* Tailwind CSS */}
          <BentoSkillCard
            skill={skills[3]}
            index={4}
            className="md:col-span-1 row-span-1"
          />

          {/* PHP */}
          <BentoSkillCard
            skill={skills[4]}
            index={5}
            className="md:col-span-1 row-span-1"
          />

          {/* Figma */}
          <BentoSkillCard
            skill={skills[5]}
            index={6}
            className="md:col-span-1 row-span-1"
          />

          {/* Framer */}
          <BentoSkillCard
            skill={skills[6]}
            index={7}
            className="md:col-span-1 row-span-1"
          />
        </div>
      </div>
    </section>
  );
}
