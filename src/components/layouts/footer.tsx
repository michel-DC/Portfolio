"use client";

import { Linkedin, Github, BriefcaseBusiness, File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button-liquid";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-black rounded-t-3xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
        <div className="text-left sm:text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/svg/logo-blanc.svg"
              alt="Teamify"
              width={100}
              height={100}
            />
          </div>
          <p className="text-base sm:text-lg text-gray-300 mb-2 text-center">
            Retrouvez moi sur tout mes réseaux sociaux.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="hero-text-element flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Button
                  variant="glass"
                  asChild
                  className="text-white font-bricolage-grotesque"
                >
                  <Link
                    href="https://linkedin.com/in/micheldjoumessi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0A66C2] font-bold"
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
                  className="text-white font-bricolage-grotesque"
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
                  className="text-white  font-bricolage-grotesque"
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
                  className="text-white font-bricolage-grotesque"
                >
                  <Link
                    href="/documents/MICHEL-DJOUMESSI-ALTERNANCE.pdf"
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
        </div>

        <div className="border-t border-[#2a2a2a] my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Michel DJOUMESSI
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Développeur Full-Stack passionné par la création
              d&apos;expériences web innovantes et performantes. Toujours à la
              recherche de nouveaux défis pour repousser les limites du code.
            </p>
          </div>

          {/* Section Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/mes-projets"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Mes projets
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Mes Projets */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Mes Projets</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/mes-projets/teamify"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Teamify
                </Link>
              </li>
              <li>
                <Link
                  href="/mes-projets/app-analyzer"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  App Analyzer
                </Link>
              </li>
              <li>
                <Link
                  href="/mes-projets/lookaroun"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Lookaroun
                </Link>
              </li>
              <li>
                <Link
                  href="/mes-projets/flow-media"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Flow Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Anciennes Versions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Versions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://v1.hey-michel.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Portfolio v1
                </Link>
              </li>
              <li>
                <Link
                  href="https://v2.hey-michel.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Portfolio v2
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-gray-400 hover:text-[#008366] transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] my-8" />

        <div className="mt-8 text-center text-gray-400 text-xs">
          Dev With <span className="text-red-400">♥</span> by Michel -
          {` ${new Date().getFullYear()} `}
        </div>
      </div>
    </footer>
  );
}
