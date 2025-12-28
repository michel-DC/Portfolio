"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ProjectsAnimation: React.FC = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // État initial
      tl.set(".projects-entry-text", { opacity: 0, y: 20 })
        .set(".projects-entry-overlay", {
          yPercent: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        })

        // Animation du texte
        .to(".projects-entry-text", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(".projects-entry-text", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.in",
          delay: 0.3,
        })

        // Animation de sortie (Slide up circulaire)
        .to(".projects-entry-overlay", {
          yPercent: -100,
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
          duration: 0.8,
          ease: "power2.inOut",
        })

        // Nettoyage (display: none pour ne plus bloquer les clics)
        .set(".projects-entry-container", { display: "none" });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={comp}
      className="projects-entry-container fixed inset-0 z-100 pointer-events-none"
    >
      <div className="projects-entry-overlay absolute inset-0 flex items-center justify-center bg-black pointer-events-auto">
        <p className="projects-entry-text text-7xl font-bold text-white font-bricolage-grotesque">
          Mes projets
        </p>
      </div>
    </div>
  );
};

export default ProjectsAnimation;
