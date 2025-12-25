"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Github, Linkedin, File } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";

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
          <motion.div
            whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="https://linkedin.com/in/micheldjoumessi"
              aria-label="LinkedIn"
              className="text-black hover:text-[#0A66C2] transition-colors duration-300"
            >
              <Linkedin size={25} />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="https://github.com/michel-DC"
              aria-label="GitHub"
              className="text-black hover:text-[#181717] transition-colors duration-300"
            >
              <Github size={25} />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/documents/CV-MICHEL.pdf"
              aria-label="CV"
              className="text-black hover:text-[#008366] transition-colors duration-300"
            >
              <File size={25} />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="hero-fixed-element hidden md:block fixed left-8 top-1/2 z-10 h-96 w-px -translate-y-1/2 bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-black"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-black"></div>
      </div>
      <div className="hero-fixed-element fixed bottom-4 right-1/2 z-10 flex translate-x-1/2 items-center space-x-2">
        <span className="font-bricolage-grotesque text-lg text-white">
          défiler vers le bas
        </span>
      </div>

      <main className="relative flex min-h-screen items-center justify-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative z-10 text-center px-4 md:px-0 drop-shadow-xl">
          <p className="hero-text-element text-xl text-white md:text-4xl font-bricolage-grotesque mb-4">
            Salut! Je suis Michel
          </p>
          <h1 className="hero-text-element text-4xl text-white md:text-8xl leading-tight">
            Développeur Full-stack
          </h1>
          <h2 className="hero-text-element text-4xl text-white md:text-8xl leading-tight">
            UX & UI Designer.
          </h2>
        </div>
      </main>
    </div>
  );
}
