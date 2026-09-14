import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

interface ProjectRecord {
  slugName?: string;
}

const STATIC_PATHS = [
  "/",
  "/a-propos",
  "/mes-projets",
  "/mentions-legales",
  "/politique-de-confidentialite",
] as const;

function getProjectSlugs(): string[] {
  const projectsDirectory = path.join(process.cwd(), "src", "data", "projects");

  return fs
    .readdirSync(projectsDirectory)
    .filter((filename) => filename.endsWith(".json"))
    .map((filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const project = JSON.parse(fs.readFileSync(filePath, "utf8")) as ProjectRecord;
      return project.slugName;
    })
    .filter((slug): slug is string => Boolean(slug));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((pathname) => ({
    url: new URL(pathname, SITE_URL).toString(),
    changeFrequency: "weekly",
    priority: pathname === "/" ? 1 : 0.8,
  }));
  const projectEntries: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${SITE_URL}/mes-projets/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
