"use client";

import { useId, useState } from "react";
import { galleryProjects, type ProjectCategory } from "@/data/project-gallery";
import { cn } from "@/lib/utils";
import ProjectCard from "./project-card";

type GalleryFilter = "Tous" | ProjectCategory;

interface ProjectGalleryProps {
  headingLevel?: "h1" | "h2";
  prioritizeImages?: boolean;
  projectLimit?: number;
  showFilters?: boolean;
}

const FILTERS: GalleryFilter[] = ["Tous", "Applications web", "Sites vitrines", "Backend"];

export default function ProjectGallery({ headingLevel = "h2", prioritizeImages = false, projectLimit = galleryProjects.length, showFilters = true }: ProjectGalleryProps): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("Tous");
  const galleryId = useId();
  const Heading = headingLevel;
  const projects = galleryProjects.slice(0, projectLimit).filter((project) => activeFilter === "Tous" || project.category === activeFilter);

  return (
    <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[2200px] [&_*]:font-reference sm:w-[calc(100%_-_3rem)] md:w-[92%]">
      <div className="mb-6 flex items-baseline gap-3 md:mb-10 md:gap-5">
        <Heading className="text-[clamp(3.5rem,8vw,9rem)] font-normal uppercase leading-none tracking-[-0.025em]">Projets</Heading>
        <span aria-hidden="true" className="text-2xl text-[var(--accent-ink)] md:text-5xl">{projects.length}</span>
      </div>
      {showFilters && <div aria-label="Filtrer les projets" className="mb-6 flex flex-wrap gap-x-4 gap-y-1 md:mb-10 md:gap-x-6">
        {FILTERS.map((filter) => (
          <button key={filter} type="button" aria-pressed={activeFilter === filter} aria-controls={galleryId} onClick={(): void => setActiveFilter(filter)}
            className={cn("min-h-11 cursor-pointer text-xs font-bold uppercase underline-offset-4 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-ink)] md:text-sm", activeFilter === filter ? "text-black" : "text-black/60")}
          >
            {activeFilter === filter ? `[${filter}]` : filter}
          </button>
        ))}
      </div>}
      <p role="status" className="sr-only">{projects.length} {projects.length === 1 ? "projet affiché" : "projets affichés"}</p>
      <div id={galleryId} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={prioritizeImages && index < 2} />)}
      </div>
    </div>
  );
}
