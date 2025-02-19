"use client";

import React, { useState } from "react";

export const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; // Update this to the total number of slides

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div id="projects" className="m-auto py-10 lg:py-14 px-4 max-w-3xl w-full">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 font-caption">
        Projects
      </h2>
      <p>
          Take a look at my selection of <b>favorite</b> projects.
      </p>
      <div className="relative mt-8 max-lg:mx-6" role="region" aria-roledescription="carousel">
        <button
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2"
          onClick={handlePrev}
          disabled={currentSlide === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-4 w-4">
            <path d="M12 19l-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span className="sr-only">Previous slide</span>
        </button>
        <button
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2"
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4">
            <path d="M5 12h14" />
            <path d="M12 19l7-7-7-7" />
          </svg>
          <span className="sr-only">Next slide</span>
        </button>
        <div className="overflow-hidden">
          <div className="flex -ml-4" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.5s ease' }}>
            {/* Slide 1 */}
            <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4 lg:basis-1/2">
              <a href="https://codeline.app">
                <div style={{ position: 'relative', width: '100%', paddingBottom: '50%' }} data-radix-aspect-ratio-wrapper>
                  <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full group relative hover:bg-card/60 transition-colors overflow-hidden">
                      <img className="rounded shadow-xl inset-0 absolute border border-border" src="https://codeline.app/opengraph-image?3c7993ed8bb1d97f" alt="Codeline" />
                      <div className="flex flex-col space-y-1.5 p-6 bg-background/80 h-full backdrop-blur relative group-hover:opacity-0 transition-opacity">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">Codeline</h3>
                        <p className="text-sm text-muted-foreground">The first learning platform for developers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Slide 2 */}
            <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4 lg:basis-1/2">
              <a href="https://codelynx.dev/">
                <div style={{ position: 'relative', width: '100%', paddingBottom: '50%' }} data-radix-aspect-ratio-wrapper>
                  <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full group relative hover:bg-card/60 transition-colors overflow-hidden">
                      <img className="rounded shadow-xl inset-0 absolute border border-border" src="https://codelynx.dev/twitter-image.png?14e1cccc43cd3089" alt="Codelynx | Blog posts" />
                      <div className="flex flex-col space-y-1.5 p-6 bg-background/80 h-full backdrop-blur relative group-hover:opacity-0 transition-opacity">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">Codelynx | Blog posts</h3>
                        <p className="text-sm text-muted-foreground">
                          Post de blog de Melvynx, développeur web et créateur de contenu sur React, Next.js, Tailwind CSS et bien d'autres technologies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Slide 3 */}
            <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4 lg:basis-1/2">
              <a href="https://codelynx.dev/"></a>
              <a href="https://codelynx.dev/">
                <div style={{ position: 'relative', width: '100%', paddingBottom: '50%' }} data-radix-aspect-ratio-wrapper>
                  <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full group relative hover:bg-card/60 transition-colors overflow-hidden">
                      <img className="rounded shadow-xl inset-0 absolute border border-border" src="https://codelynx.dev/twitter-image.png?14e1cccc43cd3089" alt="Codelynx | Blog posts" />
                      <div className="flex flex-col space-y-1.5 p-6 bg-background/80 h-full backdrop-blur relative group-hover:opacity-0 transition-opacity">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">BMI calcula</h3>
                        <p className="text-sm text-muted-foreground">
                          Post de blog de Melvynx, développeur web et créateur de contenu sur React, Next.js, Tailwind CSS et bien d'autres technologies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            {/* Slide 4 */}
            <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4 lg:basis-1/2">
              <a href="https://example.com">
                <div style={{ position: 'relative', width: '100%', paddingBottom: '50%' }} data-radix-aspect-ratio-wrapper>
                  <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full group relative hover:bg-card/60 transition-colors overflow-hidden">
                      <img className="rounded shadow-xl inset-0 absolute border border-border" src="https://via.placeholder.com/300" alt="Fictitious Project" />
                      <div className="flex flex-col space-y-1.5 p-6 bg-background/80 h-full backdrop-blur relative group-hover:opacity-0 transition-opacity">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">Fictitious Project</h3>
                        <p className="text-sm text-muted-foreground">Description of the fictitious project.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
