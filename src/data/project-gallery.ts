import teamify from "./projects/001.json";
import analyzer from "./projects/002.json";
import framix from "./projects/003.json";
import lexi from "./projects/004.json";
import flow from "./projects/005.json";
import lookaroun from "./projects/006.json";
import elecsud from "./projects/007.json";
import zen from "./projects/008.json";

export type ProjectCategory = "Applications web" | "Sites vitrines" | "Backend";

export interface GalleryProject {
  title: string;
  description: string;
  slug: string;
  image: string;
  backgroundImage: string;
  date: string;
  tags: string[];
  category: ProjectCategory;
}

interface ProjectSource {
  name: string;
  slugName: string;
  images: string[];
  date: string;
  technologies: string[];
}

function createGalleryProject(source: ProjectSource, category: ProjectCategory): GalleryProject {
  const [title, description = category] = source.name.split(" • ");

  return {
    title,
    description,
    slug: source.slugName,
    image: source.slugName === "zen" ? source.images[0] : `/images/projects/previews/${source.slugName}.webp`,
    backgroundImage: source.slugName === "zen" ? "/images/projects/backgrounds/zen-landscape.webp" : `/images/projects/backgrounds/${source.slugName}.webp`,
    date: source.date,
    tags: source.technologies,
    category,
  };
}

export const galleryProjects: GalleryProject[] = [
  createGalleryProject(zen, "Applications web"),
  createGalleryProject(teamify, "Applications web"),
  createGalleryProject(analyzer, "Backend"),
  createGalleryProject(lookaroun, "Applications web"),
  createGalleryProject(flow, "Applications web"),
  createGalleryProject(elecsud, "Sites vitrines"),
  createGalleryProject(framix, "Sites vitrines"),
  createGalleryProject(lexi, "Sites vitrines"),
];
