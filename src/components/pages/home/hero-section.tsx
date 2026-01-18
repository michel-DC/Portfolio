"use client";

import React from "react";
import {
  Github,
  Linkedin,
  BriefcaseBusiness,
  FileDown,
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
            transition={{ duration: 0.8, delay: 2.5 }}
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
                transition={{ duration: 1, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13.5vw] md:text-[11vw] leading-[0.8] font-bold tracking-tighter text-black uppercase font-bricolage-grotesque"
              >
                Full Stack
              </motion.h1>
            </div>

            <div className="overflow-hidden flex items-center gap-4 md:gap-8 ml-0 md:ml-[6vw]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 2.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[13.5vw] md:text-[11vw] leading-[0.8] font-bold tracking-tighter text-[#008366] uppercase italic font-serif"
              >
                Developer
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 3.2, ease: "circOut" }}
                className="h-2 md:h-3 flex-grow bg-black origin-left hidden lg:block rounded-full mt-[1vw]"
              />
            </div>
          </div>

          {/* Boutons Glassmorphism Centrés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }}
            className="grid grid-cols-1 md:flex md:flex-wrap justify-center gap-4 md:gap-6 mt-16 md:mt-24 w-full md:w-auto"
          >
            <motion.div whileHover={{ x: [0, -2, 2, -2, 2, 0] }} transition={{ duration: 0.4 }} className="w-full md:w-auto">
              <Button variant="glass" asChild className="w-full md:w-auto h-12 md:h-11 px-8 md:px-32 text-base text-black font-bricolage-grotesque bg-gray-100/50 backdrop-blur-md border border-gray-200 hover:bg-white/80 rounded-full">
                <Link href="https://linkedin.com/in/micheldjoumessi" target="_blank" className="hover:text-[#0A66C2] font-bold flex justify-center items-center">
                  <Linkedin size={18} className="mr-3" />
                  LinkedIn
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ x: [0, -2, 2, -2, 2, 0] }} transition={{ duration: 0.4 }} className="w-full md:w-auto">
              <Button variant="glass" asChild className="w-full md:w-auto h-12 md:h-11 px-8 md:px-32 text-base text-black font-bricolage-grotesque bg-gray-100/50 backdrop-blur-md border border-gray-200 hover:bg-white/80 rounded-full">
                <Link href="https://github.com/michel-DC" target="_blank" className="hover:text-[#181717] flex justify-center items-center">
                  <Github size={18} className="mr-3" />
                  GitHub
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ x: [0, -2, 2, -2, 2, 0] }} transition={{ duration: 0.4 }} className="w-full md:w-auto">
              <Button variant="glass" asChild className="w-full md:w-auto h-12 md:h-11 px-8 md:px-32 text-base text-black font-bricolage-grotesque bg-gray-100/50 backdrop-blur-md border border-gray-200 hover:bg-white/80 rounded-full">
                <Link href="https://www.malt.fr/profile/micheldjoumessi1" target="_blank" className="hover:text-[#FC5757] flex justify-center items-center">
                  <BriefcaseBusiness size={18} className="mr-3" />
                  Malt
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ x: [0, -2, 2, -2, 2, 0] }} transition={{ duration: 0.4 }} className="w-full md:w-auto">
              <Button variant="glass" asChild className="w-full md:w-auto h-12 md:h-11 px-8 md:px-32 text-base text-black font-bricolage-grotesque bg-gray-100/50 backdrop-blur-md border border-gray-200 hover:bg-white/80 rounded-full">
                <Link href="/documents/CV-MICHEL.pdf" target="_blank" className="hover:text-[#008366] flex justify-center items-center">
                  <FileDown size={18} className="mr-3" />
                  Mon CV
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}