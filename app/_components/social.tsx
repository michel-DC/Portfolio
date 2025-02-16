import React from "react";
import { Section } from "./section";
import { LinkedinIcon } from "../assets/icon/linkedinIcon";
import { GithubIcon } from "../assets/icon/githubIcon";
import { TwitterIcon } from "../assets/icon/twitterIcon";
import { GmailIcon } from "../assets/icon/gmailIcon";

export const Social = () => {
  return (
    <Section className="mx-auto flex w-full max-w-3xl items-center justify-between px-4">
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
          href="mailto:djoumessi.michelc@gmail.com"
          style={{
            color: "#ffffff",
            filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
          }}
        >
          <GmailIcon />
          <p
            className="text-sm font-medium leading-none"
            style={{
              color: "#ffffff",
              filter: "drop-shadow(0px 0px 10px rgba(250, 250, 250, 0.3))",
            }}
          >
            Gmail
          </p>
        </a>
        <div className="ml-20">
          <a className="underline" href="mailto:djoumessi.michelc@gmail.com">
            djoumessi.michelc@gmail.com
          </a>
        </div>
      </div>
    </Section>
  );
};
