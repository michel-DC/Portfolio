"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { Pause, Play, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const italiana = localFont({
  src: "../../../../public/fonts/italiana/Italiana-Regular.ttf",
  display: "swap",
  weight: "400",
});

const FILM_SOURCE = "/videos/portfolio/michel-djoumessi-v3.mp4";
const PREVIEW_SOURCE = "/videos/portfolio/apercu.mp4";
const POSTER_SOURCE = "/videos/portfolio/affiche.webp";

export default function FilmSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const filmRef = useRef<HTMLVideoElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPreviewPaused, setIsPreviewPaused] = useState<boolean>(false);
  const [isPreviewReady, setIsPreviewReady] = useState<boolean>(false);
  const [hasFilmError, setHasFilmError] = useState<boolean>(false);
  const [needsManualPlayback, setNeedsManualPlayback] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect((): (() => void) | undefined => {
    const video = previewRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let isVisible = false;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updatePlayback(): void {
      if (!video) return;
      if (!isVisible || isOpen || isPreviewPaused || motionPreference.matches || document.hidden) {
        video.pause();
        return;
      }
      if (!video.hasAttribute("src")) video.src = PREVIEW_SOURCE;
      void video.play().catch((): void => setIsPreviewReady(false));
    }

    const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]): void => {
      isVisible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.2 });

    observer.observe(section);
    motionPreference.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);

    return (): void => {
      observer.disconnect();
      motionPreference.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, [isOpen, isPreviewPaused]);

  useEffect((): (() => void) | undefined => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const video = filmRef.current;
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = previousOverflow;
      video?.pause();
    };
  }, [isOpen]);

  function openFilm(): void {
    const dialog = dialogRef.current;
    const video = filmRef.current;
    if (!dialog || !video || dialog.open) return;
    setHasFilmError(false);
    setNeedsManualPlayback(false);
    previewRef.current?.pause();
    dialog.showModal();
    setIsOpen(true);
    video.src = FILM_SOURCE;
    video.muted = false;
    void video.play().catch((): void => setNeedsManualPlayback(true));
  }

  function closeFilm(): void {
    dialogRef.current?.close();
  }

  function handleDialogClosed(): void {
    const video = filmRef.current;
    video?.pause();
    video?.removeAttribute("src");
    video?.load();
    setIsOpen(false);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>): void {
    if (event.target === event.currentTarget) closeFilm();
  }

  return (
    <section ref={sectionRef} id="film" aria-labelledby="film-title" className="mx-auto w-[calc(100%_-_2rem)] max-w-[1440px] scroll-mt-8 py-10 sm:w-[calc(100%_-_3rem)] md:w-[92%] md:py-16">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 md:mb-7">
        <h2 id="film-title" className={cn("text-[clamp(2.25rem,4.5vw,4.75rem)] leading-none tracking-[-0.025em] text-[var(--accent-ink)]", italiana.className)}>
          Mon univers, en mouvement.
        </h2>
        <span className="pb-1 text-xs uppercase tracking-[0.15em] text-[var(--accent-ink)] md:text-sm">Le film · 40 s</span>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--portfolio-accent)] md:rounded-xl">
        <Image src={POSTER_SOURCE} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1565px) 92vw, 1440px" className="object-cover" />
        <video ref={previewRef} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture onPlaying={(): void => setIsPreviewReady(true)} onError={(): void => setIsPreviewReady(false)} className={cn("absolute inset-0 h-full w-full object-cover", isPreviewReady ? "opacity-100" : "opacity-0")} />
        <button type="button" onClick={openFilm} aria-label="Découvrir mon univers — lire le film de 40 secondes avec le son" aria-haspopup="dialog" className="group absolute inset-0 flex flex-col items-center justify-center gap-4 focus-visible:outline-4 focus-visible:-outline-offset-8 focus-visible:outline-white sm:gap-6">
          <span className="flex size-16 items-center justify-center rounded-full bg-white text-[var(--accent-ink)] shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-110 motion-reduce:transition-none md:size-24">
            <Play aria-hidden="true" fill="currentColor" strokeWidth={0} className="ml-1 size-6 md:size-9" />
          </span>
          <span className="inline-flex items-center gap-3 rounded-full bg-[var(--portfolio-accent)] px-4 py-3 text-sm text-white shadow-lg sm:gap-5 sm:px-6 sm:text-lg">
            Découvrir mon univers
            <span className="border-l border-white/30 pl-3 text-white/80 sm:pl-5">40 s</span>
          </span>
        </button>
      </div>

      <div className="mt-3 flex min-h-11 items-center justify-between gap-4 text-[var(--accent-ink)]">
        <p className="text-sm md:text-base">Design · Développement · Animation</p>
        {isPreviewReady && !shouldReduceMotion && (
          <button type="button" onClick={(): void => setIsPreviewPaused((paused: boolean): boolean => !paused)} aria-label={isPreviewPaused ? "Animer l’aperçu" : "Mettre l’aperçu en pause"} aria-pressed={isPreviewPaused} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--portfolio-accent)]/20 transition-colors hover:bg-[var(--portfolio-accent)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-ink)]">
            {isPreviewPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          </button>
        )}
      </div>

      <dialog ref={dialogRef} onClose={handleDialogClosed} onClick={handleBackdropClick} aria-labelledby="film-dialog-title" data-lenis-prevent className="fixed inset-0 m-auto max-h-[100dvh] w-[96vw] max-w-[1600px] overflow-visible border-0 bg-transparent p-0 text-white backdrop:bg-[#0e1512]/95 backdrop:backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <h2 id="film-dialog-title" className="text-sm font-normal md:text-lg">Michel Djoumessi — Le film</h2>
          <button type="button" onClick={closeFilm} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-3 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Fermer
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <video ref={filmRef} controls playsInline preload="none" aria-label="Film de présentation de Michel Djoumessi, 40 secondes" onError={(): void => setHasFilmError(true)} onPlaying={(): void => setNeedsManualPlayback(false)} className="aspect-video max-h-[calc(100dvh-8rem)] w-full rounded-lg bg-black object-contain" />
        <div className="min-h-7 pt-2 text-center text-sm text-white/85" aria-live="polite">
          {hasFilmError ? <p>La vidéo ne peut pas être lue. <a href={FILM_SOURCE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Ouvrir le film</a></p> : needsManualPlayback ? <p>Appuyez sur Lecture pour démarrer le film.</p> : null}
        </div>
      </dialog>
    </section>
  );
}
