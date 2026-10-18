"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import localFont from "next/font/local";
import { Github, Linkedin, BriefcaseBusiness, FileDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const italiana = localFont({
  src: "../../../../public/fonts/italiana/Italiana-Regular.ttf",
  display: "swap",
  weight: "400",
});

const accentLettering = localFont({
  src: "../../../../public/fonts/amoria/AMORIA-BF64a2f6809ce9e.otf",
  display: "swap",
  weight: "400",
});

export default function HeroSection(): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const nameRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const entrance = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "expo.out",
          clearProps: "transform,transformOrigin,opacity",
        },
      });

      entrance
        .from("[data-name-line]", { yPercent: 30, opacity: 0, stagger: 0.12 }, 0)
        .from("[data-name-accent='i']", {
          rotation: -35,
          scale: 0.6,
          opacity: 0,
          transformOrigin: "50% 70%",
          duration: 1,
        }, 0.18)
        .from("[data-name-accent='o']", {
          rotation: -100,
          scale: 0.65,
          opacity: 0,
          transformOrigin: "50% 55%",
          duration: 1,
        }, 0.3);
    });

    return (): void => media.revert();
  }, { scope: nameRef });

  return (
    <section className="relative flex min-h-svh w-full overflow-hidden bg-transparent px-4 pt-32 pb-6 text-[#1A1A1A] sm:px-6 md:px-[4vw] md:pt-[clamp(6rem,13.33svh,9rem)] md:pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--portfolio-accent) 0%, transparent 70%)",
        }}
      />

      <div className="hero-wrapper relative z-10 mx-auto flex w-full max-w-[2200px] flex-col justify-between gap-4">
        <div className="hero-top-meta">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
              className="meta-inner italic block text-sm md:text-base opacity-75 tracking-tight"
            >
              Disponible en freelance pour vous
            </motion.span>
          </div>
        </div>

        <div className="my-auto flex w-full -translate-y-3 flex-col py-4 md:-translate-y-4">
          <h1
            ref={nameRef}
            aria-label="Michel Djoumessi"
            className="flex w-full flex-col gap-[0.05em] text-[clamp(3.25rem,18.5vw,26rem)] leading-[0.9] font-normal tracking-[-0.025em]"
          >
            <span
              data-name-line
              aria-hidden="true"
              className={`${italiana.className} block whitespace-nowrap`}
            >
              M<span data-name-accent="i" className={`${accentLettering.className} inline-block text-[var(--portfolio-accent)]`}>i</span>CHEL
            </span>
            <span
              data-name-line
              aria-hidden="true"
              className={`${italiana.className} block self-end text-[0.94em] whitespace-nowrap`}
            >
              DJ<span data-name-accent="o" className={`${accentLettering.className} inline-block text-[var(--portfolio-accent)]`}>O</span>UMESSI
            </span>
          </h1>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.7 }}
            className="mt-8 flex w-full flex-wrap justify-center gap-3 md:gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="glass"
                asChild
                className="h-10 md:h-11 px-6 md:px-12 text-sm text-black bg-gray-100/30 backdrop-blur-sm border border-gray-200 hover:bg-white/80 rounded-full"
              >
                <Link
                  href="https://linkedin.com/in/micheldjoumessi"
                  target="_blank"
                  className="hover:text-[#0A66C2] font-bold flex items-center"
                >
                  <Linkedin size={16} className="mr-2" />
                  LinkedIn
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="glass"
                asChild
                className="h-10 md:h-11 px-6 md:px-12 text-sm text-black bg-gray-100/30 backdrop-blur-sm border border-gray-200 hover:bg-white/80 rounded-full"
              >
                <Link
                  href="https://github.com/michel-DC"
                  target="_blank"
                  className="hover:text-[#181717] flex items-center"
                >
                  <Github size={16} className="mr-2" />
                  GitHub
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="glass"
                asChild
                className="h-10 md:h-11 px-6 md:px-12 text-sm text-black bg-gray-100/30 backdrop-blur-sm border border-gray-200 hover:bg-white/80 rounded-full"
              >
                <Link
                  href="https://www.malt.fr/profile/micheldjoumessi1"
                  target="_blank"
                  className="hover:text-[#FC5757] flex items-center"
                >
                  <BriefcaseBusiness size={16} className="mr-2" />
                  Malt
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="glass"
                asChild
                className="h-10 md:h-11 px-6 md:px-12 text-sm text-black bg-gray-100/30 backdrop-blur-sm border border-gray-200 hover:bg-white/80 rounded-full"
              >
                <Link
                  href="/documents/MICHEL-DJOUMESSI-ALTERNANCE.pdf"
                  target="_blank"
                  className="hover:text-[var(--accent-ink)] flex items-center"
                >
                  <FileDown size={16} className="mr-2" />
                  Mon CV
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-bottom-meta flex justify-between items-end">
          <div className="scroll-indicator hidden md:block">
            <div className="scroll-line w-[1px] h-12 bg-black/10 relative overflow-hidden">
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: ["-100%", "100%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-full bg-[var(--portfolio-accent)]"
              />
            </div>
          </div>

          <div className="location-info text-right">
            <span className="label block text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-1">
              Paris, France
            </span>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.45, delay: 0.65, ease: "easeOut" }}
                className="meta-inner block text-xs md:text-sm opacity-65 tracking-tighter"
              >
                48.85° N, 2.35° E
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
