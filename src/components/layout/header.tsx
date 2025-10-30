"use client";

import React, { useLayoutEffect, useState, useRef } from "react";
import Section from "../section";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sun, Moon, Menu as MenuIcon } from "lucide-react";

/**
 * Header component with floating glassmorphism bubble, always visible during scroll.
 */
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
    { label: "Contact", href: "mailto:micheldjoumessi.contact@gmail.com" },
  ];

  // --- Floating Glass Morph Header Bubble  ---
  return (
    <div className="fixed top-4 left-0 w-full z-99 flex justify-center pointer-events-none">
      <header
        className="
        pointer-events-auto
        flex items-center w-full max-w-3xl
        mx-auto px-4 py-2 gap-2
        rounded-3xl shadow-lg
        bg-white/55 dark:bg-white/10
        backdrop-blur-[10px]
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
            className="ml-2 text-base font-bold text-foreground hover:opacity-90 transition whitespace-nowrap tracking-wide"
            style={{
              letterSpacing: "0.03em",
              textShadow: "0 1px 4px rgba(180,180,180,0.04)",
            }}
          >
            onlinemichel.dev
          </Link>
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <Button
              ref={menuBtnRef}
              onClick={() => setMenuOpen((menu) => !menu)}
              aria-label="Ouvrir le menu"
              className="relative inline-flex items-center justify-center h-8 w-9 bg-white/25 dark:bg-white/20 backdrop-blur-lg text-foreground hover:bg-white/35 dark:hover:bg-white/25 transition-all shadow border border-transparent"
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
                className="absolute right-0 mt-3 min-w-[180px] rounded-3xl z-50 p-2 flex flex-col gap-1 bg-white/80 dark:bg-white/15 backdrop-blur-md shadow-lg transition-all border border-white/70 dark:border-white/10"
                style={{
                  boxShadow:
                    "0 8px 32px 0 rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.35)",
                }}
              >
                {sections.map((section) => (
                  <Link
                    key={section.href}
                    href={section.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-foreground/90 hover:bg-white/25 dark:hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-white/30"
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
            className="relative inline-flex items-center justify-center h-8 w-8 border border-border bg-background text-black dark:text-white hover:bg-foreground/10 transition rounded-full"
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
    </div>
  );
}
