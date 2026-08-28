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
        duration: 0.65,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full bg-black pb-24 md:pt-32 text-white md:mt-60"
    >
      <div className="absolute md:-top-60 top-40 left-0 right-0 h-60.5 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-black rounded-[50%_50%_0_0/100%_100%_0_0]" />
      </div>

      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-6 md:px-4 text-center relative z-10">
        <h2 className="about-text mb-8 md:mb-12 max-w-6xl text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          Je suis michel, développeur spécialisé dans la création
          d&apos;interfaces{" "}
          <span className="text-[var(--accent-on-dark)] font-bold">modernes</span> et{" "}
          <span className="text-[var(--accent-on-dark)] font-bold">performantes</span>.
        </h2>

        <p className="about-text mb-12 md:mb-16 max-w-5xl text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
          Je transforme vos idées en{" "}
          <span className="text-white font-medium">solutions web</span>{" "}
          concrètes, en privilégiant l&apos;
          <span className="text-[var(--accent-on-dark)] font-bold">
            expérience utilisateur
          </span>{" "}
          et la{" "}
          <span className="text-[var(--accent-on-dark)] font-bold">qualité technique</span>.
        </p>

        <div className="about-text flex items-center">
          <motion.div
            whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
            transition={{ duration: 0.25 }}
          >
            <Link href="/a-propos">
              <Button className="rounded-full" size="lg">
                À propos de moi
                <ArrowUpRight className="ml-2 size-5 md:size-6" />
              </Button>
            </Link>
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
