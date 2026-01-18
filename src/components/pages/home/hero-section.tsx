"use client";

import React from "react";
import {
  Github,
  Linkedin,
  BriefcaseBusiness,
  FileDown,
  ArrowDown,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full bg-[#ffffff] flex flex-col justify-center overflow-hidden pt-20">
      {/* Contenu Principal */}
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 z-10">
        <div className="flex flex-col">
          {/* Tagline / Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-4 md:mb-8"
          >
            <div className="h-px w-12 bg-black/30" />
            <span className="text-sm md:text-base font-medium tracking-widest uppercase text-gray-500">
              Michel Djoumessi
            </span>
          </motion.div>

          {/* Titre Massif */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-black uppercase font-bricolage-grotesque"
              >
                Full Stack
              </motion.h1>
            </div>

            <div className="overflow-hidden flex items-center gap-4 md:gap-8 ml-[5vw] md:ml-[8vw]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-[#008366] uppercase italic font-serif"
              >
                Developer
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                className="h-2 md:h-4 flex-grow bg-black origin-left hidden lg:block rounded-full"
              />
            </div>
          </div>

          {/* Description & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 md:mt-20 ml-auto md:mr-[10vw]"
          >
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-full bg-black text-white hover:bg-black transition-colors duration-300 h-12 px-8 text-base"
              >
                <Link href="/mes-projets">Voir mes projets</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-black text-black hover:bg-gray-50 h-12 px-8 text-base"
              >
                <Link href="/#contact">Me contacter</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 md:bottom-12 left-0 w-full px-6 md:px-16"
      >
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-start items-center gap-6 border-t border-gray-100 pt-6">
          <div className="flex gap-6">
            <SocialLink
              href="https://linkedin.com/in/micheldjoumessi"
              icon={<Linkedin size={20} />}
              label="LinkedIn"
            />
            <SocialLink
              href="https://github.com/michel-DC"
              icon={<Github size={20} />}
              label="GitHub"
            />
            <SocialLink
              href="https://www.malt.fr/profile/micheldjoumessi1"
              icon={<BriefcaseBusiness size={20} />}
              label="Malt"
            />
            <SocialLink
              href="/documents/CV-MICHEL.pdf"
              icon={<FileDown size={20} />}
              label="CV"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-2 text-black hover:text-[#008366] transition-colors duration-300 font-medium group"
    >
      <span className="group-hover:-translate-y-1 transition-transform duration-300">
        {icon}
      </span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
