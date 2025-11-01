"use client";

import Link from "next/link";
import Section from "@/components/section";
import {
  Layers,
  FileCode2,
  Atom,
  Database,
  Paintbrush,
  Hexagon,
  CircleDot,
  Code,
  Triangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const skills = [
  {
    name: "Next.JS",
    url: "https://nextjs.org",
    icon: Layers,
    description: "Framework fullstack pour mes projets web",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
    icon: FileCode2,
    description: "Typage statique pour un code robuste",
  },
  {
    name: "React.JS",
    url: "https://react.dev",
    icon: Atom,
    description: "Librairie javascript via un système de composants",
  },
  {
    name: "PHP",
    url: "https://www.php.net",
    icon: Code,
    description: "Langage backend, parfait en combinaison avec Apache et MySQL",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    icon: Paintbrush,
    description: "Framework CSS utility-first pour styling rapide",
  },
  {
    name: "Node.js",
    url: "https://nodejs.org",
    icon: Hexagon,
    description: "Runtime JavaScript côté serveur",
  },
  {
    name: "Prisma",
    url: "https://www.prisma.io",
    icon: Database,
    description: "ORM moderne pour gestion de base de données",
  },
  {
    name: "PostgreSQL",
    url: "https://www.postgresql.org",
    icon: CircleDot,
    description: "Base de données relationnelle performante",
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    icon: Triangle,
    description:
      "Plateforme de déploiement et hosting parfaite pour des projets NextJS",
  },
];

export function SkillsSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <Section className="flex flex-col items-start justify-center pt-8 pb-8 px-4 sm:px-8">
      <motion.div
        className="flex flex-col justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-foreground/80 italic text-[25px] sm:text-[30px] leading-tight font-normal tracking-wider mb-1"
          variants={fadeInUp}
        >
          Mes outils du quotidien
        </motion.h2>
        <div className="flex-1 ml-4 pt-2">
          <motion.ul
            className="list-disc text-foreground/70"
            variants={containerVariants}
          >
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.li key={skill.name} className="mb-3" variants={itemVariants}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <Button asChild className="p-2! h-8! min-w-0! w-auto!">
                        <Link
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-foreground transition-colors group"
                        >
                          <Icon className="w-4 h-4 shrink-0 text-foreground" />
                        </Link>
                      </Button>
                      <span className="font-medium">{skill.name}</span>
                      {/* Cacher la description sur mobile et afficher sur pc */}
                      <span className="hidden sm:inline text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors ml-2">
                        {skill.description}
                      </span>
                    </div>
                    {/* Cacher la description sur pc et afficher sur mobile */}
                    <span className="block sm:hidden text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors mt-1 ml-10">
                      {skill.description}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </motion.div>
    </Section>
  );
}
