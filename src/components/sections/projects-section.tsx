"use client";

import Section from "@/components/section";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    json: "/src/data/projects/001.json",
    name: "Teamify • Gestion événementielle",
    slugName: "teamify",
    description: `Teamify est une plateforme collaborative permettant de créer, d'organiser et de gérer des événements en un seul endroit. Conçue pour les équipes et les particuliers, elle simplifie la planification grâce à des outils intuitifs de gestion des participants, de coordination en temps réel et de notifications personnalisées. Dotée d'une interface responsive et accessible, Teamify facilite la collaboration pour tous types d'événements, qu'ils soient professionnels ou personnels.`,
    date: "Octobre 2025",
    theme: ["Fullstack", "Next.JS"],
  },
  {
    json: "/src/data/projects/002.json",
    name: "App Analyzer • Audit de site web",
    slugName: "app-analyzer",
    description: `API Next.js complète pour l'audit automatique de sites web (Puppeteer & Lighthouse) : analyse HTML, métriques de performance, scores SEO, accessibilité, extraction des titres, rapport JSON détaillé, gestion d'erreurs robuste et typage TypeScript strict.`,
    date: "Octobre 2025",
    theme: ["Backend", "Next.JS"],
  },
  {
    json: "/src/data/projects/006.json",
    name: "Lookaroun • Application de networking",
    slugName: "lookaroun",
    description: `Lookaroun est une application de networking événementielle, créé par Ioana Marcoux, pour permettre aux utilisateurs de créer, de gérer et de participer des événements dans le but de créer des relations professionnelles.`,
    date: "Juin 2025",
    theme: ["Frontend", "React.JS"],
  },
  {
    json: "/src/data/projects/005.json",
    name: "Flow Media • Agence web fictive",
    slugName: "flow-media",
    description: `Ce projet consiste en la création du site internet de Flow Media, une agence fictive de communication basée à Paris. Réalisé dans le cadre d'un projet universitaire, il m'a permis d'appliquer mes compétences en développement web tout en répondant à un cahier des charges professionnel.`,
    date: "Mai 2025",
    theme: ["Fullstack", "PHP", "MySQL"],
  },
  {
    json: "/src/data/projects/003.json",
    name: "Framix • Landing page",
    slugName: "framix",
    description: `Framix est une landing page moderne et animée, conçue autour d'un outil fictif no-code permettant de construire des landing pages modulaires à partir de blocs visuels. L'objectif était de démontrer comment on peut orchestrer une expérience utilisateur fluide, élégante, pensée pour la conversion et l'accessibilité, avec une mise en avant d'animations et d'optimisations front-end avancées.`,
    date: "Août 2025",
    theme: ["Frontend", "Astro.JS", "React.JS"],
  },
  {
    json: "/src/data/projects/004.json",
    name: "Lexi AI • Landing page",
    slugName: "lexi-ai",
    description: `Lexi AI est une landing page moderne et animée, imaginée pour un outil fictif d'écriture assistée par intelligence artificielle. Le projet met en avant une expérience utilisateur fluide, un design soigné et des animations interactives pour capter l'attention des visiteurs.`,
    date: "Juillet 2025",
    theme: ["Frontend", "React.JS"],
  },
];

export function ProjectsSection() {
  return (
    <Section className="flex flex-col items-start justify-center pt-12 pb-16 px-4 sm:px-8">
      <div className="flex flex-col justify-center w-full">
        <h2 className="text-foreground/80 italic text-[25px] sm:text-[30px] leading-tight font-normal tracking-wider mb-8 sm:mb-12">
          Ma sélection de projets
        </h2>

        <div className="w-full">
          <div className="flex flex-col gap-6 sm:gap-8 w-full">
            {projects.map((project, index) => {
              return (
                <div
                  key={project.slugName}
                  className="w-full h-[500px] sm:h-[320px]"
                >
                  <Link
                    href={`/projets/${project.slugName}`}
                    className="group block h-full w-full"
                  >
                    <Card className="h-full w-full overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <CardContent className="p-0 relative w-full h-full flex flex-col sm:flex-row">
                        {/* Image container avec overlay - côté gauche sur desktop */}
                        <div className="relative w-full sm:w-[400px] sm:min-w-[400px] h-[220px] sm:h-full overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full h-full relative">
                              <Image
                                src={`/images/project-hover/${project.slugName}.png`}
                                alt={project.name}
                                fill
                                className="object-contain scale-95"
                                sizes="(max-width: 640px) 100vw, 340px"
                                priority={index < 2}
                              />
                            </div>
                          </div>
                          {/* Gradient overlay - visible uniquement sur mobile */}
                          <div className="absolute inset-0" />

                          {/* Date badge */}
                          <div className="absolute bottom-4 left-4 z-10">
                            <span className="bg-background/90 backdrop-blur-sm text-foreground/70 text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
                              {project.date}
                            </span>
                          </div>
                        </div>

                        {/* Content section - côté droit sur desktop */}
                        <div className="flex flex-col flex-1 p-5 sm:p-6 bg-background/50 backdrop-blur-sm min-w-0 h-full overflow-hidden">
                          {/* Project name */}
                          <h3 className="text-[18px] sm:text-[20px] font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 sm:line-clamp-2 tracking-wide">
                            {project.name}
                          </h3>

                          {/* Description */}
                          <p className="text-[14px] sm:text-[15px] text-foreground/60 mb-4 line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech stack badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            {project.theme.map((th, idx) => (
                              <span
                                key={th + idx}
                                className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wide border border-primary/20 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300"
                              >
                                {th}
                              </span>
                            ))}
                          </div>

                          {/* CTA Link */}
                          <div className="flex items-center text-foreground/70 group-hover:text-primary transition-colors duration-300 mt-auto pt-2 border-t border-border/50">
                            <span className="text-[13px] font-medium mr-2">
                              Voir le projet
                            </span>
                            <ArrowRight className="w-4 h-4 transition-colors duration-300" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
