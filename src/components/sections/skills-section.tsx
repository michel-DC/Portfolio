import Link from "next/link"
import Section from "@/components/section"
import { Layers, FileCode2, Atom, Database, Paintbrush, Hexagon, CircleDot, Code, Triangle } from "lucide-react"
import { Button } from "@/components/ui/button"

const skills = [
  {
    name: "Next.js",
    url: "https://nextjs.org",
    icon: Layers,
    description: "Framework fullstack pour mes projets web",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
    icon: FileCode2,
    description: "Typage statique pour un code robuste",
  },
  {
    name: "React",
    url: "https://react.dev",
    icon: Atom,
    description: "Librairie javascript via un système de composants",
  },
  {
    name: "PHP",
    url: "https://www.php.net",
    icon: Code,
    description: "Langage backend pour projets legacy",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    icon: Paintbrush,
    description: "Framework CSS utility-first pour styling rapide",
  },
  {
    name: "Node.js",
    url: "https://nodejs.org",
    icon: Hexagon,
    description: "Runtime JavaScript côté serveur",
  },
  {
    name: "Prisma",
    url: "https://www.prisma.io",
    icon: Database,
    description: "ORM moderne pour gestion de base de données",
  },
  {
    name: "PostgreSQL",
    url: "https://www.postgresql.org",
    icon: CircleDot,
    description: "Base de données relationnelle performante",
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    icon: Triangle,
    description: "Plateforme de déploiement et hosting",
  },
]

export function SkillsSection() {
  return (
    <Section className="flex flex-col items-start justify-center pt-8 pb-8 px-4 sm:px-8">
      <div className="flex flex-col justify-center">
        <h2 className="text-foreground/80 italic text-[22px] sm:text-[30px] leading-tight font-normal tracking-wider mb-1">
          Mes outils du quotidien
        </h2>
        <div className="flex-1 ml-8 pt-2">
          <ul className="list-disc text-foreground/70">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <li key={skill.name} className="mb-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <Button asChild className="p-2! h-8! min-w-0! w-auto!">
                        <Link
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-foreground transition-colors group"
                        >
                          <Icon className="w-4 h-4 shrink-0 text-foreground" />
                        </Link>
                      </Button>
                      <span className="font-medium">{skill.name}</span>
                      {/* Cacher la description sur mobile et afficher sur pc */}
                      <span className="hidden sm:inline text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors ml-2">
                        {skill.description}
                      </span>
                    </div>
                    {/* Cacher la description sur pc et afficher sur mobile */}
                    <span className="block sm:hidden text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors mt-1 ml-10">
                      {skill.description}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
