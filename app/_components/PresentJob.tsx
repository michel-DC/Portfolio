import React from "react";
import { Section } from "./section";

export const PresentJob = () => {
  return (
    <Section>
      <header className="z-10 mt-2 mb-1 text-xs font-semibold uppercase tracking-wide text-white sm:col-span-2">
        Dec 2024 - Present
      </header>
      <div className="z-10 sm:col-span-4">
        <h3 className="font-medium leading-snug text-white">
          Freelance Front-End developer
          <a
            href=""
            className="inline-flex items-baseline font-medium leading-tight text-white hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
          >
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inste-x-6 md:-inset-y-4 lg:block">
              Freelance Front-End developer
            </span>
            <span className="inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Maison Vatier
            </span>
          </a>
        </h3>
      </div>
    </Section>
  );
};
