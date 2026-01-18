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
    title: "Teamify • Application de gestion événementielle",
    category: "Application Web",
    image: "/images/projects/teamify/001.png",
    slug: "teamify",
    json: "/data/projects/001.json",
    year: "2025",
    tags: ["Next.js", "Prisma", "Pusher"]
  },
  {
    id: 2,
    title: "App Analyzer • Audit de site web",
    category: "Service Backend",
    image: "/images/projects/app-analyzer/001.png",
    slug: "app-analyzer",
    json: "/data/projects/002.json",
    year: "2025",
    tags: ["Next.js", "Puppeteer", "Lighthouse"]
  },
  {
    id: 3,
    title: "Lookaroun • Application de networking",
    category: "Application Web (STAGE)",
    image: "/images/projects/lookaroun/001.png",
    slug: "lookaroun",
    json: "/data/projects/006.json",
    year: "2025",
    tags: ["React", "Firebase", "Shadcn UI"]
  },
  {
    id: 4,
    title: "Flow Media • Agence web fictive",
    category: "Application Web",
    image: "/images/projects/flow-media/001.png",
    slug: "flow-media",
    json: "/data/projects/005.json",
    year: "2025",
    tags: ["PHP", "MySQL", "JavaScript"]
  },
  {
    id: 5,
    title: "Elecsud Energies • Électricien à Marseille",
    category: "Site Vitrine (FREELANCE)",
    image: "/images/projects/elecsud-energies/001.png",
    slug: "elecsud-energies",
    json: "/data/projects/007.json",
    year: "2025",
    tags: ["Next.js", "GSAP", "Tailwind"]
  },
  {
    id: 6,
    title: "Framix • Landing page",
    category: "Site Vitrine",
    image: "/images/projects/framix/001.png",
    slug: "framix",
    json: "/data/projects/003.json",
    year: "2025",
    tags: ["Astro", "React", "Tailwind"]
  },
  {
    id: 7,
    title: "Lexi AI • Landing page",
    category: "Site Vitrine",
    image: "/images/projects/lexi-ai/001.png",
    slug: "lexi-ai",
    json: "/data/projects/004.json",
    year: "2025",
    tags: ["React", "Tailwind", "Framer"]
  },
];

export default function ProjectsList() {
  return (
    <section className="w-full pt-24 pb-24 md:pt-36 md:pb-32 bg-white min-h-screen">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="flex flex-col items-start mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-full border-b border-black pb-8 md:pb-12"
          >
            <h1 className="text-[13vw] md:text-[7vw] leading-[0.8] md:leading-[0.9] font-bold tracking-tighter text-black uppercase font-bricolage-grotesque">
              Selected
            </h1>
            <div className="flex items-center gap-4 md:gap-8 ml-[5vw] mt-2 md:mt-4">
              <span className="text-[13vw] md:text-[7vw] leading-[0.8] md:leading-[0.9] font-bold tracking-tighter text-[#008366] uppercase italic font-serif">
                Works
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col">
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

      </div>
    </section>
  );
}