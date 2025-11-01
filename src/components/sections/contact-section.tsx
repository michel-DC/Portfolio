import Section from "../section";
import Link from "next/link";

export function ContactSection() {
  return (
    <Section className="flex flex-col items-start justify-center pt-8 pb-8 px-4 sm:px-8">
      <div className="w-full flex flex-col justify-center">
        <h2 className="text-foreground/80 italic text-[25px] sm:text-[30px] leading-tight font-normal tracking-wider mb-2">
          Get In Touch
        </h2>
        <div>
          <Link
            href="mailto:&#x6d;&#x69;&#x63;&#x68;&#x65;&#x6c;&#x64;&#x6a;&#x6f;&#x75;&#x6d;&#x65;&#x73;&#x73;&#x69;&#x2e;&#x63;&#x6f;&#x6e;&#x74;&#x61;&#x63;&#x74;&#x40;&#x67;&#x6d;&#x61;&#x69;&#x6c;&#x2e;&#x63;&#x6f;&#x6d;"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex underline items-center gap-2 group hover:text-foreground transition-colors"
            aria-label="Mail de contact"
          >
            micheldjoumessi.contact@gmail.com
          </Link>
        </div>
      </div>
    </Section>
  );
}
