"use client";

import React, { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import { Section } from "./ui/section";
import { Uni } from "../assets/icon/uni";
import { ReactIcon } from "../assets/icon/reactIcon";
import { TypescriptIcon } from "../assets/icon/typescriptIcon";
import { TailwindIcon } from "../assets/icon/tailwindIcon";
import { WorkIcon } from "../assets/icon/workIcon";

const Code = ({ className, ...props }: ComponentPropsWithoutRef<"span">) => {
  return (
    <span
      className={cn(
        "bg-white/10 backdrop-blur-md px-2  rounded-md text-primary items-center gap-1 ",
        className
      )}
      {...props}
    />
  );
};

export const Hero = () => {
  return (
    <Section className="flex max-lg:flex-col items-start flex-col">
      <div className="flex items-center gap-2 w-fit">
        <img
          className="rounded-full w-12 h-12 mr-auto"
          src="images/PFP.jpg"
          alt="Chill guy"
        />
        <h2 className="text-2xl font-bold">Michel DJOUMESSI</h2>
      </div>
      <br />
      <div>
        <h3 className="text-3xl italic mb-2 animate-text-reveal">
          Front-End developer and student 👨‍💻
        </h3>
        <style jsx>{`
          @keyframes textReveal {
            0% {
              filter: blur(8px);
              -webkit-filter: blur(8px);
              opacity: 0;
            }
            100% {
              filter: blur(0);
              -webkit-filter: blur(0);
              opacity: 1;
            }
          }
        `}</style>
        <p className="leading-[2]">
          Student in{" "}
          <a href="https://www.iut-velizy-rambouillet.uvsq.fr/">
            <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:bg-primary/20 hover:underline cursor-pointer">
              <Uni />
              BA MMI
            </Code>
          </a>
          at Vélizy, curious and passionate about web development, I specialized
          in front-end with{" "}
          <a href="https://www.react.dev">
            <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:underline cursor-pointer">
              <ReactIcon />
              React
            </Code>{" "}
          </a>
          ,{" "}
          <a href="https://www.typescriptlang.org/">
            <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:underline cursor-pointer">
              <TypescriptIcon />
              TypeScript
            </Code>{" "}
          </a>
          and{" "}
          <a href="https://tailwindcss.com/">
            <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:underline cursor-pointer">
              <TailwindIcon />
              Tailwind CSS
            </Code>
          </a>
          . I like to design modern and efficient interfaces while exploring
          best practices in the field. I am looking for a{" "}
          <a href="documents/my-cv.pdf">
            <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:underline cursor-pointer">
              <WorkIcon />
              internship
            </Code>{" "}
          </a>
          of at least one month for the month of June in order to deepen my
          skills and contribute to concrete projects within a team dynamic.
        </p>
      </div>
    </Section>
  );
};
