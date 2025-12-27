"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full bg-[#1E1E1E] pb-24 pt-32 text-white mt-60"
    >
      <div className="absolute -top-[240px] left-0 right-0 h-[242px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[#1E1E1E] rounded-[50%_50%_0_0/100%_100%_0_0]" />
      </div>

      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center relative z-10">
        <h2 className="about-text mb-12 max-w-5xl text-5xl font-medium leading-tight md:text-5xl">
          Je suis Michel, développeur Full Stack junior spécialisé dans la
          création d&apos;expériences digitales performantes et scalables.
        </h2>

        <p className="about-text mb-16 max-w-6xl text-3xl md:text-3xl">
          Je me spécialise dans le développement de solutions web complètes qui
          allient performance, scalabilité et design centré sur
          l&apos;utilisateur. Je travaille principalement avec des technologies
          telles que Next.JS et TypeScript.
        </p>

        <div className="about-text flex items-center">
          <motion.div
            whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Button className="rounded-full">
              À propos de moi
              <ArrowUpRight className="ml-2 size-6" />
            </Button>
          </motion.div>
        </div>

        <div className="about-text mt-auto mb-40 hidden w-full max-w-5xl justify-between text-md md:flex">
          <div>↓ Scrollez pour explorer</div>
          <div>↓ Scrollez pour explorer</div>
        </div>
      </div>
    </section>
  );
}
