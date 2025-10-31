import Section from "@/components/section";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProjectImagesCarousel from "@/components/project-images-carousel";
import { Github, ExternalLink } from "lucide-react";

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

  return (
    <>
      <Section className="flex flex-col items-center pt-30 pb-10 px-4 sm:px-8">
        {/* Header */}
        <div className="w-full max-w-4xl flex flex-col items-center text-center mb-10">
          <h1 className="text-foreground text-3xl sm:text-4xl font-bold mb-3">
            {project.name}
          </h1>
          <h4 className="text-foreground/50 text-sm mb-4">
            Date de fin : {project.date}
          </h4>

          {/* Themes */}
          <div className="flex flex-row flex-wrap items-center gap-3 justify-center mb-6">
            {project.themes?.map((theme, idx) => (
              <span
                key={theme + idx}
                className="inline-block px-4 py-2 rounded-lg bg-accent text-foreground/80 text-sm font-medium border border-foreground/10 hover:bg-accent/80 transition-colors"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Première image du projet */}
        {project.images && project.images.length > 0 && (
          <div className="w-full mb-12 flex justify-center items-center">
            <Image
              src={project.images[0]}
              alt={`${project.name} - Image principale`}
              width={1200}
              height={800}
              className="shadow-lg rounded-sm"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
              }}
              priority
            />
          </div>
        )}

        {/* Description & Context */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-foreground text-2xl font-semibold mb-4">
            À propos du projet
          </h2>

          <p className="text-foreground/80 text-base leading-relaxed mb-6">
            {project.description}
          </p>

          <h3 className="text-foreground text-2xl font-semibold mb-3">
            Contexte
          </h3>
          <p className="text-foreground/70 text-base leading-relaxed">
            {project.context}
          </p>
        </div>

        {/* Technologies Stack */}
        <div className="w-full max-w-4xl mb-12">
          <h3 className="text-foreground text-2xl font-semibold mb-4">
            Stack Technique
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="inline-block px-4 py-2 rounded-lg bg-accent text-foreground/80 text-sm font-medium border border-foreground/10 hover:bg-accent/80 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tasks, Results, Learning */}
        <div className="w-full max-w-4xl space-y-8">
          <div>
            <h3 className="text-foreground text-2xl font-semibold mb-4">
              Mes tâches
            </h3>
            <ul className="space-y-3">
              {project.task?.map((tache, idx) => (
                <li
                  key={idx}
                  className="text-foreground/70 text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                >
                  {tache}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground text-2xl font-semibold mb-4">
              Résultats obtenus
            </h3>
            <ul className="space-y-3">
              {project.results?.map((result, idx) => (
                <li
                  key={idx}
                  className="text-foreground/70 text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                >
                  {result}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground text-2xl font-semibold mb-4">
              Apprentissages
            </h3>
            <ul className="space-y-3">
              {project.learningOutcomes?.map((appr, idx) => (
                <li
                  key={idx}
                  className="text-foreground/70 text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                >
                  {appr}
                </li>
              ))}
            </ul>
          </div>

          {/* Link */}
          {(project.github || project.url) && (
            <div className="w-full flex justify-start items-center mt-16">
              <div className="flex justify-start items-center gap-4">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                  >
                    <Button
                      type="button"
                      className="bg-primary text-foreground dark:text-foreground hover:bg-primary/80 font-medium px-6 py-3 text-base shadow-lg border border-primary/30 rounded-2xl flex items-center gap-2 cursor-pointer"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </Button>
                  </Link>
                )}
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                  >
                    <Button
                      type="button"
                      className="bg-primary text-foregroun dark:text-foreground hover:bg-primary/80 font-medium px-6 py-3 text-base shadow-lg border border-primary/30 rounded-2xl flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Démo
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      {project.images && project.images.length > 1 && (
        <div className="w-full max-w-4xl mx-auto mt-10 mb-16">
          <h2 className="text-foreground text-2xl font-semibold mb-4 ml-4 sm:ml-8">
            Gallerie d&apos;images
          </h2>
          <ProjectImagesCarousel images={project.images} name={""} />
        </div>
      )}
    </>
  );
}
