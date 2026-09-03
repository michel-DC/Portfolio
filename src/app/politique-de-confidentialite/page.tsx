import Header from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { Metadata } from "next";
import PrivacyAnimation from "@/animations/privacy-animation";
import { CONTACT_EMAIL, SITE_DOMAIN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de Confidentialité • Michel DJOUMESSI",
  description:
    `Comment sont collectées, utilisées et protégées vos données sur ${SITE_DOMAIN}`,
  alternates: {
    canonical: "/politique-de-confidentialite",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PrivacyAnimation />
      <div className="bg-transparent min-h-screen flex flex-col">
        <Header />
        <main className="grow pt-32 pb-24 px-4 md:px-24">
          <article className="max-w-4xl mx-auto space-y-16">
            <header className="space-y-6 text-center">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900">
                Politique de confidentialité
              </h1>
              <p className="text-xl md:text-2xl italic text-neutral-600">
                Comment sont collectées, utilisées et protégées vos données sur
                {SITE_DOMAIN}
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-neutral-100">
              <section className="space-y-4 md:col-span-2">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  1. Données collectées
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Nous collectons uniquement les données que vous nous communiquez
                    volontairement (par exemple : nom, adresse e-mail, message via le
                    formulaire de contact). Aucune collecte automatique de données
                    personnelles n&apos;est effectuée en dehors des cookies et outils
                    analytiques décrits ci-dessous.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  2. Finalités du traitement
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Les informations sont utilisées pour : répondre à vos demandes, gérer
                    les éventuelles prestations, et améliorer le site. Elles ne sont pas
                    revendues à des tiers.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  3. Cookies et outils analytiques
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Le site peut utiliser des cookies techniques (nécessaires au
                    fonctionnement) et des cookies d&apos;analyse (pour mesurer la
                    fréquentation). Les cookies analytiques peuvent être fournis par des
                    services tiers. Vous pouvez gérer et désactiver les cookies via les
                    paramètres de votre navigateur.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  4. Durée de conservation
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Les données envoyées via le formulaire de contact sont conservées
                    pendant la durée nécessaire au traitement de la demande. Les logs et
                    traces techniques peuvent être conservés plus longtemps pour des
                    raisons de sécurité, conformément aux obligations légales.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  5. Sécurité
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Des mesures techniques et organisationnelles sont en place afin de
                    protéger vos données contre l&apos;accès non autorisé, la divulgation,
                    l&apos;altération ou la destruction. Malgré tout, aucune transmission sur
                    Internet n&apos;est totalement sécurisée.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  6. Transfert et hébergement
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Les données sont hébergées sur l&apos;infrastructure de Vercel
                    (https://vercel.com). Selon les services tiers utilisés (par exemple :
                    outils d&apos;analytics, plateformes de messagerie), des transferts hors UE
                    peuvent avoir lieu. Dans ce cas, les prestataires respectent le cadre
                    légal applicable ou des garanties appropriées sont mises en place.
                  </p>
                </div>
              </section>

              <section className="space-y-4 md:col-span-2">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E6471]" />
                  7. Vos droits
                </h2>
                <div className="text-neutral-600 leading-relaxed">
                  <p>
                    Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
                    rectification, d&apos;effacement, de limitation, de portabilité et
                    d&apos;opposition au traitement de vos données. Pour exercer ces droits,
                    contactez :{" "}
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
                Les changements prendront effet dès leur publication sur le site.
              </p>
            </footer>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
