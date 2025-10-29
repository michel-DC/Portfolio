"use client";

import React, { useEffect, useState, useRef } from "react";
import Section from "../section";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sun, Moon, Menu as MenuIcon } from "lucide-react";

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("bgTheme") : null;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    } else {
      const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const detected = prefersDark ? "dark" : "light";
      setTheme(detected as "dark" | "light");
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark"); else html.classList.remove("dark");
    html.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bgTheme", theme);
      window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
    }
  }, [theme]);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
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
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      return next;
    });
  };

  // Sections à visiter
  const sections = [
    { label: "Compétences", href: "#skills" },
    { label: "Expériences", href: "#works" },
    { label: "Projets", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "mailto:micheldjoumessi.contact@gmail.com" },
  ];

  return (
    <Section>
      <header className="sticky top-0 z-50 w-full">
        <div className="mx-auto max-w-6xl px-6 h-12 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-foreground hover:opacity-90 transition">
            onlinemichel.dev
          </Link>

          <div className="flex items-center gap-5 relative">
            <div className="relative">
              <Button
                ref={menuBtnRef}
                onClick={() => setMenuOpen((menu) => !menu)}
                aria-label="Ouvrir le menu"
                className="relative inline-flex items-center justify-center h-7 w-9 bg-white/15 dark:bg-white/10 backdrop-blur-md text-foreground hover:bg-white/25 dark:hover:bg-white/15 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-transparent"
                title="Menu"
                type="button"
                tabIndex={0}
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <MenuIcon size={20} className="w-5 h-5 shrink-0 text-foreground dark:text-foreground " />
              </Button>
              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-3 min-w-[180px] rounded-3xl z-50 p-2 flex flex-col gap-1 bg-white/20 dark:bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.09)] transition-all border border-transparent"
                  style={{
                    // Glassmorphism: blend bg + blur + light shadow, NO border color
                    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.35)"
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
              className="relative inline-flex items-center justify-center h-7 w-7 border border-border bg-background text-black dark:text-white hover:bg-foreground/10 transition"
              title={theme === "dark" ? "Passer en clair" : "Passer en sombre"}
            >
              {theme === "dark" ? (
                <Sun size={20} strokeWidth={2} color="#ffffff" className="z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] w-5 h-5 shrink-0" />
              ) : (
                <Moon size={20} strokeWidth={2} color="#000000" className="z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] w-5 h-5 shrink-0" />
              )}
            </Button>
          </div>
        </div>
      </header>
    </Section>
  );
}