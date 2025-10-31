"use client";

import Section from "@/components/section";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Server, Globe, Palette, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const projects = [
  {
    name: "Teamify • Application de gestion événementielle",
    slugName: "teamify",
    description: `Teamify est une plateforme collaborative permettant de créer, d'organiser et de gérer des événements en un seul endroit. Conçue pour les équipes et les particuliers, elle simplifie la planification grâce à des outils intuitifs de gestion des participants, de coordination en temps réel et de notifications personnalisées. Dotée d'une interface responsive et accessible, Teamify facilite la collaboration pour tous types d'événements, qu'ils soient professionnels ou personnels.`,
    date: "Octobre 2025",
    theme: ["Fullstack", "Next.JS"],
    icon: Users,
  },
  {
    name: "App Analyzer • Audit de site web",
    slugName: "app-analyzer",
    description: `API Next.js complète pour l’audit automatique de sites web (Puppeteer & Lighthouse) : analyse HTML, métriques de performance, scores SEO, accessibilité, extraction des titres, rapport JSON détaillé, gestion d’erreurs robuste et typage TypeScript strict.`,
    date: "Octobre 2025",
    theme: ["Backend", "Next.JS"],
    icon: Server,
  },
  {
    name: "Framix • Landing page",
    slugName: "framix",
    description: `Framix est une landing page moderne et animée, conçue autour d’un outil fictif no-code permettant de construire des landing pages modulaires à partir de blocs visuels. L’objectif était de démontrer comment on peut orchestrer une expérience utilisateur fluide, élégante, pensée pour la conversion et l’accessibilité, avec une mise en avant d’animations et d’optimisations front-end avancées.`,
    date: "Août 2025",
    theme: ["Frontend", "Astro.JS", "React.JS"],
    icon: Palette,
  },
  {
    name: "Lexi AI • Landing page",
    slugName: "lexi-ai",
    description: `Lexi AI est une landing page moderne et animée, imaginée pour un outil fictif d’écriture assistée par intelligence artificielle. Le projet met en avant une expérience utilisateur fluide, un design soigné et des animations interactives pour capter l’attention des visiteurs.`,
    date: "Juillet 2025",
    theme: ["Frontend", "React.JS"],
    icon: Sparkles,
  },
  {
    name: "Flow Media • Agence web fictive",
    slugName: "flow-media",
    description: `Ce projet consiste en la création du site internet de Flow Media, une agence fictive de communication basée à Paris. Réalisé dans le cadre d'un projet universitaire, il m'a permis d'appliquer mes compétences en développement web tout en répondant à un cahier des charges professionnel.`,
    date: "Mai 2025",
    theme: ["Fullstack", "PHP", "MySQL"],
    icon: Globe,
  },
];

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <Section className="flex flex-col items-start justify-center pt-8 pb-8 px-4 sm:px-8">
      <div className="flex flex-col justify-center w-full">
        <h2 className="text-foreground/80 italic text-[25px] sm:text-[30px] leading-tight font-normal tracking-wider mb-2">
          Ma sélection de projets
        </h2>
        <div className="ml-2">
          <ul className="list-disc pl-2 flex flex-col gap-6 pt-2 w-full">
            {projects.map((project) => {
              const Icon = project.icon;
              // Définition d'une longueur seuil pour sauter une ligne sur mobile (ex: 35 caractères)
              const isLongName = project.name.length > 35;
              return (
                <li key={project.slugName} className="relative w-full">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Icône et bouton seulement sur desktop+ */}
                    <div className="hidden sm:block">
                      <Button
                        asChild
                        className="shadow border bg-background p-2 h-9 mr-0.5 flex items-center justify-center"
                      >
                        <Link
                          href={`/project/${project.slugName}`}
                          className="inline-flex items-center gap-2 group hover:text-foreground transition-colors"
                          aria-label={project.name}
                        >
                          <Icon className="w-4 h-4 text-foreground" />
                        </Link>
                      </Button>
                    </div>
                    {/* Sur mobile: pas d'icône/bouton, juste remplissage */}
                    <div className="sm:hidden" />
                    <div className="flex flex-col min-w-0 w-full">
                      {/* Carte projet au hover du nom du projet */}
                      <div className="relative flex flex-col sm:flex-row sm:items-center sm:gap-x-2 flex-wrap gap-y-1">
                        <div className="relative">
                          {/* Sur mobile, si le nom est trop long, forcer le saut de ligne */}
                          <Link
                            href={`/project/${project.slugName}`}
                            className={`text-[17px] font-semibold text-foreground hover:underline underline-offset-4 hover:text-primary transition-colors ${
                              // Sur mobile, wrap si trop long
                              isLongName
                                ? "truncate sm:truncate whitespace-normal max-w-full sm:max-w-none block"
                                : "truncate"
                            }`}
                            style={
                              isLongName
                                ? {
                                    // Sur mobile, force un maxWidth en px et wrap si nécessaire
                                    maxWidth: "230px",
                                    whiteSpace: "normal",
                                    wordBreak: "break-word",
                                    display: "block",
                                  }
                                : undefined
                            }
                            onMouseEnter={() =>
                              setHoveredProject(project.slugName)
                            }
                            onMouseLeave={() => setHoveredProject(null)}
                          >
                            {project.name}
                          </Link>
                          {/* Card flottante seulement si survolé et sur desktop */}
                          {hoveredProject === project.slugName && (
                            <div className="hidden sm:block absolute -top-[160px] left-1/2 -translate-x-1/2 z-30 min-w-[240px] w-[260px] animate-fadeIn pointer-events-none">
                              <Card className="">
                                <CardContent className="p-0">
                                  <Image
                                    src={`/images/project-hover/${project.slugName}.png`}
                                    alt={project.name}
                                    className="w-full h-[150px] object-cover rounded-t-xl"
                                    width={320}
                                    height={150}
                                    style={{
                                      borderRadius: "0.75rem",
                                    }}
                                    sizes="(max-width: 640px) 100vw, 320px"
                                    priority
                                  />
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </div>
                        {/* Thèmes du projet sur la droite du nom sur desktop, en-dessous sur mobile */}
                        <div className="flex flex-row flex-wrap items-center gap-2 mt-1 mb-0.5 sm:mt-0">
                          {project.theme.map((th, idx) => (
                            <span
                              key={th + idx}
                              className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide"
                            >
                              {th}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Description */}
                      <span className="block text-[15px] sm:text-[15px] text-foreground/60 mt-1">
                        {project.description}
                      </span>
                      {/* Date */}
                      <span className="text-foreground/50 text-[14px] mt-1">
                        {project.date}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
