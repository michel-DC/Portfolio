"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string; // Can be image path or video path
  link: string;
  isVideo?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    category: "Web Application",
    image: "/images/projects/teamify/001.png",
    link: "/projects/e-commerce-dashboard",
    isVideo: false,
  },
  {
    id: 2,
    title: "Task Management App",
    category: "Productivity Tool",
    image: "/images/projects/teamify/001.png",
    link: "/projects/task-management",
    isVideo: true,
  },
  {
    id: 3,
    title: "Portfolio v2",
    category: "Personal Website",
    image: "/images/projects/teamify/001.png",
    link: "/projects/portfolio-v2",
    isVideo: true,
  },
  {
    id: 4,
    title: "SaaS Landing Page",
    category: "Marketing Site",
    image: "/images/projects/teamify/001.png",
    link: "/projects/saas-landing",
    isVideo: true,
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={project.link} className="block w-full group cursor-pointer">
      <motion.div
        className="relative w-full aspect-4/3 overflow-hidden rounded-sm"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          width={640}
          height={427}
        />

        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/80"
        />

        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <motion.div
            className="flex flex-wrap justify-center gap-x-[0.3em]"
            variants={{
              rest: { opacity: 0 },
              hover: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                },
              },
            }}
          >
            {project.title.split(" ").map((word, i) => (
              <span key={i} className="flex whitespace-nowrap">
                {word.split("").map((char, j) => (
                  <motion.span
                    key={j}
                    variants={{
                      rest: { opacity: 0, y: 10 },
                      hover: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl md:text-4xl text-white"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <div className="mt-4 flex justify-between items-start opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-sm font-medium text-black uppercase tracking-wide">
          {project.category}
        </span>
      </div>
    </Link>
  );
};

export default function ProjectsSection() {
  return (
    <section className="w-full py-40 md:py-48" id="projects">
      <div className="w-full px-4 md:px-12 lg:px-16">
        <div className="flex flex-col gap-16">
          {/* Minimal Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-450 mx-auto w-full">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight max-w-4xl text-black">
              Chaque projet est une réponse technique à un besoin précis, de la
              conception à la mise en ligne.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="https://github.com/michel-DC" target="_blank">
                Voir tous les projets <ArrowUpRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
