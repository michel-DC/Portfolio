"use client";

import { useEffect, useRef, type JSX } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { CINEMA_NAVIGATION_EVENT } from "@/lib/cinema-navigation";

interface MontageProgress {
  value: number;
}

const APPEARANCE_DURATION = 0.08;
const MONTAGE_DURATION = 0.36;
const COMPLETION_DURATION = 0.06;
const DISAPPEARANCE_DURATION = 0.12;
const filmFrames: string[] = [
  "/images/projects/previews/zen-film.webp",
  "/images/projects/previews/framix-film.webp",
  "/images/projects/previews/elecsud-energies-film.webp",
];
const perforationRows: string[] = ["top", "bottom"];
const perforations: number[] = Array.from(
  { length: 13 },
  (_: unknown, index: number): number => index,
);

export default function CinemaTransition(): JSX.Element {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const previousPathRef = useRef<string>(pathname);
  const startTransitionRef = useRef<(() => void) | null>(null);
  const completeTransitionRef = useRef<(() => void) | null>(null);

  useEffect((): (() => void) => {
    const panel = panelRef.current;
    const playhead = playheadRef.current;
    const percentage = percentageRef.current;
    const media = gsap.matchMedia();

    if (panel && playhead && percentage) {
      media.add("(prefers-reduced-motion: no-preference)", (): (() => void) => {
        const progress: MontageProgress = { value: 0 };
        let timeline: gsap.core.Timeline | null = null;
        let hasDestinationRendered = false;
        let isActive = false;

        const updateProgress = (): void => {
          percentage.textContent = `${Math.round(progress.value)
            .toString()
            .padStart(2, "0")} %`;
          gsap.set(playhead, { xPercent: progress.value });
        };

        startTransitionRef.current = (): void => {
          timeline?.kill();
          hasDestinationRendered = false;
          isActive = true;
          progress.value = 0;
          updateProgress();

          timeline = gsap
            .timeline({ onComplete: (): void => { isActive = false; } })
            .fromTo(
              panel,
              { autoAlpha: 0, y: -8 },
              { autoAlpha: 1, y: 0, duration: APPEARANCE_DURATION },
            )
            .to(progress, {
              value: 85,
              duration: MONTAGE_DURATION,
              ease: "none",
              onUpdate: updateProgress,
            })
            .addPause(APPEARANCE_DURATION + MONTAGE_DURATION, (): void => {
              if (hasDestinationRendered) timeline?.play();
            })
            .to(progress, {
              value: 100,
              duration: COMPLETION_DURATION,
              ease: "none",
              onUpdate: updateProgress,
            })
            .to(panel, {
              autoAlpha: 0,
              y: -4,
              duration: DISAPPEARANCE_DURATION,
            });
        };

        completeTransitionRef.current = (): void => {
          if (!isActive) startTransitionRef.current?.();
          hasDestinationRendered = true;
          if (timeline?.paused()) timeline.play();
        };

        return (): void => {
          timeline?.kill();
          startTransitionRef.current = null;
          completeTransitionRef.current = null;
          gsap.set(panel, { autoAlpha: 0 });
        };
      });
    }

    const startTransition = (): void => startTransitionRef.current?.();
    const handleHistoryNavigation = (): void => {
      if (window.location.pathname !== previousPathRef.current) startTransition();
    };
    const handleClick = (event: MouseEvent): void => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
      startTransition();
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handleHistoryNavigation);
    window.addEventListener(CINEMA_NAVIGATION_EVENT, startTransition);

    return (): void => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handleHistoryNavigation);
      window.removeEventListener(CINEMA_NAVIGATION_EVENT, startTransition);
      media.revert();
    };
  }, []);

  useEffect((): void => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    completeTransitionRef.current?.();
  }, [pathname]);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      data-cinema-transition="true"
      className="pointer-events-none invisible fixed top-5 left-1/2 z-[110] w-[400px] max-w-[calc(100vw-32px)] -translate-x-1/2 p-4 text-white bg-neutral-950 rounded-md opacity-0 shadow-xl motion-reduce:hidden md:top-6"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-[var(--portfolio-accent)]">CHANGEMENT DE PLAN</span>
        <span ref={percentageRef} className="font-mono text-xl tabular-nums">
          00 %
        </span>
      </div>
      <div className="relative overflow-hidden py-3">
        {perforationRows.map((row: string): JSX.Element => (
          <div
            key={row}
            className={cn(
              "absolute inset-x-0 flex justify-between h-1",
              row === "top" ? "top-0" : "bottom-0",
            )}
          >
            {perforations.map((perforation: number): JSX.Element => (
              <span
                key={perforation}
                className="block w-2 h-1 bg-white/65 rounded-[1px]"
              />
            ))}
          </div>
        ))}
        <div className="grid grid-cols-3 gap-1.5">
          {filmFrames.map((src: string): JSX.Element => (
            <div key={src} className="relative h-20 overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                unoptimized
                loading="eager"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
        <div
          ref={playheadRef}
          className="absolute inset-x-0 top-1 bottom-1"
        >
          <span className="absolute inset-y-0 left-0 w-0.5 bg-[var(--portfolio-accent)]" />
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[var(--portfolio-accent)] rotate-45" />
        </div>
      </div>
    </div>
  );
}
