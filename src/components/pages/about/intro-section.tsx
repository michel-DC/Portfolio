"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-450 mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight font-bricolage-grotesque leading-tight"
            >
              Plus qu&apos;un développeur, un{" "}
              <span className="text-[#008366] italic font-serif">créateur</span>{" "}
              de solutions.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed"
            >
              <p>
                Passionné par le développement web et l&apos;expérience
                utilisateur, je conçois des interfaces modernes et performantes.
                Mon objectif est de transformer des idées complexes en solutions
                digitales intuitives.
              </p>
              <p>
                Avec une double compétence en design et en développement, je
                m&apos;assure que chaque projet soit non seulement fonctionnel,
                mais aussi visuellement impactant.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/documents/CV-MICHEL.pdf" target="_blank">
                  Voir mon CV <ArrowUpRight className="ml-2 size-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <Image
              src="/images/profile/avatar.png"
              alt="Michel Djoumessi"
              width={400}
              height={500}
              className="w-full h-auto transition-all duration-700"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
