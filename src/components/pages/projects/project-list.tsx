"use client";

import { motion } from "framer-motion";
import ProjectRow from "./project-row";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
  json: string;
  year?: string;
  tags?: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Zen • Catalogue de films intelligent",
    category: "Application Web",
    image: "/images/projects/zen/001.png",
    slug: "zen",
    json: "/data/projects/008.json",
    year: "2026",
    tags: ["Next.js", "FastAPI", "Python"],
  },
  {
    id: 2,
    title: "Teamify • Application de gestion événementielle",
    category: "Application Web",
    image: "/images/projects/teamify/001.png",
    slug: "teamify",
    json: "/data/projects/001.json",
    year: "2025",
    tags: ["Next.js", "Prisma", "Pusher"],
  },
  {
    id: 3,
    title: "App Analyzer • Audit de site web",
    category: "Service Backend",
    image: "/images/projects/app-analyzer/001.png",
    slug: "app-analyzer",
    json: "/data/projects/002.json",
    year: "2025",
    tags: ["Next.js", "Puppeteer", "Lighthouse"],
  },
  {
    id: 4,
    title: "Lookaroun • Application de networking",
    category: "Application Web (STAGE)",
    image: "/images/projects/lookaroun/001.png",
    slug: "lookaroun",
    json: "/data/projects/006.json",
    year: "2025",
    tags: ["React", "Firebase", "Shadcn UI"],
  },
  {
    id: 5,
    title: "Flow Media • Agence web fictive",
    category: "Application Web",
    image: "/images/projects/flow-media/001.png",
    slug: "flow-media",
    json: "/data/projects/005.json",
    year: "2025",
    tags: ["PHP", "MySQL", "JavaScript"],
  },
  {
    id: 6,
    title: "Elecsud Energies • Électricien à Marseille",
    category: "Site Vitrine (FREELANCE)",
    image: "/images/projects/elecsud-energies/001.png",
    slug: "elecsud-energies",
    json: "/data/projects/007.json",
    year: "2025",
    tags: ["Next.js", "GSAP", "Tailwind"],
  },
  {
    id: 7,
    title: "Framix • Landing page",
    category: "Site Vitrine",
    image: "/images/projects/framix/001.png",
    slug: "framix",
    json: "/data/projects/003.json",
    year: "2025",
    tags: ["Astro", "React", "Tailwind"],
  },
  {
    id: 8,
    title: "Lexi AI • Landing page",
    category: "Site Vitrine",
    image: "/images/projects/lexi-ai/001.png",
    slug: "lexi-ai",
    json: "/data/projects/004.json",
    year: "2025",
    tags: ["React", "Tailwind", "Framer"],
  },
];

export default function ProjectsList() {
  return (
    <section className="w-full pt-24 pb-24 md:pt-28 md:pb-32 bg-transparent min-h-screen">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-start mt-6 mb-24 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-medium leading-[1.1] font-bricolage-grotesque text-black max-w-4xl"
          >
            Parce que chaque projet est bien plus que du code, il raconte{" "}
            <span className="text-[#008366] italic font-serif">
              une intention et une solution.
            </span>
          </motion.h2>
        </div>

        <div className="flex flex-col border-t border-black">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectRow project={project} index={index} />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto w-full mt-24 md:mt-32">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-medium tracking-tight font-bricolage-grotesque text-center"
          >
            Une intention et une solution, pensées pour répondre à{" "}
            <span className="text-[#008366] italic font-serif">
              des besoins concrets et durables.
            </span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
