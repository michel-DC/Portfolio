import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Calendar,
  Layers,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Header from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import ProjectEntryAnimation from "@/animations/project-entry-animation";

// Interface matching the JSON structure
interface ProjectData {
  name: string;
  slugName: string;
  description?: string;
  date: string;
  themes: string[];
  images: string[];
  technologies: string[];
  context: string;
  task: string[];
  results: string[];
  learningOutcomes?: string[];
  github?: string;
  url?: string;
  clientName?: string;
  clientLogo?: string;
}

// Helper to get all projects
function getAllProjects(): ProjectData[] {
  const projectsDirectory = path.join(process.cwd(), "src/data/projects");
  const filenames = fs.readdirSync(projectsDirectory);

  const projects = filenames
    .filter((filename) => filename.endsWith(".json"))
    .map((filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContent) as ProjectData;
    });

  return projects;
}

// Helper to get a specific project by slug
function getProject(slug: string): ProjectData | undefined {
  const projects = getAllProjects();
  return projects.find((p) => p.slugName === slug);
}

// Helper to get random projects excluding current
function getRandomProjects(
  currentSlug: string,
  count: number = 2
): ProjectData[] {
  const allProjects = getAllProjects();
  const otherProjects = allProjects.filter((p) => p.slugName !== currentSlug);
  // Simple shuffle
  return otherProjects.sort(() => 0.5 - Math.random()).slice(0, count);
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slugName,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: `${project.name} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const randomProjects = getRandomProjects(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ProjectEntryAnimation projectName={project.name.split(" • ")[0]} />
      <Header />
      <main className="grow pb-24 pt-32">
        {/* Back Link */}
        <div className="w-full px-4 md:px-24 mb-8">
          <Link
            href="/mes-projets"
            className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux projets
          </Link>
        </div>

        {/* Header Section */}
        <div className="w-full px-4 md:px-24 mb-8">
          <div className="flex justify-between items-start gap-8">
            {/* Left: Project Name */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {project.name.split(" • ")[0]}
            </h1>

            {/* Right: Subtitle in italics */}
            <div className="text-right self-center">
              <p className="text-lg md:text-xl lg:text-2xl italic text-neutral-600 dark:text-neutral-400">
                {project.name.split(" • ")[1] ||
                  project.description ||
                  project.context}
              </p>
            </div>
          </div>
        </div>

        {/* Image Section - Single Large Image */}
        <div className="w-full px-4 md:px-24 mb-16">
          <div className="w-full">
            <Image
              src={project.images[0]}
              alt={`${project.name} screenshot`}
              width={2400}
              height={1600}
              className="w-full h-auto"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        <div className="w-full px-4 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description & Context */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold">Contexte et Enjeux</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <p className="text-lg text-neutral-900 dark:text-neutral-200 font-medium mb-4">
                    {project.description}
                  </p>
                  <p>{project.context}</p>
                </div>
              </section>

              {/* Tasks */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Layers className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold">Missions réalisées</h2>
                </div>
                <ul className="grid grid-cols-1 gap-3">
                  {project.task.map((task, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Results */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold">Résultats</h2>
                </div>
                <ul className="grid grid-cols-1 gap-3">
                  {project.results.map((result, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Learning Outcomes */}
              {project.learningOutcomes &&
                project.learningOutcomes.length > 0 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="w-6 h-6 text-amber-500" />
                      <h2 className="text-2xl font-bold">
                        Compétences acquises
                      </h2>
                    </div>
                    <ul className="grid grid-cols-1 gap-3">
                      {project.learningOutcomes.map((outcome, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
            </div>

            {/* Sidebar Details */}
            <div className="space-y-8">
              <div className="sticky top-32 space-y-8">
                {/* Mobile Mockup - 2nd Image */}
                {project.images.length > 1 && (
                  <div className="relative aspect-9/16 w-full max-w-70 mx-auto overflow-hidden rounded-3xl  shadow-xl">
                    <Image
                      src={project.images[1]}
                      alt={`${project.name} mobile view`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>
                )}

                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-8">
                  {project.clientName && (
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
                        Client
                      </h3>
                      <div className="flex items-center gap-3">
                        {project.clientLogo && (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                            <Image
                              src={project.clientLogo}
                              alt={project.clientName}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 italic">
                          {project.clientName}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {project.date}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-neutral-700 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
                      Liens
                    </h3>
                    <div className="flex flex-col gap-3">
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          className="text-sm font-medium hover:text-emerald-600 transition-colors flex items-center gap-2"
                        >
                          <ArrowUpRight className="w-4 h-4" /> Voir le projet en
                          ligne
                        </Link>
                      )}
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          className="text-sm font-medium hover:text-emerald-600 transition-colors flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" /> Voir le code source
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discover More Section */}
        <div className="w-full px-4 md:px-24 mt-32 border-t border-neutral-200 dark:border-neutral-800 pt-16">
          <h2 className="text-3xl font-bold mb-12">
            Découvrir d&apos;autres projets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {randomProjects.map((p) => (
              <Link
                key={p.slugName}
                href={`/mes-projets/${p.slugName}`}
                className="group block"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-neutral-200 dark:border-neutral-800">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-bold group-hover:text-emerald-600 transition-colors mb-2">
                  {p.name.split(" • ")[0]}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {p.description || p.context}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
