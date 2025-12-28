"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const EntryAnimation: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    // On ne lance l'animation que sur la page d'accueil
    if (pathname !== "/") return;

    // Création du contexte GSAP pour un nettoyage facile
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // État initial
      tl.set(".entry-text", { opacity: 0, y: 20 })
        .set(".entry-overlay", {
          yPercent: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        })
        // Animation du texte
        .to(".entry-text", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(".entry-text", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.in",
          delay: 0.3,
        })
        // Animation de sortie (Slide up avec effet courbe)
        .to(".entry-overlay", {
          yPercent: -100,
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
          duration: 0.8,
          ease: "power2.inOut",
        })
        // Cache le container pour libérer les clics
        .set(".entry-container", { display: "none" });
    }, comp); // On lie le contexte au ref 'comp'

    // Nettoyage automatique des animations au démontage du composant
    return () => ctx.revert();
  }, [pathname]);

  // Si on n'est pas sur la home, on ne rend rien
  if (pathname !== "/") return null;

  return (
    <div
      ref={comp}
      className="entry-container fixed inset-0 z-100 pointer-events-none"
    >
      <div className="entry-overlay absolute inset-0 flex items-center justify-center bg-black pointer-events-auto">
        <p className="entry-text text-7xl font-bold text-white font-bricolage-grotesque">
          Hey🙃
        </p>
      </div>
    </div>
  );
};

export default EntryAnimation;
