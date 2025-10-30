import Link from "next/link";
import { BriefcaseBusiness, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full z-30 flex flex-col items-center justify-center px-4 pt-6 pb-4 mt-14">
      <div
        className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl shadow-lg bg-white/60 dark:bg-white/10 backdrop-blur-lg border border-white/50 dark:border-white/15 px-6 py-3 gap-y-2 gap-x-6"
        style={{
          boxShadow:
            "0 1px 12px 0 rgba(30,30,30,0.11), 0 1.5px 0.5px 0 rgba(255,255,255,0.11) inset",
        }}
      >
        <div className="flex flex-row gap-2 items-center justify-center sm:justify-start w-full sm:w-auto">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="rounded-xl text-foreground font-semibold gap-2 px-3 py-1.5"
          >
            <Link
              href="https://github.com/michel-DC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir mon Github"
            >
              <Github className="size-5 text-foreground" />
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="rounded-xl text-foreground font-semibold gap-2 px-3 py-1.5"
          >
            <Link
              href="https://linkedin.com/in/micheldjoumessi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir mon LinkedIn"
            >
              <Linkedin className="size-5 text-foreground" />
            </Link>
          </Button>
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
            </Link>
          </Button>
        </div>
        <div className="text-xs text-foreground/70 font-normal text-center sm:text-right w-full sm:w-auto">
          © {new Date().getFullYear()} Michel DJOUMESSI. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
