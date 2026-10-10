import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { GalleryProject } from "@/data/project-gallery";
import { ZenProjectPreview } from "./zen-mobile-showcase";

interface ProjectCardProps {
  project: GalleryProject;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps): React.JSX.Element {
  return (
    <Link
      href={`/mes-projets/${project.slug}`}
      aria-label={`${project.title} — ${project.description}`}
      className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-black focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-ink)]"
    >
      <Image
        src={project.backgroundImage}
        alt=""
        aria-hidden="true"
        data-project-background="true"
        fill
        sizes="(max-width: 767px) 100vw, 44vw"
        className="object-cover"
        priority={priority}
        quality={80}
      />
      <div data-project-illustration="true" className="absolute inset-[9%] overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02] motion-reduce:scale-100 motion-reduce:transition-none">
        {project.slug === "zen" ? (
          <ZenProjectPreview />
        ) : (
          <Image src={project.image} alt={`Aperçu de ${project.title}`} fill sizes="(max-width: 767px) 82vw, 36vw" className="object-cover" priority={priority} quality={90} />
        )}
      </div>
      <div data-project-overlay="true" className="absolute inset-0 flex flex-col justify-end gap-3 bg-linear-to-t from-black/90 via-black/60 to-transparent p-5 text-white opacity-100 transition-opacity duration-300 ease-in-out md:justify-between md:bg-none md:bg-black/80 md:p-8 [@media(min-width:768px)_and_(hover:hover)_and_(pointer:fine)]:opacity-0 group-hover:opacity-100 group-hover:duration-500 group-focus-visible:opacity-100 group-focus-visible:duration-500 motion-reduce:transition-none">
        <ArrowUpRight aria-hidden="true" className="absolute right-5 top-5 size-6 text-[var(--portfolio-accent)] md:static md:self-end" />
        <div className="text-left md:text-center">
          <h3 className="text-2xl font-bold uppercase leading-tight md:text-[2.5rem]">{project.title}</h3>
          <p className="mt-2 hidden text-sm text-white/85 md:block md:text-base">{project.description}</p>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/35 pt-4 text-xs md:text-sm">
          <div className="flex flex-wrap gap-x-3 gap-y-1 uppercase">
            <span>{project.category}</span>
            {project.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
            {project.tags.length > 2 && <span>+{project.tags.length - 2}</span>}
          </div>
          <span className="shrink-0 tabular-nums">{project.date}</span>
        </div>
      </div>
    </Link>
  );
}
