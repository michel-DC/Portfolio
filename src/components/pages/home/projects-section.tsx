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
  image: string;
  slug: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Teamify • Application de gestion événementielle",
    category: "Application Web",
    image: "/images/projects/teamify/001.png",
    slug: "teamify",
  },
  {
    id: 2,
    title: "App Analyzer • Audit de site web",
    category: "Service Backend",
    image: "/images/projects/app-analyzer/001.png",
    slug: "app-analyzer",
  },
  {
    id: 3,
    title: "Lookaroun • Application de networking",
    category: "Application Web",
    image: "/images/projects/lookaroun/001.png",
    slug: "lookaroun",
  },
  {
    id: 4,
    title: "Flow Media • Agence web fictive",
    category: "Application Web",
    image: "/images/projects/flow-media/001.png",
    slug: "flow-media",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/mes-projets/${project.slug}`}
      className="block w-full group cursor-pointer"
    >
      <motion.div
        className="relative w-full aspect-4/3 overflow-hidden rounded-sm"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <Image
          src={project.image}
          alt={project.title}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
          priority={project.id <= 2}
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
                    className="text-2xl md:text-4xl text-white font-bold"
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
    <section className="w-full py-24 md:py-32" id="projects">
      <div className="w-full ">
        <div className="flex flex-col gap-16">
          <div className="max-w-7xl relative px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-450 mx-auto w-full">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-medium tracking-tight font-bricolage-grotesque"
              >
                Chaque projet est une réponse technique à{" "}
                <span className="text-[#008366] italic font-serif">
                  un besoin précis
                </span>{" "}
                de la conception à la mise en ligne.
              </motion.h2>
            </div>
          </div>
          {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-left gap-6 max-w-4xl w-full">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-black text-left md:w-full">
              Pour moi chaque projet est une réponse technique à un besoin
              précis, de la conception à la mise en ligne.
            </h2>
          </div> */}
          <div className="px-4 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/mes-projets">
                  Voir tous mes projets <ArrowUpRight className="ml-2 size-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
