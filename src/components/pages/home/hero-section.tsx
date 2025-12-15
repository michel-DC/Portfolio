import React from "react";
import { Github, Linkedin, File } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <div className="fixed left-4 bottom-4 z-10 flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="https://linkedin.com/in/micheldjoumessi"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
          <Link href="https://github.com/michel-DC" aria-label="GitHub">
            <Github size={20} />
          </Link>
          <Link href="/documents/CV-MICHEL.pdf" aria-label="CV">
            <File size={20} />
          </Link>
        </div>
      </div>

      <div className="fixed left-8 top-1/2 z-10 h-96 w-px -translate-y-1/2 bg-black"></div>
      <div className="fixed bottom-4 right-1/2 z-10 flex translate-x-1/2 items-center space-x-2">
        <span className="font-bricolage-grotesque text-sm">
          défiler vers le bas
        </span>
      </div>
      <div className="fixed bottom-8 right-8 z-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
          <div className="h-px w-4 bg-white"></div>
        </div>
      </div>

      <main className="relative flex min-h-screen items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/home-bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative z-10 text-center">
          <p className="text-4xl font-bricolage-grotesque">
            Salut! Je suis Michel
          </p>
          <h1 className="text-8xl leading-tight">Développeur Full-stack</h1>
          <h2 className="text-8xl leading-tight">Designer UI & UX.</h2>
        </div>
      </main>
    </>
  );
}
