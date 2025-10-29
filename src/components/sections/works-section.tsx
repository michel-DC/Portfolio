import Section from "@/components/section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, GraduationCap, Code2, Building  } from "lucide-react";

const experiences = [
   {
    company: "IUT de Vélizy-Villacoublay",
    url: "https://www.iut-velizy-rambouillet.uvsq.fr/",
    title: "Étudiant BUT MMI",
    period: "2024 - Aujourd'hui",
    description:
    "Formation en Métiers du Multimédia et de l'Internet. Projets universitaires orientés développement (fullstack, IA, UX/UI), mais aussi graphisme, 3D et communication.",
    icon: GraduationCap,
  },
  {
    company: "Bumps Agency",
    url: "https://www.bumps-agency.ch/",
    title: "Développeur Fullstack Freelance",
    period: "Juillet 2025 - Aujourd'hui",
    description:
      "Développement web principalement en React, TypeScript et Next.js pour plusieurs entreprises. Intégration d'IA via les assistants OpenAI et Perplexity via des fonctions serverless supabase. Réalisation d'intégrations front-end à partir de maquettes Figma.",
    icon: BriefcaseBusiness,
  },
  {
    company: "Lookaroun",
    url: "https://lookaroun.com",
    title: "Stage de 1ère année",
    period: "Juin 2025 - Aout 2025",
    description:
      "Intégration des maquettes Figma en React pour Lookaroun, création d’interfaces dynamiques via les API back-end, avec optimisation SEO, performances et responsive design soignés.",
    icon: Building,
  },
  {
    company: "Maison Vatier",
    url: "https://github.com/Vatier",
    title: "Développeur Front-end ",
    period: "Décembre 2024 - Mars 2025",
    description:
      "Site vitrine interactif conçu avec React.js et Tailwind CSS : maquettage sous Figma, intégration responsive, routage optimisé avec React Router, SEO soigné et déploiement cloud sur Vercel. Optimisation des performances et gestion du projet via Git/GitHub.",
    icon: Code2,
  }
];

export function WorksSection() {
  return (
    <Section className="flex flex-col items-start justify-center pt-8 pb-8 px-4 sm:px-8">
      <div className="w-full flex flex-col justify-center">
        <h2 className="text-foreground/80 italic text-[22px] sm:text-[30px] leading-tight font-normal tracking-wider mb-2">
          Mes expériences professionnelles
        </h2>
        <div className="ml-2">
        <ul className="list-disc pl-6 flex flex-col gap-6 pt-2 w-full">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <li
                key={exp.company}
                className="relative w-full"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    asChild
                    className="shadow border bg-background p-2 h-9 mr-0.5 flex items-center justify-center"
                  >
                    <Link
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 group hover:text-foreground transition-colors"
                      aria-label={exp.company}
                    >
                      <Icon className="w-4 h-4 text-foreground" />
                    </Link>
                  </Button>
                  <div className="flex flex-col min-w-0">
                    {/* Nom et titre + période */}
                    <div className="flex flex-row flex-wrap items-center gap-x-1 gap-y-1">
                      <span className="font-semibold text-foreground truncate">{exp.company}</span>
                      <span className="hidden sm:inline text-xs text-foreground/60 mx-2">|</span>
                      <span className="italic text-sm text-foreground/80 truncate">{exp.title}</span>
                    </div>
                    <div className="text-xs text-foreground/50">{exp.period}</div>
                    {/* Description toujours en dessous du nom, mobile et desktop */}
                    <span className="block text-[13px] sm:text-[15px] text-foreground/60 mt-1">{exp.description}</span>
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