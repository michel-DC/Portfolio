"use client";

import Link from "next/link";
import Section from "@/components/section";
import { motion } from "framer-motion";

const articles = [
  {
    title: "Next.js 16 is Here: What It Means for Your Workflow",
    url: "https://dev.to/hashbyt/nextjs-16-is-here-what-it-means-for-your-workflow-1agh",
    description:
      "Un aperçu pratique des principaux changements dans Next.js 16 compilation accélérée avec Turbopack, API de cache améliorées, et ce que cela implique pour votre flux de travail de développement.",
    author: "Hashbyt",
    year: 2025,
  },
  {
    title: "Non ! l'IA ne remplacera pas les développeurs",
    url: "https://grafikart.fr/blog/ia-remplacer-devs",
    description:
      "Un article qui explique pourquoi l’intelligence artificielle ne remplacera pas les développeurs, mais transformera leur manière de travailler.",
    author: "Grafikart",
    year: 2024,
  },
  {
    title: "Arrêter de regarder des tutoriels !",
    url: "https://grafikart.fr/blog/tutorial-hell-stop",
    description:
      "Un article qui met en garde contre la 'spirale des tutoriels' et explique pourquoi elle peut freiner l’apprentissage en développement.",
    author: "Grafikart",
    year: 2023,
  },
  {
    title: "Is Remote Working Bad For Developers?",
    url: "https://medium.com/geekculture/is-remote-working-bad-for-developers-f2bbe6b612aa",
    description:
      "Un article qui explore les coûts cachés et les bénéfices du full remote pour les développeurs.",
    author: "Ben “The Hosk” Hosking",
    year: 2023,
  },
];

export function BlogSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <Section className="flex flex-col items-start justify-center pt-8 pb-8 px-4 sm:px-8 w-full">
      <motion.div
        className="flex flex-col justify-center w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-foreground/80 italic text-[25px] sm:text-[30px] mb-1 leading-tight font-normal tracking-wider w-full"
          variants={fadeInUp}
        >
          Mes articles favoris
        </motion.h2>
        <div className="pt-2 flex-1 w-full">
          <motion.ul
            className="list-disc text-foreground/70 pl-4 w-full"
            variants={containerVariants}
          >
            {articles.map((article) => (
              <motion.li key={article.url} className="mb-5 w-full" variants={itemVariants}>
                <div className="flex flex-col items-start w-full">
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[17px] font-medium text-foreground hover:underline underline-offset-4 hover:text-primary transition-colors w-full"
                  >
                    {article.title}
                  </Link>
                  {/* Description ALWAYS underneath the title, full width */}
                  <span className="text-[15px] sm:text-[15px] text-foreground/60 group-hover:text-foreground/80 transition-colors mt-1 w-full">
                    {article.description}
                  </span>
                  <span className="text-[14px] text-foreground/50 mt-1 w-full">
                    {`Par ${article.author} (${article.year})`}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </Section>
  );
}
