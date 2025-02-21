import React from "react";
import { Section } from "./ui/section";
import { LinkedinIcon } from "../assets/icon/linkedinIcon";
import { GithubIcon } from "../assets/icon/githubIcon";
import { TwitterIcon } from "../assets/icon/twitterIcon";

export const ContactMe = () => {
  return (
    <Section className="flex justify-start items-start mb-12">
      <div className="max-w-3xl w-full">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 font-caption">
          Contact me
        </h2>
        <p>Find me on my social networks or send me an email.</p>
        <div className="flex items-center gap-8 my-8">
          <a
            className="flex flex-col gap-1 hover:scale-110 transition-transform"
            href="https://www.linkedin.com/in/michel-djoumessi-2500b7346/"
            style={{
              color: "#2D64BC",
              filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
            }}
          >
            <LinkedinIcon />
            <p
              className="text-sm font-medium leading-none"
              style={{
                color: "#2D64BC",
                filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
              }}
            >
              Linkedin
            </p>
          </a>
          <a
            className="flex flex-col gap-1 hover:scale-110 transition-transform"
            href="https://github.com/michel-DC"
            style={{
              color: "#ffffff",
              filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
            }}
          >
            <GithubIcon />
            <p
              className="text-sm font-medium leading-none"
              style={{
                color: "#ffffff",
                filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
              }}
            >
              Github
            </p>
          </a>
          <a
            className="flex flex-col gap-1 hover:scale-110 transition-transform"
            href="https://x.com"
            style={{
              color: "#509CEA",
              filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
            }}
          >
            <TwitterIcon />
            <p
              className="text-sm font-medium leading-none"
              style={{
                color: "#509CEA",
                filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
              }}
            >
              Twitter
            </p>
          </a>
          <a
            className="flex flex-col gap-1 hover:scale-110 transition-transform"
            style={{
              color: "#EA392B",
              filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
            }}
            href="https://youtube.com"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              role="img"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
            </svg>
            <p
              className="text-sm font-medium leading-none"
              style={{
                filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
              }}
            >
              Youtube
            </p>
          </a>
          <div className="ml-20">
            <a className="underline" href="mailto:djoumessi.michelc@gmail.com">
              djoumessi.michelc@gmail.com
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};
