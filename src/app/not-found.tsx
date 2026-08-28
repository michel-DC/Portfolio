"use client";

import Header from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[85vh] w-full px-6 bg-transparent py-24">
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-75 md:max-w-100 aspect-square mb-8 md:mb-12"
          >
            <Image
              src="/images/svg/not-found.svg"
              alt="Illustration page non trouvée"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="space-y-6 max-w-xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-bricolage-grotesque tracking-tight text-slate-900 leading-tight">
              Oups ! Cette page semble{" "}
              <span className="text-[#4E6471] italic font-serif">perdue.</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Désolé, la page que vous recherchez n&apos;existe pas ou a été
              déplacée. Revenons sur le droit chemin.
            </p>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 h-12 text-base"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Retour à l&apos;accueil
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
