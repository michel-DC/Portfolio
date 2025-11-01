"use client";

import Section from "@/components/section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "IUT de Vélizy-Villacoublay",
    url: "https://www.iut-velizy-rambouillet.uvsq.fr/",
    title: "Étudiant BUT MMI",
    period: "2024 - Aujourd'hui",
    description:
      "Formation en Métiers du Multimédia et de l'Internet. Projets universitaires orientés développement (fullstack, IA, UX/UI), mais aussi graphisme, 3D et communication.",
    icon: GraduationCap,
  },
  {
    company: "Bumps Agency",
    url: "https://www.bumps-agency.ch/",
    title: "Développeur Fullstack en Freelance",
    period: "Juillet 2025 - Aujourd'hui",
    description:
      "Développement web principalement en React, TypeScript et Next.js pour plusieurs entreprises. Intégration d'IA via les assistants OpenAI et Perplexity via des fonctions serverless supabase. Réalisation d'intégrations front-end à partir de maquettes Figma.",
    icon: BriefcaseBusiness,
  },
  {
    company: "Lookaroun",
    url: "https://lookaroun.com",
    title: "Stage de 1ère année",
    period: "Juin 2025 - Aout 2025",
    description:
      "Intégration des maquettes Figma en React pour Lookaroun, création d’interfaces dynamiques via les API back-end, avec optimisation SEO, performances et responsive design soignés.",
    icon: Building,
  },
  {
    company: "Maison Vatier",
    url: "https://github.com/Vatier",
    title: "Développeur Front-end en Freelance ",
    period: "Décembre 2024 - Mars 2025",
    description:
      "Site vitrine interactif conçu avec React.js et Tailwind CSS : maquettage sous Figma, intégration responsive, routage optimisé avec React Router, SEO soigné et déploiement cloud sur Vercel. Optimisation des performances et gestion du projet via Git/GitHub.",
    icon: Code2,
  },
];

export function WorksSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <Section className="flex flex-col items-start justify-center pt-8 pb-8 px-4 sm:px-8">
      <motion.div
        className="w-full flex flex-col justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-foreground/80 italic text-[25px] sm:text-[30px] leading-tight font-normal tracking-wider mb-2"
          variants={fadeInUp}
        >
          Mes expériences professionnelles
        </motion.h2>
        <div className="ml-2">
          <motion.ul
            className="list-disc pl-2 flex flex-col gap-6 pt-2 w-full"
            variants={containerVariants}
          >
            {experiences.map((exp) => {
              const Icon = exp.icon;
              return (
                <motion.li key={exp.company} className="relative w-full" variants={itemVariants}>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Desktop+: affiche le bouton avec l'icône */}
                    <div className="hidden sm:block">
                      <Button
                        asChild
                        className="shadow border bg-background p-2 h-9 mr-0.5 flex items-center justify-center"
                      >
                        <Link
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 group hover:text-foreground transition-colors"
                          aria-label={exp.company}
                        >
                          <Icon className="w-4 h-4 text-foreground" />
                        </Link>
                      </Button>
                    </div>
                    {/* Mobile : pas d'icône ni bouton */}
                    <div className="sm:hidden" />
                    <div className="flex flex-col min-w-0">
                      {/* Nom et titre + période */}
                      <div className="flex flex-row flex-wrap items-center gap-x-1 gap-y-1">
                        <span
                          className="font-semibold text-foreground truncate"
                          {...{
                            // Ajoute title=URL uniquement sur mobile (non-sm)
                            title: undefined,
                            ...(typeof window === "undefined" ? {} : {}),
                          }}
                        >
                          {/* Sur mobile, applique title=URL */}
                          <span className="sm:hidden" title={exp.url}>
                            {exp.company}
                          </span>
                          {/* Desktop+, pas de title */}
                          <span className="hidden sm:inline">
                            {exp.company}
                          </span>
                        </span>
                        <span className="hidden sm:inline text-xs text-foreground/60 mx-2">
                          |
                        </span>
                        <span className="italic text-sm text-foreground/80 truncate">
                          {exp.title}
                        </span>
                      </div>
                      <div className="text-xs text-foreground/50">
                        {exp.period}
                      </div>
                      {/* Description toujours en dessous du nom, mobile et desktop */}
                      <span className="block text-[13px] sm:text-[15px] text-foreground/60 mt-1">
                        {exp.description}
                      </span>
                    </div>
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
