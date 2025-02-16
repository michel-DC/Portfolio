import React, { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import { Section } from "./section";
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
          src="https://i.pinimg.com/236x/3b/19/a3/3b19a3c06d81766d4a6de6d344b95e86.jpg"
          alt="Chill guy"
        />
        <h2 className="text-2xl font-bold">Michel DJOUMESSI</h2>
      </div>
      <br />
      <div>
        <h3 className="text-3xl italic mb-2">
          Front-End developer and student
        </h3>
        <p className="leading-[2]">
          Student in{" "}
          <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:bg-primary/20 hover:underline cursor-pointer">
            <Uni />
            BA MMI
          </Code>
          , curious and passionate about web development, I specialized in
          front-end with{" "}
          <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:underline cursor-pointer">
            <ReactIcon />
            React
          </Code>{" "}
          ,{" "}
          <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:underline cursor-pointer">
            <TypescriptIcon />
            TypeScript
          </Code>{" "}
          and{" "}
          <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:underline cursor-pointer">
            <TailwindIcon />
            Tailwind CSS
          </Code>
          . I like to design modern and efficient interfaces while exploring
          best practices in the field. I am looking for a{" "}
          <Code className="inline-flex items-center gap-1 bg-gray-500 text-white hover:underline cursor-pointer">
            <WorkIcon />
            internship
          </Code>{" "}
          of at least one month for the month of June in order to deepen my
          skills and contribute to concrete projects within a team dynamic.
        </p>
      </div>
    </Section>
  );
};
