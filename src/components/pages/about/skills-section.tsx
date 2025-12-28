"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Skill {
  name: string;
  description: string;
  iconPath: string;
}

const devSkills: Skill[] = [
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
    name: "React.JS",
    description: "Librairie javascript via un système de composants",
    iconPath: "/images/skills/react.svg",
  },
  {
    name: "Node.js",
    description: "Runtime JavaScript côté serveur",
    iconPath: "/images/skills/nodejs.svg",
  },
  {
    name: "PHP",
    description: "Langage backend, parfait avec Apache et MySQL",
    iconPath: "/images/skills/php.svg",
  },
  {
    name: "Tailwind CSS",
    description: "Framework CSS utility-first pour styling rapide",
    iconPath: "/images/skills/tailwindcss.svg",
  },
  {
    name: "Prisma",
    description: "ORM moderne pour gestion de base de données",
    iconPath: "/images/skills/prisma.svg",
  },
  {
    name: "PostgreSQL",
    description: "Base de données relationnelle performante",
    iconPath: "/images/skills/postgresql.png",
  },
  {
    name: "Vercel",
    description: "Déploiement et hosting pour projets NextJS",
    iconPath: "/images/skills/vercel.svg",
  },
];

const designSkills: Skill[] = [
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
  {
    name: "Elementor",
    description: "Conception de sites web avec page builder",
    iconPath: "/images/skills/elementor.png",
  },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#008366]/30 hover:shadow-lg hover:shadow-[#008366]/5 transition-all duration-300"
  >
    <div className="relative w-12 h-12 shrink-0 p-2 bg-gray-50 rounded-xl group-hover:bg-[#008366]/10 transition-colors duration-300">
      <Image
        src={skill.iconPath}
        alt={skill.name}
        fill
        className="object-contain p-2"
      />
    </div>
    <div>
      <h3 className="text-lg font-bold font-bricolage-grotesque text-gray-900 mb-1 group-hover:text-[#008366] transition-colors">
        {skill.name}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">
        {skill.description}
      </p>
    </div>
  </motion.div>
);

export default function SkillsSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-28 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-bricolage-grotesque mb-6">
            Mes compétences{" "}
            <span className="text-[#008366] italic font-serif">techniques</span>
          </h2>
          <p className="text-lg text-gray-600">
            Une stack technique moderne et performante pour donner vie à vos
            projets les plus ambitieux.
          </p>
        </motion.div>

        <div className="space-y-20">
          {/* Bloc Développement */}
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold font-bricolage-grotesque pl-4 border-l-4 border-[#008366]"
            >
              Développement
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {devSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Bloc Design & Outils */}
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold font-bricolage-grotesque pl-4 border-l-4 border-[#008366]"
            >
              Design & Outils
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {designSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
