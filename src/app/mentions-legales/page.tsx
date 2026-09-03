import Header from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { Metadata } from "next";
import LegalAnimation from "@/animations/legal-animation";
import { CONTACT_EMAIL, SITE_DOMAIN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions Légales • Michel DJOUMESSI",
  description:
    `Informations légales et mentions obligatoires du site ${SITE_DOMAIN}`,
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <div>
      <LegalAnimation />
      <div className="bg-transparent min-h-screen flex flex-col">
        <Header />
              <main className="grow pt-32 pb-24 px-4 md:px-24">
                <article className="max-w-4xl mx-auto space-y-16">
                  <header className="space-y-6 text-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900">
                      Mentions légales
                    </h1>
                    <p className="text-xl md:text-2xl italic text-neutral-600">
                      Informations légales et mentions obligatoires du site
                      {SITE_DOMAIN}
                    </p>
                  </header>
        
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-neutral-100">              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  Éditeur du site
                </h2>
                <div className="text-neutral-600 leading-relaxed space-y-2">
                  <p className="font-medium text-neutral-900 italic">
                    Michel DJOUMESSI
                  </p>
                  <p>
                    Responsable de la publication : Michel DJOUMESSI
                    <br />
                    Email :{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-[#4E6471] hover:underline underline-offset-4"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  Hébergement
                </h2>
                <div className="text-neutral-600 leading-relaxed space-y-2">
                  <p className="font-medium text-neutral-900 italic">Vercel</p>
                  <p>
                    Le site est hébergé par Vercel (https://vercel.com). Vercel
                    fournit l&apos;infrastructure d&apos;hébergement et la
                    distribution de contenu.
                  </p>
                </div>
              </section>

              <section className="space-y-4 md:col-span-2">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  Propriété intellectuelle
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    L&apos;ensemble des contenus présents sur ce site (textes,
                    images, logos, éléments graphiques et code) sont protégés par
                    le droit d&apos;auteur et la propriété intellectuelle. Toute
                    reproduction, distribution ou représentation totale ou
                    partielle, par quelque procédé que ce soit, sans
                    l&apos;autorisation expresse de l&apos;éditeur est interdite.
                  </p>
                </div>
              </section>

              <section className="space-y-4 md:col-span-2">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  Limitation de responsabilité
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Les informations publiées sur ce site le sont à titre
                    informatif. L&apos;éditeur met tout en œuvre pour assurer
                    l&apos;exactitude et la mise à jour des informations, mais ne
                    peut garantir qu&apos;elles soient complètes, exactes ou à
                    jour en permanence. L&apos;éditeur ne peut être tenu
                    responsable des dommages directs ou indirects résultant de
                    l&apos;accès ou de l&apos;usage du site.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  Liens externes
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Les liens pointant vers des sites tiers sont fournis à titre
                    informatif. L&apos;éditeur n&apos;exerce aucun contrôle sur
                    ces sites externes et décline toute responsabilité quant à
                    leur contenu.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  Contact
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Pour toute question relative aux mentions légales ou au site,
                    vous pouvez contacter le propriétaire à :{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-[#4E6471] hover:underline underline-offset-4"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              </section>
            </div>

            <footer className="pt-16 border-t border-neutral-100">
              <p className="text-sm text-neutral-400 italic">
                Dernière mise à jour : 29 décembre 2025.
                <br />
                Il est conseillé de consulter régulièrement cette page pour
                prendre connaissance des éventuelles modifications.
              </p>
            </footer>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
