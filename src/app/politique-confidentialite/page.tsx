export default function PrivacyPage() {
  return (
    <article className="space-y-10">
      <header className="mb-2">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Politique de confidentialité
        </h1>
        <p className="text-foreground/70">
          Comment sont collectées, utilisées et protégées vos données sur
          onlinemichel.dev
        </p>
      </header>

      <section className="prose prose-lg dark:prose-invert space-y-6">
        <h2>1. Données collectées</h2>
        <p>
          Nous collectons uniquement les données que vous nous communiquez
          volontairement (par exemple : nom, adresse e-mail, message via le
          formulaire de contact). Aucune collecte automatique de données
          personnelles n'est effectuée en dehors des cookies et outils
          analytiques décrits ci-dessous.
        </p>

        <h2>2. Finalités du traitement</h2>
        <p>
          Les informations sont utilisées pour : répondre à vos demandes, gérer
          les éventuelles prestations, et améliorer le site. Elles ne sont pas
          revendues à des tiers.
        </p>

        <h2>3. Cookies et outils analytiques</h2>
        <p>
          Le site peut utiliser des cookies techniques (nécessaires au
          fonctionnement) et des cookies d'analyse (pour mesurer la
          fréquentation). Les cookies analytiques peuvent être fournis par des
          services tiers. Vous pouvez gérer et désactiver les cookies via les
          paramètres de votre navigateur.
        </p>

        <h2>4. Durée de conservation</h2>
        <p>
          Les données envoyées via le formulaire de contact sont conservées
          pendant la durée nécessaire au traitement de la demande. Les logs et
          traces techniques peuvent être conservés plus longtemps pour des
          raisons de sécurité, conformément aux obligations légales.
        </p>

        <h2>5. Sécurité</h2>
        <p>
          Des mesures techniques et organisationnelles sont en place afin de
          protéger vos données contre l'accès non autorisé, la divulgation,
          l'altération ou la destruction. Malgré tout, aucune transmission sur
          Internet n'est totalement sécurisée.
        </p>

        <h2>6. Transfert et hébergement</h2>
        <p>
          Les données sont hébergées sur l'infrastructure de Vercel
          (https://vercel.com). Selon les services tiers utilisés (par exemple :
          outils d'analytics, plateformes de messagerie), des transferts hors UE
          peuvent avoir lieu. Dans ce cas, les prestataires respectent le cadre
          légal applicable ou des garanties appropriées sont mises en place.
        </p>

        <h2>7. Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de
          rectification, d'effacement, de limitation, de portabilité et
          d'opposition au traitement de vos données. Pour exercer ces droits,
          contactez :{" "}
          <a href="mailto:contact@onlinemichel.dev">contact@onlinemichel.dev</a>
          .
        </p>
      </section>

      <section className="prose prose-sm text-foreground/70 dark:prose-invert">
        <h3>Modification de la politique</h3>
        <p>
          Cette politique de confidentialité peut être mise à jour. Date de
          dernière mise à jour : (à préciser). Les changements prendront effet
          dès leur publication sur le site.
        </p>
      </section>
    </article>
  );
}
