"use client";

import React, { useEffect, useState } from "react";
import Section from "../section";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      return next;
    });
  };

  return (
    <Section>
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-6xl px-6 h-12 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-foreground hover:opacity-90 transition">
          onlinemichel.dev
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/blog" className="text-sm font-semibold text-foreground hover:opacity-90 transition">
            Blog
          </Link>
          <Button
            onClick={toggleTheme}
            aria-label="Basculer le thème"
            className="relative inline-flex items-center justify-center h-7 w-7 rounded-full border border-border bg-background text-black dark:text-white hover:bg-foreground/10 transition"
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