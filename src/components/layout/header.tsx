"use client";

import React, { useEffect, useState } from "react";
import Section from "../section";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("bgTheme") : null;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    } else {
      const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
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

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

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
            className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-border bg-background text-foreground hover:bg-foreground/10 transition"
            title={theme === "dark" ? "Passer en clair" : "Passer en sombre"}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
    </Section>
  );
}