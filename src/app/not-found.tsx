"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-2 text-foreground/80 font-galada">
        404
      </h1>
      <h2 className="text-2xl mb-6 text-foreground font-normal italic">
        Oups&nbsp;! Cette page n&apos;existe pas.
      </h2>
      <p className="text-foreground/70 mb-8 max-w-xl">
        Désolé, la page que vous recherchez est introuvable. Il est possible
        qu&apos;elle ait été supprimée ou que l&apos;URL soit incorrecte.
        <br />
        Vous pouvez revenir à l&apos;accueil en cliquant sur le bouton
        ci-dessous.
      </p>
      <Button>
        <Link href="/" className="">
          Retour à l&apos;accueil
        </Link>
      </Button>
    </div>
  );
}
