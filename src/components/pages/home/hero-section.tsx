"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, BriefcaseBusiness, FileDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full bg-transparent flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden text-[#1A1A1A] font-amoria select-none pt-32 md:pt-48">
      {/* Orbe verte diffuse au centre */}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none blur-[100px]"
        style={{
          background: "radial-gradient(circle, #008366 0%, transparent 70%)",
        }}
      />

      <div className="hero-wrapper relative z-10 w-full h-full flex flex-col justify-between max-w-[1800px] mx-auto pt-10 sm:pt-24">
        {/* Top Meta */}
        <div className="hero-top-meta">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 2.1, ease: "easeOut" }}
              className="meta-inner italic block text-sm md:text-base opacity-60 tracking-tight"
            >
              Disponible en freelance pour vous
            </motion.span>
          </div>
        </div>

        {/* Main Content (Title + Social Buttons) */}
        <div className="flex flex-col w-full py-12">
          {/* Main Title Container */}
          <div className="main-title-container flex flex-col w-full">
            {/* Prénom : MICHEL (Haut / Gauche) */}
            <div className="title-line overflow-hidden flex justify-start">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 2.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[16vw] md:text-[12vw] leading-[0.8] tracking-[-0.06em] flex items-baseline uppercase font-medium"
              >
                M<span className="text-[#008366] italic mr-[0.1em]">I</span>CHEL
              </motion.h1>
            </div>

            {/* Gap réduit entre prénom et nom */}
            <div className="h-[1vw] md:h-[1.5vw]" />

            {/* Nom : DJOUMESSI */}
            <div className="title-line overflow-hidden flex justify-end md:pr-[5vw]">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 2.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[16vw] md:text-[12vw] leading-[0.8] tracking-[-0.06em] flex items-baseline uppercase font-medium mr-2"
              >
                DJOUMESS
                <span className="text-[#008366] italic mr-[0.05em]">I</span>
              </motion.h1>
            </div>
          </div>

          {/* Social Buttons Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="flex flex-wrap justify-center gap-4 mt-12 md:mt-20 w-full"
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
                  href="/documents/CV-MICHEL.pdf"
                  target="_blank"
                  className="hover:text-[#008366] flex items-center"
                >
                  <FileDown size={16} className="mr-2" />
                  Mon CV
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Meta */}
        <div className="hero-bottom-meta flex justify-between items-end">
          {/* Scroll Indicator Minimaliste */}
          <div className="scroll-indicator hidden md:block">
            <div className="scroll-line w-[1px] h-12 bg-black/10 relative overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-full bg-[#008366]"
              />
            </div>
          </div>

          {/* Location Info */}
          <div className="location-info text-right">
            <span className="label block text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-1">
              Paris, France
            </span>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
                className="meta-inner block text-xs md:text-sm opacity-50 tracking-tighter"
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
