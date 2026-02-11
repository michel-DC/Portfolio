const SITE_URL = "https://onlinemichel.dev";

export async function GET() {
  const txt = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /dashboard/login
Sitemap: ${SITE_URL}/google-sitemap.xml
Host: ${SITE_URL}`;

  return new Response(txt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
