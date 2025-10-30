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
            href="mailto:micheldjoumessi.contact@gmail.com"
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
