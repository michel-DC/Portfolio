import React from "react";
import { Section } from "./ui/section";

export const Header = () => {
  return (
    <Section className="sticky top-0 mb-14 mx-auto flex w-full max-w-4xl h-20 items-center justify-between px-4 backdrop-blur-xl rounded-md">
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
            <li>About</li>
            <li>Skills</li>
            <li>Projects</li>
            <li>Contact me</li>
          </ul>
        </nav>
      </div>
    </Section>
  );
};
