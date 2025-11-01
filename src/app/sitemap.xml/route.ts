import fs from "fs";
import path from "path";

const SITE_URL = "https://onlinemichel.dev";

export async function GET() {
  const pages = [
    "/",
    "/blog",
    "/projets",
    "/mentions-legales",
    "/politique-confidentialite",
  ];

  const projectsDir = path.join(process.cwd(), "src", "data", "projects");
  const projectUrls: string[] = [];
  try {
    const files = await fs.promises.readdir(projectsDir);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      try {
        const content = await fs.promises.readFile(
          path.join(projectsDir, file),
          "utf8"
        );
        const json = JSON.parse(content);
        const slug =
          json.slugName ||
          json.slug ||
          (json.name &&
            String(json.name)
              .toLowerCase()
              .replace(/[^a-z0-9]+/gi, "-")
              .replace(/(^-|-$)/g, ""));
        if (slug) projectUrls.push(`/projets/${slug}`);
      } catch {}
    }
  } catch {}

  // Construire les entrées d'URL ; inclure lastmod pour les pages de projets en utilisant la date de modification du fichier si possible
  const urlEntries: string[] = [];

  // pages statiques
  for (const u of pages) {
    const loc = `${SITE_URL}${u}`;
    const priority = u === "/" ? "1.0" : "0.8";
    urlEntries.push(
      `  <url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
    );
  }

  // Pages de projets
  try {
    const files = await fs.promises.readdir(projectsDir);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      try {
        const full = path.join(projectsDir, file);
        const content = await fs.promises.readFile(full, "utf8");
        const json = JSON.parse(content);
        const slug =
          json.slugName ||
          json.slug ||
          (json.name &&
            String(json.name)
              .toLowerCase()
              .replace(/[^a-z0-9]+/gi, "-")
              .replace(/(^-|-$)/g, ""));
        if (!slug) continue;
        const stat = await fs.promises.stat(full);
        const lastmod = stat.mtime.toISOString();
        const loc = `${SITE_URL}/projets/${slug}`;
        urlEntries.push(
          `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
        );
      } catch {
        // skip les autres
      }
    }
  } catch {
    // skip
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urlEntries.join("\n") +
    `\n</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
