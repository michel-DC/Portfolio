"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="relative w-full pt-12 pb-24 md:pt-28 md:pb-32 bg-transparent overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
        {/*<div className="flex flex-col items-start mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-full border-b border-black pb-8 md:pb-12"
          >
            <h1 className="text-[13vw] md:text-[7vw] leading-[0.8] font-bold tracking-tighter text-black uppercase font-bricolage-grotesque">
              Creative
            </h1>
            <div className="flex items-center gap-4 md:gap-8 ml-[5vw] mt-2 md:mt-4">
              <span className="text-[13vw] md:text-[7vw] leading-[0.8] font-bold tracking-tighter text-[#4E6471] uppercase italic font-serif">
                Developer
              </span>
            </div>
          </motion.div>
        </div>*/}

        {/* Layout Contenu : Bio + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Colonne Gauche : Intro + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-9 space-y-10"
          >
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] font-bricolage-grotesque text-black max-w-4xl">
              Je conçois des{" "}
              <span className="text-[#4E6471] italic font-serif">
                écosystèmes digitaux
              </span>{" "}
              où la performance rencontre l&apos;émotion.
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              <p>
                Ma double compétence en design et développement me permet de
                créer des produits complets, sans friction entre la vision
                créative et la réalité technique.
              </p>
              <p>
                Basé sur une approche minimaliste, je privilégie la clarté et
                l&apos;impact. Chaque animation, chaque interaction a un but
                précis : servir l&apos;utilisateur.
              </p>
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
              <Button
                asChild
                className="rounded-full bg-[#4E6471] text-white transition-colors duration-300 px-8 py-6 text-lg shadow-sm"
                size="lg"
              >
                <Link
                  href="/documents/MICHEL-DJOUMESSI-ALTERNANCE.pdf"
                  target="_blank"
                >
                  Télécharger mon CV <Download className="ml-3 size-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Colonne Droite : Image Minimaliste */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 relative flex justify-center lg:justify-end pt-2"
          >
            <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden">
              <Image
                src="/images/profile/avatar.png"
                alt="Michel Djoumessi"
                fill
                className="object-contain object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
