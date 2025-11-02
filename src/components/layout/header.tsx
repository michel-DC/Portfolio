"use client";

import React, { useLayoutEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sun, Moon, Menu as MenuIcon } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("bgTheme");
      if (saved === "dark" || saved === "light") {
        return saved;
      }
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Appliquer le thème dans le DOM
  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    html.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bgTheme", theme);
      window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
    }
  }, [theme]);

  // Fermer le menu si on clique en dehors
  React.useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  // Sections à visiter
  const sections = [
    { label: "Compétences", href: "#skills" },
    { label: "Expériences", href: "#works" },
    { label: "Projets", href: "#projects" },
    { label: "Article de blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  // Handler pour scroll avec offset de 20px vers le bas
  const handleSectionClick = (e: React.MouseEvent, href: string) => {
    // Pour mailto ou liens externes on laisse le comportement par défaut
    if (!href.startsWith("#")) return;

    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      // Scroll vers l'id en soustrayant 20px après le top relatif à la fenêtre
      const scrollTarget = window.scrollY + rect.top - 40;
      window.scrollTo({
        top: scrollTarget,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <motion.div
      className="fixed top-2 left-0 w-full z-99 flex justify-center pointer-events-none sm:top-4"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <header
        className="
          pointer-events-auto
          flex items-center
          w-[99vw] max-w-[380px] xs:max-w-[420px] sm:w-full sm:max-w-3xl
          mx-auto
          px-2 py-1 sm:px-4 sm:py-2 gap-1 sm:gap-2
          rounded-3xl
          shadow-lg
          bg-white/80 dark:bg-white/10
          backdrop-blur-sm sm:backdrop-blur-md
          border border-white/60 dark:border-white/15
          transition-all
        "
        style={{
          boxShadow:
            "0 2px 16px 0 rgba(30,30,30,0.12), 0 1.5px 0.5px 0 rgba(255,255,255,0.12) inset",
        }}
      >
        <div className="flex flex-1 items-center min-w-0">
          <Link
            href="/"
            className="ml-1 sm:ml-2 text-xs sm:text-base font-bold text-foreground hover:opacity-90 transition whitespace-nowrap tracking-wide max-w-[110px] xs:max-w-[140px] sm:max-w-none truncate"
            style={{
              letterSpacing: "0.03em",
              textShadow: "0 1px 4px rgba(180,180,180,0.04)",
            }}
          >
            onlinemichel.dev
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 relative">
          <div className="relative">
            <Button
              ref={menuBtnRef}
              onClick={() => setMenuOpen((menu) => !menu)}
              aria-label="Ouvrir le menu"
              className="relative inline-flex items-center justify-center h-9 w-9 sm:h-8 sm:w-9 bg-white/25 dark:bg-white/20 backdrop-blur-lg text-foreground hover:bg-white/35 dark:hover:bg-white/25 transition-all shadow border border-transparent"
              title="Menu"
              type="button"
              tabIndex={0}
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <MenuIcon
                size={20}
                className="w-5 h-5 shrink-0 text-foreground dark:text-foreground"
              />
            </Button>
            {menuOpen && (
              <div
                ref={menuRef}
                className={`
      absolute right-0 mt-3 min-w-[145px] xs:min-w-[165px] sm:min-w-[190px] 
      rounded-2xl sm:rounded-3xl z-50 p-1.5 sm:p-2
      flex flex-col gap-1
      ${
        menuOpen
          ? `bg-background backdrop-blur-none! shadow-none! border-transparent!
            sm:bg-neutral-100sm:dark:bg-neutral-900
            sm:border sm:border-white/45 sm:dark:border-white/7
          `
          : `bg-white/95 dark:bg-white/15 backdrop-blur-md shadow-lg border border-white/70 dark:border-white/10 
            sm:bg-white/95 sm:dark:bg-white/15 
            sm:border sm:border-white/45 sm:dark:border-white/7
          `
      }
      transition-all
    `}
                style={{
                  boxShadow:
                    "0 10px 40px 0 rgba(80,80,180,0.14), 0 1.5px 0.5px 0 rgba(255,255,255,0.23) inset, 0 2px 8px rgba(255,255,255,0.13) inset",
                  backdropFilter: "blur(18px) saturate(1.3) brightness(1.13)",
                  WebkitBackdropFilter:
                    "blur(18px) saturate(1.3) brightness(1.13)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  ...(window.innerWidth < 640 && {
                    boxShadow:
                      "0 8px 32px 0 rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    border: "1px solid transparent",
                  }),
                }}
              >
                {sections.map((section) => (
                  <Link
                    key={section.href}
                    href={section.href}
                    onClick={(e) => {
                      handleSectionClick(e, section.href);
                      if (!section.href.startsWith("#")) setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 sm:gap-3 px-2.5 py-2 sm:px-4 rounded-xl text-sm font-medium text-foreground/90 hover:bg-white/25 dark:hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-white/30"
                    tabIndex={0}
                  >
                    {section.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={toggleTheme}
            aria-label="Basculer le thème"
            className="relative inline-flex items-center justify-center h-9 w-9 sm:h-8 sm:w-8 border border-border bg-background text-black dark:text-white hover:bg-foreground/10 transition rounded-full"
            title={theme === "dark" ? "Passer en clair" : "Passer en sombre"}
          >
            {theme === "dark" ? (
              <Sun
                size={20}
                strokeWidth={2}
                color="#ffffff"
                className="z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] w-5 h-5 shrink-0"
              />
            ) : (
              <Moon
                size={20}
                strokeWidth={2}
                color="#000000"
                className="z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] w-5 h-5 shrink-0"
              />
            )}
          </Button>
        </div>
      </header>
    </motion.div>
  );
}
