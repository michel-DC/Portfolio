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

  return <ProjectContent project={project} />;
}
