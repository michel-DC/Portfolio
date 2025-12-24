"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Github, Linkedin, File } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function HeroSection() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.2 });

      tl.from(".hero-text-element", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2,
      }).from(
        ".hero-fixed-element",
        {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=1"
      );
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp}>
      <div className="hero-fixed-element hidden md:flex fixed left-6 bottom-20 z-10 flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-8">
          <Link
            href="https://linkedin.com/in/micheldjoumessi"
            aria-label="LinkedIn"
            className="group relative hover:text-[#0077b5] text-[#1E1E1E] transition-colors duration-300"
          >
            <Linkedin
              size={25}
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-rotate-6"
            />
          </Link>
          <Link
            href="https://github.com/michel-DC"
            aria-label="GitHub"
            className="group relative hover:text-black text-[#1E1E1E] transition-colors duration-300"
          >
            <Github
              size={25}
              className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5 group-hover:rotate-6"
            />
          </Link>
          <Link
            href="/documents/CV-MICHEL.pdf"
            aria-label="CV"
            className="group relative hover:text-green-500 text-[#1E1E1E] transition-colors duration-300"
          >
            <File
              size={25}
              className="transition-transform duration-200 ease-out group-hover:translate-y-0.5 group-hover:scale-105"
            />
          </Link>
        </div>
      </div>

      <div className="hero-fixed-element hidden md:block fixed left-8 top-1/2 z-10 h-96 w-px -translate-y-1/2 bg-[#1E1E1E]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#1E1E1E]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#1E1E1E]"></div>
      </div>
      <div className="hero-fixed-element fixed bottom-4 right-1/2 z-10 flex translate-x-1/2 items-center space-x-2">
        <span className="font-bricolage-grotesque text-lg">
          défiler vers le bas
        </span>
      </div>
      <div className="hero-fixed-element fixed bottom-8 right-8 z-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E1E1E]">
          <div className="h-px w-4 bg-white"></div>
        </div>
      </div>

      <main className="relative flex min-h-screen items-center justify-center">
        <div className="relative z-10 text-center px-4 md:px-0 drop-shadow-xl">
          <p className="hero-text-element text-xl md:text-4xl font-bricolage-grotesque mb-4">
            Salut! Je suis Michel
          </p>
          <h1 className="hero-text-element text-4xl md:text-8xl leading-tight">
            Développeur Full-stack
          </h1>
          <h2 className="hero-text-element text-4xl md:text-8xl leading-tight">
            UX & UI Designer.
          </h2>
        </div>
      </main>
    </div>
  );
}
