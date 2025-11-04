"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Section from "@/components/section";
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

interface ProjectContentProps {
  project: ProjectData;
  suggestedProjects?: ProjectData[];
}

export function ProjectContent({
  project,
  suggestedProjects = [],
}: ProjectContentProps) {
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
                  <Button
                    asChild
                    size="sm"
                    className="rounded-xl text-foreground font-semibold gap-2 px-8 py-5 shadow"
                  >
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4 text-foreground" />
                      <span className="text-foreground">GitHub</span>
                    </Link>
                  </Button>
                )}
                {project.url && (
                  <Button
                    asChild
                    size="sm"
                    className="rounded-xl text-foreground font-semibold gap-2 px-8 py-5 shadow"
                  >
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-4 text-foreground" />
                      <span className="text-foreground">Démo</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      {project.images && project.images.length > 1 && (
        <div className="w-full max-w-4xl mx-auto mt-10 mb-16">
          <h2 className="text-foreground text-center text-2xl font-semibold mb-4">
            Gallerie d&apos;images
          </h2>
          <ProjectImagesCarousel images={project.images} name={""} />
        </div>
      )}

      {/* Projets suggérés */}
      {suggestedProjects && suggestedProjects.length > 0 && (
        <Section className="flex flex-col items-center pt-20 pb-16 px-4 sm:px-8">
          <div className="w-full max-w-6xl">
            <h2 className="text-foreground text-2xl sm:text-3xl font-semibold mb-8 text-center">
              Autres projets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestedProjects.map((suggestedProject) => (
                <Link
                  key={suggestedProject.slugName}
                  href={`/projets/${suggestedProject.slugName}`}
                  className="group block h-full"
                >
                  <Card className="h-full overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <CardContent className="p-0 relative w-full h-full flex flex-col">
                      {/* Image container */}
                      <div className="relative w-full h-[220px] overflow-hidden">
                        <Image
                          src={
                            suggestedProject.images &&
                            suggestedProject.images.length > 0
                              ? suggestedProject.images[0]
                              : `/images/project-hover/${suggestedProject.slugName}.png`
                          }
                          alt={suggestedProject.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Date badge */}
                        <div className="absolute bottom-4 left-4 z-10">
                          <span className="bg-background/90 backdrop-blur-sm text-foreground/70 text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
                            {suggestedProject.date}
                          </span>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="flex flex-col flex-1 p-5 sm:p-6 bg-background/50 backdrop-blur-sm">
                        {/* Project name */}
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {suggestedProject.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-foreground/60 mb-4 line-clamp-3 leading-relaxed">
                          {suggestedProject.description}
                        </p>

                        {/* Tech stack badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {suggestedProject.themes
                            ?.slice(0, 3)
                            .map((theme, idx) => (
                              <span
                                key={theme + idx}
                                className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide border border-primary/20 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300"
                              >
                                {theme}
                              </span>
                            ))}
                        </div>

                        {/* CTA Link */}
                        <div className="flex items-center text-foreground/70 group-hover:text-primary transition-colors duration-300 mt-auto pt-2 border-t border-border/50">
                          <span className="text-sm font-medium mr-2">
                            Voir le projet
                          </span>
                          <ArrowRight className="w-4 h-4 transition-colors duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
