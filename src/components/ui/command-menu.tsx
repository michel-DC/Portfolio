"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  FileText,
  User,
  Briefcase,
  Home,
  ShieldCheck,
  Lock,
  ExternalLink,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    title: "Teamify • Application de gestion événementielle",
    slug: "teamify",
  },
  {
    title: "App Analyzer • Audit de site web",
    slug: "app-analyzer",
  },
  {
    title: "Lookaroun • Application de networking",
    slug: "lookaroun",
  },
  {
    title: "Flow Media • Agence web fictive",
    slug: "flow-media",
  },
  {
    title: "Elecsud Energies • Électricien à Marseille",
    slug: "elecsud-energies",
  },
  {
    title: "Framix • Landing page",
    slug: "framix",
  },
  {
    title: "Lexi AI • Landing page",
    slug: "lexi-ai",
  },
];

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const toggle = () => setOpen((open) => !open);

    document.addEventListener("keydown", down);
    document.addEventListener("toggle-command-menu", toggle);
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("toggle-command-menu", toggle);
    };
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Search"
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setOpen(false)}
      >
        <div
          className="w-full max-w-[640px] bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="sr-only">Menu de commande globale</h2>
          <div className="flex items-center border-b border-gray-100 px-4 py-3">
            <Search className="mr-3 h-5 w-5 text-gray-400" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Rechercher une page, un projet ou mon CV..."
              className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 text-base"
            />
            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md">
              <span className="text-[10px] font-medium text-gray-500">ESC</span>
            </div>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center text-sm text-gray-500">
              Aucun résultat trouvé pour "{search}".
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="px-2 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
            >
              <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                <Home className="mr-3 h-4 w-4" />
                <span>Accueil</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push("/a-propos"))}
              >
                <User className="mr-3 h-4 w-4" />
                <span>À propos</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push("/mes-projets"))}
              >
                <Briefcase className="mr-3 h-4 w-4" />
                <span>Mes Projets</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push("/#contact"))}
              >
                <Search className="mr-3 h-4 w-4" />
                <span>Me contacter</span>
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      "/documents/MICHEL-DJOUMESSI-ALTERNANCE.pdf",
                      "_blank",
                    ),
                  )
                }
              >
                <FileText className="mr-3 h-4 w-4" />
                <span>Mon CV (PDF)</span>
              </CommandItem>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 mx-2 my-2" />

            <Command.Group
              heading="Réseaux"
              className="px-2 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
            >
              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      "https://linkedin.com/in/micheldjoumessi",
                      "_blank",
                    ),
                  )
                }
              >
                <Linkedin className="mr-3 h-4 w-4 text-[#0077b5]" />
                <span>LinkedIn</span>
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    window.open("https://github.com/michel-DC", "_blank"),
                  )
                }
              >
                <Github className="mr-3 h-4 w-4 text-black" />
                <span>GitHub</span>
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      "https://www.malt.fr/profile/micheldjoumessi1",
                      "_blank",
                    ),
                  )
                }
              >
                <ExternalLink className="mr-3 h-4 w-4 text-[#ff5b5b]" />
                <span>Malt</span>
              </CommandItem>
            </Command.Group>

            {search.length > 0 && (
              <>
                <Command.Separator className="h-px bg-gray-100 mx-2 my-2" />

                <Command.Group
                  heading="Projets"
                  className="px-2 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                >
                  {PROJECTS.map((project) => (
                    <CommandItem
                      key={project.slug}
                      onSelect={() =>
                        runCommand(() =>
                          router.push(`/mes-projets/${project.slug}`),
                        )
                      }
                    >
                      <FileText className="mr-3 h-4 w-4 text-[#4E6471]" />
                      <span>{project.title}</span>
                    </CommandItem>
                  ))}
                </Command.Group>

                <Command.Separator className="h-px bg-gray-100 mx-2 my-2" />

                <Command.Group
                  heading="Documents & Légal"
                  className="px-2 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                >
                  <CommandItem
                    onSelect={() =>
                      runCommand(() =>
                        window.open(
                          "/documents/MICHEL-DJOUMESSI-ALTERNANCE.pdf",
                          "_blank",
                        ),
                      )
                    }
                  >
                    <Download className="mr-3 h-4 w-4 text-blue-500" />
                    <span>Télécharger mon CV (PDF)</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() =>
                      runCommand(() => router.push("/mentions-legales"))
                    }
                  >
                    <ShieldCheck className="mr-3 h-4 w-4" />
                    <span>Mentions Légales</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() =>
                      runCommand(() =>
                        router.push("/politique-de-confidentialite"),
                      )
                    }
                  >
                    <Lock className="mr-3 h-4 w-4" />
                    <span>Politique de Confidentialité</span>
                  </CommandItem>
                </Command.Group>
              </>
            )}
          </Command.List>

          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 rounded">
                  ↑↓
                </kbd>
                <span className="text-[10px] text-gray-400">Naviguer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 rounded">
                  ↵
                </kbd>
                <span className="text-[10px] text-gray-400">Sélectionner</span>
              </div>
            </div>
            <div className="text-[10px] text-gray-400 italic">
              Michel DJOUMESSI • Portfolio
            </div>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}

function CommandItem({
  children,
  onSelect,
  className,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "flex items-center px-3 py-2.5 rounded-xl cursor-default select-none outline-none transition-colors",
        "aria-selected:bg-[#4E6471]/10 aria-selected:text-[#4E6471] text-gray-700",
        className,
      )}
    >
      {children}
    </Command.Item>
  );
}
