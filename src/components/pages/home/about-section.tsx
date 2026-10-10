import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutSection(): React.JSX.Element {
  return (
    <section aria-label="À propos de Michel" className="px-6 py-24 text-center [&_*]:font-reference md:px-12 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-2xl leading-[1.6] text-black md:text-[2rem]">
          Moi, c’est <strong className="font-bold text-[var(--accent-ink)]">Michel.</strong>{" "}
          Je suis développeur spécialisé dans la création d’interfaces{" "}
          <strong className="font-bold text-[var(--accent-ink)]">modernes et performantes.</strong>{" "}
          Je transforme vos idées en solutions web, avec une attention particulière
          à l’expérience utilisateur et à la qualité technique.
        </p>
        <Link href="/a-propos" className="group mt-8 inline-flex min-h-11 items-center gap-2 text-xl text-[var(--accent-ink)] underline-offset-8 transition-colors hover:text-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--accent-ink)] md:text-2xl">
          Envie d’en savoir plus ?
          <ArrowUpRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
        </Link>
      </div>
    </section>
  );
}
