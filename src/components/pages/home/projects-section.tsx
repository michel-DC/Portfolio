"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "Une plateforme d'administration complète pour gérer les produits, les commandes et les clients. Intégration de graphiques en temps réel et gestion des stocks.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    image: "/images/video/video-bg.mp4", // Using a placeholder video/image path that exists or generic
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Application de gestion de tâches collaborative avec fonctionnalités de glisser-déposer (Kanban), notifications en temps réel et assignation d'équipe.",
    tags: ["React", "Redux", "Node.js", "Socket.io"],
    image: "/images/video/home-bg.mp4",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio v2",
    description:
      "La version précédente de mon portfolio, axée sur le minimalisme et la performance. Optimisé pour le SEO et l'accessibilité.",
    tags: ["Gatsby", "Styled Components", "GraphQL"],
    image: "/images/video/home-bg-video.mp4",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 4,
    title: "SaaS Landing Page",
    description:
      "Page d'atterrissage haute conversion pour un produit SaaS fictif. Animations fluides au défilement et formulaires intégrés.",
    tags: ["Vue.js", "Nuxt", "GSAP", "Sass"],
    image: "/images/video/video.mp4",
    demoUrl: "#",
    repoUrl: "#",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative flex flex-col gap-4"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted">
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
          {/* Fallback visual if no image */}
          <span className="text-4xl font-bold text-neutral-300 dark:text-neutral-700 select-none">
            {project.title.charAt(0)}
          </span>
        </div>

        {/* Overlay with buttons on hover (Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.demoUrl && (
            <Button asChild variant="default" className="rounded-full">
              <Link href={project.demoUrl} target="_blank">
                Voir le site <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white text-white hover:bg-white hover:text-black"
            >
              <Link href={project.repoUrl} target="_blank">
                Code <Github className="ml-2 size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-foreground">
            {project.title}
          </h3>
        </div>

        <p className="text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-background" id="projects">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-sm font-medium uppercase tracking-wider text-[#008366]"
              >
                Portfolio
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight"
              >
                Projets Sélectionnés
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="outline" className="hidden md:flex" asChild>
                <Link href="https://github.com/michel-DC" target="_blank">
                  Voir tous les projets <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="https://github.com/michel-DC" target="_blank">
                Voir tous les projets <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
