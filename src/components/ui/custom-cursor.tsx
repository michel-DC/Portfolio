"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Centrer le curseur initialement
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15, // Un tout petit peu plus lent pour l'effet de suivi
        ease: "power2.out",
      });
    };

    // Gérer les effets de hover sur les liens et boutons
    const handleHoverStart = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: "rgba(0,0,0,0.5)",
        duration: 0.3,
      });
    };

    const handleHoverEnd = () => {
      gsap.to(cursor, { scale: 1, borderColor: "black", duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    // Ajouter les écouteurs pour les éléments interactifs
    const interactiveElements = document.querySelectorAll("a, button, input");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    // Observer pour les nouveaux éléments
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll("a, button, input");
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border border-black bg-transparent"
      style={{ willChange: "transform" }}
    />
  );
};

export default CustomCursor;
