"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Github, Linkedin, File, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button-liquid";

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
    <div ref={comp} className="relative">
      <div className="hero-fixed-element hidden md:block absolute left-8 top-1/2 z-10 h-1/2 w-px -translate-y-1/2 bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-black"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-black"></div>
      </div>
      <motion.div
        className="hero-fixed-element absolute bottom-4 right-1/2 z-10 flex translate-x-1/2 items-center space-x-2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="font-bricolage-grotesque text-lg text-black">
          défiler vers le bas
        </span>
      </motion.div>

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
          <p className="hero-text-element text-xl text-black md:text-4xl font-bricolage-grotesque mb-4">
            Salut! Je suis Michel
          </p>
          <h1 className="hero-text-element text-4xl text-black md:text-8xl leading-tight">
            Développeur Full-stack
          </h1>
          <h2 className="hero-text-element text-4xl text-black md:text-8xl leading-tight">
            UX & UI Designer.
          </h2>
          <div className="hero-text-element flex flex-wrap justify-center gap-4 mt-8">
            <motion.div
              whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="glass"
                asChild
                className="text-black font-bricolage-grotesque"
              >
                <Link
                  href="https://linkedin.com/in/micheldjoumessi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A66C2]"
                >
                  <Linkedin size={20} className="mr-2" />
                  LinkedIn
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="glass"
                asChild
                className="text-black font-bricolage-grotesque"
              >
                <Link
                  href="https://github.com/michel-DC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#181717]"
                >
                  <Github size={20} className="mr-2" />
                  GitHub
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="glass"
                asChild
                className="text-black font-bricolage-grotesque"
              >
                <Link
                  href="https://www.malt.fr/profile/micheldjoumessi1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FC5757]"
                >
                  <BriefcaseBusiness size={20} className="mr-2" />
                  Malt
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="glass"
                asChild
                className="text-black font-bricolage-grotesque"
              >
                <Link
                  href="/documents/CV-MICHEL.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#008366] "
                >
                  <File size={20} className="mr-2" />
                  Mon CV
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
