"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const PrivacyAnimation: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scope = comp.current;

    if (!scope) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // État initial
      tl.set(".privacy-entry-text", { opacity: 0, y: 20 })
        .set(".privacy-entry-overlay", {
          yPercent: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        })

        // Animation du texte
        .to(".privacy-entry-text", {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        })
        .to(".privacy-entry-text", {
          opacity: 0,
          y: -20,
          duration: 0.25,
          ease: "power3.in",
          delay: 0.15,
        })

        // Animation de sortie (Slide up circulaire)
        .to(".privacy-entry-overlay", {
          yPercent: -100,
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
          duration: 0.45,
          ease: "power2.inOut",
        })

        // Nettoyage (display: none pour ne plus bloquer les clics)
        .set(scope, { display: "none" });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={comp}
      className="privacy-entry-container fixed inset-0 z-100 pointer-events-none"
    >
      <div className="privacy-entry-overlay absolute inset-0 flex items-center justify-center bg-black pointer-events-auto">
        <p className="privacy-entry-text text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4">
          Politique de Confidentialité
        </p>
      </div>
    </div>
  );
};

export default PrivacyAnimation;
