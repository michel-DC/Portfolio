import Section from "@/components/section";
import fs from "fs";
import path from "path";
import Link from "next/link";
import ProjectImagesCarousel from "@/components/project-images-carousel";

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
      <Section className="pt-20 pb-8 px-4 sm:px-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Projet introuvable
        </h1>
        <p className="mt-2 text-foreground/50">
          Aucun projet ne correspond à ce slug.
        </p>
      </Section>
    );
  }

  return (
    <Section className="flex flex-col items-center pt-30 pb-10 px-4 sm:px-8">
      {/* Header + meta infos*/}
      <div className="w-full max-w-4xl flex flex-col items-center justify-start text-center mb-8">
        <h1 className="text-foreground text-[28px] sm:text-[35px] font-bold italic mb-2">
          {project.name}
        </h1>
        <div className="text-foreground/50 text-sm mb-3">{project.date}</div>
        <div className="flex flex-row flex-wrap items-center gap-2 justify-center mb-3">
          {project.themes?.map((theme, idx) => (
            <span
              key={theme + idx}
              className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide"
            >
              {theme}
            </span>
          ))}
        </div>
        {(project.github || project.url) && (
          <div className="flex gap-2 flex-wrap justify-center items-center mb-1">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 underline hover:text-primary"
              >
                GitHub
              </Link>
            )}
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 underline hover:text-primary"
              >
                Démo
              </Link>
            )}
          </div>
        )}
      </div>
      {/* Images RESPONSIVES, carousel auto (client) ou image unique */}
      <ProjectImagesCarousel images={project.images} name={project.name} />
      {/* Description principale */}
      <div className="w-full max-w-4xl text-left mb-8">
        <h2 className="text-foreground/90 text-xl font-semibold mb-2 mt-2">
          Résumé
        </h2>
        <p className="text-foreground/70 mb-2 italic text-lg">
          {project.description}
        </p>
        <h3 className="mt-6 mb-1 text-foreground/90 font-semibold">Contexte</h3>
        <p className="text-foreground/60 mb-4">{project.context}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="inline-block px-2 py-0.5 rounded bg-accent text-foreground/80 text-xs font-medium border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      {/* Tâches, résultats, apprentissages */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <h4 className="text-foreground font-semibold mb-1">Mes tâches</h4>
          <ul className="list-disc list-inside text-foreground/60 text-sm pl-2">
            {project.task?.map((tache, idx) => (
              <li key={idx}>{tache}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-semibold mb-1">Résultats</h4>
          <ul className="list-disc list-inside text-foreground/60 text-sm pl-2">
            {project.results?.map((result, idx) => (
              <li key={idx}>{result}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-semibold mb-1">Apprentissages</h4>
          <ul className="list-disc list-inside text-foreground/60 text-sm pl-2">
            {project.learningOutcomes?.map((appr, idx) => (
              <li key={idx}>{appr}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
