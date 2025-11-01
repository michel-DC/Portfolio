const SITE_URL = "https://onlinemichel.dev";

export async function GET() {
  const txt = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\nHost: ${SITE_URL}`;

  return new Response(txt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
