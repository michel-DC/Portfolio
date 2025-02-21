import React from "react";
import { Section } from "./ui/section";

export const Header = () => {
  return (
    <Section className="sticky md:sticky top-0 mb-14 mx-auto flex w-full max-w-4xl h-20 items-center justify-between px-4 backdrop-blur-3xl rounded-md">
      <div className="flex items-center gap-1">
        <h1 className="text-primary-foreground font-sans font-extrabold mr-4 md:mr-96">
          michel.dev
        </h1>
      </div>
      <div className="flex-1">
        <nav
          style={{ opacity: 1 }}
          className="flex items-center gap-4 text-sm font-medium text-muted-foreground"
        >
          <ul className="hover:cursor-pointer flex gap-4 justify-end flex-wrap">
            <li>
              <a href="#about" className="hover:text-primary transition-colors">
                About
              </a>
            </li>
            <li>
              <a
                href="#Skills"
                className="hover:text-primary transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-primary transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contactme"
                className="hover:text-primary transition-colors"
              >
                Contact me
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Section>
  );
};
