import React from "react";
import { Section } from "./section";

export const Header = () => {
  return (
    <header className="sticky top-0 mb-14">
      <Section className="mx-auto flex w-full max-w-3xl items-center justify-between px-4">
        <div className="flex items-center gap-1">
          <h1 className="text-primary-foreground font-sans font-extrabold mr-96">
            michel.dev
          </h1>
        </div>
        <div className="flex-1">
          <nav
            style={{ opacity: 1 }}
            className="flex items-center gap-4 text-sm font-medium text-muted-foreground"
          >
            <ul className="hover:cursor-pointer flex gap-4 justify-end">
              <li>About</li>
              <li>Skills</li>
              <li>Projects</li>
              <li>Contact me</li>
            </ul>
          </nav>
        </div>
      </Section>
    </header>
  );
};
