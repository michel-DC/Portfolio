"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
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
}

export function ProjectContent({ project }: ProjectContentProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <>
      <Section className="flex flex-col items-center pt-30 pb-10 px-4 sm:px-8">
        {/* Header */}
        <motion.div
          className="w-full max-w-4xl flex flex-col items-center text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h1
            className="text-foreground text-3xl sm:text-4xl font-bold mb-3"
            variants={fadeInUp}
          >
            {project.name}
          </motion.h1>
          <motion.h4
            className="text-foreground/50 text-sm mb-4"
            variants={fadeInUp}
          >
            Date de fin : {project.date}
          </motion.h4>

          {/* Themes */}
          <motion.div
            className="flex flex-row flex-wrap items-center gap-3 justify-center mb-6"
            variants={containerVariants}
          >
            {project.themes?.map((theme, idx) => (
              <motion.span
                key={theme + idx}
                className="inline-block px-4 py-2 rounded-lg bg-accent text-foreground/80 text-sm font-medium border border-foreground/10 hover:bg-accent/80 transition-colors"
                variants={tagVariants}
              >
                {theme}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Première image du projet */}
        {project.images && project.images.length > 0 && (
          <motion.div
            className="w-full mb-12 flex justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
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
          </motion.div>
        )}

        {/* Description & Context */}
        <motion.div
          className="w-full max-w-4xl mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-foreground text-2xl font-semibold mb-4"
            variants={fadeInUp}
          >
            À propos du projet
          </motion.h2>

          <motion.p
            className="text-foreground/80 text-base leading-relaxed mb-6"
            variants={fadeInUp}
          >
            {project.description}
          </motion.p>

          <motion.h3
            className="text-foreground text-2xl font-semibold mb-3"
            variants={fadeInUp}
          >
            Contexte
          </motion.h3>
          <motion.p
            className="text-foreground/70 text-base leading-relaxed"
            variants={fadeInUp}
          >
            {project.context}
          </motion.p>
        </motion.div>

        {/* Technologies Stack */}
        <motion.div
          className="w-full max-w-4xl mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h3
            className="text-foreground text-2xl font-semibold mb-4"
            variants={fadeInUp}
          >
            Stack Technique
          </motion.h3>
          <motion.div
            className="flex flex-wrap gap-3"
            variants={containerVariants}
          >
            {project.technologies?.map((tech) => (
              <motion.span
                key={tech}
                className="inline-block px-4 py-2 rounded-lg bg-accent text-foreground/80 text-sm font-medium border border-foreground/10 hover:bg-accent/80 transition-colors"
                variants={tagVariants}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Tasks, Results, Learning */}
        <motion.div
          className="w-full max-w-4xl space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={fadeInUp}>
            <h3 className="text-foreground text-2xl font-semibold mb-4">
              Mes tâches
            </h3>
            <ul className="space-y-3">
              {project.task?.map((tache, idx) => (
                <motion.li
                  key={idx}
                  className="text-foreground/70 text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                  variants={itemVariants}
                >
                  {tache}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-foreground text-2xl font-semibold mb-4">
              Résultats obtenus
            </h3>
            <ul className="space-y-3">
              {project.results?.map((result, idx) => (
                <motion.li
                  key={idx}
                  className="text-foreground/70 text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                  variants={itemVariants}
                >
                  {result}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-foreground text-2xl font-semibold mb-4">
              Apprentissages
            </h3>
            <ul className="space-y-3">
              {project.learningOutcomes?.map((appr, idx) => (
                <motion.li
                  key={idx}
                  className="text-foreground/70 text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                  variants={itemVariants}
                >
                  {appr}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Link */}
          {(project.github || project.url) && (
            <motion.div
              className="w-full flex justify-start items-center mt-16"
              variants={fadeInUp}
            >
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
                      className="bg-primary text-foreground dark:text-foreground hover:bg-primary/80 font-medium px-6 py-3 text-base shadow-lg border border-primary/30 rounded-2xl flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Démo
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </Section>

      {project.images && project.images.length > 1 && (
        <motion.div
          className="w-full max-w-4xl mx-auto mt-10 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-foreground text-2xl font-semibold mb-4 ml-4 sm:ml-8"
            variants={fadeInUp}
          >
            Gallerie d&apos;images
          </motion.h2>
          <motion.div variants={fadeIn}>
            <ProjectImagesCarousel images={project.images} name={""} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

