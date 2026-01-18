"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { useRef } from "react";

export default function IntroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-white">
      {/* Background Video/Texture */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-white/80 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/video/video-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-20">
        {/* Main Title Area */}
        <div className="flex flex-col gap-2 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter text-black uppercase font-bricolage-grotesque">
              Creative
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden flex items-center gap-4 md:gap-8"
          >
            <div className="h-[2px] w-12 md:w-24 bg-black/20" />
            <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter text-[#008366] uppercase italic font-serif">
              Developer
            </h1>
          </motion.div>
        </div>

        {/* Bio Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left: Quick Stats / Role */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-gray-100">
               <Image
                src="/images/profile/avatar.png"
                alt="Michel Djoumessi"
                fill
                className="object-cover object-top transition-transform duration-700"
                priority
              />
            </div>
            <div className="flex items-center gap-4">
              <Button asChild className="rounded-full bg-black text-white hover:bg-[#008366] transition-colors duration-300" size="lg">
                <Link href="/documents/CV-MICHEL.pdf" target="_blank">
                  Télécharger CV <Download className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right: Detailed Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-8 space-y-8 lg:pt-12"
          >
            <h2 className="text-3xl md:text-5xl font-medium leading-tight font-bricolage-grotesque">
              Je transforme des concepts complexes en <span className="text-[#008366]">interfaces fluides</span> et performantes.
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              <p>
                Passionné par le développement web et l&apos;expérience utilisateur, je conçois des écosystèmes digitaux modernes. Mon approche combine rigueur technique et sensibilité créative.
              </p>
              <p>
                Avec une double compétence en design et en développement, je m&apos;assure que chaque pixel a sa raison d&apos;être et que chaque interaction sert l&apos;utilisateur.
              </p>
              <p>
                Toujours en veille sur les nouvelles technologies (IA, Next.js, Motion), j&apos;intègre ces outils pour pousser les limites de ce qui est possible sur le web.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
              <div>
                <span className="block text-4xl font-bold font-bricolage-grotesque">3+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Années d&apos;exp.</span>
              </div>
              <div>
                <span className="block text-4xl font-bold font-bricolage-grotesque">15+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Projets livrés</span>
              </div>
              <div>
                <span className="block text-4xl font-bold font-bricolage-grotesque">100%</span>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
