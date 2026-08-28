"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
  year?: string;
  tags?: string[];
}

interface ProjectRowProps {
  project: Project;
  index: number;
}

export default function ProjectRow({ project, index }: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/mes-projets/${project.slug}`}
      className="block group relative w-full border-b border-black/20 hover:border-black transition-colors duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Colonne 1 : Index / Année */}
        <div className="md:col-span-1 hidden md:block">
           <span className="text-sm font-medium text-gray-400 group-hover:text-[#4E6471] transition-colors duration-300">
            {project.year || "2024"}
          </span>
        </div>

        {/* Colonne 2 : Titre & Catégorie */}
        <div className="md:col-span-6">
          <h3 className="text-3xl md:text-5xl font-medium font-bricolage-grotesque mb-2 group-hover:translate-x-2 transition-transform duration-300">
            {project.title.split(" • ")[0]}
          </h3>
          <span className="text-sm md:text-base text-gray-500 uppercase tracking-wider group-hover:text-black transition-colors">
            {project.category}
          </span>
        </div>

        {/* Colonne 3 : Tags (Visible au survol desktop) */}
        <div className="md:col-span-4 flex justify-end items-center">
            <div className="flex flex-wrap justify-end gap-2 opacity-100 md:translate-x-0 transition-all duration-300">
                 {project.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium uppercase">
                        {tag}
                    </span>
                 ))}
            </div>
        </div>

        {/* Colonne 4 : Arrow Icon */}
        <div className="md:col-span-1 flex justify-end">
            <ArrowUpRight className="size-6 md:size-8 text-gray-300 group-hover:text-[#4E6471] group-hover:rotate-45 transition-all duration-300" />
        </div>
      </div>

      {/* Image de Prévisualisation Flottante (Optionnel : ou affichée en fixed quelque part) 
          Pour l'instant, je vais intégrer une image qui apparaît subtilement en background ou overlay 
          Mais pour un effet "Wow" propre, une image qui suit la souris est complexe à faire sans contexte global.
          
          Alternative "Clean" : Une image qui apparaît dans la ligne ou en absolute.
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={isHovered ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute hidden lg:block right-[20%] top-1/2 -translate-y-1/2 w-[300px] h-[200px] pointer-events-none z-20 overflow-hidden rounded-lg shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
      >
        <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
        />
      </motion.div>

    </Link>
  );
}
