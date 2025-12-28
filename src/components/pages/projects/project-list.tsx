"use client";

import Link from "next/link";
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
    category: "Application Web (STAGE)",
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
  {
    id: 5,
    title: "Elecsud Energies • Électricien à Marseille",
    category: "Site Vitrine (FREELANCE)",
    image: "/images/projects/elecsud-energies/001.png",
    slug: "elecsud-energies",
  },
  {
    id: 6,
    title: "Framix • Landing page",
    category: "Site Vitrine",
    image: "/images/projects/framix/001.png",
    slug: "framix",
  },
  {
    id: 7,
    title: "Lexi AI • Landing page",
    category: "Site Vitrine",
    image: "/images/projects/lexi-ai/001.png",
    slug: "lexi-ai",
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

export default function ProjectsList() {
  return (
    <section className="w-full py-32 md:py-48">
      <div className="w-full">
        <div className="flex flex-col gap-16">
          <div className="max-w-7xl relative px-4 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-450 mx-auto w-full">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-medium tracking-tight font-bricolage-grotesque"
              >
                Parce que chaque projet est bien plus que du code, il raconte{" "}
                <span className="text-[#008366] italic font-serif">
                  une intention et une solution.
                </span>
              </motion.h1>
            </div>
          </div>

          <div className="px-4 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-6 max-w-450 mx-auto w-full">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-medium tracking-tight font-bricolage-grotesque text-center"
            >
              Une intention et une solution, pensées pour répondre à{" "}
              <span className="text-[#008366] italic font-serif">
                des besoins concrets et durables.
              </span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
}
