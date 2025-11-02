import Section from "@/components/section";
import fs from "fs";
import path from "path";
import { ProjectContent } from "@/components/project-content";

interface ProjectData {
  name: string;
  slugName: string;
  description: string;
  date: string;
  themes: string[];
  images: string[];
  technologies: string[];
  context: string;
  task: string[];
  results: string[];
  learningOutcomes: string[];
  github?: string;
  url?: string;
}

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function ProjectPage(props: Props) {
  const params = await (props.params as
    | Promise<{ slug: string }>
    | { slug: string });
  const slug = (params as { slug: string }).slug;
  const dataDir = path.join(process.cwd(), "src/data/projects");
  const files = fs.readdirSync(dataDir);
  let project: ProjectData | null = null;
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const fullPath = path.join(dataDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    try {
      const data = JSON.parse(content);
      if (data.slugName === slug) {
        project = data;
        break;
      }
    } catch {}
  }

  if (!project) {
    return (
      <Section className="flex flex-1 flex-col justify-center items-center min-h-[60vh] pt-20 pb-8 px-4 sm:px-8">
        <h1 className="text-2xl font-semibold text-foreground text-center">
          Projet introuvable
        </h1>
        <p className="mt-2 text-foreground/50 text-center">
          Aucun projet ne correspond à ce slug.
        </p>
      </Section>
    );
  }

  // Charger tous les projets pour les suggestions
  const allProjects: ProjectData[] = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const fullPath = path.join(dataDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    try {
      const data = JSON.parse(content);
      if (data.slugName !== slug) {
        allProjects.push(data);
      }
    } catch {}
  }

  // Fonction de hash simple basée sur le slug pour générer un seed pseudo-aléatoire
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Générer un seed basé sur le slug pour un mélange pseudo-aléatoire déterministe
  const seed = hashString(slug);

  // Générer des valeurs pseudo-aléatoires pour chaque paire de projets à comparer
  const generateRandomValue = (index: number): number => {
    // Utiliser l'index pour générer une valeur différente à chaque appel
    const value = ((seed + index) * 9301 + 49297) % 233280;
    return value / 233280;
  };

  // Mélanger les projets de manière pseudo-aléatoire avec un comparateur déterministe
  const shuffledProjects = [...allProjects].sort((a, b) => {
    // Utiliser une combinaison des noms pour générer un index unique
    const comparisonKey = a.slugName + b.slugName;
    const comparisonHash = hashString(comparisonKey);
    const randomValue = generateRandomValue(comparisonHash);
    return randomValue - 0.5;
  });

  const suggestedProjects = shuffledProjects.slice(0, 2);

  return (
    <ProjectContent project={project} suggestedProjects={suggestedProjects} />
  );
}
