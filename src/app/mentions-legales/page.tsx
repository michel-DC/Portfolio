export default function MentionsLegalesPage() {
  return (
    <article className="space-y-10">
      <header className="mb-2">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Mentions légales
        </h1>
        <p className="text-foreground/70">
          Informations légales et mentions obligatoires du site onlinemichel.dev
        </p>
      </header>

      <section className="prose prose-lg dark:prose-invert space-y-6">
        <h2>Éditeur du site</h2>
        <p>
          Responsable de la publication : <strong>Michel DJOUMESSI</strong>
          <br />
          Email :{" "}
          <a href="mailto:contact@onlinemichel.dev">contact@onlinemichel.dev</a>
        </p>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par Vercel (https://vercel.com). Vercel fournit
          l'infrastructure d'hébergement et la distribution de contenu. Pour
          toute question liée à l'hébergement, consultez la documentation de
          Vercel ou leur page de support.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos,
          éléments graphiques et code) sont protégés par le droit d'auteur et la
          propriété intellectuelle. Toute reproduction, distribution ou
          représentation totale ou partielle, par quelque procédé que ce soit,
          sans l'autorisation expresse de l'éditeur est interdite.
        </p>

        <h2>Limitation de responsabilité</h2>
        <p>
          Les informations publiées sur ce site le sont à titre informatif.
          L'éditeur met tout en œuvre pour assurer l'exactitude et la mise à
          jour des informations, mais ne peut garantir qu'elles soient
          complètes, exactes ou à jour en permanence. L'éditeur ne peut être
          tenu responsable des dommages directs ou indirects résultant de
          l'accès ou de l'usage du site.
        </p>

        <h2>Liens externes</h2>
        <p>
          Les liens pointant vers des sites tiers sont fournis à titre
          informatif. L'éditeur n'exerce aucun contrôle sur ces sites externes
          et décline toute responsabilité quant à leur contenu.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question relative aux mentions légales ou au site, vous
          pouvez contacter le propriétaire à :{" "}
          <a href="mailto:contact@onlinemichel.dev">contact@onlinemichel.dev</a>
          .
        </p>
      </section>

      <section className="prose prose-sm text-foreground/70 dark:prose-invert">
        <h3>Version et modifications</h3>
        <p>
          Les présentes mentions peuvent évoluer. Date de dernière mise à jour :
          (à préciser). Il est conseillé de consulter régulièrement cette page
          pour prendre connaissance des éventuelles modifications.
        </p>
      </section>
    </article>
  );
}
