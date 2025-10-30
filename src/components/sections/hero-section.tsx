import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, BriefcaseBusiness } from "lucide-react";
import Section from "@/components/section";

export function HeroSection() {
  return (
    <Section className="w-full min-h-[280px] flex flex-col items-start justify-center pt-30 pb-10 px-4 sm:px-8">
      {/* Bloc avatar + infos sur mobile */}
      <div className="flex flex-row items-center gap-4 mb-2 sm:hidden w-full">
        <div className="shrink-0">
          <Image
            src="/images/logo/avatar.png"
            alt="Avatar"
            width={90}
            height={90}
            className="rounded-full shadow-xl object-cover bg-background"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-foreground italic text-[28px] leading-tight mb-0 font-normal">
            Michel Christ Djoumessi
          </h1>
          <div className="text-foreground text-[18px]">
            Dévéloppeur Fullstack Junior
          </div>
        </div>
      </div>

      {/* PC / Desktop: Avatar + infos + desc d'un côté, boutons en dessous */}
      <div className="hidden sm:flex flex-col w-full">
        <div className="flex flex-row items-center gap-6 w-full">
          {/* Avatar */}
          <div className="shrink-0">
            <Image
              src="/images/logo/avatar.png"
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full shadow-xl object-cover bg-background"
              priority
            />
          </div>
          {/* Textes desktop */}
          <div className="flex flex-col items-start text-left flex-1">
            <h1 className="text-foreground italic text-[35px] sm:text-[40px] leading-tight tracking-normal mb-1 font-normal">
              Michel Christ Djoumessi
            </h1>
            <h4 className="text-foreground text-[18px]">
              Dévéloppeur Fullstack Juinior
            </h4>
          </div>
        </div>
        <div className="flex flex-col gap-0 mt-4">
          <p className="text-[15px] text-foreground/70 font-normal italic max-w-4xl mb-4 leading-relaxed">
            Étudiant en deuxième année de BUT Métier du multimédia et de
            l&apos;internet. Développeur Fullstack en freelance spécialisé dans
            l&apos;écosystème TypeScript. Passionné par le développement web et
            l&apos;intéligence artificielle.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <Button
              asChild
              size="sm"
              className="rounded-xl text-foreground font-semibold gap-2 px-4 py-1.5 shadow"
            >
              <Link
                href="https://github.com/michel-DC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4 text-foreground" />
                <span className="text-foreground">Github</span>
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-xl text-foreground font-semibold gap-2 px-4 py-1.5 shadow"
            >
              <Link
                href="https://linkedin.com/in/micheldjoumessi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="size-4 text-foreground" />
                <span className="text-foreground">LinkedIn</span>
              </Link>
            </Button>
            {/* Malt */}
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-white hover:bg-[#FA2742]/10 text-foreground font-semibold gap-2 px-4 py-1.5 shadow border border-[#FA2742]/20"
            >
              <Link
                href="https://www.malt.fr/profile/micheldjoumessi1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BriefcaseBusiness className="size-4 text-foreground" />
                <span className="text-foreground">Malt</span>
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-[#222] hover:bg-[#444] text-black dark:text-foreground font-semibold gap-2 px-4 py-1.5 shadow"
            >
              <Link
                href="mailto:micheldjoumessi.contact@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="size-4 text-black dark:text-foreground" />{" "}
                Gmail
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Bio et boutons sur mobile  */}
      <div className="sm:hidden flex flex-col w-full items-start mt-2">
        <p className="text-[15px] text-foreground/60 font-normal italic max-w-xl mb-5 leading-relaxed">
          Étudiant en deuxième année de BUT Métier du multimédia et de
          l&apos;internet. Développeur Fullstack en freelance spécialisé dans
          l&apos;écosystème TypeScript. Passionné par le développement web et
          l&apos;intéligence artificielle.
        </p>
        <div className="flex flex-wrap justify-start gap-2 w-full">
          <Button
            asChild
            className="text-foreground font-semibold gap-1.5 px-3 py-1 shadow text-[13px]"
          >
            <Link
              href="https://github.com/michel-DC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-3.5 text-foreground" />
              <span className="text-foreground">GitHub</span>
            </Link>
          </Button>
          <Button
            asChild
            className="text-foreground font-semibold gap-1.5 px-3 py-1 shadow text-[13px]"
          >
            <Link
              href="https://linkedin.com/in/micheldjoumessi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-3.5 text-foreground" />
              <span className="text-foreground">LinkedIn</span>
            </Link>
          </Button>
          {/* Malt */}
          <Button
            asChild
            className="bg-white hover:bg-[#FA2742]/10 text-foreground font-semibold gap-1.5 px-3 py-1 shadow border border-[#FA2742]/20 text-[13px]"
          >
            <Link
              href="https://www.malt.fr/profile/micheldjoumessi1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BriefcaseBusiness className="size-3.5 text-foreground" />
              <span className="text-foreground">Malt</span>
            </Link>
          </Button>
          <Button
            asChild
            className="bg-[#222] hover:bg-[#444] text-black dark:text-foreground font-semibold gap-1.5 px-3 py-1 shadow text-[13px]"
          >
            <Link
              href="mailto:micheldjoumessi.contact@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="size-3.5 text-black dark:text-foreground" />{" "}
              Gmail
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
