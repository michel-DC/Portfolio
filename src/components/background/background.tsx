"use client";

import React, { useEffect, useRef, useState } from "react";

interface BackgroundProps {
  children: React.ReactNode;
}

export function Background({ children }: BackgroundProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("bgTheme") : null;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      return;
    }
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Synchronise avec d'éventuels changements externes (ex: bouton dans le header)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === "bgTheme") {
        const next = e.newValue === "dark" ? "dark" : "light";
        setTheme(next);
      }
    };
    const onCustom = (e: Event) => {
      const anyEvt = e as CustomEvent<string>;
      const next = anyEvt.detail === "dark" ? "dark" : "light";
      setTheme(next);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("theme-change", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("theme-change", onCustom as EventListener);
    };
  }, []);

  const backgroundUrl = theme === "dark" ? "/images/background/dark.png" : "/images/background/light.png";

  

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    html.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div ref={rootRef} data-theme={theme} className={`min-h-screen relative`}>
      <div
        key={theme}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundUrl}?v=${theme})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
