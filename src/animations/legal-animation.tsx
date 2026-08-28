"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const LegalAnimation: React.FC = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // État initial
      tl.set(".legal-entry-text", { opacity: 0, y: 20 })
        .set(".legal-entry-overlay", {
          yPercent: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        })

        // Animation du texte
        .to(".legal-entry-text", {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        })
        .to(".legal-entry-text", {
          opacity: 0,
          y: -20,
          duration: 0.25,
          ease: "power3.in",
          delay: 0.15,
        })

        // Animation de sortie (Slide up circulaire)
        .to(".legal-entry-overlay", {
          yPercent: -100,
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
          duration: 0.45,
          ease: "power2.inOut",
        })

        // Nettoyage (display: none pour ne plus bloquer les clics)
        .set(comp.current, { display: "none" });
    }, comp.current);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={comp}
      className="legal-entry-container fixed inset-0 z-100 pointer-events-none"
    >
      <div className="legal-entry-overlay absolute inset-0 flex items-center justify-center bg-black pointer-events-auto">
        <p className="legal-entry-text text-5xl md:text-7xl font-bold text-white">
          Mentions Légales
        </p>
      </div>
    </div>
  );
};

export default LegalAnimation;
