"use client";

import Section from "../section";
import Link from "next/link";
import { motion } from "framer-motion";

export function ContactSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <Section className="flex flex-col items-start justify-center pt-8 pb-8 px-4 sm:px-8">
      <motion.div
        className="w-full flex flex-col justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-foreground/80 italic text-[25px] sm:text-[30px] leading-tight font-normal tracking-wider mb-2"
          variants={fadeInUp}
        >
          Get In Touch
        </motion.h2>
        <motion.div variants={itemVariants}>
          <Link
            href="mailto:&#x6d;&#x69;&#x63;&#x68;&#x65;&#x6c;&#x64;&#x6a;&#x6f;&#x75;&#x6d;&#x65;&#x73;&#x73;&#x69;&#x2e;&#x63;&#x6f;&#x6e;&#x74;&#x61;&#x63;&#x74;&#x40;&#x67;&#x6d;&#x61;&#x69;&#x6c;&#x2e;&#x63;&#x6f;&#x6d;"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex underline items-center gap-2 group hover:text-foreground transition-colors"
            aria-label="Mail de contact"
          >
            micheldjoumessi.contact@gmail.com
          </Link>
        </motion.div>
      </motion.div>
    </Section>
  );
}
